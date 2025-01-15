import { NextResponse } from 'next/server';
import client from '@/lib/db/config';
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

        // Validate UUID format
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        if (!uuidRegex.test(id)) {
            return NextResponse.json({ error: 'Invalid UUID format' }, { status: 400 });
        }

        const result: TokenMetrics[] = await client.query(`
            SELECT TokenMetrics {
                tokenAddress,
                volumeAnomaly,
                holderConcentration,
                liquidityScore,
                priceVolatility,
                sellPressure,
                marketCapRisk,
                isRugPull,
                timestamp
            } FILTER .id = <uuid>$0
        `, [id]);

        console.log('Database query result:', result);
        if (result.length === 0) {
            return NextResponse.json({ error: 'Token not found' }, { status: 404 });
        }

        const tokenData: TokenMetrics = result[0];
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