'use client';

import { useAuth } from '@/context/AuthContext';
import { LandingPage } from '@/components/LandingPage';
import { Dashboard } from '@/components/Dashboard';
import { Sparkles } from 'lucide-react';

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#fbfbf9] text-gray-800">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-600 to-amber-400 text-white flex items-center justify-center shadow-lg shadow-amber-500/30 animate-pulse">
          <Sparkles className="w-6 h-6" />
        </div>
        <p className="mt-4 font-serif text-sm text-gray-500 tracking-wide">
          Entering your personal reflection sanctuary...
        </p>
      </div>
    );
  }

  if (!user) {
    return <LandingPage />;
  }

  return <Dashboard />;
}
