// Simple test script to verify QStash is working
const { Client } = require('@upstash/qstash');

// Initialize QStash client with the local server
const qstash = new Client({ 
  token: 'eyJVc2VySUQiOiJkZWZhdWx0VXNlciIsIlBhc3N3b3JkIjoiZGVmYXVsdFBhc3N3b3JkIn0=',
  baseUrl: 'http://127.0.0.1:8080'
});

async function testQStash() {
  try {
    // Send a test message to a sample endpoint
    const result = await qstash.publishJSON({
      url: 'https://jsonplaceholder.typicode.com/posts',
      body: {
        title: 'Test message from Node.js 23.x',
        body: 'This is a test message to verify QStash is working with Node.js 23.x',
        userId: 1
      }
    });

    console.log('Message sent successfully!');
    console.log('Message ID:', result.messageId);
  } catch (error) {
    console.error('Error sending message:', error);
  }
}

testQStash();
