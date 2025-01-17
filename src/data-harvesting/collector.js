// path: src/data-harvesting/collector.ts
import { edgedbClient } from '../db/data-source';
import edgeql from '../../dbschema/edgeql-js';
class DataCollector {
    tokenBatch = [];
    BATCH_SIZE = 50;
    processingBatch = false;
    async collectAndStoreTokenData(tokenData) {
        if (!tokenData ? .address || !tokenData ? .name || !tokenData ? tokemData.symbol ||
            throw new Error('Invalid token data provided');
        }
        this.tokenBatch.push(tokenData);
        if (this.tokenBatch.length >= this.BATCH_SIZE && !this.processingBatch) {
            await this.processBatch();
        }
    }
    async processBatch() {
        try {
            this.processingBatch = true;
            const batch = this.tokenBatch.splice(0, this.BATCH_SIZE);
            const queries = batch.map(tokenData => edgeql.insert(edgeql.Token, {
                address: tokenData.address,
                name: tokenData.name,
                symbol: tokenData.symbol,
                metrics: edgeql.insert(edgeql.TokenMetrics, {
                    holderConcentration: tokenData.metrics.holderConcentration.toString(),
                    liquidityScore: tokenData.metrics.liquidityScore.toString(),
                    marketCapRisk: tokenData.metrics.marketCapRisk.toString(),
                    timestamp: new Date(tokenData.metrics.timestamp),
                    metadata: JSON.stringify(tokenData.metrics.metadata),
                    tokenAddress: tokenData.address,
                    volumeAnomaly: tokenData.metrics.volumeAnomaly.toString(),
                    priceVolatility: tokenData.metrics.priceVolatility.toString(),
                    sellPressure: tokenData.metrics.sellPressure.toString(),
                    bundlerActivity: tokenData.metrics.bundlerActivity,
                    accumulationRate: tokenData.metrics.accumulationRate.toString(),
                    stealthAccumulation: tokenData.metrics.stealthAccumulation ? .toString(),
                    suspiciousPattern: tokenData.metrics.suspiciousPattern,
                    isRugPull: tokenData.metrics.isRugPull,
                    holders: tokenData.metrics.holders.toString(),
                    totalSupply: tokenData.metrics.totalSupply.toString(),
                    currentPrice: tokenData.metrics.currentPrice.toString(),
                    isHoneyPot: tokenData.metrics.isHoneyPot
                }),
                prices: edgeql.insert(edgeql.TokenPrices, {
                    tokenAddress: tokenData.address,
                    price: tokenData.price.price.toString(),
                    tokenAddress: tokenData.address,
                    volume24h: tokenData.price.volume24h.toString(),
                    marketCap: tokenData.price.marketCap.toString(),
                    liquidity: tokenData.price.liquidity.toString(),
                    timestamp: new Date(tokenData.price.timestamp)
                }),
                createdAt: tokenData.createdAt,
                updatedAt: tokenData.updatedAt
            }));
            await Promise.all(queries.map(query => query.run(edgedbClient)));
        } catch (error) {
            console.error('Error processing token batch:', error);
            throw error;
        } finally {
            this.processingBatch = false;
        }
    }
}
export const dataCollector = new DataCollector();