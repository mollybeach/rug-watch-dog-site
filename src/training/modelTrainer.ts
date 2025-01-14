//path: src/training/modelTrainer.ts
import * as tf from '@tensorflow/tfjs-node';
import { BaseMetrics, TrainingData } from '../types/metrics';
import { preprocessTokenData } from '../data-processing/parser';
import path from 'path';

export async function trainModel(trainingData: TrainingData[]): Promise<tf.LayersModel> {
    try {
        // Convert training data to base metrics format
        const processedData: BaseMetrics[] = trainingData.map(data => ({
            volume_anomaly: data.volume_anomaly,
            holder_concentration: data.holder_concentration,
            liquidity_score: data.liquidity_score,
            price_volatility: data.price_volatility,
            sell_pressure: data.sell_pressure,
            market_cap_risk: data.market_cap_risk,
            bundler_activity: data.bundler_activity,
            accumulation_rate: data.accumulation_rate,
            stealth_accumulation: data.stealth_accumulation,
            suspicious_pattern: data.suspicious_pattern,
            is_rug_pull: data.is_rug_pull,
            metadata: data.metadata,
            timestamp: data.timestamp
        }));

        const { features, labels } = preprocessTokenData(processedData);

        // Create and compile model
        const model = tf.sequential();
        
        model.add(tf.layers.dense({
            units: 64,
            activation: 'relu',
            inputShape: [features[0].length]
        }));
        
        model.add(tf.layers.dropout({ rate: 0.2 }));
        model.add(tf.layers.dense({ units: 32, activation: 'relu' }));
        model.add(tf.layers.dropout({ rate: 0.2 }));
        model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' }));

        model.compile({
            optimizer: tf.train.adam(0.001),
            loss: 'binaryCrossentropy',
            metrics: ['accuracy']
        });

        // Convert data to tensors
        const xs = tf.tensor2d(features);
        const ys = tf.tensor2d(labels, [labels.length, 1]);

        // Train model
        await model.fit(xs, ys, {
            epochs: 100,
            batchSize: 32,
            validationSplit: 0.2,
            callbacks: {
                onEpochEnd: (epoch, logs) => {
                    console.log(`Epoch ${epoch + 1} - loss: ${logs?.loss.toFixed(4)} - accuracy: ${logs?.acc.toFixed(4)}`);
                }
            }
        });

        // Save model
        const modelPath = path.join(__dirname, '../../models/rugpull_model');
        await model.save(`file://${modelPath}`);
        console.log(`Model saved to ${modelPath}`);

        // Clean up tensors
        xs.dispose();
        ys.dispose();

        return model;
    } catch (error) {
        console.error('Error training model:', error);
        throw error;
    }
}

// Run training if called directly
if (require.main === module) {
    const dummyData: TrainingData[] = [{
        volume_anomaly: 0.5,
        holder_concentration: 0.3,
        liquidity_score: 0.7,
        price_volatility: 0.4,
        sell_pressure: 0.2,
        market_cap_risk: 0.3,
        bundler_activity: 0.2,
        accumulation_rate: 0.1,
        stealth_accumulation: 0.2,
        suspicious_pattern: false,
        is_rug_pull: false,
        metadata: { reason: 'Training data' },
        timestamp: new Date().toISOString(),
        address: '0x0'
    }];
    trainModel(dummyData).catch(console.error);
}

