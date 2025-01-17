import { createClient } from 'edgedb';
const edgedbClient = createClient({
    dsn: process.env.EDGE_CONNECTION_STRING || 'edgedb://edgedb@rug-watch-dog-db--mollybeach.c-96.i.aws.edgedb.cloud:5656/main?password=Honeysuckle1014!'
});
export async function runQuery(query) {
    const result = await edgedbClient.query(query);
    return result;
}
// Test connection
export async function testConnection() {
    try {
        await edgedbClient.ensureConnected();
        console.log('✅ EdgeDB connection successful');
    }
    catch (error) {
        console.error('❌ EdgeDB connection failed:', error);
    }
}
export { edgedbClient };
