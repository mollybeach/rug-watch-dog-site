// path: src/scripts/seed-db.ts
import { edgeDBCloudClient, localClient, edgeql } from '../index';
import { SAMPLE_TOKENS } from '../db/seeders/seeds';

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

            const metricsQuery = edgeql.insert(edgeql.TokenMetrics, {
                metadata: JSON.stringify(token.metrics.metadata),
                tokenAddress: token.metrics.tokenAddress,
                volumeAnomaly: token.metrics.volumeAnomaly.toString(),
                holderConcentration: token.metrics.holderConcentration.toString(),
                liquidityScore: token.metrics.liquidityScore.toString(),
                priceVolatility: token.metrics.priceVolatility.toString(),
                sellPressure: token.metrics.sellPressure.toString(),
                marketCapRisk: token.metrics.marketCapRisk.toString(),
                bundlerActivity: token.metrics.bundlerActivity,
                accumulationRate: token.metrics.accumulationRate.toString(),
                stealthAccumulation: token.metrics.stealthAccumulation.toString(),
                suspiciousPattern: token.metrics.suspiciousPattern ?? '',
                isRugPull: token.metrics.isRugPull,
                timestamp: new Date(token.metrics.timestamp),
                holders: token.metrics.holders.toString(),
                totalSupply: token.metrics.totalSupply.toString(),
                currentPrice: token.metrics.currentPrice.toString(),
                isHoneyPot: token.metrics.isHoneyPot
            });

            const priceQuery = edgeql.insert(edgeql.TokenPrices, {
                tokenAddress: token.price.tokenAddress,
                price: token.price.price.toString(),
                volume24h: token.price.volume24h.toString(),
                marketCap: token.price.marketCap.toString(),
                liquidity: token.price.liquidity.toString(),
                timestamp: new Date(token.price.timestamp)
            });

            const tokenQuery = edgeql.insert(edgeql.Token, {
                address: token.address,
                name: token.name,
                symbol: token.symbol,
                metrics: metricsQuery,
                price: priceQuery,
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