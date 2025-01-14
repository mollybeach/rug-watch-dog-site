import { pool } from '@/lib/db/config';

async function initializeDatabase() {
    try {
        // Create tables if they don't exist
        await pool.query(`
            -- Create tokens table if not exists
            CREATE TABLE IF NOT EXISTS tokens (
                address VARCHAR(42) PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                symbol VARCHAR(50) NOT NULL,
                created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
            );

            -- Create token_metrics table if not exists
            CREATE TABLE IF NOT EXISTS token_metrics (
                id SERIAL PRIMARY KEY,
                tokenAddress VARCHAR(42) REFERENCES tokens(address),
                volumeAnomaly DOUBLE PRECISION NOT NULL DEFAULT 0,
                holderConcentration DOUBLE PRECISION NOT NULL DEFAULT 0,
                liquidityScore DOUBLE PRECISION NOT NULL DEFAULT 0,
                priceVolatility DOUBLE PRECISION NOT NULL DEFAULT 0,
                sellPressure DOUBLE PRECISION NOT NULL DEFAULT 0,
                marketCapRisk DOUBLE PRECISION NOT NULL DEFAULT 0,
                bundlerActivity BOOLEAN NOT NULL DEFAULT false,
                accumulationRate DOUBLE PRECISION NOT NULL DEFAULT 0,
                stealthAccumulation DOUBLE PRECISION,
                suspiciousPattern BOOLEAN,
                isRugPull BOOLEAN NOT NULL DEFAULT false,
                metadata JSONB,
                timestamp TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
            );

            -- Insert sample data if tables are empty
            INSERT INTO tokens (address, name, symbol)
            SELECT 
                '0x1234567890123456789012345678901234567890',
                'Sample Token',
                'SMPL'
            WHERE NOT EXISTS (SELECT 1 FROM tokens LIMIT 1);

            INSERT INTO token_metrics (
                tokenAddress,
                volumeAnomaly,
                holderConcentration,
                liquidityScore,
                priceVolatility,
                sellPressure,
                marketCapRisk,
                bundlerActivity,
                accumulationRate,
                suspiciousPattern,
                isRugPull,
                metadata
            )
            SELECT 
                '0x1234567890123456789012345678901234567890',
                0.5,
                0.3,
                0.8,
                0.4,
                0.2,
                0.1,
                false,
                0.6,
                false,
                false,
                '{"reason": "Sample data"}'::jsonb
            WHERE NOT EXISTS (SELECT 1 FROM token_metrics LIMIT 1);
        `);

        console.log('Database initialized successfully');
    } catch (error) {
        console.error('Error initializing database:', error);
        throw error;
    }
}

// Run initialization
initializeDatabase().catch(console.error);

export default initializeDatabase; 