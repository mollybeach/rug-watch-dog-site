import { Pool, PoolClient } from '@vercel/postgres';

// Create a new pool for each request
function createPool() {
    return new Pool({
        connectionString: process.env.POSTGRES_URL,
        ssl: {
            rejectUnauthorized: false
        }
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