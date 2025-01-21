// path: src/data-harvesting/fetcher.ts
import axios from 'axios';
import dotenv from 'dotenv';
import { TokenDataType, TokenMetricsType, TokenRiskType } from '../../types/data';
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

async function fetchDexScreenerData(tokenAddress: string): Promise<DexScreenerData | null> {
    try {
        console.log(`📊 Fetching DexScreener data for: ${tokenAddress}`);
        const dexScreenerUrl = `https://api.dexscreener.com/latest/dex/tokens/${tokenAddress}`;
        console.log('DexScreener URL:', dexScreenerUrl);
        const response = await axios.get(dexScreenerUrl);
        console.log('DexScreener API Response:', JSON.stringify(response.data, null, 2));
        return response.data as DexScreenerData;
    } catch (error: unknown) {
        console.error('Error fetching DexScreener data:', error instanceof Error ? error.message : 'Unknown error');
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

export async function fetchTokenData(tokenAddress: string, chain: string = 'ethereum'): Promise<TokenDataType | null> {
    try {
        console.log(`\n📊 Fetching data for token: ${tokenAddress} on ${chain}`);
        
        const etherscanData = await fetchEtherscanData(tokenAddress, chain);
        if (!etherscanData?.result) {
            console.log('❌ Failed to fetch Etherscan data');
            return null;
        }
        
        const dexData = await fetchDexScreenerData(tokenAddress);
        if (!dexData?.pairs?.[0]) {
            console.log('❌ Failed to fetch DexScreener data');
            return null;
        }

        const bundlerPattern = await detectBundlerPattern(etherscanData.result);
        const accMetrics = await calculateAccumulationMetrics(etherscanData.result);

        const tokenData: TokenDataType = {
            address: tokenAddress,
            name: dexData.pairs[0].baseToken?.name || 'Unknown',
            symbol: dexData.pairs[0].baseToken?.symbol || 'UNKNOWN',
            chain: chain,
            metrics: {
                metadata: '', // Placeholder, will be updated
                tokenAddress: tokenAddress,
                volumeAnomaly: calculateVolumeAnomaly(dexData),
                holderConcentration: calculateHolderConcentration(etherscanData),
                liquidityScore: calculateLiquidityScore(dexData),
                priceVolatility: calculatePriceVolatility(dexData),
                sellPressure: calculateSellPressure(dexData),
                marketCapRisk: calculateMarketCapRisk(dexData),
                isRugPull: false, // Temporary value, will be updated
                bundlerActivity: bundlerPattern.isFromBundler,
                accumulationRate: accMetrics.accumulationRate,
                stealthAccumulation: accMetrics.stealthAccumulation,
                suspiciousPattern: bundlerPattern.timePattern > 0.5,
                timestamp: new Date(),
                holders: etherscanData.result.length,
                totalSupply: etherscanData.result.length,
                currentPrice: dexData.pairs[0].priceUsd || 0,
                isHoneyPot: etherscanData.result.length > 1000
            },
            price: {
                tokenAddress: tokenAddress,
                price: dexData.pairs[0].priceUsd || 0,
                volume24h: dexData.pairs[0].volume?.h24 || 0,
                marketCap: (dexData.pairs[0].priceUsd || 0) * 1000000,
                liquidity: dexData.pairs[0].liquidity?.usd || 0,
                timestamp: new Date()
            },
            risk: {
                tokenAddress: tokenAddress,
                overall: 0,
                liquidity: 0,
                concentration: 0,
                volatility: 0,
                social: 0,
                technical: 0,
                totalTokens: 0,
                transactionsCount: etherscanData.result.length,
                age: 0,
                highRiskCount: 0,
                mediumRiskCount: 0,
                lowRiskCount: 0
            },
            createdAt: new Date(),
            updatedAt: new Date()
        };

        // Analyze the token data
        const analysisResult = await analyzeToken(tokenData);
        console.log('analysisResult');
        console.log(analysisResult);

        // Use the analysis result for risk calculation
        const risk: TokenRiskType = {
            tokenAddress: tokenAddress,
            overall: analysisResult.predictionData[0],
            liquidity: calculateLiquidityRisk(tokenData.metrics, analysisResult.predictionData[0]),
            concentration: calculateConcentrationRisk(tokenData.metrics, analysisResult.predictionData[0]),
            volatility: calculateVolatilityRisk(tokenData.metrics, analysisResult.predictionData[0]),
            social: calculateSocialRisk(tokenData.metrics, analysisResult.predictionData[0]),
            technical: calculateTechnicalRisk(tokenData.metrics, analysisResult.predictionData[0]),
            totalTokens: tokenData.metrics.totalSupply,
            transactionsCount: etherscanData.result.length,
            age: calculateAge(tokenData.createdAt),
            highRiskCount: 0,
            mediumRiskCount: 0,
            lowRiskCount: 0
        };

        //Fill in the rest of the token data
        tokenData.price.price = parseFloat(tokenData.price.price.toString());
        tokenData.metrics.currentPrice = parseFloat(tokenData.metrics.currentPrice.toString());
        tokenData.metrics.isRugPull = analysisResult.isRugPull;
        tokenData.metrics.metadata = JSON.stringify({ reason: generateMetadataReason(tokenData.metrics, risk) });
        tokenData.risk = risk;
        return tokenData;
    } catch (error) {
        console.error('Error fetching token data:', error);
        return null;
    }
}

function calculateAge(createdAt: Date): number {
    const currentDate = new Date();
    const ageInDays = Math.floor((currentDate.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24));
    return ageInDays;
}

