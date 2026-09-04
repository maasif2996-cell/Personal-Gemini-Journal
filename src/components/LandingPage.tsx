'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import {
  Sparkles,
  ShieldCheck,
  BrainCircuit,
  FileText,
  Lock,
  ArrowRight,
  Settings,
  Flame,
  CheckCircle,
} from 'lucide-react';
import { ConfigGuide } from './ConfigGuide';

export function LandingPage() {
  const { loginWithGoogle, enterDemoMode, loading, error, isFirebaseConfigured } = useAuth();
  const [showConfig, setShowConfig] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#fbfbf9] text-[#1c1c1a]">
      {/* Top Navigation */}
      <header className="w-full border-b border-[#e6e5e0] bg-white/75 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-white shadow-sm shadow-amber-500/30">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="font-serif text-lg font-semibold tracking-tight text-gray-900">
              Personal Gemini Journal
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowConfig(!showConfig)}
              className="px-3 py-1.5 rounded-lg border border-[#e6e5e0] hover:bg-gray-50 text-xs font-medium text-gray-600 flex items-center gap-1.5 transition"
            >
              <Settings className="w-3.5 h-3.5 text-gray-500" />
              <span>Setup Guide</span>
            </button>

            <button
              onClick={loginWithGoogle}
              disabled={loading}
              className="px-4 py-2 rounded-xl bg-gray-900 hover:bg-black text-white text-xs sm:text-sm font-medium transition shadow-sm flex items-center gap-2"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z"
                />
                <path
                  fill="#4285F4"
                  d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15.2c0 2.8.7 5.5 1.9 7.8l3.7-2.9z"
                />
                <path
                  fill="#34A853"
                  d="M12 23.5c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16.5C3.7 20.2 7.5 23.5 12 23.5z"
                />
              </svg>
              <span>{loading ? 'Connecting...' : 'Sign in with Google'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Setup Guide Modal */}
      {showConfig && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <ConfigGuide onClose={() => setShowConfig(false)} />
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 max-w-6xl mx-auto px-4 py-12 md:py-20 flex flex-col items-center">
        {/* Top announcement pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200/60 text-amber-800 text-xs font-medium mb-8">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
          <span>Strict User-Isolated Cloud Firestore & Gemini Flash</span>
        </div>

        {/* Hero Section */}
        <div className="text-center max-w-3xl space-y-6">
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-gray-900 leading-[1.15]">
            A private sanctuary for your reflections, clarified by AI.
          </h1>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-light max-w-2xl mx-auto">
            Write down whatever is on your mind. Converse with an empathetic Gemini companion that helps
            you discover patterns, synthesizes multi-turn journal sessions, and keeps your memories
            strictly isolated to your account.
          </p>

          {/* Auth Action Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md mx-auto">
            <button
              onClick={loginWithGoogle}
              disabled={loading}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gray-900 hover:bg-black text-white font-medium text-sm transition shadow-md shadow-gray-900/10 flex items-center justify-center gap-2.5"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z"
                />
                <path
                  fill="#4285F4"
                  d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15.2c0 2.8.7 5.5 1.9 7.8l3.7-2.9z"
                />
                <path
                  fill="#34A853"
                  d="M12 23.5c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16.5C3.7 20.2 7.5 23.5 12 23.5z"
                />
              </svg>
              <span>{loading ? 'Authenticating...' : 'Sign In with Google'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={enterDemoMode}
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl border border-[#e6e5e0] bg-white hover:bg-gray-50 text-gray-700 font-medium text-sm transition"
            >
              Explore Local Demo Mode
            </button>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs max-w-md mx-auto text-left">
              <strong>Auth Note:</strong> {error}
              {!isFirebaseConfigured && (
                <div className="mt-1">
                  Tip: Click the <strong>Setup Guide</strong> above to add your Firebase credentials to{' '}
                  <code>.env.local</code> or use <strong>Explore Local Demo Mode</strong>.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-16 md:mt-24">
          <div className="p-6 rounded-2xl bg-white border border-[#e6e5e0] shadow-sm hover:shadow-md transition">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-4">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-gray-900 text-base mb-2">Zero-Leak Privacy Isolation</h3>
            <p className="text-sm text-gray-600 leading-relaxed font-light">
              Every journal entry is saved under <code>/users/&#123;uid&#125;/journals</code> backed by Cloud
              Firestore security rules. Other users cannot query, read, or alter your personal data.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#e6e5e0] shadow-sm hover:shadow-md transition">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center mb-4">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-gray-900 text-base mb-2">Empathetic Reflection Engine</h3>
            <p className="text-sm text-gray-600 leading-relaxed font-light">
              Powered by Google Gemini Flash. Gemini listens to your thoughts, mirrors your emotions, identifies
              hidden cognitive habits, and gently proposes reflective questions.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#e6e5e0] shadow-sm hover:shadow-md transition">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-gray-900 text-base mb-2">Structured Summaries & Next Steps</h3>
            <p className="text-sm text-gray-600 leading-relaxed font-light">
              One click transforms your freeform journaling into an executive summary, emotional tone score,
              and concrete, actionable micro-steps to carry into your day.
            </p>
          </div>
        </div>

        {/* Tech Stack Specs Banner */}
        <div className="w-full mt-16 p-6 md:p-8 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 text-white shadow-xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-1">
              <span className="text-amber-400 text-xs font-semibold uppercase tracking-wider">
                Production-Grade Architecture
              </span>
              <h2 className="text-xl md:text-2xl font-serif font-medium">
                Built with Firebase, Gemini Flash & Strict Security
              </h2>
              <p className="text-gray-300 text-xs md:text-sm font-light max-w-xl">
                Server-side API routes guard your Gemini secrets. Firebase client SDK manages Google Auth
                and provides realtime Firestore sync.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 w-full md:w-auto text-xs font-mono">
              <div className="p-2.5 rounded-lg bg-white/10 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Google Sign-In</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white/10 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Cloud Firestore</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white/10 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Gemini Flash API</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white/10 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Env Secret Guard</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#e6e5e0] py-6 text-center text-xs text-gray-500">
        Personal Gemini Journal &bull; Strictly Isolated User Data &bull; Powered by Google AI
      </footer>
    </div>
  );
}
