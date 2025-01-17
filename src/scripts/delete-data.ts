import { edgedbClient } from '../db/connection/connection';
import edgeql from '../../dbschema/edgeql-js';

async function deleteAllTokens() {
  try {
    // Define the deletion query to remove all tokens
    const deleteQuery = edgeql.delete(edgeql.Token);

    // Execute the query
    await deleteQuery.run(edgedbClient);

    console.log('✅ All tokens deleted successfully');
  } catch (error) {
    console.error('❌ Error deleting tokens:', error);
  }
}

// Call the function to delete all tokens
deleteAllTokens();
