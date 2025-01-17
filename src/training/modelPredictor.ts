//path: src/training/modelPredictor.ts
import * as tf from '@tensorflow/tfjs-node';
import { TokenData, TokenMetrics } from '../types/metrics';

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
        tokenData.metrics.bundlerActivity ? 1 : 0,
        tokenData.metrics.accumulationRate,
        tokenData.metrics.stealthAccumulation || 0,
        tokenData.metrics.suspiciousPattern ? 1 : 0
    ].map(f => f === null ? 0 : f);

    return tf.tensor2d([features], [1, features.length]);
}

export async function analyzeToken(tokenData: TokenData): Promise<TokenMetrics> {
    try {
        const features = preprocessFeatures(tokenData);
        const prediction = await model.predict(features) as tf.Tensor;
        const isRugPull = (await prediction.data())[0] > 0.5;

        const tokenMetrics: TokenMetrics = {
            volumeAnomaly: tokenData.metrics.volumeAnomaly,
            holderConcentration: tokenData.metrics.holderConcentration,
            liquidityScore: tokenData.metrics.liquidityScore,
            priceVolatility: tokenData.metrics.priceVolatility,
            sellPressure: tokenData.metrics.sellPressure,
            marketCapRisk: tokenData.metrics.marketCapRisk,
            bundlerActivity: tokenData.metrics.bundlerActivity,
            accumulationRate: tokenData.metrics.accumulationRate,
            stealthAccumulation: tokenData.metrics.stealthAccumulation || 0,
            suspiciousPattern: tokenData.metrics.suspiciousPattern || null,
            isRugPull: isRugPull,
            metadata: isRugPull ? { reason: 'High risk indicators detected' } : { reason: 'No significant risk detected' },
            tokenAddress: tokenData.address,
            timestamp: new Date().toISOString(),
            holders: 0, // Placeholder, update as needed
            total_supply: 0, // Placeholder, update as needed
            current_price: 0, // Placeholder, update as needed
            is_honeypot: false // Placeholder, update as needed
        };

        return tokenMetrics;
    } catch (error) {
        console.error('Error analyzing token:', error);
        throw error;
    }
} 