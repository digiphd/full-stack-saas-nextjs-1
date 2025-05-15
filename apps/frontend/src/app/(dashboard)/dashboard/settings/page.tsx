"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { 
  Settings, 
  Save, 
  Bot, 
  Terminal, 
  DollarSign, 
  Clock, 
  RefreshCw,
  AlertCircle
} from "lucide-react";

export default function SettingsPage() {
  // AI Model Settings
  const [aiModel, setAiModel] = useState("gpt-4");
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(2000);
  const [enableAdvancedAI, setEnableAdvancedAI] = useState(true);
  
  // System Command Settings
  const [systemPrompt, setSystemPrompt] = useState(
    "You are an AI assistant helping with SaaS business planning and development."
  );
  const [enableLogging, setEnableLogging] = useState(true);
  const [debugMode, setDebugMode] = useState(false);
  
  // Financial Goals
  const [targetMRR, setTargetMRR] = useState(10000);
  const [targetARR, setTargetARR] = useState(120000);
  const [burnRate, setBurnRate] = useState(5000);
  const [runway, setRunway] = useState(18);
  
  // Timeline Settings
  const [mvpDeadline, setMvpDeadline] = useState("2025-08-15");
  const [betaLaunch, setBetaLaunch] = useState("2025-10-01");
  const [publicLaunch, setPublicLaunch] = useState("2025-12-01");
  
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("ai");
  
  const handleSaveSettings = async () => {
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // In a real app, you would save these settings to your backend
    console.log("Settings saved:", {
      aiModel, temperature, maxTokens, enableAdvancedAI,
      systemPrompt, enableLogging, debugMode,
      targetMRR, targetARR, burnRate, runway,
      mvpDeadline, betaLaunch, publicLaunch
    });
    
    setIsSaving(false);
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">Settings</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Configure your AI assistant, system commands, financial goals, and project timeline.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 p-1 rounded-lg">
            <TabsTrigger 
              value="ai" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white dark:data-[state=active]:from-blue-600 dark:data-[state=active]:to-purple-600"
            >
              AI Model
            </TabsTrigger>
            <TabsTrigger 
              value="system" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white dark:data-[state=active]:from-blue-600 dark:data-[state=active]:to-purple-600"
            >
              System Commands
            </TabsTrigger>
            <TabsTrigger 
              value="financial" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white dark:data-[state=active]:from-blue-600 dark:data-[state=active]:to-purple-600"
            >
              Financial Goals
            </TabsTrigger>
            <TabsTrigger 
              value="timeline" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white dark:data-[state=active]:from-blue-600 dark:data-[state=active]:to-purple-600"
            >
              Timeline
            </TabsTrigger>
          </TabsList>
          
          {/* AI Model Settings */}
          <TabsContent value="ai" className="mt-6">
            <Card className="border border-blue-100 dark:border-blue-900/30 overflow-hidden bg-gradient-to-br from-white to-blue-50/50 dark:from-gray-900 dark:to-gray-800 shadow-md">
              <CardHeader className="border-b border-blue-100 dark:border-blue-900/20 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
                <div className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <CardTitle className="text-blue-700 dark:text-blue-400">AI Model Configuration</CardTitle>
                </div>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Configure the AI model settings for your founder tools.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="ai-model" className="text-blue-700 dark:text-blue-400 font-medium">AI Model</Label>
                  <Select value={aiModel} onValueChange={setAiModel}>
                    <SelectTrigger id="ai-model" className="border-blue-200 dark:border-blue-900/50 focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-400 dark:focus:ring-blue-400 bg-white dark:bg-gray-800">
                      <SelectValue placeholder="Select AI model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                      <SelectItem value="gpt-4">GPT-4</SelectItem>
                      <SelectItem value="gpt-4-turbo">GPT-4 Turbo</SelectItem>
                      <SelectItem value="claude-3">Claude 3</SelectItem>
                      <SelectItem value="llama-3">Llama 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center">
                      <Label htmlFor="temperature" className="text-blue-700 dark:text-blue-400 font-medium">Temperature: {temperature}</Label>
                      <span className="text-sm text-gray-500 dark:text-gray-400">(0.1 - 1.0)</span>
                    </div>
                    <div className="mt-2">
                      <input
                        id="temperature"
                        type="range"
                        min="0.1"
                        max="1.0"
                        step="0.1"
                        value={temperature}
                        onChange={(e) => setTemperature(parseFloat(e.target.value))}
                        className="w-full h-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Higher values make output more random, lower values make it more focused and deterministic.
                    </p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center">
                      <Label htmlFor="max-tokens" className="text-blue-700 dark:text-blue-400 font-medium">Max Tokens: {maxTokens}</Label>
                      <span className="text-sm text-gray-500 dark:text-gray-400">(500 - 4000)</span>
                    </div>
                    <div className="mt-2">
                      <input
                        id="max-tokens"
                        type="range"
                        min="500"
                        max="4000"
                        step="100"
                        value={maxTokens}
                        onChange={(e) => setMaxTokens(parseInt(e.target.value))}
                        className="w-full h-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Maximum number of tokens to generate in the completion.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="advanced-ai" 
                    checked={enableAdvancedAI} 
                    onCheckedChange={setEnableAdvancedAI} 
                  />
                  <Label htmlFor="advanced-ai" className="text-blue-700 dark:text-blue-400 font-medium">
                    Enable Advanced AI Features
                  </Label>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* System Command Settings */}
          <TabsContent value="system" className="mt-6">
            <Card className="border border-purple-100 dark:border-purple-900/30 overflow-hidden bg-gradient-to-br from-white to-purple-50/50 dark:from-gray-900 dark:to-gray-800 shadow-md">
              <CardHeader className="border-b border-purple-100 dark:border-purple-900/20 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
                <div className="flex items-center gap-2">
                  <Terminal className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  <CardTitle className="text-purple-700 dark:text-purple-400">System Commands</CardTitle>
                </div>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Configure system commands and behavior for the AI assistant.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="system-prompt" className="text-purple-700 dark:text-purple-400 font-medium">System Prompt</Label>
                  <Textarea 
                    id="system-prompt" 
                    placeholder="Enter system prompt instructions for the AI" 
                    value={systemPrompt}
                    onChange={(e) => setSystemPrompt(e.target.value)}
                    className="h-32 border-purple-200 dark:border-purple-900/50 focus:border-purple-500 focus:ring-purple-500 dark:focus:border-purple-400 dark:focus:ring-purple-400 bg-white dark:bg-gray-800"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    This prompt sets the behavior and context for the AI assistant.
                  </p>
                </div>
                
                <div className="flex flex-col gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="enable-logging" 
                      checked={enableLogging} 
                      onCheckedChange={setEnableLogging} 
                    />
                    <Label htmlFor="enable-logging" className="text-purple-700 dark:text-purple-400 font-medium">
                      Enable AI Conversation Logging
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="debug-mode" 
                      checked={debugMode} 
                      onCheckedChange={setDebugMode} 
                    />
                    <Label htmlFor="debug-mode" className="text-purple-700 dark:text-purple-400 font-medium">
                      Debug Mode
                    </Label>
                  </div>
                </div>
                
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800/30 rounded-md p-4 flex gap-3">
                  <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-300">Advanced Settings</h4>
                    <p className="text-xs text-yellow-700 dark:text-yellow-400 mt-1">
                      Changing system commands may affect how the AI responds to your queries. Use with caution.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Financial Goals */}
          <TabsContent value="financial" className="mt-6">
            <Card className="border border-green-100 dark:border-green-900/30 overflow-hidden bg-gradient-to-br from-white to-green-50/50 dark:from-gray-900 dark:to-gray-800 shadow-md">
              <CardHeader className="border-b border-green-100 dark:border-green-900/20 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <CardTitle className="text-green-700 dark:text-green-400">Financial Goals</CardTitle>
                </div>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Set your financial targets and metrics for your SaaS business.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="target-mrr" className="text-green-700 dark:text-green-400 font-medium">Target Monthly Recurring Revenue ($)</Label>
                    <Input 
                      id="target-mrr" 
                      type="number" 
                      value={targetMRR}
                      onChange={(e) => setTargetMRR(parseInt(e.target.value))}
                      className="border-green-200 dark:border-green-900/50 focus:border-green-500 focus:ring-green-500 dark:focus:border-green-400 dark:focus:ring-green-400 bg-white dark:bg-gray-800"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="target-arr" className="text-green-700 dark:text-green-400 font-medium">Target Annual Recurring Revenue ($)</Label>
                    <Input 
                      id="target-arr" 
                      type="number" 
                      value={targetARR}
                      onChange={(e) => setTargetARR(parseInt(e.target.value))}
                      className="border-green-200 dark:border-green-900/50 focus:border-green-500 focus:ring-green-500 dark:focus:border-green-400 dark:focus:ring-green-400 bg-white dark:bg-gray-800"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="burn-rate" className="text-green-700 dark:text-green-400 font-medium">Monthly Burn Rate ($)</Label>
                    <Input 
                      id="burn-rate" 
                      type="number" 
                      value={burnRate}
                      onChange={(e) => setBurnRate(parseInt(e.target.value))}
                      className="border-green-200 dark:border-green-900/50 focus:border-green-500 focus:ring-green-500 dark:focus:border-green-400 dark:focus:ring-green-400 bg-white dark:bg-gray-800"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="runway" className="text-green-700 dark:text-green-400 font-medium">Runway (months)</Label>
                    <Input 
                      id="runway" 
                      type="number" 
                      value={runway}
                      onChange={(e) => setRunway(parseInt(e.target.value))}
                      className="border-green-200 dark:border-green-900/50 focus:border-green-500 focus:ring-green-500 dark:focus:border-green-400 dark:focus:ring-green-400 bg-white dark:bg-gray-800"
                    />
                  </div>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/30 rounded-md p-4">
                  <h4 className="text-sm font-medium text-blue-800 dark:text-blue-300">Financial Summary</h4>
                  <div className="mt-2 space-y-1 text-sm">
                    <p className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Monthly Growth Needed:</span>
                      <span className="font-medium text-blue-700 dark:text-blue-400">20%</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Break-even Point:</span>
                      <span className="font-medium text-blue-700 dark:text-blue-400">Month 8</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Projected Year 1 Revenue:</span>
                      <span className="font-medium text-blue-700 dark:text-blue-400">$78,500</span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Timeline Settings */}
          <TabsContent value="timeline" className="mt-6">
            <Card className="border border-indigo-100 dark:border-indigo-900/30 overflow-hidden bg-gradient-to-br from-white to-indigo-50/50 dark:from-gray-900 dark:to-gray-800 shadow-md">
              <CardHeader className="border-b border-indigo-100 dark:border-indigo-900/20 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  <CardTitle className="text-indigo-700 dark:text-indigo-400">Project Timeline</CardTitle>
                </div>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Set important deadlines and milestones for your SaaS project.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="mvp-deadline" className="text-indigo-700 dark:text-indigo-400 font-medium">MVP Deadline</Label>
                    <Input 
                      id="mvp-deadline" 
                      type="date" 
                      value={mvpDeadline}
                      onChange={(e) => setMvpDeadline(e.target.value)}
                      className="border-indigo-200 dark:border-indigo-900/50 focus:border-indigo-500 focus:ring-indigo-500 dark:focus:border-indigo-400 dark:focus:ring-indigo-400 bg-white dark:bg-gray-800"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="beta-launch" className="text-indigo-700 dark:text-indigo-400 font-medium">Beta Launch</Label>
                    <Input 
                      id="beta-launch" 
                      type="date" 
                      value={betaLaunch}
                      onChange={(e) => setBetaLaunch(e.target.value)}
                      className="border-indigo-200 dark:border-indigo-900/50 focus:border-indigo-500 focus:ring-indigo-500 dark:focus:border-indigo-400 dark:focus:ring-indigo-400 bg-white dark:bg-gray-800"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="public-launch" className="text-indigo-700 dark:text-indigo-400 font-medium">Public Launch</Label>
                    <Input 
                      id="public-launch" 
                      type="date" 
                      value={publicLaunch}
                      onChange={(e) => setPublicLaunch(e.target.value)}
                      className="border-indigo-200 dark:border-indigo-900/50 focus:border-indigo-500 focus:ring-indigo-500 dark:focus:border-indigo-400 dark:focus:ring-indigo-400 bg-white dark:bg-gray-800"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="relative pt-6">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-100 dark:bg-indigo-900/30 rounded-full"></div>
                    
                    <div className="relative pl-8 pb-8">
                      <div className="absolute left-0 w-5 h-5 rounded-full bg-indigo-500 border-4 border-indigo-100 dark:border-gray-800"></div>
                      <h4 className="text-sm font-medium text-indigo-700 dark:text-indigo-400">MVP Development</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        Complete core features and functionality for minimum viable product.
                      </p>
                    </div>
                    
                    <div className="relative pl-8 pb-8">
                      <div className="absolute left-0 w-5 h-5 rounded-full bg-purple-500 border-4 border-indigo-100 dark:border-gray-800"></div>
                      <h4 className="text-sm font-medium text-purple-700 dark:text-purple-400">Beta Testing</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        Invite early users to test the product and gather feedback.
                      </p>
                    </div>
                    
                    <div className="relative pl-8">
                      <div className="absolute left-0 w-5 h-5 rounded-full bg-blue-500 border-4 border-indigo-100 dark:border-gray-800"></div>
                      <h4 className="text-sm font-medium text-blue-700 dark:text-blue-400">Public Launch</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        Official product launch with marketing campaign.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-end">
          <Button 
            onClick={handleSaveSettings}
            disabled={isSaving}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-md hover:shadow-lg transition-all"
          >
            {isSaving ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Settings
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
