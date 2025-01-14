import { Pool, PoolClient } from 'pg';

// Validate required environment variables
const requiredEnvVars = ['DB_HOST', 'DB_USERNAME', 'DB_PASSWORD', 'DB_NAME'];
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
    console.error('Missing required database environment variables:', missingVars.join(', '));
    process.exit(1);
}

interface ExtendedPoolClient extends PoolClient {
    processID?: number;
    connectionParameters?: any;
    active?: boolean;
}

interface PostgresError extends Error {
    code?: string;
    detail?: string;
}

const poolConfig = {
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME,
    ssl: {
        rejectUnauthorized: false
    },
    // Connection pool settings
    max: 20,                 // Maximum number of clients in the pool
    idleTimeoutMillis: 30000,// How long a client is allowed to remain idle before being closed
    connectionTimeoutMillis: 10000, // How long to wait for a connection
    maxUses: 7500,          // Number of times a client can be used before being recycled
    // Query settings
    statement_timeout: 30000,// 30 seconds
    query_timeout: 30000,    // 30 seconds
};

console.log('Initializing database pool with config:', {
    ...poolConfig,
    password: '[REDACTED]' // Don't log the password
});

const pool = new Pool(poolConfig);

// Log pool events for debugging
pool.on('connect', (client: ExtendedPoolClient) => {
    console.log('Database pool client connected', {
        processID: client.processID,
        connectionParameters: client.connectionParameters
    });
});

pool.on('error', (err: PostgresError, client: ExtendedPoolClient) => {
    console.error('Unexpected database pool error:', {
        error: {
            name: err.name,
            message: err.message,
            code: err.code,
            detail: err.detail
        },
        client: {
            processID: client?.processID,
            active: client?.active,
            connectionParameters: client?.connectionParameters
        }
    });
});

pool.on('acquire', (client: ExtendedPoolClient) => {
    console.log('Client acquired from pool', {
        processID: client.processID,
        active: client.active
    });
});

pool.on('remove', (client: ExtendedPoolClient) => {
    console.log('Client removed from pool', {
        processID: client.processID
    });
});

// Test the connection immediately
pool.query('SELECT NOW()')
    .then(result => {
        console.log('Initial database connection test successful:', result.rows[0]);
    })
    .catch((error: PostgresError) => {
        console.error('Initial database connection test failed:', {
            name: error.name,
            message: error.message,
            code: error.code,
            detail: error.detail
        });
    });

export default pool; 