// path: src/scripts/delete-data.ts
import { deleteAllDataFromCloudTables } from './delete-cloud-data';
import { deleteAllDataFromLocalTables } from './delete-local-data';

async function deleteAllData() {
    await deleteAllDataFromLocalTables();
    await deleteAllDataFromCloudTables();
    console.log('✅ Both Cloud and Local Database Tables Contents deleted successfully');
}

deleteAllData();


