import { edgeDBCloudClient } from '../db/connection/connection';

async function queryCloudDB() {
    try {
        const query = `
            SELECT TokenMetrics {
                tokenAddress,
                volumeAnomaly,
                holderConcentration,
                liquidityScore,
                priceVolatility,
                sellPressure,
                marketCapRisk,
                bundlerActivity,
                accumulationRate,
                stealthAccumulation,
                suspiciousPattern,
                isRugPull,
                timestamp,
                holders,
                totalSupply,
                currentPrice,
                isHoneyPot
            }
        `;

        const result = await edgeDBCloudClient.query(query);
        console.log('Token Metrics:', result);
    } catch (error) {
        console.error('Error querying cloud database:', error);
    }
}

queryCloudDB();