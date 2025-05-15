"use client";

import { SignIn } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";
  const { isSignedIn } = useAuth();
  const router = useRouter();

  // If user is already signed in, redirect to dashboard
  useEffect(() => {
    if (isSignedIn) {
      router.push("/dashboard");
    }
  }, [isSignedIn, router]);

  // Only render SignIn component if user is not signed in
  if (isSignedIn) {
    return <div className="flex justify-center py-10">Redirecting to dashboard...</div>;
  }

  return (
    <div className="flex justify-center py-10">
      <SignIn
        appearance={{
          // Use theme based on system preference
          variables: {
            colorPrimary: isDarkMode ? '#ffffff' : '#000000',
            colorBackground: isDarkMode ? '#1e1e1e' : '#ffffff',
            colorText: isDarkMode ? '#ffffff' : '#000000',
          },
          elements: {
            formButtonPrimary:
              "bg-primary text-primary-foreground hover:bg-primary/90",
            card: "bg-background shadow-sm",
          },
        }}
        routing="path"
        path="/sign-in"
        signUpUrl="/sign-up"
        redirectUrl="/dashboard"
        afterSignInUrl="/dashboard"
      />
    </div>
  );
}
