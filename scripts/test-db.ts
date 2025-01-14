import { createClient } from '@vercel/postgres';
import * as dotenv from 'dotenv';

// Load environment variables from .env files
dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

// Type guard for error objects
function isErrorWithDetails(error: unknown): error is { message: string; code?: string; stack?: string } {
    return error instanceof Error || (
        typeof error === 'object' && 
        error !== null && 
        'message' in error
    );
}

async function testDatabaseConnection() {
    console.log('\n🔍 Starting Database Tests...\n');
    
    // Create client with connection string only
    const client = createClient({
        connectionString: process.env.POSTGRES_URL
    });

    try {
        console.log('Connecting to database...');
        await client.connect();
        
        console.log('Testing basic connectivity...');
        const result = await client.query('SELECT NOW() as time');
        console.log('✅ Basic connectivity successful:', result.rows[0]);

    } catch (error: unknown) {
        console.error('❌ Database error:', {
            message: isErrorWithDetails(error) ? error.message : 'Unknown error',
            code: isErrorWithDetails(error) ? error.code : undefined,
            stack: isErrorWithDetails(error) ? error.stack : undefined
        });
        process.exit(1);
    } finally {
        try {
            await client.end();
            console.log('Connection closed successfully');
        } catch (err) {
            console.error('Error closing connection:', err);
        }
    }
}

// Set max duration for function
export const maxDuration = 60; // 60 seconds max duration

testDatabaseConnection().catch(error => {
    console.error('Uncaught error:', isErrorWithDetails(error) ? error.message : 'Unknown error');
    process.exit(1);
}); 