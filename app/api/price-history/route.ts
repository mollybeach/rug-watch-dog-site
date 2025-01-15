/**
 * @title Price History API
 * @fileoverview Historical price data API
 */

import { NextResponse } from 'next/server';
import pool from '@/lib/db/config';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const address = searchParams.get('address');

        if (!address) {
            return NextResponse.json({ error: 'Token address is required' }, { status: 400 });
        }

        const result = await pool.query(
            'SELECT price, timestamp FROM token_prices WHERE tokenAddress = $1 ORDER BY timestamp DESC LIMIT 100',
            [address]
        );

        return NextResponse.json({
            success: true,
            data: result.rows
        });
    } catch (error) {
        console.error('Error fetching price history:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
} 