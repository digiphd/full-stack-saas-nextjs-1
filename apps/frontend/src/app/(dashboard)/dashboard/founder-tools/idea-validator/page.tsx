"use client";

import { useState, useEffect } from "react";
import { Loader2, CheckCircle2, XCircle, AlertCircle, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

interface SaasIdea {
  businessName: string;
  coreValueProp: string;
  targetMarket: string;
  primaryFeatures: string[];
  differentiator: string;
  pricingModel: string;
  stackRecommendation: {
    frontend: string;
    backend: string;
    database: string;
    hosting: string;
    additionalTools: string[];
  };
  timeToMvp: string;
  exitPotential: number;
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
  idealCustomerProfile: {
    role: string;
    companySize: string;
    painPoints: string[];
    goals: string[];
  };
  distributionChannels: {
    channel: string;
    effectiveness: number;
    timeToResults: string;
  }[];
  validationSummary: string;
}

export default function IdeaValidatorPage() {
  const [saasIdea, setSaasIdea] = useState<SaasIdea | null>(null);
  const [customIdea, setCustomIdea] = useState({
    businessName: "",
    coreValueProp: "",
    targetMarket: "",
    marketType: "B2B",
    painPoint: ""
  });
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const [activeTab, setActiveTab] = useState("input");
  const [validationProgress, setValidationProgress] = useState(0);
  const [validationStage, setValidationStage] = useState("");

  useEffect(() => {
    // Check if there's a SaaS idea in localStorage
    const storedIdea = localStorage.getItem('saasIdea');
    if (storedIdea) {
      try {
        const parsedIdea = JSON.parse(storedIdea);
        setSaasIdea(parsedIdea);
      } catch (error) {
        console.error("Error parsing stored idea:", error);
      }
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCustomIdea((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setCustomIdea((prev) => ({ ...prev, [name]: value }));
  };

  const simulateValidationProgress = () => {
    setValidationProgress(0);
    setValidationStage("Analyzing market demand...");
    
    const stages = [
      "Analyzing market demand...",
      "Researching competitors...",
      "Evaluating business model...",
      "Assessing technical feasibility...",
      "Calculating scalability potential...",
      "Identifying ideal customer profiles...",
      "Determining distribution channels...",
      "Finalizing validation report..."
    ];
    
    let currentStage = 0;
    
    const interval = setInterval(() => {
      setValidationProgress((prev) => {
        const newProgress = prev + Math.floor(Math.random() * 5) + 3;
        
        if (newProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        
        // Update stage text every ~25% progress
        if (newProgress > (currentStage + 1) * (100 / stages.length) && currentStage < stages.length - 1) {
          currentStage++;
          setValidationStage(stages[currentStage]);
        }
        
        return newProgress;
      });
    }, 300);
    
    return () => clearInterval(interval);
  };

  const handleValidate = async () => {
    setIsValidating(true);
    
    // Start the progress simulation
    const clearProgressSimulation = simulateValidationProgress();
    
    try {
      // Simulate API call with a delay
      await new Promise(resolve => setTimeout(resolve, 6000));
      
      // Mock validation result
      const mockResult: ValidationResult = {
        overallScore: 78,
        desirabilityScore: 85,
        viabilityScore: 72,
        scalabilityScore: 76,
        jobsToBeDone: [
          "Track key SaaS metrics without requiring technical setup",
          "Generate investor-ready reports quickly",
          "Identify growth opportunities based on metrics",
          "Benchmark performance against industry standards"
        ],
        competitors: [
          {
            name: "ChartMogul",
            strengths: "Comprehensive metrics, established brand",
            weaknesses: "Complex setup, expensive for early-stage startups"
          },
          {
            name: "Baremetrics",
            strengths: "Good UI, popular in the startup community",
            weaknesses: "Limited integrations beyond Stripe, less customizable"
          },
          {
            name: "ProfitWell",
            strengths: "Free core metrics, content marketing",
            weaknesses: "Upsells to paid features, less intuitive for beginners"
          }
        ],
        searchDemand: {
          score: 68,
          keywords: [
            {
              term: "saas metrics dashboard",
              volume: "Medium",
              competition: "High"
            },
            {
              term: "startup metrics tracking",
              volume: "Medium",
              competition: "Medium"
            },
            {
              term: "investor ready saas metrics",
              volume: "Low",
              competition: "Low"
            }
          ]
        },
        idealCustomerProfile: {
          role: "Founder/CEO",
          companySize: "1-10 employees",
          painPoints: [
            "Limited technical resources for custom analytics",
            "Need for investor-ready metrics",
            "Spending too much time manually creating reports",
            "Difficulty tracking growth trends"
          ],
          goals: [
            "Raise funding",
            "Optimize growth metrics",
            "Make data-driven decisions",
            "Save time on reporting"
          ]
        },
        distributionChannels: [
          {
            channel: "Product Hunt Launch",
            effectiveness: 85,
            timeToResults: "Short (days)"
          },
          {
            channel: "Content Marketing (SaaS metrics guides)",
            effectiveness: 75,
            timeToResults: "Medium (months)"
          },
          {
            channel: "Startup Communities (Indie Hackers, etc.)",
            effectiveness: 80,
            timeToResults: "Short (weeks)"
          },
          {
            channel: "Direct outreach to early-stage founders",
            effectiveness: 70,
            timeToResults: "Medium (months)"
          }
        ],
        validationSummary: "MetricFlow shows strong potential in the SaaS metrics space with a clear differentiator of simplicity and speed of setup. The target market of early-stage founders is well-defined and has clear pain points. While competition exists, the focus on simplicity and zero technical setup creates a viable entry point. The business model is sustainable with potential for upsells. Distribution channels through startup communities and Product Hunt offer quick initial traction paths."
      };
      
      setValidationResult(mockResult);
      setActiveTab("result");
    } catch (error) {
      console.error("Error validating idea:", error);
    } finally {
      clearProgressSimulation();
      setValidationProgress(100);
      setValidationStage("Validation complete!");
      setIsValidating(false);
    }
  };

  const handleProceedToSOW = () => {
    if (!saasIdea || !validationResult) return;
    
    // Store both the idea and validation result in localStorage
    localStorage.setItem('saasIdea', JSON.stringify(saasIdea));
    localStorage.setItem('validationResult', JSON.stringify(validationResult));
    
    // Navigate to the SOW creator page
    window.location.href = '/dashboard/founder-tools/sow-creator';
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-amber-600";
    return "text-red-600";
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return "bg-green-600";
    if (score >= 60) return "bg-amber-600";
    return "bg-red-600";
  };

  const getEffectivenessColor = (effectiveness: number) => {
    if (effectiveness >= 80) return "text-green-600";
    if (effectiveness >= 60) return "text-amber-600";
    return "text-red-600";
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400">MVP SaaS Idea Validator</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Validate your SaaS idea using a structured analysis framework to assess market potential.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 p-1 rounded-lg">
            <TabsTrigger 
              value="input" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white dark:data-[state=active]:from-purple-600 dark:data-[state=active]:to-blue-600"
            >
              Idea Input
            </TabsTrigger>
            <TabsTrigger 
              value="result" 
              disabled={!validationResult && !isValidating}
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white dark:data-[state=active]:from-purple-600 dark:data-[state=active]:to-blue-600"
            >
              Validation Results
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="input" className="mt-6">
            <Card className="border border-purple-100 dark:border-purple-900/30 overflow-hidden bg-gradient-to-br from-white to-purple-50/50 dark:from-gray-900 dark:to-gray-800 shadow-md">
              <CardHeader className="border-b border-purple-100 dark:border-purple-900/20 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
                <CardTitle className="text-purple-700 dark:text-purple-400">Validate Your SaaS Idea</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  {saasIdea 
                    ? "We've imported your idea from the generator. You can proceed with validation or modify it below."
                    : "Enter your SaaS idea details below to validate its market potential."}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  {saasIdea && (
                    <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/10 dark:to-blue-900/10 p-4 rounded-md border border-purple-100 dark:border-purple-900/20 shadow-sm">
                      <h3 className="font-medium mb-2 text-purple-700 dark:text-purple-400">{saasIdea.businessName}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{saasIdea.coreValueProp}</p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-purple-600 dark:text-purple-400 font-medium">Target Market:</span>
                          <p className="text-gray-700 dark:text-gray-300">{saasIdea.targetMarket}</p>
                        </div>
                        <div>
                          <span className="text-purple-600 dark:text-purple-400 font-medium">Pricing Model:</span>
                          <p className="text-gray-700 dark:text-gray-300">{saasIdea.pricingModel}</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {!saasIdea && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="businessName">Business Name</Label>
                        <Input
                          id="businessName"
                          name="businessName"
                          placeholder="e.g., MetricFlow, TaskMaster"
                          value={customIdea.businessName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="coreValueProp">Core Value Proposition</Label>
                        <Textarea
                          id="coreValueProp"
                          name="coreValueProp"
                          placeholder="Describe what your SaaS does and its main benefit"
                          value={customIdea.coreValueProp}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="targetMarket">Target Market</Label>
                        <Input
                          id="targetMarket"
                          name="targetMarket"
                          placeholder="e.g., Small e-commerce businesses, Marketing agencies"
                          value={customIdea.targetMarket}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  )}
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="marketType">Market Type</Label>
                      <Select
                        name="marketType"
                        value={customIdea.marketType}
                        onValueChange={(value) => handleSelectChange("marketType", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select market type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="B2B">B2B (Business to Business)</SelectItem>
                          <SelectItem value="B2C">B2C (Business to Consumer)</SelectItem>
                          <SelectItem value="Niche Prosumer">Niche Prosumer</SelectItem>
                          <SelectItem value="Vertical SaaS">Vertical SaaS</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="painPoint">Key Pain Point</Label>
                      <Textarea
                        id="painPoint"
                        name="painPoint"
                        placeholder="Describe the main problem your SaaS solves"
                        value={customIdea.painPoint}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button 
                      onClick={handleValidate} 
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 dark:from-purple-500 dark:to-blue-500 dark:hover:from-purple-600 dark:hover:to-blue-600 text-white border-0 shadow-md hover:shadow-lg transition-all" 
                      disabled={isValidating || (!saasIdea && (!customIdea.businessName || !customIdea.coreValueProp))}
                    >
                      {isValidating ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Validating Idea...
                        </>
                      ) : (
                        "Validate Idea"
                      )}
                    </Button>
                  </div>
                  
                  {isValidating && (
                    <div className="mt-6 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{validationStage}</span>
                        <span>{validationProgress}%</span>
                      </div>
                      <Progress value={validationProgress} className="h-2" />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="result" className="mt-6">
            {validationResult ? (
              <div className="space-y-6">
                <Card className="border border-blue-100 dark:border-blue-900/30 overflow-hidden bg-gradient-to-br from-white to-blue-50/50 dark:from-gray-900 dark:to-gray-800 shadow-md">
                  <CardHeader className="border-b border-blue-100 dark:border-blue-900/20 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-2xl text-blue-700 dark:text-blue-400">Validation Results</CardTitle>
                        <CardDescription className="text-gray-600 dark:text-gray-400">
                          Analysis of your SaaS idea's market potential
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Overall Score:</span>
                        <Badge className={`text-white bg-gradient-to-r ${validationResult.overallScore >= 80 ? 'from-green-600 to-emerald-600' : validationResult.overallScore >= 60 ? 'from-amber-600 to-orange-600' : 'from-red-600 to-rose-600'} border-0 shadow-sm`}>
                          {validationResult.overallScore}/100
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-3">Validation Scores</h3>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="flex flex-col items-center p-4 bg-muted rounded-md">
                          <span className={`text-2xl font-bold ${getScoreColor(validationResult.desirabilityScore)}`}>
                            {validationResult.desirabilityScore}%
                          </span>
                          <span className="text-sm text-muted-foreground mt-1">Desirability</span>
                        </div>
                        <div className="flex flex-col items-center p-4 bg-muted rounded-md">
                          <span className={`text-2xl font-bold ${getScoreColor(validationResult.viabilityScore)}`}>
                            {validationResult.viabilityScore}%
                          </span>
                          <span className="text-sm text-muted-foreground mt-1">Viability</span>
                        </div>
                        <div className="flex flex-col items-center p-4 bg-muted rounded-md">
                          <span className={`text-2xl font-bold ${getScoreColor(validationResult.scalabilityScore)}`}>
                            {validationResult.scalabilityScore}%
                          </span>
                          <span className="text-sm text-muted-foreground mt-1">Scalability</span>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="font-medium mb-3">Jobs To Be Done</h3>
                      <ul className="space-y-2">
                        {validationResult.jobsToBeDone.map((job, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 shrink-0 mt-0.5" />
                            <span>{job}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="font-medium mb-3">Competitor Analysis</h3>
                      <div className="space-y-3">
                        {validationResult.competitors.map((competitor, index) => (
                          <div key={index} className="bg-muted p-3 rounded-md">
                            <h4 className="font-medium">{competitor.name}</h4>
                            <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                              <div>
                                <span className="text-muted-foreground">Strengths:</span>
                                <p>{competitor.strengths}</p>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Weaknesses:</span>
                                <p>{competitor.weaknesses}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-medium">Search Demand</h3>
                        <Badge className={getScoreBg(validationResult.searchDemand.score)}>
                          {validationResult.searchDemand.score}%
                        </Badge>
                      </div>
                      <div className="bg-muted rounded-md overflow-hidden">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left p-2">Keyword</th>
                              <th className="text-left p-2">Volume</th>
                              <th className="text-left p-2">Competition</th>
                            </tr>
                          </thead>
                          <tbody>
                            {validationResult.searchDemand.keywords.map((keyword, index) => (
                              <tr key={index} className={index !== validationResult.searchDemand.keywords.length - 1 ? "border-b" : ""}>
                                <td className="p-2">{keyword.term}</td>
                                <td className="p-2">{keyword.volume}</td>
                                <td className="p-2">{keyword.competition}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="font-medium mb-3">Ideal Customer Profile</h3>
                      <div className="bg-muted p-4 rounded-md">
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <span className="text-sm text-muted-foreground">Role</span>
                            <p className="font-medium">{validationResult.idealCustomerProfile.role}</p>
                          </div>
                          <div>
                            <span className="text-sm text-muted-foreground">Company Size</span>
                            <p className="font-medium">{validationResult.idealCustomerProfile.companySize}</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <span className="text-sm text-muted-foreground">Pain Points</span>
                            <ul className="mt-1 space-y-1">
                              {validationResult.idealCustomerProfile.painPoints.map((point, index) => (
                                <li key={index} className="text-sm flex items-start">
                                  <AlertCircle className="h-3 w-3 text-red-500 mr-2 shrink-0 mt-0.5" />
                                  <span>{point}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <span className="text-sm text-muted-foreground">Goals</span>
                            <ul className="mt-1 space-y-1">
                              {validationResult.idealCustomerProfile.goals.map((goal, index) => (
                                <li key={index} className="text-sm flex items-start">
                                  <CheckCircle2 className="h-3 w-3 text-green-500 mr-2 shrink-0 mt-0.5" />
                                  <span>{goal}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="font-medium mb-3">Recommended Distribution Channels</h3>
                      <div className="space-y-3">
                        {validationResult.distributionChannels.map((channel, index) => (
                          <div key={index} className="flex items-center justify-between bg-muted p-3 rounded-md">
                            <div>
                              <h4 className="font-medium">{channel.channel}</h4>
                              <p className="text-sm text-muted-foreground">Time to Results: {channel.timeToResults}</p>
                            </div>
                            <div className="flex items-center">
                              <span className={`font-medium mr-2 ${getEffectivenessColor(channel.effectiveness)}`}>
                                {channel.effectiveness}%
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="font-medium mb-3">Validation Summary</h3>
                      <div className="bg-muted p-4 rounded-md">
                        <p>{validationResult.validationSummary}</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end pt-6">
                    <Button onClick={handleProceedToSOW} className="flex items-center">
                      Proceed to SOW Creator
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            ) : (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                  <p className="text-muted-foreground">Validating your SaaS idea...</p>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
