import { Router } from 'express';
import { TokenService } from '../../db/services/TokenService';
const router = Router();
const tokenService = new TokenService();
// Get token details with latest metrics and price
router.get('/:address', async (req, res) => {
    try {
        const token = await tokenService.getTokenWithLatestData(req.params.address);
        if (!token) {
            return res.status(404).json({ error: 'Token not found' });
        }
        res.json(token);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch token data' });
    }
});
// Get token metrics history
router.get('/:address/metrics', async (req, res) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit) : 100;
        const metrics = await tokenService.getTokenMetricsHistory(req.params.address, limit);
        res.json(metrics);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch token metrics' });
    }
});
// Get token price history
router.get('/:address/prices', async (req, res) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit) : 100;
        const prices = await tokenService.getTokenPriceHistory(req.params.address, limit);
        res.json(prices);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch token prices' });
    }
});
// Get all monitored tokens
router.get('/', async (_req, res) => {
    try {
        const tokens = await tokenService.getAllTokens();
        res.json(tokens);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch tokens' });
    }
});
export default router;
