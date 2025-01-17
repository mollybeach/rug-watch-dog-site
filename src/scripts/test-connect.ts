import { edgedbClient } from '../db/connection/connection';

async function testConnection() {
  try {
    const result = await edgedbClient.querySingle('SELECT count(Token)');
    console.log('Number of tokens in remote database:', result);
  } catch (error) {
    console.error('Error connecting to remote database:', error);
  }
}

testConnection();
