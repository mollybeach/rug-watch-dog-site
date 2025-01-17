//path: src/training/modelEvaluator.ts
import * as tf from '@tensorflow/tfjs-node';
import { preprocessTokenData } from '../data-processing/parser';
export async function evaluateModel(model, testData) {
    // Convert TrainingData to TokenMetrics format
    const processedData = testData.map(data => ({
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
        metadata: data.metadata,
        tokenAddress: data.tokenAddress,
        timestamp: data.timestamp,
        holders: data.holders,
        totalSupply: data.totalSupply,
        currentPrice: data.currentPrice,
        isHoneyPot: data.isHoneyPot
    }));
    const { features, labels } = preprocessTokenData(processedData);
    // Convert to tensors
    const xs = tf.tensor2d(features);
    const ys = tf.tensor2d(labels, [labels.length, 1]);
    // Make predictions
    const predictions = model.predict(xs);
    const predArray = Array.from(predictions.dataSync());
    const labelArray = Array.from(ys.dataSync());
    // Calculate metrics
    let truePositives = 0;
    let falsePositives = 0;
    let trueNegatives = 0;
    let falseNegatives = 0;
    predArray.forEach((pred, i) => {
        const predictedClass = pred >= 0.5 ? 1 : 0;
        const actualClass = labelArray[i];
        if (predictedClass === 1 && actualClass === 1)
            truePositives++;
        if (predictedClass === 1 && actualClass === 0)
            falsePositives++;
        if (predictedClass === 0 && actualClass === 0)
            trueNegatives++;
        if (predictedClass === 0 && actualClass === 1)
            falseNegatives++;
    });
    // Calculate evaluation metrics
    const accuracy = (truePositives + trueNegatives) / predArray.length;
    const precision = truePositives / (truePositives + falsePositives) || 0;
    const recall = truePositives / (truePositives + falseNegatives) || 0;
    const f1Score = 2 * (precision * recall) / (precision + recall) || 0;
    // Create confusion matrix
    const confusionMatrix = [
        [trueNegatives, falsePositives],
        [falseNegatives, truePositives]
    ];
    // Clean up tensors
    xs.dispose();
    ys.dispose();
    predictions.dispose();
    return {
        accuracy,
        precision,
        recall,
        f1Score,
        confusionMatrix
    };
}
export function printEvaluationReport(metrics) {
    console.log('\n📊 Model Evaluation Report');
    console.log('-------------------------');
    console.log(`Accuracy:  ${(metrics.accuracy * 100).toFixed(2)}%`);
    console.log(`Precision: ${(metrics.precision * 100).toFixed(2)}%`);
    console.log(`Recall:    ${(metrics.recall * 100).toFixed(2)}%`);
    console.log(`F1 Score:  ${(metrics.f1Score * 100).toFixed(2)}%`);
    console.log('\nConfusion Matrix:');
    console.log('----------------');
    console.log('            Predicted');
    console.log('             0    1');
    console.log(`Actual 0    ${metrics.confusionMatrix[0][0].toString().padStart(4)}  ${metrics.confusionMatrix[0][1].toString().padStart(4)}`);
    console.log(`       1    ${metrics.confusionMatrix[1][0].toString().padStart(4)}  ${metrics.confusionMatrix[1][1].toString().padStart(4)}`);
}