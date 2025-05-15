import { pgTable, serial, text, timestamp, boolean, uuid, varchar, jsonb } from 'drizzle-orm/pg-core';

// Users table (for storing additional user data beyond what Clerk provides)
export const users = pgTable('users', {
  id: uuid('id').primaryKey().notNull(),
  email: text('email').notNull().unique(),
  name: text('name'),
  clerkId: text('clerk_id').notNull().unique(),
  organizationId: uuid('organization_id').references(() => organizations.id),
  metadata: jsonb('metadata'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Organizations table
export const organizations = pgTable('organizations', {
  id: uuid('id').primaryKey().notNull(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  plan: text('plan').notNull().default('free'),
  clerkId: text('clerk_id').notNull().unique(),
  metadata: jsonb('metadata'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// API keys table
export const apiKeys = pgTable('api_keys', {
  id: uuid('id').primaryKey().notNull(),
  key: text('key').notNull().unique(),
  name: text('name').notNull(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  organizationId: uuid('organization_id').references(() => organizations.id),
  expiresAt: timestamp('expires_at'),
  lastUsedAt: timestamp('last_used_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Usage metrics table (for tracking API usage, etc.)
export const usageMetrics = pgTable('usage_metrics', {
  id: serial('id').primaryKey(),
  organizationId: uuid('organization_id').references(() => organizations.id).notNull(),
  metricName: text('metric_name').notNull(),
  count: serial('count').notNull().default(0),
  period: text('period').notNull(), // e.g., 'day', 'month', 'year'
  periodStart: timestamp('period_start').notNull(),
  periodEnd: timestamp('period_end').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Webhooks table (for tracking webhook deliveries)
export const webhooks = pgTable('webhooks', {
  id: uuid('id').primaryKey().notNull(),
  url: text('url').notNull(),
  secret: text('secret').notNull(),
  events: text('events').array().notNull(),
  organizationId: uuid('organization_id').references(() => organizations.id).notNull(),
  active: boolean('active').notNull().default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Webhook deliveries table
export const webhookDeliveries = pgTable('webhook_deliveries', {
  id: uuid('id').primaryKey().notNull(),
  webhookId: uuid('webhook_id').references(() => webhooks.id).notNull(),
  eventType: text('event_type').notNull(),
  payload: jsonb('payload').notNull(),
  status: text('status').notNull(), // 'success', 'failed', 'pending'
  statusCode: serial('status_code'),
  response: text('response'),
  error: text('error'),
  attemptCount: serial('attempt_count').notNull().default(0),
  nextAttemptAt: timestamp('next_attempt_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
