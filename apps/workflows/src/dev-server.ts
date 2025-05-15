import express from 'express';
import dotenv from 'dotenv';
import { z } from 'zod';
import { parseEnv } from './utils';
import { emailHandler } from './handlers/email';
import { llmContentHandler } from './handlers/llm-content';
import { ffmpegHandler } from './handlers/ffmpeg';
import { delayedSequenceHandler } from './handlers/delayed-sequence';

// Load environment variables
dotenv.config();

// Define and validate environment variables
const env = parseEnv(
  z.object({
    PORT: z.string().default('4003'), // Using port 4003 to avoid conflicts
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

// Development-only endpoints without signature verification
// These are for local testing only

// Email handler endpoint
app.post('/dev/workflows/email', async (req, res) => {
  try {
    const result = await emailHandler(req.body);
    res.status(200).json({ success: true, result });
  } catch (error) {
    console.error('Error processing email workflow:', error);
    res.status(500).json({ error: 'Failed to process email workflow' });
  }
});

// LLM content generation handler endpoint
app.post('/dev/workflows/llm-content', async (req, res) => {
  try {
    const result = await llmContentHandler(req.body);
    res.status(200).json({ success: true, result });
  } catch (error) {
    console.error('Error processing LLM content workflow:', error);
    res.status(500).json({ error: 'Failed to process LLM content workflow' });
  }
});

// FFmpeg processing handler endpoint
app.post('/dev/workflows/ffmpeg', async (req, res) => {
  try {
    const result = await ffmpegHandler(req.body);
    res.status(200).json({ success: true, result });
  } catch (error) {
    console.error('Error processing FFmpeg workflow:', error);
    res.status(500).json({ error: 'Failed to process FFmpeg workflow' });
  }
});

// Delayed sequence handler endpoint
app.post('/dev/workflows/delayed-sequence', async (req, res) => {
  try {
    const result = await delayedSequenceHandler(req.body);
    res.status(200).json({ success: true, result });
  } catch (error) {
    console.error('Error processing delayed sequence workflow:', error);
    res.status(500).json({ error: 'Failed to process delayed sequence workflow' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Workflows dev server running at http://localhost:${port}`);
  console.log('Available endpoints for local testing:');
  console.log('- POST /dev/workflows/email');
  console.log('- POST /dev/workflows/llm-content');
  console.log('- POST /dev/workflows/ffmpeg');
  console.log('- POST /dev/workflows/delayed-sequence');
});
