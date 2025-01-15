import pool from '@/lib/db/config';
import { readFileSync } from 'fs';
import { join } from 'path';

async function initializeDatabase() {
    try {
        // Read schema file
        const schema = readFileSync(join(__dirname, 'schema.sql'), 'utf8');
        
        // Execute schema
        await pool.query(schema);
        console.log('Database initialized successfully');
    } catch (error) {
        console.error('Error initializing database:', error);
        throw error;
    } finally {
        await pool.end();
    }
}

initializeDatabase().catch(console.error);

export default initializeDatabase; 