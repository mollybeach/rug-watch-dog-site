// src/api/server.ts

import express from 'express';
import { createClient } from 'edgedb';
import tokenRoutes from './routes/tokenRoutes';

const app = express();
app.use(express.json());

const edgedbClient = createClient();

app.get("/", async (req, res) => {
    const result = await edgedbClient.querySingle(`
    SELECT 'Hello from EdgeDB!';
    `);
    res.send(result);
});


// Use token routes
app.use('/api/tokens', tokenRoutes);

app.listen(3000, () => {
    console.log(`Server is running at http://localhost:3000`);
});


