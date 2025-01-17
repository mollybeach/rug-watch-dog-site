// path: src/config/index.ts
import { createClient } from 'edgedb';
const edgedbClient = createClient({
    dsn: process.env.EDGE_CONNECTION_STRING || 'edgedb://edgedb@rug-watch-dog-db--mollybeach.c-96.i.aws.edgedb.cloud:5656/main?password=Honeysuckle1014!'
});
export const config = {
    database: {
        client: edgedbClient
    }
};
export { edgedbClient };
