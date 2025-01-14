export interface BaseMetrics {
    volumeAnomaly: number;
    holderConcentration: number;
    liquidityScore: number;
    priceVolatility: number;
    sellPressure: number;
    marketCapRisk: number;
    bundlerActivity: number;
    accumulationRate: number;
    stealthAccumulation: number | null;
    suspiciousPattern: boolean | null;
    isRugPull: boolean;
    metadata: { reason: string };
    timestamp: string;
}

export interface TokenData {
    address: string;
    name: string;
    symbol: string;
    metrics: BaseMetrics;
}

export interface TokenMetrics extends BaseMetrics {
    // TokenMetrics is identical to BaseMetrics for now
}

export interface TrainingData extends BaseMetrics {
    address: string; // Training data includes the token address
} 