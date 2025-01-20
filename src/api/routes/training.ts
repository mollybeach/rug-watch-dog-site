import { Router } from 'express';
import { loadExistingData } from '@/data-processing/trainingData';
import { TokenDataType } from '@/types/data';

const router = Router();

// Get all training data
router.get('/', async (req, res) => {
    try {
        const data = await loadExistingData();
        res.json({
            success: true,
            count: data.length,
            data: data
        });
    } catch (error) {
        console.error('Error fetching training data:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch training data'
        });
    }
});

// Get training data statistics
router.get('/stats', async (_req, res) => {
    try {
        const data: TokenDataType[] = await loadExistingData();
        const totalTokens = data.length;
        const rugPulls = data.filter(t => t.metrics.isRugPull).length;
        const legitimateTokens = totalTokens - rugPulls;

        // Define a type for numeric metrics
        type NumericMetrics = {
            volumeAnomaly: number;
            holderConcentration: number;
            liquidityScore: number;
            priceVolatility: number;
            sellPressure: number;
            marketCapRisk: number;
            accumulationRate: number;
            stealthAccumulation: number;
        };

        // Initialize the aggregation object
        const initialNumericMetrics: NumericMetrics = {
            volumeAnomaly: 0,
            holderConcentration: 0,
            liquidityScore: 0,
            priceVolatility: 0,
            sellPressure: 0,
            marketCapRisk: 0,
            accumulationRate: 0,
            stealthAccumulation: 0
        };

        // Aggregate numeric metrics
        const averageMetrics: NumericMetrics = data.reduce((acc, token) => {
            const metrics = token.metrics;
            acc.volumeAnomaly += metrics.volumeAnomaly;
            acc.holderConcentration += metrics.holderConcentration;
            acc.liquidityScore += metrics.liquidityScore;
            acc.priceVolatility += metrics.priceVolatility;
            acc.sellPressure += metrics.sellPressure;
            acc.marketCapRisk += metrics.marketCapRisk;
            acc.accumulationRate += metrics.accumulationRate;
            acc.stealthAccumulation += metrics.stealthAccumulation ?? 0;
            return acc;
        }, initialNumericMetrics);

        // Calculate averages
        if (totalTokens > 0) {
            const numericKeys: (keyof NumericMetrics)[] = [
                'volumeAnomaly', 'holderConcentration', 'liquidityScore',
                'priceVolatility', 'sellPressure', 'marketCapRisk',
                'accumulationRate', 'stealthAccumulation'
            ];
            
            numericKeys.forEach(key => {
                averageMetrics[key] /= totalTokens;
            });
        }

        res.json({
            totalTokens,
            rugPulls,
            legitimateTokens,
            averageMetrics,
            lastUpdated: new Date().toISOString()
        });
    } catch (error) {
        console.error('Error fetching stats:', error);
        res.status(500).json({ error: 'Error fetching statistics' });
    }
});

export default router; 
