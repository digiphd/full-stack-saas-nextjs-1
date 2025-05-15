"use client";

import { useState, useEffect } from "react";
import { Loader2, FileText, Download, Copy, CheckCheck, ArrowRight, Target, Users, Globe } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";

interface SaasIdea {
  businessName: string;
  coreValueProp: string;
  targetMarket: string;
  primaryFeatures: string[];
  differentiator: string;
  pricingModel: string;
}

interface ValidationResult {
  overallScore: number;
  desirabilityScore: number;
  viabilityScore: number;
  scalabilityScore: number;
  jobsToBeDone: string[];
  competitors: {
    name: string;
    strengths: string;
    weaknesses: string;
  }[];
  searchDemand: {
    score: number;
    keywords: {
      term: string;
      volume: string;
      competition: string;
    }[];
  };
}

interface MarketingChannel {
  id: string;
  name: string;
  type: "Organic" | "Paid";
  description: string;
  costEfficiency: "Low" | "Medium" | "High";
  timeToResults: "Short" | "Medium" | "Long";
  selected: boolean;
}

interface ContentPiece {
  id: string;
  title: string;
  type: string;
  audience: string;
  funnel: "Awareness" | "Consideration" | "Decision";
  selected: boolean;
}

interface MarketingGoal {
  id: string;
  metric: string;
  target: string;
  timeframe: string;
  selected: boolean;
}

export default function MarketingStrategyPage() {
  const [saasIdea, setSaasIdea] = useState<SaasIdea | null>(null);
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState("input");
  const [strategyGenerated, setStrategyGenerated] = useState(false);
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);
  
  const [targetAudience, setTargetAudience] = useState("");
  const [uniqueSellingProposition, setUniqueSellingProposition] = useState("");
  const [competitivePositioning, setCompetitivePositioning] = useState("");
  const [marketingChannels, setMarketingChannels] = useState<MarketingChannel[]>([]);
  const [contentPieces, setContentPieces] = useState<ContentPiece[]>([]);
  const [marketingGoals, setMarketingGoals] = useState<MarketingGoal[]>([]);
  const [budget, setBudget] = useState("5000");
  const [timeline, setTimeline] = useState("3");

  useEffect(() => {
    // Check if there's a SaaS idea and validation result in localStorage
    const storedIdea = localStorage.getItem('saasIdea');
    const storedValidation = localStorage.getItem('validationResult');
    
    if (storedIdea) {
      try {
        const parsedIdea = JSON.parse(storedIdea);
        setSaasIdea(parsedIdea);
        setTargetAudience(parsedIdea.targetMarket);
        setUniqueSellingProposition(parsedIdea.differentiator);
      } catch (error) {
        console.error("Error parsing stored idea:", error);
      }
    }
    
    if (storedValidation) {
      try {
        const parsedValidation = JSON.parse(storedValidation);
        setValidationResult(parsedValidation);
        
        // Generate competitive positioning from competitors
        if (parsedValidation.competitors && parsedValidation.competitors.length > 0) {
          const competitorAnalysis = parsedValidation.competitors
            .map((comp: { name: string; strengths: string; weaknesses: string }) => 
              `${comp.name}: Strong in ${comp.strengths}, weak in ${comp.weaknesses}`
            )
            .join('\n');
          setCompetitivePositioning(`Based on competitor analysis:\n${competitorAnalysis}`);
        }
      } catch (error) {
        console.error("Error parsing stored validation:", error);
      }
    }
    
    // Generate default marketing channels
    const defaultChannels: MarketingChannel[] = [
      {
        id: "channel-1",
        name: "Content Marketing",
        type: "Organic",
        description: "Blog posts, guides, and educational content to establish authority",
        costEfficiency: "High",
        timeToResults: "Long",
        selected: true
      },
      {
        id: "channel-2",
        name: "Social Media Marketing",
        type: "Organic",
        description: "Regular posts on LinkedIn, Twitter, and other relevant platforms",
        costEfficiency: "High",
        timeToResults: "Medium",
        selected: true
      },
      {
        id: "channel-3",
        name: "Email Marketing",
        type: "Organic",
        description: "Newsletters, drip campaigns, and targeted email sequences",
        costEfficiency: "High",
        timeToResults: "Short",
        selected: true
      },
      {
        id: "channel-4",
        name: "SEO",
        type: "Organic",
        description: "Optimize for search engines to drive organic traffic",
        costEfficiency: "Medium",
        timeToResults: "Long",
        selected: true
      },
      {
        id: "channel-5",
        name: "Google Ads",
        type: "Paid",
        description: "PPC campaigns targeting relevant keywords",
        costEfficiency: "Medium",
        timeToResults: "Short",
        selected: false
      },
      {
        id: "channel-6",
        name: "LinkedIn Ads",
        type: "Paid",
        description: "Targeted ads for B2B audiences",
        costEfficiency: "Low",
        timeToResults: "Short",
        selected: false
      },
      {
        id: "channel-7",
        name: "Referral Program",
        type: "Organic",
        description: "Incentivize existing customers to refer new ones",
        costEfficiency: "High",
        timeToResults: "Medium",
        selected: true
      },
      {
        id: "channel-8",
        name: "Partnerships & Integrations",
        type: "Organic",
        description: "Collaborate with complementary products and services",
        costEfficiency: "Medium",
        timeToResults: "Medium",
        selected: true
      }
    ];
    
    setMarketingChannels(defaultChannels);
    
    // Generate default content pieces
    const defaultContentPieces: ContentPiece[] = [
      {
        id: "content-1",
        title: "Ultimate Guide",
        type: "Long-form blog post",
        audience: "Potential customers researching solutions",
        funnel: "Awareness",
        selected: true
      },
      {
        id: "content-2",
        title: "Product Demo Video",
        type: "Video",
        audience: "Prospects evaluating options",
        funnel: "Consideration",
        selected: true
      },
      {
        id: "content-3",
        title: "Case Study",
        type: "PDF/Blog post",
        audience: "Decision makers",
        funnel: "Decision",
        selected: true
      },
      {
        id: "content-4",
        title: "Weekly Newsletter",
        type: "Email",
        audience: "Subscribers and leads",
        funnel: "Consideration",
        selected: true
      },
      {
        id: "content-5",
        title: "Industry Report",
        type: "Gated PDF",
        audience: "Industry professionals",
        funnel: "Awareness",
        selected: false
      },
      {
        id: "content-6",
        title: "Comparison Guide",
        type: "Blog post/Landing page",
        audience: "Prospects comparing alternatives",
        funnel: "Consideration",
        selected: true
      }
    ];
    
    setContentPieces(defaultContentPieces);
    
    // Generate default marketing goals
    const defaultGoals: MarketingGoal[] = [
      {
        id: "goal-1",
        metric: "Website Traffic",
        target: "5,000 monthly visitors",
        timeframe: "3 months",
        selected: true
      },
      {
        id: "goal-2",
        metric: "Lead Generation",
        target: "200 qualified leads",
        timeframe: "3 months",
        selected: true
      },
      {
        id: "goal-3",
        metric: "Conversion Rate",
        target: "2.5% visitor-to-trial",
        timeframe: "6 months",
        selected: true
      },
      {
        id: "goal-4",
        metric: "Customer Acquisition Cost",
        target: "< $200 per customer",
        timeframe: "6 months",
        selected: true
      }
    ];
    
    setMarketingGoals(defaultGoals);
  }, []);
  
  const toggleChannelSelection = (id: string) => {
    setMarketingChannels(prev => 
      prev.map(channel => 
        channel.id === id ? { ...channel, selected: !channel.selected } : channel
      )
    );
  };

  const toggleContentSelection = (id: string) => {
    setContentPieces(prev => 
      prev.map(content => 
        content.id === id ? { ...content, selected: !content.selected } : content
      )
    );
  };

  const toggleGoalSelection = (id: string) => {
    setMarketingGoals(prev => 
      prev.map(goal => 
        goal.id === id ? { ...goal, selected: !goal.selected } : goal
      )
    );
  };

  const handleGenerateStrategy = () => {
    setIsGenerating(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setIsGenerating(false);
      setStrategyGenerated(true);
      setActiveTab("result");
    }, 2000);
  };

  const handleCopyToClipboard = () => {
    const strategyText = document.getElementById('marketing-strategy-content')?.innerText;
    if (strategyText) {
      navigator.clipboard.writeText(strategyText);
      setCopiedToClipboard(true);
      setTimeout(() => setCopiedToClipboard(false), 2000);
    }
  };

  const handleDownloadPDF = () => {
    // In a real app, this would generate and download a PDF
    alert('PDF download functionality would be implemented here');
  };

  const selectedChannels = marketingChannels.filter(channel => channel.selected);
  const selectedContent = contentPieces.filter(content => content.selected);
  const selectedGoals = marketingGoals.filter(goal => goal.selected);

  const renderMarketingStrategy = () => {
    return (
      <div className="prose prose-sm max-w-none" id="marketing-strategy-content">
        <h1>{saasIdea?.businessName || 'Your SaaS'} Marketing Strategy</h1>
        
        <h2>1. Target Audience</h2>
        <p>{targetAudience}</p>
        
        <h2>2. Unique Selling Proposition</h2>
        <p>{uniqueSellingProposition}</p>
        
        <h2>3. Competitive Positioning</h2>
        <p style={{ whiteSpace: 'pre-line' }}>{competitivePositioning}</p>
        
        <h2>4. Marketing Channels</h2>
        <div className="space-y-4 not-prose">
          {selectedChannels.map((channel) => (
            <div key={channel.id} className="bg-muted p-3 rounded-md">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">{channel.name}</h4>
                <Badge variant={channel.type === "Organic" ? "secondary" : "default"}>
                  {channel.type}
                </Badge>
              </div>
              <p className="mt-1">{channel.description}</p>
              <div className="flex items-center mt-2 text-sm text-muted-foreground">
                <span className="mr-4">Cost Efficiency: {channel.costEfficiency}</span>
                <span>Time to Results: {channel.timeToResults}</span>
              </div>
            </div>
          ))}
        </div>
        
        <h2>5. Content Strategy</h2>
        <div className="space-y-4 not-prose">
          {selectedContent.map((content) => (
            <div key={content.id} className="bg-muted p-3 rounded-md">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">{content.title}</h4>
                <Badge variant={
                  content.funnel === "Awareness" ? "outline" : 
                  content.funnel === "Consideration" ? "secondary" : "default"
                }>
                  {content.funnel}
                </Badge>
              </div>
              <p className="mt-1">{content.type}</p>
              <p className="text-sm text-muted-foreground">Audience: {content.audience}</p>
            </div>
          ))}
        </div>
        
        <h2>6. Marketing Goals</h2>
        <div className="space-y-4 not-prose">
          {selectedGoals.map((goal) => (
            <div key={goal.id} className="bg-muted p-3 rounded-md">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">{goal.metric}</h4>
                <Badge variant="outline">{goal.timeframe}</Badge>
              </div>
              <p className="text-sm mt-1">Target: {goal.target}</p>
            </div>
          ))}
        </div>
        
        <h2>7. Budget & Resources</h2>
        <p>Monthly marketing budget: ${budget}</p>
        <p>Initial marketing timeline: {timeline} months</p>
        
        <h2>8. Key Performance Indicators</h2>
        <ul>
          {selectedGoals.map((goal) => (
            <li key={goal.id}>{goal.metric}: {goal.target} within {goal.timeframe}</li>
          ))}
          <li>ROI: Track cost per acquisition against customer lifetime value</li>
          <li>Channel Performance: Measure effectiveness of each marketing channel</li>
        </ul>
      </div>
    );
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400">Marketing Strategy Generator</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Create a comprehensive marketing strategy for your validated SaaS idea.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 p-1 rounded-lg">
            <TabsTrigger 
              value="input" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white dark:data-[state=active]:from-purple-600 dark:data-[state=active]:to-blue-600"
            >
              Strategy Configuration
            </TabsTrigger>
            <TabsTrigger 
              value="result" 
              disabled={!strategyGenerated && !isGenerating}
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white dark:data-[state=active]:from-purple-600 dark:data-[state=active]:to-blue-600"
            >
              Generated Strategy
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="input" className="mt-6">
            <div className="space-y-6">
              <Card className="border border-purple-100 dark:border-purple-900/30 overflow-hidden bg-gradient-to-br from-white to-purple-50/50 dark:from-gray-900 dark:to-gray-800 shadow-md">
                <CardHeader className="border-b border-purple-100 dark:border-purple-900/20 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
                  <CardTitle className="text-purple-700 dark:text-purple-400">Target Audience & Positioning</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    Define who you're targeting and how you'll position your product.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="targetAudience" className="text-purple-700 dark:text-purple-400 font-medium">Target Audience</Label>
                      <Textarea
                        id="targetAudience"
                        value={targetAudience}
                        onChange={(e) => setTargetAudience(e.target.value)}
                        placeholder="Describe your ideal customers"
                        rows={3}
                        className="border-purple-200 dark:border-purple-900/50 focus:border-purple-500 focus:ring-purple-500 dark:focus:border-purple-400 dark:focus:ring-purple-400 bg-white dark:bg-gray-800"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="uniqueSellingProposition" className="text-purple-700 dark:text-purple-400 font-medium">Unique Selling Proposition</Label>
                      <Textarea
                        id="uniqueSellingProposition"
                        value={uniqueSellingProposition}
                        onChange={(e) => setUniqueSellingProposition(e.target.value)}
                        placeholder="What makes your product unique?"
                        rows={3}
                        className="border-purple-200 dark:border-purple-900/50 focus:border-purple-500 focus:ring-purple-500 dark:focus:border-purple-400 dark:focus:ring-purple-400 bg-white dark:bg-gray-800"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="competitivePositioning" className="text-purple-700 dark:text-purple-400 font-medium">Competitive Positioning</Label>
                      <Textarea
                        id="competitivePositioning"
                        value={competitivePositioning}
                        onChange={(e) => setCompetitivePositioning(e.target.value)}
                        placeholder="How do you position against competitors?"
                        rows={4}
                        className="border-purple-200 dark:border-purple-900/50 focus:border-purple-500 focus:ring-purple-500 dark:focus:border-purple-400 dark:focus:ring-purple-400 bg-white dark:bg-gray-800"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border border-blue-100 dark:border-blue-900/30 overflow-hidden bg-gradient-to-br from-white to-blue-50/50 dark:from-gray-900 dark:to-gray-800 shadow-md">
                <CardHeader className="border-b border-blue-100 dark:border-blue-900/20 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
                  <CardTitle className="text-blue-700 dark:text-blue-400">Marketing Channels</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    Select the marketing channels to include in your strategy.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {marketingChannels.map((channel) => (
                      <div key={channel.id} className="flex items-start space-x-3">
                        <Checkbox 
                          id={channel.id} 
                          checked={channel.selected}
                          onCheckedChange={() => toggleChannelSelection(channel.id)}
                          className="mt-1"
                        />
                        <div className="space-y-1 w-full">
                          <div className="flex items-center justify-between">
                            <Label 
                              htmlFor={channel.id} 
                              className="font-medium cursor-pointer"
                            >
                              {channel.name}
                            </Label>
                            <Badge variant={channel.type === "Organic" ? "secondary" : "default"}>
                              {channel.type}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{channel.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border border-indigo-100 dark:border-indigo-900/30 overflow-hidden bg-gradient-to-br from-white to-indigo-50/50 dark:from-gray-900 dark:to-gray-800 shadow-md">
                <CardHeader className="border-b border-indigo-100 dark:border-indigo-900/20 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20">
                  <CardTitle className="text-indigo-700 dark:text-indigo-400">Content Strategy</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    Select the content pieces to include in your strategy.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {contentPieces.map((content) => (
                      <div key={content.id} className="flex items-start space-x-3">
                        <Checkbox 
                          id={content.id} 
                          checked={content.selected}
                          onCheckedChange={() => toggleContentSelection(content.id)}
                          className="mt-1"
                        />
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <Label 
                              htmlFor={content.id} 
                              className="font-medium cursor-pointer"
                            >
                              {content.title}
                            </Label>
                            <Badge variant={
                              content.funnel === "Awareness" ? "outline" : 
                              content.funnel === "Consideration" ? "secondary" : "default"
                            }>
                              {content.funnel}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">{content.type}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border border-teal-100 dark:border-teal-900/30 overflow-hidden bg-gradient-to-br from-white to-teal-50/50 dark:from-gray-900 dark:to-gray-800 shadow-md">
                <CardHeader className="border-b border-teal-100 dark:border-teal-900/20 bg-gradient-to-r from-teal-50 to-indigo-50 dark:from-teal-900/20 dark:to-indigo-900/20">
                  <CardTitle className="text-teal-700 dark:text-teal-400">Marketing Goals</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    Select the marketing goals to include in your strategy.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {marketingGoals.map((goal) => (
                      <div key={goal.id} className="flex items-start space-x-3">
                        <Checkbox 
                          id={goal.id} 
                          checked={goal.selected}
                          onCheckedChange={() => toggleGoalSelection(goal.id)}
                          className="mt-1"
                        />
                        <div className="space-y-1 w-full">
                          <div className="flex items-center justify-between">
                            <Label 
                              htmlFor={goal.id} 
                              className="font-medium cursor-pointer"
                            >
                              {goal.metric}
                            </Label>
                            <Badge variant="outline">{goal.timeframe}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">Target: {goal.target}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border border-green-100 dark:border-green-900/30 overflow-hidden bg-gradient-to-br from-white to-green-50/50 dark:from-gray-900 dark:to-gray-800 shadow-md">
                <CardHeader className="border-b border-green-100 dark:border-green-900/20 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20">
                  <CardTitle className="text-green-700 dark:text-green-400">Budget & Timeline</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    Set your marketing budget and timeline.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="budget" className="text-green-700 dark:text-green-400 font-medium">Monthly Marketing Budget ($)</Label>
                      <Input
                        id="budget"
                        type="number"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="border-green-200 dark:border-green-900/50 focus:border-green-500 focus:ring-green-500 dark:focus:border-green-400 dark:focus:ring-green-400 bg-white dark:bg-gray-800"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="timeline" className="text-green-700 dark:text-green-400 font-medium">Initial Marketing Timeline (months)</Label>
                      <Input
                        id="timeline"
                        type="number"
                        value={timeline}
                        onChange={(e) => setTimeline(e.target.value)}
                        className="border-green-200 dark:border-green-900/50 focus:border-green-500 focus:ring-green-500 dark:focus:border-green-400 dark:focus:ring-green-400 bg-white dark:bg-gray-800"
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end pt-6">
                  <Button 
                    onClick={handleGenerateStrategy} 
                    disabled={isGenerating || !targetAudience || !uniqueSellingProposition}
                    className="flex items-center bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 dark:from-purple-500 dark:to-blue-500 dark:hover:from-purple-600 dark:hover:to-blue-600 text-white shadow-md"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating Strategy...
                      </>
                    ) : (
                      <>
                        Generate Marketing Strategy
                        <FileText className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="result" className="mt-6">
            {strategyGenerated ? (
              <div className="space-y-6">
                <Card className="border border-blue-100 dark:border-blue-900/30 overflow-hidden bg-gradient-to-br from-white to-blue-50/50 dark:from-gray-900 dark:to-gray-800 shadow-md">
                  <CardHeader className="border-b border-blue-100 dark:border-blue-900/20 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-blue-700 dark:text-blue-400">Marketing Strategy</CardTitle>
                        <CardDescription className="text-gray-600 dark:text-gray-400">
                          Your generated marketing strategy for {saasIdea?.businessName || 'your SaaS'}
                        </CardDescription>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex items-center border-blue-200 hover:border-blue-300 hover:bg-blue-50 dark:border-blue-800 dark:hover:border-blue-700 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                          onClick={handleCopyToClipboard}
                        >
                          {copiedToClipboard ? (
                            <>
                              <CheckCheck className="mr-2 h-4 w-4" />
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy className="mr-2 h-4 w-4" />
                              Copy
                            </>
                          )}
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex items-center border-green-200 hover:border-green-300 hover:bg-green-50 dark:border-green-800 dark:hover:border-green-700 dark:hover:bg-green-900/30 text-green-600 dark:text-green-400"
                          onClick={handleDownloadPDF}
                        >
                          <Download className="mr-2 h-4 w-4" />
                          PDF
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="border rounded-md p-6 bg-card">
                    {renderMarketingStrategy()}
                  </CardContent>
                  <CardFooter className="flex justify-between pt-6">
                    <Button 
                      variant="outline"
                      onClick={() => setActiveTab("input")}
                      className="flex items-center border-gray-200 hover:border-gray-300 hover:bg-gray-50 dark:border-gray-700 dark:hover:border-gray-600 dark:hover:bg-gray-900/30 text-gray-600 dark:text-gray-400"
                    >
                      Back to Configuration
                    </Button>
                    <Button className="flex items-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:from-blue-500 dark:to-purple-500 dark:hover:from-blue-600 dark:hover:to-purple-600 text-white shadow-md">
                      Book Marketing Consultation
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            ) : (
              <div className="flex items-center justify-center h-60">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
