// path: src/scripts/view-db.ts
import { viewExistingCloudData } from './view-cloud-db';
import { viewExistingLocalData } from './view-local-db';

async function viewExistingData() {
    await viewExistingCloudData();
    await viewExistingLocalData();
    console.log('✅ Cloud and Local Database Data fetched successfully');
}

viewExistingData();

