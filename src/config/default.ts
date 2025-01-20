// src/config/default.ts

import dotenv from 'dotenv';

dotenv.config();

const config = {
        server: {
            port: process.env.PORT || 3000,
            host: process.env.HOST || 'localhost'
        },
        rpc: {
            ethereum: process.env.ETHEREUM_RPC,
            bsc: process.env.BSC_RPC,
            polygon: process.env.POLYGON_RPC,
        },
        api: {
            etherscan: process.env.ETHERSCAN_API_KEY,
            dexscreener: process.env.DEXSCREENER_API_KEY
        },
        model: {
            path: '@/models/model.json',
            trainingDataPath: '@/data/training_data.json'
        },
        scan: {
            batchSize: 20,
            scanInterval: 300000,  // 5 minutes
            trainingInterval: 900000  // 15 minutes
        }
    } 
export default config;