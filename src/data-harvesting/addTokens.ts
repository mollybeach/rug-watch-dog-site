// path: src/data-harvesting/addTokens.js

import { fetchTokenData } from '@/src/data-harvesting/fetcher';
import { edgeDBCloudClient, edgeql } from '@/src/index';
import { Token, TokenMetrics, TokenPrices, TokenRisk } from '@/dbschema/edgeql-js/modules/default';
import { kleroSeedsTokenData } from '@/db/seeders/kleros-seeds';
import { formatTokenMetricsEdgeql, formatTokenPriceEdgeql, formatTokenRiskEdgeql } from '@/utils/formatData';
// Function to add tokens to the database
async function addTokensToDatabase() {
    // Extract contract addresses from seedTokenData
    const contractAddresses = kleroSeedsTokenData.tokens.map(token => token.address);

    // Loop through each contract address
    for (const address of contractAddresses) {
        try {
            // Fetch token data for the current address
            const tokenData = await fetchTokenData(address, 'ethereum');

            if (tokenData) {
                console.log(`💾 Inserting token data for ${tokenData.name} (${tokenData.symbol}) into database.`);
                
                // Prepare the EdgeQL insert statement
                const insertToken = edgeql.insert(Token, {
                    address: address,
                    name: tokenData.name,
                    symbol: tokenData.symbol,
                    metrics: edgeql.insert(TokenMetrics, formatTokenMetricsEdgeql(tokenData.metrics)),
                    price: edgeql.insert(TokenPrices, formatTokenPriceEdgeql(tokenData.price)),
                    risk: edgeql.insert(TokenRisk, formatTokenRiskEdgeql(tokenData.risk))
                });

                // Execute the insert statement
                await insertToken.run(edgeDBCloudClient);
                console.log(`✅ Successfully saved token data for ${tokenData.name} (${tokenData.symbol}).`);
            } else {
                console.log(`⚠️ No token data found for contract address: ${address}`);
            }
        } catch (error) {
            console.error(`❌ Error processing token at address ${address}: ${error}`);
        }
    }
}

// Run the function to add tokens to the database
addTokensToDatabase().catch(error => {
    console.error('❌ Fatal error:', error);
    process.exit(1);
});