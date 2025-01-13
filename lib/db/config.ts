import { Pool } from 'pg';

const pool = new Pool({
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME,
    ssl: {
        rejectUnauthorized: false
    }
});

// Test the connection
pool.connect((err, client, release) => {
    if (err) {
        console.error('Error acquiring client', err.stack);
        return;
    }
    if (!client) {
        console.error('Client is undefined');
        release();
        return;
    }
    client.query('SELECT NOW()', (err, result) => {
        release();
        if (err) {
            console.error('Error executing query', err.stack);
            return;
        }
        console.log('Database connected successfully');
    });
});

// Add error handling
pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

export default pool; 