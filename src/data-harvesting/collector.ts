// path: src/data-harvesting/collector.ts
import { edgeDBCloudClient, edgeql } from '../index';
import { TokenDataType} from '../../types/data';
import { formatTokenMetrics, formatTokenPrice } from '../utils/formatData';

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
                metrics: edgeql.insert(edgeql.TokenMetrics, formatTokenMetrics(tokenData.metrics)),
                price: edgeql.insert(edgeql.TokenPrices, formatTokenPrice(tokenData.price)),
                createdAt: tokenData.createdAt,
                updatedAt: tokenData.updatedAt
            }));

            await Promise.all(queries.map(query => query.run(edgeDBCloudClient)));
        } catch (error) {
            console.error('Error processing token batch:', error);
            throw error;
        } finally {
            this.processingBatch = false;
        }
    }

    async flushRemaining(): Promise<void> {
        if (this.tokenBatch.length > 0) {
            await this.processBatch();
        }
    }
}

export const dataCollector = new DataCollector(); 



