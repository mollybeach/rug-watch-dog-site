import type { TokenMetricsType, RiskMetricsType } from '@/src/types/data';

export function predictRisk(token: TokenMetricsType): RiskMetricsType {
    return {
        overall: calculateOverallRisk(token),
        liquidity: calculateLiquidityRisk(token),
        concentration: calculateConcentrationRisk(token),
        volatility: calculateVolatilityRisk(token),
        social: calculateSocialRisk(token),
        technical: calculateTechnicalRisk(token)
    };
}

export async function analyzeToken(token: TokenMetricsType): Promise<RiskMetricsType> {
    // If there's any asynchronous operation, include it here. Otherwise, wrap predictRisk.
    return predictRisk(token);
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