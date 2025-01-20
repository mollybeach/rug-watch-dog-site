// path: src/scripts/scan.ts
import { dataCollector } from '../data-harvesting/collector';
import { fetchTokenData } from '../data-harvesting/fetcher';
import { ethers } from 'ethers';
import pLimit from 'p-limit';

// Multiple RPC endpoints per chain for load balancing
const RPC_ENDPOINTS = {
    ethereum: [
        process.env.ETHEREUM_RPC || `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
        'https://rpc.ankr.com/eth',
        'https://eth.llamarpc.com'
    ],
    bsc: [
        process.env.BSC_RPC || 'https://bsc-dataseed1.binance.org',
        'https://bsc-dataseed2.binance.org',
        'https://bsc-dataseed3.binance.org',
        'https://bsc-dataseed4.binance.org'
    ],
    polygon: [
        process.env.POLYGON_RPC || `https://polygon-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
        'https://polygon-rpc.com',
        'https://rpc.ankr.com/polygon'
    ]
};

// Cache of processed addresses to avoid duplicates
const processedAddresses = new Set<string>();
const MIN_CONTRACT_SIZE = 500; // Minimum contract size in bytes to consider
const CONCURRENT_REQUESTS = 20; // Increased concurrent API requests
const BATCH_SIZE = 20; // Increased batch size for processing
const BLOCKS_TO_CACHE = 100; // Number of blocks to cache

// Cache for block data
const blockCache = new Map<string, ethers.Block>();

// Rate limiting settings
const RATE_LIMIT = {
    requests: 15, // Increased requests per window
    window: 1000, // 1 second
    minDelay: 50, // Reduced minimum delay
    maxDelay: 3000, // Reduced maximum delay
    backoffFactor: 1.5 // Increased backoff factor
};

let lastRequestTime = 0;
let requestCount = 0;
let currentDelay = RATE_LIMIT.minDelay;

async function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function waitForRateLimit(): Promise<void> {
    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTime;
    
    if (timeSinceLastRequest < RATE_LIMIT.window) {
        requestCount++;
        if (requestCount > RATE_LIMIT.requests) {
            currentDelay = Math.min(currentDelay * RATE_LIMIT.backoffFactor, RATE_LIMIT.maxDelay);
            await sleep(currentDelay);
            requestCount = 0;
        }
    } else {
        requestCount = 1;
        currentDelay = RATE_LIMIT.minDelay;
    }
    
    lastRequestTime = Date.now();
}

async function isTokenContract(provider: ethers.JsonRpcProvider, address: string): Promise<boolean> {
    console.log('Checking if address is a token contract:', address);
    try {
        const code = await provider.getCode(address);
        if (code.length < MIN_CONTRACT_SIZE * 2 + 2) return false;
        
        const hasTransfer = code.includes('a9059cbb');
        const hasBalanceOf = code.includes('70a08231');
        return hasTransfer && hasBalanceOf;
    } catch (error) {
        console.error('Error checking token contract:', error);
        return false;
    }
}

async function getProvider(chain: string): Promise<ethers.JsonRpcProvider> {
    const endpoints = RPC_ENDPOINTS[chain as keyof typeof RPC_ENDPOINTS];
    const randomEndpoint = endpoints[Math.floor(Math.random() * endpoints.length)];
    return new ethers.JsonRpcProvider(randomEndpoint);
}

async function processTransaction(
    provider: ethers.JsonRpcProvider,
    txHash: string,
    latestBlock: number,
    currentBlock: number
): Promise<string | null> {
    await waitForRateLimit();
    
    try {
        const tx = await provider.getTransaction(txHash);
        if (!tx || tx.to) return null;
        
        const receipt = await provider.getTransactionReceipt(txHash);
        if (!receipt?.contractAddress) return null;
        
        if (processedAddresses.has(receipt.contractAddress)) return null;
        
        if (latestBlock - currentBlock < 5) return null;
        
        if (!(await isTokenContract(provider, receipt.contractAddress))) return null;
        
        processedAddresses.add(receipt.contractAddress);
        return receipt.contractAddress;
    } catch (error) {
        console.error('Error processing transaction:', error);
        if (error && typeof error === 'object' && 'message' in error && typeof error.message === 'string' && error.message.includes('rate limit')) {
            console.log('Rate limit hit, backing off...');
            await sleep(currentDelay);
            currentDelay = Math.min(currentDelay * RATE_LIMIT.backoffFactor, RATE_LIMIT.maxDelay);
            return processTransaction(provider, txHash, latestBlock, currentBlock);
        }
        return null;
    }
}

async function processBatch(
    provider: ethers.JsonRpcProvider,
    transactions: string[],
    latestBlock: number,
    currentBlock: number
): Promise<string[]> {
    const limit = pLimit(CONCURRENT_REQUESTS);
    const promises = transactions.map(txHash => 
        limit(() => processTransaction(provider, txHash, latestBlock, currentBlock))
    );
    const results = await Promise.all(promises);
    return results.filter((addr: string | null): addr is string => addr !== null);
}

async function getBlock(provider: ethers.JsonRpcProvider, blockNumber: number): Promise<ethers.Block | null> {
    await waitForRateLimit();
    
    const network = await provider.getNetwork();
    const cacheKey = `${network.chainId}-${blockNumber}`;
    
    if (blockCache.has(cacheKey)) {
        return blockCache.get(cacheKey)!;
    }

    try {
        const block = await provider.getBlock(blockNumber);
        if (block) {
            blockCache.set(cacheKey, block);
            if (blockCache.size > BLOCKS_TO_CACHE) {
                const keys = Array.from(blockCache.keys());
                if (keys.length > 0) {
                    blockCache.delete(keys[0]);
                }
            }
        }
        return block;
    } catch (error) {
        console.error('Error getting block:', error);
        if (error && typeof error === 'object' && 'message' in error && typeof error.message === 'string' && error.message.includes('rate limit')) {
            console.log('Rate limit hit, backing off...');
            await sleep(currentDelay);
            currentDelay = Math.min(currentDelay * RATE_LIMIT.backoffFactor, RATE_LIMIT.maxDelay);
            return getBlock(provider, blockNumber);
        }
        return null;
    }
}

async function scanChain(chain: string, targetTokens: number = 50): Promise<string[]> {
    const provider = await getProvider(chain);
    console.log(`\n🔍 Scanning ${chain} chain...`);
    
    const extractedTokens: string[] = [];
    
    try {
        const latestBlock = await provider.getBlockNumber();
        console.log(`Latest block: ${latestBlock}`);
        
        let scannedTokens = 0;
        let currentBlock = latestBlock;
        let blocksWithoutTokens = 0;
        const MAX_BLOCKS_WITHOUT_TOKENS = 500; // Increased block search range
        
        while (scannedTokens < targetTokens && blocksWithoutTokens < MAX_BLOCKS_WITHOUT_TOKENS) {
            console.log('Current block:', currentBlock);
            const block = await getBlock(provider, currentBlock);
            if (!block?.transactions?.length) {
                currentBlock--;
                blocksWithoutTokens++;
                continue;
            }
            // Check if the block contains any token-related transactions
            const tokenTransactions = block.transactions.filter((tx: any) => tx.to === null);
            if (tokenTransactions.length === 0) {
                console.log('No token transactions in block:', currentBlock);
                currentBlock--;
                blocksWithoutTokens++;
                continue;
            }
            
            for (let i = 0; i < tokenTransactions.length; i += BATCH_SIZE) {
                if (scannedTokens >= targetTokens) break;
                console.log('Batch size:', BATCH_SIZE);
                const batch = tokenTransactions.slice(i, i + BATCH_SIZE);
                console.log('Batch:', batch);
                const tokenAddresses = await processBatch(provider, batch, latestBlock, currentBlock);
                console.log('Token addresses:', tokenAddresses);
                if (tokenAddresses.length > 0) {
                    console.log('Token addresses:', tokenAddresses);
                    console.log("Token addresses length:", tokenAddresses.length);
                    blocksWithoutTokens = 0;
                    extractedTokens.push(...tokenAddresses);
                    
                    const tokenPromises = tokenAddresses.map(async address => {
                        console.log(`\n📝 Analyzing token: ${address}`);
                        const tokenData = await fetchTokenData(address);
                        if (tokenData) {
                            await dataCollector.collectAndStoreTokenData(tokenData);
                            console.log(`✅ Token data collected and saved to database`);
                            scannedTokens++;
                        } else {
                            console.log(`⚠️ Could not fetch data for token ${address}`);
                        }
                    });
                    
                    await Promise.all(tokenPromises);
                }
            }
            
            if (blocksWithoutTokens > 0) {
                blocksWithoutTokens++;
            }
            currentBlock--;
            
            // Add delay between blocks to avoid rate limits
            console.log('Delay:', 50);
            await new Promise(resolve => setTimeout(resolve, 50)); // Reduced delay
        }
        // Ensure proper error handling for database operations
        await dataCollector.flushRemaining().catch((error: any) => {
            console.error('Error flushing data:', error);
            throw error;
        });
        console.log(`\n✨ Completed scanning ${chain}. Found ${scannedTokens} tokens.`);
        if (blocksWithoutTokens >= MAX_BLOCKS_WITHOUT_TOKENS) {
            console.log(`⚠️ Stopped scanning after ${MAX_BLOCKS_WITHOUT_TOKENS} blocks without finding new tokens.`);
        }
    } catch (error) {
        console.error(`Error scanning ${chain}:`, error);
        throw error; // Propagate error for proper handling
    }
    
    return extractedTokens;
}

async function main(): Promise<void> {
    try {
        console.log('✅ Database initialized');

        const args = process.argv.slice(2);
        const command = args[0] || 'scan';
        const chain = args[1] || 'ethereum';
        const limit = parseInt(args[2] || '50');

        if (command === 'scan') {
            console.log('Scanning chain:', chain);
            console.log('Limit:', limit);
            const tokens = await scanChain(chain, limit);
            console.log('Extracted tokens:', tokens);
        } else if (command === 'scan-all') {
            const allTokens = await Promise.all(
                ['ethereum', 'bsc', 'polygon'].map(chain => 
                    scanChain(chain, limit)
                )
            );
            console.log('Extracted tokens from all chains:', allTokens.flat());
        } else {
            console.error('Invalid command. Use "scan" or "scan-all"');
        }
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

if (require.main === module) {
    main().catch(console.error);
}