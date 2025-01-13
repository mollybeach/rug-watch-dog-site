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

        // First verify database connection
        const testConnection = await pool.query('SELECT NOW() as now');
        console.log('Database query successful:', testConnection.rows[0]);

        // Check if tables exist and have data
        const tableCheck = await pool.query(`
            SELECT 
                (SELECT COUNT(*) FROM tokens) as token_count,
                (SELECT COUNT(*) FROM token_metrics) as metrics_count,
                (SELECT COUNT(*) FROM token_prices) as prices_count
        `);
        
        console.log('Table counts:', tableCheck.rows[0]);

        // Optimized query with better indexing
        const queryTimeout = 15000;
        const queryPromise: Promise<QueryResult<RiskMetricsRow>> = pool.query(`
            WITH RankedMetrics AS (
                SELECT 
                    "tokenAddress",
                    "volumeAnomaly",
                    "holderConcentration",
                    "liquidityScore",
                    "priceVolatility",
                    "sellPressure",
                    "marketCapRisk",
                    "isRugPull",
                    timestamp,
                    ROW_NUMBER() OVER (PARTITION BY "tokenAddress" ORDER BY timestamp DESC) as rn
                FROM token_metrics
            ),
            RankedPrices AS (
                SELECT 
                    token_address,
                    price,
                    volume_24h,
                    market_cap,
                    ROW_NUMBER() OVER (PARTITION BY token_address ORDER BY timestamp DESC) as rn
                FROM token_prices
            )
            SELECT 
                t.address,
                t.name,
                t.symbol,
                m."volumeAnomaly",
                m."holderConcentration",
                m."liquidityScore",
                m."priceVolatility",
                m."sellPressure",
                m."marketCapRisk",
                m."isRugPull",
                m.timestamp,
                COALESCE(p.price, 0) as current_price,
                COALESCE(p.volume_24h, 0) as volume_24h,
                COALESCE(p.market_cap, 0) as market_cap
            FROM tokens t
            LEFT JOIN RankedMetrics m ON t.address = m."tokenAddress"
            LEFT JOIN RankedPrices p ON t.address = p.token_address
            WHERE m.rn = 1 OR m.rn IS NULL
            ORDER BY m.timestamp DESC NULLS LAST
            LIMIT 100;
        `);

        const result = await queryPromise;
        console.log(`Query completed. Found ${result.rows?.length || 0} records`);

        if (!result.rows || result.rows.length === 0) {
            console.log('No data found in the database');
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

        console.log('Data processing completed');

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
        }, { status: 500 });
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