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
        tokenData.metrics.volume_anomaly,
        tokenData.metrics.holder_concentration,
        tokenData.metrics.liquidity_score,
        tokenData.metrics.price_volatility,
        tokenData.metrics.sell_pressure,
        tokenData.metrics.market_cap_risk,
        tokenData.metrics.bundler_activity,
        tokenData.metrics.accumulation_rate,
        tokenData.metrics.stealth_accumulation || 0,
        tokenData.metrics.suspicious_pattern ? 1 : 0
    ].map(f => f === null ? 0 : f);

    return tf.tensor2d([features], [1, features.length]);
}

export async function analyzeToken(tokenData: TokenData): Promise<BaseMetrics> {
    try {
        const features = preprocessFeatures(tokenData);
        const prediction = await model.predict(features) as tf.Tensor;
        const isRugPull = (await prediction.data())[0] > 0.5;

        const baseMetrics: BaseMetrics = {
            volume_anomaly: tokenData.metrics.volume_anomaly,
            holder_concentration: tokenData.metrics.holder_concentration,
            liquidity_score: tokenData.metrics.liquidity_score,
            price_volatility: tokenData.metrics.price_volatility,
            sell_pressure: tokenData.metrics.sell_pressure,
            market_cap_risk: tokenData.metrics.market_cap_risk,
            bundler_activity: tokenData.metrics.bundler_activity,
            accumulation_rate: tokenData.metrics.accumulation_rate,
            stealth_accumulation: tokenData.metrics.stealth_accumulation || 0,
            suspicious_pattern: tokenData.metrics.suspicious_pattern || false,
            is_rug_pull: isRugPull,
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