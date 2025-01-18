// path: src/scripts/delete-local-data.ts
import { createClient } from 'edgedb';
import edgeql from '../../dbschema/edgeql-js';

const localClient = createClient();

async function deleteAllDataFromLocalTables() {
    try {
        // Define the deletion query to remove all tokens
        const deleteTokenQuery = edgeql.delete(edgeql.Token);
        const deleteMetricsQuery = edgeql.delete(edgeql.TokenMetrics);
        const deletePricesQuery = edgeql.delete(edgeql.TokenPrices);
        // Execute the query
        await deleteTokenQuery.run(localClient);
        console.log('✅ Local Database: Token table contents deleted successfully');
        await deleteMetricsQuery.run(localClient);
        console.log('✅ Local Database: TokenMetrics table contents deleted successfully');
        await deletePricesQuery.run(localClient);
        console.log('✅ Local Database: TokenPrices table contents deleted successfully');  
        console.log('✅ Local Database: All Table Contents deleted successfully');
    } catch (error) {
        console.error('❌ Local Database: Error deleting contents from Tables', error);
    }
}

// Call the function to delete all tokens
deleteAllDataFromLocalTables();

export { deleteAllDataFromLocalTables };