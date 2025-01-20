import { createClient } from 'edgedb';
import { SELECT_TOKEN_METRICS } from '@/lib/db/queries';
import dotenv from 'dotenv';

dotenv.config();

const edgeDBCloudClient = createClient({
    instanceName: 'mollybeach/rug-watch-dog-db',
    secretKey: process.env.EDGEDB_SECRET_KEY
});

const localClient = createClient();

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
async function getRiskMetrics() {
    
    const result: RiskMetrics[] = await edgeDBCloudClient.query(SELECT_TOKEN_METRICS);

    // Now you can access the properties safely
    result.forEach((metric) => {
        console.log(metric.tokenAddress, metric.volumeAnomaly);
    });
}

getRiskMetrics().catch(console.error);

// Function to get the EdgeDB client
export function getClient() {
    return edgeDBCloudClient;
}

export default edgeDBCloudClient;