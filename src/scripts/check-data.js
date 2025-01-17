import { edgedbClient } from '../db/data-source';
import edgeql from '../../dbschema/edgeql-js';
async function checkData() {
    try {
        console.log('Database connection initialized');
        // Count total tokens
        const tokenCount = await edgeql.count(edgeql.Token).run(edgedbClient);
        console.log(`Total tokens in database: ${tokenCount}`);
        // Count total metrics
        const metricsCount = await edgeql.count(edgeql.TokenMetrics).run(edgedbClient);
        console.log(`Total token metrics records: ${metricsCount}`);
        // Get a sample of tokens with their metrics
        const sampleTokens = await edgeql.select(edgeql.Token, (token) => ({
            ...edgeql.Token['*'],
            metrics: edgeql.select(edgeql.TokenMetrics, (metrics) => ({
                ...edgeql.TokenMetrics['*']
            })),
            limit: 5
        })).run(edgedbClient);
        console.log('\nSample of tokens with metrics:');
        sampleTokens.forEach((token) => {
            console.log(`\nToken: ${token.name} (${token.symbol})`);
            console.log(`Address: ${token.address}`);
            if (token.metrics && token.metrics.length > 0) {
                const latestMetrics = token.metrics[0];
                console.log('Latest metrics:');
                console.log('- Volume Anomaly:', latestMetrics.volumeAnomaly);
                console.log('- Holder Concentration:', latestMetrics.holderConcentration);
                console.log('- Liquidity Score:', latestMetrics.liquidityScore);
                console.log('- Is Rug Pull:', latestMetrics.isRugPull);
            }
            else {
                console.log('No metrics found for this token');
            }
        });
        console.log('\nDatabase connection closed');
    }
    catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}
if (require.main === module) {
    checkData();
}
