// path: src/index.ts
import express from 'express';
const cors = require('cors');
import { createClient } from 'edgedb';
import edgeql from '@/dbschema/edgeql-js';
import trainingRoutes from '@/api/routes/training';
import tokens from '@/api/routes/tokens';
import tokenRoutes from '@/api/routes/tokenRoutes';

import { SAMPLE_TOKENS } from '@/db/seeders/seeds';

const edgeDBCloudClient = createClient({
    instanceName: 'mollybeach/rug-watch-dog-db',
    secretKey: process.env.EDGE_SECRET_KEY
});

const localClient = createClient();

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/training', trainingRoutes);
app.use('/api/tokens', tokens);
app.use('/api/tokenRoutes', tokenRoutes);

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something broke!' });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
// show sample tokens on /
app.get("/", async (req, res) => {
    const queryString = JSON.stringify(SAMPLE_TOKENS);
    const result = await edgeDBCloudClient.query(queryString);
    res.send(result);
});

// Run query
export async function runQuery(query: string) {
    const result = await edgeDBCloudClient.query(query);
    return result;
}

// Test connection
export async function testConnection() {
    try {
        await edgeDBCloudClient.ensureConnected();
        console.log('✅ EdgeDB connection successful');
    } catch (error) {
        console.error('❌ EdgeDB connection failed:', error);
    }
}

export { edgeDBCloudClient, localClient, edgeql }; 