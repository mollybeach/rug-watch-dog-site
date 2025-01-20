// path: src/data-harvesting/addTokens.js

// ./tokendata.js to//rewrite this to notscan the chain but just add theokens to the database 

import { fetchTokenData } from './fetcher';
import { edgeDBCloudClient, edgeql } from '../index';
import { Token, TokenMetrics, TokenPrices } from '../../dbschema/edgeql-js/modules/default';
import { seedTokenData } from './tokendata';

/*export const tokenData = {
    "name": "Kleros Tokens",
    "logoURI": "ipfs://QmRYXpD8X4sQZwA1E4SJvEjVZpEK1WtSrTqzTWvGpZVDwa",
    "keywords": [
        "t2cr",
        "kleros",
        "list"
    ],
    "timestamp": "2025-01-19T00:00:07.807Z",
    "version": {
        "major": 97,
        "minor": 74,
        "patch": 0
    },
    "tokens": [{
            "chainId": 1,
            "address": "0x4da08a1Bff50BE96bdeD5C7019227164b49C2bFc",
            "symbol": "Mononoke-Inu",
            "name": "Mononoke Inu",
            "decimals": 9,
            "logoURI": "ipfs://QmNzTu9qZnDEacDfTW5oA3xdynmvswzu5joCcfQ6QLromE"
        },
        {
            "chainId": 100,
            "address": "0x1a8805194D0eF2F73045a00c70Da399d9E74221c",
            "symbol": "GNOBBY",
            "name": "GNOBBY",
            "decimals": 18,
            "logoURI": "ipfs://QmP61G512gEZAyzfC1nu6zNLnDaw2cRvGAURZRY47ftxYR"
        },*/

// Function to add tokens to the database
async function addTokensToDatabase() {
    // Extract contract addresses from seedTokenData
    const contractAddresses = seedTokenData.tokens.map(token => token.address);

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
                    metrics: edgeql.insert(TokenMetrics, {
                        tokenAddress: tokenData.metrics.tokenAddress,
                        volumeAnomaly: edgeql.cast(edgeql.decimal, tokenData.metrics.volumeAnomaly),
                        holderConcentration: edgeql.cast(edgeql.decimal, tokenData.metrics.holderConcentration),
                        liquidityScore: edgeql.cast(edgeql.decimal, tokenData.metrics.liquidityScore),
                        priceVolatility: edgeql.cast(edgeql.decimal, tokenData.metrics.priceVolatility),
                        sellPressure: edgeql.cast(edgeql.decimal, tokenData.metrics.sellPressure),
                        marketCapRisk: edgeql.cast(edgeql.decimal, tokenData.metrics.marketCapRisk),
                        bundlerActivity: tokenData.metrics.bundlerActivity,
                        isRugPull: tokenData.metrics.isRugPull,
                        metadata: tokenData.metrics.metadata,
                        timestamp: tokenData.metrics.timestamp,
                        holders: edgeql.cast(edgeql.decimal, tokenData.metrics.holders),
                        totalSupply: edgeql.cast(edgeql.decimal, tokenData.metrics.totalSupply),
                        currentPrice: edgeql.cast(edgeql.decimal, tokenData.metrics.currentPrice),
                        isHoneyPot: tokenData.metrics.isHoneyPot,
                        suspiciousPattern: tokenData.metrics.suspiciousPattern || '',
                        accumulationRate: edgeql.cast(edgeql.decimal, tokenData.metrics.accumulationRate),
                        stealthAccumulation: edgeql.cast(edgeql.decimal, tokenData.metrics.stealthAccumulation || 0)
                    }),
                    price: edgeql.insert(TokenPrices, {
                        tokenAddress: tokenData.price.tokenAddress,
                        price: edgeql.cast(edgeql.decimal, tokenData.price.price),
                        volume24h: edgeql.cast(edgeql.decimal, tokenData.price.volume24h),
                        marketCap: edgeql.cast(edgeql.decimal, tokenData.price.marketCap),
                        liquidity: edgeql.cast(edgeql.decimal, tokenData.price.liquidity),
                        timestamp: tokenData.price.timestamp
                    })
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