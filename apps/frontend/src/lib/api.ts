/**
 * API client for interacting with the backend services
 * Provides a unified interface for both tRPC and REST API calls
 */

import { z } from 'zod';

// Business idea interface schema
export const BusinessIdeaSchema = z.object({
  title: z.string(),
  description: z.string(),
  score: z.number(),
  marketPotential: z.string(),
  implementationDifficulty: z.string(),
  timeToMvp: z.string(),
  revenueModel: z.string(),
  exitMultiple: z.string(),
});

export type BusinessIdea = z.infer<typeof BusinessIdeaSchema>;

// API client for founder tools
export const founderToolsApi = {
  // Generate business ideas
  generateBusinessIdeas: async (userInput: string, count: number = 3): Promise<BusinessIdea[]> => {
    try {
      // Call the Express API directly
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4005'}/api/founder-tools/generate-ideas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userInput, count }),
      });
      
      if (!response.ok) {
        // Fallback to the Next.js API route if Express API fails
        const fallbackResponse = await fetch('/api/generate-business-idea', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userInput }),
        });
        
        if (!fallbackResponse.ok) {
          throw new Error('Failed to generate ideas');
        }
        
        const fallbackData = await fallbackResponse.json();
        return fallbackData.ideas;
      }
      
      const data = await response.json();
      return data.ideas;
    } catch (error) {
      console.error('Error generating business ideas:', error);
      
      // Final fallback: use the Next.js API route
      const fallbackResponse = await fetch('/api/generate-business-idea', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userInput }),
      });
      
      if (!fallbackResponse.ok) {
        throw new Error('Failed to generate ideas');
      }
      
      const fallbackData = await fallbackResponse.json();
      return fallbackData.ideas;
    }
  }
};
