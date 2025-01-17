import { Router } from 'express';
import { analyzeToken } from '../../training/modelPredictor';
const router = Router();
router.get('/analyze/:tokenAddress', async(req, res) => {
    const { tokenAddress } = req.params;
    try {
        // Create a TokenData object with empty metrics
        const tokenData = {
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
                bundlerActivity: false,
                accumulationRate: 0,
                stealthAccumulation: 0,
                suspiciousPattern: "false,",
                isRugPull: false,
                metadata: { reason: '' },
                timestamp: new Date().toISOString(),
                tokenAddress: tokenAddress,
                holders: 0,
                totalSupply: 0,
                currentPrice: 0,
                isHoneyPot: false
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