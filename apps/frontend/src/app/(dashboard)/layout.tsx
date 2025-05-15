"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { 
  BarChart, 
  FileText, 
  LayoutDashboard, 
  Menu, 
  Settings, 
  Users, 
  X,
  Lightbulb,
  CheckSquare,
  FileCode,
  Moon,
  Sun
} from "lucide-react";
import { useTheme } from "next-themes";
import { ThemeToggle } from "@/components/theme-toggle";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<any>;
  external?: boolean;
}

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Get the API docs URL from environment variables
  const apiDocsUrl = process.env.NEXT_PUBLIC_API_DOCS_URL || 'http://localhost:9000';

  const navigation: NavItem[] = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  const founderTools: NavItem[] = [
    { name: "Idea Generator", href: "/dashboard/founder-tools/idea-generator", icon: Lightbulb },
    { name: "Idea Validator", href: "/dashboard/founder-tools/idea-validator", icon: CheckSquare },
    { name: "SOW Creator", href: "/dashboard/founder-tools/sow-creator", icon: FileCode },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex">
      {/* Mobile sidebar toggle */}
      <div className="fixed top-0 left-0 z-40 lg:hidden">
        <button
          className="p-2 m-2 text-gray-500 rounded-md hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-30 w-64 bg-gradient-to-b from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 border-r border-blue-100 dark:border-gray-700 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-screen lg:flex",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col flex-1 min-h-0">
          <div className="flex items-center h-16 px-4 border-b border-blue-100 dark:border-gray-700 shrink-0 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
            <Link href="/dashboard" className="flex items-center gap-2">
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">SaaS Starter</span>
            </Link>
          </div>
          <nav className="flex-1 px-2 py-4 space-y-6">
            <div>
              <h3 className="px-3 text-sm font-semibold text-blue-600 dark:text-blue-400">Main</h3>
              <div className="mt-2 space-y-1">
                {navigation.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noopener noreferrer" : undefined}
                      className={cn(
                        "flex items-center px-3 py-2 text-sm font-medium rounded-md group transition-colors",
                        isActive
                          ? "bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-600 dark:text-blue-400"
                          : "text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400"
                      )}
                    >
                      <item.icon
                        className={cn(
                          "mr-3 h-5 w-5 shrink-0 transition-colors",
                          isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400"
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
            
            <div>
              <h3 className="px-3 text-sm font-semibold text-purple-600 dark:text-purple-400">Founder Tools</h3>
              <div className="mt-2 space-y-1">
                {founderTools.map((item) => {
                  const isActive = pathname === item.href || pathname.startsWith(item.href);
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "flex items-center px-3 py-2 text-sm font-medium rounded-md group transition-colors",
                        isActive
                          ? "bg-gradient-to-r from-purple-500/10 to-blue-500/10 text-purple-600 dark:text-purple-400"
                          : "text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-gray-800 hover:text-purple-600 dark:hover:text-purple-400"
                      )}
                    >
                      <item.icon
                        className={cn(
                          "mr-3 h-5 w-5 shrink-0 transition-colors",
                          isActive ? "text-purple-600 dark:text-purple-400" : "text-gray-500 dark:text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400"
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          </nav>
          <div className="p-4 border-t border-blue-100 dark:border-gray-700 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-gray-900 dark:to-gray-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UserButton afterSignOutUrl="/" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Your Account</span>
                  <span className="text-xs text-gray-600 dark:text-gray-400">Manage your profile</span>
                </div>
              </div>
              <div className="flex items-center">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1">
        <main className="flex-1 p-6 relative">
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-400 dark:bg-purple-700 rounded-full filter blur-3xl opacity-5"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-400 dark:bg-blue-700 rounded-full filter blur-3xl opacity-5"></div>
          </div>
          <div className="relative z-10">{children}</div>
        </main>
      </div>
    </div>
  );
}
