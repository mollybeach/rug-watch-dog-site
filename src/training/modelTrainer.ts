// path: src/training/modelTrainer.ts
import * as tf from '@tensorflow/tfjs-node';
import { TokenDataType } from '../types/data';
import { preprocessTokenData } from '../data-processing/parser';
import path from 'path';
import fs from 'fs/promises';

const MODEL_DIR = path.join(process.cwd(), 'models', 'trained');
const MODEL_PATH = 'file://' + path.join(MODEL_DIR, 'model.json');

export async function trainModel(trainingData: TokenDataType[]): Promise<tf.LayersModel> {
    // Log the raw training data
    console.log('Raw training data:', trainingData);

    // Preprocess data
    const { features, labels } = preprocessTokenData(trainingData);

    // Log the processed features and labels
    console.log('Processed features:', features);
    console.log('Processed labels:', labels);

    // Create sequential model
    const model = tf.sequential();
    console.log('sequential model', model);
    
    // Add layers
    model.add(tf.layers.dense({
        units: 12,
        activation: 'relu',
        inputShape: [6]  // 6 features
    }));
    console.log('dense layer', model.add);
    
    model.add(tf.layers.dense({
        units: 8,
        activation: 'relu'
    }));
    console.log('dense layer', model.add);
    
    model.add(tf.layers.dense({
        units: 1,
        activation: 'sigmoid'
    }));
    console.log('dense layer', model.add);
    
    // Compile model
    model.compile({
        optimizer: tf.train.adam(0.001),
        loss: 'binaryCrossentropy',
        metrics: ['accuracy']
    });
    console.log('compile model', model.compile);
    
    // Convert to tensors
    const xs = tf.tensor2d(features);
    const ys = tf.tensor2d(labels, [labels.length, 1]);
    console.log('xs', xs);
    console.log('ys', ys);
    
    try {
        // Train model
        await model.fit(xs, ys, {
            epochs: 100,
            batchSize: 4,
            validationSplit: 0.2,
            callbacks: {
                onEpochEnd: (epoch, logs) => {
                    console.log(`Epoch ${epoch + 1}: loss = ${logs?.loss.toFixed(4)}, accuracy = ${logs?.acc.toFixed(4)}`);
                }
            }
        });
        console.log('fit model', model.fit);
        
        // Create model directory if it doesn't exist
        await fs.mkdir(MODEL_DIR, { recursive: true });
        console.log('save model', model.save);
        
        // Save model
        await model.save(MODEL_PATH);
        console.log('save model', model.save);
        console.log('final model', model);
        
        return model;
    } finally {
        // Clean up tensors
        xs.dispose();
        ys.dispose();
    }
}