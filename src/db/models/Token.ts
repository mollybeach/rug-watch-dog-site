// path: src/db/models/Token.ts

// EdgeDB schema for Token model
export class TokenModel {
    address: string;
    chain: string;
    name: string;
    symbol: string;
    volumeAnomaly: number;
    holderConcentration: number;
    liquidityScore: number;
    priceVolatility: number;
    sellPressure: number;
    marketCapRisk: number;
    isRugPull: boolean;
    metadata: object;

    constructor(address: string, chain: string, name: string, symbol: string, volumeAnomaly: number, holderConcentration: number, liquidityScore: number, priceVolatility: number, sellPressure: number, marketCapRisk: number, isRugPull: boolean, metadata: object) {
        this.address = address;
        this.chain = chain;
        this.name = name;
        this.symbol = symbol;
        this.volumeAnomaly = volumeAnomaly;
        this.holderConcentration = holderConcentration;
        this.liquidityScore = liquidityScore;
        this.priceVolatility = priceVolatility;
        this.sellPressure = sellPressure;
        this.marketCapRisk = marketCapRisk;
        this.isRugPull = isRugPull;
        this.metadata = metadata;
    }
} 