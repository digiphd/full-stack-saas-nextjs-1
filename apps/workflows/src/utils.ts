import { z } from 'zod';

/**
 * Parse and validate environment variables
 * @param schema - Zod schema for environment variables
 * @param env - Environment variables object
 * @returns Validated environment variables
 */
export function parseEnv<T extends z.ZodTypeAny>(
  schema: T,
  env: Record<string, any> = process.env
): z.infer<T> {
  try {
    // Parse and validate environment variables
    return schema.parse(env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.errors
        .filter((e) => e.code === 'invalid_type' && e.received === 'undefined')
        .map((e) => e.path.join('.'));

      if (missingVars.length > 0) {
        console.error(`Missing environment variables: ${missingVars.join(', ')}`);
      }

      const invalidVars = error.errors
        .filter((e) => e.code !== 'invalid_type' || e.received !== 'undefined')
        .map((e) => `${e.path.join('.')}: ${e.message}`);

      if (invalidVars.length > 0) {
        console.error(`Invalid environment variables: ${invalidVars.join(', ')}`);
      }
    } else {
      console.error('Error parsing environment variables:', error);
    }

    // Provide default values for missing or invalid variables
    return schema.parse(env);
  }
}
