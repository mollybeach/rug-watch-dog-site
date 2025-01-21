// path: src/data-harvesting/chainMonitor.ts
import { TokenDataType } from '../../types/data';

import { fetchTokenData } from './fetcher';
export class ChainMonitor {
    private async processToken(tokenData: TokenDataType): Promise<TokenDataType> {
        try {
            
            const metrics = await fetchTokenData(tokenData.address, "ethereum");
            const risk = await fetchTokenData(tokenData.address, "ethereum");
            return {
                ...tokenData,
                metrics: metrics?.metrics || tokenData.metrics,
                risk: risk?.risk || tokenData.risk
            };
        } catch (error) {
            console.error(`Error processing token ${tokenData.address}:`, error);
            throw error;
        }
    }

    async monitorTokens(tokens: TokenDataType[]): Promise<TokenDataType[]> {
        const results: TokenDataType[] = [];
        
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