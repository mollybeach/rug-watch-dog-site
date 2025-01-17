// path: src/config/index.ts
import { edgedbClient } from '../db/connection/connection';

interface DatabaseConfig {
    client: any; // Use the appropriate type for EdgeDB client if available
}

interface Config {
    database: DatabaseConfig;
}

export const config: Config = {
    database: {
        client: edgedbClient
    }
};

export { edgedbClient };
