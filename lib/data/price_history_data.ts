/**
 * @title Price History Data
 * @fileoverview Historical price data for NFTs and tokens
 */

import { PriceHistoryData } from "@/types/types";

export const generatePriceHistory = (): PriceHistoryData => {
    const now = new Date();
    const dates = Array.from({length: 30}, (_, i) => {
        const date = new Date(now);
        date.setDate(date.getDate() - (29 - i));
        return date.toISOString();
    });

    return {
        dates,
        collections: {
            BAYC: dates.map((_, i) => 50 + Math.sin(i/3) * 10 + Math.random() * 5),
            Azuki: dates.map((_, i) => 30 + Math.cos(i/4) * 8 + Math.random() * 4),
            CryptoPunks: dates.map((_, i) => 80 + Math.sin(i/2) * 15 + Math.random() * 6),
            Doodles: dates.map((_, i) => 25 + Math.cos(i/3) * 5 + Math.random() * 3),
            SOL: dates.map((_, i) => 100 + Math.sin(i/2) * 20 + Math.random() * 8),
            MATIC: dates.map((_, i) => 45 + Math.cos(i/3) * 12 + Math.random() * 5)
        }
    };
};

export const priceHistoryData = generatePriceHistory(); 