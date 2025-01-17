import { Router } from 'express';
import { loadExistingData } from '../../data-processing/trainingData';
const router = Router();
// Get all training data
router.get('/', async(req, res) => {
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
router.get('/stats', async(_req, res) => {
    try {
        const data = await loadExistingData();
        const totalTokens = data.length;
        const rugPulls = data.filter(t => t.isRugPull).length;
        const legitimateTokens = totalTokens - rugPulls;
        const initialMetrics = {
            volumeAnomaly: 0,
            holderConcentration: 0,
            liquidityScore: 0,
            priceVolatility: 0,
            sellPressure: 0,
            marketCapRisk: 0,
            bundlerActivity: false,
            accumulationRate: 0,
            stealthAccumulation: null,
            suspiciousPattern: null,
            isRugPull: false,
            metadata: { reason: '' },
            tokenAddress: '',
            timestamp: new Date().toISOString(),
            holders: 0,
            totalSupply: 0,
            currentPrice: 0,
            isHoneyPot: false
        };
        const averageMetrics = data.reduce((acc, metrics) => {
            acc.volumeAnomaly += metrics.volumeAnomaly;
            acc.holderConcentration += metrics.holderConcentration;
            acc.liquidityScore += metrics.liquidityScore;
            acc.priceVolatility += metrics.priceVolatility;
            acc.sellPressure += metrics.sellPressure;
            acc.marketCapRisk += metrics.marketCapRisk;
            acc.bundlerActivity = acc.bundlerActivity || metrics.bundlerActivity;
            acc.accumulationRate += metrics.accumulationRate;
            acc.stealthAccumulation = acc.stealthAccumulation || metrics.stealthAccumulation;
            acc.suspiciousPattern = acc.suspiciousPattern || metrics.suspiciousPattern;
            return acc;
        }, initialMetrics);
        // Calculate averages
        if (totalTokens > 0) {
            const numericKeys = [
                'volumeAnomaly', 'holderConcentration', 'liquidityScore',
                'priceVolatility', 'sellPressure', 'marketCapRisk',
                'bundlerActivity', 'accumulationRate', 'stealthAccumulation'
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