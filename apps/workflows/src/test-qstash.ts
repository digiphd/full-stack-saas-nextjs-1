import { Client } from '@upstash/qstash';
import { config } from 'dotenv';

// Load environment variables
config();

// This is a simple test script to demonstrate QStash integration
async function testQStash() {
  console.log('Testing QStash integration with Node.js 23.x...');
  
  // Initialize QStash client with the local server or remote server
  // For local development, we can use a mock token
  const qstashClient = new Client({
    token: process.env.QSTASH_TOKEN || 'eyJVc2VySUQiOiJkZWZhdWx0VXNlciIsIlBhc3N3b3JkIjoiZGVmYXVsdFBhc3N3b3JkIn0=',
    baseUrl: process.env.QSTASH_URL || 'https://qstash.upstash.io'
  });
  
  try {
    // Test 1: Simple message publishing
    console.log('\nTest 1: Publishing a simple message...');
    const publishResult = await qstashClient.publishJSON({
      url: 'https://example.com/api/webhook',
      body: {
        message: 'Hello from QStash!',
        timestamp: new Date().toISOString()
      }
    });
    
    console.log('Message published successfully!');
    console.log('Response:', JSON.stringify(publishResult, null, 2));
    
    // Test 2: Delayed message
    console.log('\nTest 2: Publishing a delayed message...');
    const delayedResult = await qstashClient.publishJSON({
      url: 'https://example.com/api/webhook',
      body: {
        message: 'This is a delayed message!',
        timestamp: new Date().toISOString()
      },
      delay: 60 // 60 seconds delay
    });
    
    console.log('Delayed message published successfully!');
    console.log('Response:', JSON.stringify(delayedResult, null, 2));
    
    // Test 3: Scheduled message
    console.log('\nTest 3: Publishing a scheduled message...');
    const scheduleTime = new Date();
    scheduleTime.setMinutes(scheduleTime.getMinutes() + 5); // 5 minutes from now
    
    const scheduledResult = await qstashClient.publishJSON({
      url: 'https://example.com/api/webhook',
      body: {
        message: 'This is a scheduled message!',
        timestamp: new Date().toISOString()
      },
      notBefore: Math.floor(scheduleTime.getTime() / 1000) // Convert to Unix timestamp (seconds)
    });
    
    console.log('Scheduled message published successfully!');
    console.log('Response:', JSON.stringify(scheduledResult, null, 2));
    console.log('Scheduled for:', scheduleTime.toISOString());
    
    console.log('\nAll tests completed successfully!');
    console.log('QStash is working correctly with Node.js 23.x');
    
  } catch (error) {
    console.error('Error testing QStash:', error);
  }
}

// Run the test
testQStash().catch(console.error);
