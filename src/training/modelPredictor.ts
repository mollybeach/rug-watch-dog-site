//path: src/training/modelPredictor.ts
import * as tf from '@tensorflow/tfjs-node';
import { TokenDataType, TokenMetricsType, RiskMetricsType } from '../types/data';
import { formatTokenMetrics } from '../utils/formatData';
let model: tf.LayersModel;

export async function loadModel(modelPath: string): Promise<void> {
    try {
        model = await tf.loadLayersModel(`file://${modelPath}`);
        console.log('Model loaded successfully');
    } catch (error) {
        console.error('Error loading model:', error);
        throw error;
    }
}


function preprocessFeatures(tokenData: TokenDataType): tf.Tensor2D {
    const features = [
        tokenData.metrics.volumeAnomaly,
        tokenData.metrics.holderConcentration,
        tokenData.metrics.liquidityScore,
        tokenData.metrics.priceVolatility,
        tokenData.metrics.sellPressure,
        tokenData.metrics.marketCapRisk,
        tokenData.metrics.bundlerActivity ? 1 : 0,
        tokenData.metrics.accumulationRate,
        tokenData.metrics.stealthAccumulation || 0,
        tokenData.metrics.suspiciousPattern ? 1 : 0
    ].map(f => f === null ? 0 : f);

    return tf.tensor2d([features], [1, features.length]);
}

export async function analyzeToken(tokenData: TokenDataType): Promise<TokenMetricsType> {
    try {
        const features = preprocessFeatures(tokenData);
        const prediction = await model.predict(features) as tf.Tensor;
        const isRugPull = (await prediction.data())[0] > 0.5;

        const tokenMetrics: TokenMetricsType = formatTokenMetrics(tokenData.metrics);

        return tokenMetrics;
    } catch (error) {
        console.error('Error analyzing token:', error);
        throw error;
    }
} 


function calculateOverallRisk(token: TokenMetricsType): number {
    // Example: Average of all risk components
    const risks = [
        calculateLiquidityRisk(token),
        calculateConcentrationRisk(token),
        calculateVolatilityRisk(token),
        calculateSocialRisk(token),
        calculateTechnicalRisk(token)
    ];
    return risks.reduce((sum, risk) => sum + risk, 0) / risks.length;
}

function calculateLiquidityRisk(token: TokenMetricsType): number {
    // Example: Normalize liquidity score to a 0-1 scale
    return Math.min(Math.max(token.liquidityScore / 100, 0), 1);
}

function calculateConcentrationRisk(token: TokenMetricsType): number {
    // Example: Normalize holder concentration to a 0-1 scale
    return Math.min(Math.max(token.holderConcentration / 100, 0), 1);
}

function calculateVolatilityRisk(token: TokenMetricsType): number {
    // Example: Normalize price volatility to a 0-1 scale
    return Math.min(Math.max(token.priceVolatility / 100, 0), 1);
}

function calculateSocialRisk(token: TokenMetricsType): number {
    // Example: Binary risk based on rug pull status
    return token.isRugPull ? 1 : 0;
}

function calculateTechnicalRisk(token: TokenMetricsType): number {
    // Example: Binary risk based on suspicious pattern
    return token.suspiciousPattern ? 1 : 0;
} 

export function predictRisk(token: TokenMetricsType): RiskMetricsType {
    return {
        overall: calculateOverallRisk(token),
        liquidity: calculateLiquidityRisk(token),
        concentration: calculateConcentrationRisk(token),
        volatility: calculateVolatilityRisk(token),
        social: calculateSocialRisk(token),
        technical: calculateTechnicalRisk(token),
        totalTokens: 0,
        highRiskCount: 0,
        mediumRiskCount: 0,
        lowRiskCount: 0
    };
}