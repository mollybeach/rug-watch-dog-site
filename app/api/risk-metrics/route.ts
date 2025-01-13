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

export async function GET() {
    try {
        console.log('Starting risk metrics fetch...');

        // Optimized query with better indexing and no window functions
        const query = `
            WITH latest_metrics AS MATERIALIZED (
                SELECT DISTINCT ON (token_address)
                    token_address,
                    "volumeAnomaly",
                    "holderConcentration",
                    "liquidityScore",
                    "priceVolatility",
                    "sellPressure",
                    "marketCapRisk",
                    "isRugPull",
                    timestamp
                FROM token_metrics
                ORDER BY token_address, timestamp DESC
            ),
            latest_prices AS MATERIALIZED (
                SELECT DISTINCT ON (token_address)
                    token_address,
                    price,
                    volume_24h,
                    market_cap,
                    timestamp
                FROM token_prices
                ORDER BY token_address, timestamp DESC
            )
            SELECT 
                t.address,
                t.name,
                t.symbol,
                tm."volumeAnomaly",
                tm."holderConcentration",
                tm."liquidityScore",
                tm."priceVolatility",
                tm."sellPressure",
                tm."marketCapRisk",
                tm."isRugPull",
                tm.timestamp,
                COALESCE(tp.price, 0) as current_price,
                COALESCE(tp.volume_24h, 0) as volume_24h,
                COALESCE(tp.market_cap, 0) as market_cap
            FROM tokens t
            LEFT JOIN latest_metrics tm ON tm.token_address = t.address
            LEFT JOIN latest_prices tp ON tp.token_address = t.address
            ORDER BY tm.timestamp DESC NULLS LAST
            LIMIT 100;
        `;

        // Set a timeout of 30 seconds for the query
        const queryPromise = pool.query(query);
        const timeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Query timeout')), 30000)
        );

        const result = await Promise.race([queryPromise, timeoutPromise]) as QueryResult<RiskMetricsRow>;
        console.log(`Query completed. Found ${result.rows?.length || 0} records`);

        if (!result.rows || result.rows.length === 0) {
            return NextResponse.json({
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
            });
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

        return NextResponse.json({
            success: true,
            data: processedData,
            metadata: {
                totalTokens: processedData.length,
                highRiskCount: processedData.filter(t => t.riskCategory === 'High').length,
                mediumRiskCount: processedData.filter(t => t.riskCategory === 'Medium').length,
                lowRiskCount: processedData.filter(t => t.riskCategory === 'Low').length,
                timestamp: new Date().toISOString()
            }
        });
    } catch (error) {
        console.error('Error in risk metrics API:', error);
        
        // Return a structured error response
        return NextResponse.json({
            success: false,
            error: 'Failed to fetch risk metrics',
            details: error instanceof Error ? error.message : 'Unknown error',
            timestamp: new Date().toISOString()
        }, { status: error instanceof Error && error.message === 'Query timeout' ? 504 : 500 });
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