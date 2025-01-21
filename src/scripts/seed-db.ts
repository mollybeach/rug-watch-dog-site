// path: src/scripts/seed-db.ts
import { edgeDBCloudClient, localClient, edgeql } from '../index';
import { SAMPLE_TOKENS } from '../db/seeders/seeds';
import { formatTokenMetrics, formatTokenPrice, formatTokenRisk } from '../utils/formatData';

async function seedDatabase() {
    try {
        for (const token of SAMPLE_TOKENS) {
            // Check if the token metrics already exist
            const existingMetricsCloud = await edgeql.select(edgeql.TokenMetrics, (metrics) => ({
                filter: edgeql.op(metrics.tokenAddress, '=', token.metrics.tokenAddress),
                limit: 1
            })).run(edgeDBCloudClient);

            const existingMetricsLocal = await edgeql.select(edgeql.TokenMetrics, (metrics) => ({
                filter: edgeql.op(metrics.tokenAddress, '=', token.metrics.tokenAddress),
                limit: 1
            })).run(localClient);

            console.log(`Checking for existing metrics for ${token.name}:`, existingMetricsCloud);
            console.log(`Checking for existing metrics for ${token.name}:`, existingMetricsLocal);

            if (existingMetricsLocal.length > 0) {
                console.log(`Token metrics for ${token.name} already exist in Local database. Skipping insertion.`);
                continue;
            } else if (existingMetricsCloud.length > 0) {
                console.log(`Token metrics for ${token.name} already exist in Cloud database. Skipping insertion.`);
                continue;
            }

            const metricsQuery = edgeql.insert(edgeql.TokenMetrics, formatTokenMetrics(token.metrics));
            const priceQuery = edgeql.insert(edgeql.TokenPrices, formatTokenPrice(token.price));
            const riskQuery = edgeql.insert(edgeql.TokenRisk, formatTokenRisk(token.risk));
            const tokenQuery = edgeql.insert(edgeql.Token, {
                address: token.address,
                name: token.name,
                symbol: token.symbol,
                chain: token.chain,
                metrics: metricsQuery,
                price: priceQuery,
                risk: riskQuery,
                createdAt: new Date(token.createdAt),
                updatedAt: new Date(token.updatedAt)
            });

            await metricsQuery.run(edgeDBCloudClient);
            console.log(`Seeded metrics for ${token.name} in Cloud Database`);
            await priceQuery.run(edgeDBCloudClient);
            console.log(`Seeded price for ${token.name} in Cloud Database`);
            await tokenQuery.run(edgeDBCloudClient);
            console.log(`Seeded token: ${token.name} in Cloud Database`);

            await metricsQuery.run(localClient);
            console.log(`Seeded metrics for ${token.name} in Local Database`);
            await priceQuery.run(localClient);
            console.log(`Seeded price for ${token.name} in Local Database`);
            await tokenQuery.run(localClient);
            console.log(`Seeded token: ${token.name} in Local Database`);
        }
        console.log('✅ Database seeding completed');
    } catch (error) {
        console.error('❌ Error seeding database:', error);
    }
}

seedDatabase(); 