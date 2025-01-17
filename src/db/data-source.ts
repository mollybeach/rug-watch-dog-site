import { createClient } from 'edgedb';
import 'dotenv/config';

const edgedbClient = createClient({
    dsn: process.env.EDGE_CONNECTION_STRING
});

export { edgedbClient }; 