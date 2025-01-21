import { edgeDBCloudClient, edgeql } from '../index';
import { fetchTokenData } from '../data-harvesting/fetcher';
import { Token, TokenMetrics, TokenPrices, TokenRisk } from '@/dbschema/edgeql-js/modules/default';
import { formatTokenMetricsEdgeql, formatTokenPriceEdgeql, formatTokenRiskEdgeql } from '@/src/utils/formatData';
import { TokenDataType } from '@/types/data';

async function updateDatabase() {
    try {
        console.log('🔄 Starting database update process...');

        // Fetch all tokens from the database
        const tokens: TokenDataType[] = await edgeDBCloudClient.query('SELECT Token { address }');

        for (const token of tokens) {
            console.log(`🔍 Updating token: ${token.address}`);

            // Fetch updated data for the token
            const updatedData = await fetchTokenData(token.address);

            console.log('updatedData');
            console.log(updatedData);
            if (updatedData) {
                console.log(`💾 Updating token data for ${updatedData.name} (${updatedData.symbol}) in the database.`);

                // if any of updatedData.risk is undefined, set it to 0
                if (updatedData.risk.overall === undefined) {
                    updatedData.risk.overall = 0;
                }
                if (updatedData.risk.liquidity === undefined) {
                    updatedData.risk.liquidity = 0;
                }
                if (updatedData.risk.concentration === undefined) {
                    updatedData.risk.concentration = 0;
                }
                if (updatedData.risk.volatility === undefined) {
                    updatedData.risk.volatility = 0;
                }
                if (updatedData.risk.social === undefined) {
                    updatedData.risk.social = 0;
                }   
                if (updatedData.risk.technical === undefined) {
                    updatedData.risk.technical = 0;
                }
                if (updatedData.risk.totalTokens === undefined) {
                    updatedData.risk.totalTokens = 0;
                }
                if (updatedData.risk.highRiskCount === undefined) {
                    updatedData.risk.highRiskCount = 0;
                }
                if (updatedData.risk.mediumRiskCount === undefined) {
                    updatedData.risk.mediumRiskCount = 0;
                }
                if (updatedData.risk.lowRiskCount === undefined) {
                    updatedData.risk.lowRiskCount = 0;
                }
                // Prepare the EdgeQL update statement
                const updateToken = edgeql.update(Token, token => ({
                    filter: edgeql.op(token.address, '=', updatedData.address),
                    set: {
                        name: updatedData.name,
                        symbol: updatedData.symbol,
                        metrics: edgeql.insert(TokenMetrics, formatTokenMetricsEdgeql(updatedData.metrics)),
                        price: edgeql.insert(TokenPrices, formatTokenPriceEdgeql(updatedData.price)),
                        risk: edgeql.insert(TokenRisk, formatTokenRiskEdgeql(updatedData.risk)),
                        updatedAt: new Date()
                    }
                }));

                // Execute the update statement
                await updateToken.run(edgeDBCloudClient);
                console.log(`✅ Successfully updated token data for ${updatedData.name} (${updatedData.symbol}).`);
            } else {
                console.log(`❌ Failed to fetch data for token: ${token.address}`);
            }
        }

        console.log('✅ Database update process completed.');
    } catch (error) {
        console.error('Error updating database:', error);
        if (error instanceof Error) {
            console.error('Stack trace:', error.stack);
        }
    }
}

updateDatabase();
