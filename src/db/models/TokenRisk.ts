// path: src/db/models/TokenRisk.ts

// EdgeDB schema for TokenRisk entity
export class TokenRisk {
    tokenAddress: string;
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

    constructor(tokenAddress: string) {
        this.tokenAddress = tokenAddress;
        this.overall = 0;
        this.liquidity = 0;
        this.concentration = 0;
        this.volatility = 0;
        this.social = 0;
        this.technical = 0;
        this.totalTokens = 0;
        this.highRiskCount = 0;
        this.mediumRiskCount = 0;
        this.lowRiskCount = 0;
    }
}