"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, CreditCard, DollarSign, Users } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          Welcome to your SaaS Starter dashboard.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="overflow-hidden border border-blue-100 dark:border-gray-700 bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 border-b border-blue-50 dark:border-gray-700 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-gray-800 dark:to-gray-800">
            <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-400">Total Revenue</CardTitle>
            <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30">
              <DollarSign className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">$45,231.89</div>
            <p className="text-xs text-green-600 dark:text-green-400 flex items-center mt-1">
              <span className="inline-block mr-1">↑</span> +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="overflow-hidden border border-purple-100 dark:border-gray-700 bg-gradient-to-br from-white to-purple-50 dark:from-gray-800 dark:to-gray-900 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 border-b border-purple-50 dark:border-gray-700 bg-gradient-to-r from-purple-50/50 to-indigo-50/50 dark:from-gray-800 dark:to-gray-800">
            <CardTitle className="text-sm font-medium text-purple-700 dark:text-purple-400">Subscriptions</CardTitle>
            <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900/30">
              <CreditCard className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">+2,350</div>
            <p className="text-xs text-green-600 dark:text-green-400 flex items-center mt-1">
              <span className="inline-block mr-1">↑</span> +180.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="overflow-hidden border border-indigo-100 dark:border-gray-700 bg-gradient-to-br from-white to-indigo-50 dark:from-gray-800 dark:to-gray-900 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 border-b border-indigo-50 dark:border-gray-700 bg-gradient-to-r from-indigo-50/50 to-blue-50/50 dark:from-gray-800 dark:to-gray-800">
            <CardTitle className="text-sm font-medium text-indigo-700 dark:text-indigo-400">Active Users</CardTitle>
            <div className="p-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30">
              <Users className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">+12,234</div>
            <p className="text-xs text-green-600 dark:text-green-400 flex items-center mt-1">
              <span className="inline-block mr-1">↑</span> +19% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="overflow-hidden border border-green-100 dark:border-gray-700 bg-gradient-to-br from-white to-green-50 dark:from-gray-800 dark:to-gray-900 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 border-b border-green-50 dark:border-gray-700 bg-gradient-to-r from-green-50/50 to-blue-50/50 dark:from-gray-800 dark:to-gray-800">
            <CardTitle className="text-sm font-medium text-green-700 dark:text-green-400">Active Now</CardTitle>
            <div className="p-2 rounded-full bg-green-100 dark:bg-green-900/30">
              <Activity className="w-4 h-4 text-green-600 dark:text-green-400" />
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">+573</div>
            <p className="text-xs text-blue-600 dark:text-blue-400 flex items-center mt-1">
              <span className="inline-block mr-1">↑</span> +201 since last hour
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-1 overflow-hidden border border-blue-100 dark:border-gray-700 bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="border-b border-blue-50 dark:border-gray-700 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-gray-800 dark:to-gray-800">
            <CardTitle className="text-blue-700 dark:text-blue-400 font-bold">Recent Activity</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">Your recent activity across the platform.</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-5">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center gap-4 group hover:bg-blue-50/50 dark:hover:bg-gray-800/50 p-2 rounded-md transition-colors">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 dark:from-blue-400 dark:to-indigo-400 shadow-sm" />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none text-gray-800 dark:text-gray-200 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
                      Activity {i}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date().toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1 overflow-hidden border border-purple-100 dark:border-gray-700 bg-gradient-to-br from-white to-purple-50 dark:from-gray-800 dark:to-gray-900 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="border-b border-purple-50 dark:border-gray-700 bg-gradient-to-r from-purple-50/50 to-indigo-50/50 dark:from-gray-800 dark:to-gray-800">
            <CardTitle className="text-purple-700 dark:text-purple-400 font-bold">Team Members</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">Invite your team members to collaborate.</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-5">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4 group hover:bg-purple-50/50 dark:hover:bg-gray-800/50 p-2 rounded-md transition-colors">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 flex items-center justify-center shadow-sm">
                    <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none text-gray-800 dark:text-gray-200 group-hover:text-purple-700 dark:group-hover:text-purple-400 transition-colors">
                      Team Member {i}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      member{i}@example.com
                    </p>
                  </div>
                </div>
              ))}
              <Button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white border-0 shadow-md hover:shadow-lg transition-all">
                <Users className="w-4 h-4 mr-2" />
                Invite Team Member
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1 overflow-hidden border border-indigo-100 dark:border-gray-700 bg-gradient-to-br from-white to-indigo-50 dark:from-gray-800 dark:to-gray-900 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="border-b border-indigo-50 dark:border-gray-700 bg-gradient-to-r from-indigo-50/50 to-blue-50/50 dark:from-gray-800 dark:to-gray-800">
            <CardTitle className="text-indigo-700 dark:text-indigo-400 font-bold">Quick Actions</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">Common tasks you can perform.</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-3">
              <Button className="w-full justify-start bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 text-blue-700 dark:text-blue-400 border border-blue-100 dark:border-gray-700 hover:bg-blue-100 dark:hover:bg-gray-700 hover:text-blue-800 dark:hover:text-blue-300 transition-colors shadow-sm hover:shadow">
                <Users className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400" />
                Manage Team
              </Button>
              <Button className="w-full justify-start bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 text-purple-700 dark:text-purple-400 border border-purple-100 dark:border-gray-700 hover:bg-purple-100 dark:hover:bg-gray-700 hover:text-purple-800 dark:hover:text-purple-300 transition-colors shadow-sm hover:shadow">
                <CreditCard className="w-4 h-4 mr-2 text-purple-600 dark:text-purple-400" />
                Billing & Subscription
              </Button>
              <Button className="w-full justify-start bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 text-indigo-700 dark:text-indigo-400 border border-indigo-100 dark:border-gray-700 hover:bg-indigo-100 dark:hover:bg-gray-700 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors shadow-sm hover:shadow">
                <Activity className="w-4 h-4 mr-2 text-indigo-600 dark:text-indigo-400" />
                View Analytics
              </Button>
              <Button className="w-full justify-start bg-gradient-to-r from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 text-green-700 dark:text-green-400 border border-green-100 dark:border-gray-700 hover:bg-green-100 dark:hover:bg-gray-700 hover:text-green-800 dark:hover:text-green-300 transition-colors shadow-sm hover:shadow">
                <DollarSign className="w-4 h-4 mr-2 text-green-600 dark:text-green-400" />
                Upgrade Plan
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
