import { TokenData } from '../../types/metrics';
import { analyzeToken } from '../../training/modelPredictor';

export async function analyzeTokens(tokens: TokenData[]): Promise<TokenData[]> {
    const results: TokenData[] = [];

    for (const token of tokens) {
        try {
            const metrics = await analyzeToken(token);
            results.push({
                ...token,
                metrics
            });
        } catch (error) {
            console.error(`Failed to analyze token ${token.address}:`, error);
        }
    }

    return results;
} 