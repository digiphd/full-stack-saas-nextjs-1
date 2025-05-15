const fs = require('fs');
const path = require('path');
const { OpenAPIGenerator } = require('zod-to-openapi');
const { registry } = require('@saas-starter/types');

// Generate OpenAPI document
const openApiDocument = new OpenAPIGenerator(registry.definitions).generateDocument({
  info: {
    title: 'SaaS Starter API',
    version: '1.0.0',
    description: 'API for SaaS Starter Kit',
    contact: {
      name: 'SaaS Starter Team',
      url: 'https://github.com/yourusername/saas-starter',
    },
    license: {
      name: 'MIT',
      url: 'https://opensource.org/licenses/MIT',
    },
  },
  servers: [
    {
      url: 'http://localhost:4000',
      description: 'Local development server',
    },
  ],
  security: [
    {
      bearerAuth: [],
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
});

// Write to file
const docsDir = path.join(__dirname, '../docs');
const outputPath = path.join(docsDir, 'openapi.json');

try {
  fs.writeFileSync(outputPath, JSON.stringify(openApiDocument, null, 2));
  console.log(`OpenAPI schema generated successfully at ${outputPath}`);
} catch (error) {
  console.error('Failed to write OpenAPI schema to file:', error);
  process.exit(1);
}
