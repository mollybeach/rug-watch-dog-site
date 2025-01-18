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

        const riskMetrics = result.map(tokenData => predictRisk(tokenData));

        return NextResponse.json({
            success: true,
            data: riskMetrics,
            metadata: {
                totalTokens: result.length,
                highRiskCount: riskMetrics.filter(rm => rm.riskCategory === 'High').length,
                mediumRiskCount: riskMetrics.filter(rm => rm.riskCategory === 'Medium').length,
                lowRiskCount: riskMetrics.filter(rm => rm.riskCategory === 'Low').length,
                timestamp: new Date().toISOString(),
            }
        });
    } catch (error) {
        console.error('Error fetching risk metrics:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
} 