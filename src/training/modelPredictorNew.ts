//path: src/training/modelPredictor.ts
import * as tf from '@tensorflow/tfjs-node';
import { TokenDataType } from '@/types/data';
import * as fs from 'fs';

let model: tf.Sequential;

const modelPath = "../rug-watch-dog-site/src/training/model/model.json"

export async function initializeModel(inputSize: number): Promise<void> {
    if (fs.existsSync(modelPath)) {
        console.log('Model path exists. Loading model...');
        await loadModel(modelPath);
    } else {
        console.log('Model path does not exist. Creating new model...');
        await createModel(inputSize);
    }
}

export async function loadModel(modelPath: string): Promise<void> {
    try {
        model = await tf.loadLayersModel(`file://${modelPath}`) as tf.Sequential;
        console.log('Model loaded successfully');
    } catch (error) {
        console.error('Error loading model:', error);
        throw error;
    }
}

async function createModel(inputSize: number) {
    model = tf.sequential();
    model.add(tf.layers.dense({ units: 10, activation: 'relu', inputShape: [inputSize] }));
    model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' }));
    model.compile({ optimizer: 'adam', loss: 'binaryCrossentropy', metrics: ['accuracy'] });
    console.log('Model created successfully');
    model.summary();

    // Save the model immediately after creation
    await saveModel(modelPath);
}

export async function saveModel(modelPath: string): Promise<void> {
    if (!model) {
        throw new Error('Model is not initialized');
    }
    try {
        await model.save(`file://${modelPath}`);
        console.log(`Model saved successfully at ${modelPath}`);
    } catch (error) {
        console.error('Error saving model:', error);
        throw error;
    }
}

function preprocessFeatures(tokenData: TokenDataType): tf.Tensor2D {
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

    // Replace with actual min and max values
    const minValues = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const maxValues = [1000000, 1, 100, 100, 1, 1, 1, 1, 1, 1];

   const scaledFeatures = features.map((f, i) => (f - minValues[i]) / (maxValues[i] - minValues[i]));

   return tf.tensor2d([scaledFeatures], [1, scaledFeatures.length]);
   ///return tf.tensor2d([features], [1, features.length]);

}

export async function analyzeToken(tokenData: TokenDataType): Promise<{
    isRugPull: boolean,
    predictionData: number[]
}> {
    try {
        // Preprocess the features
        const featuresTensor = preprocessFeatures(tokenData);
        console.log('featuresTensor.shape');
        console.log(featuresTensor.shape);

        // Ensure the model is initialized

        // Ensure the model is initialized
        if (!fs.existsSync(modelPath)) {
            createModel(featuresTensor.shape[1]);
        } else {
            await loadModel(modelPath);
        }
        console.log("model summary");
        console.log(model.summary());

        // Use the model to predict
        const prediction = model.predict(featuresTensor) as tf.Tensor;
        console.log('prediction');
        console.log(prediction);


        // Get the prediction data
        const predictionData = await prediction.data();

        // Interpret the prediction
        const isRugPull = predictionData[0] > 0.5; // Example threshold

        // Return or use the prediction result
        return {
            isRugPull,
            predictionData: Array.from(predictionData)
        };
    } catch (error) {
        console.error('Error analyzing token:', error);
        throw error;
    }
}

/*
function calculateLiquidityRisk(token: TokenMetricsType): number {
    // Example: Normalize liquidity score to a 0-1 scale
    return Math.min(Math.max(token.liquidityScore / 100, 0), 1);
}

function calculateConcentrationRisk(token: TokenMetricsType): number {
    // Example: Normalize holder concentration to a 0-1 scale
    return Math.min(Math.max(token.holderConcentration / 100, 0), 1);
}

function calculateVolatilityRisk(token: TokenMetricsType): number {
    // Example: Normalize price volatility to a 0-1 scale
    return Math.min(Math.max(token.priceVolatility / 100, 0), 1);
}

function calculateSocialRisk(token: TokenMetricsType): number {
    // Example: Binary risk based on rug pull status
    return token.isRugPull ? 1 : 0;
}

function calculateTechnicalRisk(token: TokenMetricsType): number {
    // Example: Binary risk based on suspicious pattern
    return token.suspiciousPattern ? 1 : 0;
}
*/
