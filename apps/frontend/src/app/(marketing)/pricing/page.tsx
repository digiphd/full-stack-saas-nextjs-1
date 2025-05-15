import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const plans = [
  {
    name: "Free",
    description: "Perfect for trying out the platform",
    price: "$0",
    billing: "forever",
    features: [
      "Up to 5 users",
      "Basic analytics",
      "1 GB storage",
      "Email support",
      "Basic AI features"
    ],
    cta: "Get Started",
    href: "/sign-up",
    highlighted: false
  },
  {
    name: "Pro",
    description: "For teams and growing businesses",
    price: "$49",
    billing: "per month",
    features: [
      "Up to 20 users",
      "Advanced analytics",
      "10 GB storage",
      "Priority email support",
      "Advanced AI features",
      "API access",
      "Workflow automation"
    ],
    cta: "Start Free Trial",
    href: "/sign-up?plan=pro",
    highlighted: true
  },
  {
    name: "Enterprise",
    description: "For large organizations with custom needs",
    price: "Custom",
    billing: "contact us for pricing",
    features: [
      "Unlimited users",
      "Custom analytics",
      "Unlimited storage",
      "24/7 phone support",
      "Custom AI model training",
      "Advanced API access",
      "Custom integrations",
      "Dedicated account manager"
    ],
    cta: "Contact Sales",
    href: "/contact",
    highlighted: false
  }
];

export default function PricingPage() {
  return (
    <main>
      {/* Hero Section with Gradient Background */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-gray-900 dark:to-indigo-950 z-0"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-300 dark:bg-blue-700 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-300 dark:bg-purple-700 rounded-full filter blur-3xl opacity-20"></div>
        
        <div className="container relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300">
              Choose the plan that's right for your business. All plans include a 14-day free trial.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 -mt-10">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <div 
                key={plan.name} 
                className={`bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all border ${plan.highlighted ? 'border-indigo-200 dark:border-indigo-800 relative' : 'border-gray-200 dark:border-gray-700'}`}
              >
                {plan.highlighted && (
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-600 to-blue-600"></div>
                )}
                <div className={`p-8 ${plan.highlighted ? 'bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20' : ''}`}>
                  <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">{plan.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">{plan.description}</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900 dark:text-gray-100">{plan.price}</span>
                    <span className="text-gray-500 dark:text-gray-400"> / {plan.billing}</span>
                  </div>
                  <Link href={plan.href}>
                    <Button 
                      className={`w-full py-6 text-base ${plan.highlighted ? 'bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white border-0 shadow-md' : 'border-2 border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-700 bg-transparent text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
                      variant={plan.highlighted ? "default" : "outline"}
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                </div>
                <div className="p-8 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/30">
                  <ul className="space-y-4">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center text-gray-700 dark:text-gray-300">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 mr-3">
                          <Check className="h-3 w-3" />
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400">
              Frequently Asked Questions
            </h2>
            <div className="space-y-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all">
                <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">Can I change plans later?</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all">
                <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">How does the 14-day trial work?</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  You can try any paid plan for 14 days without being charged. If you decide not to continue, cancel before the trial ends and you won't be billed.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all">
                <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">Do you offer discounts for non-profits or educational institutions?</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Yes, we offer special pricing for non-profits, educational institutions, and open-source projects. Please contact our sales team for more information.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all">
                <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">What payment methods do you accept?</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We accept all major credit cards, including Visa, Mastercard, and American Express. For Enterprise plans, we can also arrange invoicing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 text-white">
        <div className="container text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-white/80 mb-8">
              Join thousands of businesses already using our platform to build their next SaaS product.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/sign-up">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 border-0 px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all">
                  Start Your Free Trial
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg">
                  Contact Sales
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
