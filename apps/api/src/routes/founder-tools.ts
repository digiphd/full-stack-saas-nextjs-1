import express, { Router } from 'express';
import { z } from 'zod';
import { generateBusinessIdeas } from '../services/openai';

// Create router with explicit type annotation
const router: Router = express.Router();

// Input validation schema for business idea generation
const GenerateIdeasSchema = z.object({
  userInput: z.string().min(1, "User input is required"),
  count: z.number().min(1).max(5).default(3),
});

// Generate business ideas endpoint
router.post('/generate-ideas', async (req, res) => {
  try {
    // Validate request body
    const result = GenerateIdeasSchema.safeParse(req.body);
    
    if (!result.success) {
      return res.status(400).json({
        error: 'Invalid request data',
        details: result.error.format(),
      });
    }
    
    const { userInput, count } = result.data;
    
    // Generate business ideas using OpenAI
    const ideas = await generateBusinessIdeas(userInput, count);
    
    // Return the ideas
    return res.json({ ideas });
  } catch (error) {
    console.error('Error generating business ideas:', error);
    return res.status(500).json({
      error: 'Failed to generate business ideas',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default router;
