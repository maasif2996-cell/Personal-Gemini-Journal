'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth';
import { auth, googleProvider, isFirebaseConfigured } from '@/lib/firebase';
import { UserProfile } from '@/types';

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  error: string | null;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  getIdToken: () => Promise<string | null>;
  isFirebaseConfigured: boolean;
  enterDemoMode: () => void;
  isDemoMode: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isDemoMode, setIsDemoMode] = useState<boolean>(false);

  useEffect(() => {
    // If Firebase is not configured, check for saved demo mode
    if (!isFirebaseConfigured || !auth) {
      const savedDemo = typeof window !== 'undefined' && localStorage.getItem('demo_auth_active') === 'true';
      if (savedDemo) {
        setIsDemoMode(true);
        setUser({
          uid: 'demo-user-12345',
          displayName: 'Explorer (Demo Mode)',
          email: 'demo@journal.local',
          photoURL: null,
        });
      }
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(
      auth,
      (fbUser: FirebaseUser | null) => {
        if (fbUser) {
          setUser({
            uid: fbUser.uid,
            displayName: fbUser.displayName,
            email: fbUser.email,
            photoURL: fbUser.photoURL,
          });
          setIsDemoMode(false);
        } else {
          setUser(null);
        }
        setLoading(false);
      },
      (err) => {
        console.error('Firebase Auth State Change Error:', err);
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    setError(null);
    if (!isFirebaseConfigured || !auth || !googleProvider) {
      setError(
        'Firebase credentials are not configured in .env.local yet. Please configure them or use Preview/Demo mode.'
      );
      return;
    }

    try {
      setLoading(true);
      await signInWithPopup(auth, googleProvider);
    } catch (err: unknown) {
      console.error('Google Sign-In Error:', err);
      const message = err instanceof Error ? err.message : 'Failed to sign in with Google';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      if (isDemoMode) {
        setIsDemoMode(false);
        localStorage.removeItem('demo_auth_active');
        setUser(null);
        return;
      }
      if (auth) {
        await signOut(auth);
      }
      setUser(null);
    } catch (err: unknown) {
      console.error('Sign Out Error:', err);
      const message = err instanceof Error ? err.message : 'Failed to sign out';
      setError(message);
    }
  };

  const getIdToken = async (): Promise<string | null> => {
    if (isDemoMode) return 'demo-token';
    if (!auth?.currentUser) return null;
    return await auth.currentUser.getIdToken();
  };

  const enterDemoMode = () => {
    setIsDemoMode(true);
    localStorage.setItem('demo_auth_active', 'true');
    setUser({
      uid: 'demo-user-12345',
      displayName: 'Demo User (Local Preview)',
      email: 'demo@journal.local',
      photoURL: null,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        loginWithGoogle,
        logout,
        getIdToken,
        isFirebaseConfigured,
        enterDemoMode,
        isDemoMode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
