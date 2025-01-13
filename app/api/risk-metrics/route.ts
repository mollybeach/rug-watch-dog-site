import { NextResponse } from 'next/server';
import pool from '@/lib/db/config';
import { QueryResult } from 'pg';

interface RiskMetricsRow {
    address: string;
    name: string;
    symbol: string;
    volumeAnomaly: number;
    holderConcentration: number;
    liquidityScore: number;
    priceVolatility: number;
    sellPressure: number;
    marketCapRisk: number;
    isRugPull: boolean;
    timestamp: Date;
    current_price: number;
    volume_24h: number;
    market_cap: number;
}

// Cache the results for 5 minutes
let cachedData: any = null;
let lastCacheTime: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

export async function GET() {
    try {
        // Check if we have valid cached data
        const now = Date.now();
        if (cachedData && (now - lastCacheTime) < CACHE_DURATION) {
            console.log('Returning cached data');
            return NextResponse.json(cachedData);
        }

        console.log('Starting risk metrics fetch...');
        
        // Get a client from the pool with a shorter timeout
        const client = await pool.connect();
        
        try {
            // Set statement timeout for this specific query
            await client.query('SET statement_timeout = 4000'); // 4 seconds
            
            // Simplified and optimized query
            const query = `
                WITH latest_data AS (
                    SELECT DISTINCT ON (t.address)
                        t.address,
                        t.name,
                        t.symbol,
                        m.volume_anomaly as "volumeAnomaly",
                        m.holder_concentration as "holderConcentration",
                        m.liquidity_score as "liquidityScore",
                        m.price_volatility as "priceVolatility",
                        m.sell_pressure as "sellPressure",
                        m.market_cap_risk as "marketCapRisk",
                        m.is_rug_pull as "isRugPull",
                        m.timestamp,
                        COALESCE(p.price, 0) as current_price,
                        COALESCE(p.volume_24h, 0) as volume_24h,
                        COALESCE(p.market_cap, 0) as market_cap
                    FROM tokens t
                    LEFT JOIN token_metrics m ON m.token_address = t.address
                    LEFT JOIN token_prices p ON p.token_address = t.address
                    WHERE m.timestamp >= NOW() - INTERVAL '24 hours'
                    ORDER BY t.address, m.timestamp DESC
                )
                SELECT *
                FROM latest_data
                ORDER BY timestamp DESC
                LIMIT 15;
            `;

            const result = await client.query(query);
            console.log(`Query completed. Found ${result.rows?.length || 0} records`);

            if (!result.rows || result.rows.length === 0) {
                const response = {
                    success: false,
                    error: 'No data found',
                    data: [],
                    metadata: {
                        totalTokens: 0,
                        highRiskCount: 0,
                        mediumRiskCount: 0,
                        lowRiskCount: 0,
                        timestamp: new Date().toISOString()
                    }
                };
                cachedData = response;
                lastCacheTime = now;
                return NextResponse.json(response);
            }

            // Process the data
            const processedData = result.rows.map(token => ({
                ...token,
                riskScore: calculateRiskScore(token),
                riskCategory: calculateRiskCategory(
                    token.volumeAnomaly,
                    token.holderConcentration,
                    token.liquidityScore,
                    token.priceVolatility,
                    token.sellPressure,
                    token.marketCapRisk
                )
            }));

            const response = {
                success: true,
                data: processedData,
                metadata: {
                    totalTokens: processedData.length,
                    highRiskCount: processedData.filter(t => t.riskCategory === 'High').length,
                    mediumRiskCount: processedData.filter(t => t.riskCategory === 'Medium').length,
                    lowRiskCount: processedData.filter(t => t.riskCategory === 'Low').length,
                    timestamp: new Date().toISOString()
                }
            };

            // Cache the results
            cachedData = response;
            lastCacheTime = now;

            return NextResponse.json(response);
        } finally {
            // Always release the client back to the pool
            client.release();
        }
    } catch (error) {
        console.error('Error in risk metrics API:', error);
        return NextResponse.json({
            success: false,
            error: 'Failed to fetch risk metrics',
            details: error instanceof Error ? error.message : 'Unknown error',
            timestamp: new Date().toISOString()
        }, { status: error instanceof Error && error.message.includes('timeout') ? 504 : 500 });
    }
}

function calculateRiskScore(token: RiskMetricsRow): string {
    return (
        (token.volumeAnomaly * 0.2) +
        (token.holderConcentration * 0.25) +
        (token.liquidityScore * 0.15) +
        (token.priceVolatility * 0.15) +
        (token.sellPressure * 0.15) +
        (token.marketCapRisk * 0.1)
    ).toFixed(2);
}

function calculateRiskCategory(
    volumeAnomaly: number,
    holderConcentration: number,
    liquidityScore: number,
    priceVolatility: number,
    sellPressure: number,
    marketCapRisk: number
): 'High' | 'Medium' | 'Low' {
    const score = (
        (volumeAnomaly * 0.2) +
        (holderConcentration * 0.25) +
        (liquidityScore * 0.15) +
        (priceVolatility * 0.15) +
        (sellPressure * 0.15) +
        (marketCapRisk * 0.1)
    );

    if (score >= 0.7) return 'High';
    if (score >= 0.4) return 'Medium';
    return 'Low';
} 