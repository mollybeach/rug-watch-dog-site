import { createClient } from 'edgedb';

// Define the expected result type
interface RiskMetrics {
    tokenAddress: string;
    volumeAnomaly: number;
    holderConcentration: number;
    liquidityScore: number;
    priceVolatility: number;
    sellPressure: number;
    marketCapRisk: number;
    isRugPull: boolean;
    timestamp: Date;
}

// Create an EdgeDB client
const client = createClient();

async function getRiskMetrics() {
    // Execute the query and cast the result to the expected type
    const result: RiskMetrics[] = await client.query(`
        SELECT TokenMetrics {
            tokenAddress,
            volumeAnomaly,
            holderConcentration,
            liquidityScore,
            priceVolatility,
            sellPressure,
            marketCapRisk,
            isRugPull,
            timestamp
        };
    `);

    // Now you can access the properties safely
    result.forEach((metric) => {
        console.log(metric.tokenAddress, metric.volumeAnomaly);
    });
}

getRiskMetrics().catch(console.error);

// Function to get the EdgeDB client
export function getClient() {
    return client;
}

export default client;
