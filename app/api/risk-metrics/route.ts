import { NextResponse } from 'next/server';
import { getClient } from '@/lib/db/config';
import type { QueryResultRow } from 'pg';
import { QueryResult } from '@vercel/postgres';

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
        const result = await Promise.race([
            client.query<RiskMetricsRow>(`
                SELECT * FROM risk_metrics 
                ORDER BY timestamp DESC 
                LIMIT 5;
            `),
            new Promise<never>((_, reject) => 
                setTimeout(() => reject(new Error('Query timeout')), 20000)
            )
        ]) as QueryResult<RiskMetricsRow>;

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