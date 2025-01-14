import { BaseMetrics } from '../types/metrics';

interface ProcessedData {
    features: number[][];
    labels: number[];
}

export function normalizeFeatures(data: BaseMetrics): number[] {
    return [
        data.volumeAnomaly,
        data.holderConcentration,
        data.liquidityScore,
        data.priceVolatility,
        data.sellPressure,
        data.marketCapRisk,
        data.bundlerActivity,
        data.accumulationRate,
        data.stealthAccumulation,
        data.suspiciousPattern ? 1 : 0
    ];
}

export function preprocessTokenData(data: BaseMetrics[]): ProcessedData {
    return {
        features: data.map(token => normalizeFeatures(token)),
        labels: data.map(token => token.isRugPull ? 1 : 0)
    };
} 