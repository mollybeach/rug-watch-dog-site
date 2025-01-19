// path: src/scripts/view/view-cloud-db.ts
import { edgeDBCloudClient, edgeql } from '../../index';

async function viewExistingCloudData() {
    try {
        // Query to select all tokens and their related metrics and prices

        const metricsQuery = edgeql.select(edgeql.TokenMetrics, (metrics) => ({
            tokenAddress: true,
            volumeAnomaly: true,
            holderConcentration: true,
            liquidityScore: true,
            priceVolatility: true,
            sellPressure: true,
            marketCapRisk: true,
        }));

        const pricesQuery = edgeql.select(edgeql.TokenPrices, (price) => ({
            tokenAddress: true,
            price: true,
            liquidity: true,
            volume24h: true,
            marketCap: true,
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
        const tokens = await tokensQuery.run(edgeDBCloudClient);
        const metrics = await metricsQuery.run(edgeDBCloudClient);
        const prices = await pricesQuery.run(edgeDBCloudClient);

        // Log the results
        console.log('Existing Tokens in Cloud Database:', tokens);
        console.log('Existing Metrics in Cloud Database:', metrics);
        console.log('Existing Prices in Cloud Database:', prices);
    } catch (error) {
        console.error('❌ Error fetching data from Cloud Database:', error);
    }
}

// Call the function to view existing data
viewExistingCloudData();

export { viewExistingCloudData };
