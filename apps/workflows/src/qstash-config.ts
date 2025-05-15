import { Client } from '@upstash/qstash';
import { config } from 'dotenv';

// Load environment variables
config();

// Get QStash credentials from environment variables
const qstashToken = process.env.QSTASH_TOKEN || 'eyJVc2VySUQiOiJkZWZhdWx0VXNlciIsIlBhc3N3b3JkIjoiZGVmYXVsdFBhc3N3b3JkIn0=';
const qstashUrl = process.env.QSTASH_URL || 'http://127.0.0.1:8080';

// Initialize QStash client with the local server
export const qstashClient = new Client({ 
  token: qstashToken,
  baseUrl: qstashUrl
});

// Export verification function for QStash signatures
export const verifySignature = async (signature: string, _body: string): Promise<boolean> => {
  try {
    // These signing keys would be used in a real implementation
    // const signingKey = process.env.QSTASH_CURRENT_SIGNING_KEY || 'sig_7kYjw48mhY7kAjqNGcy6cr29RJ6r';
    // const nextKey = process.env.QSTASH_NEXT_SIGNING_KEY || 'sig_5ZB6DVzB1wjE8S6rZ7eenA8Pdnhs';
    
    // Verify the signature using the QStash signing keys
    // This is a simplified implementation for local development
    const [version] = signature.split(':');
    
    if (version !== 'v1') {
      console.warn(`Unsupported signature version: ${version}`);
      return false;
    }
    
    // For local development, we'll just return true
    // In production, you would verify the signature using the signing keys
    return true;
  } catch (error) {
    console.error('Error verifying signature:', error);
    return false;
  }
};
