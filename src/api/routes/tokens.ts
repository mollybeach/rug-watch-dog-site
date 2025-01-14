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
                volume_anomaly: 0,
                holder_concentration: 0,
                liquidity_score: 0,
                price_volatility: 0,
                sell_pressure: 0,
                market_cap_risk: 0,
                bundler_activity: 0,
                accumulation_rate: 0,
                stealth_accumulation: 0,
                suspicious_pattern: false,
                is_rug_pull: false,
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