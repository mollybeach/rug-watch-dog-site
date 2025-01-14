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

// Use Edge runtime
export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export async function GET() {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000); // 20 second timeout

    try {
        const client = await getClient();
        
        // Simplified query for faster execution
        const result = await client.query<RiskMetricsRow>(`
            WITH recent_metrics AS (
                SELECT DISTINCT ON ("tokenAddress")
                    "tokenAddress",
                    "volumeAnomaly",
                    "holderConcentration",
                    "liquidityScore",
                    "priceVolatility",
                    "sellPressure",
                    "marketCapRisk",
                    "bundlerActivity",
                    "accumulationRate",
                    "stealthAccumulation",
                    "suspiciousPattern",
                    "isRugPull",
                    metadata,
                    timestamp
                FROM token_metrics
                WHERE timestamp >= NOW() - INTERVAL '24 hours'
                ORDER BY "tokenAddress", timestamp DESC
            )
            SELECT 
                t.address,
                t.name,
                t.symbol,
                COALESCE(rm."volumeAnomaly", 0) as "volumeAnomaly",
                COALESCE(rm."holderConcentration", 0) as "holderConcentration",
                COALESCE(rm."liquidityScore", 0) as "liquidityScore",
                COALESCE(rm."priceVolatility", 0) as "priceVolatility",
                COALESCE(rm."sellPressure", 0) as "sellPressure",
                COALESCE(rm."marketCapRisk", 0) as "marketCapRisk",
                COALESCE(rm."bundlerActivity", false) as "bundlerActivity",
                COALESCE(rm."accumulationRate", 0) as "accumulationRate",
                rm."stealthAccumulation",
                rm."suspiciousPattern",
                COALESCE(rm."isRugPull", false) as "isRugPull",
                COALESCE(rm.metadata, '{"reason": "No data"}') as metadata,
                COALESCE(rm.timestamp, NOW()) as timestamp
            FROM tokens t
            LEFT JOIN recent_metrics rm ON t.address = rm."tokenAddress"
            LIMIT 5;
        `, undefined, { signal: controller.signal });

        clearTimeout(timeoutId);
        
        return NextResponse.json({
            success: true,
            data: result.rows || []
        });
    } catch (error: any) {
        clearTimeout(timeoutId);
        
        if (error.name === 'AbortError') {
            return NextResponse.json(
                { 
                    success: false, 
                    error: 'Query timeout',
                    details: 'The request took too long to process'
                },
                { status: 408 }
            );
        }

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