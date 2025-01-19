// path: src/db/services/TokenService.ts
import { edgeDBCloudClient, edgeql } from '../../index';
import type { TokenMetricsType, TokenDataType, TokenPriceType } from '../../types/data';

export class TokenService {
    async upsertToken(tokenData: Partial<TokenDataType>): Promise<void> {
        const query = edgeql.insert(edgeql.Token, {
            symbol: tokenData.symbol ?? '',  // Provide a default value if necessary
            address: tokenData.address ?? '',
            name: tokenData.name ?? '',
            metrics: edgeql.assert_single(
                edgeql.select(edgeql.TokenMetrics, metrics => ({
                    filter: edgeql.op(metrics.tokenAddress, '=', edgeql.str(tokenData.address ?? '')),
                    limit: 1
                }))
            ),
            price: edgeql.assert_single(
                edgeql.select(edgeql.TokenPrices, price => ({
                    filter: edgeql.op(price.tokenAddress, '=', edgeql.str(tokenData.address ?? '')),
                    limit: 1
                }))
            )
        }).unlessConflict(token => ({
            on: token.address,
            else: edgeql.update(token, () => ({
                set: {
                    name: tokenData.name ?? '',
                    symbol: tokenData.symbol ?? ''
                }
            }))
        }));

        await query.run(edgeDBCloudClient);
    }

    async saveMetrics(metrics: Partial<TokenMetricsType>): Promise<void> {
        const query = edgeql.insert(edgeql.TokenMetrics, {
            tokenAddress: metrics.tokenAddress!,
            volumeAnomaly: metrics.volumeAnomaly?.toString() ?? '0',
            suspiciousPattern: metrics.suspiciousPattern ?? ''
        });

        await query.run(edgeDBCloudClient);
    }

    async getTokenWithLatestData(address: string): Promise<TokenDataType | null> {
        const query = edgeql.select(edgeql.Token, token => ({
            filter: edgeql.op(token.address, '=', address),
            limit: 1,
            ...edgeql.Token['*']
        }));
        const result = await query.run(edgeDBCloudClient);
        const token = result[0];
        if (!token) return null;
        return {
            ...token,
            metrics: {
                metadata: '',
                tokenAddress: token.address,
                volumeAnomaly: 0,
                holderConcentration: 0,
                liquidityScore: 0,
                priceVolatility: 0,
                sellPressure: 0,
                marketCapRisk: 0,
                bundlerActivity: false,
                accumulationRate: 0,
                stealthAccumulation: 0,
                suspiciousPattern: '',
                isRugPull: false,
                timestamp: new Date(),
                holders: 0,
                totalSupply: 0,
                currentPrice: 0,
                isHoneyPot: false
            },
            price: {
                tokenAddress: token.address,
                price: 0,
                volume24h: 0,
                marketCap: 0,
                liquidity: 0,
                timestamp: new Date()
            }
        };
    }

    async getAllTokens(): Promise<TokenDataType[]> {
        const query = edgeql.select(edgeql.Token, () => ({
            ...edgeql.Token['*']
        }));
        const result = await query.run(edgeDBCloudClient);
        const tokens = result.map(token => ({
            ...token,
            metrics: {
                metadata: '',
                tokenAddress: token.address,
                volumeAnomaly: 0,
                holderConcentration: 0,
                liquidityScore: 0,
                priceVolatility: 0,
                sellPressure: 0,
                marketCapRisk: 0,
                bundlerActivity: false,
                accumulationRate: 0,
                stealthAccumulation: 0,
                suspiciousPattern: '',
                isRugPull: false,
                timestamp: new Date(),
                holders: 0,
                totalSupply: 0,
                currentPrice: 0,
                isHoneyPot: false
            },
            price: {
                tokenAddress: token.address,
                price: 0,
                volume24h: 0,
                marketCap: 0,
                liquidity: 0,
                timestamp: new Date()
            }
        }));
        return tokens;
    }

    async getTokenMetricsHistory(address: string, limit: number): Promise<TokenMetricsType[]> {
        const query = edgeql.select(edgeql.TokenMetrics, metrics => ({
            filter: edgeql.op(metrics.tokenAddress, '=', address),
            order_by: {
                expression: metrics.timestamp,
                direction: edgeql.DESC
            },
            limit,
            ...edgeql.TokenMetrics['*']
        }));

        const result = await query.run(edgeDBCloudClient);
        return result.map((item: any) => ({
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

    async getTokenPriceHistory(address: string, limit: number): Promise<TokenPriceType[]> {
        const query = edgeql.select(edgeql.TokenPrices, price => ({
            filter: edgeql.op(price.tokenAddress, '=', address),
            order_by: {
                expression: price.timestamp,
                direction: edgeql.DESC
            },
            limit,
            ...edgeql.TokenPrices['*']
        }));

        const result = await query.run(edgeDBCloudClient);
        return result.map((item: any) => ({
            ...item,
            tokenAddress: item.tokenAddress,        
            price: parseFloat(item.price),
            volume24h: parseFloat(item.volume24h),
            marketCap: parseFloat(item.marketCap),
            liquidity: parseFloat(item.liquidity),  
            timestamp: item.timestamp
        }));
    }
}