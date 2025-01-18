// path: src/scripts/check-data.ts
import { edgeDBCloudClient } from '../db/connection/connection';
import edgeql from '../../dbschema/edgeql-js';

/*
async function checkData() {
    try {
        console.log('Database connection initialized');

        // Count total tokens
        const tokenCount = await edgeql.count(edgeql.Token).run(edgeDBCloudClient);
        console.log(`Total tokens in database: ${tokenCount}`);

        // Count total metrics
        const metricsCount = await edgeql.count(edgeql.TokenMetrics).run(edgeDBCloudClient);
        console.log(`Total token metrics records: ${metricsCount}`);

        // Get a sample of tokens with their metrics
        const sampleTokens = await edgeql.select(edgeql.Token, (token) => ({
            name: token.name,
            symbol: token.symbol,
            address: token.address,
            metrics: edgeql.assert_single(
                edgeql.select(edgeql.TokenMetrics, (metrics) => ({
                    ...edgeql.TokenMetrics['*']
                }))
            
            ),
            price: edgeql.assert_single(
                edgeql.select(edgeql.TokenPrices, (price) => ({
                    ...edgeql.TokenPrices['*']
                }))
            )
        })
        ).run(edgeDBCloudClient) as Array<{ name: string; symbol: string; address: string; metrics: any }>;

        console.log('Metrics:', sampleTokens[0].metrics); // Example usage

        console.log('\nSample of tokens with metrics:');
        sampleTokens.forEach((token) => {
            console.log(`\nToken: ${token.name} (${token.symbol})`);
            console.log(`Address: ${token.address}`);
            if (token.metrics) {
                console.log('Latest metrics:');
                console.log('- Volume Anomaly:', token.metrics.volumeAnomaly);
                console.log('- Holder Concentration:', token.metrics.holderConcentration);
                console.log('- Liquidity Score:', token.metrics.liquidityScore);
                console.log('- Is Rug Pull:', token.metrics.isRugPull);
            } else {
                console.log('No metrics found for this token');
            }
        });

        console.log('\nDatabase connection closed');
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

if (require.main === module) {
    checkData();
}*/