import { Pool } from 'pg';

const pool = new Pool({
    user: process.env.DB_USERNAME || 'mollybeach',
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST || 'rugwatchdog-db.cbsgow8mwtmh.us-east-2.rds.amazonaws.com',
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME || 'rugwatchdog',
    ssl: {
        rejectUnauthorized: false
    }
});

// Add error handling
pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
});

// Test the connection
pool.connect()
    .then(client => {
        console.log('Successfully connected to database');
        client.release();
    })
    .catch(err => {
        console.error('Error connecting to database:', err);
    });

export default pool; 