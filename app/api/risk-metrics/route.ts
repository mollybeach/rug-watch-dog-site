import { NextResponse } from 'next/server';
import edgeDBCloudClient from '@/lib/db/config';
import type { TokenDataType, TokenMetricsType, RiskMetricsType } from '@/types/data';
import { SELECT_TOKEN } from '@/lib/db/queries';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const revalidate = 0;

// Define the predictRisk function directly in this file
function calculateLiquidityRisk(token: TokenMetricsType): number {
    return Math.min(Math.max(token.liquidityScore / 100, 0), 1);
}

function calculateConcentrationRisk(token: TokenMetricsType): number {
    return Math.min(Math.max(token.holderConcentration / 100, 0), 1);
}

function calculateVolatilityRisk(token: TokenMetricsType): number {
    return Math.min(Math.max(token.priceVolatility / 100, 0), 1);
}

function calculateSocialRisk(token: TokenMetricsType): number {
    return token.isRugPull ? 1 : 0;
}

function calculateTechnicalRisk(token: TokenMetricsType): number {
    return token.suspiciousPattern ? 1 : 0;
}

function calculateOverallRisk(token: TokenMetricsType): number {
    const risks = [
        calculateLiquidityRisk(token),
        calculateConcentrationRisk(token),
        calculateVolatilityRisk(token),
        calculateSocialRisk(token),
        calculateTechnicalRisk(token)
    ];
    return risks.reduce((sum, risk) => sum + risk, 0) / risks.length;
}

async function predictRisk(token: TokenMetricsType): Promise<RiskMetricsType> {
    return {
        overall: calculateOverallRisk(token),
        liquidity: calculateLiquidityRisk(token),
        concentration: calculateConcentrationRisk(token),
        volatility: calculateVolatilityRisk(token),
        social: calculateSocialRisk(token),
        technical: calculateTechnicalRisk(token),
        totalTokens: 0,
        highRiskCount: 0,
        mediumRiskCount: 0,
        lowRiskCount: 0
    };
}

export async function GET(request: Request) {
    try {
        const query = SELECT_TOKEN;
        const result: TokenDataType[] = await edgeDBCloudClient.query(query);

        if (result.length === 0) {
            return NextResponse.json({ error: 'No tokens found' }, { status: 404 });
        }

        // Use the predictRisk function directly
        const riskMetricsPromises = result.map(async (tokenData) => {
            const riskMetrics = await predictRisk(tokenData.metrics);
            return {
                ...tokenData, // Include original token data
                riskMetrics // Add risk metrics
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