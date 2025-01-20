// path: src/scripts/view/view-db.ts
import { viewExistingCloudData } from './view-cloud-db';
import { viewExistingLocalData } from './view-local-db';

async function viewExistingData() {
    await viewExistingLocalData();
    await viewExistingCloudData();
    console.log('✅ Cloud and Local Database Data fetched successfully');
}

viewExistingData();

