import { loadExistingData } from '../data-processing/trainingData';
import { trainModel } from '../training/modelTrainer';
import { evaluateModel, printEvaluationReport } from '../training/modelEvaluator';
import { TrainingData } from '../types/data';

async function main() {
    try {
        console.log('Loading training data...');
        const baseMetrics = await loadExistingData();
        console.log('baseMetrics', baseMetrics);
        const trainingData: TrainingData[] = baseMetrics.map((token: any, index: number) => ({
            address: token.address,
            name: token.name,
            symbol: token.symbol,
            metadata: token.metrics.metadata,
            tokenAddress: token.metrics.tokenAddress,
            volumeAnomaly: token.metrics.volumeAnomaly,
            holderConcentration: token.metrics.holderConcentration,
            liquidityScore: token.metrics.liquidityScore,
            priceVolatility: token.metrics.priceVolatility,
            sellPressure: token.metrics.sellPressure,
            marketCapRisk: token.metrics.marketCapRisk,
            bundlerActivity: token.metrics.bundlerActivity,
            accumulationRate: token.metrics.accumulationRate,
            stealthAccumulation: token.metrics.stealthAccumulation,
            suspiciousPattern: token.metrics.suspiciousPattern,
            isRugPull: token.metrics.isRugPull,
            timestamp: token.metrics.timestamp,
            holders: token.metrics.holders,
            totalSupply: token.metrics.totalSupply,
            currentPrice: token.metrics.currentPrice,
            isHoneyPot: token.metrics.isHoneyPot,
            price: token.price.price,
            volume24h: token.price.volume24h,
            marketCap: token.price.marketCap,
            liquidity: token.price.liquidity,
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