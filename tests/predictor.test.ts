import { describe, it, expect } from '@jest/globals';
import { TokenData } from '../src/types/metrics';
import { predictRisk } from '../src/training/modelPredictor';

describe('Risk Predictor', () => {
    it('should calculate risk scores correctly', () => {
        const testData: TokenData = {
            address: '0x123',
            name: 'Test Token',
            symbol: 'TEST',
            metrics: {
                volumeAnomaly: 0.8,
                holderConcentration: 0.7,
                liquidityScore: 0.8,
                priceVolatility: 0.3,
                sellPressure: 0.4,
                marketCapRisk: 0.5,
                bundlerActivity: 1,
                accumulationRate: 0.2,
                stealthAccumulation: 0.1,
                suspiciousPattern: false,
                isRugPull: false,
                metadata: { reason: 'Test data' },
                timestamp: new Date().toISOString()
            }
        };

        const risk = predictRisk(testData);

        expect(risk.overall).toBeGreaterThanOrEqual(0);
        expect(risk.overall).toBeLessThanOrEqual(1);
        expect(risk.liquidity).toBeGreaterThanOrEqual(0);
        expect(risk.liquidity).toBeLessThanOrEqual(1);
        expect(risk.social).toBeGreaterThanOrEqual(0);
        expect(risk.social).toBeLessThanOrEqual(1);
        expect(risk.technical).toBeGreaterThanOrEqual(0);
        expect(risk.technical).toBeLessThanOrEqual(1);
    });
}); 