import { NextResponse } from 'next/server';
import pool from '@/lib/db/config';
import type { TokenData } from '@/src/types/metrics';
import { predictRisk } from '@/src/training/modelPredictor';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const revalidate = 0;

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const address = searchParams.get('address');

        if (!address) {
            return NextResponse.json({ error: 'Token address is required' }, { status: 400 });
        }

        const result = await pool.query('SELECT * FROM tokens WHERE address = $1', [address]);
        
        if (result.rows.length === 0) {
            return NextResponse.json({ error: 'Token not found' }, { status: 404 });
        }

        const tokenData: TokenData = result.rows[0];
        const riskMetrics = predictRisk(tokenData);

        return NextResponse.json(riskMetrics);
    } catch (error) {
        console.error('Error fetching risk metrics:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
} 