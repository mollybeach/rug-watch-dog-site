import { Router } from 'express';
import { analyzeToken } from '@/training/modelPredictor';
import { TokenDataType } from '@/types/data';

const router = Router();

router.get('/analyze/:tokenAddress', async (req, res) => {
    const { tokenAddress } = req.params;
    
    try {
        // Create a TokenData object with empty metrics
        const tokenData: TokenDataType = {
            address: tokenAddress,
            name: '', // These will be filled in by analyzeToken
            symbol: '',
            chain: 'ethereum',
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
                suspiciousPattern: false,
                isRugPull: false,
                metadata: { reason: '' }.toString(),
                timestamp: new Date(),
                tokenAddress: tokenAddress,
                holders: 0,
                totalSupply: 0,
                currentPrice: 0,
                isHoneyPot: false
            },
            price: {
                tokenAddress: tokenAddress,
                price: 0,
                volume24h: 0,
                marketCap: 0,
                liquidity: 0,
                timestamp: new Date()
            },
            risk: {
                tokenAddress: tokenAddress,
                overall: 0,
                liquidity: 0,
                concentration: 0,
                volatility: 0,
                social: 0,
                technical: 0,
                totalTokens: 0,
                highRiskCount: 0,
                mediumRiskCount: 0,
                lowRiskCount: 0
            },
            createdAt: new Date(),
            updatedAt: new Date()
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