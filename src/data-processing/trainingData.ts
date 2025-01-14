import { BaseMetrics } from '../types/metrics';

// Sample training data
const sampleData: BaseMetrics[] = [
    {
        volumeAnomaly: 0.5,
        holderConcentration: 0.3,
        liquidityScore: 0.7,
        priceVolatility: 0.4,
        sellPressure: 0.2,
        marketCapRisk: 0.3,
        bundlerActivity: 0,
        accumulationRate: 0.1,
        stealthAccumulation: 0.2,
        suspiciousPattern: false,
        isRugPull: false,
        metadata: { reason: 'Sample legitimate token' },
        timestamp: new Date().toISOString()
    },
    {
        volumeAnomaly: 0.8,
        holderConcentration: 0.9,
        liquidityScore: 0.2,
        priceVolatility: 0.8,
        sellPressure: 0.7,
        marketCapRisk: 0.6,
        bundlerActivity: 1,
        accumulationRate: 0.8,
        stealthAccumulation: 0.9,
        suspiciousPattern: true,
        isRugPull: true,
        metadata: { reason: 'Sample rug pull token' },
        timestamp: new Date().toISOString()
    }
];

export async function loadExistingData(): Promise<BaseMetrics[]> {
    return sampleData;
}

export async function collectTrainingData(numTokens: number = 100): Promise<BaseMetrics[]> {
    return loadExistingData();
} 