// src/data-processing/trainingData.ts

import { TokenService } from '../db/services/TokenService';
import { TokenDataType } from '../types/data';

const tokenService = new TokenService();


export async function loadExistingData(): Promise<TokenDataType[]> {
    try {
        const tokens = await tokenService.getAllTokens();
        return tokens.map(token => {
            const latestMetrics = token.metrics ?? {};
            const latestPrice = token.price ?? {};
            return {
                address: token.address,
                name: token.name,
                symbol: token.symbol,
                metrics: {
                    volumeAnomaly: latestMetrics.volumeAnomaly,
                    holderConcentration: latestMetrics.holderConcentration,
                    liquidityScore: latestMetrics.liquidityScore,
                    priceVolatility: latestMetrics.priceVolatility,
                    sellPressure: latestMetrics.sellPressure,
                    marketCapRisk: latestMetrics.marketCapRisk,
                    bundlerActivity: latestMetrics.bundlerActivity,
                    accumulationRate: latestMetrics.accumulationRate,
                    stealthAccumulation: latestMetrics.stealthAccumulation,
                    suspiciousPattern: latestMetrics.suspiciousPattern,
                    isRugPull: latestMetrics.isRugPull,
                    metadata: latestMetrics.metadata || '',
                    tokenAddress: latestMetrics.tokenAddress || '',
                    timestamp: latestMetrics.timestamp || new Date(),
                    holders: latestMetrics.holders || 0,
                    totalSupply: latestMetrics.totalSupply || 0,
                    currentPrice: latestMetrics.currentPrice || 0,
                    isHoneyPot: latestMetrics.isHoneyPot || false
                },
                price: {
                    tokenAddress: latestPrice.tokenAddress, 
                    price: latestPrice.price || 0,
                    volume24h: latestPrice.volume24h || 0,
                    marketCap: latestPrice.marketCap || 0,
                    liquidity: latestPrice.liquidity || 0,
                    timestamp: latestPrice.timestamp || new Date().toISOString()
                },
                createdAt: token.createdAt,
                updatedAt: token.updatedAt
            };
        });
    } catch (error) {
        console.error('Error loading existing data:', error);
        return [];
    }
}

export async function collectTrainingData(numTokens: number = 100): Promise<TokenDataType[]> {
     console.log('hiiii collecting training data');
    return loadExistingData();
} 