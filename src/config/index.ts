// path: src/config/index.ts
import { edgeDBCloudClient } from '../index';

interface DatabaseConfig {
    client: any; // Use the appropriate type for EdgeDB client if available
}

interface Config {
    database: DatabaseConfig;
}

export const config: Config = {
    database: {
        client: edgeDBCloudClient
    }
};

export { edgeDBCloudClient };
