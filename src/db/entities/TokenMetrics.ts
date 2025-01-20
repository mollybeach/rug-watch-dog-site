import { Token } from './Token';

// EdgeDB schema for TokenMetrics entity
export class TokenMetrics {
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
    
    constructor(tokenAddress: string) {
        this.tokenAddress = tokenAddress;
        this.metadata = '';
        this.volumeAnomaly = 0;
        this.holderConcentration = 0;
        this.liquidityScore = 0;
        this.priceVolatility = 0;
        this.sellPressure = 0;
        this.marketCapRisk = 0;
        this.bundlerActivity = false;
        this.accumulationRate = 0;
        this.stealthAccumulation = 0;
        this.suspiciousPattern = false;
        this.isRugPull = false;
        this.timestamp = new Date();
        this.holders = 0;
        this.totalSupply = 0;
        this.currentPrice = 0;
        this.isHoneyPot = false;
    }
} 