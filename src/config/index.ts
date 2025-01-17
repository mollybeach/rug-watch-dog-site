// path: src/config/index.ts
import { createClient } from 'edgedb';

interface DatabaseConfig {
    client: any; // Use the appropriate type for EdgeDB client if available
}

interface Config {
    database: DatabaseConfig;
}

const edgedbClient = createClient({
    dsn: process.env.EDGE_CONNECTION_STRING || 'edgedb://edgedb@rug-watch-dog-db--mollybeach.c-96.i.aws.edgedb.cloud:5656/main?password=Honeysuckle1014!'
});

export const config: Config = {
    database: {
        client: edgedbClient
    }
};

export { edgedbClient };
