import { NextResponse } from 'next/server';
import { getClient } from '@/lib/db/config';
import type { QueryResultRow } from 'pg';

interface RiskMetricsRow extends QueryResultRow {
    address: string;
    name: string;
    symbol: string;
    volumeAnomaly: number;
    holderConcentration: number;
    liquidityScore: number;
    priceVolatility: number;
    sellPressure: number;
    marketCapRisk: number;
    bundlerActivity: boolean;
    accumulationRate: number;
    stealthAccumulation: number | null;
    suspiciousPattern: boolean | null;
    isRugPull: boolean;
    metadata: { reason: string };
    timestamp: string;
}

export const dynamic = 'force-dynamic';
export const maxDuration = 5;

export async function GET() {
    try {
        const client = await getClient();
        
        const result = await client.query<RiskMetricsRow>(`
            SELECT DISTINCT ON (t.address)
                t.address,
                t.name,
                t.symbol,
                COALESCE(tm."volumeAnomaly", 0) as "volumeAnomaly",
                COALESCE(tm."holderConcentration", 0) as "holderConcentration",
                COALESCE(tm."liquidityScore", 0) as "liquidityScore",
                COALESCE(tm."priceVolatility", 0) as "priceVolatility",
                COALESCE(tm."sellPressure", 0) as "sellPressure",
                COALESCE(tm."marketCapRisk", 0) as "marketCapRisk",
                COALESCE(tm."bundlerActivity", false) as "bundlerActivity",
                COALESCE(tm."accumulationRate", 0) as "accumulationRate",
                tm."stealthAccumulation",
                tm."suspiciousPattern",
                COALESCE(tm."isRugPull", false) as "isRugPull",
                COALESCE(tm.metadata, '{"reason": "No data"}') as metadata,
                COALESCE(tm.timestamp, NOW()) as timestamp
            FROM tokens t
            LEFT JOIN LATERAL (
                SELECT *
                FROM token_metrics tm
                WHERE tm."tokenAddress" = t.address
                AND tm.timestamp >= NOW() - INTERVAL '24 hours'
                ORDER BY timestamp DESC
                LIMIT 1
            ) tm ON true
            LIMIT 5;
        `, [], { timeout: 4000 });

        return NextResponse.json({
            success: true,
            data: result.rows || []
        });
    } catch (error: any) {
        console.error('Database error:', error);
        return NextResponse.json(
            { 
                success: false, 
                error: 'Database error',
                details: error.message 
            },
            { status: 500 }
        );
    }
} 