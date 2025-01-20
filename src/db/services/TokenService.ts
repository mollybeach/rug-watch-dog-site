// path: src/db/services/TokenService.ts
import { edgeDBCloudClient, edgeql } from '../../index';
import type { TokenMetricsType, TokenDataType, TokenPriceType } from '../../types/data';
import { formatToken, formatTokenMetrics, formatTokenPrice } from '../../utils/formatData';

export async function upsertToken(tokenData: Partial<TokenDataType>): Promise<void> {
    const formattedToken = formatToken(tokenData);
    const query = edgeql.insert(edgeql.Token, {
        symbol: formattedToken.symbol,
        address: formattedToken.address,
        name: formattedToken.name,
        metrics: edgeql.assert_single(
            edgeql.select(edgeql.TokenMetrics, metrics => ({
                filter: edgeql.op(metrics.tokenAddress, '=', edgeql.str(formattedToken.address)),
                limit: 1
            }))
        ),
        price: edgeql.assert_single(
            edgeql.select(edgeql.TokenPrices, price => ({
                filter: edgeql.op(price.tokenAddress, '=', edgeql.str(formattedToken.address)),
                limit: 1
            }))
        )
    }).unlessConflict(token => ({
        on: token.address,
        else: edgeql.update(token, () => ({
            set: {
                name: formattedToken.name,
                symbol: formattedToken.symbol
            }
        }))
    }));

    await query.run(edgeDBCloudClient);
}

export async function saveMetrics(metrics: Partial<TokenMetricsType>): Promise<void> {
    const formattedMetrics = formatTokenMetrics(metrics);
    const query = edgeql.insert(edgeql.TokenMetrics, formattedMetrics);

    await query.run(edgeDBCloudClient);
}

export async function getTokenWithLatestData(address: string): Promise<TokenDataType | null> {
    const query = edgeql.select(edgeql.Token, token => ({
        filter: edgeql.op(token.address, '=', address),
        limit: 1,
        ...edgeql.Token['*']
    }));
    const result = await query.run(edgeDBCloudClient);
    const token = result[0];
    if (!token) return null;
    return formatToken(token);
}

export async function getAllTokens(): Promise<TokenDataType[]> {
    const query = edgeql.select(edgeql.Token, () => ({
        ...edgeql.Token['*']
    }));
    const result = await query.run(edgeDBCloudClient);
    return result.map(token => formatToken(token));
}

export async function getTokenMetricsHistory(address: string, limit: number): Promise<TokenMetricsType[]> {
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
    return result.map((item: any) => formatTokenMetrics(item));
}

export async function getTokenPriceHistory(address: string, limit: number): Promise<TokenPriceType[]> {
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
    return result.map((item: any) => formatTokenPrice(item));
}