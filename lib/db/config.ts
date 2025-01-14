import { Pool } from 'pg';

const pool = new Pool({
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME,
    ssl: {
        rejectUnauthorized: false
    },
    // Increase timeouts significantly
    connectionTimeoutMillis: 30000, // 30 seconds
    idleTimeoutMillis: 30000,
    max: 1, // Single connection
    keepAlive: true,
    statement_timeout: 30000
});

// Create a single client
let client;
try {
    client = await pool.connect();
} catch (err) {
    console.error('Failed to create initial connection:', err);
}

export { pool, client }; 