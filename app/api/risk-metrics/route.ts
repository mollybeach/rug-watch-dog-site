import { NextResponse } from 'next/server';
import pool from '@/lib/db/config';
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

async function executeQueryWithRetry<T extends QueryResultRow>(
    query: string,
    maxRetries = 3,
    delay = 1000
): Promise<QueryResult<T>> {
    let lastError;
    
    for (let i = 0; i < maxRetries; i++) {
        try {
            const client = await pool.connect();
            try {
                return await client.query<T>(query);
            } finally {
                client.release();
            }
        } catch (error) {
            lastError = error;
            if (i < maxRetries - 1) {
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
    }
    throw lastError;
}

export async function GET() {
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

        const result = await executeQueryWithRetry<RiskMetricsRow>(query);

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