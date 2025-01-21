import fs from 'fs';
import path from 'path';
import {  fetchTokenData } from '../data-harvesting/fetcher';
import { TokenDataType } from '../../types/data';
import dotenv from 'dotenv';

dotenv.config();

// Load addresses from rugpull_addresses.json
const addressesPath = path.join(__dirname, '../../data/rugpull_addresses.json');
const savedDataPath = path.join(__dirname, '../../data/rugpull_data.json');
//const addressesPath = path.join(__dirname, '../../data/safe_addresses.json');
//const savedDataPath = path.join(__dirname, '../../data/safe_data.json');

interface RPC_URLS {
    [key: string]: string | undefined
}
const RPC_URLS: RPC_URLS = {
    "ethereum": process.env.ETHEREUM_RPC,
    "bsc": process.env.BSC_RPC,
    "polygon": process.env.POLYGON_RPC
};


// Delay function to pause execution
function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function getDataFromAddresses() {
    try {
        const addressesData = fs.readFileSync(addressesPath, 'utf-8');
        const { savedAddresses }: { savedAddresses: string[] } = JSON.parse(addressesData);

        const fetchedData: TokenDataType[] = [];

        for (const address of savedAddresses) {
            console.log(`Fetching data for address: ${address}`);
        
            // Add delay to respect rate limits
            await delay(1000); // Delay for 1000ms (1 second) before making the request

            const tokenData = await fetchTokenData(address);
            if (tokenData) {
                fetchedData.push(tokenData);
                console.log(`✅ Successfully fetched data for ${address}`);
            } else {
                console.log(`❌ Failed to fetch data for ${address}`);
            }
        }

        // Save fetched data to safe_data.json
        fs.writeFileSync(savedDataPath, JSON.stringify(fetchedData, null, 2));
        console.log("Fetched Data", fetchedData)
        console.log(`✅ Data saved to ${savedDataPath}`);
    } catch (error) {
        console.error('Error processing addresses:', error);
    }
}

getDataFromAddresses().catch(error => {
    console.error('❌ Fatal error:', error);
    process.exit(1);
});
