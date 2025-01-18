import { TokenDataType, TokenMetricsType } from '../../types/data';

export function processTrainingData(data: TokenDataType[]) {
    const rugPulls = data.filter((t: TokenDataType) => t.metrics.isRugPull).length;

    const initialMetrics: TokenMetricsType = {
        metadata: '',
        tokenAddress: '',
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
        timestamp: new Date(),
        holders: 0,
        totalSupply: 0,
        currentPrice: 0,
        isHoneyPot: false
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
        acc.stealthAccumulation = (acc.stealthAccumulation ?? 0) + (token.metrics.stealthAccumulation ?? 0);
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
        stealthAccumulation: (totals.stealthAccumulation ?? 0) / count,
        suspiciousPattern: totals.suspiciousPattern,
        isRugPull: totals.isRugPull
    };

    return {
        rugPulls,
        averageMetrics,
        totalTokens: count
    };
} 