import edgeql from '../../dbschema/edgeql-js';
import { edgedbClient } from '../db/connection/connection';

async function viewExistingData() {
    try {
        // Query to select all tokens and their related metrics and prices
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
        const tokens = await tokensQuery.run(edgedbClient);

        // Log the results
        console.log('Existing Tokens in Database:', tokens);
    } catch (error) {
        console.error('❌ Error fetching data from database:', error);
    }
}

// Call the function to view existing data
viewExistingData();
