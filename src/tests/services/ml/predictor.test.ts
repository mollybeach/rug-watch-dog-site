import { analyzeToken } from '../../../training/modelPredictor';
import { TokenData } from '../../../types/metrics';

describe('Token Analysis', () => {
    const mockTokenData: TokenData = {
        address: '0x123',
        name: 'Test Token',
        symbol: 'TEST',
        metrics: {
            volume_anomaly: 0.5,
            holder_concentration: 0.3,
            liquidity_score: 0.7,
            price_volatility: 0.4,
            sell_pressure: 0.2,
            market_cap_risk: 0.3,
            bundler_activity: 0.2,
            accumulation_rate: 0.1,
            stealth_accumulation: 0.2,
            suspicious_pattern: false,
            is_rug_pull: false,
            metadata: { reason: 'Test data' },
            timestamp: new Date().toISOString()
        }
    };

    it('should analyze token metrics correctly', async () => {
        const result = await analyzeToken(mockTokenData);
        expect(result).toBeDefined();
        expect(result.volume_anomaly).toBeDefined();
        expect(result.holder_concentration).toBeDefined();
        expect(result.liquidity_score).toBeDefined();
        expect(result.price_volatility).toBeDefined();
        expect(result.sell_pressure).toBeDefined();
        expect(result.market_cap_risk).toBeDefined();
        expect(result.bundler_activity).toBeDefined();
        expect(result.accumulation_rate).toBeDefined();
        expect(result.stealth_accumulation).toBeDefined();
        expect(result.suspicious_pattern).toBeDefined();
        expect(result.is_rug_pull).toBeDefined();
        expect(result.metadata).toBeDefined();
    });

    it('should handle errors gracefully', async () => {
        const invalidToken: TokenData = {
            ...mockTokenData,
            metrics: {
                ...mockTokenData.metrics,
                volume_anomaly: -1 // Invalid value
            }
        };
        await expect(analyzeToken(invalidToken)).rejects.toThrow();
    });
}); 