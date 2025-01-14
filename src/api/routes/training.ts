import { TokenData, BaseMetrics } from '../../types/data';

export function processTrainingData(data: TokenData[]) {
    const rugPulls = data.filter((t: TokenData) => t.metrics.isRugPull).length;

    const initialMetrics: BaseMetrics = {
        volumeAnomaly: 0,
        holderConcentration: 0,
        liquidityScore: 0,
        priceVolatility: 0,
        sellPressure: 0,
        marketCapRisk: 0,
        bundlerActivity: false,
        accumulationRate: 0,
        stealthAccumulation: 0,
        suspiciousPattern: null,
        isRugPull: false,
        metadata: { reason: '' },
        timestamp: new Date().toISOString()
    };

    const totals = data.reduce((acc, token) => {
        acc.volumeAnomaly += token.metrics.volumeAnomaly;
        acc.holderConcentration += token.metrics.holderConcentration;
        acc.liquidityScore += token.metrics.liquidityScore;
        acc.priceVolatility += token.metrics.priceVolatility;
        acc.sellPressure += token.metrics.sellPressure;
        acc.marketCapRisk += token.metrics.marketCapRisk;
        acc.bundlerActivity = acc.bundlerActivity || token.metrics.bundlerActivity;
        acc.accumulationRate += token.metrics.accumulationRate;
        acc.stealthAccumulation += token.metrics.stealthAccumulation;
        acc.suspiciousPattern = acc.suspiciousPattern || token.metrics.suspiciousPattern;
        acc.isRugPull = acc.isRugPull || token.metrics.isRugPull;
        return acc;
    }, { ...initialMetrics });

    const count = data.length;
    const averageMetrics = {
        ...initialMetrics,
        volumeAnomaly: totals.volumeAnomaly / count,
        holderConcentration: totals.holderConcentration / count,
        liquidityScore: totals.liquidityScore / count,
        priceVolatility: totals.priceVolatility / count,
        sellPressure: totals.sellPressure / count,
        marketCapRisk: totals.marketCapRisk / count,
        bundlerActivity: totals.bundlerActivity,
        accumulationRate: totals.accumulationRate / count,
        stealthAccumulation: totals.stealthAccumulation / count,
        suspiciousPattern: totals.suspiciousPattern,
        isRugPull: totals.isRugPull
    };

    return {
        rugPulls,
        averageMetrics,
        totalTokens: count
    };
} 