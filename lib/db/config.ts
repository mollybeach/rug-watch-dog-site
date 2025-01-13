import { Pool } from 'pg';

if (!process.env.DB_HOST || !process.env.DB_USERNAME || !process.env.DB_PASSWORD) {
    console.error('Missing required database environment variables');
    console.error('Required variables:', {
        DB_HOST: process.env.DB_HOST ? '✓' : '✗',
        DB_USERNAME: process.env.DB_USERNAME ? '✓' : '✗',
        DB_PASSWORD: process.env.DB_PASSWORD ? '✓' : '✗',
        DB_PORT: process.env.DB_PORT ? '✓' : '✗',
        DB_NAME: process.env.DB_NAME ? '✓' : '✗'
    });
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
    connectionTimeoutMillis: 10000,
    idleTimeoutMillis: 30000,
    max: 20
});

// Add error handling
pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    console.error('Connection details:', {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME,
        user: process.env.DB_USERNAME,
        ssl: true
    });
});

// Test the connection
pool.connect()
    .then(client => {
        console.log('Successfully connected to database');
        console.log('Connection details:', {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            database: process.env.DB_NAME,
            user: process.env.DB_USERNAME,
            ssl: true
        });
        client.release();
    })
    .catch(err => {
        console.error('Error connecting to database:', err);
        console.error('Connection details:', {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            database: process.env.DB_NAME,
            user: process.env.DB_USERNAME,
            ssl: true
        });
    });

export default pool; 