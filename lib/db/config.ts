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
    // Optimize connection settings
    connectionTimeoutMillis: 10000,
    idleTimeoutMillis: 10000,
    max: 2,
    keepAlive: true
});

// Add connection error handling
pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
});

// Add connection management
pool.on('connect', () => {
    console.log('New client connected to database');
});

export default pool; 