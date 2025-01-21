// path: src/data-harvesting/scan-chain.ts  
import { ethers } from 'ethers';
import config from '../config/default';
import { fetchTokenData } from './fetcher';
import { edgeDBCloudClient, edgeql } from '../index';
import { Token, TokenMetrics, TokenPrices, TokenRisk } from '../../dbschema/edgeql-js/modules/default';
import { formatTokenMetrics, formatTokenPrice, formatTokenRisk } from '../utils/formatData';


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
                    const tokenData = await fetchTokenData(receipt.contractAddress);
                    
                    if (tokenData) {
                        console.log(`💾 Inserting token data for ${tokenData.name} (${tokenData.symbol}) into database.`);
                        const insertToken = edgeql.insert(Token, {
                            address: receipt.contractAddress,
                            name: tokenData.name,
                            symbol: tokenData.symbol,
                            metrics: edgeql.insert(TokenMetrics, formatTokenMetrics(tokenData.metrics)),
                            price: edgeql.insert(TokenPrices, formatTokenPrice(tokenData.price)),
                            risk: edgeql.insert(TokenRisk, formatTokenRisk(tokenData.risk))
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