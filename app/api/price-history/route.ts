/**
 * @title Price History API
 * @fileoverview Historical price data API
 */

import { NextResponse } from 'next/server';
import edgeDBCloudClient from '@/lib/db/config';
import { SELECT_TOKEN_PRICES } from '@/lib/db/queries';
import type { TokenPriceType } from '@/types/data';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const address = searchParams.get('address');

        if (!address) {
            return NextResponse.json({ error: 'Token address is required' }, { status: 400 });
        }

        const result: TokenPriceType[] = await edgeDBCloudClient.query(SELECT_TOKEN_PRICES, { address });

        return NextResponse.json(result);   
    } catch (error) {
        console.error('Error fetching price history:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
} 