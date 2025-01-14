interface BaseMetrics {
    volumeAnomaly: number;
    holderConcentration: number;
    liquidityScore: number;
    priceVolatility: number;
    sellPressure: number;
    marketCapRisk: number;
    bundlerActivity: boolean;
    accumulationRate: number;
    stealthAccumulation: number;
    suspiciousPattern: boolean | null;
    isRugPull: boolean;
    metadata: { reason: string };
    timestamp: string;
}

interface TokenData {
    address: string;
    name: string;
    symbol: string;
    metrics: BaseMetrics;
}

interface TrainingData extends BaseMetrics {
    address: string;
}

export type { BaseMetrics, TokenData, TrainingData }; 