import { createClient } from 'edgedb';

const edgedbClient = createClient({
    dsn: process.env.EDGE_CONNECTION_STRING
});

export async function runQuery(query: string) {
    const result = await edgedbClient.query(query);
    return result;
}
// Test connection
export async function testConnection() {
    try {
        await edgedbClient.ensureConnected();
        console.log('✅ EdgeDB connection successful');
    } catch (error) {
        console.error('❌ EdgeDB connection failed:', error);
    }
}

export { edgedbClient }; 