import { qstashClient } from './qstash-config';
import { config } from 'dotenv';

// Load environment variables
config();

async function testWorkflow() {
  try {
    console.log('🚀 Testing Upstash Workflow integration...');
    
    // Test user registration workflow
    const userId = `user_${Date.now()}`;
    const testUser = {
      id: userId,
      email: 'test@example.com',
      name: 'Test User',
      createdAt: new Date().toISOString()
    };
    
    console.log(`📝 Triggering user registration workflow for user: ${testUser.id}`);
    
    // Send the workflow request
    const response = await qstashClient.publishJSON({
      url: 'http://localhost:4001/api/workflows/user-registration',
      body: {
        user: testUser
      },
    });
    
    console.log('✅ Workflow request sent successfully!');
    console.log(`📊 Message ID: ${response.messageId}`);
    
    console.log('\n🧪 Testing completed successfully!');
  } catch (error) {
    console.error('❌ Error testing workflow:', error);
  }
}

// Run the test
testWorkflow();
