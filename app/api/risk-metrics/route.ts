import { NextResponse } from 'next/server';
import pool from '@/lib/db/config';

export async function GET() {
    try {
        // First, check if the tables exist
        const checkTable = await pool.query(`
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_name = 'tokens'
            );
        `);

        if (!checkTable.rows[0].exists) {
            return NextResponse.json({
                success: false,
                error: 'Database tables not initialized'
            }, { status: 500 });
        }

        // Fetch the latest metrics with more detailed information
        const result = await pool.query(`
            WITH LatestMetrics AS (
                SELECT DISTINCT ON (token_address) 
                    token_address,
                    volume_anomaly,
                    holder_concentration,
                    liquidity_score,
                    price_volatility,
                    sell_pressure,
                    market_cap_risk,
                    is_rug_pull,
                    timestamp
                FROM token_metrics
                ORDER BY token_address, timestamp DESC
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
            INNER JOIN LatestMetrics m ON t.address = m.token_address
            LEFT JOIN token_prices p ON t.address = p.token_address
            WHERE p.timestamp = (
                SELECT MAX(timestamp)
                FROM token_prices
                WHERE token_address = t.address
            )
            ORDER BY m.timestamp DESC
            LIMIT 100
        `);

        // Calculate risk scores and categories
        const processedData = result.rows.map(token => ({
            ...token,
            riskScore: (
                (token.volumeAnomaly * 0.2) +
                (token.holderConcentration * 0.25) +
                (token.liquidityScore * 0.15) +
                (token.priceVolatility * 0.15) +
                (token.sellPressure * 0.15) +
                (token.marketCapRisk * 0.1)
            ).toFixed(2),
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
        console.error('Error fetching risk metrics:', error);
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to fetch risk metrics',
            details: process.env.NODE_ENV === 'development' ? error : undefined
        }, { status: 500 });
    }
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