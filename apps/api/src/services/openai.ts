import OpenAI from 'openai';
import * as dotenv from 'dotenv';

// Force reload environment variables
dotenv.config();

// Initialize OpenAI client
let openai: OpenAI | null = null;

// Function to get or initialize the OpenAI client
export function getOpenAIClient(): OpenAI | null {
  if (openai) return openai;
  
  // Get the API key directly from process.env each time
  const apiKey = process.env.OPENAI_API_KEY;
  
  // Debug: Log environment variables
  console.log('Environment variables:', {
    NODE_ENV: process.env.NODE_ENV,
    OPENAI_API_KEY_EXISTS: !!apiKey,
    OPENAI_API_KEY_LENGTH: apiKey ? apiKey.length : 0,
    OPENAI_API_KEY_PREFIX: apiKey ? apiKey.substring(0, 7) + '...' : 'none'
  });
  
  // Direct check of the API key
  if (!apiKey) {
    console.warn('OpenAI API key not provided. Some AI features will be unavailable.');
    return null;
  }
  
  console.log(`Initializing OpenAI client with API key starting with: ${apiKey.substring(0, 7)}...`);
  
  try {
    // Create a new OpenAI instance with the API key
    openai = new OpenAI({ apiKey });
    console.log('OpenAI client initialized successfully');
    return openai;
  } catch (error) {
    console.error('Failed to initialize OpenAI client:', error);
    return null;
  }
}

// Business idea interface
export interface BusinessIdea {
  title: string;
  description: string;
  score: number;
  marketPotential: string;
  implementationDifficulty: string;
  timeToMvp: string;
  revenueModel: string;
  exitMultiple: string;
}

// Function to generate business ideas using OpenAI
export async function generateBusinessIdeas(userInput: string, count: number = 3): Promise<BusinessIdea[]> {
  console.log(`Generating business ideas for input: "${userInput}" (count: ${count})`);
  
  // Force reload environment variables again
  const apiKey = process.env.OPENAI_API_KEY;
  console.log('Direct API key check in generateBusinessIdeas:', {
    exists: !!apiKey,
    length: apiKey ? apiKey.length : 0,
    prefix: apiKey ? apiKey.substring(0, 7) + '...' : 'none'
  });
  
  // Try direct initialization if API key exists
  let client: OpenAI | null = null;
  
  if (apiKey) {
    try {
      console.log('Attempting direct initialization of OpenAI client...');
      client = new OpenAI({ apiKey });
      console.log('Direct initialization successful');
    } catch (error) {
      console.error('Direct initialization failed:', error);
    }
  } else {
    // Try to get the OpenAI client through the regular method
    client = getOpenAIClient();
  }
  
  // If no OpenAI client, use fallback mock data generator
  if (!client) {
    console.log('Using fallback business idea generator (no OpenAI API key)');
    return generateMockBusinessIdeas(userInput, count);
  }
  
  console.log('OpenAI client available, attempting to generate ideas with AI');
  
  try {
    const prompt = `
Generate ${count} innovative SaaS MVP ideas optimized for a 6-figure exit based on the following user input:
"${userInput}"

Focus on ideas that:
- Have high acquisition potential (3-8x ARR exit multiple)
- Can reach $10K+ MRR within 6-12 months
- Are implementable by a small team (1-3 people)
- Have clear product-market fit in growing segments

For each idea, provide the following in JSON format:
1. title: A concise name for the SaaS product
2. description: A 1-2 sentence description of the product and its value proposition
3. score: A number between 75-98 representing exit potential
4. marketPotential: One of ["High Growth", "Emerging", "Established", "Consolidating", "Underserved"]
5. implementationDifficulty: One of ["Low", "Moderate", "Medium", "Challenging"]
6. timeToMvp: One of ["1-2 months", "2-3 months", "3-4 months", "4-6 months"]
7. revenueModel: One of ["Tiered Subscription", "Usage-Based Pricing", "Freemium + Upsell", "Annual Contracts", "Per-Seat Pricing", "Value-Based Pricing", "Hybrid Subscription + Services"]
8. exitMultiple: One of ["3-4x ARR", "4-5x ARR", "5-6x ARR", "6-8x ARR"]

Return only the JSON array with no additional text.
`;

    console.log('Sending request to OpenAI API...');
    const response = await client.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a startup advisor specializing in SaaS businesses with high acquisition potential.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 1500,
    });
    
    console.log('Received response from OpenAI API');

    const content = response.choices[0]?.message?.content?.trim() || '';
    console.log('OpenAI response content:', content.substring(0, 100) + '...');
    
    // Parse and validate JSON from the response
    let ideas: BusinessIdea[];
    try {
      const parsedContent = JSON.parse(content);
      if (!Array.isArray(parsedContent) || !parsedContent.every(item => typeof item === 'object')) {
        throw new Error('Parsed content is not a valid array of objects');
      }
      ideas = parsedContent as BusinessIdea[];
    } catch (parseError) {
      console.error('Failed to parse JSON from OpenAI response. Full content:', content);
      throw new Error('Failed to parse JSON from OpenAI response: ' + parseError.message);
    }
    
    console.log('Successfully parsed JSON from OpenAI response');
    
    // Validate and ensure all required fields are present
    return ideas.map(idea => ({
      title: idea.title || 'Untitled SaaS Idea',
      description: idea.description || 'A SaaS platform with high exit potential.',
      score: typeof idea.score === 'number' ? idea.score : Math.floor(Math.random() * 24) + 75,
      marketPotential: idea.marketPotential || ['High Growth', 'Emerging', 'Established', 'Consolidating', 'Underserved'][Math.floor(Math.random() * 5)],
      implementationDifficulty: idea.implementationDifficulty || ['Low', 'Moderate', 'Medium', 'Challenging'][Math.floor(Math.random() * 4)],
      timeToMvp: idea.timeToMvp || ['1-2 months', '2-3 months', '3-4 months', '4-6 months'][Math.floor(Math.random() * 4)],
      revenueModel: idea.revenueModel || ['Tiered Subscription', 'Usage-Based Pricing', 'Freemium + Upsell', 'Annual Contracts', 'Per-Seat Pricing', 'Value-Based Pricing', 'Hybrid Subscription + Services'][Math.floor(Math.random() * 7)],
      exitMultiple: idea.exitMultiple || ['3-4x ARR', '4-5x ARR', '5-6x ARR', '6-8x ARR'][Math.floor(Math.random() * 4)],
    }));
  } catch (error) {
    console.error('Error generating business ideas with OpenAI:', error);
    console.log('Falling back to mock business idea generator due to error');
    return generateMockBusinessIdeas(userInput, count);
  }
}

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

// Fallback function to generate mock business ideas
function generateMockBusinessIdeas(userInput: string, count: number): BusinessIdea[] {
  const ideas: BusinessIdea[] = [];
  
  for (let i = 0; i < count; i++) {
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
    const categoryIdeas = saasIdeasByCategory[selectedCategory];
    
    // Pick a random idea
    const title = categoryIdeas[Math.floor(Math.random() * categoryIdeas.length)];
    
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
    const timeToMvpOptions = ['1-2 months', '2-3 months', '3-4 months', '4-6 months'];
    const timeToMvp = timeToMvpOptions[Math.floor(Math.random() * timeToMvpOptions.length)];
    
    // Generate revenue model
    const revenueModels = ['Tiered Subscription', 'Usage-Based Pricing', 'Freemium + Upsell', 'Annual Contracts', 'Per-Seat Pricing', 'Value-Based Pricing', 'Hybrid Subscription + Services'];
    const revenueModel = revenueModels[Math.floor(Math.random() * revenueModels.length)];
    
    // Generate exit multiple
    const exitMultipleOptions = ['3-4x ARR', '4-5x ARR', '5-6x ARR', '6-8x ARR'];
    const exitMultiple = exitMultipleOptions[Math.floor(Math.random() * exitMultipleOptions.length)];
    
    ideas.push({
      title,
      description,
      score,
      marketPotential,
      implementationDifficulty,
      timeToMvp,
      revenueModel,
      exitMultiple,
    });
  }
  
  // Sort by score (highest first)
  ideas.sort((a, b) => b.score - a.score);
  
  return ideas;
}
