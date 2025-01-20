// path: src/training/modelPredictor.ts
import type { TokenMetricsType, RiskMetricsType } from '../../../src/types/data';
import { NextResponse } from 'next/server';
import edgeDBCloudClient from '@/lib/db/config';
import type { TokenDataType } from '@/src/types/data';
import { predictRisk } from '@/src/training/modelPredictor';
import { SELECT_TOKEN } from '@/lib/db/queries';

export async function analyzeToken(token: TokenMetricsType): Promise<RiskMetricsType> {
    // If there's any asynchronous operation, include it here. Otherwise, wrap predictRisk.
    return predictRisk(token);
}

function calculateOverallRisk(token: TokenMetricsType): number {
    // Example: Average of all risk components
    const risks = [
        calculateLiquidityRisk(token),
        calculateConcentrationRisk(token),
        calculateVolatilityRisk(token),
        calculateSocialRisk(token),
        calculateTechnicalRisk(token)
    ];
    return risks.reduce((sum, risk) => sum + risk, 0) / risks.length;
}

function calculateLiquidityRisk(token: TokenMetricsType): number {
    // Example: Normalize liquidity score to a 0-1 scale
    return Math.min(Math.max(token.liquidityScore / 100, 0), 1);
}

function calculateConcentrationRisk(token: TokenMetricsType): number {
    // Example: Normalize holder concentration to a 0-1 scale
    return Math.min(Math.max(token.holderConcentration / 100, 0), 1);
}

function calculateVolatilityRisk(token: TokenMetricsType): number {
    // Example: Normalize price volatility to a 0-1 scale
    return Math.min(Math.max(token.priceVolatility / 100, 0), 1);
}

function calculateSocialRisk(token: TokenMetricsType): number {
    // Example: Binary risk based on rug pull status
    return token.isRugPull ? 1 : 0;
}

function calculateTechnicalRisk(token: TokenMetricsType): number {
    // Example: Binary risk based on suspicious pattern
    return token.suspiciousPattern ? 1 : 0;
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

        // Combine token data with risk metrics
        const riskMetrics = result.map(tokenData => {
            const overallRisk = calculateOverallRisk(tokenData.metrics);
            const risk = predictRisk(tokenData.metrics);
            return {
                ...tokenData, // Include original token data
                riskMetrics: {
                    ...risk,
                    overall: overallRisk // Add overall risk
                }
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