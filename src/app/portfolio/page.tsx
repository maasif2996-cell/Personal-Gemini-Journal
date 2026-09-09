'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ShieldCheck,
  BrainCircuit,
  FileText,
  Lock,
  ArrowRight,
  ExternalLink,
  Github,
  Mail,
  Check,
  Copy,
  Layers,
  Cpu,
  Database,
  Terminal,
  ChevronRight,
  Code2,
  Compass,
  Lightbulb,
  Briefcase,
  X,
  Flame,
  Award,
} from 'lucide-react';

export default function PortfolioPage() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [selectedPersonaTab, setSelectedPersonaTab] = useState<'reflective' | 'analyst' | 'socratic'>('reflective');
  const [showArchModal, setShowArchModal] = useState(false);
  const [activeArchTab, setActiveArchTab] = useState<'flow' | 'security' | 'prompts'>('flow');

  const email = 'maasif2996@gmail.com';
  const githubUrl = 'https://github.com/maasif2996-cell';
  const repoUrl = 'https://github.com/maasif2996-cell/Personal-Gemini-Journal';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#fbfbf9] text-[#1c1c1a] selection:bg-amber-100 selection:text-amber-900 flex flex-col">
      {/* Navigation Bar */}
      <header className="sticky top-0 z-40 w-full border-b border-[#e6e5e0] bg-white/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-white shadow-sm shadow-amber-500/25 font-serif font-bold text-lg">
              A
            </div>
            <div>
              <span className="font-serif font-semibold text-gray-900 tracking-tight text-base sm:text-lg block leading-none">
                Muhammad Asif
              </span>
              <span className="text-[11px] font-mono text-gray-500 tracking-wide uppercase">
                Full Stack & AI Engineer
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-gray-600">
            <a href="#featured" className="hover:text-amber-700 transition">
              Flagship Project
            </a>
            <a href="#skills" className="hover:text-amber-700 transition">
              Technical Stack
            </a>
            <a href="#projects" className="hover:text-amber-700 transition">
              More Work
            </a>
            <a href="#about" className="hover:text-amber-700 transition">
              Philosophy
            </a>
            <a href="#contact" className="hover:text-amber-700 transition">
              Contact
            </a>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/"
              className="px-3 py-1.5 rounded-lg border border-[#e6e5e0] bg-white hover:bg-gray-50 text-xs font-medium text-gray-700 transition flex items-center gap-1.5 shadow-sm"
              title="Open the live journal app"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span className="hidden sm:inline">Launch</span> Journal
            </Link>

            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg border border-[#e6e5e0] bg-white hover:bg-gray-50 text-gray-600 transition"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 flex flex-col gap-20 sm:gap-28">
        {/* Hero Section */}
        <section className="flex flex-col items-center text-center pt-4 sm:pt-8 max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50/90 border border-amber-200/70 text-amber-800 text-xs font-medium shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Open for Full-Stack & Generative AI Roles & Contract Work</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-gray-900 leading-[1.12]">
            Crafting responsive web apps & intelligent{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-700 via-amber-600 to-amber-500">
              AI systems
            </span>
            .
          </h1>

          <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-light max-w-2xl">
            Hi, I’m <strong>Muhammad Asif</strong>. I build high-performance, user-centric software combining modern
            web architectures (Next.js 15, React 19, TypeScript) with state-of-the-art LLMs (Google Gemini Flash) and
            rock-solid cloud security.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#featured"
              className="px-6 py-3 rounded-xl bg-gray-900 hover:bg-black text-white text-sm font-medium transition shadow-md shadow-gray-900/10 flex items-center gap-2"
            >
              <span>Explore Flagship Project</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              onClick={handleCopyEmail}
              className="px-5 py-3 rounded-xl border border-[#e6e5e0] bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium transition shadow-sm flex items-center gap-2"
            >
              {copiedEmail ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700">Email Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-gray-500" />
                  <span>Copy Contact Email</span>
                </>
              )}
            </button>

            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3 rounded-xl border border-[#e6e5e0] bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium transition shadow-sm flex items-center gap-2"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
          </div>

          {/* Quick Metrics Bar */}
          <div className="w-full pt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
            <div className="p-4 rounded-xl bg-white border border-[#e6e5e0] shadow-sm">
              <div className="text-2xl font-serif font-bold text-gray-900">Next.js 15</div>
              <div className="text-xs text-gray-500 mt-0.5">App Router & React 19</div>
            </div>
            <div className="p-4 rounded-xl bg-white border border-[#e6e5e0] shadow-sm">
              <div className="text-2xl font-serif font-bold text-amber-600">Gemini Flash</div>
              <div className="text-xs text-gray-500 mt-0.5">@google/genai SDK</div>
            </div>
            <div className="p-4 rounded-xl bg-white border border-[#e6e5e0] shadow-sm">
              <div className="text-2xl font-serif font-bold text-emerald-600">Strict Auth</div>
              <div className="text-xs text-gray-500 mt-0.5">Zero-Leak Firestore Rules</div>
            </div>
            <div className="p-4 rounded-xl bg-white border border-[#e6e5e0] shadow-sm">
              <div className="text-2xl font-serif font-bold text-indigo-600">TypeScript</div>
              <div className="text-xs text-gray-500 mt-0.5">End-to-End Type Safety</div>
            </div>
          </div>
        </section>

        {/* Flagship Project Showcase */}
        <section id="featured" className="scroll-mt-24 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700 mb-2">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Featured Flagship Project</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-gray-900 tracking-tight">
                Personal Gemini Journal
              </h2>
              <p className="text-gray-600 text-sm sm:text-base mt-2 max-w-2xl font-light">
                A private, user-authenticated journaling and mental clarity sanctuary powered by Google Gemini Flash,
                Google Sign-In, and Cloud Firestore with strict per-user data isolation.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowArchModal(true)}
                className="px-3.5 py-2 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 text-gray-800 text-xs font-medium transition shadow-sm flex items-center gap-2"
              >
                <Layers className="w-3.5 h-3.5 text-gray-600" />
                <span>Inspect Architecture</span>
              </button>
              <Link
                href="/"
                className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-medium transition shadow-sm shadow-amber-600/20 flex items-center gap-1.5"
              >
                <span>Live App Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Featured Showcase Card */}
          <div className="rounded-3xl border border-[#e6e5e0] bg-white overflow-hidden shadow-xl shadow-gray-200/50">
            {/* Mock Header of the Journal App */}
            <div className="bg-[#1c1c1a] text-white px-5 py-4 flex flex-wrap items-center justify-between gap-4 border-b border-gray-800">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-white">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <span className="font-serif text-sm font-medium tracking-wide">
                  Personal Gemini Journal &bull; Interactive Simulation
                </span>
              </div>

              {/* Persona Selector Preview Tabs */}
              <div className="flex items-center gap-1 bg-white/10 p-1 rounded-xl text-xs">
                <button
                  onClick={() => setSelectedPersonaTab('reflective')}
                  className={`px-2.5 py-1 rounded-lg transition ${
                    selectedPersonaTab === 'reflective' ? 'bg-amber-600 text-white font-medium' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Reflective Companion
                </button>
                <button
                  onClick={() => setSelectedPersonaTab('analyst')}
                  className={`px-2.5 py-1 rounded-lg transition ${
                    selectedPersonaTab === 'analyst' ? 'bg-amber-600 text-white font-medium' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Executive Analyst
                </button>
                <button
                  onClick={() => setSelectedPersonaTab('socratic')}
                  className={`px-2.5 py-1 rounded-lg transition ${
                    selectedPersonaTab === 'socratic' ? 'bg-amber-600 text-white font-medium' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Socratic Guide
                </button>
              </div>
            </div>

            {/* Interactive Dialogue Preview */}
            <div className="p-6 sm:p-8 bg-[#fbfbf9] border-b border-[#e6e5e0] grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Chat column */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center text-xs font-semibold shrink-0">
                    You
                  </div>
                  <div className="p-3.5 rounded-2xl rounded-tl-sm bg-white border border-[#e6e5e0] text-sm text-gray-800 shadow-sm max-w-lg">
                    I spent all day juggling five different priority issues at work. By the time I sat down to do deep
                    focus work, I felt mentally depleted. I’m questioning if I’m prioritizing effectively or just reacting.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-600 to-amber-400 text-white flex items-center justify-center text-xs font-semibold shrink-0 shadow-sm">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div className="p-4 rounded-2xl rounded-tl-sm bg-white border border-amber-200/80 text-sm text-gray-800 shadow-sm space-y-3 max-w-xl">
                    <div className="flex items-center justify-between text-xs text-amber-800 font-medium border-b border-amber-100 pb-2">
                      <span className="flex items-center gap-1.5">
                        <BrainCircuit className="w-3.5 h-3.5 text-amber-600" />
                        {selectedPersonaTab === 'reflective' && 'Reflective Companion Response'}
                        {selectedPersonaTab === 'analyst' && 'Executive Analyst Breakdown'}
                        {selectedPersonaTab === 'socratic' && 'Socratic Inquiry'}
                      </span>
                      <span className="font-mono text-[10px] text-gray-400">Gemini 2.5 Flash</span>
                    </div>

                    {selectedPersonaTab === 'reflective' && (
                      <p className="text-gray-700 leading-relaxed font-serif">
                        It makes complete sense that you feel depleted. Juggling rapid context switches demands high
                        cognitive bandwidth. Notice how you instinctively turned inward to examine your own judgment rather
                        than recognizing the sheer friction of external interruptions today. What was one moment today where
                        you felt your attention was genuinely aligned?
                      </p>
                    )}

                    {selectedPersonaTab === 'analyst' && (
                      <div className="text-gray-700 leading-relaxed text-xs space-y-2">
                        <p>
                          <strong>Core Diagnostic:</strong> Reactive task fragmentation displaced scheduled high-leverage
                          focus blocks, inducing attention fatigue.
                        </p>
                        <p>
                          <strong>Key Risk:</strong> Chronic cognitive switching cost degrading strategic problem-solving.
                        </p>
                      </div>
                    )}

                    {selectedPersonaTab === 'socratic' && (
                      <p className="text-gray-700 leading-relaxed font-serif italic">
                        If today’s emergencies had waited 24 hours, which would have resolved themselves, and which truly
                        required your immediate personal intervention? What is the cost of treating urgency as importance?
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Summary Card Preview */}
              <div className="lg:col-span-5 p-5 rounded-2xl bg-white border border-[#e6e5e0] shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-amber-600" />
                    <span className="font-semibold text-xs text-gray-900 uppercase tracking-wider">
                      Executive Synthesis
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 text-[11px] font-mono">
                    Auto-Generated
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <span className="font-semibold text-gray-800">Emotional Tone:</span>
                    <span className="ml-2 text-gray-600">Thoughtful Fatigue &bull; Conscientious</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-800">Core Pattern:</span>
                    <p className="text-gray-600 mt-0.5 font-light">
                      High willingness to absorb organizational friction at the expense of personal energy reserves.
                    </p>
                  </div>
                  <div className="pt-1">
                    <span className="font-semibold text-gray-800">Actionable Micro-Step:</span>
                    <div className="mt-1.5 p-2 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-900 text-xs flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                      <span>Block 9:00 - 10:30 AM tomorrow strictly for deep work before checking team inboxes.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Technical Highlights Grid */}
            <div className="p-6 sm:p-8 bg-white grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-2">
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                  <BrainCircuit className="w-4 h-4" />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm">Empathetic LLM Personas</h3>
                <p className="text-xs text-gray-600 leading-relaxed font-light">
                  Configured with `@google/genai` to dynamically tune temperature and persona prompts for emotional
                  resonance and insight.
                </p>
              </div>

              <div className="space-y-2">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <Lock className="w-4 h-4" />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm">Strict Zero-Leak Isolation</h3>
                <p className="text-xs text-gray-600 leading-relaxed font-light">
                  Enforces Firestore security rules ensuring records in <code>/users/&#123;uid&#125;/journals</code> can
                  never be accessed by another user.
                </p>
              </div>

              <div className="space-y-2">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm">Protected Server-Side APIs</h3>
                <p className="text-xs text-gray-600 leading-relaxed font-light">
                  Next.js App Router route handlers shield the `GEMINI_API_KEY`, preventing client-side secret exposure
                  and network tampering.
                </p>
              </div>

              <div className="space-y-2">
                <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm">Structured Synthesis</h3>
                <p className="text-xs text-gray-600 leading-relaxed font-light">
                  Single-click extraction of key takeaways, emotional trajectory, and concrete habit actions from
                  multi-turn dialogue logs.
                </p>
              </div>
            </div>

            {/* Action Footer */}
            <div className="px-6 sm:px-8 py-4 bg-gray-50 border-t border-[#e6e5e0] flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-gray-500">
                <span className="px-2.5 py-1 rounded-md bg-white border border-[#e6e5e0]">Next.js 15</span>
                <span className="px-2.5 py-1 rounded-md bg-white border border-[#e6e5e0]">React 19</span>
                <span className="px-2.5 py-1 rounded-md bg-white border border-[#e6e5e0]">Gemini Flash API</span>
                <span className="px-2.5 py-1 rounded-md bg-white border border-[#e6e5e0]">Firebase Firestore</span>
                <span className="px-2.5 py-1 rounded-md bg-white border border-[#e6e5e0]">Tailwind CSS</span>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium text-gray-700 hover:text-black flex items-center gap-1.5 transition"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>View Source Code</span>
                </a>
                <Link
                  href="/"
                  className="px-4 py-2 rounded-xl bg-gray-900 hover:bg-black text-white text-xs font-medium transition shadow-sm flex items-center gap-1.5"
                >
                  <span>Open Application</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Stack & Skills Matrix */}
        <section id="skills" className="scroll-mt-24 space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700 mb-2">
              <Cpu className="w-4 h-4 text-amber-600" />
              <span>Skills & Competencies</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-gray-900 tracking-tight">
              Technical Skill Matrix
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mt-2 max-w-2xl font-light">
              Demonstrated proficiencies spanning generative AI integrations, full-stack application development,
              cloud database security, and modern frontend design.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* AI & GenAI */}
            <div className="p-6 rounded-2xl bg-white border border-[#e6e5e0] shadow-sm hover:border-amber-300 transition space-y-4">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                <BrainCircuit className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-gray-900 text-base">Generative AI & LLMs</h3>
              <ul className="space-y-2 text-xs text-gray-600">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-amber-600" />
                  <span>Google Gemini Flash & Pro (`@google/genai`)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-amber-600" />
                  <span>Multi-Turn Conversational Memory</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-amber-600" />
                  <span>Structured Output & JSON Schemas</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-amber-600" />
                  <span>Context Engineering & Persona Tuning</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-amber-600" />
                  <span>Streaming & Latency Optimization</span>
                </li>
              </ul>
            </div>

            {/* Frontend Architecture */}
            <div className="p-6 rounded-2xl bg-white border border-[#e6e5e0] shadow-sm hover:border-indigo-300 transition space-y-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
                <Code2 className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-gray-900 text-base">Modern Web Frontend</h3>
              <ul className="space-y-2 text-xs text-gray-600">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Next.js 15 (App Router & Server Actions)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-indigo-600" />
                  <span>React 19 & Concurrent Features</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-indigo-600" />
                  <span>TypeScript Strict Type Enforcement</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Tailwind CSS & Responsive Styling</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Accessible & High-Performance UI</span>
                </li>
              </ul>
            </div>

            {/* Backend & Cloud Database */}
            <div className="p-6 rounded-2xl bg-white border border-[#e6e5e0] shadow-sm hover:border-emerald-300 transition space-y-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <Database className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-gray-900 text-base">Cloud & Backend</h3>
              <ul className="space-y-2 text-xs text-gray-600">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Cloud Firestore NoSQL Data Modeling</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Firebase Authentication & Google OAuth</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Node.js REST API & Route Handlers</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Realtime Snapshot Synchronization</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Serverless & Edge Deployment (Vercel)</span>
                </li>
              </ul>
            </div>

            {/* Security & System Quality */}
            <div className="p-6 rounded-2xl bg-white border border-[#e6e5e0] shadow-sm hover:border-purple-300 transition space-y-4">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-gray-900 text-base">Security & Architecture</h3>
              <ul className="space-y-2 text-xs text-gray-600">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-purple-600" />
                  <span>Strict Per-User Firestore Isolation Rules</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-purple-600" />
                  <span>Zero-Trust API Key Server Shielding</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-purple-600" />
                  <span>Git Version Control & CI/CD Pipelines</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-purple-600" />
                  <span>Clean Architecture & Maintainability</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-purple-600" />
                  <span>Defensive Error Handling & Fallbacks</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* More Projects / Engineering Highlights */}
        <section id="projects" className="scroll-mt-24 space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700 mb-2">
              <Briefcase className="w-4 h-4 text-amber-600" />
              <span>Engineering Portfolio</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-gray-900 tracking-tight">
              Selected Systems & Work
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mt-2 max-w-2xl font-light">
              Additional projects showcasing full-stack capabilities, agentic architectures, and distributed systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Project 1 */}
            <div className="p-6 rounded-2xl bg-white border border-[#e6e5e0] shadow-sm hover:shadow-md transition flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">
                    Generative AI
                  </span>
                  <BrainCircuit className="w-4 h-4 text-gray-400" />
                </div>
                <h3 className="font-semibold text-gray-900 text-base">Gemini Multi-Agent Orchestrator</h3>
                <p className="text-xs text-gray-600 leading-relaxed font-light">
                  An autonomous workflow coordination engine dividing complex research inquiries across specialized
                  Gemini agents with streaming step outputs and aggregated synthesis.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#e6e5e0] flex items-center justify-between text-xs text-gray-500">
                <span className="font-mono">Next.js &bull; Gemini &bull; SSE</span>
                <span className="font-medium text-gray-900">Prototype</span>
              </div>
            </div>

            {/* Project 2 */}
            <div className="p-6 rounded-2xl bg-white border border-[#e6e5e0] shadow-sm hover:shadow-md transition flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                    Realtime Data
                  </span>
                  <Database className="w-4 h-4 text-gray-400" />
                </div>
                <h3 className="font-semibold text-gray-900 text-base">Offline-First Realtime Sync Engine</h3>
                <p className="text-xs text-gray-600 leading-relaxed font-light">
                  State synchronization client leveraging IndexedDB fallback and Cloud Firestore listeners with
                  optimistic local updates and conflict resolution.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#e6e5e0] flex items-center justify-between text-xs text-gray-500">
                <span className="font-mono">React 19 &bull; Firestore &bull; TS</span>
                <span className="font-medium text-gray-900">Production</span>
              </div>
            </div>

            {/* Project 3 */}
            <div className="p-6 rounded-2xl bg-white border border-[#e6e5e0] shadow-sm hover:shadow-md transition flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md">
                    Security & Cloud
                  </span>
                  <Lock className="w-4 h-4 text-gray-400" />
                </div>
                <h3 className="font-semibold text-gray-900 text-base">Zero-Trust Identity & Vault Gateway</h3>
                <p className="text-xs text-gray-600 leading-relaxed font-light">
                  Security-first authentication portal enforcing granular role-based access control, cryptographic token
                  verification, and audit logging.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#e6e5e0] flex items-center justify-between text-xs text-gray-500">
                <span className="font-mono">Node.js &bull; OAuth &bull; Rules</span>
                <span className="font-medium text-gray-900">Enterprise</span>
              </div>
            </div>
          </div>
        </section>

        {/* Engineering Philosophy & About Me */}
        <section id="about" className="scroll-mt-24">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-gray-900 to-gray-800 text-white shadow-xl space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-widest">
              <Lightbulb className="w-4 h-4" />
              <span>Engineering Philosophy</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold leading-snug">
              &ldquo;Software should be fast, quiet, and profoundly respectful of the user&rsquo;s privacy.&rdquo;
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 text-gray-300 text-xs sm:text-sm font-light leading-relaxed">
              <div className="space-y-2">
                <h4 className="font-medium text-white text-sm">Privacy by Construction</h4>
                <p>
                  Security isn&rsquo;t an afterthought. In systems like Personal Gemini Journal, zero-leak rules are
                  enforced directly in the database engine, guaranteeing that personal thoughts stay completely private.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-white text-sm">Practical AI Augmentation</h4>
                <p>
                  AI shouldn&rsquo;t overwhelm or perform shallow novelty tricks. It should augment human contemplation,
                  synthesize complex thoughts, and surface meaningful patterns that help people flourish.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-white text-sm">End-to-End Craftsmanship</h4>
                <p>
                  From strict TypeScript type definitions and server-side secret protection to subtle typography and
                  accessible keyboard navigation, every layer of the stack matters.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact & Collaboration Section */}
        <section id="contact" className="scroll-mt-24 space-y-8 pb-12">
          <div className="text-center max-w-xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700">
              <Mail className="w-4 h-4 text-amber-600" />
              <span>Get in Touch</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-gray-900 tracking-tight">
              Let&rsquo;s Build Something Meaningful
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed font-light">
              Interested in collaborating, hiring for full-stack/AI roles, or discussing modern engineering
              architectures? I&rsquo;d love to connect.
            </p>
          </div>

          <div className="max-w-xl mx-auto p-6 sm:p-8 rounded-3xl bg-white border border-[#e6e5e0] shadow-sm text-center space-y-6">
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/60 flex items-center justify-between gap-4">
              <div className="text-left">
                <div className="text-xs font-medium text-amber-800">Primary Contact</div>
                <div className="font-mono text-sm text-gray-900 font-semibold">{email}</div>
              </div>
              <button
                onClick={handleCopyEmail}
                className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-medium transition shadow-sm flex items-center gap-1.5 shrink-0"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`mailto:${email}`}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gray-900 hover:bg-black text-white text-xs font-medium transition shadow-sm flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4" />
                <span>Send Direct Email</span>
              </a>

              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-3 rounded-xl border border-[#e6e5e0] bg-white hover:bg-gray-50 text-gray-700 text-xs font-medium transition shadow-sm flex items-center justify-center gap-2"
              >
                <Github className="w-4 h-4" />
                <span>GitHub Profile</span>
              </a>

              <Link
                href="/"
                className="w-full sm:w-auto px-5 py-3 rounded-xl border border-amber-200 bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-medium transition shadow-sm flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Open Gemini Journal</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Interactive Architecture Case Study Modal */}
      {showArchModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-[#e6e5e0] shadow-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-amber-700 font-semibold">
                  Technical Case Study
                </span>
                <h3 className="font-serif text-2xl font-semibold text-gray-900">
                  Personal Gemini Journal Architecture
                </h3>
              </div>
              <button
                onClick={() => setShowArchModal(false)}
                className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Tabs */}
            <div className="flex items-center gap-2 border-b border-[#e6e5e0] pb-2 text-xs font-medium">
              <button
                onClick={() => setActiveArchTab('flow')}
                className={`pb-1.5 transition ${
                  activeArchTab === 'flow'
                    ? 'text-amber-700 border-b-2 border-amber-600 font-semibold'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                End-to-End Data Flow
              </button>
              <button
                onClick={() => setActiveArchTab('security')}
                className={`pb-1.5 transition ${
                  activeArchTab === 'security'
                    ? 'text-amber-700 border-b-2 border-amber-600 font-semibold'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                Firestore Security Rules
              </button>
              <button
                onClick={() => setActiveArchTab('prompts')}
                className={`pb-1.5 transition ${
                  activeArchTab === 'prompts'
                    ? 'text-amber-700 border-b-2 border-amber-600 font-semibold'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                Gemini Persona Engineering
              </button>
            </div>

            {/* Tab 1: End-to-End Data Flow */}
            {activeArchTab === 'flow' && (
              <div className="space-y-4 text-xs sm:text-sm text-gray-600 leading-relaxed font-light">
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 font-mono text-xs space-y-2">
                  <div className="text-gray-900 font-bold">1. Client Browser (React 19 / Next.js)</div>
                  <div className="pl-4 text-gray-600">&darr; Authenticates with Firebase Google Sign-In &rarr; Obtains JWT `auth.uid`</div>
                  <div className="text-gray-900 font-bold">2. Cloud Firestore Realtime Listeners</div>
                  <div className="pl-4 text-gray-600">&darr; Strictly fetches path `/users/&#123;uid&#125;/journals/&#123;journalId&#125;`</div>
                  <div className="text-gray-900 font-bold">3. Next.js Server Route Handler (`/api/gemini/chat`)</div>
                  <div className="pl-4 text-gray-600">&darr; Protects `GEMINI_API_KEY`, injects system instruction, calls `@google/genai`</div>
                  <div className="text-gray-900 font-bold">4. Google Gemini Flash Model</div>
                  <div className="pl-4 text-gray-600">&rarr; Streams empathetic response &bull; synthesizes structured summary</div>
                </div>
                <p>
                  <strong>Zero Client Exposure:</strong> The Gemini API secret is strictly retained in `.env.local` on the
                  server. Client requests are verified and forwarded via Next.js 15 App Router server endpoints.
                </p>
              </div>
            )}

            {/* Tab 2: Firestore Security Rules */}
            {activeArchTab === 'security' && (
              <div className="space-y-3">
                <p className="text-xs text-gray-600 font-light">
                  Enforces complete multi-tenant data segregation. Any document outside `users/&#123;userId&#125;` or where
                  the caller&rsquo;s JWT `request.auth.uid` does not strictly equal `userId` is rejected by default.
                </p>
                <pre className="p-4 rounded-xl bg-gray-900 text-gray-100 font-mono text-xs overflow-x-auto">
{`rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    // Strict Per-User Isolation
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null 
                         && request.auth.uid == userId;
    }

    match /{document=**} {
      allow read, write: if false;
    }
  }
}`}
                </pre>
              </div>
            )}

            {/* Tab 3: Gemini Persona Engineering */}
            {activeArchTab === 'prompts' && (
              <div className="space-y-3 text-xs sm:text-sm text-gray-600 font-light leading-relaxed">
                <p>
                  The system employs dynamic system instruction injection across 4 tailored personas:
                </p>
                <div className="space-y-2 font-mono text-xs">
                  <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200/60 text-amber-950">
                    <strong>Reflective Companion:</strong> Empathetic active listening, gentle validation, emotional
                    mirroring, non-judgmental inquiry.
                  </div>
                  <div className="p-2.5 rounded-lg bg-indigo-50 border border-indigo-200/60 text-indigo-950">
                    <strong>Executive Analyst:</strong> Core pattern identification, risk evaluation, cognitive blind
                    spots, root-cause deduction.
                  </div>
                  <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200/60 text-emerald-950">
                    <strong>Socratic Guide:</strong> Probing underlying cognitive assumptions, counter-questions, reframing
                    perceived constraints.
                  </div>
                </div>
              </div>
            )}

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowArchModal(false)}
                className="px-4 py-2 rounded-xl bg-gray-900 text-white text-xs font-medium hover:bg-black transition"
              >
                Close Case Study
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-[#e6e5e0] bg-white py-8 text-center text-xs text-gray-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            &copy; {new Date().getFullYear()} <strong>Muhammad Asif</strong> &bull; Crafted with Next.js 15, Gemini
            Flash & Tailwind CSS.
          </div>
          <div className="flex items-center gap-4">
            <a href="#featured" className="hover:text-amber-700 transition">
              Flagship Project
            </a>
            <Link href="/" className="hover:text-amber-700 transition">
              Gemini Journal App
            </Link>
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="hover:text-amber-700 transition">
              GitHub
            </a>
            <a href={`mailto:${email}`} className="hover:text-amber-700 transition">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
