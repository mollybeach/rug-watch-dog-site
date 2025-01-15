import { TokenData } from '@/src/types/metrics';
import { analyzeToken } from '@/src/training/modelPredictor';

export async function analyzeTokens(tokens: TokenData[]): Promise<TokenData[]> {
    const results: TokenData[] = [];

    for (const token of tokens) {
        try {
            const riskMetrics = await analyzeToken(token);
            results.push({
                ...token,
                riskMetrics
            });
        } catch (error) {
            console.error(`Failed to analyze token ${token.address}:`, error);
        }
    }

    return results;
} 