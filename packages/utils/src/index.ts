import { z } from 'zod';
import { ApiError } from '@saas-starter/types';

/**
 * Fetch wrapper with error handling and type safety
 * @param url - The URL to fetch from
 * @param options - Fetch options
 * @param schema - Zod schema for response validation
 * @returns Validated response data
 */
export async function fetchWithValidation<T>(
  url: string,
  options: RequestInit = {},
  schema: z.ZodType<T>
): Promise<T> {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw {
        code: errorData.code || 'UNKNOWN_ERROR',
        message: errorData.message || 'An unknown error occurred',
        details: errorData.details,
      } as ApiError;
    }

    const data = await response.json();
    return schema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw {
        code: 'VALIDATION_ERROR',
        message: 'Response validation failed',
        details: { errors: error.errors },
      } as ApiError;
    }
    throw error;
  }
}

/**
 * Format date to a human-readable string
 * @param date - Date to format
 * @param options - Intl.DateTimeFormat options
 * @returns Formatted date string
 */
export function formatDate(
  date: Date | string | number,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
): string {
  const dateObj = date instanceof Date ? date : new Date(date);
  return new Intl.DateTimeFormat('en-US', options).format(dateObj);
}

/**
 * Generate a slug from a string
 * @param str - String to convert to slug
 * @returns Slugified string
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Truncate a string to a specified length
 * @param str - String to truncate
 * @param length - Maximum length
 * @param suffix - Suffix to add if truncated
 * @returns Truncated string
 */
export function truncate(str: string, length: number, suffix = '...'): string {
  if (str.length <= length) return str;
  return str.substring(0, length).trim() + suffix;
}

/**
 * Debounce a function
 * @param fn - Function to debounce
 * @param ms - Debounce delay in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  ms = 300
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
}

/**
 * Parse and validate environment variables
 * @param schema - Zod schema for environment variables
 * @param env - Environment variables object
 * @returns Validated environment variables
 */
export function parseEnv<T extends Record<string, any>>(
  schema: z.ZodType<T>,
  env: Record<string, any> = process.env
): T {
  try {
    return schema.parse(env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.errors
        .filter((e) => e.code === 'invalid_type' && e.received === 'undefined')
        .map((e) => e.path.join('.'));
      
      if (missingVars.length > 0) {
        throw new Error(
          `Missing required environment variables: ${missingVars.join(', ')}`
        );
      }
    }
    throw error;
  }
}

/**
 * Generate a random string
 * @param length - Length of the string
 * @returns Random string
 */
export function generateRandomString(length = 32): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = chars.length;
  
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * charactersLength));
  }
  
  return result;
}

/**
 * Safely access nested object properties
 * @param obj - Object to access
 * @param path - Path to property
 * @param defaultValue - Default value if property doesn't exist
 * @returns Property value or default value
 */
export function get<T>(
  obj: Record<string, any>,
  path: string,
  defaultValue?: T
): T | undefined {
  const travel = (regexp: RegExp, obj: Record<string, any>): any =>
    String.prototype.split
      .call(path, regexp)
      .filter(Boolean)
      .reduce((res, key) => (res !== null && res !== undefined ? res[key] : res), obj);
  
  const result = travel(/[,[\]]+?/g, obj);
  return result === undefined || result === obj ? defaultValue : result;
}

export {
  z,
};
