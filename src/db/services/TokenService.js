// path: src/db/services/TokenService.ts
import { edgedbClient } from '../data-source';
import edgeql from '../../../dbschema/edgeql-js';
export class TokenService {
    async upsertToken(tokenData) {
        const query = edgeql.insert(edgeql.Token, {
            address: tokenData.address,
            name: tokenData.name ? ? '',
            symbol: tokenData.symbol ? ? '',
            metrics: tokenData.metrics ? {
                ...tokenData.metrics
            } : undefined,
            price: tokenData.price ? {
                ...tokenData.price
            } : undefined
        }).unlessConflict(token => ({
            on: token.address,
            else: edgeql.update(token, {
                name: tokenData.name ? ? '',
                symbol: tokenData.symbol ? ? '',
                metrics: tokenData.metrics ? {
                    ...tokenData.metrics
                } : undefined,
                price: tokenData.price ? {
                    ...tokenData.price
                } : undefined
            })
        }));
        await query.run(edgedbClient);
    }
    async saveMetrics(metrics) {
        const query = edgeql.insert(edgeql.TokenMetrics, {
            tokenAddress: metrics.tokenAddress,
            volumeAnomaly: metrics.volumeAnomaly ? .toString() ? ? '0',
            holderConcentration: metrics.holderConcentration ? .toString() ? ? '0',
            liquidityScore: metrics.liquidityScore ? .toString() ? ? '0',
            priceVolatility: metrics.priceVolatility ? .toString() ? ? '0',
            sellPressure: metrics.sellPressure ? .toString() ? ? '0',
            marketCapRisk: metrics.marketCapRisk ? .toString() ? ? '0',
            bundlerActivity: metrics.bundlerActivity ? ? false,
            accumulationRate: metrics.accumulationRate ? .toString() ? ? '0',
            stealthAccumulation: metrics.stealthAccumulation ? .toString() ? ? '0',
            suspiciousPattern: metrics.suspiciousPattern ? ? null,
            isRugPull: metrics.isRugPull ? ? false,
            metadata: metrics.metadata ? ? '{}'
        });
        await query.run(edgedbClient);
    }
    async getTokenWithLatestData(address) {
        const query = edgeql.select(edgeql.Token, token => ({
            filter: edgeql.op(token.address, '=', address),
            limit: 1,
            order_by: {
                expression: token.createdAt,
                direction: edgeql.DESC
            },
            ...edgeql.Token['*'],
            metrics: (metrics) => ({
                filter: edgeql.op(metrics.tokenAddress, '=', address),
                order_by: {
                    expression: metrics.timestamp,
                    direction: edgeql.DESC
                },
                limit: 1,
                ...edgeql.TokenMetrics['*']
            })
        }));
        const result = await query.run(edgedbClient);
        if (result[0]) {
            const tokenData = {
                ...result[0],
                metrics: result[0].metrics ? {...result[0].metrics } : {},
                price: result[0].price ? {...result[0].price } : {}
            };
            return tokenData;
        }
        return null;
    }
    async getTokenMetricsHistory(address, limit) {
        const query = edgeql.select(edgeql.TokenMetrics, (metrics) => ({
            filter: edgeql.op(metrics.tokenAddress, '=', address),
            order_by: edgeql.DESC(metrics.timestamp),
            limit,
            ...edgeql.TokenMetrics['*']
        }));
        const result = await query.run(edgedbClient);
        return result.map((item) => ({
            ...item,
            volumeAnomaly: parseFloat(item.volumeAnomaly),
            holderConcentration: parseFloat(item.holderConcentration),
            liquidityScore: parseFloat(item.liquidityScore),
            priceVolatility: parseFloat(item.priceVolatility),
            sellPressure: parseFloat(item.sellPressure),
            marketCapRisk: parseFloat(item.marketCapRisk),
            accumulationRate: parseFloat(item.accumulationRate),
            stealthAccumulation: parseFloat(item.stealthAccumulation)
        }));
    }
    async getTokenPriceHistory(address, limit) {
        const query = edgeql.select(edgeql.TokenPrices, price => ({
            filter: edgeql.op(price.tokenAddress, '=', address),
            order_by: {
                expression: price.timestamp,
                direction: edgeql.DESC
            },
            limit,
            ...edgeql.TokenPrices['*']
        }));
        const result = await query.run(edgedbClient);
        return result.map((item) => ({
            ...item,
            tokenAddress: item.tokenAddress,
            price: parseFloat(item.price),
            volume24h: parseFloat(item.volume24h),
            marketCap: parseFloat(item.marketCap),
            liquidity: parseFloat(item.liquidity),
            timestamp: item.timestamp
        }));
    }
    async getAllTokens() {
        const query = edgeql.select(edgeql.Token, () => ({
            ...edgeql.Token['*']
        }));
        const result = await query.run(edgedbClient);
        return result.map((item) => ({
            ...item,
            metrics: item.metrics ? ? {},
            price: item.price ? ? {}
        }));
    }
}