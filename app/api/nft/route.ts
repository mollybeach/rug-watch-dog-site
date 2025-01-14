import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        return NextResponse.json({
            success: true,
            data: []
        });
    } catch (error) {
        console.error('NFT API error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch NFT data' },
            { status: 500 }
        );
    }
}
