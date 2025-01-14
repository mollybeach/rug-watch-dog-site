import { Router } from 'express';
import { analyzeToken } from '../../training/modelPredictor';
import { TokenData } from '../../types/metrics';

const router = Router();

router.get('/analyze/:tokenAddress', async (req, res) => {
    const { tokenAddress } = req.params;
    
    try {
        // Create a TokenData object with empty metrics
        const tokenData: TokenData = {
            address: tokenAddress,
            name: '', // These will be filled in by analyzeToken
            symbol: '',
            metrics: {
                volumeAnomaly: 0,
                holderConcentration: 0,
                liquidityScore: 0,
                priceVolatility: 0,
                sellPressure: 0,
                marketCapRisk: 0,
                bundlerActivity: 0,
                accumulationRate: 0,
                stealthAccumulation: 0,
                suspiciousPattern: false,
                isRugPull: false,
                metadata: { reason: '' },
                timestamp: new Date().toISOString()
            }
        };

        const analysis = await analyzeToken(tokenData);
        res.json({
            success: true,
            data: analysis
        });
    } catch (error) {
        console.error('Error analyzing token:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to analyze token'
        });
    }
});

export default router; 