'use client';

import React, { useState } from 'react';
import { Key, ShieldCheck, ExternalLink, X, CheckCircle2, AlertCircle, Copy, Check } from 'lucide-react';
import { isFirebaseConfigured } from '@/lib/firebase';

interface ConfigGuideProps {
  onClose?: () => void;
}

export function ConfigGuide({ onClose }: ConfigGuideProps) {
  const [copied, setCopied] = useState(false);

  const envSample = `# .env.local
GEMINI_API_KEY=your_actual_gemini_api_key
GEMINI_MODEL=gemini-2.5-flash

NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id`;

  const handleCopy = () => {
    navigator.clipboard.writeText(envSample);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white border border-[#e6e5e0] rounded-2xl p-6 shadow-xl max-w-2xl w-full mx-auto">
      <div className="flex items-center justify-between pb-4 border-b border-[#e6e5e0]">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-medium">
            <Key className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900">Setup & Configuration Status</h3>
            <p className="text-xs text-gray-500">Connect your Gemini API and Firebase credentials</p>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 transition p-1.5 rounded-lg hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="py-4 space-y-4">
        {/* Status Badges */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-3.5 rounded-xl border border-gray-100 bg-gray-50/50 flex items-start gap-3">
            {isFirebaseConfigured ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
            )}
            <div>
              <div className="font-medium text-sm text-gray-900">Firebase Auth & Firestore</div>
              <p className="text-xs text-gray-500 mt-0.5">
                {isFirebaseConfigured
                  ? 'Configured & Connected'
                  : 'Needs Firebase Web Config in .env.local'}
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl border border-gray-100 bg-gray-50/50 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-indigo-600 mt-0.5 shrink-0" />
            <div>
              <div className="font-medium text-sm text-gray-900">Gemini Flash API Engine</div>
              <p className="text-xs text-gray-500 mt-0.5">
                Configured on server via GEMINI_API_KEY
              </p>
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-3 text-sm text-gray-600">
          <div className="flex gap-2">
            <span className="w-5 h-5 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold flex items-center justify-center shrink-0">
              1
            </span>
            <div>
              <strong className="text-gray-900">Get a Gemini API Key:</strong> Visit{' '}
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noreferrer"
                className="text-amber-700 hover:underline inline-flex items-center gap-1 font-medium"
              >
                Google AI Studio <ExternalLink className="w-3 h-3" />
              </a>{' '}
              and copy your API key.
            </div>
          </div>

          <div className="flex gap-2">
            <span className="w-5 h-5 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold flex items-center justify-center shrink-0">
              2
            </span>
            <div>
              <strong className="text-gray-900">Set up Firebase:</strong> In the{' '}
              <a
                href="https://console.firebase.google.com/"
                target="_blank"
                rel="noreferrer"
                className="text-amber-700 hover:underline inline-flex items-center gap-1 font-medium"
              >
                Firebase Console <ExternalLink className="w-3 h-3" />
              </a>
              :
              <ul className="list-disc pl-5 mt-1 space-y-0.5 text-xs text-gray-500">
                <li>Create a project and enable <strong>Google Sign-In</strong> in Authentication.</li>
                <li>Create a <strong>Cloud Firestore</strong> database.</li>
                <li>Add a Web App under Project Settings to get your config object.</li>
              </ul>
            </div>
          </div>

          <div className="flex gap-2">
            <span className="w-5 h-5 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold flex items-center justify-center shrink-0">
              3
            </span>
            <div className="w-full">
              <strong className="text-gray-900">Update .env.local:</strong> Paste keys into{' '}
              <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">.env.local</code> in the project root:
              <div className="relative mt-2">
                <pre className="bg-gray-900 text-gray-200 text-xs p-3 rounded-lg overflow-x-auto font-mono">
                  {envSample}
                </pre>
                <button
                  onClick={handleCopy}
                  className="absolute top-2 right-2 p-1.5 rounded-md bg-gray-800 text-gray-300 hover:text-white transition flex items-center gap-1 text-xs"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-[#e6e5e0] flex items-center justify-between text-xs text-gray-500">
        <span>Security Note: Client never exposes your Gemini API secret.</span>
        {onClose && (
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 bg-gray-900 text-white rounded-lg hover:bg-black transition font-medium"
          >
            Got it
          </button>
        )}
      </div>
    </div>
  );
}
