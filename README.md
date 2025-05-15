# Full-Stack SaaS Starter Kit

A production-ready B2B SaaS starter template for AI-powered applications.

## 🚀 Features

- 🔐 **Authentication**: Clerk with organization/team support (NextAuth fallback)
- 🎨 **CMS**: Directus for marketing pages and blog content
- 🧠 **Database**: Neon Postgres with Drizzle ORM
- ⚙️ **Backend API**: Express + tRPC + Zod with OpenAPI generation
- 🧾 **API Docs**: Scalar-hosted documentation
- 🔁 **Async Workflows**: Upstash Workflows for long-running tasks
- 💌 **Email**: Resend for transactional emails
- 📈 **Analytics**: PostHog for product analytics
- 🧪 **Type Safety**: End-to-end type safety between frontend and backend

## 📁 Project Structure

```
/apps
  /frontend       → Next.js (marketing, dashboard, auth UI)
  /api            → Express + Zod + tRPC backend
  /workflows      → Upstash Workflow handlers
  /cms            → Directus headless CMS configuration
  /docs           → Scalar, built from OpenAPI spec
  /scripts        → Helper scripts

/packages
  /types          → Shared Zod schemas + OpenAPI types
  /utils          → Shared fetchers, helpers, validators
```

## 🧰 Tech Stack

| Concern     | Tool                        |
|-------------|----------------------------|
| Frontend    | Next.js 14, Tailwind, ShadCN |
| CMS         | Directus                   |
| Auth        | Clerk (fallback: NextAuth) |
| API         | Express + tRPC + Zod       |
| DB          | Neon + Drizzle ORM         |
| Async/Queue | Upstash Workflow + QStash  |
| Emails      | Resend                     |
| API Docs    | Scalar + zod-to-openapi    |
| Analytics   | PostHog                    |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- PNPM
- Docker (for local development of CMS)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/saas-starter.git

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env

# Start development servers
pnpm dev
```

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```
AUTH_PROVIDER=clerk
QUEUE_PROVIDER=upstash
CMS_ENDPOINT=https://cms.yourdomain.com
FRONTEND_URL=https://app.yourdomain.com
RESEND_API_KEY=your_resend_api_key
NEON_DATABASE_URL=your_neon_db_url
CLERK_SECRET_KEY=your_clerk_secret_key
```

## 📄 Development Workflow

### Generate OpenAPI Docs

```bash
pnpm generate:openapi
```

### Revalidate Pages

After CMS updates, trigger revalidation:

```bash
curl -X POST https://app.yourdomain.com/api/revalidate?secret=your_secret&path=/blog/your-post-slug
```

## 📝 License

MIT
