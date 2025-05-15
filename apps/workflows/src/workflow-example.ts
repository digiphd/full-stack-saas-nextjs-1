// Upstash workflow integration
import { qstashClient } from './qstash-config';
import { config } from 'dotenv';

// Load environment variables
config();

// Define a simple workflow example using QStash
const processUserRegistration = async (userData: { email: string; name: string }) => {
  const { email, name } = userData;
  console.log(`Processing user registration for ${name} (${email})`);
  
  // Step 1: Send welcome email
  try {
    console.log(`[Step 1] Sending welcome email to ${name} at ${email}`);
    
    // In a real implementation, you would call your email handler here
    await qstashClient.publishJSON({
      url: 'http://localhost:4001/api/email',
      body: {
        to: email,
        subject: 'Welcome to Our Platform',
        html: `<h1>Welcome, ${name}!</h1><p>Thank you for registering with our platform.</p>`
      },
      delay: 1, // 1 second delay
    });
    
    console.log('Welcome email queued successfully');
  } catch (error) {
    console.error('Error sending welcome email:', error);
    throw error;
  }
  
  // Step 2: Create user profile
  try {
    console.log(`[Step 2] Creating profile for ${name}`);
    
    // Simulate profile creation
    const profile = {
      id: `user_${Date.now()}`,
      email,
      name,
      createdAt: new Date().toISOString(),
    };
    
    console.log('User profile created:', profile);
    
    // Step 3: Send notification to admin
    await qstashClient.publishJSON({
      url: 'http://localhost:4001/api/notification',
      body: {
        message: `New user registered: ${profile.name} (${profile.email})`,
        type: 'USER_REGISTRATION',
        userId: profile.id
      },
      delay: 5, // 5 second delay
    });
    
    console.log('Admin notification queued successfully');
    
    return { success: true, profile };
  } catch (error) {
    console.error('Error in user registration process:', error);
    throw error;
  }
};

export { processUserRegistration };
