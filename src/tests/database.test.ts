import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import pool from '../lib/db/connection';
import { TokenData } from '../types/metrics';

describe('Database Integration Tests', () => {
    beforeAll(async () => {
        // Connection is handled by the pool
    });

    afterAll(async () => {
        await pool.end();
    });

    it('should connect to database', async () => {
        const result = await pool.query('SELECT NOW() as time');
        expect(result.rows[0].time).toBeDefined();
    });

    it('should store and retrieve token data', async () => {
        const testToken: TokenData = {
            address: '0x123test',
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
                metadata: { reason: 'Integration test' },
                timestamp: new Date().toISOString()
            }
        };

        await pool.query(
            'INSERT INTO tokens (address, name, symbol, metrics) VALUES ($1, $2, $3, $4)',
            [testToken.address, testToken.name, testToken.symbol, testToken.metrics]
        );

        const result = await pool.query('SELECT * FROM tokens WHERE address = $1', [testToken.address]);
        expect(result.rows[0].address).toBe(testToken.address);
        expect(result.rows[0].metrics.liquidityScore).toBe(testToken.metrics.liquidityScore);
    });
}); 