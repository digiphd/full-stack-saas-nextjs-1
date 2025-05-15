import express from 'express';
import { config } from 'dotenv';
import { verifySignature } from './qstash-config';
import { z } from 'zod';
import { parseEnv } from './utils';
import { emailHandler } from './handlers/email';
import { llmContentHandler } from './handlers/llm-content';
import { ffmpegHandler } from './handlers/ffmpeg';
import { delayedSequenceHandler } from './handlers/delayed-sequence';

// Load environment variables
config();

// Define and validate environment variables
const env = parseEnv(
  z.object({
    PORT: z.string().default('4001'),
    QSTASH_CURRENT_SIGNING_KEY: z.string().min(1),
    QSTASH_NEXT_SIGNING_KEY: z.string().min(1),
  }),
  process.env
);

const app = express();
const port = parseInt(env.PORT, 10);

// Parse JSON request body
app.use(express.json());

// Health check endpoint
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Middleware to verify QStash signature
const verifyQStashSignature = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void | express.Response> => {
  try {
    const signature = req.headers['upstash-signature'] as string;
    
    if (!signature) {
      return res.status(401).json({ error: 'Missing signature' });
    }
    
    const isValid = await verifySignature(signature, JSON.stringify(req.body));
    
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid signature' });
    }
    
    next();
  } catch (error) {
    console.error('Error verifying signature:', error);
    return res.status(500).json({ error: 'Failed to verify signature' });
  }
};

// Email handler endpoint
app.post('/api/workflows/email', verifyQStashSignature, async (req, res) => {
  try {
    await emailHandler(req.body);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error processing email workflow:', error);
    res.status(500).json({ error: 'Failed to process email workflow' });
  }
});

// LLM content generation handler endpoint
app.post('/api/workflows/llm-content', verifyQStashSignature, async (req, res) => {
  try {
    await llmContentHandler(req.body);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error processing LLM content workflow:', error);
    res.status(500).json({ error: 'Failed to process LLM content workflow' });
  }
});

// FFmpeg processing handler endpoint
app.post('/api/workflows/ffmpeg', verifyQStashSignature, async (req, res) => {
  try {
    await ffmpegHandler(req.body);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error processing FFmpeg workflow:', error);
    res.status(500).json({ error: 'Failed to process FFmpeg workflow' });
  }
});

// Delayed sequence handler endpoint
app.post('/api/workflows/delayed-sequence', verifyQStashSignature, async (req, res) => {
  try {
    await delayedSequenceHandler(req.body);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error processing delayed sequence workflow:', error);
    res.status(500).json({ error: 'Failed to process delayed sequence workflow' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Workflows server running at http://localhost:${port}`);
});
