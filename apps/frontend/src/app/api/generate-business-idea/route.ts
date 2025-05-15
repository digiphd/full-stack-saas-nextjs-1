import { NextRequest, NextResponse } from 'next/server';

// Sample SaaS MVP ideas by category - focused on 6-figure exit potential
const saasIdeasByCategory: Record<string, string[]> = {
  b2b: [
    'AI-powered sales pipeline optimization for SMBs',
    'No-code workflow automation platform for operations teams',
    'Compliance automation toolkit for regulated industries',
    'Client portal solution with built-in payment processing',
    'Vertical SaaS for property management companies',
    'Automated customer success platform with churn prediction',
    'B2B marketplace with verified vendor credentials',
  ],
  productivity: [
    'Team collaboration suite with AI-powered insights',
    'Document automation platform for legal teams',
    'Meeting intelligence and action item tracking',
    'Knowledge management system with semantic search',
    'Project management tool with resource optimization',
    'Internal communications platform with engagement analytics',
    'Cross-functional workflow orchestration tool',
  ],
  analytics: [
    'Customer journey analytics with revenue attribution',
    'Marketing performance dashboard with ROI calculations',
    'Competitive intelligence platform with market signals',
    'Predictive analytics for inventory management',
    'Data visualization platform for non-technical users',
    'Product analytics with user behavior insights',
    'Financial forecasting tool for SaaS businesses',
  ],
  developer: [
    'API management platform with usage-based pricing',
    'Developer productivity suite with AI pair programming',
    'Deployment automation with rollback capabilities',
    'Code quality monitoring with technical debt metrics',
    'Internal developer portal for microservices',
    'Feature flag management with experimentation',
    'Security scanning for cloud infrastructure',
  ],
  vertical: [
    'Healthcare provider scheduling optimization',
    'Legal practice management with client intake automation',
    'Real estate transaction management platform',
    'Construction project management with BIM integration',
    'Restaurant inventory and supplier management',
    'Fitness business management platform',
    'Education administration suite for private schools',
  ],
};

// Sample descriptions for SaaS ideas
const descriptionTemplates = [
  'A SaaS platform that helps {target} to {action} through {technology}, with a clear path to $10K+ MRR within 6 months.',
  'A vertical SaaS solution for {target} looking to {action} using {technology}, targeting a 4-5x ARR exit multiple.',
  'A subscription-based platform enabling {target} to efficiently {action} with {technology}, designed for high retention and low CAC.',
  'A specialized tool that allows {target} to easily {action} using {technology}, with a product-led growth strategy for rapid scaling.',
  'An all-in-one solution for {target} to {action} through {technology}, positioned in a growing market segment with acquisition potential.',
];

const targets = [
  'small to medium businesses', 'startups', 'professional service firms', 'e-commerce businesses',
  'marketing teams', 'sales organizations', 'HR departments', 'finance teams', 'product teams',
  'software development teams', 'healthcare providers', 'legal practices', 'real estate professionals',
];

const actions = [
  'streamline operations', 'reduce operational costs', 'increase team productivity', 'improve customer retention',
  'automate manual processes', 'gain actionable insights', 'scale efficiently', 'eliminate workflow bottlenecks',
  'enhance decision making', 'optimize resource allocation', 'accelerate revenue growth', 'reduce compliance risk',
];

const technologies = [
  'AI-powered workflow automation', 'predictive analytics', 'no-code integration capabilities',
  'intelligent data processing', 'customizable dashboards', 'API-first architecture',
  'machine learning algorithms', 'natural language processing', 'cloud-native infrastructure',
];

// Revenue models for SaaS businesses
const revenueModels = [
  'Tiered Subscription', 'Usage-Based Pricing', 'Freemium + Upsell', 'Annual Contracts',
  'Per-Seat Pricing', 'Value-Based Pricing', 'Hybrid Subscription + Services',
];

// Time to MVP estimates
const timeToMvpOptions = [
  '1-2 months', '2-3 months', '3-4 months', '4-6 months'
];

// Exit multiple ranges
const exitMultipleOptions = [
  '3-4x ARR', '4-5x ARR', '5-6x ARR', '6-8x ARR'
];

// Function to generate a SaaS MVP idea optimized for 6-figure exit
function generateBusinessIdea(userInput: string): {
  title: string;
  description: string;
  score: number;
  marketPotential: string;
  implementationDifficulty: string;
  timeToMvp: string;
  revenueModel: string;
  exitMultiple: string;
} {
  // Determine relevant categories based on user input
  const relevantCategories: string[] = [];
  
  if (/b2b|business|enterprise|company|companies|client|service/i.test(userInput)) {
    relevantCategories.push('b2b');
  }
  
  if (/productivity|workflow|efficiency|collaboration|team/i.test(userInput)) {
    relevantCategories.push('productivity');
  }
  
  if (/analytics|data|insight|metrics|dashboard|report/i.test(userInput)) {
    relevantCategories.push('analytics');
  }
  
  if (/dev|code|developer|software|engineering|api|tech/i.test(userInput)) {
    relevantCategories.push('developer');
  }
  
  if (/health|legal|real estate|construction|restaurant|education|specific|industry/i.test(userInput)) {
    relevantCategories.push('vertical');
  }
  
  // If no relevant categories found, pick random ones
  if (relevantCategories.length === 0) {
    relevantCategories.push(...Object.keys(saasIdeasByCategory).sort(() => 0.5 - Math.random()).slice(0, 2));
  }
  
  // Select a random category from relevant ones
  const selectedCategory = relevantCategories[Math.floor(Math.random() * relevantCategories.length)];
  
  // Get ideas from the selected category
  const ideas = saasIdeasByCategory[selectedCategory];
  
  // Pick a random idea
  const title = ideas[Math.floor(Math.random() * ideas.length)];
  
  // Generate a description
  const descTemplate = descriptionTemplates[Math.floor(Math.random() * descriptionTemplates.length)];
  const target = targets[Math.floor(Math.random() * targets.length)];
  const action = actions[Math.floor(Math.random() * actions.length)];
  const technology = technologies[Math.floor(Math.random() * technologies.length)];
  
  const description = descTemplate
    .replace('{target}', target)
    .replace('{action}', action)
    .replace('{technology}', technology);
  
  // Generate an exit potential score (75-98)
  const score = Math.floor(Math.random() * 24) + 75;
  
  // Generate market potential
  const marketPotentials = ['High Growth', 'Emerging', 'Established', 'Consolidating', 'Underserved'];
  const marketPotential = marketPotentials[Math.floor(Math.random() * marketPotentials.length)];
  
  // Generate implementation difficulty
  const difficulties = ['Low', 'Moderate', 'Medium', 'Challenging'];
  const implementationDifficulty = difficulties[Math.floor(Math.random() * difficulties.length)];
  
  // Generate time to MVP
  const timeToMvp = timeToMvpOptions[Math.floor(Math.random() * timeToMvpOptions.length)];
  
  // Generate revenue model
  const revenueModel = revenueModels[Math.floor(Math.random() * revenueModels.length)];
  
  // Generate exit multiple
  const exitMultiple = exitMultipleOptions[Math.floor(Math.random() * exitMultipleOptions.length)];
  
  return {
    title,
    description,
    score,
    marketPotential,
    implementationDifficulty,
    timeToMvp,
    revenueModel,
    exitMultiple,
  };
}

export async function POST(request: NextRequest) {
  try {
    const { userInput } = await request.json();
    
    if (!userInput || typeof userInput !== 'string') {
      return NextResponse.json(
        { error: 'Invalid input. Please provide a valid userInput string.' },
        { status: 400 }
      );
    }
    
    // Generate 3 business ideas
    const ideas = Array.from({ length: 3 }, () => generateBusinessIdea(userInput));
    
    // Sort by score (highest first)
    ideas.sort((a, b) => b.score - a.score);
    
    return NextResponse.json({
      ideas,
      message: 'Business ideas generated successfully',
    });
    
  } catch (error) {
    console.error('Error generating business ideas:', error);
    return NextResponse.json(
      { error: 'Failed to generate business ideas' },
      { status: 500 }
    );
  }
}
