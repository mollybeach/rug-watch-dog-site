// path: src/types/data.ts

export interface RiskMetricsType {
    overall: number;
    liquidity: number;
    concentration: number;
    volatility: number;
    social: number;
    technical: number;
    totalTokens: number;
    highRiskCount: number;
    mediumRiskCount: number;
    lowRiskCount: number;
}

export interface MetricsRiskType {
    overall: number;
    liquidity: number;
    concentration: number;
    volatility: number;
    social: number;
    technical: number;
}
export interface TokenMetricsType {
    metadata: string;
    tokenAddress: string;
    volumeAnomaly: number;
    holderConcentration: number;
    liquidityScore: number;
    priceVolatility: number;
    sellPressure: number;
    marketCapRisk: number;
    bundlerActivity: boolean;
    accumulationRate: number;
    stealthAccumulation: number;
    suspiciousPattern: boolean;
    isRugPull: boolean;
    timestamp: Date;
    holders: number;
    totalSupply: number;
    currentPrice: number;
    isHoneyPot: boolean;
}
export interface TokenPriceType {
    tokenAddress: string;
    price: number;
    volume24h: number;
    marketCap: number;
    liquidity: number;
    timestamp: Date;
}
export interface TokenDataType {
    address: string;
    name: string;
    symbol: string
    metrics: TokenMetricsType;
    price: TokenPriceType;
    createdAt: Date;
    updatedAt: Date;
}
export interface TokenAnalysis extends TokenDataType {
    // TokenAnalysis extends TokenData with additional fields
}

export interface ReasonMessage {
    condition: boolean;
    message: string;
}

export interface TokenAnalysisReason {
    reasons: string[];
    formatted: string;
} 
