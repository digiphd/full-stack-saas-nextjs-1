import Link from 'next/link';

export const metadata = {
  title: 'Features - SaaS Starter Kit',
  description: 'Explore the powerful features of our SaaS Starter Kit',
};

export default function FeaturesPage() {
  // Feature icons
  const featureIcons = [
    // TypeScript icon
    <svg key="typescript" xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16.5 9.4l-9-5.19M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"></path>
      <path d="M3.27 6.96L12 12.01l8.73-5.05"></path>
      <path d="M12 22.08V12"></path>
    </svg>,
    // Auth icon
    <svg key="auth" xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
      <path d="M7 11V7a5 5 0 0110 0v4"></path>
    </svg>,
    // CMS icon
    <svg key="cms" xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 22h16a2 2 0 002-2V4a2 2 0 00-2-2H8a2 2 0 00-2 2v16a2 2 0 01-2 2zm0 0a2 2 0 01-2-2v-9c0-1.1.9-2 2-2h2"></path>
      <path d="M18 14h-8"></path>
      <path d="M15 18h-5"></path>
      <path d="M10 6h8v4h-8z"></path>
    </svg>,
    // Database icon
    <svg key="database" xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
    </svg>,
    // Async icon
    <svg key="async" xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 4 23 10 17 10"></polyline>
      <polyline points="1 20 1 14 7 14"></polyline>
      <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"></path>
    </svg>,
    // API icon
    <svg key="api" xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>,
  ];

  type FeatureColor = 'blue' | 'purple' | 'indigo' | 'cyan' | 'pink' | 'amber';
  
  // Feature data
  const features = [
    {
      title: "End-to-End Type Safety",
      description: "Full TypeScript support across the entire stack with shared types between frontend and backend.",
      items: ["Zod schemas for validation", "OpenAPI type generation", "Type-safe API calls"],
      color: 'blue' as FeatureColor
    },
    {
      title: "Authentication & Authorization",
      description: "Secure user authentication and authorization with Clerk.",
      items: ["User sign-up and sign-in", "Social authentication", "Role-based access control"],
      color: 'purple' as FeatureColor
    },
    {
      title: "Content Management",
      description: "Integrated Directus CMS for managing content with real-time updates.",
      items: ["Blog posts and marketing pages", "Webhook integration", "Content revalidation"],
      color: 'indigo' as FeatureColor
    },
    {
      title: "Database Integration",
      description: "Neon Postgres with Drizzle ORM for efficient database operations and scaling.",
      items: ["Type-safe schema definitions", "Migrations support", "Optimized queries"],
      color: 'cyan' as FeatureColor
    },
    {
      title: "Async Workflows",
      description: "Background processing with Upstash for reliable AI job processing and more.",
      items: ["Email sending", "LLM content generation", "FFmpeg processing", "Delayed sequences"],
      color: 'pink' as FeatureColor
    },
    {
      title: "API Documentation",
      description: "Comprehensive API documentation with Scalar for seamless integration.",
      items: ["OpenAPI-based documentation", "Auto-generated from Zod schemas", "Interactive API explorer"],
      color: 'amber' as FeatureColor
    },
  ];

  return (
    <main>
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-gray-900 dark:to-indigo-950 z-0"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-300 dark:bg-blue-700 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-300 dark:bg-purple-700 rounded-full filter blur-3xl opacity-20"></div>
        
        <div className="container relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400">
              Powerful Features
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
              Everything you need to build and scale your next SaaS application
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 -mt-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const colorClasses = {
                blue: {
                  icon: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
                  border: "border-blue-100 dark:border-blue-900",
                  hover: "group-hover:bg-blue-600 group-hover:text-white dark:group-hover:bg-blue-500 dark:group-hover:text-gray-900",
                  title: "group-hover:text-blue-600 dark:group-hover:text-blue-400"
                },
                purple: {
                  icon: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
                  border: "border-purple-100 dark:border-purple-900",
                  hover: "group-hover:bg-purple-600 group-hover:text-white dark:group-hover:bg-purple-500 dark:group-hover:text-gray-900",
                  title: "group-hover:text-purple-600 dark:group-hover:text-purple-400"
                },
                indigo: {
                  icon: "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400",
                  border: "border-indigo-100 dark:border-indigo-900",
                  hover: "group-hover:bg-indigo-600 group-hover:text-white dark:group-hover:bg-indigo-500 dark:group-hover:text-gray-900",
                  title: "group-hover:text-indigo-600 dark:group-hover:text-indigo-400"
                },
                cyan: {
                  icon: "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400",
                  border: "border-cyan-100 dark:border-cyan-900",
                  hover: "group-hover:bg-cyan-600 group-hover:text-white dark:group-hover:bg-cyan-500 dark:group-hover:text-gray-900",
                  title: "group-hover:text-cyan-600 dark:group-hover:text-cyan-400"
                },
                pink: {
                  icon: "bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400",
                  border: "border-pink-100 dark:border-pink-900",
                  hover: "group-hover:bg-pink-600 group-hover:text-white dark:group-hover:bg-pink-500 dark:group-hover:text-gray-900",
                  title: "group-hover:text-pink-600 dark:group-hover:text-pink-400"
                },
                amber: {
                  icon: "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400",
                  border: "border-amber-100 dark:border-amber-900",
                  hover: "group-hover:bg-amber-600 group-hover:text-white dark:group-hover:bg-amber-500 dark:group-hover:text-gray-900",
                  title: "group-hover:text-amber-600 dark:group-hover:text-amber-400"
                }
              };

              const colorClass = colorClasses[feature.color];

              return (
                <div key={index} className={`bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md hover:shadow-xl transition-all border ${colorClass.border} group hover:-translate-y-1`}>
                  <div className={`w-12 h-12 rounded-lg ${colorClass.icon} flex items-center justify-center mb-6 ${colorClass.hover} transition-colors`}>
                    {featureIcons[index]}
                  </div>
                  <h3 className={`text-xl font-bold mb-3 text-gray-900 dark:text-gray-100 ${colorClass.title} transition-colors`}>{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {feature.description}
                  </p>
                  <ul className="space-y-2">
                    {feature.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 dark:text-green-400 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-600 dark:text-gray-400">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 text-white">
        <div className="container text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Ready to Build Your SaaS?</h2>
            <p className="text-xl text-white/80 mb-8">
              Get started today with our comprehensive starter kit and launch faster than ever.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/pricing" className="bg-white text-blue-600 hover:bg-gray-100 border-0 px-8 py-4 rounded-md text-lg font-medium shadow-lg hover:shadow-xl transition-all inline-block">
                View Pricing
              </Link>
              <Link href="/sign-up" className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-md text-lg font-medium inline-block">
                Get Started Free
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
