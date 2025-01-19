// path: src/scripts/view-local-db.ts
import { localClient, edgeql } from '../index';

async function viewExistingLocalData() {
    try {
        // Query to select all tokens and their related metrics and prices

        const metricsQuery = edgeql.select(edgeql.TokenMetrics, (metrics) => ({
            tokenAddress: true,
            metadata: true,
            volumeAnomaly: true,
            holderConcentration: true,
            liquidityScore: true,
            priceVolatility: true,
            sellPressure: true,
            marketCapRisk: true,
            bundlerActivity: true,
            accumulationRate: true,
            stealthAccumulation: true,
            suspiciousPattern: true,
            isRugPull: true,
            timestamp: true,
            holders: true,
            totalSupply: true,
            currentPrice: true,
            isHoneyPot: true
        }));

        const pricesQuery = edgeql.select(edgeql.TokenPrices, (price) => ({
            tokenAddress: true,
            price: true,
            volume24h: true,
            marketCap: true,
            liquidity: true,
            timestamp: true
        }));

        const tokensQuery = edgeql.select(edgeql.Token, (token) => ({
            address: true,
            name: true,
            symbol: true,
            metrics: {
                tokenAddress: true,
                volumeAnomaly: true,
                holderConcentration: true,
                liquidityScore: true,
                priceVolatility: true,
                sellPressure: true,
                marketCapRisk: true,
                bundlerActivity: true,
                accumulationRate: true,
                stealthAccumulation: true,
                suspiciousPattern: true,
                isRugPull: true,
                timestamp: true,
                holders: true,
                totalSupply: true,
                currentPrice: true,
                isHoneyPot: true
            },
            price: {
                tokenAddress: true,
                price: true,
                liquidity: true,
                volume24h: true,
                marketCap: true,
                timestamp: true
            },
            createdAt: true,
            updatedAt: true
        }));

        // Execute the query
        const tokens = await tokensQuery.run(localClient);
        const metrics = await metricsQuery.run(localClient);
        const prices = await pricesQuery.run(localClient);

        // Log the results
        console.log('Existing Tokens in Local Database:', tokens);
        console.log('Existing Metrics in Local Database:', metrics);
        console.log('Existing Prices in Local Database:', prices);

    } catch (error) {
        console.error('❌ Error fetching data from Local Database:', error);
    }
}

// Call the function to view existing data
viewExistingLocalData();

export { viewExistingLocalData };
