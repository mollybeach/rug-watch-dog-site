import { NextResponse } from 'next/server';
import edgeDBCloudClient from '@/lib/db/config';
import type { TokenDataType } from '@/src/types/data';
import { predictRisk } from '@/src/training/modelPredictor';
import { SELECT_TOKEN } from '@/lib/db/queries';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const revalidate = 0;

export async function GET(request: Request) {
    try {
        const query = SELECT_TOKEN;
        const result: TokenDataType[] = await edgeDBCloudClient.query(query);

        if (result.length === 0) {
            return NextResponse.json({ error: 'No tokens found' }, { status: 404 });
        }

        // Combine token data with risk metrics
        const riskMetrics = result.map(tokenData => {
            const risk = predictRisk(tokenData.metrics);
            return {
                ...tokenData, // Include original token data
                riskMetrics: risk // Add risk metrics
            };
        });

        // Calculate risk counts
        const highRiskCount = riskMetrics.filter(rm => rm.riskMetrics.overall > 0.7).length;
        const mediumRiskCount = riskMetrics.filter(rm => rm.riskMetrics.overall > 0.4 && rm.riskMetrics.overall <= 0.7).length;
        const lowRiskCount = riskMetrics.filter(rm => rm.riskMetrics.overall <= 0.4).length;

        return NextResponse.json({
            success: true,
            data: riskMetrics,
            metadata: {
                totalTokens: result.length,
                highRiskCount,
                mediumRiskCount,
                lowRiskCount,
                timestamp: new Date().toISOString(),
            }
        });
    } catch (error) {
        console.error('Error fetching risk metrics:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
} 