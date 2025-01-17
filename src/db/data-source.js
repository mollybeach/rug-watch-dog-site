import { createClient } from 'edgedb';
import 'dotenv/config';
const edgedbClient = createClient({
    dsn: process.env.EDGE_CONNECTION_STRING || 'edgedb://edgedb@rug-watch-dog-db--mollybeach.c-96.i.aws.edgedb.cloud:5656/main?password=Honeysuckle1014!'
});
export { edgedbClient };
