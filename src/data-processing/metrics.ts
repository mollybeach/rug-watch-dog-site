// path: src/data-processing/metrics.ts
import { TokenMetrics, TokenData } from '../types/data';
import { loadExistingData } from './storage';

export async function getTokenStats() {
    const data = await loadExistingData();
    const totalTokens = data.length;
    const rugPulls = data.filter(t => t.metrics.is_rug_pull).length;
    const legitimate_tokens = totalTokens - rugPulls;

    const averageMetrics = data.reduce<TokenMetrics>((acc, token) => {
        acc.volume_anomaly += token.metrics.volume_anomaly;
        acc.holder_concentration += token.metrics.holder_concentration;
        acc.liquidity_score += token.metrics.liquidity_score;
        acc.price_volatility += token.metrics.price_volatility;
        acc.sell_pressure += token.metrics.sell_pressure;
        acc.market_cap_risk += token.metrics.market_cap_risk;
        return acc;
    }, {
        volume_anomaly: 0,
        holder_concentration: 0,
        liquidity_score: 0,
        price_volatility: 0,
        sell_pressure: 0,
        market_cap_risk: 0
    });

    // Calculate averages
    if (totalTokens > 0) {
        Object.keys(averageMetrics).forEach((key) => {
            (averageMetrics as any)[key] = averageMetrics[key as keyof TokenMetrics] / totalTokens;
        });
    }

    return {
        totalTokens,
        rugPulls,
        legitimate_tokens,
        averageMetrics,
        lastUpdated: new Date().toISOString()
    };
} 