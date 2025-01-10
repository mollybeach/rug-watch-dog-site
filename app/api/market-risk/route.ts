/**
 * @title Market Risk API
 * @fileoverview Market risk analysis data API
 * @path /api/market-risk/route.ts
 */

import { NextResponse } from 'next/server';
export const runtime = 'edge';
export const dynamic = "force-dynamic";
export const revalidate = 60;

const mockMarketData = {
    assets: [
        // Blue Chip NFTs
        { name: "BAYC", priceChange: 1.8, volume: 2e-7, type: "nft", category: "blue_chip" },
        { name: "CryptoPunks", priceChange: 1.2, volume: 1.5e-6, type: "nft", category: "blue_chip" },
        { name: "Azuki", priceChange: -0.8, volume: 3e-6, type: "nft", category: "blue_chip" },
        
        // Major Altcoins
        { name: "SOL", priceChange: 2.5, volume: 1.5e-5, type: "coin", category: "major_alt" },
        { name: "MATIC", priceChange: -1.2, volume: 2e-5, type: "coin", category: "major_alt" },
        
        // High Risk Assets
        { name: "MoonDAO", priceChange: -5.2, volume: 8e-4, type: "coin", category: "high_risk" },
        { name: "ElonAI", priceChange: 8.5, volume: 9e-4, type: "coin", category: "high_risk" },
        { name: "PixelApes", priceChange: -4.2, volume: 7.5e-4, type: "nft", category: "high_risk" },
    ]
};

export async function GET() {
    try {
        return NextResponse.json(mockMarketData, { status: 200 });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json(
                { error: `Failed to fetch market risk data: ${error.message}` },
                { status: 500 }
            );
        }
        return NextResponse.json(
            { error: 'Failed to fetch market risk data' },
            { status: 500 }
        );
    }
} 