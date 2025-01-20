import { ethers } from 'ethers';
import config from '../config/default';
import { fetchTokenData } from './fetcher';
import { edgeDBCloudClient, edgeql } from '../index';
import { Token, TokenMetrics, TokenPrices } from '../../dbschema/edgeql-js/modules/default';


async function monitorChain(chain: keyof typeof config.rpc, batchSize: number = config.scan.batchSize) {
    const provider = new ethers.JsonRpcProvider(config.rpc[chain]);
    console.log(`\n🔍 Starting scan on ${chain} chain...`);
    
    try {
        const latestBlock = await provider.getBlockNumber();
        console.log(`🔗 Latest block number on ${chain}: ${latestBlock}`);
        
        let scannedTokens = 0;
        let currentBlock = latestBlock;
        
        while (scannedTokens < batchSize) {
            console.log(`🔍 Scanning block number: ${currentBlock}`);
            const block = await provider.getBlock(currentBlock);
            if (!block || !block.transactions) {
                console.log(`⚠️ No transactions found in block ${currentBlock}. Moving to previous block.`);
                currentBlock--;
                continue;
            }
            
            for (const txHash of block.transactions) {
                if (scannedTokens >= batchSize) break;
                
                try {
                    console.log(`🔍 Fetching transaction: ${txHash}`);
                    const tx = await provider.getTransaction(txHash);
                    
                    if (!tx || tx.to) {
                        console.log(`⚠️ Transaction ${txHash} is not a contract creation. Skipping.`);
                        continue;
                    }
                    
                    const receipt = await provider.getTransactionReceipt(txHash);
                    if (!receipt || !receipt.contractAddress) {
                        console.log(`⚠️ No contract address found for transaction ${txHash}. Skipping.`);
                        continue;
                    }
                    
                    console.log(`📝 Analyzing token at contract address: ${receipt.contractAddress}`);
                    const tokenData = await fetchTokenData(receipt.contractAddress, chain);
                    
                    if (tokenData) {
                        console.log(`💾 Inserting token data for ${tokenData.name} (${tokenData.symbol}) into database.`);
                        const insertToken = edgeql.insert(Token, {
                            address: receipt.contractAddress,
                            name: tokenData.name,
                            symbol: tokenData.symbol,
                            metrics: edgeql.insert(TokenMetrics, {
                                tokenAddress: tokenData.metrics.tokenAddress,
                                volumeAnomaly: edgeql.cast(edgeql.decimal, tokenData.metrics.volumeAnomaly),
                                holderConcentration: edgeql.cast(edgeql.decimal, tokenData.metrics.holderConcentration),
                                liquidityScore: edgeql.cast(edgeql.decimal, tokenData.metrics.liquidityScore),
                                priceVolatility: edgeql.cast(edgeql.decimal, tokenData.metrics.priceVolatility),
                                sellPressure: edgeql.cast(edgeql.decimal, tokenData.metrics.sellPressure),
                                marketCapRisk: edgeql.cast(edgeql.decimal, tokenData.metrics.marketCapRisk),
                                bundlerActivity: tokenData.metrics.bundlerActivity,
                                isRugPull: tokenData.metrics.isRugPull,
                                metadata: tokenData.metrics.metadata,
                                timestamp: tokenData.metrics.timestamp,
                                holders: edgeql.cast(edgeql.decimal, tokenData.metrics.holders),
                                totalSupply: edgeql.cast(edgeql.decimal, tokenData.metrics.totalSupply),
                                currentPrice: edgeql.cast(edgeql.decimal, tokenData.metrics.currentPrice),
                                isHoneyPot: tokenData.metrics.isHoneyPot,
                                suspiciousPattern: tokenData.metrics.suspiciousPattern || '',
                                accumulationRate: edgeql.cast(edgeql.decimal, tokenData.metrics.accumulationRate),
                                stealthAccumulation: edgeql.cast(edgeql.decimal, tokenData.metrics.stealthAccumulation || 0)
                            }),
                            price: edgeql.insert(TokenPrices, {
                                tokenAddress: tokenData.price.tokenAddress,
                                price: edgeql.cast(edgeql.decimal, tokenData.price.price),
                                volume24h: edgeql.cast(edgeql.decimal, tokenData.price.volume24h),
                                marketCap: edgeql.cast(edgeql.decimal, tokenData.price.marketCap),
                                liquidity: edgeql.cast(edgeql.decimal, tokenData.price.liquidity),
                                timestamp: tokenData.price.timestamp
                            })
                        });

                        await insertToken.run(edgeDBCloudClient);
                        console.log(`✅ Successfully saved token data for ${tokenData.name} (${tokenData.symbol}).`);
                        scannedTokens++;
                    } else {
                        console.log(`⚠️ No token data found for contract address: ${receipt.contractAddress}`);
                    }
                } catch (error) {
                    console.error(`❌ Error processing transaction ${txHash}: ${error}`);
                    continue;
                }
            }
            
            currentBlock--;
        }
        
        console.log(`✨ Completed scanning ${chain}. Total tokens found: ${scannedTokens}`);
    } catch (error) {
        console.error(`❌ Error scanning ${chain}: ${error}`);
    }
}

async function startMonitoring() {
    const chains = ['ethereum', 'bsc', 'polygon'] as const;
    
    while (true) {
        try {
            for (const chain of chains) {
                await monitorChain(chain);
            }
            console.log(`⏰ Waiting ${config.scan.scanInterval / 1000} seconds until next scan...`);
            await new Promise(resolve => setTimeout(resolve, config.scan.scanInterval));
        } catch (error) {
            console.error('❌ Error in scanning cycle:', error);
            await new Promise(resolve => setTimeout(resolve, 10000)); // Wait 10s on error
        }
    }
}

// Start scanning if this file is run directly
if (require.main === module) {
    startMonitoring().catch(error => {
        console.error('❌ Fatal error:', error);
        process.exit(1);
    });
}