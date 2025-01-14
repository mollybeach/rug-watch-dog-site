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
    // Increase timeouts
    connectionTimeoutMillis: 5000,
    idleTimeoutMillis: 5000,
    max: 1,
    keepAlive: true,
    statement_timeout: 10000
});

pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
});

export default pool; 