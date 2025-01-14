export interface TokenMetrics {
    volumeAnomaly: number;
    holderConcentration: number;
    liquidityScore: number;
    priceVolatility: number;
    sellPressure: number;
    marketCapRisk: number;
}

export interface BaseMetrics extends TokenMetrics {
    isRugPull: boolean;
    bundlerActivity: boolean;
    accumulationRate: number;
    stealthAccumulation: number;
    suspiciousPattern: boolean | null;
    metadata: Record<string, any>;
}

export interface TokenData {
    address: string;
    name: string;
    symbol: string;
    metrics: TokenMetrics & {
        isRugPull: boolean;
        bundlerActivity: boolean;
        accumulationRate: number;
        stealthAccumulation: number;
        suspiciousPattern: boolean | null;
        metadata: Record<string, any>;
    };
    price: {
        price: number;
        volume24h: number;
        marketCap: number;
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