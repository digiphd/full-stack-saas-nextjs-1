const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const basicAuth = require('express-basic-auth');
const { spawn } = require('child_process');
const path = require('path');

// Get authentication credentials from environment variables or use defaults
const username = process.env.SCALAR_AUTH_USERNAME || 'admin';
const password = process.env.SCALAR_AUTH_PASSWORD || 'saas-starter';

// Create Express server
const app = express();

// Add basic authentication
app.use(basicAuth({
  users: { [username]: password },
  challenge: true,
  realm: 'SaaS Starter API Documentation',
}));

// Start Scalar in the background on a different port
const scalarPort = 9001;
const scalarProcess = spawn('npx', ['@scalar/cli', 'serve', 'openapi.json', '--port', scalarPort], {
  stdio: 'inherit',
  cwd: path.join(__dirname),
});

// Handle cleanup on exit
process.on('exit', () => {
  scalarProcess.kill();
});

process.on('SIGINT', () => {
  scalarProcess.kill();
  process.exit();
});

// Proxy requests to Scalar
app.use('/', createProxyMiddleware({
  target: `http://localhost:${scalarPort}`,
  changeOrigin: true,
  ws: true,
}));

// Start the server
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`API Documentation server with authentication running on http://localhost:${PORT}`);
  console.log(`Username: ${username}`);
  console.log(`Password: ${password}`);
});
