// path: src/db/queries/queries.ts

export const SELECT_TOKEN_METRICS = `
    SELECT TokenMetrics {
        tokenAddress,
        volumeAnomaly,
        holderConcentration,
        liquidityScore,
        priceVolatility,
        sellPressure,
        marketCapRisk,
        bundlerActivity,
        accumulationRate,
        stealthAccumulation,
        suspiciousPattern,
        isRugPull,
        timestamp,
        holders,
        totalSupply,
        currentPrice,
        isHoneyPot
    }
`;

export const SELECT_TOKEN_PRICES = `
    SELECT TokenPrices {
        tokenAddress,
        price,
        volume24h,
        marketCap,
        liquidity,
        timestamp
    }
`;

export const SELECT_TOKEN_RISK = `
    SELECT TokenRisk {
        tokenAddress,
        overall,
        liquidity,
        concentration,
        volatility,
        social,
        technical,
        totalTokens,
        highRiskCount,
        mediumRiskCount,
        lowRiskCount
    }
`;

export const SELECT_TOKEN = `
    SELECT Token {
        address,
        name,
        symbol,
        metrics: {
            tokenAddress,
            volumeAnomaly,
            holderConcentration,
            liquidityScore,
            priceVolatility,
            sellPressure,
            marketCapRisk,
            bundlerActivity,
            accumulationRate,
            stealthAccumulation,
            suspiciousPattern,
            isRugPull,
            timestamp,
            holders,
            totalSupply,
            currentPrice,
            isHoneyPot
        },
        price: {
            tokenAddress,
            price,
            liquidity,
            volume24h,
            marketCap,
            timestamp
        },
        risk: {
            tokenAddress,
            overall,
            liquidity,
            concentration,
            volatility,
            social,
            technical,
            totalTokens,
            highRiskCount,
            mediumRiskCount,
            lowRiskCount
        },
        createdAt,
        updatedAt
    } FILTER .address = <str>$address
`;

// Add more queries as needed
