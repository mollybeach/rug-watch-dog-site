// path: src/scripts/train.ts
import { loadExistingData } from '../data-processing/trainingData';
import { trainModel } from '../training/modelTrainer';
import { evaluateModel, printEvaluationReport } from '../training/modelEvaluator';
import { TokenDataType } from '../../types/data';

async function main() {
    try {
        console.log('Loading training data...');
        const baseMetrics = await loadExistingData();
        
        // Use TokenDataType directly
        const trainingData: TokenDataType[] = baseMetrics.map((token: TokenDataType) => ({
            address: token.address,
            name: token.name,
            symbol: token.symbol,
            metrics: token.metrics,
            price: token.price,
            risk: token.risk,
            createdAt: token.createdAt,
            updatedAt: token.updatedAt
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