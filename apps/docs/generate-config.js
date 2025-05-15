#!/usr/bin/env node

// Script to generate scalar.json configuration with environment variables
const fs = require('fs');
const path = require('path');

// Default values
const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';

// Authentication credentials (should be set in environment variables in production)
const username = process.env.SCALAR_AUTH_USERNAME || 'admin';
const password = process.env.SCALAR_AUTH_PASSWORD || 'saas-starter';

// Create the scalar configuration
const scalarConfig = {
  openapi: './openapi.json',
  security: {
    // Basic authentication configuration
    basic: {
      username,
      password,
    },
  },
  theme: {
    colors: {
      primary: {
        main: '#3b82f6'
      }
    },
    sidebar: {
      width: '300px'
    }
  },
  metadata: {
    title: 'SaaS Starter API Documentation',
    description: 'API documentation for the SaaS Starter Kit',
    favicon: '/favicon.ico'
  },
  logo: {
    text: 'SaaS Starter API',
    altText: 'SaaS Starter Logo'
  },
  navbar: {
    links: [
      {
        name: 'Dashboard',
        url: `${frontendUrl}/dashboard`
      },
      {
        name: 'Website',
        url: frontendUrl
      }
    ]
  }
};

// Write the configuration to scalar.json
fs.writeFileSync(
  path.join(__dirname, 'scalar.json'),
  JSON.stringify(scalarConfig, null, 2)
);

console.log('Generated scalar.json with environment variables');
