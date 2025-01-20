import { edgeDBCloudClient } from '../index';
import { SELECT_TOKEN_METRICS } from '../db/queries/queries';
async function queryCloudDB() {
    try {
        const query = SELECT_TOKEN_METRICS;
        const result = await edgeDBCloudClient.query(query);
        console.log('Token Metrics:', result);
    } catch (error) {
        console.error('Error querying cloud database:', error);
    }
}

queryCloudDB();