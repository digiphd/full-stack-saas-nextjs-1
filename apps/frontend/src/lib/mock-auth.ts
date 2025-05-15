/**
 * Mock authentication provider for development
 * This file provides mock implementations of Clerk authentication
 * to allow development without requiring actual Clerk API keys
 */

// Mock the Clerk middleware to bypass authentication in development
export const mockClerkMiddleware = () => {
  // Monkey patch the Clerk middleware in development mode
  if (process.env.NODE_ENV === 'development') {
    try {
      // This is a hack to bypass Clerk authentication in development
      // It should only be used for local development, never in production
      const originalRequire = module.constructor.prototype.require;
      module.constructor.prototype.require = function (path: string) {
        if (path === '@clerk/nextjs') {
          return {
            authMiddleware: () => (req: any) => req,
            redirectToSignIn: () => null,
            ClerkProvider: ({ children }: { children: React.ReactNode }) => children,
            useAuth: () => ({
              isLoaded: true,
              userId: 'mock-user-id',
              sessionId: 'mock-session-id',
              getToken: async () => 'mock-token',
            }),
            useUser: () => ({
              isLoaded: true,
              isSignedIn: true,
              user: {
                id: 'mock-user-id',
                firstName: 'Mock',
                lastName: 'User',
                emailAddresses: [{ emailAddress: 'mock@example.com' }],
                primaryEmailAddress: { emailAddress: 'mock@example.com' },
              },
            }),
            SignIn: () => null,
            SignUp: () => null,
            SignedIn: ({ children }: { children: React.ReactNode }) => children,
            SignedOut: () => null,
          };
        }
        return originalRequire.call(this, path);
      };
      console.log('✅ Using mock authentication for development');
    } catch (error) {
      console.error('❌ Failed to set up mock authentication:', error);
    }
  }
};

// Call this function as early as possible in your application
mockClerkMiddleware();
