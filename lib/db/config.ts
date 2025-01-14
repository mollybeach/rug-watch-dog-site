import { sql } from '@vercel/postgres';
import { QueryResult } from 'pg';

// Type for our database client
type DbClient = {
    query<T = any>(query: string, values?: any[]): Promise<QueryResult<T>>;
};

// Create a wrapped client
async function getClient(): Promise<DbClient> {
    return {
        query: async <T>(queryText: string, values?: any[]) => {
            try {
                if (values) {
                    return await sql.query<T>(queryText, values);
                }
                return await sql.query<T>(queryText);
            } catch (err) {
                console.error('Database query error:', err);
                throw err;
            }
        }
    };
}

export { getClient }; 