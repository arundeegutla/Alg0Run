'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import useSession from '@/hooks/useSession';
import { auth } from '@/server/firebase/clientApp';
import { SessionData } from '@/server/trpc/types';

interface AuthContextType {
  googleUser: FirebaseUser | null;
  googleLoading: boolean;
  codeforcesLoading: boolean;
  logoutCodeforces: () => Promise<void>;
  codeforcesLoggedIn: boolean;
  codeforcesUserInfo: SessionData['userInfo'];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Google Auth state
  const [googleUser, setGoogleUser] = useState<FirebaseUser | null>(null);
  const [googleLoading, setGoogleLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setGoogleUser(user);
      setGoogleLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Codeforces Auth state
  const { session: codeforcesSession, loading: codeforcesLoading } =
    useSession();

  // Codeforces logout function
  const logoutCodeforces = async () => {
    try {
      // Call the logout API route, which will redirect to Codeforces logout
      window.location.href = '/api/auth/codeforces/logout';
    } catch (error) {
      // Optionally handle error
      console.error('Failed to logout from Codeforces:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        googleUser,
        googleLoading,
        codeforcesLoggedIn: codeforcesSession?.isLoggedIn ?? false,
        codeforcesLoading,
        codeforcesUserInfo: codeforcesSession?.userInfo,
        logoutCodeforces,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
