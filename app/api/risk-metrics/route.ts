import { NextResponse } from 'next/server';
import { client } from '@/lib/db/config';
import { QueryResult, QueryResultRow } from 'pg';

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

export async function GET() {
    if (!client) {
        return NextResponse.json(
            { 
                success: false, 
                error: 'Database connection not available',
            },
            { status: 503 }
        );
    }

    try {
        const query = `
            SELECT DISTINCT ON (t.address)
                t.address,
                t.name,
                t.symbol,
                tm."volumeAnomaly",
                tm."holderConcentration",
                tm."liquidityScore",
                tm."priceVolatility",
                tm."sellPressure",
                tm."marketCapRisk",
                tm."bundlerActivity",
                tm."accumulationRate",
                tm."stealthAccumulation",
                tm."suspiciousPattern",
                tm."isRugPull",
                tm.metadata,
                tm.timestamp
            FROM tokens t
            LEFT JOIN token_metrics tm ON t.address = tm."tokenAddress"
            WHERE tm.timestamp >= NOW() - INTERVAL '24 hours'
            ORDER BY t.address, tm.timestamp DESC
            LIMIT 5;
        `;

        const result = await client.query<RiskMetricsRow>(query);

        return NextResponse.json({
            success: true,
            data: result.rows || []
        });
    } catch (error: any) {
        console.error('Database error:', {
            message: error.message,
            code: error.code,
            stack: error.stack
        });
        
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