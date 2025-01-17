// EdgeDB schema for TrainingData model
export class TrainingDataModel {
    id;
    token;
    name;
    symbol;
    volumeAnomaly;
    holderConcentration;
    liquidityScore;
    priceVolatility;
    sellPressure;
    marketCapRisk;
    isRugPull;
    chain;
    createdAt;
    updatedAt;
    constructor(token, name, symbol, volumeAnomaly, holderConcentration, liquidityScore, priceVolatility, sellPressure, marketCapRisk, isRugPull, chain, createdAt, updatedAt) {
        this.token = token;
        this.name = name;
        this.symbol = symbol;
        this.volumeAnomaly = volumeAnomaly;
        this.holderConcentration = holderConcentration;
        this.liquidityScore = liquidityScore;
        this.priceVolatility = priceVolatility;
        this.sellPressure = sellPressure;
        this.marketCapRisk = marketCapRisk;
        this.isRugPull = isRugPull;
        this.chain = chain;
        this.createdAt = createdAt || new Date();
        this.updatedAt = updatedAt || new Date();
    }
}
