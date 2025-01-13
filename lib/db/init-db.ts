import pool from './config';

async function initializeDatabase() {
    const client = await pool.connect();
    try {
        console.log('Initializing database...');
        
        // Drop existing tables
        await client.query(`
            DROP TABLE IF EXISTS token_metrics CASCADE;
            DROP TABLE IF EXISTS token_prices CASCADE;
            DROP TABLE IF EXISTS tokens CASCADE;
        `);
        console.log('Dropped existing tables');
        
        // Create tables
        await client.query(`
            CREATE TABLE tokens (
                address VARCHAR(42) PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                symbol VARCHAR(50) NOT NULL,
                created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log('Created tokens table');

        await client.query(`
            CREATE TABLE token_metrics (
                id SERIAL PRIMARY KEY,
                token_address VARCHAR(42) REFERENCES tokens(address),
                volume_anomaly NUMERIC(10,4) NOT NULL DEFAULT 0,
                holder_concentration NUMERIC(10,4) NOT NULL DEFAULT 0,
                liquidity_score NUMERIC(10,4) NOT NULL DEFAULT 0,
                price_volatility NUMERIC(10,4) NOT NULL DEFAULT 0,
                sell_pressure NUMERIC(10,4) NOT NULL DEFAULT 0,
                market_cap_risk NUMERIC(10,4) NOT NULL DEFAULT 0,
                is_rug_pull BOOLEAN DEFAULT false,
                timestamp TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                CONSTRAINT metrics_range CHECK (
                    volume_anomaly BETWEEN 0 AND 1 AND
                    holder_concentration BETWEEN 0 AND 1 AND
                    liquidity_score BETWEEN 0 AND 1 AND
                    price_volatility BETWEEN 0 AND 1 AND
                    sell_pressure BETWEEN 0 AND 1 AND
                    market_cap_risk BETWEEN 0 AND 1
                )
            );
        `);
        console.log('Created token_metrics table');

        await client.query(`
            CREATE TABLE token_prices (
                id SERIAL PRIMARY KEY,
                token_address VARCHAR(42) REFERENCES tokens(address),
                price NUMERIC(24,12) NOT NULL DEFAULT 0,
                volume_24h NUMERIC(24,12) NOT NULL DEFAULT 0,
                market_cap NUMERIC(24,12) NOT NULL DEFAULT 0,
                timestamp TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log('Created token_prices table');

        // Create indexes
        await client.query(`
            CREATE INDEX idx_token_metrics_token_address_timestamp 
            ON token_metrics(token_address, timestamp DESC);
        `);
        await client.query(`
            CREATE INDEX idx_token_prices_token_address_timestamp 
            ON token_prices(token_address, timestamp DESC);
        `);
        console.log('Created indexes');

        // Insert sample data
        await client.query(`
            INSERT INTO tokens (address, name, symbol) VALUES
            ('0x1234567890123456789012345678901234567890', 'Sample Token 1', 'ST1'),
            ('0x2345678901234567890123456789012345678901', 'Sample Token 2', 'ST2'),
            ('0x3456789012345678901234567890123456789012', 'Sample Token 3', 'ST3');
        `);
        console.log('Inserted sample tokens');

        await client.query(`
            INSERT INTO token_metrics 
            (token_address, volume_anomaly, holder_concentration, liquidity_score, price_volatility, sell_pressure, market_cap_risk, is_rug_pull)
            VALUES
            ('0x1234567890123456789012345678901234567890', 0.2, 0.3, 0.8, 0.4, 0.3, 0.2, false),
            ('0x2345678901234567890123456789012345678901', 0.7, 0.8, 0.3, 0.6, 0.7, 0.8, true),
            ('0x3456789012345678901234567890123456789012', 0.4, 0.5, 0.6, 0.5, 0.4, 0.5, false);
        `);
        console.log('Inserted sample metrics');

        await client.query(`
            INSERT INTO token_prices 
            (token_address, price, volume_24h, market_cap)
            VALUES
            ('0x1234567890123456789012345678901234567890', 1.5, 1000000, 15000000),
            ('0x2345678901234567890123456789012345678901', 0.5, 500000, 5000000),
            ('0x3456789012345678901234567890123456789012', 2.0, 2000000, 20000000);
        `);
        console.log('Inserted sample prices');

        console.log('Database initialized successfully');
    } catch (error) {
        console.error('Error initializing database:', error);
        process.exit(1);
    } finally {
        client.release();
        await pool.end();
    }
}

// Run if this file is executed directly
if (require.main === module) {
    initializeDatabase();
}

export default initializeDatabase; 