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
    max: 1, // Reduce to 1 for serverless
    min: 0,
    idleTimeoutMillis: 120000, // 2 minutes
    connectionTimeoutMillis: 5000, // 5 seconds
    maxUses: 7500,
    statement_timeout: 8000, // 8 seconds
    query_timeout: 8000, // 8 seconds
    keepAlive: true,
    keepAliveInitialDelayMillis: 10000
});

// Add error handling
pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err);
    if (client) {
        client.release(true);
    }
});

export default pool; 