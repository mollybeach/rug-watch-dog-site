import { createClient } from 'edgedb';
const edgedbClient = createClient({
    dsn: process.env.EDGE_CONNECTION_STRING
});
const config = {
    development: {
        client: edgedbClient
    },
    production: {
        client: edgedbClient
    }
};
export default config;
export { edgedbClient };
