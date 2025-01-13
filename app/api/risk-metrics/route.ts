import { NextResponse } from 'next/server';
import pool from '@/lib/db/config';
import { QueryResult } from 'pg';
import { sql } from '@vercel/postgres';
import Redis from 'ioredis';

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

// Initialize Redis client
const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');
const CACHE_TTL = 300; // 5 minutes in seconds
const CACHE_KEY = 'risk_metrics_data';

export async function GET() {
    try {
        // Try to get data from cache first
        const cachedData = await redis.get(CACHE_KEY);
        if (cachedData) {
            return Response.json(JSON.parse(cachedData));
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

            const result = await Promise.race([
                sql.query(query),
                new Promise((_, reject) => 
                    setTimeout(() => reject(new Error('Query timeout')), 30000) // 30 second timeout
                )
            ]);

            console.log(`Query completed. Found ${result.rows?.length || 0} records`);

            if (!result.rows || result.rows.length === 0) {
                const response = {
                    data: [],
                    metadata: {
                        total_tokens: 0,
                        high_risk: 0,
                        medium_risk: 0,
                        low_risk: 0
                    }
                };
                // Cache empty response for a shorter duration
                await redis.setex(CACHE_KEY, 60, JSON.stringify(response));
                return Response.json(response);
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
                data: processedData,
                metadata: {
                    total_tokens: processedData.length,
                    high_risk: processedData.filter(token => token.riskCategory === 'High').length,
                    medium_risk: processedData.filter(token => token.riskCategory === 'Medium').length,
                    low_risk: processedData.filter(token => token.riskCategory === 'Low').length
                }
            };

            // Cache the successful response
            await redis.setex(CACHE_KEY, CACHE_TTL, JSON.stringify(response));
            return Response.json(response);
        } finally {
            // Always release the client back to the pool
            client.release();
        }
    } catch (error) {
        console.error('Error fetching risk metrics:', error);
        
        // Try to get stale cache in case of error
        try {
            const staleData = await redis.get(CACHE_KEY);
            if (staleData) {
                const response = JSON.parse(staleData);
                response.metadata.is_stale = true;
                return Response.json(response);
            }
        } catch (cacheError) {
            console.error('Error fetching from cache:', cacheError);
        }

        if (error.message === 'Query timeout') {
            return Response.json(
                { error: 'Request timed out. Please try again.' },
                { status: 504 }
            );
        }
        
        return Response.json(
            { error: 'Failed to fetch risk metrics' },
            { status: 500 }
        );
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