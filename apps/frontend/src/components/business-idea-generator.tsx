'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface BusinessIdea {
  title: string;
  description: string;
  score: number;
  marketPotential: string;
  implementationDifficulty: string;
  timeToMvp: string;
  revenueModel: string;
  exitMultiple: string;
}

export function BusinessIdeaGenerator() {
  const [userInput, setUserInput] = useState('');
  const [ideas, setIdeas] = useState<BusinessIdea[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userInput.trim()) {
      setError('Please enter your skills and target market');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/generate-business-idea', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userInput }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate ideas');
      }
      
      const data = await response.json();
      setIdeas(data.ideas);
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 relative">
      <div className="absolute -top-4 -right-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
        Founder Tool
      </div>
      
      <form onSubmit={handleSubmit} className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg mb-6">
        <h3 className="text-xl font-semibold mb-2">MVP SaaS Idea Generator</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Discover high-potential SaaS ideas optimized for your first 6-figure exit
        </p>
        
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 mb-4">
          <textarea 
            className="w-full h-24 p-2 border border-gray-200 dark:border-gray-700 rounded-md bg-transparent text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none" 
            placeholder="Describe your technical skills, industry knowledge, and target market (e.g., 'Full-stack developer with fintech experience targeting small businesses')..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          ></textarea>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
        
        <div className="flex justify-end">
          <Button 
            type="submit"
            className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white px-4 py-2 rounded-md shadow-md hover:shadow-lg transition-all"
            disabled={loading}
          >
            {loading ? 'Analyzing Market...' : 'Generate Exit-Ready Ideas'}
          </Button>
        </div>
      </form>
      
      <div className="space-y-4">
        {ideas.length > 0 ? (
          ideas.map((idea, index) => (
            <div key={index} className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg hover:shadow-md transition-all border border-gray-100 dark:border-gray-800">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100">{idea.title}</h4>
                <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 text-xs font-medium rounded-full">
                  {idea.score}% Exit Potential
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{idea.description}</p>
              <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 rounded-full flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  Market: {idea.marketPotential}
                </span>
                <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400 rounded-full flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Complexity: {idea.implementationDifficulty}
                </span>
                <span className="px-2 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400 rounded-full flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  MVP Timeline: {idea.timeToMvp || '2-3 months'}
                </span>
                <span className="px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-400 rounded-full flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Revenue: {idea.revenueModel || 'Subscription'}
                </span>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500 dark:text-gray-400">Potential Exit Multiple</span>
                  <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">{idea.exitMultiple || '3-5x ARR'}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            {loading ? (
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mb-4"></div>
                <p>Analyzing market opportunities...</p>
              </div>
            ) : (
              <p>Describe your skills and target market above to discover your next 6-figure SaaS exit</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
