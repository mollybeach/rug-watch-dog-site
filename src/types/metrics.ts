export interface TokenMetrics {
    liquidityScore: number;
    holderConcentration: number;
    tradingVolume: number;
    priceVolatility: number;
    marketCap: number;
    volumeAnomaly: number;
    sellPressure: number;
    bundlerActivity: number;
    accumulationRate: number;
    stealthAccumulation: number;
    suspiciousPattern: boolean;
}

export interface RiskMetrics {
    overall: number;
    liquidity: number;
    concentration: number;
    volatility: number;
    social: number;
    technical: number;
}

export interface TokenData {
    address: string;
    name: string;
    symbol: string;
    metrics: TokenMetrics;
    riskMetrics?: RiskMetrics;
} 