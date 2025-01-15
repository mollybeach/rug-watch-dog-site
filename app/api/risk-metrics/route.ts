import { NextResponse } from 'next/server';
import pool from '@/lib/db/config';
import type { TokenMetrics } from '@/src/types/metrics';
import { predictRisk } from '@/src/training/modelPredictor';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const revalidate = 0;

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Token ID is required' }, { status: 400 });
        }

        const result = await pool.query('SELECT * FROM token_metrics WHERE id = $1', [id]);
        
        console.log('Database query result:', result.rows);
        if (result.rows.length === 0) {
            return NextResponse.json({ error: 'Token not found' }, { status: 404 });
        }

        const tokenData: TokenMetrics = result.rows[0];
        const riskMetrics = predictRisk(tokenData);

        return NextResponse.json({
            success: true,
            data: riskMetrics,
            metadata: {
                totalTokens: 1, // Example metadata
                highRiskCount: 0,
                mediumRiskCount: 1,
                lowRiskCount: 0,
                timestamp: new Date().toISOString(),
            }
        });
    } catch (error) {
        console.error('Error fetching risk metrics:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
} 