import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import { z } from 'zod';
import { parseEnv } from '@saas-starter/utils';

// Define and validate environment variables
const env = parseEnv(
  z.object({
    NEON_DATABASE_URL: z.string().min(1),
  }),
  process.env
);

// Create postgres client
const client = postgres(env.NEON_DATABASE_URL);

// Create drizzle database instance
export const db = drizzle(client, { schema });

// Export schema
export { schema };
