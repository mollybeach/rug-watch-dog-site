import edgeDBCloudClient from '@/lib/db/config';
import { fetchTokenData } from '../data-harvesting/fetcher';
import { TokenDataType } from '@/types/data';

async function updateDatabase() {
    try {
        console.log('🔄 Starting database update process...');

        // Fetch all tokens from the database
        const tokens: TokenDataType[] = await edgeDBCloudClient.query('SELECT Token { address }');

        for (const token of tokens) {
            console.log(`🔍 Updating token: ${token.address}`);

            // Fetch updated data for the token
            const updatedData = await fetchTokenData(token.address);

            if (updatedData) {
                // Update the token in the database
                await edgeDBCloudClient.execute(`
                    UPDATE Token
                    FILTER .address = <str>$0
                    SET {
                        name := <str>$1,
                        symbol := <str>$2,
                        metrics := <json>$3,
                        price := <json>$4,
                        risk := <json>$5,
                        updatedAt := <datetime>$6
                    }
                `, [
                    updatedData.address,
                    updatedData.name,
                    updatedData.symbol,
                    JSON.stringify(updatedData.metrics),
                    JSON.stringify(updatedData.price),
                    JSON.stringify(updatedData.risk),
                    new Date().toISOString()
                ]);

                console.log(`✅ Token ${token.address} updated successfully.`);
            } else {
                console.log(`❌ Failed to fetch data for token: ${token.address}`);
            }
        }

        console.log('✅ Database update process completed.');
    } catch (error) {
        console.error('Error updating database:', error);
    }
}

updateDatabase();
