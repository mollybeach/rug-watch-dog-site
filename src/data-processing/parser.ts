//path: src/data-processing/parser.ts
import { TokenDataType } from '../../types/data';

interface ProcessedData {
    features: number[][];
    labels: number[];
}

export function normalizeFeatures(metrics: TokenDataType['metrics']): number[] {
    return [
        metrics.volumeAnomaly,
        metrics.holderConcentration,
        metrics.liquidityScore,
        metrics.priceVolatility,
        metrics.sellPressure,
        metrics.marketCapRisk
    ];
}

export function preprocessTokenData(data: TokenDataType[]): ProcessedData {
    return {
        features: data.map(token => normalizeFeatures(token.metrics)),
        labels: data.map(token => token.metrics.isRugPull ? 1 : 0)
    };
} 