import { analyzeToken } from '../../../training/modelPredictor';
import { TokenData } from '../../../types/metrics';

describe('Token Analysis', () => {
    const mockTokenData: TokenData = {
        address: '0x123',
        name: 'Test Token',
        symbol: 'TEST',
        metrics: {
            volumeAnomaly: 0.5,
            holderConcentration: 0.3,
            liquidityScore: 0.7,
            priceVolatility: 0.4,
            sellPressure: 0.2,
            marketCapRisk: 0.3,
            bundlerActivity: 0.2,
            accumulationRate: 0.1,
            stealthAccumulation: 0.2,
            suspiciousPattern: false,
            isRugPull: false,
            metadata: { reason: 'Test data' },
            timestamp: new Date().toISOString()
        }
    };

    it('should analyze token metrics correctly', async () => {
        const result = await analyzeToken(mockTokenData);
        expect(result).toBeDefined();
        expect(result.volumeAnomaly).toBeDefined();
        expect(result.holderConcentration).toBeDefined();
        expect(result.liquidityScore).toBeDefined();
        expect(result.priceVolatility).toBeDefined();
        expect(result.sellPressure).toBeDefined();
        expect(result.marketCapRisk).toBeDefined();
        expect(result.bundlerActivity).toBeDefined();
        expect(result.accumulationRate).toBeDefined();
        expect(result.stealthAccumulation).toBeDefined();
        expect(result.suspiciousPattern).toBeDefined();
        expect(result.isRugPull).toBeDefined();
        expect(result.metadata).toBeDefined();
    });

    it('should handle errors gracefully', async () => {
        const invalidToken: TokenData = {
            ...mockTokenData,
            metrics: {
                ...mockTokenData.metrics,
                volumeAnomaly: -1 // Invalid value
            }
        };
        await expect(analyzeToken(invalidToken)).rejects.toThrow();
    });
}); 