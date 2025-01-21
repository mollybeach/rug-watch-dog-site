import { loadExistingData } from '../data-processing/storage';
import { trainModel } from '../training/modelTrainer';
import { evaluateModel, printEvaluationReport } from '../training/modelEvaluator';
import { TrainingDataType, TokenDataType } from '../../types/data';

async function main() {
    try {
        console.log('Loading training data...');
        const existingData = await loadExistingData();
        console.log('existingData')
        console.log(existingData)
        // Convert BaseMetrics to TrainingData format
        const trainingData: TrainingDataType[] = existingData.map((tokenData, index) => ({
            volumeAnomaly: tokenData.metrics.volumeAnomaly,
            holderConcentration: tokenData.metrics.holderConcentration,
            liquidityScore: tokenData.metrics.liquidityScore,
            priceVolatility: tokenData.metrics.priceVolatility,
            sellPressure: tokenData.metrics.sellPressure,
            marketCapRisk: tokenData.metrics.marketCapRisk,
            bundlerActivity: !!tokenData.metrics.bundlerActivity,
            accumulationRate: tokenData.metrics.accumulationRate,
            stealthAccumulation: tokenData.metrics.stealthAccumulation,
            suspiciousPattern: !!tokenData.metrics.suspiciousPattern,
            isRugPull: !!tokenData.metrics.isRugPull,
            metadata: tokenData.metrics.metadata,
        }));
        console.log('trainingData')
        console.log(trainingData)

        // Split data into training and test sets
        const splitIndex = Math.floor(trainingData.length * 0.8);
        const trainSet = trainingData.slice(0, splitIndex);
        const testSet = trainingData.slice(splitIndex);
        console.log('trainSet')
        console.log(trainSet)
        console.log('testSet')
        console.log(testSet)

        console.log(`Training with ${trainSet.length} samples, testing with ${testSet.length} samples`);

        // Train model
        console.log('\nTraining model...');
        const model = await trainModel(trainSet);

        // Evaluate model
        console.log('\nEvaluating model...');
        const evaluationMetrics = await evaluateModel(model, testSet);
        printEvaluationReport(evaluationMetrics);

    } catch (error) {
        console.error('Error in training script:', error);
        process.exit(1);
    }
}

main();     