import { analyzeToken } from '../../../training/modelPredictor';
import { TokenDataType } from '../../../../types/data';

describe('Token Analysis', () => {
        const mockTokenData: TokenDataType = {
        address: '0x123',
        name: 'Test Token',
        symbol: 'TEST',
        metrics: {
            metadata: JSON.stringify({ reason: 'Test data' }),
            tokenAddress: '0x123',
            volumeAnomaly: 0.5,
            holderConcentration: 0.3,
            liquidityScore: 0.7,
            priceVolatility: 0.4,
            sellPressure: 0.2,
            marketCapRisk: 0.3,
            bundlerActivity: true,
            accumulationRate: 0.1,
            stealthAccumulation: 0.2,
            suspiciousPattern: false,
            isRugPull: false,
            timestamp: new Date(),
            holders: 1000,
            totalSupply: 1000000,
            currentPrice: 1.5,
            isHoneyPot: false
        },
        price: {
            tokenAddress: '0x123',
            price: 1.5,
            volume24h: 1000,
            marketCap: 1000000,
            liquidity: 1000,
            timestamp: new Date()
        },
        risk: {
            tokenAddress: '0x123',
            overall: 0.2,
            liquidity: 0.2,
            concentration: 0.2,
            volatility: 0.2,
            social: 0.2,
            technical: 0.2,
            totalTokens: 0,
            highRiskCount: 0,
            mediumRiskCount: 0,
            lowRiskCount: 0,
        },
        createdAt: new Date(),
        updatedAt: new Date()
    };

    it('should analyze token metrics correctly', async () => {
        const result = await analyzeToken(mockTokenData);
        expect(result).toBeDefined();
        expect(result.predictionData[0]).toBeDefined();
        expect(result.predictionData[1]).toBeDefined();
        expect(result.predictionData[2]).toBeDefined();
        expect(result.predictionData[3]).toBeDefined();
        expect(result.predictionData[4]).toBeDefined();
        expect(result.predictionData[5]).toBeDefined();
    });

    it('should handle errors gracefully', async () => {
        const invalidToken: TokenDataType = {
            ...mockTokenData,
            metrics: {
                ...mockTokenData.metrics,
                volumeAnomaly: -1 // Invalid value
            }
        };
        await expect(analyzeToken(invalidToken)).rejects.toThrow();
    });
}); 