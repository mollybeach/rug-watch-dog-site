import { Pool, PoolClient } from 'pg';

const pool = new Pool({
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME,
    ssl: {
        rejectUnauthorized: false
    },
    connectionTimeoutMillis: 30000,
    idleTimeoutMillis: 30000,
    max: 1,
    keepAlive: true,
    statement_timeout: 30000
});

let client: PoolClient | null = null;

// Initialize client function
async function initClient() {
    try {
        client = await pool.connect();
    } catch (err) {
        console.error('Failed to create initial connection:', err);
    }
}

// Initialize the client
initClient();

export { pool, client, initClient }; 