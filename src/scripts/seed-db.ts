// path: src/scripts/seed-db.ts
import edgeql from '../../dbschema/edgeql-js';
import { edgeDBCloudClient } from '../db/connection/connection';
import { localClient } from '../db/connection/connection';

const SAMPLE_TOKENS = [
    {
        address: '0x01D7367A1F1AfdC3D2667C37ef5A3723012d7757', // Frog Sorcerer
        name: 'Frog Sorcerer',
        symbol: 'FROGZ',
        metrics: {
            metadata: {
                reason: 'High concentration of holders, High price volatility',
            },
            tokenAddress: '0x01D7367A1F1AfdC3D2667C37ef5A3723012d7757',
            volumeAnomaly: 0.2,
            holderConcentration: 0.2,
            liquidityScore: 0.8,
            priceVolatility: 0.5,
            sellPressure: 0.2,
            marketCapRisk: 0.5,
            bundlerActivity: false,
            accumulationRate: 0.8,
            stealthAccumulation: 0.2,
            suspiciousPattern: null,
            isRugPull: false,
            timestamp: '2025-01-13 07:57:13.658565',
            holders: 0.2,
            totalSupply: 0.2,
            currentPrice: 0.2,
            isHoneyPot: false
        },
        price:{
            tokenAddress: '0x01D7367A1F1AfdC3D2667C37ef5A3723012d7757',
            price: 0.2,
            liquidity: 0.8,
            volume24h: 0.2,
            marketCap: 0.2,
            timestamp: '2025-01-13 07:57:13.658565'
        },
        createdAt: '2025-01-13 07:57:13.658565',
        updatedAt: '2025-01-13 07:57:13.658565'
    },
    {
        address: '0x037A54AaB062628C9Bbae1FDB1583c195585fe41', // LCX
        name: 'LCX',
        symbol: 'LCX',
        metrics: {
            metadata: {
                reason: 'High concentration of holders, High price volatility',
            },
            tokenAddress: '0x037A54AaB062628C9Bbae1FDB1583c195585fe41',
            volumeAnomaly: 0.2,
            holderConcentration: 0.2,
            liquidityScore: 0.8,
            priceVolatility: 0.5,
            sellPressure: 0.2,
            marketCapRisk: 0.5,
            bundlerActivity: false,
            accumulationRate: 0.8,
            stealthAccumulation: 0.2,
            suspiciousPattern: null,
            isRugPull: false,
            timestamp: '2025-01-13 07:57:13.658565',
            holders: 0.2,
            totalSupply: 0.2,
            currentPrice: 0.2,
            isHoneyPot: false
        },
        price: {
            tokenAddress: '0x037A54AaB062628C9Bbae1FDB1583c195585fe41',
            price: 0.2,
            liquidity: 0.8,
            volume24h: 0.2,
            marketCap: 0.2,
            timestamp: '2025-01-13 07:57:13.658565'
        },
        createdAt: '2025-01-13 07:57:13.658565',
        updatedAt: '2025-01-13 07:57:13.658565'
    },
    {
        address: '0x06113abCeF9D163C026441b112e70c82EE1c4A79', // Omira
        name: 'Omira',
        symbol: 'OMIRA',
        metrics: {
            metadata: {
                reason: 'High concentration of holders, High price volatility',
            },
            tokenAddress: '0x06113abCeF9D163C026441b112e70c82EE1c4A79',
            volumeAnomaly: 0.2,
            holderConcentration: 0.2,
            liquidityScore: 0.8,
            priceVolatility: 0.5,
            sellPressure: 0.2,
            marketCapRisk: 0.5,
            bundlerActivity: false,
            accumulationRate: 0.8,
            stealthAccumulation: 0.2,
            suspiciousPattern: null,
            isRugPull: false,
            timestamp: '2025-01-13 07:57:13.658565',
            holders: 0.2,
            totalSupply: 0.2,
            currentPrice: 0.2,
            isHoneyPot: false
        },
        price: {
            tokenAddress: '0x06113abCeF9D163C026441b112e70c82EE1c4A79',
            price: 0.2,
            liquidity: 0.8,
            volume24h: 0.2,
            marketCap: 0.2,
            timestamp: '2025-01-13 07:57:13.658565'
        },
        createdAt: '2025-01-13 07:57:13.658565',
        updatedAt: '2025-01-13 07:57:13.658565'
    },
    {
        address: '0x06B964d96f5dCF7Eae9d7C559B09EDCe244d4B8E', // USUALX
        name: 'USUALX',
        symbol: 'USUALX',
        metrics: {
            metadata: {
                reason: 'High concentration of holders, High price volatility',
            },  
            tokenAddress: '0x06B964d96f5dCF7Eae9d7C559B09EDCe244d4B8E',
            volumeAnomaly: 0.2,
            holderConcentration: 0.2,
            liquidityScore: 0.8,
            priceVolatility: 0.5,
            sellPressure: 0.2,
            marketCapRisk: 0.5,
            bundlerActivity: false,
            accumulationRate: 0.8,
            stealthAccumulation: 0.2,
            suspiciousPattern: null,
            isRugPull: false,
            timestamp: '2025-01-13 07:57:13.658565',
            holders: 0.2,
            totalSupply: 0.2,
            currentPrice: 0.2,
            isHoneyPot: false
        },
        price: {
            tokenAddress: '0x06B964d96f5dCF7Eae9d7C559B09EDCe244d4B8E',
            price: 0.2,
            liquidity: 0.8,
            volume24h: 0.2,
            marketCap: 0.2,
            timestamp: '2025-01-13 07:57:13.658565'
        },
        createdAt: '2025-01-13 07:57:13.658565',
        updatedAt: '2025-01-13 07:57:13.658565'
    },
    {
        address: '0x0f6d4d4643A514132F84F4a270946dB3c7Cb701C', // Lovely Finance
        name: 'Lovely Finance',
        symbol: 'LOVELY',
        metrics: {
            metadata: {
                reason: 'High concentration of holders, High price volatility',
            },
            tokenAddress: '0x0f6d4d4643A514132F84F4a270946dB3c7Cb701C',
            volumeAnomaly: 0.2,
            holderConcentration: 0.2,
            liquidityScore: 0.8,
            priceVolatility: 0.5,
            sellPressure: 0.2,
            marketCapRisk: 0.5,
            bundlerActivity: false,
            accumulationRate: 0.8,
            stealthAccumulation: 0.2,
            suspiciousPattern: null,
            isRugPull: false,
            timestamp: '2025-01-13 07:57:13.658565',
            holders: 0.2,
            totalSupply: 0.2,
            currentPrice: 0.2,
            isHoneyPot: false
        },
        price: {
            tokenAddress: '0x0f6d4d4643A514132F84F4a270946dB3c7Cb701C',
            price: 0.2,
            liquidity: 0.8,
            volume24h: 0.2,
            marketCap: 0.2,
            timestamp: '2025-01-13 07:57:13.658565'
        },
        createdAt: '2025-01-13 07:57:13.658565',
        updatedAt: '2025-01-13 07:57:13.658565'
    },
    {
        address: '0x13E4b8CfFe704d3De6F19E52b201d92c21EC18bD', // ParallelAI
        name: 'ParallelAI',
        symbol: 'PAI',
        metrics: {
            metadata: {
                reason: 'High concentration of holders, High price volatility',
            },
            tokenAddress: '0x13E4b8CfFe704d3De6F19E52b201d92c21EC18bD',
            volumeAnomaly: 0.2,
            holderConcentration: 0.2,
            liquidityScore: 0.8,
            priceVolatility: 0.5,
            sellPressure: 0.2,
            marketCapRisk: 0.5,
            bundlerActivity: false,
            accumulationRate: 0.8,
            stealthAccumulation: 0.2,
            suspiciousPattern: null,
            isRugPull: false,
            timestamp: '2025-01-13 07:57:13.658565',
            holders: 0.2,
            totalSupply: 0.2,
            currentPrice: 0.2,
            isHoneyPot: false
        },
        price: {
            tokenAddress: '0x13E4b8CfFe704d3De6F19E52b201d92c21EC18bD',
            price: 0.2,
            liquidity: 0.8,
            volume24h: 0.2,
            marketCap: 0.2,
            timestamp: '2025-01-13 07:57:13.658565'
        },
        createdAt: '2025-01-13 07:57:13.658565',
        updatedAt: '2025-01-13 07:57:13.658565'
    },
    {
        address: '0x1495bc9e44Af1F8BCB62278D2bEC4540cF0C05ea', // Zero1 Token
        name: 'Zero1 Token',
        symbol: 'DEAI',
        metrics: {
            metadata: {
                reason: 'High concentration of holders, High price volatility',
            },
            tokenAddress: '0x1495bc9e44Af1F8BCB62278D2bEC4540cF0C05ea',
            volumeAnomaly: 0.2,
            holderConcentration: 0.2,
            liquidityScore: 0.8,
            priceVolatility: 0.5,
            sellPressure: 0.2,
            marketCapRisk: 0.5,
            bundlerActivity: false,
            accumulationRate: 0.8,
            stealthAccumulation: 0.2,
            suspiciousPattern: null,
            isRugPull: false,
            timestamp: '2025-01-13 07:57:13.658565',
            holders: 0.2,
            totalSupply: 0.2,
            currentPrice: 0.2,
            isHoneyPot: false
        },
        price: {
            tokenAddress: '0x1495bc9e44Af1F8BCB62278D2bEC4540cF0C05ea',
            price: 0.2,
            liquidity: 0.8,
            volume24h: 0.2,
            marketCap: 0.2,
            timestamp: '2025-01-13 07:57:13.658565'
        },
        createdAt: '2025-01-13 07:57:13.658565',
        updatedAt: '2025-01-13 07:57:13.658565'
    },
    {
        address: '0x1a2EB478FA07125C9935A77b3C03a82470801E30', // Amino
        name: 'Amino',
        symbol: 'AMO',
        metrics: {
            metadata: {
                reason: 'High concentration of holders, High price volatility',
            },
            tokenAddress: '0x1a2EB478FA07125C9935A77b3C03a82470801E30',
            volumeAnomaly: 0.2,
            holderConcentration: 0.2,
            liquidityScore: 0.8,
            priceVolatility: 0.5,
            sellPressure: 0.2,
            marketCapRisk: 0.5,
            bundlerActivity: false,
            accumulationRate: 0.8,
            stealthAccumulation: 0.2,
            suspiciousPattern: null,
            isRugPull: false,
            timestamp: '2025-01-13 07:57:13.658565',
            holders: 0.2,
            totalSupply: 0.2,
            currentPrice: 0.2,
            isHoneyPot: false
        },
        price: {
            tokenAddress: '0x1a2EB478FA07125C9935A77b3C03a82470801E30',
            price: 0.2,
            liquidity: 0.8,
            volume24h: 0.2,
            marketCap: 0.2,
            timestamp: '2025-01-13 07:57:13.658565'
        },
        createdAt: '2025-01-13 07:57:13.658565',
        updatedAt: '2025-01-13 07:57:13.658565'
    }
];

async function seedDatabase() {
    try {
        for (const token of SAMPLE_TOKENS) {
            // Check if the token metrics already exist
            const existingMetricsCloud = await edgeql.select(edgeql.TokenMetrics, (metrics) => ({
                filter: edgeql.op(metrics.tokenAddress, '=', token.metrics.tokenAddress),
                limit: 1
            })).run(edgeDBCloudClient);

            const existingMetricsLocal = await edgeql.select(edgeql.TokenMetrics, (metrics) => ({
                filter: edgeql.op(metrics.tokenAddress, '=', token.metrics.tokenAddress),
                limit: 1
            })).run(localClient);

            console.log(`Checking for existing metrics for ${token.name}:`, existingMetricsCloud);
            console.log(`Checking for existing metrics for ${token.name}:`, existingMetricsLocal);

            if (existingMetricsLocal.length > 0) {
                console.log(`Token metrics for ${token.name} already exist in Local database. Skipping insertion.`);
                continue;
            } else if (existingMetricsCloud.length > 0) {
                console.log(`Token metrics for ${token.name} already exist in Cloud database. Skipping insertion.`);
                continue;
            }
            
            const metricsQuery = edgeql.insert(edgeql.TokenMetrics, {
                metadata: JSON.stringify(token.metrics.metadata),
                tokenAddress: token.metrics.tokenAddress,
                volumeAnomaly: token.metrics.volumeAnomaly.toString(),
                holderConcentration: token.metrics.holderConcentration.toString(),
                liquidityScore: token.metrics.liquidityScore.toString(),
                priceVolatility: token.metrics.priceVolatility.toString(),
                sellPressure: token.metrics.sellPressure.toString(),
                marketCapRisk: token.metrics.marketCapRisk.toString(),
                bundlerActivity: token.metrics.bundlerActivity,
                accumulationRate: token.metrics.accumulationRate.toString(),
                stealthAccumulation: token.metrics.stealthAccumulation.toString(),
                suspiciousPattern: token.metrics.suspiciousPattern ?? '',
                isRugPull: token.metrics.isRugPull,
                timestamp: new Date(token.metrics.timestamp),
                holders: token.metrics.holders.toString(),
                totalSupply: token.metrics.totalSupply.toString(),
                currentPrice: token.metrics.currentPrice.toString(),
                isHoneyPot: token.metrics.isHoneyPot
            });

            const priceQuery = edgeql.insert(edgeql.TokenPrices, {
                tokenAddress: token.price.tokenAddress,
                price: token.price.price.toString(),
                volume24h: token.price.volume24h.toString(),
                marketCap: token.price.marketCap.toString(),
                liquidity: token.price.liquidity.toString(),
                timestamp: new Date(token.price.timestamp)
            });

            const tokenQuery = edgeql.insert(edgeql.Token, {
                address: token.address,
                name: token.name,
                symbol: token.symbol,
                metrics: metricsQuery,
                price: priceQuery,
                createdAt: new Date(token.createdAt),
                updatedAt: new Date(token.updatedAt)
            });

            await metricsQuery.run(edgeDBCloudClient);
            console.log(`Seeded metrics for ${token.name} in Cloud Database`);
            await priceQuery.run(edgeDBCloudClient);
            console.log(`Seeded price for ${token.name} in Cloud Database`);
            await tokenQuery.run(edgeDBCloudClient);
            console.log(`Seeded token: ${token.name} in Cloud Database`);

            await metricsQuery.run(localClient);
            console.log(`Seeded metrics for ${token.name} in Local Database`);
            await priceQuery.run(localClient);
            console.log(`Seeded price for ${token.name} in Local Database`);
            await tokenQuery.run(localClient);
            console.log(`Seeded token: ${token.name} in Local Database`);
        }
        console.log('✅ Database seeding completed');
    } catch (error) {
        console.error('❌ Error seeding database:', error);
    }
}

seedDatabase(); 