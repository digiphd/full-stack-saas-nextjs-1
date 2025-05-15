import { z } from 'zod';
import { OpenAPIRegistry, extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

// Extend Zod with OpenAPI functionality
extendZodWithOpenApi(z);

// Initialize OpenAPI registry for schema generation
export const registry = new OpenAPIRegistry();

// User schema
export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  organizationId: z.string().uuid().optional(),
});

// Register User schema in OpenAPI registry
registry.register('User', UserSchema);

export type User = z.infer<typeof UserSchema>;

// Organization schema
export const OrganizationSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  slug: z.string(),
  plan: z.enum(['free', 'pro', 'enterprise']),
  createdAt: z.date(),
  updatedAt: z.date(),
});

registry.register('Organization', OrganizationSchema);

export type Organization = z.infer<typeof OrganizationSchema>;

// Blog post schema (for CMS)
export const BlogPostSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  slug: z.string(),
  content: z.string(),
  summary: z.string().optional(),
  tags: z.array(z.string()).optional(),
  published: z.boolean().default(false),
  publishedAt: z.date().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

registry.register('BlogPost', BlogPostSchema);

export type BlogPost = z.infer<typeof BlogPostSchema>;

// Page schema (for CMS)
export const PageSchema = z.object({
  id: z.string().uuid(),
  slug: z.string(),
  heroTitle: z.string(),
  sections: z.array(z.any()), // This would be more structured in a real app
  layout: z.enum(['default', 'wide', 'landing']),
  createdAt: z.date(),
  updatedAt: z.date(),
});

registry.register('Page', PageSchema);

export type Page = z.infer<typeof PageSchema>;

// API Error schema
export const ApiErrorSchema = z.object({
  code: z.string(),
  message: z.string(),
  details: z.record(z.any()).optional(),
});

registry.register('ApiError', ApiErrorSchema);

export type ApiError = z.infer<typeof ApiErrorSchema>;

// Pagination schema
export const PaginationSchema = z.object({
  page: z.number().int().positive(),
  limit: z.number().int().positive().max(100),
  totalItems: z.number().int().nonnegative(),
  totalPages: z.number().int().positive(),
});

registry.register('Pagination', PaginationSchema);

export type Pagination = z.infer<typeof PaginationSchema>;

// Export all schemas and types
export {
  z,
};
