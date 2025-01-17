import { Router } from 'express';
import { getTokenStats } from '../../data-processing/metrics';
const router = Router();
router.get('/stats', async (_req, res) => {
    try {
        const stats = await getTokenStats();
        res.json(stats);
    }
    catch (error) {
        console.error('Error fetching stats:', error);
        res.status(500).json({ error: 'Error fetching statistics' });
    }
});
export default router;
