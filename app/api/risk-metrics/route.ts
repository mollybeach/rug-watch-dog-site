import { NextResponse } from 'next/server';
import pool from '@/lib/db/config';

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
    bundlerActivity: boolean;
    accumulationRate: number;
    stealthAccumulation: number | null;
    suspiciousPattern: boolean | null;
    isRugPull: boolean;
    metadata: { reason: string };
    timestamp: string;
}

export async function GET() {
    try {
        console.log('Starting risk metrics API request...');
        
        // First test the connection
        try {
            const testResult = await pool.query('SELECT NOW()');
            console.log('Database connection test successful:', testResult.rows[0]);
        } catch (connError) {
            console.error('Database connection failed:', connError);
            throw connError;
        }

        const query = `
            SELECT DISTINCT ON (t.address)
                t.address,
                t.name,
                t.symbol,
                tm."tokenAddress",
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
                tm.metadata,
                tm.timestamp
            FROM tokens t
            LEFT JOIN token_metrics tm ON t.address = tm."tokenAddress"
            WHERE tm.timestamp >= NOW() - INTERVAL '24 hours'
            ORDER BY t.address, tm.timestamp DESC
            LIMIT 25;
        `;

        const result = await pool.query<RiskMetricsRow>(query);
        console.log('Query result:', result.rows);
        
        return NextResponse.json({
            success: true,
            data: result.rows
        });
    } catch (error: any) {
        console.error('Detailed error:', {
            message: error.message,
            code: error.code,
            detail: error.detail,
            stack: error.stack
        });
        
        return NextResponse.json(
            { 
                success: false, 
                error: 'Failed to fetch risk metrics',
                details: error.message 
            },
            { status: 500 }
        );
    }
} 