import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { writeFileSync } from 'fs';
import path from 'path';
import { appRouter } from './trpc/router';
import { createContext } from './trpc/context';
import founderToolsRoutes from './routes/founder-tools';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 4005; // Using port 4005 to avoid conflicts

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

// tRPC API endpoint
app.use(
  '/trpc',
  createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

// REST API routes
app.use('/api/founder-tools', founderToolsRoutes);

// Generate OpenAPI schema
// Simplify OpenAPI generation for development
const openApiDocument = {
  openapi: '3.0.0',
  info: {
    title: 'SaaS Starter API',
    version: '1.0.0',
    description: 'API for SaaS Starter Kit',
  },
  servers: [{ url: 'http://localhost:4000' }],
  paths: {},
  components: {
    schemas: {}
  }
};

// Serve OpenAPI schema
app.get('/openapi.json', (_req, res) => {
  res.json(openApiDocument);
});

// Write OpenAPI schema to file for Scalar docs
try {
  const docsDir = path.join(__dirname, '../../../docs');
  writeFileSync(
    path.join(docsDir, 'openapi.json'),
    JSON.stringify(openApiDocument, null, 2)
  );
  console.log('OpenAPI schema generated successfully');
} catch (error) {
  console.error('Failed to write OpenAPI schema to file', error);
}

// Start server
app.listen(port, () => {
  console.log(`API server running at http://localhost:${port}`);
});
