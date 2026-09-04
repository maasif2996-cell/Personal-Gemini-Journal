'use client';

import React, { useState } from 'react';
import { ReflectionSummary } from '@/types';
import {
  Sparkles,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Lightbulb,
  Check,
  Copy,
  HeartHandshake,
} from 'lucide-react';

interface SummaryCardProps {
  summary: ReflectionSummary;
}

export function SummaryCard({ summary }: SummaryCardProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = `### Journal Reflection Summary
Tone: ${summary.emotionalTone || 'Neutral'}

**Overview:**
${summary.overview}

**Key Insights:**
${summary.keyInsights.map((ki) => `- ${ki}`).join('\n')}

${summary.actionableSteps && summary.actionableSteps.length > 0 ? `**Actionable Micro-Steps:**\n${summary.actionableSteps.map((s) => `- ${s}`).join('\n')}` : ''}
`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mb-6 rounded-2xl border border-amber-200/80 bg-gradient-to-br from-amber-50/70 via-orange-50/40 to-white p-5 shadow-sm transition-all duration-200">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-sm shadow-amber-500/30">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-serif font-semibold text-gray-900 text-base">
                Reflection Synthesis
              </h3>
              {summary.emotionalTone && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100/80 text-amber-800 border border-amber-200/60 flex items-center gap-1">
                  <HeartHandshake className="w-3 h-3 text-amber-700" />
                  {summary.emotionalTone}
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500">Distilled by Gemini Flash</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-white/80 transition flex items-center gap-1 text-xs"
            title="Copy summary"
          >
            {copied ? (
              <Check className="w-4 h-4 text-emerald-600" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
            <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
          </button>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-white/80 transition"
            title={isExpanded ? 'Collapse' : 'Expand'}
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Expandable Body */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-amber-200/50 space-y-4 text-sm text-gray-700">
          {/* Overview */}
          <div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
              Overview
            </h4>
            <p className="font-serif text-gray-800 leading-relaxed italic bg-white/60 p-3 rounded-xl border border-amber-100">
              &ldquo;{summary.overview}&rdquo;
            </p>
          </div>

          {/* Key Insights */}
          {summary.keyInsights && summary.keyInsights.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                Key Themes & Realizations
              </h4>
              <ul className="space-y-1.5">
                {summary.keyInsights.map((insight, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                    <span>{insight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Actionable Steps */}
          {summary.actionableSteps && summary.actionableSteps.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Actionable Micro-Steps
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {summary.actionableSteps.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg bg-white/80 border border-gray-100 flex items-start gap-2 text-xs"
                  >
                    <span className="text-emerald-600 font-semibold mt-0.5">&bull;</span>
                    <span className="text-gray-800">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
