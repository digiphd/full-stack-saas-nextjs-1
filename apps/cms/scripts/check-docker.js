#!/usr/bin/env node

const { execSync } = require('child_process');

// Simple console colors without dependencies
const colors = {
  green: (text) => `\x1b[32m${text}\x1b[0m`,
  red: (text) => `\x1b[31m${text}\x1b[0m`,
  yellow: (text) => `\x1b[33m${text}\x1b[0m`,
  blue: (text) => `\x1b[34m${text}\x1b[0m`
};

/**
 * Checks if Docker is running and provides helpful messages
 */
function checkDocker() {
  try {
    // Try to run a simple Docker command
    execSync('docker info', { stdio: 'ignore' });
    console.log(colors.green('✓ Docker is running'));
    return true;
  } catch (error) {
    console.log(colors.red('✗ Docker is not running'));
    console.log(colors.yellow('\nTo use Directus CMS, you need to start Docker first:'));
    console.log(colors.blue('\n1. Open Docker Desktop application'));
    console.log(colors.blue('2. Wait for Docker to start completely'));
    console.log(colors.blue('3. Run this command again\n'));
    
    console.log(colors.yellow('Alternatively, you can use a mock CMS for development:'));
    console.log(colors.blue('- Edit apps/cms/package.json to use a mock implementation'));
    console.log(colors.blue('- Or install Directus globally with npm install -g directus\n'));
    
    console.log(colors.yellow('For now, the rest of the application will continue to run without the CMS.'));
    return false;
  }
}

// If this file is run directly
if (require.main === module) {
  process.exit(checkDocker() ? 0 : 1);
}

module.exports = checkDocker;
