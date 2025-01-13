-- Drop existing tables if they exist
DROP TABLE IF EXISTS token_metrics CASCADE;
DROP TABLE IF EXISTS token_prices CASCADE;
DROP TABLE IF EXISTS tokens CASCADE;

-- Create tokens table
CREATE TABLE tokens (
    address VARCHAR(42) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    symbol VARCHAR(50) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create token_metrics table
CREATE TABLE token_metrics (
    id SERIAL PRIMARY KEY,
    token_address VARCHAR(42) REFERENCES tokens(address),
    volume_anomaly DECIMAL(10,4) NOT NULL DEFAULT 0,
    holder_concentration DECIMAL(10,4) NOT NULL DEFAULT 0,
    liquidity_score DECIMAL(10,4) NOT NULL DEFAULT 0,
    price_volatility DECIMAL(10,4) NOT NULL DEFAULT 0,
    sell_pressure DECIMAL(10,4) NOT NULL DEFAULT 0,
    market_cap_risk DECIMAL(10,4) NOT NULL DEFAULT 0,
    is_rug_pull BOOLEAN DEFAULT FALSE,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT metrics_range CHECK (
        volume_anomaly BETWEEN 0 AND 1 AND
        holder_concentration BETWEEN 0 AND 1 AND
        liquidity_score BETWEEN 0 AND 1 AND
        price_volatility BETWEEN 0 AND 1 AND
        sell_pressure BETWEEN 0 AND 1 AND
        market_cap_risk BETWEEN 0 AND 1
    )
);

-- Create token_prices table
CREATE TABLE token_prices (
    id SERIAL PRIMARY KEY,
    token_address VARCHAR(42) REFERENCES tokens(address),
    price DECIMAL(24,12) NOT NULL DEFAULT 0,
    volume_24h DECIMAL(24,12) NOT NULL DEFAULT 0,
    market_cap DECIMAL(24,12) NOT NULL DEFAULT 0,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create optimized indexes
CREATE INDEX idx_token_metrics_composite ON token_metrics(token_address, timestamp DESC);
CREATE INDEX idx_token_prices_composite ON token_prices(token_address, timestamp DESC);
CREATE INDEX idx_tokens_updated ON tokens(updated_at DESC);
CREATE INDEX idx_token_metrics_timestamp ON token_metrics(timestamp DESC);
CREATE INDEX idx_token_prices_timestamp ON token_prices(timestamp DESC);

-- Add filtered index for rug pull detection
CREATE INDEX idx_token_metrics_rugpull ON token_metrics(token_address) WHERE is_rug_pull = TRUE;

-- Insert sample data
INSERT INTO tokens (address, name, symbol) 
VALUES
    ('0x1234567890123456789012345678901234567890', 'Sample Token 1', 'ST1'),
    ('0x2345678901234567890123456789012345678901', 'Sample Token 2', 'ST2'),
    ('0x3456789012345678901234567890123456789012', 'Sample Token 3', 'ST3');

-- Insert sample metrics
INSERT INTO token_metrics 
    (token_address, volume_anomaly, holder_concentration, liquidity_score, price_volatility, sell_pressure, market_cap_risk, is_rug_pull)
VALUES
    ('0x1234567890123456789012345678901234567890', 0.2, 0.3, 0.8, 0.4, 0.3, 0.2, FALSE),
    ('0x2345678901234567890123456789012345678901', 0.7, 0.8, 0.3, 0.6, 0.7, 0.8, TRUE),
    ('0x3456789012345678901234567890123456789012', 0.4, 0.5, 0.6, 0.5, 0.4, 0.5, FALSE);

-- Insert sample prices
INSERT INTO token_prices 
    (token_address, price, volume_24h, market_cap)
VALUES
    ('0x1234567890123456789012345678901234567890', 1.5, 1000000, 15000000),
    ('0x2345678901234567890123456789012345678901', 0.5, 500000, 5000000),
    ('0x3456789012345678901234567890123456789012', 2.0, 2000000, 20000000); 