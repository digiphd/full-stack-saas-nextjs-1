"use client";

import React from 'react';

// Mock user data
const mockUser = {
  id: 'user_mock123',
  firstName: 'Demo',
  lastName: 'User',
  fullName: 'Demo User',
  imageUrl: 'https://via.placeholder.com/150',
  emailAddresses: [{ emailAddress: 'demo@example.com', id: 'email_mock123' }],
  primaryEmailAddress: { emailAddress: 'demo@example.com', id: 'email_mock123' },
};

// Mock ClerkProvider for development
export function MockClerkProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

// Mock hooks
export function useMockAuth() {
  return {
    isLoaded: true,
    userId: mockUser.id,
    sessionId: 'session_mock123',
    getToken: async () => 'mock_token_for_development',
    isSignedIn: true,
  };
}

export function useMockUser() {
  return {
    isLoaded: true,
    isSignedIn: true,
    user: mockUser,
  };
}

// Mock sign-in/sign-up components
export function MockSignIn() {
  return <div>Mock Sign In Component</div>;
}

export function MockSignUp() {
  return <div>Mock Sign Up Component</div>;
}

// Mock signed in/out components
export function MockSignedIn({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function MockSignedOut({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
