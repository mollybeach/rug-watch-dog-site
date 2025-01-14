// path: src/data-harvesting/chainMonitor.ts
import { TokenData, BaseMetrics } from '../types/metrics';
import { analyzeToken } from '../training/modelPredictor';

export class ChainMonitor {
    private async processToken(tokenData: TokenData): Promise<TokenData> {
        try {
            const metrics = await analyzeToken(tokenData);
            return {
                ...tokenData,
                metrics
            };
        } catch (error) {
            console.error(`Error processing token ${tokenData.address}:`, error);
            throw error;
        }
    }

    async monitorTokens(tokens: TokenData[]): Promise<TokenData[]> {
        const results: TokenData[] = [];
        
        for (const token of tokens) {
            try {
                const processedToken = await this.processToken(token);
                results.push(processedToken);
            } catch (error) {
                console.error(`Failed to monitor token ${token.address}:`, error);
            }
        }

        return results;
    }
} 