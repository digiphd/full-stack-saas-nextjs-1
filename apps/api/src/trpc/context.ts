import { inferAsyncReturnType } from '@trpc/server';
import { CreateExpressContextOptions } from '@trpc/server/adapters/express';
import { clerkClient } from '@clerk/clerk-sdk-node';

/**
 * Creates context for tRPC requests
 * This is where we can add request-specific data like the user's session
 */
export async function createContext({ req }: CreateExpressContextOptions) {
  // Get the session from the request
  const sessionToken = req.headers.authorization?.split(' ')[1];
  
  // Create a default context
  const defaultContext = {
    user: null,
    session: null,
    isAuthenticated: false,
  };

  // If no session token, return default context
  if (!sessionToken) {
    return defaultContext;
  }

  try {
    // Verify the session token with Clerk
    const session = await clerkClient.sessions.verifySession(sessionToken, sessionToken);
    
    // If session is valid, get the user
    if (session) {
      const user = await clerkClient.users.getUser(session.userId);
      
      return {
        user,
        session,
        isAuthenticated: true,
      };
    }
    
    return defaultContext;
  } catch (error) {
    console.error('Error verifying session:', error);
    return defaultContext;
  }
}

export type Context = inferAsyncReturnType<typeof createContext>;
