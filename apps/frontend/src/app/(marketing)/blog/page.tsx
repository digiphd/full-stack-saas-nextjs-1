import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";

// In a real app, this would fetch from the API
const getBlogPosts = async () => {
  return [
    {
      id: "1",
      title: "Getting Started with the SaaS Starter Kit",
      slug: "getting-started",
      summary: "Learn how to get started with our SaaS Starter Kit",
      tags: ["tutorial", "getting-started"],
      published: true,
      publishedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "2",
      title: "Building AI-Powered Features",
      slug: "ai-powered-features",
      summary: "Learn how to integrate AI capabilities into your SaaS application",
      tags: ["ai", "tutorial", "advanced"],
      published: true,
      publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    },
    {
      id: "3",
      title: "Scaling Your SaaS Application",
      slug: "scaling-saas",
      summary: "Best practices for scaling your SaaS application to handle more users",
      tags: ["scaling", "advanced", "infrastructure"],
      published: true,
      publishedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 14 days ago
      createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    },
  ];
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <main>
      {/* Hero Section with Gradient Background */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-gray-900 dark:to-indigo-950 z-0"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-300 dark:bg-blue-700 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-300 dark:bg-purple-700 rounded-full filter blur-3xl opacity-20"></div>
        
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400">
              Blog
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300">
              Latest news, tutorials, and updates from the SaaS Starter team.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16 -mt-8">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="space-y-8">
              {posts.map((post) => (
                <div key={post.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700 overflow-hidden">
                  <div className="p-6">
                    <div className="mb-4">
                      <Link href={`/blog/${post.slug}`} className="text-2xl font-bold text-gray-900 dark:text-gray-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                        {post.title}
                      </Link>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                        Published on {formatDate(post.publishedAt)}
                      </p>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">{post.summary}</p>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-full text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-900/30 px-6 py-4 border-t border-gray-100 dark:border-gray-700">
                    <Link 
                      href={`/blog/${post.slug}`}
                      className="text-indigo-600 dark:text-indigo-400 font-medium text-sm hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors flex items-center"
                    >
                      Read more
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container">
          <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">Subscribe to our newsletter</h2>
              <p className="text-gray-600 dark:text-gray-400">Get the latest articles and resources sent straight to your inbox</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <button className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-medium py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
