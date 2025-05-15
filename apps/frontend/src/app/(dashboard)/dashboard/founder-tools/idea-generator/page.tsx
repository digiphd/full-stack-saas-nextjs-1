"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

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

export default function IdeaGeneratorPage() {
  const [formData, setFormData] = useState({
    industry: "",
    skills: "",
    customerType: "",
    timeConstraint: "3-6 months",
    budget: "Low",
    techStack: "Any",
    monetizationGoal: "Recurring Revenue"
  });
  
  const [generatedIdea, setGeneratedIdea] = useState<SaasIdea | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState("form");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    
    try {
      // Simulate API call with a delay
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock response data
      const mockIdea: SaasIdea = {
        businessName: "MetricFlow",
        coreValueProp: "Automated SaaS metrics dashboard that helps founders track key growth metrics with zero setup",
        targetMarket: "Early-stage B2B SaaS founders with 10-100 customers",
        primaryFeatures: [
          "One-click integration with Stripe, ChartMogul, and other SaaS tools",
          "Pre-built dashboards for MRR, churn, CAC, LTV",
          "Automated weekly email reports",
          "Investor-ready metrics export"
        ],
        differentiator: "No-code setup process that takes less than 5 minutes vs competitors requiring engineering resources",
        pricingModel: "Freemium with paid tiers based on connected data sources",
        stackRecommendation: {
          frontend: "Next.js with Tailwind CSS",
          backend: "Node.js with Express",
          database: "PostgreSQL",
          hosting: "Vercel",
          additionalTools: ["Stripe API", "Segment", "Postmark"]
        },
        timeToMvp: "2-3 months",
        exitPotential: 85
      };
      
      setGeneratedIdea(mockIdea);
      setActiveTab("result");
    } catch (error) {
      console.error("Error generating idea:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleExportJSON = () => {
    if (!generatedIdea) return;
    
    const dataStr = JSON.stringify(generatedIdea, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    
    const exportFileDefaultName = `${generatedIdea.businessName.toLowerCase().replace(/\s+/g, '-')}-saas-idea.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleProceedToValidator = () => {
    if (!generatedIdea) return;
    
    // Store the idea in localStorage to pass it to the validator
    localStorage.setItem('saasIdea', JSON.stringify(generatedIdea));
    
    // Navigate to the validator page
    window.location.href = '/dashboard/founder-tools/idea-validator';
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">MVP SaaS Idea Generator</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Generate a tailored SaaS idea based on your expertise, constraints, and business goals.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 p-1 rounded-lg">
            <TabsTrigger 
              value="form" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white dark:data-[state=active]:from-blue-600 dark:data-[state=active]:to-purple-600"
            >
              Input Parameters
            </TabsTrigger>
            <TabsTrigger 
              value="result" 
              disabled={!generatedIdea && !isGenerating}
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white dark:data-[state=active]:from-blue-600 dark:data-[state=active]:to-purple-600"
            >
              Generated Idea
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="form" className="mt-6">
            <Card className="border border-blue-100 dark:border-blue-900/30 overflow-hidden bg-gradient-to-br from-white to-blue-50/50 dark:from-gray-900 dark:to-gray-800 shadow-md">
              <CardHeader className="border-b border-blue-100 dark:border-blue-900/20 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
                <CardTitle className="text-blue-700 dark:text-blue-400">Define Your SaaS Parameters</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Fill in the details below to generate a SaaS idea tailored to your specific needs and goals.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="industry" className="text-blue-700 dark:text-blue-400 font-medium">Industry / Domain Expertise</Label>
                      <Input
                        id="industry"
                        name="industry"
                        placeholder="e.g., Healthcare, Finance, Education"
                        value={formData.industry}
                        onChange={handleInputChange}
                        required
                        className="border-blue-200 dark:border-blue-900/50 focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-400 dark:focus:ring-blue-400 bg-white dark:bg-gray-800"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="skills" className="text-blue-700 dark:text-blue-400 font-medium">Technical Skills</Label>
                      <Input
                        id="skills"
                        name="skills"
                        placeholder="e.g., Full-stack, AI/ML, Mobile development"
                        value={formData.skills}
                        onChange={handleInputChange}
                        required
                        className="border-blue-200 dark:border-blue-900/50 focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-400 dark:focus:ring-blue-400 bg-white dark:bg-gray-800"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="customerType">Preferred Customer Type</Label>
                      <Select
                        name="customerType"
                        value={formData.customerType}
                        onValueChange={(value) => handleSelectChange("customerType", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select customer type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="B2B">B2B (Business to Business)</SelectItem>
                          <SelectItem value="B2C">B2C (Business to Consumer)</SelectItem>
                          <SelectItem value="B2B2C">B2B2C (Business to Business to Consumer)</SelectItem>
                          <SelectItem value="Enterprise">Enterprise</SelectItem>
                          <SelectItem value="SMB">Small/Medium Business</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="timeConstraint">Time Availability</Label>
                      <Select
                        name="timeConstraint"
                        value={formData.timeConstraint}
                        onValueChange={(value) => handleSelectChange("timeConstraint", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select time constraint" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-3 months">1-3 months (Quick MVP)</SelectItem>
                          <SelectItem value="3-6 months">3-6 months (Standard)</SelectItem>
                          <SelectItem value="6-12 months">6-12 months (Complex)</SelectItem>
                          <SelectItem value="12+ months">12+ months (Enterprise-grade)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="budget">Budget Constraint</Label>
                      <Select
                        name="budget"
                        value={formData.budget}
                        onValueChange={(value) => handleSelectChange("budget", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select budget constraint" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Low">Low (Bootstrapped)</SelectItem>
                          <SelectItem value="Medium">Medium (Small seed funding)</SelectItem>
                          <SelectItem value="High">High (Well-funded)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="techStack">Tech Stack Preference</Label>
                      <Select
                        name="techStack"
                        value={formData.techStack}
                        onValueChange={(value) => handleSelectChange("techStack", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select tech stack" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Any">Any (No preference)</SelectItem>
                          <SelectItem value="JavaScript">JavaScript (React, Node.js)</SelectItem>
                          <SelectItem value="Python">Python (Django, Flask)</SelectItem>
                          <SelectItem value="Ruby">Ruby (Rails)</SelectItem>
                          <SelectItem value="Java">Java (Spring)</SelectItem>
                          <SelectItem value="PHP">PHP (Laravel)</SelectItem>
                          <SelectItem value=".NET">.NET (C#)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="monetizationGoal">Monetization Goal</Label>
                      <Select
                        name="monetizationGoal"
                        value={formData.monetizationGoal}
                        onValueChange={(value) => handleSelectChange("monetizationGoal", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select monetization goal" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Recurring Revenue">Recurring Revenue (Subscription)</SelectItem>
                          <SelectItem value="Quick Exit">Quick Exit (Acquisition)</SelectItem>
                          <SelectItem value="Passive Income">Passive Income (Low maintenance)</SelectItem>
                          <SelectItem value="High Growth">High Growth (VC funding)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:from-blue-500 dark:to-purple-500 dark:hover:from-blue-600 dark:hover:to-purple-600 text-white border-0 shadow-md hover:shadow-lg transition-all" 
                      disabled={isGenerating}
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Generating Your SaaS Idea...
                        </>
                      ) : (
                        "Generate SaaS Idea"
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="result" className="mt-6">
            {generatedIdea ? (
              <div className="space-y-6">
                <Card className="border border-purple-100 dark:border-purple-900/30 overflow-hidden bg-gradient-to-br from-white to-purple-50/50 dark:from-gray-900 dark:to-gray-800 shadow-md">
                  <CardHeader className="pb-3 border-b border-purple-100 dark:border-purple-900/20 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-2xl text-purple-700 dark:text-purple-400">{generatedIdea.businessName}</CardTitle>
                        <CardDescription className="mt-2 text-gray-600 dark:text-gray-400">
                          {generatedIdea.coreValueProp}
                        </CardDescription>
                      </div>
                      <Badge className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 dark:from-green-500 dark:to-emerald-500 border-0 shadow-sm">
                        {generatedIdea.exitPotential}% Exit Potential
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-medium text-sm text-muted-foreground mb-2">Target Market</h3>
                        <p className="font-medium">{generatedIdea.targetMarket}</p>
                      </div>
                      <div>
                        <h3 className="font-medium text-sm text-muted-foreground mb-2">Differentiator</h3>
                        <p className="font-medium">{generatedIdea.differentiator}</p>
                      </div>
                      <div>
                        <h3 className="font-medium text-sm text-muted-foreground mb-2">Pricing Model</h3>
                        <p className="font-medium">{generatedIdea.pricingModel}</p>
                      </div>
                      <div>
                        <h3 className="font-medium text-sm text-muted-foreground mb-2">Time to MVP</h3>
                        <p className="font-medium">{generatedIdea.timeToMvp}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-sm text-muted-foreground mb-2">Primary Features</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        {generatedIdea.primaryFeatures.map((feature, index) => (
                          <li key={index} className="font-medium">{feature}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-sm text-muted-foreground mb-2">Recommended Tech Stack</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-muted-foreground">Frontend</p>
                          <p className="font-medium">{generatedIdea.stackRecommendation.frontend}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Backend</p>
                          <p className="font-medium">{generatedIdea.stackRecommendation.backend}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Database</p>
                          <p className="font-medium">{generatedIdea.stackRecommendation.database}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Hosting</p>
                          <p className="font-medium">{generatedIdea.stackRecommendation.hosting}</p>
                        </div>
                      </div>
                      <div className="mt-2">
                        <p className="text-xs text-muted-foreground">Additional Tools</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {generatedIdea.stackRecommendation.additionalTools.map((tool, index) => (
                            <Badge key={index} variant="outline">{tool}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <Button onClick={handleExportJSON} variant="outline">
                        Export as JSON
                      </Button>
                      <Button onClick={handleProceedToValidator} className="bg-green-600 hover:bg-green-700">
                        Proceed to Idea Validator
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                  <p className="text-muted-foreground">Generating your SaaS idea...</p>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
