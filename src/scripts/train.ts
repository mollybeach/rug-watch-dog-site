import { loadExistingData } from '../data-processing/trainingData';
import { trainModel } from '../training/modelTrainer';
import { evaluateModel, printEvaluationReport } from '../training/modelEvaluator';
import { BaseMetrics, TrainingData } from '../types/metrics';

async function main() {
    try {
        console.log('Loading training data...');
        const baseMetrics = await loadExistingData();
        
        // Convert BaseMetrics to TrainingData format
        const trainingData: TrainingData[] = baseMetrics.map((metrics, index) => ({
            ...metrics,
            address: `token_${index}` // Use a placeholder address since we don't have the real one
        }));

        // Split data into training and test sets
        const splitIndex = Math.floor(trainingData.length * 0.8);
        const trainSet = trainingData.slice(0, splitIndex);
        const testSet = trainingData.slice(splitIndex);

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