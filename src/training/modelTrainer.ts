//path: src/training/modelTrainer.ts
import * as tf from '@tensorflow/tfjs-node';
import { TrainingDataType } from '../../types/data';
import { preprocessTokenData } from '../data-processing/parser';
import path from 'path';


export async function trainModel(trainingData: TrainingDataType[]): Promise<tf.LayersModel> {
    try {
        // Convert training data to base metrics format
        const processedData: TrainingDataType[] = trainingData.map(data => ({
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
            metadata: data.metadata
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
        console.log('features')
        console.log(features)
        console.log('labels')
        console.log(labels)
        const xs = tf.tensor2d(features);
        const ys = tf.tensor2d(labels, [labels.length, 1]);
      
    
        // Train model
       // console.log('model')
       // console.log(model)
        const callbacks = [
            tf.callbacks.earlyStopping({ monitor: 'val_loss', patience: 2 }),
        ];
    
        
        // Train the model
        await model.fit(xs, ys, {
            epochs: 10,
            validationSplit: 0.2,
            callbacks: callbacks
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
    const dummyData: TrainingDataType[] = [{
        volumeAnomaly: 0.5,
        holderConcentration: 0.3,
        liquidityScore: 0.7,
        priceVolatility: 0.4,
        sellPressure: 0.2,
        marketCapRisk: 0.3,
        bundlerActivity: true,
        accumulationRate: 0.1,
        stealthAccumulation: 0.2,
        suspiciousPattern: false,
        isRugPull: false,
        metadata: JSON.stringify({ reason: 'Training data' })
    }];
    trainModel(dummyData).catch(console.error);
}/*

// Check if you have a custom utility function
function isNullOrUndefined(value: any): boolean {
    return value === null || value === undefined;
}

// Use the function correctly
if (isNullOrUndefined(someValue)) {
    // Handle null or undefined value
}

*/