// path: src/scripts/clean-db.ts
import { edgedbClient } from '../db/connection/connection';
async function cleanDatabase() {
    try {
        await edgedbClient.ensureConnected();
        console.log('Database connection initialized');

        const queryRunner = edgedbClient.transaction(async tx => {
            await tx.query('DELETE Token');
            await tx.query('DELETE TokenMetrics');
            await tx.query('DELETE TokenPrice');
        });

        try {
            await queryRunner;
            console.log('✅ Database cleaned successfully');
        } catch (error) {
            console.error('Error cleaning database:', error);
            throw error;
        }
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}