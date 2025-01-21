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

function formatTokenRisk(risk: any) {
    return {
        tokenAddress: risk.tokenAddress,
        overall: risk.overall.toString(),
        liquidity: risk.liquidity.toString(),
        concentration: risk.concentration.toString(),
        volatility: risk.volatility.toString(),
        social: risk.social.toString(),
        technical: risk.technical.toString(),
        totalTokens: risk.totalTokens.toString(),
        highRiskCount: risk.highRiskCount.toString(),
        mediumRiskCount: risk.mediumRiskCount.toString(),
        lowRiskCount: risk.lowRiskCount.toString()
    };
}

function formatToken(token: any) {
    return {
        address: token.address,
        name: token.name,
        symbol: token.symbol,
        chain: token.chain,
        metrics: formatTokenMetrics(token.metrics),
        price: formatTokenPrice(token.price),
        risk: formatTokenRisk(token.risk),
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

function defaultTokenRisk() {
    return {
        tokenAddress: '0x0000000000000000000000000000000000000000',
        overall: 0.0,
        liquidity: 0.0,
        concentration: 0.0,
        volatility: 0.0,
        social: 0.0,
        technical: 0.0,
        totalTokens: 0.0,
        highRiskCount: 0.0,
        mediumRiskCount: 0.0,
        lowRiskCount: 0.0
    };
}

function defaultToken() {
    return {
        address: '0x0000000000000000000000000000000000000000',
        name: 'default',
        symbol: 'default',
        chain: 'default',
        metrics: defaultTokenMetrics(),
        price: defaultTokenPrice(),
        risk: defaultTokenRisk(),
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

function formatTokenRiskEdgeql(risk: any) {
    return {
        tokenAddress: risk.tokenAddress,
        overall: edgeql.cast(edgeql.decimal, risk.overall),
        liquidity: edgeql.cast(edgeql.decimal, risk.liquidity),
        concentration: edgeql.cast(edgeql.decimal, risk.concentration),
        volatility: edgeql.cast(edgeql.decimal, risk.volatility),
        social: edgeql.cast(edgeql.decimal, risk.social),
        technical: edgeql.cast(edgeql.decimal, risk.technical),
        totalTokens: edgeql.cast(edgeql.decimal, risk.totalTokens),
        highRiskCount: edgeql.cast(edgeql.decimal, risk.highRiskCount),
        mediumRiskCount: edgeql.cast(edgeql.decimal, risk.mediumRiskCount),
        lowRiskCount: edgeql.cast(edgeql.decimal, risk.lowRiskCount)
    };
}

function formatTokenEdgeql(token: any) {
    return {
        address: token.address,
        name: token.name,
        symbol: token.symbol,
        chain: token.chain,
        metrics: formatTokenMetricsEdgeql(token.metrics),
        price: formatTokenPriceEdgeql(token.price),
        risk: formatTokenRiskEdgeql(token.risk),
        createdAt: new Date(token.createdAt),
        updatedAt: new Date(token.updatedAt),
    }
}

export { formatToken, 
        formatTokenMetrics, 
        formatTokenPrice, 
        formatTokenRisk,
        defaultTokenMetrics, 
        defaultTokenPrice, 
        defaultTokenRisk,
        defaultToken, 
        formatTokenMetricsEdgeql, 
        formatTokenPriceEdgeql,
        formatTokenRiskEdgeql,
        formatTokenEdgeql
    };