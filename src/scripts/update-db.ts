import edgeDBCloudClient from '@/lib/db/config';
import { fetchTokenData } from '../data-harvesting/fetcher';
import { TokenDataType } from '@/types/data';

async function updateDatabase() {
    try {
        console.log('🔄 Starting database update process...');

        // Fetch all tokens from the database
        const tokens: TokenDataType[] = await edgeDBCloudClient.query('SELECT Token { address }');

        for (const token of tokens) {
            console.log(`🔍 Updating token: ${token.address}`);

            // Fetch updated data for the token
            const updatedData = await fetchTokenData(token.address);

            console.log('updatedData');
            console.log(updatedData);
            if (updatedData) {
                // Convert JSON to TokenMetrics
                const metrics = {
                    tokenAddress: updatedData.metrics.tokenAddress,
                    volumeAnomaly: parseFloat(updatedData.metrics.volumeAnomaly.toString()),
                    holderConcentration: parseFloat(updatedData.metrics.holderConcentration.toString()),
                    liquidityScore: parseFloat(updatedData.metrics.liquidityScore.toString()),
                    priceVolatility: parseFloat(updatedData.metrics.priceVolatility.toString()),
                    sellPressure: parseFloat(updatedData.metrics.sellPressure.toString()),
                    marketCapRisk: parseFloat(updatedData.metrics.marketCapRisk.toString()),
                    isRugPull: updatedData.metrics.isRugPull,
                    bundlerActivity: updatedData.metrics.bundlerActivity,
                    accumulationRate: parseFloat(updatedData.metrics.accumulationRate.toString()),
                    stealthAccumulation: parseFloat(updatedData.metrics.stealthAccumulation.toString()),
                    suspiciousPattern: updatedData.metrics.suspiciousPattern,
                    timestamp: new Date(updatedData.metrics.timestamp),
                    holders: parseFloat(updatedData.metrics.holders.toString()),
                    totalSupply: parseFloat(updatedData.metrics.totalSupply.toString()),
                    currentPrice: parseFloat(updatedData.metrics.currentPrice.toString()),
                    isHoneyPot: updatedData.metrics.isHoneyPot,
                };

                // Convert JSON to TokenPrice
                const price = {
                    tokenAddress: updatedData.price.tokenAddress,
                    price: parseFloat(updatedData.price.price.toString()),
                    volume24h: parseFloat(updatedData.price.volume24h.toString()),
                    marketCap: parseFloat(updatedData.price.marketCap.toString()),
                    liquidity: parseFloat(updatedData.price.liquidity.toString()),
                    timestamp: new Date(updatedData.price.timestamp),
                };

                // Convert JSON to TokenRisk
                const risk = {
                    tokenAddress: updatedData.risk.tokenAddress,
                    overall: parseFloat(updatedData.risk.overall.toString()),
                    liquidity: parseFloat(updatedData.risk.liquidity?.toString() || '0'),
                    concentration: parseFloat(updatedData.risk.concentration?.toString() || '0'),
                    volatility: parseFloat(updatedData.risk.volatility?.toString() || '0'),
                    social: parseFloat(updatedData.risk.social?.toString() || '0'),
                    technical: parseFloat(updatedData.risk.technical?.toString() || '0'),
                    totalTokens: parseFloat(updatedData.risk.totalTokens.toString()),
                    highRiskCount: parseFloat(updatedData.risk.highRiskCount.toString()),
                    mediumRiskCount: parseFloat(updatedData.risk.mediumRiskCount.toString()),
                    lowRiskCount: parseFloat(updatedData.risk.lowRiskCount.toString()),
                };

                // Log all arguments before executing the update
                console.log('Arguments for database update:', {
                    address: updatedData.address,
                    name: updatedData.name,
                    symbol: updatedData.symbol,
                    metrics,
                    price,
                    risk,
                    updatedAt: new Date().toISOString()
                });

                // Update the token in the database
                await edgeDBCloudClient.execute(`
                    UPDATE Token
                    FILTER .address = <str>$0
                    SET {
                        name := <str>$1,
                        symbol := <str>$2,
                        metrics := (INSERT TokenMetrics {
                            tokenAddress := <str>$3,
                            volumeAnomaly := <decimal>$4,
                            holderConcentration := <decimal>$5,
                            liquidityScore := <decimal>$6,
                            priceVolatility := <decimal>$7,
                            sellPressure := <decimal>$8,
                            marketCapRisk := <decimal>$9,
                            isRugPull := <bool>$10,
                            bundlerActivity := <bool>$11,
                            accumulationRate := <decimal>$12,
                            stealthAccumulation := <decimal>$13,
                            suspiciousPattern := <bool>$14,
                            timestamp := <datetime>$15,
                            holders := <decimal>$16,
                            totalSupply := <decimal>$17,
                            currentPrice := <decimal>$18,
                            isHoneyPot := <bool>$19
                        }),
                        price := (INSERT TokenPrices {
                            tokenAddress := <str>$20,
                            price := <decimal>$21,
                            volume24h := <decimal>$22,
                            marketCap := <decimal>$23,
                            liquidity := <decimal>$24,
                            timestamp := <datetime>$25
                        }),
                        risk := (INSERT TokenRisk {
                            tokenAddress := <str>$26,
                            overall := <decimal>$27,
                            liquidity := <decimal>$28,
                            concentration := <decimal>$29,
                            volatility := <decimal>$30,
                            social := <decimal>$31,
                            technical := <decimal>$32,
                            totalTokens := <decimal>$33,
                            highRiskCount := <decimal>$34,
                            mediumRiskCount := <decimal>$35,
                            lowRiskCount := <decimal>$36
                        }),
                        updatedAt := <datetime>$37
                    }
                `, [
                    updatedData.address,
                    updatedData.name,
                    updatedData.symbol,
                    metrics.tokenAddress,
                    metrics.volumeAnomaly,
                    metrics.holderConcentration,
                    metrics.liquidityScore,
                    metrics.priceVolatility,
                    metrics.sellPressure,
                    metrics.marketCapRisk,
                    metrics.isRugPull,
                    metrics.bundlerActivity,
                    metrics.accumulationRate,
                    metrics.stealthAccumulation,
                    metrics.suspiciousPattern,
                    metrics.timestamp,
                    metrics.holders,
                    metrics.totalSupply,
                    metrics.currentPrice,
                    metrics.isHoneyPot,
                    price.tokenAddress,
                    price.price,
                    price.volume24h,
                    price.marketCap,
                    price.liquidity,
                    price.timestamp,
                    risk.tokenAddress,
                    risk.overall,
                    risk.liquidity,
                    risk.concentration,
                    risk.volatility,
                    risk.social,
                    risk.technical,
                    risk.totalTokens,
                    risk.highRiskCount,
                    risk.mediumRiskCount,
                    risk.lowRiskCount,
                    new Date().toISOString()
                ]);

                console.log(`✅ Token ${token.address} updated successfully.`);
            } else {
                console.log(`❌ Failed to fetch data for token: ${token.address}`);
            }
        }

        console.log('✅ Database update process completed.');
    } catch (error) {
        console.error('Error updating database:', error);
        if (error instanceof Error) {
            console.error('Stack trace:', error.stack);
        }
    }
}

updateDatabase();
