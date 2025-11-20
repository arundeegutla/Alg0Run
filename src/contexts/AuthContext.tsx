'use client';


import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { auth } from '@/server/firebase/clientApp';
import { trpc } from '@/server/trpc/client';


interface AuthContextType {
  googleUser: FirebaseUser | null;
  googleLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [googleUser, setGoogleUser] = useState<FirebaseUser | null>(null);
  const [googleLoading, setGoogleLoading] = useState(true);

  // tRPC hooks
  const createProfileMutation = trpc.profile.createProfile.useMutation();
  // Use useQuery with enabled: false for getProfileByToken
  const [profileToken, setProfileToken] = useState('');
  const { refetch: refetchProfileByToken } = trpc.profile.getProfileByToken.useQuery(
    { idToken: profileToken },
    { enabled: false }
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setGoogleUser(user);
      setGoogleLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Check and create Profile if missing
  useEffect(() => {
    const ensureProfile = async () => {
      if (!googleUser) return;
      try {
        const idToken = await googleUser.getIdToken();
        setProfileToken(idToken);
        // Wait for state to update before refetch
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        await new Promise((resolve) => setTimeout(resolve, 0));
        const res = await refetchProfileByToken();
        if (!res.data || res.data.error || !res.data.profile) {
          // Create profile if not found
          await createProfileMutation.mutateAsync();
        }
      } catch (err) {
        // Optionally handle error
      }
    };
    ensureProfile();
    // Only run when googleUser changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [googleUser]);

  return (
    <AuthContext.Provider
      value={{
        googleUser,
        googleLoading,
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
