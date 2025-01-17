import { analyzeToken } from '../training/modelPredictor';
export class ChainMonitor {
    async processToken(tokenData) {
        try {
            const metrics = await analyzeToken(tokenData);
            return {
                ...tokenData,
                metrics
            };
        }
        catch (error) {
            console.error(`Error processing token ${tokenData.address}:`, error);
            throw error;
        }
    }
    async monitorTokens(tokens) {
        const results = [];
        for (const token of tokens) {
            try {
                const processedToken = await this.processToken(token);
                results.push(processedToken);
            }
            catch (error) {
                console.error(`Failed to monitor token ${token.address}:`, error);
            }
        }
        return results;
    }
}
