/**
 * Bootstrap script for Directus CMS with Docker
 * 
 * This script provides information about using Directus with Docker
 * and can be extended to perform initial setup tasks if needed.
 */

console.log('Directus CMS with Docker');
console.log('\nDocker Configuration:');
console.log('- Directus will be available at: http://localhost:8055');
console.log('- Default admin credentials: admin@example.com / admin123');
console.log('- Data is stored in the ./database, ./uploads, and ./extensions directories');

console.log('\nUsage:');
console.log('- Start Directus: pnpm dev');
console.log('- Start in background: pnpm start');
console.log('- Stop Directus: pnpm stop');
console.log('- Clean up data: pnpm clean');

console.log('\nFor production deployment to Fly.io:');
console.log('1. Install Fly CLI: https://fly.io/docs/hands-on/install-flyctl/');
console.log('2. Run: fly launch');
console.log('3. Run: fly deploy');
