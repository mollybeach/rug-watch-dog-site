import { NextResponse } from 'next/server';
import pool from '@/lib/db/config';

export async function GET() {
    try {
        console.log('Starting risk metrics fetch...');

        // First verify database connection
        const testConnection = await pool.query('SELECT 1');
        console.log('Database connection verified');

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
        const queryPromise = pool.query(`
            WITH RankedMetrics AS (
                SELECT 
                    token_address,
                    volume_anomaly,
                    holder_concentration,
                    liquidity_score,
                    price_volatility,
                    sell_pressure,
                    market_cap_risk,
                    is_rug_pull,
                    timestamp,
                    ROW_NUMBER() OVER (PARTITION BY token_address ORDER BY timestamp DESC) as rn
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
            LEFT JOIN RankedMetrics m ON t.address = m.token_address AND m.rn = 1
            LEFT JOIN RankedPrices p ON t.address = p.token_address AND p.rn = 1
            ORDER BY m.timestamp DESC NULLS LAST
            LIMIT 100;
        `);

        const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => reject(new Error('Query timeout')), queryTimeout);
        });

        const result = await Promise.race([queryPromise, timeoutPromise]);
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

function calculateRiskScore(token: any): string {
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