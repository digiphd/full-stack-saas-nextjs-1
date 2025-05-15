# Directus CMS for SaaS Starter Kit

This directory contains the configuration for running Directus CMS using Docker Compose locally and deploying to Fly.io for production.

## Local Development

### Prerequisites

- Docker and Docker Compose installed on your machine
- Basic understanding of Directus CMS

### Starting Directus Locally

To start Directus in development mode:

```bash
# From the apps/cms directory
pnpm dev

# Or from the project root
pnpm --filter="@saas-starter/cms" dev
```

This will start Directus in the foreground with logs visible. The CMS will be available at http://localhost:8055.

### Running in the Background

To run Directus in the background:

```bash
pnpm start
```

### Stopping Directus

To stop the running Directus instance:

```bash
pnpm stop
```

### Cleaning Up

To remove all data and reset Directus:

```bash
pnpm clean
```

## Default Admin Credentials

- **Email**: admin@example.com
- **Password**: admin123

⚠️ **Important**: Change these credentials immediately in a production environment!

## Production Deployment to Fly.io

This project is configured for deployment to Fly.io, which offers a generous free tier and simple scaling.

### Prerequisites

1. Install the Fly CLI: https://fly.io/docs/hands-on/install-flyctl/
2. Log in to Fly.io: `fly auth login`

### Deployment Steps

1. From the `apps/cms` directory, run:
   ```bash
   fly launch
   ```
   This will create a new app on Fly.io using the existing `fly.toml` configuration.

2. For production, set up a Neon PostgreSQL database and configure the connection as secrets:
   ```bash
   fly secrets set \
     DB_CLIENT=pg \
     DB_HOST=your-neon-host.neon.tech \
     DB_PORT=5432 \
     DB_DATABASE=your-database \
     DB_USER=your-username \
     DB_PASSWORD=your-password \
     DB_SSL=true
   ```

3. Deploy the application:
   ```bash
   fly deploy
   ```

4. Your Directus instance will be available at https://saas-starter-cms.fly.dev

### Volume Storage

Fly.io provides persistent volume storage for uploads. The configuration in `fly.toml` creates a volume named `directus_data` mounted at `/directus/uploads`.

## Configuration

The Directus configuration is defined in:
- `docker-compose.yml` for local development
- `Dockerfile` and `fly.toml` for production deployment

### Database Options

- **Development**: SQLite (default for simplicity)
- **Production**: PostgreSQL via Neon (recommended)

## Integration with the SaaS Starter Kit

The CMS is configured to work with the frontend and API services of the SaaS Starter Kit. The CORS settings allow requests from your application domains.

## Learn More

- [Directus Documentation](https://docs.directus.io/)
- [Fly.io Documentation](https://fly.io/docs/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
