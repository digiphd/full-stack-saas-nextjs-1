import { clerkMiddleware } from '@clerk/nextjs/server';

// Use the simplified middleware approach for Clerk v6
export default clerkMiddleware();

// Define the routes to protect in the config
export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next|[^?]*\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
    // Skip public routes
    '/((?!|sign-in|sign-up|api/webhook|api/revalidate|blog|pricing|features|about|contact|privacy|terms|docs).*)',
  ],
};
