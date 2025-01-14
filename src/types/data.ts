export interface TokenMetrics {
    volume_anomaly: number;
    holder_concentration: number;
    liquidity_score: number;
    price_volatility: number;
    sell_pressure: number;
    market_cap_risk: number;
}

export interface BaseMetrics extends TokenMetrics {
    is_rug_pull: boolean;
    bundler_activity: boolean;
    accumulation_rate: number;
    stealth_accumulation: number;
    suspicious_pattern: boolean | null;
    metadata: Record<string, any>;
}

export interface TokenData {
    address: string;
    name: string;
    symbol: string;
    metrics: TokenMetrics & {
        is_rug_pull: boolean;
        bundler_activity: boolean;
        accumulation_rate: number;
        stealth_accumulation: number;
        suspicious_pattern: boolean | null;
        metadata: Record<string, any>;
    };
    price: {
        price: number;
        volume24h: number;
        market_cap: number;
        liquidity: number;
    };
}

export interface TrainingData extends BaseMetrics {
    // Training data only needs the core metrics
}

export interface TokenAnalysis {
    token: string;
    rug_pull_probability: number;
    metrics: TokenMetrics;
    bundler_activity: boolean;
    accumulation_rate: number;
    stealth_accumulation: number;
    suspicious_pattern: boolean | null;
    reason: string;
}

export interface ReasonMessage {
    condition: boolean;
    message: string;
}

export interface TokenAnalysisReason {
    reasons: string[];
    formatted: string;
} 