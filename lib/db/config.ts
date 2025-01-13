import { Pool } from 'pg';

if (!process.env.DB_HOST || !process.env.DB_USERNAME || !process.env.DB_PASSWORD) {
    console.error('Missing required database environment variables');
    process.exit(1);
}

const pool = new Pool({
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME || 'rugwatchdog',
    ssl: {
        rejectUnauthorized: false
    },
    // Optimized pool settings for serverless
    max: 1, // Single connection for serverless
    min: 0,
    idleTimeoutMillis: 10000, // 10 seconds
    connectionTimeoutMillis: 3000, // 3 seconds
    maxUses: 7500,
    statement_timeout: 5000, // 5 seconds
    query_timeout: 5000, // 5 seconds
    keepAlive: true,
    keepAliveInitialDelayMillis: 0,
    allowExitOnIdle: true
});

// Add error handling
pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client:', err.message);
    if (client) {
        client.release(true);
    }
});

// Add connection monitoring
pool.on('connect', () => {
    console.log('New database connection established');
});

pool.on('acquire', () => {
    console.log('Connection acquired from pool');
});

pool.on('remove', () => {
    console.log('Connection removed from pool');
});

export default pool; 