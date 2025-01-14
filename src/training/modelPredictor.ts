//path: src/training/modelPredictor.ts
import * as tf from '@tensorflow/tfjs-node';
import { TokenData, BaseMetrics } from '../types/metrics';

let model: tf.LayersModel;

export async function loadModel(modelPath: string): Promise<void> {
    try {
        model = await tf.loadLayersModel(`file://${modelPath}`);
        console.log('Model loaded successfully');
    } catch (error) {
        console.error('Error loading model:', error);
        throw error;
    }
}

function preprocessFeatures(tokenData: TokenData): tf.Tensor2D {
    const features = [
        tokenData.metrics.volumeAnomaly,
        tokenData.metrics.holderConcentration,
        tokenData.metrics.liquidityScore,
        tokenData.metrics.priceVolatility,
        tokenData.metrics.sellPressure,
        tokenData.metrics.marketCapRisk,
        tokenData.metrics.bundlerActivity,
        tokenData.metrics.accumulationRate,
        tokenData.metrics.stealthAccumulation || 0,
        tokenData.metrics.suspiciousPattern ? 1 : 0
    ].map(f => f === null ? 0 : f);

    return tf.tensor2d([features], [1, features.length]);
}

export async function analyzeToken(tokenData: TokenData): Promise<BaseMetrics> {
    try {
        const features = preprocessFeatures(tokenData);
        const prediction = await model.predict(features) as tf.Tensor;
        const isRugPull = (await prediction.data())[0] > 0.5;

        const baseMetrics: BaseMetrics = {
            volumeAnomaly: tokenData.metrics.volumeAnomaly,
            holderConcentration: tokenData.metrics.holderConcentration,
            liquidityScore: tokenData.metrics.liquidityScore,
            priceVolatility: tokenData.metrics.priceVolatility,
            sellPressure: tokenData.metrics.sellPressure,
            marketCapRisk: tokenData.metrics.marketCapRisk,
            bundlerActivity: tokenData.metrics.bundlerActivity,
            accumulationRate: tokenData.metrics.accumulationRate,
            stealthAccumulation: tokenData.metrics.stealthAccumulation || 0,
            suspiciousPattern: tokenData.metrics.suspiciousPattern || false,
            isRugPull: isRugPull,
            metadata: {
                reason: isRugPull ? 'High risk indicators detected' : 'No significant risk detected'
            },
            timestamp: new Date().toISOString()
        };

        return baseMetrics;
    } catch (error) {
        console.error('Error analyzing token:', error);
        throw error;
    }
} 