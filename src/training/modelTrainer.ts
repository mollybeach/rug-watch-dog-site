//path: src/training/modelTrainer.ts
import * as tf from '@tensorflow/tfjs-node';
import { TokenMetricsType, TrainingDataType } from '../types/data';
import { preprocessTokenData } from '../data-processing/parser';
//import path from 'path';

export async function trainModel(trainingData: TrainingDataType[]): Promise<tf.LayersModel> {
    try {
        const processedData: TokenMetricsType[] = trainingData.map(data => ({
            address: data.address,
            name: data.name,
            symbol: data.symbol,
            metadata: data.metadata,
            tokenAddress: data.tokenAddress,
            volumeAnomaly: data.volumeAnomaly,
            holderConcentration: data.holderConcentration,
            liquidityScore: data.liquidityScore,
            priceVolatility: data.priceVolatility,
            sellPressure: data.sellPressure,
            marketCapRisk: data.marketCapRisk,
            bundlerActivity: data.bundlerActivity,
            accumulationRate: data.accumulationRate,
            stealthAccumulation: data.stealthAccumulation,
            suspiciousPattern: data.suspiciousPattern,
            isRugPull: data.isRugPull,
            timestamp: data.timestamp,
            holders: data.holders,
            totalSupply: data.totalSupply,
            currentPrice: data.currentPrice,
            isHoneyPot: data.isHoneyPot,
            price: data.price,
            volume24h: data.volume24h,
            marketCap: data.marketCap,
            liquidity: data.liquidity,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt
        }));

        const { features, labels } = preprocessTokenData(processedData);

        if (features && features.length > 0 && labels && labels.length > 0) {
            // Proceed with model training
        } else {
            console.error('Features or labels are undefined or empty');
        }

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
        /*&
        const modelPath = path.join(__dirname, '../../models/rugpull_model');
        await model.save(`file://${modelPath}`);
        console.log(`Model saved to ${modelPath}`);*/

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
    const dummyData: TrainingDataType[] = [{
        address: '0x0',
        name: 'Test Token',
        symbol: 'TEST',
        metadata: { reason: 'Training data' }.toString(),
        tokenAddress: '0x0',
        volumeAnomaly: 0.5,
        holderConcentration: 0.3,
        liquidityScore: 0.7,
        priceVolatility: 0.4,
        sellPressure: 0.2,
        marketCapRisk: 0.3,
        bundlerActivity: false,
        accumulationRate: 0.1,
        stealthAccumulation: 0.2,
        suspiciousPattern: "false",
        isRugPull: false,
        timestamp: new Date(),
        holders: 1000000,
        totalSupply: 1000000,
        currentPrice: 100,
        isHoneyPot: false,
        price: 100,
        volume24h: 1000000,
        marketCap: 1000000,
        liquidity: 1000000,
        createdAt: new Date(),
        updatedAt: new Date(),
    }];
    trainModel(dummyData).catch(console.error);
}

