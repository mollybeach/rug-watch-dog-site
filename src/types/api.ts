import { TokenMetrics } from './data';

export interface TokenAnalysisRequest {
    token_address: string;
    chain?: string;
}

export interface TokenAnalysis {
    token: string;
    rugPullProbability: number;
    metrics: {
        volumeAnomaly: number;
        holderConcentration: number;
        liquidityScore: number;
        priceVolatility: number;
        sellPressure: number;
        market_cap_risk: number;
    };
    bundlerActivity: boolean;
    accumulationRate: number;
    stealthAccumulation: number;
    suspiciousPattern: number;
    reason: string;
}

export interface TokenStatsResponse {
    totalTokens: number;
    rugPulls: number;
    legitimateTokens: number;
    averageMetrics: TokenMetrics;
    lastUpdated: string;
} 