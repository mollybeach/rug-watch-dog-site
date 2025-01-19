// path: src/scripts/delete/clean-db.ts
import { edgeDBCloudClient } from '../../index';
async function cleanDatabase() {
    try {
        await edgeDBCloudClient.ensureConnected();
        console.log('Database connection initialized');

        const queryRunner = edgeDBCloudClient.transaction(async tx => {
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

cleanDatabase();