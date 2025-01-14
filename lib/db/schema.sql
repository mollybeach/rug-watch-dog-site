-- Drop existing tables if they exist
DROP TABLE IF EXISTS token_metrics CASCADE;
DROP TABLE IF EXISTS token_prices CASCADE;
DROP TABLE IF EXISTS tokens CASCADE;

-- Create tokens table
CREATE TABLE tokens (
    address VARCHAR(42) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    symbol VARCHAR(50) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Create token_metrics table
CREATE TABLE token_metrics (
    id SERIAL PRIMARY KEY,
    tokenAddress VARCHAR(42) REFERENCES tokens(address),
    holders INTEGER NOT NULL DEFAULT 0,
    total_supply NUMERIC(36,18) NOT NULL DEFAULT 0,
    volumeAnomaly NUMERIC(10,4) NOT NULL DEFAULT 0,
    holderConcentration NUMERIC(10,4) NOT NULL DEFAULT 0,
    liquidityScore NUMERIC(10,4) NOT NULL DEFAULT 0,
    priceVolatility NUMERIC(10,4) NOT NULL DEFAULT 0,
    sellPressure NUMERIC(10,4) NOT NULL DEFAULT 0,
    marketCapRisk NUMERIC(10,4) NOT NULL DEFAULT 0,
    is_honeypot BOOLEAN DEFAULT false,
    isRugPull BOOLEAN DEFAULT false,
    risk_score NUMERIC(10,4) DEFAULT 0,
    timestamp TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT metrics_range CHECK (
        volumeAnomaly BETWEEN 0 AND 1 AND
        holderConcentration BETWEEN 0 AND 1 AND
        liquidityScore BETWEEN 0 AND 1 AND
        priceVolatility BETWEEN 0 AND 1 AND
        sellPressure BETWEEN 0 AND 1 AND
        marketCapRisk BETWEEN 0 AND 1
    )
);

-- Create token_prices table
CREATE TABLE token_prices (
    id SERIAL PRIMARY KEY,
    tokenAddress VARCHAR(42) REFERENCES tokens(address),
    price NUMERIC(24,12) NOT NULL DEFAULT 0,
    volume_24h NUMERIC(24,12) NOT NULL DEFAULT 0,
    marketCap NUMERIC(24,12) NOT NULL DEFAULT 0,
    liquidity NUMERIC(24,12) NOT NULL DEFAULT 0,
    timestamp TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Create optimized indexes
CREATE INDEX idx_token_metrics_composite 
ON token_metrics(tokenAddress, timestamp DESC);

CREATE INDEX idx_token_prices_composite 
ON token_prices(tokenAddress, timestamp DESC);

CREATE INDEX idx_tokens_updated 
ON tokens(updated_at DESC);

CREATE INDEX idx_token_metrics_timestamp 
ON token_metrics(timestamp DESC);

CREATE INDEX idx_token_prices_timestamp 
ON token_prices(timestamp DESC);

-- Add filtered index for rug pull detection
CREATE INDEX idx_token_metrics_rugpull 
ON token_metrics(tokenAddress) 
WHERE isRugPull = true;

-- Insert sample data
INSERT INTO tokens (address, name, symbol) 
VALUES
    ('0x1234567890123456789012345678901234567890', 'Sample Token 1', 'ST1'),
    ('0x2345678901234567890123456789012345678901', 'Sample Token 2', 'ST2'),
    ('0x3456789012345678901234567890123456789012', 'Sample Token 3', 'ST3');

-- Insert sample metrics
INSERT INTO token_metrics 
    (tokenAddress, volumeAnomaly, holderConcentration, liquidityScore, priceVolatility, sellPressure, marketCapRisk, isRugPull)
VALUES
    ('0x1234567890123456789012345678901234567890', 0.2, 0.3, 0.8, 0.4, 0.3, 0.2, 0),
    ('0x2345678901234567890123456789012345678901', 0.7, 0.8, 0.3, 0.6, 0.7, 0.8, 1),
    ('0x3456789012345678901234567890123456789012', 0.4, 0.5, 0.6, 0.5, 0.4, 0.5, 0);

-- Insert sample prices
INSERT INTO token_prices 
    (tokenAddress, price, volume_24h, marketCap)
VALUES
    ('0x1234567890123456789012345678901234567890', 1.5, 1000000, 15000000),
    ('0x2345678901234567890123456789012345678901', 0.5, 500000, 5000000),
    ('0x3456789012345678901234567890123456789012', 2.0, 2000000, 20000000); 