import express from 'express';
import { config } from 'dotenv';
import { z } from 'zod';
import { parseEnv } from './utils';
import { processUserRegistration } from './workflow-example';

// Load environment variables
config();

// Define and validate environment variables
const env = parseEnv(
  z.object({
    PORT: z.string().default('4002'),
  }),
  process.env
);

const app: express.Application = express();
const port = parseInt(env.PORT, 10);

// Parse JSON request body
app.use(express.json());

// Health check endpoint
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Endpoint to trigger the user registration workflow
app.post('/api/workflows/user-registration', async (req, res) => {
  try {
    const userSchema = z.object({
      email: z.string().email(),
      name: z.string().min(1),
    });
    
    const userData = userSchema.parse(req.body);
    
    // Start the workflow process
    const result = await processUserRegistration(userData);
    
    return res.status(200).json({
      message: 'User registration workflow completed successfully',
      result,
    });
  } catch (error) {
    console.error('Error processing user registration:', error);
    
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        error: 'Invalid input', 
        details: error.errors 
      });
    }
    
    return res.status(500).json({ 
      error: 'Failed to process user registration',
      message: error instanceof Error ? error.message : String(error)
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Workflow API server running at http://localhost:${port}`);
  console.log('Available endpoints:');
  console.log('  - POST /api/workflows/user-registration');
});

export default app;
