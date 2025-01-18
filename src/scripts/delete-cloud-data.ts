// path: src/scripts/delete-cloud-data.ts
import { edgedbClient } from '../db/connection/connection';
import edgeql from '../../dbschema/edgeql-js';

async function deleteAllDataFromCloudTables() {
    try {
         // Define the deletion query to remove all tokens
        const deleteTokenQuery = edgeql.delete(edgeql.Token);
        const deleteMetricsQuery = edgeql.delete(edgeql.TokenMetrics);
        const deletePricesQuery = edgeql.delete(edgeql.TokenPrices);
        // Execute the query
        await deleteTokenQuery.run(edgedbClient);
        console.log('✅ Cloud Database: Token table contents deleted successfully');
        await deleteMetricsQuery.run(edgedbClient);
        console.log('✅ Cloud Database: TokenMetrics table contents deleted successfully');
        await deletePricesQuery.run(edgedbClient);
        console.log('✅ Cloud Database: TokenPrices table contents deleted successfully');
            console.log('✅ Cloud Database: All Table Contents deleted successfully');
        } catch (error) {
        console.error('❌ Cloud Database: Error deleting contents from Tables', error);
    }}

// Call the function to delete all tokens
deleteAllDataFromCloudTables();

export { deleteAllDataFromCloudTables };