// path: src/data-harvesting/fetcher.ts
import axios from 'axios';
import dotenv from 'dotenv';
import { TokenDataType, TokenMetricsType, TokenPriceType, TokenRiskType } from '../../types/data';
import { analyzeToken } from '../training/modelPredictorNew';

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

const COINGECKO_API_URL = 'https://pro-api.coingecko.com/api/v3';
const COINGECKO_API_KEY = process.env.COIN_GECKO_API_KEY;

interface Transaction {
    from: string;
    to: string;
    value: string;
    timestamp: number;
    hash: string;
}

interface DexScreenerData {
    pairs?: Array<{
        baseToken?: {
            name: string;
            symbol: string;
        };
        priceUsd?: number;
        volume?: {
            h24?: number;
        };
        liquidity?: {
            usd?: number;
        };
        priceChange?: {
            h24?: number;
        };
    }>;
}

interface EtherscanData {
    status: string;
    result: Transaction[];
}

interface BundlerPattern {
    isFromBundler: boolean;
    similarTransactionCount: number;
    timePattern: number;
}

interface AccumulationMetrics {
    accumulationRate: number;
    stealthAccumulation: number;
}

// Delay function to pause execution
function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchEtherscanData(tokenAddress: string, chain: string = 'ethereum'): Promise<EtherscanData | null> {
    try {
        const endpoint = ENDPOINTS[chain as keyof typeof ENDPOINTS];
        const apiKey = API_KEYS[chain as keyof typeof API_KEYS];
        
        if (!endpoint || !apiKey) {
            console.log(`❌ No Etherscan endpoint or API key for chain: ${chain}`);
            return null;
        }

        console.log(`🔑 Using ${chain}scan`);
        const response = await axios.get(endpoint, {
            params: {
                module: 'account',
                action: 'tokentx',
                address: tokenAddress,
                apikey: apiKey,
                sort: 'desc'
            }
        });
        
        if (response.data?.status === '1' && Array.isArray(response.data.result)) {
            console.log(`✅ Found ${response.data.result.length} transactions`);
            return response.data as EtherscanData;
        }
        
        console.log(`❌ Invalid response from ${chain}scan:`, 
            response.data?.message || 
            (response.data?.result === null ? 'No transactions found' : response.data?.status === '0' ? 'API request failed' : 'Unknown error')
        );
        console.log('🔍 Response details:', JSON.stringify(response.data, null, 2));
        return null;
    } catch (error: unknown) {
        console.error(`Error fetching ${chain}scan data:`, error instanceof Error ? error.message : 'Unknown error');
        return null;
    }
}


async function fetchCoinGeckoData(tokenAddress: string, network: string): Promise<any> {
    try {
       // 

        const myUrl = `${COINGECKO_API_URL}/onchain/networks/${network}/tokens/${tokenAddress}?x_cg_pro_api_key=${COINGECKO_API_KEY}`;
        console.log('CoinGecko URL:', myUrl);

        console.log(`Fetching CoinGecko data for: ${tokenAddress} on ${network}`);
        const url = `${COINGECKO_API_URL}/onchain/networks/${network}/tokens/${tokenAddress}`;
        const response = await axios.get(url, {
            headers: {
                'x-cg-pro-api-key': COINGECKO_API_KEY
            }
        });

        console.log('CoinGecko API Response:', JSON.stringify(response.data, null, 2));
        return response.data;
    } catch (error: unknown) {
        console.error('Error fetching CoinGecko data:', error instanceof Error ? error.message : 'Unknown error');
        return null;
    }
}

function calculateVolumeAnomaly(dexData: DexScreenerData | null): number {
    if (!dexData?.pairs?.[0]?.volume?.h24) return 0.5;
    const volume = dexData.pairs[0].volume.h24;
    return volume > 1000000 ? 0.8 : 0.2;
}

function calculateHolderConcentration(etherscanData: EtherscanData | null): number {
    if (!etherscanData?.result) return 0.5;
    const uniqueHolders = new Set(etherscanData.result.map(tx => tx.to)).size;
    return uniqueHolders < 100 ? 0.8 : 0.2;
}

function calculateLiquidityScore(dexData: DexScreenerData | null): number {
    if (!dexData?.pairs?.[0]?.liquidity?.usd) return 0.5;
    const liquidity = dexData.pairs[0].liquidity.usd;
    return liquidity > 100000 ? 0.2 : 0.8;
}

function calculatePriceVolatility(dexData: DexScreenerData | null): number {
    if (!dexData?.pairs?.[0]?.priceChange?.h24) return 0.5;
    const priceChange = Math.abs(dexData.pairs[0].priceChange.h24);
    return priceChange > 20 ? 0.8 : 0.2;
}

function calculateSellPressure(dexData: DexScreenerData | null): number {
    if (!dexData?.pairs?.[0]?.priceChange?.h24) return 0.5;
    const priceChange = dexData.pairs[0].priceChange.h24;
    return priceChange < -10 ? 0.8 : 0.2;
}

function calculateMarketCapRisk(dexData: DexScreenerData | null): number {
    if (!dexData?.pairs?.[0]?.liquidity?.usd) return 0.5;
    const liquidity = dexData.pairs[0].liquidity.usd;
    return liquidity < 50000 ? 0.8 : 0.2;
}

function calculateTimeGaps(transactions: Transaction[]): number[] {
    const gaps: number[] = [];
    for (let i = 1; i < transactions.length; i++) {
        gaps.push(transactions[i-1].timestamp - transactions[i].timestamp);
    }
    return gaps;
}

function calculateVariance(values: number[]): number {
    if (values.length === 0) return 0;
    const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
    const squareDiffs = values.map(val => Math.pow(val - mean, 2));
    return squareDiffs.reduce((sum, val) => sum + val, 0) / values.length;
}

async function detectBundlerPattern(transactions: Transaction[]): Promise<BundlerPattern> {
    const timeGaps = calculateTimeGaps(transactions);
    const variance = calculateVariance(timeGaps);
    
    return {
        isFromBundler: variance < 0.1,
        similarTransactionCount: transactions.length,
        timePattern: variance
    };
}

async function calculateAccumulationMetrics(transactions: Transaction[]): Promise<AccumulationMetrics> {
    const uniqueAddresses = new Set(transactions.map(tx => tx.to));
    const totalTransactions = transactions.length;
    const accumulationRate = uniqueAddresses.size / totalTransactions;
    const stealthAccumulation = totalTransactions > 100 ? 0.8 : 0.2;
    
    return {
        accumulationRate,
        stealthAccumulation
    };
}

// Function to generate metadata reason string
function generateMetadataReason(metrics: TokenMetricsType, risk: TokenRiskType): string {
    const reasons: string[] = [];

    if (metrics.holderConcentration > 0.7) {
        reasons.push('High concentration of holders');
    }
    if (metrics.priceVolatility > 0.7) {
        reasons.push('High price volatility');
    }
    if (metrics.liquidityScore < 0.3) {
        reasons.push('Low liquidity score');
    }
    if (metrics.sellPressure > 0.7) {
        reasons.push('High sell pressure');
    }
    if (risk.overall > 0.7) {
        reasons.push('Overall high risk');
    }
    if (risk.social > 0.5) {
        reasons.push('Potential rug pull detected');
    }

    return reasons.length > 0 ? reasons.join(', ') : 'No significant risks detected';
}

// Function to calculate liquidity risk
function calculateLiquidityRisk(metrics: TokenMetricsType, overallRisk: number): number {
    const liquidityRisk = (1 - metrics.liquidityScore) * overallRisk;
    return Math.min(Math.max(liquidityRisk, 0), 1); // Ensure the risk is between 0 and 1
}

// Function to calculate concentration risk
function calculateConcentrationRisk(metrics: TokenMetricsType, overallRisk: number): number {
    const concentrationRisk = metrics.holderConcentration * overallRisk;
    return Math.min(Math.max(concentrationRisk, 0), 1);
}

// Function to calculate volatility risk
function calculateVolatilityRisk(metrics: TokenMetricsType, overallRisk: number): number {
    const volatilityRisk = metrics.priceVolatility * overallRisk;
    return Math.min(Math.max(volatilityRisk, 0), 1);
}

// Function to calculate social risk
function calculateSocialRisk(metrics: TokenMetricsType, overallRisk: number): number {
    const socialRisk = metrics.bundlerActivity ? overallRisk * 0.5 : overallRisk * 0.2;
    return Math.min(Math.max(socialRisk, 0), 1);
}

// Function to calculate technical risk
function calculateTechnicalRisk(metrics: TokenMetricsType, overallRisk: number): number {
    const technicalRisk = metrics.marketCapRisk * overallRisk;
    return Math.min(Math.max(technicalRisk, 0), 1);
}

export async function fetchTokenData(tokenAddress: string, network: string = 'eth'): Promise<TokenDataType | null> {
    try {
        // Add delay to respect rate limits
        await delay(1000); // Delay for 1000ms (1 second) before making the request

        const coinGeckoData = await fetchCoinGeckoData(tokenAddress, network);
        if (!coinGeckoData) {
            console.log('❌ Failed to fetch CoinGecko data');
            return null;
        }

        // Assuming the CoinGecko data structure matches the expected TokenDataType
        const tokenData: TokenDataType = {
            address: tokenAddress,
            name: coinGeckoData.name || 'Unknown',
            symbol: coinGeckoData.symbol || 'UNKNOWN',
            chain: network,
            metrics: {
                metadata: '', // Placeholder, will be updated
                tokenAddress: tokenAddress,
                volumeAnomaly: 0, // Placeholder
                holderConcentration: 0, // Placeholder
                liquidityScore: 0, // Placeholder
                priceVolatility: 0, // Placeholder
                sellPressure: 0, // Placeholder
                marketCapRisk: 0, // Placeholder
                bundlerActivity: false, // Placeholder
                accumulationRate: 0, // Placeholder
                stealthAccumulation: 0, // Placeholder
                suspiciousPattern: false, // Placeholder
                isRugPull: false, // Placeholder
                timestamp: new Date(),
                holders: 0, // Placeholder
                totalSupply: 0, // Placeholder
                currentPrice: coinGeckoData.market_data?.current_price?.usd || 0,
                isHoneyPot: false // Placeholder
            },
            price: {
                tokenAddress: tokenAddress,
                price: coinGeckoData.market_data?.current_price?.usd || 0,
                volume24h: coinGeckoData.market_data?.total_volume?.usd || 0,
                marketCap: coinGeckoData.market_data?.market_cap?.usd || 0,
                liquidity: 0, // Placeholder
                timestamp: new Date()
            },
            risk: {
                tokenAddress: tokenAddress,
                overall: 0, // Placeholder
                liquidity: 0, // Placeholder
                concentration: 0, // Placeholder
                volatility: 0, // Placeholder
                social: 0, // Placeholder
                technical: 0, // Placeholder
                totalTokens: 0, // Placeholder
                transactionsCount: 0, // Placeholder
                age: 0, // Placeholder
                highRiskCount: 0, // Placeholder
                mediumRiskCount: 0, // Placeholder
                lowRiskCount: 0 // Placeholder
            },
            createdAt: new Date(),
            updatedAt: new Date()
        };

        return tokenData;
    } catch (error) {
        console.error('Error fetching token data:', error);
        return null;
    }
}

