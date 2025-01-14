import { Pool, PoolClient } from 'pg';

// Create a new pool for each request
function createPool() {
    return new Pool({
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT || '5432'),
        database: process.env.DB_NAME,
        ssl: {
            rejectUnauthorized: false
        },
        // Shorter timeouts for serverless
        connectionTimeoutMillis: 8000,
        idleTimeoutMillis: 8000,
        max: 1
    });
}

// Get a client with retries
async function getClient(retries = 3): Promise<PoolClient> {
    const pool = createPool();
    
    for (let i = 0; i < retries; i++) {
        try {
            const client = await pool.connect();
            return client;
        } catch (err) {
            console.error(`Connection attempt ${i + 1} failed:`, err);
            if (i === retries - 1) throw err;
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
    throw new Error('Failed to get client after retries');
}

export { createPool, getClient }; 