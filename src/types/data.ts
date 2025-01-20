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

export interface RiskMetricsType {
    overall: number;
    liquidity: number;
    concentration: number;
    volatility: number;
    social: number;
    technical: number;
}
export interface TokenDataType {
    address: string;
    name: string;
    symbol: string
    metrics: TokenMetricsType;
    price: TokenPriceType;
    createdAt: Date;
    updatedAt: Date;
    riskMetrics?: RiskMetricsType;
}

export type TokensType = TokenDataType[];

export interface TrainingData extends TokenMetricsType {
}

 