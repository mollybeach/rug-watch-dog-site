import express from 'express';
const cors = require('cors');
import { normalizeFeatures } from './data-processing/parser';
import { BaseMetrics } from './types/metrics';
import trainingRoutes from './api/routes/training';
import tokensRoutes from './api/routes/tokens';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/training', trainingRoutes);
app.use('/api/tokens', tokensRoutes);

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something broke!' });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});