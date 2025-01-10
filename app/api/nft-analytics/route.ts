/**
 * @title NFT Analytics API
 * @fileoverview NFT market analytics data API
 * @path /api/nft-analytics/route.ts
 */

import { NextResponse } from 'next/server';
export const runtime = 'edge';
export const dynamic = "force-dynamic";
export const revalidate = 60; // Revalidate every 60 seconds

const mockNFTData = {
    collections: [
        { name: 'BAYC', volume: 1250, floorPrice: 32.5, holders: 6000 },
        { name: 'Azuki', volume: 850, floorPrice: 15.2, holders: 5200 },
        { name: 'Doodles', volume: 420, floorPrice: 8.1, holders: 4800 },
        { name: 'CloneX', volume: 380, floorPrice: 6.8, holders: 4200 },
        { name: 'Moonbirds', volume: 290, floorPrice: 4.2, holders: 3800 },
    ]
};

export async function GET() {
    try {
        return NextResponse.json(mockNFTData, { status: 200 });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json(
                { error: `Failed to fetch NFT data: ${error.message}` },
                { status: 500 }
            );
        }
        return NextResponse.json(
            { error: 'Failed to fetch NFT data' },
            { status: 500 }
        );
    }
} 