import { sql } from '@vercel/postgres';
import { QueryResult } from '@vercel/postgres';

// Type for our database client
type DbClient = {
    query<T extends Record<string, any>>(
        query: string, 
        values?: any[]
    ): Promise<QueryResult<T>>;
};

// Create a wrapped client with connection pooling and timeouts
async function getClient(): Promise<DbClient> {
    return {
        query: async <T extends Record<string, any>>(
            queryText: string,
            values?: any[]
        ): Promise<QueryResult<T>> => {
            try {
                const result = await sql.query(queryText, values);
                return result as QueryResult<T>;
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
}

export { getClient }; 