// path: src/db/models/Token.ts
// EdgeDB schema for Token model
export class TokenModel {
    address;
    chain;
    name;
    symbol;
    volumeAnomaly;
    holderConcentration;
    liquidityScore;
    priceVolatility;
    sellPressure;
    marketCapRisk;
    isRugPull;
    metadata;
    constructor(address, chain, name, symbol, volumeAnomaly, holderConcentration, liquidityScore, priceVolatility, sellPressure, marketCapRisk, isRugPull, metadata) {
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
