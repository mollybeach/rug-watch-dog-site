import { BaseMetrics } from '../types/metrics';

interface ProcessedData {
    features: number[][];
    labels: number[];
}

export function normalizeFeatures(data: BaseMetrics): number[] {
    return [
        data.volume_anomaly,
        data.holder_concentration,
        data.liquidity_score,
        data.price_volatility,
        data.sell_pressure,
        data.market_cap_risk,
        data.bundler_activity,
        data.accumulation_rate,
        data.stealth_accumulation,
        data.suspicious_pattern ? 1 : 0
    ];
}

export function preprocessTokenData(data: BaseMetrics[]): ProcessedData {
    return {
        features: data.map(token => normalizeFeatures(token)),
        labels: data.map(token => token.is_rug_pull ? 1 : 0)
    };
} 