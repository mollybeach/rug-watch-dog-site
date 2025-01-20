// path: src/utils/formatData.ts

import { edgeql } from '@/src/index';
function formatTokenMetrics(metrics: any) {
    return {
        tokenAddress: metrics.tokenAddress,
        holderConcentration: metrics.holderConcentration.toString(),
        liquidityScore: metrics.liquidityScore.toString(),
        marketCapRisk: metrics.marketCapRisk.toString(),
        timestamp: new Date(metrics.timestamp),
        metadata: JSON.stringify(metrics.metadata),
        volumeAnomaly: metrics.volumeAnomaly.toString(),
        priceVolatility: metrics.priceVolatility.toString(),
        sellPressure: metrics.sellPressure.toString(),
        bundlerActivity: metrics.bundlerActivity,
        accumulationRate: metrics.accumulationRate.toString(),
        stealthAccumulation: metrics.stealthAccumulation?.toString(),
        suspiciousPattern: metrics.suspiciousPattern ?? false,
        isRugPull: metrics.isRugPull,
        holders: metrics.holders.toString(),
        totalSupply: metrics.totalSupply.toString(),
        currentPrice: metrics.currentPrice.toString(),
        isHoneyPot: metrics.isHoneyPot
    };
}

function formatTokenPrice(price: any) {
    return {
        tokenAddress: price.tokenAddress,
        price: price.price.toString(),
        volume24h: price.volume24h.toString(),
        marketCap: price.marketCap.toString(),
        liquidity: price.liquidity.toString(),
        timestamp: new Date(price.timestamp),
    };
}


function formatToken(token: any) {
    return {
        address: token.address,
        name: token.name,
        symbol: token.symbol,
        metrics: formatTokenMetrics(token.metrics),
        price: formatTokenPrice(token.price),
        createdAt: new Date(token.createdAt),
        updatedAt: new Date(token.updatedAt),
    };
}

function defaultTokenMetrics() {
    return {
        tokenAddress: '0x0000000000000000000000000000000000000000',
        metadata: '{reason: "default"}',
        volumeAnomaly: 0,
        holderConcentration: 0,
        liquidityScore: 0,
        priceVolatility: 0,
        sellPressure: 0,
        marketCapRisk: 0,
        bundlerActivity: false,
        accumulationRate: 0,
        stealthAccumulation: 0,
        suspiciousPattern: false,
        isRugPull: false,
        timestamp: new Date(),
        holders: 0,
        totalSupply: 0,
        currentPrice: 0,
        isHoneyPot: false
    }
}

function defaultTokenPrice() {
    return {
        tokenAddress: '0x0000000000000000000000000000000000000000',
        price: 0,
        volume24h: 0,
        marketCap: 0,
        liquidity: 0,
        timestamp: new Date(),
    }
}

function defaultToken() {
    return {
        address: '0x0000000000000000000000000000000000000000',
        name: 'default',
        symbol: 'default',
        metrics: defaultTokenMetrics(),
        price: defaultTokenPrice(),
        createdAt: new Date(),
        updatedAt: new Date(),
    }
}

function formatTokenMetricsEdgeql(metrics: any) {
    return {
        tokenAddress: metrics.tokenAddress,
        volumeAnomaly: edgeql.cast(edgeql.decimal, metrics.volumeAnomaly),
        holderConcentration: edgeql.cast(edgeql.decimal, metrics.holderConcentration),
        liquidityScore: edgeql.cast(edgeql.decimal, metrics.liquidityScore),
        priceVolatility: edgeql.cast(edgeql.decimal, metrics.priceVolatility),
        sellPressure: edgeql.cast(edgeql.decimal, metrics.sellPressure),
        marketCapRisk: edgeql.cast(edgeql.decimal, metrics.marketCapRisk),
        bundlerActivity: metrics.bundlerActivity,
        accumulationRate: edgeql.cast(edgeql.decimal, metrics.accumulationRate),
        stealthAccumulation: edgeql.cast(edgeql.decimal, metrics.stealthAccumulation || 0),
        suspiciousPattern: metrics.suspiciousPattern,
        isRugPull: metrics.isRugPull,
        holders: edgeql.cast(edgeql.decimal, metrics.holders),
        totalSupply: edgeql.cast(edgeql.decimal, metrics.totalSupply),
        currentPrice: edgeql.cast(edgeql.decimal, metrics.currentPrice),
        isHoneyPot: metrics.isHoneyPot
    }
}

function formatTokenPriceEdgeql(price: any) {
    return {
        tokenAddress: price.tokenAddress,
        price: edgeql.cast(edgeql.decimal, price.price),
        volume24h: edgeql.cast(edgeql.decimal, price.volume24h),
        marketCap: edgeql.cast(edgeql.decimal, price.marketCap),
        liquidity: edgeql.cast(edgeql.decimal, price.liquidity),
        timestamp: new Date(price.timestamp),
    }
}

export { formatToken, 
        formatTokenMetrics, 
        formatTokenPrice, 
        defaultTokenMetrics, 
        defaultTokenPrice, 
        defaultToken, 
        formatTokenMetricsEdgeql, 
        formatTokenPriceEdgeql,
    };