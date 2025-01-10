/**
 * @title Price History API
 * @fileoverview Historical price data API
 * @path /api/price-history/route.ts
 */

import { NextResponse } from 'next/server';
export const runtime = 'edge';
export const dynamic = "force-dynamic";
export const revalidate = 60;

function generatePriceHistory() {
    const now = new Date();
    const dates = Array.from({length: 30}, (_, i) => {
        const date = new Date(now);
        date.setDate(date.getDate() - (29 - i));
        return date.toISOString();
    });

    return {
        dates,
        collections: {
            BAYC: dates.map((_, i) => 50 + Math.sin(i/3) * 10 + Math.random() * 5),
            Azuki: dates.map((_, i) => 30 + Math.cos(i/4) * 8 + Math.random() * 4),
            CryptoPunks: dates.map((_, i) => 80 + Math.sin(i/2) * 15 + Math.random() * 6),
        }
    };
}

export async function GET() {
    try {
        const priceData = generatePriceHistory();
        return NextResponse.json(priceData, { status: 200 });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json(
                { error: `Failed to fetch price history: ${error.message}` },
                { status: 500 }
            );
        }
        return NextResponse.json(
            { error: 'Failed to fetch price history' },
            { status: 500 }
        );
    }
} 