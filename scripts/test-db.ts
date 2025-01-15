import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    user: process.env.DB_USERNAME,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || '5432'),
    ssl: {
        rejectUnauthorized: true
    }
});

async function testConnection() {
    try {
        const result = await pool.query('SELECT NOW()');
        console.log('Database connection successful:', result.rows[0]);
    } catch (error) {
        console.error('Database connection failed:', error);
    } finally {
        await pool.end();
    }
}

testConnection(); 