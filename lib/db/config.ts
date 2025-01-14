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
    // Shorter timeouts for Vercel
    connectionTimeoutMillis: 5000,
    idleTimeoutMillis: 5000,
    max: 5 // Reduce max connections
});

pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
});

export default pool; 