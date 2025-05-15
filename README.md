# Full-Stack SaaS Starter Kit

A Monorepo B2B SaaS starter template for AI-powered microservices.

> **Implementation Note**: This is a starter template with some components fully implemented and others in various stages of implementation. See the "Current Implementation Status" section for details.

## 🚀 Features

- 🔐 **Authentication**: Clerk with organization/team support (NextAuth fallback)
- 🎨 **CMS**: Directus in Docker container (integration in progress)
- 🧠 **Database**: Neon Postgres with Drizzle ORM
- ⚙️ **Backend API**: Express + tRPC + Zod with OpenAPI generation
- 🧾 **API Docs**: Scalar-hosted documentation
- 🔁 **Async Workflows**: Upstash Workflows framework (implementation in progress)
- 💌 **Email**: Resend for transactional emails (with development mode)
- 📈 **Analytics**: PostHog for product analytics
- 🧪 **Type Safety**: End-to-end type safety between frontend and backend

## 📁 Project Structure

```
/apps
  /frontend       → Next.js (marketing, dashboard, auth UI)
  /api            → Express + Zod + tRPC backend
  /workflows      → Upstash Workflow handlers
  /cms            → Directus headless CMS configuration (Docker)
  /docs           → Scalar, built from OpenAPI spec
  /scripts        → Helper scripts

/packages
  /types          → Shared Zod schemas + OpenAPI types
  /utils          → Shared fetchers, helpers, validators
```

## 🧰 Tech Stack

| Concern     | Tool                        | Status                   |
|-------------|----------------------------|--------------------------|  
| Frontend    | Next.js 14, Tailwind, ShadCN | Fully implemented       |
| CMS         | Directus (Docker)          | Container setup complete, content integration in progress |
| Auth        | Clerk (fallback: NextAuth) | Fully implemented       |
| API         | Express + tRPC + Zod       | Fully implemented       |
| DB          | Neon + Drizzle ORM         | Fully implemented       |
| Async/Queue | Upstash Workflow + QStash  | Framework setup, implementation in progress |
| Emails      | Resend                     | Implemented with dev mode |
| API Docs    | Scalar + zod-to-openapi    | Fully implemented       |
| Analytics   | PostHog                    | Configuration ready     |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- PNPM
- Docker (for local development of Directus CMS)

### Installation

```bash
# Clone the repository
git clone https://github.com/digiphd/full-stack-saas-nextjs-1.git

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env

# Start development servers (including Directus CMS in Docker)
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

### Local Directus CMS

The Directus CMS runs in a Docker container locally for development. When you run `pnpm dev`, the container will be started automatically.

> **Note**: While the Directus container is fully functional, the integration with blog and marketing pages is still in progress. The frontend currently uses mock data for these sections.

### Current Implementation Status

#### Blog and Marketing Pages
- The blog currently uses hardcoded mock data
- Directus integration is planned but not fully implemented
- Revalidation API routes are set up for future CMS integration

#### Upstash Workflows
- Framework and handlers are set up
- Uses placeholder/mock configurations for local development
- Requires additional configuration for production use

#### Email with Resend
- Fully implemented with proper configuration
- Development mode logs emails instead of sending them
- Ready for production with proper API keys

### Deployment Options

#### Directus CMS Deployment

For production deployment of Directus CMS, you have several options:

- **fly.io**: A cost-effective on-demand service that's easy to set up and scale. Recommended for most use cases.
- **Self-hosted Docker**: Deploy the Docker container to your own infrastructure.
- **Directus Cloud**: Official managed service from Directus (https://directus.cloud).

### Revalidate Pages

After CMS updates, trigger revalidation (once CMS integration is complete):

```bash
curl -X POST https://app.yourdomain.com/api/revalidate?secret=your_secret&path=/blog/your-post-slug
```

## 👥 Contributing

Contributions to this project are managed through a controlled process. Please read our [CONTRIBUTING.md](/CONTRIBUTING.md) file for details on how to request access to contribute.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](/LICENSE) file for details.

## ⚠️ Disclaimer

This software is provided "as is", without warranty of any kind, express or implied. The authors or copyright holders shall not be liable for any claim, damages or other liability arising from the use of the software. No support or maintenance will be provided for this template.
