import { Client } from '@upstash/qstash';
import { config } from 'dotenv';
import { z } from 'zod';

// Load environment variables
config();

// Define schemas for our workflow steps
const UserRegistrationSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  userId: z.string().optional(),
});

const EmailPayloadSchema = z.object({
  to: z.string().email(),
  subject: z.string(),
  html: z.string(),
});

const NotificationPayloadSchema = z.object({
  message: z.string(),
  type: z.string(),
  userId: z.string().optional(),
});

// Initialize QStash client
const qstashClient = new Client({
  token: process.env.QSTASH_TOKEN || 'eyJVc2VySUQiOiJkZWZhdWx0VXNlciIsIlBhc3N3b3JkIjoiZGVmYXVsdFBhc3N3b3JkIn0=',
  baseUrl: process.env.QSTASH_URL || 'https://qstash.upstash.io'
});

/**
 * User Registration Workflow
 * 
 * This workflow demonstrates how to use QStash to orchestrate a multi-step process:
 * 1. Register a user
 * 2. Send a welcome email
 * 3. Create user profile
 * 4. Send admin notification
 */
export class UserRegistrationWorkflow {
  /**
   * Start the user registration workflow
   */
  async start(data: z.infer<typeof UserRegistrationSchema>) {
    console.log(`Starting user registration workflow for ${data.name} (${data.email})`);
    
    try {
      // Validate input data
      const userData = UserRegistrationSchema.parse(data);
      
      // Step 1: Create user (this would typically be done in your API)
      const userId = userData.userId || `user_${Date.now()}`;
      console.log(`User created with ID: ${userId}`);
      
      // Step 2: Queue welcome email
      await this.queueWelcomeEmail({
        email: userData.email,
        name: userData.name,
        userId
      });
      
      // Step 3: Queue user profile creation
      await this.queueProfileCreation({
        email: userData.email,
        name: userData.name,
        userId
      });
      
      return {
        success: true,
        userId,
        message: 'User registration workflow started successfully'
      };
    } catch (error) {
      console.error('Error in user registration workflow:', error);
      throw error;
    }
  }
  
  /**
   * Queue welcome email
   */
  private async queueWelcomeEmail(userData: z.infer<typeof UserRegistrationSchema>) {
    console.log(`Queueing welcome email for ${userData.name} (${userData.email})`);
    
    const emailPayload = EmailPayloadSchema.parse({
      to: userData.email,
      subject: 'Welcome to Our Platform',
      html: `
        <h1>Welcome, ${userData.name}!</h1>
        <p>Thank you for registering with our platform.</p>
        <p>Your account has been created successfully.</p>
      `
    });
    
    // Queue email sending via QStash
    const result = await qstashClient.publishJSON({
      url: 'http://localhost:4001/api/email',
      body: emailPayload,
      delay: 1 // 1 second delay
    });
    
    console.log('Welcome email queued:', result);
    
    return { success: true, messageId: result.messageId };
  }
  
  /**
   * Queue user profile creation
   */
  private async queueProfileCreation(userData: z.infer<typeof UserRegistrationSchema>) {
    console.log(`Queueing profile creation for ${userData.name} (${userData.email})`);
    
    // Queue profile creation via QStash
    const result = await qstashClient.publishJSON({
      url: 'http://localhost:4001/api/create-profile',
      body: userData,
      delay: 5 // 5 second delay
    });
    
    console.log('Profile creation queued:', result);
    
    // Queue admin notification after profile creation
    await this.queueAdminNotification(userData);
    
    return { success: true, messageId: result.messageId };
  }
  
  /**
   * Queue admin notification
   */
  private async queueAdminNotification(userData: z.infer<typeof UserRegistrationSchema>) {
    console.log(`Queueing admin notification for new user: ${userData.name}`);
    
    const notificationPayload = NotificationPayloadSchema.parse({
      message: `New user registered: ${userData.name} (${userData.email})`,
      type: 'USER_REGISTRATION',
      userId: userData.userId
    });
    
    // Queue notification via QStash
    const result = await qstashClient.publishJSON({
      url: 'http://localhost:4001/api/notification',
      body: notificationPayload,
      delay: 10 // 10 second delay
    });
    
    console.log('Admin notification queued:', result);
    
    return { success: true, messageId: result.messageId };
  }
}

// Example usage
export async function runWorkflowExample() {
  const workflow = new UserRegistrationWorkflow();
  
  try {
    const result = await workflow.start({
      email: 'user@example.com',
      name: 'John Doe'
    });
    
    console.log('Workflow started successfully:', result);
    return result;
  } catch (error) {
    console.error('Error running workflow example:', error);
    throw error;
  }
}

// Run the example if this file is executed directly
if (require.main === module) {
  runWorkflowExample().catch(console.error);
}
