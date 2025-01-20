import { TokenDataType } from '@/src/types/data';
import { analyzeToken } from '@/src/training/modelPredictor';

export async function analyzeTokens(tokens: TokenDataType[]): Promise<TokenDataType[]> {
    const results: TokenDataType[] = [];

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