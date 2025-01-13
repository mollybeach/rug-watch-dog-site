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
    // Connection pool settings
    max: 20, // Maximum number of clients in the pool
    idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
    connectionTimeoutMillis: 10000, // Return an error after 10 seconds if connection could not be established
    maxUses: 7500, // Close and replace a connection after it has been used 7500 times
    
    // Query timeout settings
    statement_timeout: 10000, // Abort queries that take more than 10 seconds
    query_timeout: 10000 // Timeout for acquiring a connection from the pool
});

// Add error handling
pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err);
    console.error('Connection details:', {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME,
        user: process.env.DB_USERNAME,
        ssl: true
    });
    // Attempt to close the client if it exists
    if (client) {
        try {
            client.release(true); // Force release with error
        } catch (releaseErr) {
            console.error('Error releasing client:', releaseErr);
        }
    }
});

// Add connection monitoring
pool.on('connect', (client) => {
    console.log('New client connected to database');
});

pool.on('acquire', (client) => {
    console.log('Client checked out from pool');
});

pool.on('remove', (client) => {
    console.log('Client removed from pool');
});

// Test the connection and verify database access
async function verifyConnection() {
    let client;
    try {
        client = await pool.connect();
        console.log('Successfully connected to database');
        
        // Test query execution
        const result = await client.query('SELECT NOW()');
        console.log('Database query successful:', result.rows[0]);
        
        return true;
    } catch (err) {
        console.error('Error verifying database connection:', err);
        return false;
    } finally {
        if (client) {
            client.release();
        }
    }
}

// Verify connection on startup
verifyConnection().catch(console.error);

export default pool; 