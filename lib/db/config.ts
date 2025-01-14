import { Pool, PoolClient, QueryResult } from 'pg';

// AWS RDS Configuration using your existing env variables
const pool = new Pool({
    user: process.env.DB_USERNAME,     
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,         
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME,    
    ssl: {
        rejectUnauthorized: false
    },
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000,
});

// Type for our database client
type DbClient = {
    query<T extends Record<string, any>>(query: string, values?: any[]): Promise<QueryResult<T>>;
};

// Create a wrapped client with connection pooling
async function getClient(): Promise<DbClient> {
    let client: PoolClient | null = null;
    try {
        client = await pool.connect();
        return {
            query: async <T extends Record<string, any>>(queryText: string, values?: any[]): Promise<QueryResult<T>> => {
                try {
                    return await client!.query(queryText, values);
                } catch (err) {
                    console.error('Query error:', {
                        error: err,
                        query: queryText,
                        values
                    });
                    throw new Error('Database query failed');
                }
            }
        };
    } catch (err) {
        console.error('Connection error:', err);
        throw new Error('Database connection failed');
    } finally {
        if (client) {
            client.release();
        }
    }
}

export { getClient }; 