import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../../../../api/src/index.types';
import superjson from 'superjson';
import { inferRouterOutputs } from '@trpc/server';

// API URL from environment or default to localhost
const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4005';

// Create tRPC client
export const trpc = createTRPCProxyClient<AppRouter>({
  transformer: superjson,
  links: [
    httpBatchLink({
      url: `${apiUrl}/trpc`,
      // Optional: configure request headers
      headers: () => {
        return {
          'x-trpc-source': 'frontend',
        };
      },
    }),
  ],
});
