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
    // Add timeouts
    statement_timeout: 3000, // 3 seconds
    query_timeout: 4000,     // 4 seconds
    connectionTimeoutMillis: 5000, // 5 seconds
    idle_in_transaction_session_timeout: 5000 // 5 seconds
});

// Add connection error handling
pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
});

export default pool; 