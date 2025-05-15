import { z } from 'zod';
import { qstashClient } from '../qstash-config';
import { parseEnv } from '../utils';

// Define and validate environment variables
// We're using the qstashClient from the config file, so we don't need to validate the token here
parseEnv(
  z.object({
    QSTASH_TOKEN: z.string().min(1).default('eyJVc2VySUQiOiJkZWZhdWx0VXNlciIsIlBhc3N3b3JkIjoiZGVmYXVsdFBhc3N3b3JkIn0='),
  }),
  process.env
);

// Use the QStash client from our configuration
const qstash = qstashClient;

// Define step schema
const StepSchema = z.object({
  url: z.string().url(),
  payload: z.record(z.any()),
  delay: z.number().nonnegative(), // Delay in seconds
});

// Define delayed sequence payload schema
const DelayedSequencePayloadSchema = z.object({
  steps: z.array(StepSchema),
  currentStepIndex: z.number().nonnegative().default(0),
  metadata: z.record(z.any()).optional(),
  callbackUrl: z.string().url().optional(),
});

type DelayedSequencePayload = z.infer<typeof DelayedSequencePayloadSchema>;

/**
 * Handler for processing a delayed sequence of steps
 * @param payload Delayed sequence payload
 * @returns Result of the current step processing
 */
export async function delayedSequenceHandler(payload: unknown): Promise<{ success: boolean; currentStep: number; totalSteps: number }> {
  try {
    // Validate payload
    const sequencePayload = DelayedSequencePayloadSchema.parse(payload);
    
    // Get current step
    const currentStepIndex = sequencePayload.currentStepIndex;
    const totalSteps = sequencePayload.steps.length;
    
    // Check if we're done with all steps
    if (currentStepIndex >= totalSteps) {
      console.log('All steps in the sequence completed');
      
      // If a callback URL is provided, send the final result there
      if (sequencePayload.callbackUrl) {
        try {
          await fetch(sequencePayload.callbackUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              success: true,
              completed: true,
              metadata: sequencePayload.metadata,
            }),
          });
          console.log('Sent final result to callback URL:', sequencePayload.callbackUrl);
        } catch (error) {
          console.error('Error sending final result to callback URL:', error);
        }
      }
      
      return { success: true, currentStep: currentStepIndex, totalSteps };
    }
    
    // Get current step
    const currentStep = sequencePayload.steps[currentStepIndex];
    console.log(`Processing step ${currentStepIndex + 1} of ${totalSteps}`);
    
    // Execute current step
    try {
      await fetch(currentStep.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(currentStep.payload),
      });
      
      console.log(`Step ${currentStepIndex + 1} executed successfully`);
    } catch (error) {
      console.error(`Error executing step ${currentStepIndex + 1}:`, error);
      throw error;
    }
    
    // Schedule next step if there are more steps
    if (currentStepIndex < totalSteps - 1) {
      // Prepare payload for next step
      const nextPayload: DelayedSequencePayload = {
        ...sequencePayload,
        currentStepIndex: currentStepIndex + 1,
      };
      
      // Get delay for next step
      const nextStep = sequencePayload.steps[currentStepIndex + 1];
      const delayMs = nextStep.delay * 1000; // Convert seconds to milliseconds
      
      // Schedule next step with QStash
      await qstash.publishJSON({
        url: '/api/workflows/delayed-sequence',
        body: nextPayload,
        delay: delayMs,
      });
      
      console.log(`Scheduled next step with ${delayMs}ms delay`);
    }
    
    return { success: true, currentStep: currentStepIndex, totalSteps };
  } catch (error) {
    console.error('Error in delayed sequence handler:', error);
    throw error;
  }
}
