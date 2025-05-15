import { redirect } from 'next/navigation';

export const metadata = {
  title: 'API Documentation - SaaS Starter Kit',
  description: 'API documentation for the SaaS Starter Kit',
};

export default function DocsPage() {
  // Get the API docs URL from environment variables
  const apiDocsUrl = process.env.NEXT_PUBLIC_API_DOCS_URL || 'http://localhost:9000';
  
  // Redirect to the Scalar documentation
  redirect(apiDocsUrl);
  
  // This won't be rendered, but is required for TypeScript
  return null;
}
