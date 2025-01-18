// path: src/scripts/init-db.ts
import { edgeDBCloudClient } from '../db/connection/connection';

async function main() {
    try {
        // Ensure EdgeDB client is ready
        await edgeDBCloudClient.ensureConnected();
        console.log('✅ EdgeDB client connected successfully');

        // Add any necessary EdgeDB initialization logic here

        process.exit(0);
    } catch (error) {
        console.error('❌ Error initializing EdgeDB:', error);
        process.exit(1);
    }
}

main(); 