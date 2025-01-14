/**
 * @title Price History API
 * @fileoverview Historical price data API
 */

import { NextResponse } from 'next/server';
import { pool } from '@/lib/db/config';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const address = searchParams.get('address');
    const limit = parseInt(searchParams.get('limit') || '100');

    if (!address) {
        return NextResponse.json(
            { success: false, error: 'Token address is required' },
            { status: 400 }
        );
    }

    try {
        const result = await pool.query(`
            SELECT 
                price,
                volume24h,
                marketCap,
                liquidity,
                timestamp
            FROM public.token_price
            WHERE tokenAddress = $1
            ORDER BY timestamp DESC
            LIMIT $2
        `, [address, limit]);

        return NextResponse.json({
            success: true,
            data: result.rows
        });
    } catch (error) {
        console.error('Error fetching price history:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch price history' },
            { status: 500 }
        );
    }
} 