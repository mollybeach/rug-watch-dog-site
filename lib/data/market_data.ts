/**
 * @title Market Data
 * @fileoverview Crypto and NFT market data
 */

import { MarketDataPoint } from "@/types/types";

export const marketData: MarketDataPoint[] = [
    // Blue Chip NFTs
    { name: "BAYC", priceChange: 1.8, volume: 1250, type: "nft", category: "blue_chip" },
    { name: "CryptoPunks", priceChange: 1.2, volume: 950, type: "nft", category: "blue_chip" },
    { name: "Azuki", priceChange: -0.8, volume: 720, type: "nft", category: "blue_chip" },
    { name: "Doodles", priceChange: -1.1, volume: 480, type: "nft", category: "blue_chip" },
    
    // Major Altcoins
    { name: "SOL", priceChange: 2.5, volume: 8500, type: "coin", category: "major_alt" },
    { name: "MATIC", priceChange: -1.2, volume: 6200, type: "coin", category: "major_alt" },
    { name: "AVAX", priceChange: 1.7, volume: 4800, type: "coin", category: "major_alt" },
    
    // DeFi Tokens
    { name: "UNI", priceChange: -2.1, volume: 3200, type: "coin", category: "defi" },
    { name: "AAVE", priceChange: 1.5, volume: 2800, type: "coin", category: "defi" },
    
    // Gaming Tokens
    { name: "AXS", priceChange: -3.2, volume: 1500, type: "coin", category: "gaming" },
    { name: "SAND", priceChange: 2.8, volume: 1800, type: "coin", category: "gaming" },
    
    // High Risk Assets
    { name: "PepeCoin", priceChange: 15.5, volume: 950, type: "coin", category: "high_risk" },
    { name: "DOGE2", priceChange: -8.2, volume: 750, type: "coin", category: "high_risk" },
    { name: "MoonShot", priceChange: 22.4, volume: 420, type: "coin", category: "high_risk" }
]; 