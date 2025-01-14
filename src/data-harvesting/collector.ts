// path: src/data-harvesting/collector.ts
import { Token } from '../db/entities/Token';
import { TokenMetrics } from '../db/entities/TokenMetrics';
import { TokenPrice } from '../db/entities/TokenPrice';
import { AppDataSource } from '../db/data-source';
import { TokenData } from '../types/token';
import { In } from 'typeorm';

class DataCollector {
    private tokenBatch: TokenData[] = [];
    private readonly BATCH_SIZE = 50;
    private processingBatch = false;

    async collectAndStoreTokenData(tokenData: TokenData): Promise<void> {
        this.tokenBatch.push(tokenData);
        
        if (this.tokenBatch.length >= this.BATCH_SIZE && !this.processingBatch) {
            await this.processBatch();
        }
    }

    private async processBatch(): Promise<void> {
        if (this.processingBatch || this.tokenBatch.length === 0) return;
        
        this.processingBatch = true;
        const batchToProcess = [...this.tokenBatch];
        this.tokenBatch = [];

        const queryRunner = AppDataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            // Process tokens in bulk
            const tokenRepository = queryRunner.manager.getRepository(Token);
            const tokenAddresses = batchToProcess.map(data => data.address);
            
            // Check existing tokens
            const existingTokens = await tokenRepository.find({
                where: { address: In(tokenAddresses) }
            });
            const existingAddresses = new Set(existingTokens.map(t => t.address));
            
            // Prepare new tokens
            const newTokens = batchToProcess
                .filter(data => !existingAddresses.has(data.address))
                .map(data => tokenRepository.create({
                    address: data.address,
                    name: data.name,
                    symbol: data.symbol
                }));

            if (newTokens.length > 0) {
                await tokenRepository.save(newTokens);
            }

            // Process metrics in bulk
            const metricsRepository = queryRunner.manager.getRepository(TokenMetrics);
            const metricsEntities = batchToProcess.map(data => 
                metricsRepository.create({
                    token_address: data.address,
                    volume_anomaly: data.metrics.volume_anomaly ?? 0,
                    holder_concentration: data.metrics.holder_concentration ?? 0,
                    liquidity_score: data.metrics.liquidity_score ?? 0,
                    price_volatility: data.metrics.price_volatility ?? 0,
                    sell_pressure: data.metrics.sell_pressure ?? 0,
                    market_cap_risk: data.metrics.market_cap_risk ?? 0,
                    bundler_activity: data.metrics.bundler_activity ?? false,
                    accumulation_rate: data.metrics.accumulation_rate ?? 0,
                    stealth_accumulation: data.metrics.stealth_accumulation ?? 0,
                    suspicious_pattern: data.metrics.suspicious_pattern,
                    is_rug_pull: data.metrics.is_rug_pull,
                    metadata: data.metrics.metadata ?? {}
                })
            );
            await metricsRepository.save(metricsEntities);

            // Process prices in bulk
            const priceRepository = queryRunner.manager.getRepository(TokenPrice);
            const priceEntities = batchToProcess.map(data =>
                priceRepository.create({
                    token_address: data.address,
                    price: data.price.price,
                    volume24h: data.price.volume24h,
                    market_cap: data.price.market_cap,
                    liquidity: data.price.liquidity
                })
            );
            await priceRepository.save(priceEntities);

            await queryRunner.commitTransaction();
            console.log(`✅ Successfully processed batch of ${batchToProcess.length} tokens`);
        } catch (error) {
            console.error('Error processing batch:', error);
            await queryRunner.rollbackTransaction();
            
            // Requeue failed items
            this.tokenBatch = [...this.tokenBatch, ...batchToProcess];
        } finally {
            this.processingBatch = false;
            await queryRunner.release();
        }
    }

    async flushRemaining(): Promise<void> {
        if (this.tokenBatch.length > 0) {
            await this.processBatch();
        }
    }
}

export const dataCollector = new DataCollector(); 