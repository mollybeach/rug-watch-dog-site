import { NextResponse } from 'next/server';
import pool from '@/lib/db/config';

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
            LIMIT 10;
        `;

        const result = await pool.query(query);

        return NextResponse.json({
            success: true,
            data: result.rows
        });
    } catch (error: any) {
        console.error('Error fetching risk metrics:', error);
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