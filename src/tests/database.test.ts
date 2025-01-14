import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import { createClient, VercelClient } from '@vercel/postgres';
import { TokenData } from '../types/metrics';
import * as dotenv from 'dotenv';
import path from 'path';

// Load test environment variables
dotenv.config({ path: path.join(__dirname, 'test.env') });

// Increase timeout for all tests in this file
jest.setTimeout(30000);

describe('Database Integration Tests', () => {
    let client: VercelClient | null = null;

    beforeAll(async () => {
        // Create client with retry logic
        const maxRetries = 3;
        let retries = 0;
        
        while (retries < maxRetries) {
            try {
                client = createClient({
                    connectionString: process.env.POSTGRES_URL_NON_POOLING,
                    ssl: { rejectUnauthorized: true }
                });
                
                console.log('Attempting database connection...');
                await client.connect();
                console.log('Database connected successfully');
                break;
            } catch (error) {
                retries++;
                console.error(`Connection attempt ${retries} failed:`, error);
                if (retries === maxRetries) throw error;
                // Wait before retrying
                await new Promise(resolve => setTimeout(resolve, 5000));
            }
        }
    }, 30000);

    afterAll(async () => {
        if (client) {
            try {
                await client.end();
                console.log('Connection closed successfully');
            } catch (error) {
                console.error('Error closing connection:', error);
            }
        }
    }, 10000);

    it('should connect to database', async () => {
        if (!client) throw new Error('Client not initialized');
        const result = await client.query('SELECT NOW() as time');
        expect(result.rows[0].time).toBeDefined();
    }, 10000);

    it('should store and retrieve token data', async () => {
        if (!client) throw new Error('Client not initialized');
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

        await client.query(
            'INSERT INTO tokens (address, name, symbol, metrics) VALUES ($1, $2, $3, $4)',
            [testToken.address, testToken.name, testToken.symbol, testToken.metrics]
        );

        const result = await client.query('SELECT * FROM tokens WHERE address = $1', [testToken.address]);
        expect(result.rows[0].address).toBe(testToken.address);
        expect(result.rows[0].metrics.liquidityScore).toBe(testToken.metrics.liquidityScore);
    }, 15000);
}); 