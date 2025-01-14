import { TrainingData, BaseMetrics } from '../types/data';

export function evaluateModel(data: TrainingData): BaseMetrics {
    return {
        volumeAnomaly: data.volumeAnomaly ?? 0,
        holderConcentration: data.holderConcentration ?? 0,
        liquidityScore: data.liquidityScore ?? 0,
        priceVolatility: data.priceVolatility ?? 0,
        sellPressure: data.sellPressure ?? 0,
        marketCapRisk: data.marketCapRisk ?? 0,
        bundlerActivity: data.bundlerActivity ?? false,
        accumulationRate: data.accumulationRate ?? 0,
        stealthAccumulation: data.stealthAccumulation ?? 0,
        suspiciousPattern: data.suspiciousPattern ?? null,
        isRugPull: data.isRugPull ?? false,
        metadata: data.metadata ?? { reason: '' },
        timestamp: data.timestamp ?? new Date().toISOString()
    };
}

export function printEvaluationReport(metrics: BaseMetrics): void {
    console.log('\nModel Evaluation Report:');
    console.log('------------------------');
    console.log(`Volume Anomaly: ${metrics.volumeAnomaly.toFixed(4)}`);
    console.log(`Holder Concentration: ${metrics.holderConcentration.toFixed(4)}`);
    console.log(`Liquidity Score: ${metrics.liquidityScore.toFixed(4)}`);
    console.log(`Price Volatility: ${metrics.priceVolatility.toFixed(4)}`);
    console.log(`Sell Pressure: ${metrics.sellPressure.toFixed(4)}`);
    console.log(`Market Cap Risk: ${metrics.marketCapRisk.toFixed(4)}`);
    console.log(`Bundler Activity: ${metrics.bundlerActivity}`);
    console.log(`Accumulation Rate: ${metrics.accumulationRate.toFixed(4)}`);
    console.log(`Stealth Accumulation: ${metrics.stealthAccumulation.toFixed(4)}`);
    console.log(`Suspicious Pattern: ${metrics.suspiciousPattern}`);
    console.log(`Is Rug Pull: ${metrics.isRugPull}`);
    console.log(`Reason: ${metrics.metadata.reason}`);
    console.log(`Timestamp: ${metrics.timestamp}`);
    console.log('------------------------\n');
} 