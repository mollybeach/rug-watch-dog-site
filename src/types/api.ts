import { TokenMetrics } from './data';

export interface TokenAnalysisRequest {
    token_address: string;
    chain?: string;
}

export interface TokenAnalysis {
    token: string;
    rug_pull_probability: number;
    metrics: {
        volume_anomaly: number;
        holder_concentration: number;
        liquidity_score: number;
        price_volatility: number;
        sell_pressure: number;
        market_cap_risk: number;
    };
    bundler_activity: boolean;
    accumulation_rate: number;
    stealth_accumulation: number;
    suspicious_pattern: number;
    reason: string;
}

export interface TokenStatsResponse {
    total_tokens: number;
    rug_pulls: number;
    legitimate_tokens: number;
    average_metrics: TokenMetrics;
    last_updated: string;
} 