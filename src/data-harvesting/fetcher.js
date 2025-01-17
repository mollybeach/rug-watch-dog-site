// path: src/data-harvesting/fetcher.ts
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
const ENDPOINTS = {
    ethereum: 'https://api.etherscan.io/api',
    bsc: 'https://api.bscscan.com/api',
    polygon: 'https://api.polygonscan.com/api'
};
const API_KEYS = {
    ethereum: process.env.ETHERSCAN_API_KEY,
    bsc: process.env.BSCSCAN_API_KEY,
    polygon: process.env.POLYGONSCAN_API_KEY
};
async function fetchEtherscanData(tokenAddress, chain = 'ethereum') {
    try {
        const endpoint = ENDPOINTS[chain];
        const apiKey = API_KEYS[chain];
        if (!endpoint || !apiKey) {
            console.log(`❌ No Etherscan endpoint or API key for chain: ${chain}`);
            return null;
        }
        console.log(`🔑 Using ${chain}scan`);
        const response = await axios.get(endpoint, {
            params: {
                module: 'account',
                action: 'tokentx',
                contractaddress: tokenAddress,
                apikey: apiKey,
                sort: 'desc'
            }
        });
        if (response.data ? .status === '1' && Array.isArray(response.data.result)) {
            console.log(`✅ Found ${response.data.result.length} transactions`);
            return response.data;
        }
        console.log(`❌ Invalid response from ${chain}scan:`, response.data ? .message ||
            (response.data ? .result === null ? 'No transactions found' : response.data ? .status === '0' ? 'API request failed' : 'Unknown error'));
        console.log('🔍 Response details:', JSON.stringify(response.data, null, 2));
        return null;
    } catch (error) {
        console.error(`Error fetching ${chain}scan data:`, error instanceof Error ? error.message : 'Unknown error');
        return null;
    }
}
async function fetchDexScreenerData(tokenAddress) {
    try {
        console.log(`📊 Fetching DexScreener data for: ${tokenAddress}`);
        const response = await axios.get(`https://api.dexscreener.com/latest/dex/tokens/${tokenAddress}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching DexScreener data:', error instanceof Error ? error.message : 'Unknown error');
        return null;
    }
}

function calculateVolumeAnomaly(dexData) {
    if (!dexData ? .pairs ? .[0] ? .volume ? .h24)
        return 0.5;
    const volume = dexData.pairs[0].volume.h24;
    return volume > 1000000 ? 0.8 : 0.2;
}

function calculateHolderConcentration(etherscanData) {
    if (!etherscanData ? .result)
        return 0.5;
    const uniqueHolders = new Set(etherscanData.result.map(tx => tx.to)).size;
    return uniqueHolders < 100 ? 0.8 : 0.2;
}

function calculateLiquidityScore(dexData) {
    if (!dexData ? .pairs ? .[0] ? .liquidity ? .usd)
        return 0.5;
    const liquidity = dexData.pairs[0].liquidity.usd;
    return liquidity > 100000 ? 0.2 : 0.8;
}

function calculatePriceVolatility(dexData) {
    if (!dexData ? .pairs ? .[0] ? .priceChange ? .h24)
        return 0.5;
    const priceChange = Math.abs(dexData.pairs[0].priceChange.h24);
    return priceChange > 20 ? 0.8 : 0.2;
}

function calculateSellPressure(dexData) {
    if (!dexData ? .pairs ? .[0] ? .priceChange ? .h24)
        return 0.5;
    const priceChange = dexData.pairs[0].priceChange.h24;
    return priceChange < -10 ? 0.8 : 0.2;
}

function calculateMarketCapRisk(dexData) {
    if (!dexData ? .pairs ? .[0] ? .liquidity ? .usd)
        return 0.5;
    const liquidity = dexData.pairs[0].liquidity.usd;
    return liquidity < 50000 ? 0.8 : 0.2;
}

function calculateTimeGaps(transactions) {
    const gaps = [];
    for (let i = 1; i < transactions.length; i++) {
        gaps.push(transactions[i - 1].timestamp - transactions[i].timestamp);
    }
    return gaps;
}

function calculateVariance(values) {
    if (values.length === 0)
        return 0;
    const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
    const squareDiffs = values.map(val => Math.pow(val - mean, 2));
    return squareDiffs.reduce((sum, val) => sum + val, 0) / values.length;
}
async function detectBundlerPattern(transactions) {
    const timeGaps = calculateTimeGaps(transactions);
    const variance = calculateVariance(timeGaps);
    return {
        isFromBundler: variance < 0.1,
        similarTransactionCount: transactions.length,
        timePattern: variance
    };
}
async function calculateAccumulationMetrics(transactions) {
    const uniqueAddresses = new Set(transactions.map(tx => tx.to));
    const totalTransactions = transactions.length;
    const accumulationRate = uniqueAddresses.size / totalTransactions;
    const stealthAccumulation = totalTransactions > 100 ? 0.8 : 0.2;
    return {
        accumulationRate,
        stealthAccumulation
    };
}
export async function fetchTokenData(tokenAddress, chain = 'ethereum') {
    try {
        console.log(`\n📊 Fetching data for token: ${tokenAddress} on ${chain}`);
        const etherscanData = await fetchEtherscanData(tokenAddress, chain);
        if (!etherscanData ? .result) {
            console.log('❌ Failed to fetch Etherscan data');
            return null;
        }
        const dexData = await fetchDexScreenerData(tokenAddress);
        if (!dexData ? .pairs ? .[0]) {
            console.log('❌ Failed to fetch DexScreener data');
            return null;
        }
        const bundlerPattern = await detectBundlerPattern(etherscanData.result);
        const accMetrics = await calculateAccumulationMetrics(etherscanData.result);
        const metrics = {
            volumeAnomaly: calculateVolumeAnomaly(dexData),
            holderConcentration: calculateHolderConcentration(etherscanData),
            liquidityScore: calculateLiquidityScore(dexData),
            priceVolatility: calculatePriceVolatility(dexData),
            sellPressure: calculateSellPressure(dexData),
            marketCapRisk: calculateMarketCapRisk(dexData),
            isRugPull: false,
            bundlerActivity: bundlerPattern.isFromBundler,
            accumulationRate: accMetrics.accumulationRate,
            stealthAccumulation: accMetrics.stealthAccumulation,
            suspiciousPattern: bundlerPattern.timePattern > 0.5 ? 'true' : bundlerPattern.timePattern === 0 ? null : 'false',
            metadata: JSON.stringify({ reason: 'default reason' }),
            tokenAddress: tokenAddress,
            timestamp: new Date().toISOString(),
            holders: 0,
            totalSupply: 0,
            currentPrice: 0,
            isHoneyPot: false
        };
        const price = {
            price: dexData.pairs[0].priceUsd || 0,
            volume24h: dexData.pairs[0].volume ? .h24 || 0,
            marketCap: (dexData.pairs[0].priceUsd || 0) * 1000000, // Approximate
            liquidity: dexData.pairs[0].liquidity ? .usd || 0
        };
        return {
            address: tokenAddress,
            name: dexData.pairs[0].baseToken ? .name || 'Unknown',
            symbol: dexData.pairs[0].baseToken ? .symbol || 'UNKNOWN',
            metrics,
            price,
            createdAt: new Date(),
            updatedAt: new Date()
        };
    } catch (error) {
        console.error('Error fetching token data:', error);
        return null;
    }
}