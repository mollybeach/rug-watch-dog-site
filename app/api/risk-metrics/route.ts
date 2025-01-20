// path: app/api/risk-metrics/route.ts
import { NextResponse } from 'next/server';
import edgeDBCloudClient from '@/lib/db/config';
import type { TokenDataType } from '@/types/data';
import { SELECT_TOKEN } from '@/lib/db/queries';
import fetch from 'node-fetch'; // Import fetch for making HTTP requests

interface RiskResponse {
    success: boolean;
    data: any; // Replace 'any' with the specific type if known
}

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

        // Use the predictRisk API route
        const riskMetricsPromises = result.map(async (tokenData) => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/predictRisk`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(tokenData.metrics),
            });

            const risk = await response.json() as RiskResponse; // Type assertion here
            return {
                ...tokenData, // Include original token data
                riskMetrics: risk.data // Add risk metrics
            };
        });

        const riskMetrics = await Promise.all(riskMetricsPromises);

        // Calculate risk counts
        const highRiskCount = riskMetrics.filter(rm => rm.riskMetrics.overall > 0.7).length;
        const mediumRiskCount = riskMetrics.filter(rm => rm.riskMetrics.overall > 0.4 && rm.riskMetrics.overall <= 0.7).length;
        const lowRiskCount = riskMetrics.filter(rm => rm.riskMetrics.overall <= 0.4).length;

        return NextResponse.json({
            success: true,
            data: riskMetrics,
            metadata: {
                overallRisk: riskMetrics.map(rm => rm.riskMetrics.overall),
                liquidity: riskMetrics.map(rm => rm.riskMetrics.liquidity),
                concentration: riskMetrics.map(rm => rm.riskMetrics.concentration),
                volatility: riskMetrics.map(rm => rm.riskMetrics.volatility),
                social: riskMetrics.map(rm => rm.riskMetrics.social),
                technical: riskMetrics.map(rm => rm.riskMetrics.technical),
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
