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
    // Add connection timeouts
    connectionTimeoutMillis: 2000,
    idleTimeoutMillis: 2000,
    max: 1, // Reduce max connections
    keepAlive: true
});

pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
});

export default pool; 