import { createClient } from '@vercel/postgres';
import { QueryResult } from '@vercel/postgres';

// Type for our database client
type DbClient = {
    query<T extends Record<string, any>>(
        query: string, 
        values?: any[]
    ): Promise<QueryResult<T>>;
};

async function getClient(): Promise<DbClient> {
    try {
        console.log('Initializing database connection...');
        
        const client = createClient({
            connectionTimeoutMillis: 10000,
            ssl: {
                rejectUnauthorized: true
            }
        });

        // Test connection with longer timeout
        const connectionTestPromise = client.query('SELECT 1');
        const timeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Connection timeout after 10s')), 10000)
        );

        console.log('Testing connection...');
        await Promise.race([connectionTestPromise, timeoutPromise]);
        console.log('Database connection successful');

        return {
            query: async <T extends Record<string, any>>(
                queryText: string,
                values?: any[]
            ): Promise<QueryResult<T>> => {
                try {
                    console.log('Executing query:', queryText.slice(0, 100));
                    const result = await client.query(queryText, values);
                    console.log('Query successful, rows:', result.rowCount);
                    return result;
                } catch (err: any) {
                    console.error('Query error:', {
                        message: err.message,
                        code: err.code,
                        query: queryText.slice(0, 100)
                    });
                    throw err;
                }
            }
        };
    } catch (err: any) {
        console.error('Connection error:', {
            message: err.message,
            code: err.code,
            type: err.constructor.name
        });
        throw err;
    }
}

export { getClient }; 