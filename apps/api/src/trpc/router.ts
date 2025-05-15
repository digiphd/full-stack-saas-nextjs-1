import { initTRPC, TRPCError } from '@trpc/server';
import { z } from 'zod';
import superjson from 'superjson';
import { Context } from './context';
import { generateBusinessIdeas } from '../services/openai';

// Initialize tRPC
const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

// Create a middleware to check if the user is authenticated
const isAuthenticated = t.middleware(({ ctx, next }) => {
  if (!ctx.isAuthenticated || !ctx.user) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'You must be logged in to access this resource',
    });
  }
  return next({
    ctx: {
      user: ctx.user,
      session: ctx.session,
    },
  });
});

// Create a router with the base context
export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthenticated);

// Define the app router with all procedures
// Use 'any' type to avoid dependency on Clerk's internal types
export const appRouter: any = router({
  // Public procedures
  health: publicProcedure.query(() => {
    return { status: 'ok', timestamp: new Date() };
  }),
  
  // Founder tools procedures
  founderTools: router({
    generateBusinessIdeas: publicProcedure
      .input(
        z.object({
          userInput: z.string(),
          count: z.number().min(1).max(5).default(3),
        })
      )
      .mutation(async ({ input }) => {
        try {
          const ideas = await generateBusinessIdeas(input.userInput, input.count);
          return { ideas };
        } catch (error) {
          console.error('Error generating business ideas:', error);
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Failed to generate business ideas',
            cause: error,
          });
        }
      }),
  }),
  
  // User procedures
  user: router({
    me: protectedProcedure.query(({ ctx }) => {
      return ctx.user;
    }),
    
    update: protectedProcedure
      .input(
        z.object({
          name: z.string().optional(),
          metadata: z.record(z.any()).optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        try {
          // This would use Clerk's API to update the user
          // For now, we'll just return the user with the updated fields
          return {
            ...ctx.user,
            ...input,
          };
        } catch (error) {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Failed to update user',
            cause: error,
          });
        }
      }),
  }),
  
  // Blog post procedures (example for CMS integration)
  blog: router({
    list: publicProcedure
      .input(
        z.object({
          limit: z.number().min(1).max(100).default(10),
          cursor: z.string().optional(),
        })
      )
      .query(async (_input) => {
        // This would fetch from the CMS or database
        // For now, return mock data
        return {
          items: [
            {
              id: '1',
              title: 'Getting Started with the SaaS Starter Kit',
              slug: 'getting-started',
              content: 'This is a sample blog post content...',
              summary: 'Learn how to get started with our SaaS Starter Kit',
              tags: ['tutorial', 'getting-started'],
              published: true,
              publishedAt: new Date(),
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ],
          nextCursor: null,
        };
      }),
      
    bySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async (opts) => {
        // This would fetch from the CMS or database
        // For now, return mock data if slug matches
        if (opts.input.slug === 'getting-started') {
          return {
            id: '1',
            title: 'Getting Started with the SaaS Starter Kit',
            slug: 'getting-started',
            content: 'This is a sample blog post content...',
            summary: 'Learn how to get started with our SaaS Starter Kit',
            tags: ['tutorial', 'getting-started'],
            published: true,
            publishedAt: new Date(),
            createdAt: new Date(),
            updatedAt: new Date(),
          };
        }
        
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Blog post not found',
        });
      }),
  }),
  
  // Email procedures (example for Resend integration)
  email: router({
    send: protectedProcedure
      .input(
        z.object({
          to: z.string().email(),
          subject: z.string(),
          text: z.string(),
          html: z.string().optional(),
        })
      )
      .mutation(async (opts) => {
        try {
          // This would use Resend to send an email
          // For now, just log and return success
          console.log('Sending email:', opts.input);
          return { success: true };
        } catch (error) {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Failed to send email',
            cause: error,
          });
        }
      }),
  }),
});

// Export type definition of API
export type AppRouter = typeof appRouter;
