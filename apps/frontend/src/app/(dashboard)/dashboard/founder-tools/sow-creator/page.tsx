"use client";

import { useState, useEffect } from "react";
import { Loader2, FileText, Download, Copy, CheckCheck, ArrowRight, FileCode } from "lucide-react";
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

interface UserStory {
  id: string;
  role: string;
  action: string;
  benefit: string;
  priority: "High" | "Medium" | "Low";
  selected: boolean;
}

interface Milestone {
  id: string;
  title: string;
  description: string;
  duration: string;
  selected: boolean;
}

interface Page {
  id: string;
  name: string;
  description: string;
  selected: boolean;
}

export default function SowCreatorPage() {
  const [saasIdea, setSaasIdea] = useState<SaasIdea | null>(null);
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState("input");
  const [sowGenerated, setSOWGenerated] = useState(false);
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);
  
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectObjectives, setProjectObjectives] = useState("");
  const [userStories, setUserStories] = useState<UserStory[]>([]);
  const [pages, setPages] = useState<Page[]>([]);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [includeAuth, setIncludeAuth] = useState(true);
  const [includePayments, setIncludePayments] = useState(false);
  const [includeAnalytics, setIncludeAnalytics] = useState(true);

  useEffect(() => {
    // Check if there's a SaaS idea and validation result in localStorage
    const storedIdea = localStorage.getItem('saasIdea');
    const storedValidation = localStorage.getItem('validationResult');
    
    if (storedIdea) {
      try {
        const parsedIdea = JSON.parse(storedIdea);
        setSaasIdea(parsedIdea);
        setProjectTitle(`${parsedIdea.businessName} - MVP Development`);
        setProjectDescription(parsedIdea.coreValueProp);
      } catch (error) {
        console.error("Error parsing stored idea:", error);
      }
    }
    
    if (storedValidation) {
      try {
        const parsedValidation = JSON.parse(storedValidation);
        setValidationResult(parsedValidation);
        
        // Generate project objectives from jobs to be done
        if (parsedValidation.jobsToBeDone && parsedValidation.jobsToBeDone.length > 0) {
          const objectives = parsedValidation.jobsToBeDone.map(job => `- ${job}`).join('\n');
          setProjectObjectives(`The primary objectives of this project are to:\n${objectives}`);
        }
      } catch (error) {
        console.error("Error parsing stored validation:", error);
      }
    }
    
    // Generate default user stories, pages, and milestones based on the idea
    if (storedIdea) {
      try {
        const parsedIdea = JSON.parse(storedIdea);
        
        // Generate user stories based on primary features
        const generatedUserStories: UserStory[] = parsedIdea.primaryFeatures.map((feature, index) => {
          // Convert feature to user story format
          const role = parsedIdea.targetMarket.includes("founder") ? "a SaaS founder" : 
                      parsedIdea.targetMarket.includes("marketer") ? "a marketing professional" :
                      "a user";
          
          let action = "";
          let benefit = "";
          
          if (feature.toLowerCase().includes("dashboard")) {
            action = "view a dashboard of key metrics";
            benefit = "I can make data-driven decisions quickly";
          } else if (feature.toLowerCase().includes("integration")) {
            action = "integrate with my existing tools";
            benefit = "I can consolidate my workflow without disruption";
          } else if (feature.toLowerCase().includes("report")) {
            action = "generate automated reports";
            benefit = "I can save time and share insights with stakeholders";
          } else if (feature.toLowerCase().includes("export")) {
            action = "export data in various formats";
            benefit = "I can use the information in other systems";
          } else {
            // Generic transformation
            const parts = feature.split("with");
            if (parts.length > 1) {
              action = parts[0].trim().toLowerCase();
              benefit = `I can leverage ${parts[1].trim().toLowerCase()}`;
            } else {
              action = feature.toLowerCase();
              benefit = "I can improve my workflow efficiency";
            }
          }
          
          return {
            id: `story-${index + 1}`,
            role: `As ${role}`,
            action: `I want to ${action}`,
            benefit: `so that ${benefit}`,
            priority: index < 2 ? "High" : index < 4 ? "Medium" : "Low",
            selected: true
          };
        });
        
        setUserStories(generatedUserStories);
        
        // Generate pages based on common SaaS patterns
        const generatedPages: Page[] = [
          {
            id: "page-1",
            name: "Landing Page",
            description: "Main marketing page explaining the value proposition",
            selected: true
          },
          {
            id: "page-2",
            name: "Dashboard",
            description: "Main user interface showing key metrics and actions",
            selected: true
          },
          {
            id: "page-3",
            name: "User Profile",
            description: "Page for managing user settings and preferences",
            selected: true
          },
          {
            id: "page-4",
            name: "Integration Settings",
            description: "Page for connecting third-party services",
            selected: parsedIdea.primaryFeatures.some(f => f.toLowerCase().includes("integration"))
          },
          {
            id: "page-5",
            name: "Reports",
            description: "Page for viewing and exporting detailed reports",
            selected: parsedIdea.primaryFeatures.some(f => f.toLowerCase().includes("report"))
          },
          {
            id: "page-6",
            name: "Billing & Subscription",
            description: "Page for managing payment methods and subscription plans",
            selected: false
          }
        ];
        
        setPages(generatedPages);
        
        // Generate milestones
        const generatedMilestones: Milestone[] = [
          {
            id: "milestone-1",
            title: "Project Setup & Architecture",
            description: "Initialize codebase, set up CI/CD, and establish core architecture",
            duration: "1 week",
            selected: true
          },
          {
            id: "milestone-2",
            title: "User Authentication & Core UI",
            description: "Implement user authentication, dashboard layout, and navigation",
            duration: "2 weeks",
            selected: true
          },
          {
            id: "milestone-3",
            title: "Core Feature Development",
            description: `Implement primary features: ${parsedIdea.primaryFeatures.slice(0, 2).join(", ")}`,
            duration: "3 weeks",
            selected: true
          },
          {
            id: "milestone-4",
            title: "Secondary Features & Integrations",
            description: "Implement remaining features and third-party integrations",
            duration: "2 weeks",
            selected: true
          },
          {
            id: "milestone-5",
            title: "Testing & Refinement",
            description: "Comprehensive testing, bug fixes, and UX refinements",
            duration: "2 weeks",
            selected: true
          },
          {
            id: "milestone-6",
            title: "Deployment & Launch Preparation",
            description: "Production deployment, documentation, and launch preparations",
            duration: "1 week",
            selected: true
          }
        ];
        
        setMilestones(generatedMilestones);
        
        // Set default options based on features
        setIncludePayments(parsedIdea.pricingModel.toLowerCase().includes("subscription"));
        setIncludeAnalytics(parsedIdea.primaryFeatures.some(f => 
          f.toLowerCase().includes("analytics") || 
          f.toLowerCase().includes("metrics") || 
          f.toLowerCase().includes("dashboard")
        ));
        
      } catch (error) {
        console.error("Error generating defaults:", error);
      }
    }
  }, []);

  const toggleUserStorySelection = (id: string) => {
    setUserStories(prev => 
      prev.map(story => 
        story.id === id ? { ...story, selected: !story.selected } : story
      )
    );
  };

  const togglePageSelection = (id: string) => {
    setPages(prev => 
      prev.map(page => 
        page.id === id ? { ...page, selected: !page.selected } : page
      )
    );
  };

  const toggleMilestoneSelection = (id: string) => {
    setMilestones(prev => 
      prev.map(milestone => 
        milestone.id === id ? { ...milestone, selected: !milestone.selected } : milestone
      )
    );
  };

  const handleGenerateSOW = async () => {
    setIsGenerating(true);
    
    try {
      // Simulate API call with a delay
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      setSOWGenerated(true);
      setActiveTab("result");
    } catch (error) {
      console.error("Error generating SOW:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyToClipboard = () => {
    const sowContent = document.getElementById('sow-content');
    if (sowContent) {
      navigator.clipboard.writeText(sowContent.innerText)
        .then(() => {
          setCopiedToClipboard(true);
          setTimeout(() => setCopiedToClipboard(false), 2000);
        })
        .catch(err => {
          console.error('Failed to copy: ', err);
        });
    }
  };

  const handleDownloadPDF = () => {
    // In a real implementation, this would generate a PDF
    // For now, we'll just simulate it with a delay
    alert("PDF download functionality would be implemented here. This would typically involve server-side PDF generation.");
  };

  const renderSOWDocument = () => {
    if (!saasIdea) return null;
    
    const selectedUserStories = userStories.filter(story => story.selected);
    const selectedPages = pages.filter(page => page.selected);
    const selectedMilestones = milestones.filter(milestone => milestone.selected);
    
    return (
      <div id="sow-content" className="prose prose-sm max-w-none dark:prose-invert">
        <h1>{projectTitle}</h1>
        <p className="text-muted-foreground">Generated on {new Date().toLocaleDateString()}</p>
        
        <h2>1. Project Overview</h2>
        <p>{projectDescription}</p>
        
        <h3>1.1 Project Objectives</h3>
        <p className="whitespace-pre-line">{projectObjectives}</p>
        
        <h2>2. Technical Stack</h2>
        <div className="grid grid-cols-2 gap-4 not-prose mb-6">
          <div className="bg-muted p-3 rounded-md">
            <h4 className="font-medium">Frontend</h4>
            <p>{saasIdea.stackRecommendation.frontend}</p>
          </div>
          <div className="bg-muted p-3 rounded-md">
            <h4 className="font-medium">Backend</h4>
            <p>{saasIdea.stackRecommendation.backend}</p>
          </div>
          <div className="bg-muted p-3 rounded-md">
            <h4 className="font-medium">Database</h4>
            <p>{saasIdea.stackRecommendation.database}</p>
          </div>
          <div className="bg-muted p-3 rounded-md">
            <h4 className="font-medium">Hosting</h4>
            <p>{saasIdea.stackRecommendation.hosting}</p>
          </div>
        </div>
        
        <h3>2.1 Additional Tools & Services</h3>
        <ul>
          {saasIdea.stackRecommendation.additionalTools.map((tool, index) => (
            <li key={index}>{tool}</li>
          ))}
          {includeAuth && <li>Authentication Service (Clerk/Auth0/Supabase Auth)</li>}
          {includePayments && <li>Payment Processing (Stripe)</li>}
          {includeAnalytics && <li>Analytics (PostHog/Mixpanel/Google Analytics)</li>}
        </ul>
        
        <h2>3. User Stories</h2>
        <div className="space-y-4 not-prose">
          {selectedUserStories.map((story, index) => (
            <div key={story.id} className="bg-muted p-3 rounded-md">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">{story.role}</h4>
                <Badge variant={
                  story.priority === "High" ? "default" : 
                  story.priority === "Medium" ? "secondary" : "outline"
                }>
                  {story.priority}
                </Badge>
              </div>
              <p className="mt-1">{story.action}</p>
              <p className="text-muted-foreground text-sm">{story.benefit}</p>
            </div>
          ))}
        </div>
        
        <h2>4. Pages/Screens</h2>
        <div className="space-y-4 not-prose">
          {selectedPages.map((page) => (
            <div key={page.id} className="bg-muted p-3 rounded-md">
              <h4 className="font-medium">{page.name}</h4>
              <p className="text-sm text-muted-foreground">{page.description}</p>
            </div>
          ))}
        </div>
        
        <h2>5. Development Milestones</h2>
        <div className="space-y-4 not-prose">
          {selectedMilestones.map((milestone, index) => (
            <div key={milestone.id} className="bg-muted p-3 rounded-md">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">{milestone.title}</h4>
                <Badge variant="outline">{milestone.duration}</Badge>
              </div>
              <p className="text-sm mt-1">{milestone.description}</p>
            </div>
          ))}
        </div>
        
        <h2>6. Success Criteria</h2>
        <p>The project will be considered successful when:</p>
        <ul>
          <li>All selected user stories are implemented and functional</li>
          <li>The application is deployed to production environment</li>
          <li>The application passes all security and performance tests</li>
          <li>The UI/UX is consistent with the approved design system</li>
          <li>Documentation is complete and comprehensive</li>
        </ul>
        
        <h2>7. Timeline & Next Steps</h2>
        <p>Based on the selected milestones, the estimated timeline for this project is {
          selectedMilestones.reduce((total, milestone) => {
            const duration = parseInt(milestone.duration.split(' ')[0]);
            return total + duration;
          }, 0)
        } weeks.</p>
        
        <p>To proceed with this project:</p>
        <ol>
          <li>Review and finalize this Statement of Work</li>
          <li>Assemble the development team</li>
          <li>Schedule a kickoff meeting</li>
          <li>Begin with the first milestone: {selectedMilestones[0]?.title}</li>
        </ol>
        
        <div className="mt-8 pt-8 border-t border-muted">
          <p className="text-center text-muted-foreground">
            This Statement of Work was generated using the SaaS Starter Kit SOW Creator.
            <br />
            To build this project with our team, contact us at example@saasstarterkit.com
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-400 dark:to-blue-400">Statement of Work Generator</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Create a detailed Statement of Work (SOW) for your validated SaaS idea.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 p-1 rounded-lg">
            <TabsTrigger 
              value="input" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-blue-500 data-[state=active]:text-white dark:data-[state=active]:from-green-600 dark:data-[state=active]:to-blue-600"
            >
              SOW Configuration
            </TabsTrigger>
            <TabsTrigger 
              value="result" 
              disabled={!sowGenerated && !isGenerating}
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-blue-500 data-[state=active]:text-white dark:data-[state=active]:from-green-600 dark:data-[state=active]:to-blue-600"
            >
              Generated SOW
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="input" className="mt-6">
            <div className="space-y-6">
              <Card className="border border-green-100 dark:border-green-900/30 overflow-hidden bg-gradient-to-br from-white to-green-50/50 dark:from-gray-900 dark:to-gray-800 shadow-md">
                <CardHeader className="border-b border-green-100 dark:border-green-900/20 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
                  <CardTitle className="text-green-700 dark:text-green-400">Project Information</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    Define the basic information for your Statement of Work.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="projectTitle" className="text-green-700 dark:text-green-400 font-medium">Project Title</Label>
                      <Input
                        id="projectTitle"
                        value={projectTitle}
                        onChange={(e) => setProjectTitle(e.target.value)}
                        placeholder="e.g., MetricFlow MVP Development"
                        className="border-green-200 dark:border-green-900/50 focus:border-green-500 focus:ring-green-500 dark:focus:border-green-400 dark:focus:ring-green-400 bg-white dark:bg-gray-800"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="projectDescription" className="text-green-700 dark:text-green-400 font-medium">Project Description</Label>
                      <Textarea
                        id="projectDescription"
                        value={projectDescription}
                        onChange={(e) => setProjectDescription(e.target.value)}
                        placeholder="Brief description of the project"
                        rows={3}
                        className="border-green-200 dark:border-green-900/50 focus:border-green-500 focus:ring-green-500 dark:focus:border-green-400 dark:focus:ring-green-400 bg-white dark:bg-gray-800"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="projectObjectives" className="text-green-700 dark:text-green-400 font-medium">Project Objectives</Label>
                      <Textarea
                        id="projectObjectives"
                        value={projectObjectives}
                        onChange={(e) => setProjectObjectives(e.target.value)}
                        placeholder="Key objectives of the project"
                        rows={4}
                        className="border-green-200 dark:border-green-900/50 focus:border-green-500 focus:ring-green-500 dark:focus:border-green-400 dark:focus:ring-green-400 bg-white dark:bg-gray-800"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border border-blue-100 dark:border-blue-900/30 overflow-hidden bg-gradient-to-br from-white to-blue-50/50 dark:from-gray-900 dark:to-gray-800 shadow-md">
                <CardHeader className="border-b border-blue-100 dark:border-blue-900/20 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20">
                  <CardTitle className="text-blue-700 dark:text-blue-400">Technical Stack</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    The recommended technical stack for your SaaS product.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  {saasIdea ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-muted p-3 rounded-md">
                          <h4 className="font-medium text-sm">Frontend</h4>
                          <p>{saasIdea.stackRecommendation.frontend}</p>
                        </div>
                        <div className="bg-muted p-3 rounded-md">
                          <h4 className="font-medium text-sm">Backend</h4>
                          <p>{saasIdea.stackRecommendation.backend}</p>
                        </div>
                        <div className="bg-muted p-3 rounded-md">
                          <h4 className="font-medium text-sm">Database</h4>
                          <p>{saasIdea.stackRecommendation.database}</p>
                        </div>
                        <div className="bg-muted p-3 rounded-md">
                          <h4 className="font-medium text-sm">Hosting</h4>
                          <p>{saasIdea.stackRecommendation.hosting}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm">Additional Services</h4>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Switch
                              id="auth"
                              checked={includeAuth}
                              onCheckedChange={setIncludeAuth}
                            />
                            <Label htmlFor="auth">Authentication Service</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch
                              id="payments"
                              checked={includePayments}
                              onCheckedChange={setIncludePayments}
                            />
                            <Label htmlFor="payments">Payment Processing</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch
                              id="analytics"
                              checked={includeAnalytics}
                              onCheckedChange={setIncludeAnalytics}
                            />
                            <Label htmlFor="analytics">Analytics</Label>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No SaaS idea data available. Please generate an idea first.</p>
                  )}
                </CardContent>
              </Card>
              
              <Card className="border border-purple-100 dark:border-purple-900/30 overflow-hidden bg-gradient-to-br from-white to-purple-50/50 dark:from-gray-900 dark:to-gray-800 shadow-md">
                <CardHeader className="border-b border-purple-100 dark:border-purple-900/20 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
                  <CardTitle className="text-purple-700 dark:text-purple-400">User Stories</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    Select the user stories to include in your SOW.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {userStories.map((story) => (
                      <div key={story.id} className="flex items-start space-x-3">
                        <Checkbox
                          id={story.id}
                          checked={story.selected}
                          onCheckedChange={() => toggleUserStorySelection(story.id)}
                        />
                        <div className="space-y-1">
                          <Label htmlFor={story.id} className="font-medium">
                            {story.role}
                          </Label>
                          <p className="text-sm">{story.action}</p>
                          <p className="text-xs text-muted-foreground">{story.benefit}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border border-indigo-100 dark:border-indigo-900/30 overflow-hidden bg-gradient-to-br from-white to-indigo-50/50 dark:from-gray-900 dark:to-gray-800 shadow-md">
                <CardHeader className="border-b border-indigo-100 dark:border-indigo-900/20 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
                  <CardTitle className="text-indigo-700 dark:text-indigo-400">Pages/Screens</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    Select the pages/screens to include in your SOW.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {pages.map((page) => (
                      <div key={page.id} className="flex items-start space-x-3">
                        <Checkbox
                          id={page.id}
                          checked={page.selected}
                          onCheckedChange={() => togglePageSelection(page.id)}
                        />
                        <div className="space-y-1">
                          <Label htmlFor={page.id} className="font-medium">
                            {page.name}
                          </Label>
                          <p className="text-xs text-muted-foreground">{page.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border border-teal-100 dark:border-teal-900/30 overflow-hidden bg-gradient-to-br from-white to-teal-50/50 dark:from-gray-900 dark:to-gray-800 shadow-md">
                <CardHeader className="border-b border-teal-100 dark:border-teal-900/20 bg-gradient-to-r from-teal-50 to-indigo-50 dark:from-teal-900/20 dark:to-indigo-900/20">
                  <CardTitle className="text-teal-700 dark:text-teal-400">Development Milestones</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    Select the development milestones to include in your SOW.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {milestones.map((milestone) => (
                      <div key={milestone.id} className="flex items-start space-x-3">
                        <Checkbox
                          id={milestone.id}
                          checked={milestone.selected}
                          onCheckedChange={() => toggleMilestoneSelection(milestone.id)}
                        />
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <Label htmlFor={milestone.id} className="font-medium">
                              {milestone.title}
                            </Label>
                            <Badge variant="outline">{milestone.duration}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{milestone.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end pt-6">
                  <Button 
                    onClick={handleGenerateSOW} 
                    disabled={isGenerating || !projectTitle || !projectDescription}
                    className="flex items-center bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 dark:from-teal-500 dark:to-blue-500 dark:hover:from-teal-600 dark:hover:to-blue-600 text-white shadow-md"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating SOW...
                      </>
                    ) : (
                      <>
                        Generate Statement of Work
                        <FileText className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="result" className="mt-6">
            {sowGenerated ? (
              <div className="space-y-6">
                <Card className="border border-blue-100 dark:border-blue-900/30 overflow-hidden bg-gradient-to-br from-white to-blue-50/50 dark:from-gray-900 dark:to-gray-800 shadow-md">
                  <CardHeader className="border-b border-blue-100 dark:border-blue-900/20 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-blue-700 dark:text-blue-400">Statement of Work</CardTitle>
                        <CardDescription className="text-gray-600 dark:text-gray-400">
                          Your generated SOW for {saasIdea?.businessName || projectTitle}
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
                    {renderSOWDocument()}
                  </CardContent>
                  <CardFooter className="flex justify-between pt-6">
                    <Button 
                      variant="outline"
                      onClick={() => setActiveTab("input")}
                      className="flex items-center border-gray-200 hover:border-gray-300 hover:bg-gray-50 dark:border-gray-700 dark:hover:border-gray-600 dark:hover:bg-gray-900/30 text-gray-600 dark:text-gray-400"
                    >
                      Back to Configuration
                    </Button>
                    <Button className="flex items-center bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 dark:from-blue-500 dark:to-green-500 dark:hover:from-blue-600 dark:hover:to-green-600 text-white shadow-md">
                      Book Launch Build With Us
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            ) : (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                  <p className="text-muted-foreground">Generating your Statement of Work...</p>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
