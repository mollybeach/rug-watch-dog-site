import { sql } from '@vercel/postgres';
import { QueryResult } from '@vercel/postgres';

// Verify database URL is set
if (!process.env.POSTGRES_URL) {
    throw new Error('Database URL is not set in environment variables');
}

// Type for our database client
type DbClient = {
    query<T extends Record<string, any>>(
        query: string, 
        values?: any[]
    ): Promise<QueryResult<T>>;
};

// AWS RDS specific error codes
const AWS_RDS_ERROR_CODES = {
    INVALID_PASSWORD: '28P01',
    CONNECTION_TIMEOUT: '57P01',
    TOO_MANY_CONNECTIONS: '53300',
    INVALID_CATALOG: '3D000',
    RELATION_NOT_FOUND: '42P01'
} as const;

async function getClient(): Promise<DbClient> {
    try {
        // Test connection with timeout
        const connectionTestPromise = sql`SELECT 1`;
        const timeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Connection timeout')), 5000)
        );

        await Promise.race([connectionTestPromise, timeoutPromise]);
        console.log('AWS RDS connection successful', {
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            timestamp: new Date().toISOString()
        });

        return {
            query: async <T extends Record<string, any>>(
                queryText: string,
                values?: any[]
            ): Promise<QueryResult<T>> => {
                try {
                    console.log('Executing RDS query:', {
                        text: queryText.replace(/\s+/g, ' ').trim(),
                        paramCount: values?.length || 0,
                        timestamp: new Date().toISOString()
                    });

                    const result = await sql.query(queryText, values);
                    console.log('Query completed successfully', {
                        rowCount: result.rowCount,
                        executionTime: Date.now() - performance.now()
                    });

                    return result as QueryResult<T>;
                } catch (err: any) {
                    console.error('AWS RDS query error:', {
                        error: {
                            code: err.code,
                            message: err.message,
                            detail: err.detail,
                            hint: err.hint,
                            position: err.position
                        },
                        query: queryText.replace(/\s+/g, ' ').trim(),
                        values: values?.map(v => 
                            typeof v === 'string' && v.length > 100 
                                ? v.substring(0, 100) + '...' 
                                : v
                        ),
                        timestamp: new Date().toISOString()
                    });

                    // Enhance error message based on AWS RDS error codes
                    switch (err.code) {
                        case AWS_RDS_ERROR_CODES.INVALID_PASSWORD:
                            err.message = 'Invalid database credentials';
                            break;
                        case AWS_RDS_ERROR_CODES.CONNECTION_TIMEOUT:
                            err.message = 'Database connection timeout - check VPC and security group settings';
                            break;
                        case AWS_RDS_ERROR_CODES.TOO_MANY_CONNECTIONS:
                            err.message = 'Maximum connection pool size exceeded';
                            break;
                        case AWS_RDS_ERROR_CODES.RELATION_NOT_FOUND:
                            err.message = `Table not found: ${err.detail || 'unknown table'}`;
                            break;
                    }
                    throw err;
                }
            }
        };
    } catch (err: any) {
        // Enhanced error logging
        console.error('AWS RDS connection error:', {
            error: {
                name: err.name,
                message: err.message,
                code: err.code
            },
            config: {
                host: process.env.DB_HOST?.split('.')[0] + '.***.rds.amazonaws.com',
                database: process.env.DB_NAME,
                ssl: true
            },
            timestamp: new Date().toISOString()
        });

        throw new Error(
            `Failed to connect to AWS RDS: ${
                err.code === AWS_RDS_ERROR_CODES.INVALID_PASSWORD 
                    ? 'Invalid credentials'
                    : err.message
            }`
        );
    }
}

export { getClient }; 