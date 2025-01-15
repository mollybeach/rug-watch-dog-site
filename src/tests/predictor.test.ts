import { describe, it, expect } from '@jest/globals';
import { predictRisk } from '../training/modelPredictor';
import { TokenData } from '../types/metrics';

describe('Risk Prediction', () => {
    it('should calculate risk metrics correctly', () => {
        const testToken: TokenData = {
            address: '0x123',
            name: 'Test Token',
            symbol: 'TEST',
            metrics: {
                volumeAnomaly: 0.5,
                holderConcentration: 0.7,
                liquidityScore: 0.8,
                priceVolatility: 0.3,
                marketCap: 1000000,
                tradingVolume: 50000,
                sellPressure: 0.4,
                bundlerActivity: 0.2,
                accumulationRate: 0.3,
                stealthAccumulation: 0.1,
                suspiciousPattern: false
            }
        };

        const result = predictRisk(testToken);

        // Test overall risk score
        expect(result.overall).toBeDefined();
        expect(result.overall).toBeGreaterThanOrEqual(0);
        expect(result.overall).toBeLessThanOrEqual(1);

        // Test individual risk components
        expect(result.liquidity).toBeDefined();
        expect(result.social).toBeDefined();
        expect(result.technical).toBeDefined();
        expect(result.liquidity).toBeGreaterThanOrEqual(0);
        expect(result.social).toBeGreaterThanOrEqual(0);
        expect(result.technical).toBeGreaterThanOrEqual(0);
    });
}); 