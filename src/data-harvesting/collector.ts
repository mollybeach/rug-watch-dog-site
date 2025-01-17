// path: src/data-harvesting/collector.ts
import { edgedbClient } from '../db/data-source';
import edgeql from '../../dbschema/edgeql-js';
import { TokenDataType} from '../types/data';
class DataCollector {
    private tokenBatch: TokenDataType[] = [];
    private readonly BATCH_SIZE = 50;
    private processingBatch = false;

    async collectAndStoreTokenData(tokenData: TokenDataType): Promise<void> {
        if (!tokenData?.address || !tokenData?.name || !tokenData?.symbol || !tokenData?.metrics || !tokenData?.price || !tokenData?.createdAt || !tokenData?.updatedAt) {
            throw new Error('Invalid token data provided');
        }
        
        this.tokenBatch.push(tokenData);
        
        if (this.tokenBatch.length >= this.BATCH_SIZE && !this.processingBatch) {
            await this.processBatch();
        }
    }

    private async processBatch(): Promise<void> {
        try {
            this.processingBatch = true;
            const batch = this.tokenBatch.splice(0, this.BATCH_SIZE);
            const queries = batch.map(tokenData => edgeql.insert(edgeql.Token, {
                address: tokenData.address,
                name: tokenData.name,
                symbol: tokenData.symbol,
                //@ts-ignore
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
                    stealthAccumulation: tokenData.metrics.stealthAccumulation?.toString(),
                    suspiciousPattern: tokenData.metrics.suspiciousPattern,
                    isRugPull: tokenData.metrics.isRugPull,
                    holders: tokenData.metrics.holders.toString(), 
                    //@ts-ignore
                    totalSupply: tokenData.metrics.totalSupply.toString(),
                    //@ts-ignore
                    currentPrice: tokenData.metrics.currentPrice.toString(),
                    isHoneyPot: tokenData.metrics.isHoneyPot
                }),
                price: edgeql.insert(edgeql.TokenPrices, {
                    tokenAddress: tokenData.address,
                    price: tokenData.price.price.toString(),
                    volume24h: tokenData.price.volume24h.toString(),
                    marketCap: tokenData.price.marketCap.toString(),
                    liquidity: tokenData.price.liquidity.toString(),
                    timestamp: new Date(tokenData.price.timestamp),
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