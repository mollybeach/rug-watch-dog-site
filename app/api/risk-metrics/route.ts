import { NextResponse } from 'next/server';
import { getClient } from '@/lib/db/config';
import type { QueryResultRow } from 'pg';
import { QueryResult } from '@vercel/postgres';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

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
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000);

    try {
        const client = await getClient();
        console.log('Database connection established');

        const result = await Promise.race([
            client.query<RiskMetricsRow>(`
                SELECT 
                    tm.*,
                    t.name,
                    t.symbol
                FROM token_metrics tm
                JOIN tokens t ON tm.tokenAddress = t.address
                ORDER BY tm.timestamp DESC
                LIMIT 5;
            `),
            new Promise<never>((_, reject) => 
                setTimeout(() => reject(new Error('Query timeout')), 20000)
            )
        ]) as QueryResult<RiskMetricsRow>;

        clearTimeout(timeoutId);
        console.log(`Retrieved ${result.rows.length} risk metrics records`);
        
        return NextResponse.json({
            success: true,
            data: result.rows || []
        });

    } catch (error: any) {
        clearTimeout(timeoutId);
        
        // Log detailed error information
        console.error('Risk Metrics API Error:', {
            message: error.message,
            code: error.code,
            stack: error.stack,
            details: error.detail || 'No additional details',
            query: error.query,
            parameters: error.parameters
        });

        if (error.name === 'AbortError') {
            return NextResponse.json(
                { 
                    success: false, 
                    error: 'Query timeout',
                    details: 'The database query took too long to respond'
                },
                { status: 408 }
            );
        }

        // Handle specific database errors
        if (error.code) {
            switch (error.code) {
                case '28P01':
                    return NextResponse.json(
                        { 
                            success: false, 
                            error: 'Database authentication failed',
                            details: 'Invalid database credentials'
                        },
                        { status: 401 }
                    );
                case '3D000':
                    return NextResponse.json(
                        { 
                            success: false, 
                            error: 'Database not found',
                            details: 'The specified database does not exist'
                        },
                        { status: 404 }
                    );
                case '57P01':
                    return NextResponse.json(
                        { 
                            success: false, 
                            error: 'Database connection failed',
                            details: 'Unable to establish database connection'
                        },
                        { status: 503 }
                    );
            }
        }

        return NextResponse.json(
            { 
                success: false, 
                error: 'Database error',
                details: error.message || 'An unexpected database error occurred',
                errorCode: error.code || 'UNKNOWN'
            },
            { status: 500 }
        );
    }
} 