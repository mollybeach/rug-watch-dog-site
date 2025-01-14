import { TokenData } from '../../../types/data';
import { analyzeToken } from '../../../training/modelPredictor';

describe('Model Predictor', () => {
    it('should analyze token data and return metrics', async () => {
        const mockToken: TokenData = {
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
                bundlerActivity: false,
                accumulationRate: 0.1,
                stealthAccumulation: 0.2,
                suspiciousPattern: false,
                isRugPull: false,
                metadata: { reason: 'Test reason' },
                timestamp: new Date().toISOString()
            }
        };

        const result = await analyzeToken(mockToken);

        expect(result).toBeDefined();
        expect(result.volumeAnomaly).toBeDefined();
        expect(result.holderConcentration).toBeDefined();
        expect(result.liquidityScore).toBeDefined();
        expect(result.priceVolatility).toBeDefined();
        expect(result.sellPressure).toBeDefined();
        expect(result.marketCapRisk).toBeDefined();
        expect(result.isRugPull).toBeDefined();
    });
}); 