FROM directus/directus:latest

# Copy any extensions if needed
COPY ./extensions /directus/extensions

# Set environment variables
ENV KEY=255d861b-5ea1-5996-9aa3-922530ec40b1
ENV SECRET=6116487b-cda1-52c2-b5b5-c8022c45e263
ENV ADMIN_EMAIL=admin@example.com
ENV ADMIN_PASSWORD=admin123
ENV NODE_ENV=production
ENV CORS_ENABLED=true
ENV PUBLIC_URL=https://saas-starter-cms.fly.dev

# For SQLite (development)
ENV DB_CLIENT=sqlite3
ENV DB_FILENAME=/directus/database/data.db

# For PostgreSQL (production)
# ENV DB_CLIENT=pg
# ENV DB_HOST=your-neon-host.neon.tech
# ENV DB_PORT=5432
# ENV DB_DATABASE=your-database
# ENV DB_USER=your-username
# ENV DB_PASSWORD=your-password
# ENV DB_SSL=true

# Create volume directories
RUN mkdir -p /directus/database /directus/uploads

# Expose port
EXPOSE 8055

# Start Directus
CMD ["npx", "directus", "start"]
