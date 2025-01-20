// path: src/data-processing/metrics.ts
import { TokenMetricsType } from '../../types/data';
import { loadExistingData } from './storage';

export async function getTokenStats() {
    const data = await loadExistingData();
    const totalTokens = data.length;
    const rugPulls = data.filter(t => t.metrics.isRugPull).length;
    const legitimateTokens = totalTokens - rugPulls;

    const averageMetrics = data.reduce<TokenMetricsType>((acc, token) => {
        acc.volumeAnomaly += token.metrics.volumeAnomaly || 0;
        acc.holderConcentration += token.metrics.holderConcentration || 0;
        acc.liquidityScore += token.metrics.liquidityScore || 0;
        acc.priceVolatility += token.metrics.priceVolatility || 0;
        acc.sellPressure += token.metrics.sellPressure || 0;
        acc.marketCapRisk += token.metrics.marketCapRisk || 0;
        acc.bundlerActivity = acc.bundlerActivity || token.metrics.bundlerActivity;
        acc.accumulationRate += token.metrics.accumulationRate || 0;
        acc.stealthAccumulation = (acc.stealthAccumulation || 0) + (token.metrics.stealthAccumulation ?? 0);
        acc.suspiciousPattern = acc.suspiciousPattern || false;
        acc.isRugPull = acc.isRugPull || token.metrics.isRugPull;
        acc.metadata = acc.metadata || token.metrics.metadata;
        acc.tokenAddress = acc.tokenAddress || token.metrics.tokenAddress;
        acc.timestamp = acc.timestamp || token.metrics.timestamp;
        acc.holders += token.metrics.holders || 0;
        acc.totalSupply += token.metrics.totalSupply || 0;
        acc.currentPrice += token.metrics.currentPrice || 0;
        acc.isHoneyPot = acc.isHoneyPot || token.metrics.isHoneyPot;
        return acc;
    }, {
        volumeAnomaly: 0,
        holderConcentration: 0,
        liquidityScore: 0,
        priceVolatility: 0,
        sellPressure: 0,
        marketCapRisk: 0,
        bundlerActivity: false,
        accumulationRate: 0,
        stealthAccumulation: 0,
        suspiciousPattern: false,
        isRugPull: false,
        metadata: '{reason: "default"}',
        tokenAddress: '',
        timestamp: new Date(),
        holders: 0,
        totalSupply: 0,
        currentPrice: 0,
        isHoneyPot: false
    });

    // Calculate averages
    if (totalTokens > 0) {
        Object.keys(averageMetrics).forEach((key) => {
            if (typeof averageMetrics[key as keyof TokenMetricsType] === 'number') {
                (averageMetrics as any)[key] = (Number(averageMetrics[key as keyof TokenMetricsType]) / totalTokens);
            }
        });
    }

    return {
        totalTokens,
        rugPulls,
        legitimateTokens,
        averageMetrics,
        lastUpdated: new Date().toISOString()
    };
} 