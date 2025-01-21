import { TrainingDataType } from '../../types/data';

interface ProcessedData {
    features: number[][];
    labels: number[];
}

export function normalizeFeatures(data: TrainingDataType): number[] {
    return [
        data.volumeAnomaly,
        data.holderConcentration,
        data.liquidityScore,
        data.priceVolatility,
        data.sellPressure,
        data.marketCapRisk,
        data.bundlerActivity ? 1 : 0,
        data.accumulationRate,
        data.stealthAccumulation,
        data.suspiciousPattern ? 1 : 0,  
    ];
}

export function preprocessTokenData(data: TrainingDataType[]): ProcessedData {
    return {
        features: data.map(token => normalizeFeatures(token)),
        labels: data.map(token => token.isRugPull ? 1 : 0)
    };
} 