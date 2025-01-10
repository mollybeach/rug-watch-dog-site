/**
 * @title Network Data
 * @fileoverview NFT ownership and wallet interaction data
 */

import { NetworkNode, NetworkLink } from "@/types/types";

export const networkData = {
    nodes: [
        // Whale Wallets
        { id: 'whale_1', group: 'whale', value: 100, holdings: 150 },
        { id: 'whale_2', group: 'whale', value: 85, holdings: 120 },
        { id: 'whale_3', group: 'whale', value: 75, holdings: 90 },
        
        // Active Traders
        { id: 'trader_1', group: 'active_trader', value: 50, holdings: 30 },
        { id: 'trader_2', group: 'active_trader', value: 45, holdings: 25 },
        { id: 'trader_3', group: 'active_trader', value: 40, holdings: 20 },
        
        // NFT Collections
        { id: 'BAYC', group: 'nft', value: 75, type: 'collection' },
        { id: 'Azuki', group: 'nft', value: 60, type: 'collection' },
        { id: 'Doodles', group: 'nft', value: 45, type: 'collection' },
        { id: 'CryptoPunks', group: 'nft', value: 80, type: 'collection' }
    ] as NetworkNode[],
    
    links: [
        // Whale Connections
        { source: 'whale_1', target: 'BAYC', value: 50 },
        { source: 'whale_1', target: 'Azuki', value: 30 },
        { source: 'whale_2', target: 'BAYC', value: 40 },
        { source: 'whale_2', target: 'CryptoPunks', value: 35 },
        { source: 'whale_3', target: 'Doodles', value: 25 },
        
        // Trader Connections
        { source: 'trader_1', target: 'Doodles', value: 20 },
        { source: 'trader_2', target: 'Azuki', value: 15 },
        { source: 'trader_3', target: 'BAYC', value: 10 }
    ] as NetworkLink[]
}; 