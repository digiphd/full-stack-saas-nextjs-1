import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { BusinessIdeaGenerator } from '@/components/business-idea-generator';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              SaaS Starter
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link href="/features" className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Features
              </Link>
              <Link href="/pricing" className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Pricing
              </Link>
              <Link href="/blog" className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Blog
              </Link>
              <Link href="/docs" className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Documentation
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/sign-in" className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Sign In
            </Link>
            <Link href="/sign-up">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        {/* Hero Section with enhanced grid pattern and geometric shapes */}
        <section className="py-32 md:py-40 relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
          <div className="absolute inset-0">
            {/* Grid pattern overlay */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIHN0cm9rZT0iIzIwNEZCNSIgc3Ryb2tlLXdpZHRoPSIwLjUiPjxwYXRoIGQ9Ik0zNiAxOGgxOHYxOGgtMThWMTh6Ii8+PHBhdGggZD0iTTE4IDE4aDE4djE4SDE4VjE4eiIvPjxwYXRoIGQ9Ik0wIDE4aDE4djE4SDBWMTh6Ii8+PHBhdGggZD0iTTM2IDBoMTh2MThIMzZWMHoiLz48cGF0aCBkPSJNMTggMGgxOHYxOEgxOFYweiIvPjxwYXRoIGQ9Ik0wIDBoMTh2MThIMFYweiIvPjxwYXRoIGQ9Ik0zNiAzNmgxOHYxOGgtMThWMzZ6Ii8+PHBhdGggZD0iTTE4IDM2aDE4djE4SDE4VjM2eiIvPjxwYXRoIGQ9Ik0wIDM2aDE4djE4SDBWMzZ6Ii8+PC9nPjwvZz48L3N2Zz4=')]  opacity-[0.07] dark:opacity-[0.05]"></div>
            
            {/* Geometric shapes */}
            <div className="absolute top-20 right-[10%] w-24 h-24 bg-blue-500 dark:bg-blue-600 rounded-lg rotate-12 filter blur-xl opacity-20"></div>
            <div className="absolute top-40 left-[15%] w-16 h-16 bg-purple-500 dark:bg-purple-600 rounded-full filter blur-xl opacity-20"></div>
            <div className="absolute bottom-20 right-[20%] w-32 h-32 bg-indigo-500 dark:bg-indigo-600 rounded-xl rotate-45 filter blur-xl opacity-20"></div>
            <div className="absolute -bottom-10 left-[25%] w-40 h-40 bg-blue-400 dark:bg-blue-700 rounded-full filter blur-3xl opacity-20"></div>
            
            {/* Accent lines */}
            <div className="absolute top-[20%] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-300 dark:via-blue-700 to-transparent opacity-30"></div>
            <div className="absolute bottom-[30%] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-300 dark:via-purple-700 to-transparent opacity-30"></div>
          </div>
          
          <div className="container relative flex flex-col items-center text-center z-10">
            <div className="inline-block px-3 py-1 mb-8 text-sm font-medium text-blue-800 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/30 rounded-full">
              ✨ AI-Powered Business Solutions
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              Transform Ideas Into Reality with AI
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mb-14">
              Launch your AI-powered SaaS in record time with our production-ready, fully-featured starter template.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <Link href="/sign-up">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 px-10 py-7 text-lg font-medium shadow-lg hover:shadow-xl transition-all">
                  Start Building
                </Button>
              </Link>
              <Link href="/docs">
                <Button variant="outline" size="lg" className="border-2 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 px-10 py-7 text-lg font-medium">
                  View Documentation
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* AI Feature Showcase */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950 dark:to-blue-950 opacity-80"></div>
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-300 dark:bg-blue-700 rounded-full filter blur-3xl opacity-20"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-300 dark:bg-purple-700 rounded-full filter blur-3xl opacity-20"></div>
          
          <div className="container relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block px-3 py-1 mb-6 text-sm font-medium text-indigo-800 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-900/30 rounded-full">
                  🚀 Founder Success Tool
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400">
                  MVP SaaS Idea Generator For Your First 6-Figure Exit
                </h2>
                <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
                  Discover high-potential SaaS ideas optimized for acquisition. Our AI analyzes market trends, implementation complexity, and exit multiples to identify opportunities with the best chance of a successful 6-figure exit.
                </p>
                <ul className="space-y-4 mb-8">
                  {[
                    'Discover SaaS ideas with high acquisition potential',
                    'Analyze market trends and exit multiples',
                    'Estimate time-to-MVP and implementation complexity',
                    'Identify optimal revenue models for faster growth',
                    'Focus on ideas with 3-8x ARR exit potential'
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/dashboard/founder-tools/idea-generator">
                  <Button className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white border-0 px-8 py-6 text-lg font-medium shadow-lg hover:shadow-xl transition-all">
                    Generate SaaS Ideas
                  </Button>
                </Link>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 border border-blue-100 dark:border-blue-900">
                <BusinessIdeaGenerator />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section with colorful icons */}
        <section className="py-24 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">Powerful Features</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Everything you need to build and scale your AI-powered SaaS application</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md hover:shadow-xl transition-all border border-blue-100 dark:border-blue-900 group hover:-translate-y-1">
                <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-6 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white dark:group-hover:bg-blue-500 dark:group-hover:text-gray-900 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Authentication</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Secure authentication with Clerk, including organization support and team management.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md hover:shadow-xl transition-all border border-purple-100 dark:border-purple-900 group hover:-translate-y-1">
                <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-6 text-purple-600 dark:text-purple-400 group-hover:bg-purple-600 group-hover:text-white dark:group-hover:bg-purple-500 dark:group-hover:text-gray-900 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">Content Management</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Headless CMS with Directus for marketing pages and blog content with real-time updates.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md hover:shadow-xl transition-all border border-indigo-100 dark:border-indigo-900 group hover:-translate-y-1">
                <div className="w-12 h-12 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-6 text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white dark:group-hover:bg-indigo-500 dark:group-hover:text-gray-900 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">Type-Safe API</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  End-to-end type safety with tRPC, Zod, and OpenAPI generation for reliable integrations.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md hover:shadow-xl transition-all border border-cyan-100 dark:border-cyan-900 group hover:-translate-y-1">
                <div className="w-12 h-12 rounded-lg bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center mb-6 text-cyan-600 dark:text-cyan-400 group-hover:bg-cyan-600 group-hover:text-white dark:group-hover:bg-cyan-500 dark:group-hover:text-gray-900 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">Database</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Serverless Postgres with Neon and Drizzle ORM for type-safe database access and scaling.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md hover:shadow-xl transition-all border border-pink-100 dark:border-pink-900 group hover:-translate-y-1">
                <div className="w-12 h-12 rounded-lg bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center mb-6 text-pink-600 dark:text-pink-400 group-hover:bg-pink-600 group-hover:text-white dark:group-hover:bg-pink-500 dark:group-hover:text-gray-900 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">Async Workflows</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Long-running tasks with Upstash Workflows and QStash for reliable AI job processing.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md hover:shadow-xl transition-all border border-amber-100 dark:border-amber-900 group hover:-translate-y-1">
                <div className="w-12 h-12 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mb-6 text-amber-600 dark:text-amber-400 group-hover:bg-amber-600 group-hover:text-white dark:group-hover:bg-amber-500 dark:group-hover:text-gray-900 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">Analytics</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Track user behavior and product usage with PostHog analytics for data-driven decisions.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Enhanced Call-to-Action */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 text-white">
          <div className="container text-center relative z-10">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Business Ideas?</h2>
              <p className="text-xl text-white/80 mb-10">
                Start building your AI-powered SaaS application today with our comprehensive starter kit. No credit card required.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/sign-up">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 border-0 px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all">
                    Get Started Free
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button variant="outline" size="lg" className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg">
                    View Pricing
                  </Button>
                </Link>
              </div>
              <p className="mt-6 text-white/70 text-sm">
                Join thousands of entrepreneurs already using our platform
              </p>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-8">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">SaaS Starter</h3>
              <p className="text-sm text-muted-foreground">
                A production-ready B2B SaaS starter template for AI-powered applications.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/features" className="text-sm text-muted-foreground hover:text-foreground">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/docs" className="text-sm text-muted-foreground hover:text-foreground">
                    Documentation
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} SaaS Starter. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
