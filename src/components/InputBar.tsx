'use client';

import React, { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { AIMode } from '@/types';
import {
  Send,
  Sparkles,
  Compass,
  FileText,
  Lightbulb,
  HelpCircle,
  CornerDownLeft,
} from 'lucide-react';

interface InputBarProps {
  onSendMessage: (text: string, mode: AIMode) => Promise<void>;
  disabled?: boolean;
  isLoading?: boolean;
}

const PROMPT_SUGGESTIONS = [
  'What is taking up the most headspace for you right now?',
  'Reflect on one win or highlight from today, big or small.',
  'Help me reframe an anxious thought or hesitation I have.',
  'What is a boundary or choice you want to honor this week?',
];

const PERSONAS: { mode: AIMode; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { mode: 'reflection', label: 'Reflective Companion', icon: Sparkles },
  { mode: 'brainstorm', label: 'Brainstorm Partner', icon: Lightbulb },
  { mode: 'socratic', label: 'Socratic Guide', icon: Compass },
  { mode: 'summary', label: 'Executive Analyst', icon: FileText },
];

export function InputBar({ onSendMessage, disabled = false, isLoading = false }: InputBarProps) {
  const [text, setText] = useState('');
  const [mode, setMode] = useState<AIMode>('reflection');
  const [showPrompts, setShowPrompts] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [text]);

  const handleSubmit = async () => {
    const trimmed = text.trim();
    if (!trimmed || disabled || isLoading) return;
    setText('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
    await onSendMessage(trimmed, mode);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSelectPrompt = (prompt: string) => {
    setText(prompt);
    setShowPrompts(false);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 pb-4 pt-2">
      {/* Suggestions Drawer Toggle */}
      <div className="flex items-center justify-between mb-2">
        <button
          type="button"
          onClick={() => setShowPrompts(!showPrompts)}
          className="text-xs text-gray-500 hover:text-amber-800 transition flex items-center gap-1.5 font-medium"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>{showPrompts ? 'Hide reflection prompts' : 'Need inspiration? View prompts'}</span>
        </button>

        {/* Persona Mode Pills */}
        <div className="hidden sm:flex items-center gap-1 bg-[#f4f3ef] p-1 rounded-xl border border-[#e6e5e0]">
          {PERSONAS.map((p) => {
            const Icon = p.icon;
            const isSelected = mode === p.mode;
            return (
              <button
                key={p.mode}
                type="button"
                onClick={() => setMode(p.mode)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition ${
                  isSelected
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-amber-600' : 'text-gray-400'}`} />
                <span>{p.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Suggestion Chips */}
      {showPrompts && (
        <div className="mb-3 p-3 bg-amber-50/70 border border-amber-200/60 rounded-xl">
          <div className="text-xs font-semibold text-amber-900 mb-2">Reflection Starters:</div>
          <div className="flex flex-wrap gap-1.5">
            {PROMPT_SUGGESTIONS.map((prompt, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSelectPrompt(prompt)}
                className="text-xs bg-white text-gray-700 hover:bg-amber-100/70 hover:text-amber-900 px-3 py-1.5 rounded-lg border border-amber-200/50 transition text-left"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Input Box */}
      <div className="relative rounded-2xl border border-[#e6e5e0] bg-white shadow-sm focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-500/20 transition">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled || isLoading}
          placeholder="What are you thinking, feeling, or working through today?..."
          rows={1}
          className="w-full resize-none bg-transparent px-4 py-3.5 text-sm sm:text-base text-gray-900 placeholder:text-gray-400 focus:outline-none max-h-[220px]"
        />

        <div className="flex items-center justify-between px-3.5 pb-2.5 pt-1 border-t border-gray-100 text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline">
              Press <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-[10px] text-gray-600 border border-gray-200 font-mono">Enter</kbd> to reflect
            </span>
            <span className="hidden sm:inline">&bull;</span>
            <span className="hidden sm:inline">
              <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-[10px] text-gray-600 border border-gray-200 font-mono">Shift+Enter</kbd> for newline
            </span>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={!text.trim() || disabled || isLoading}
            className={`p-2 rounded-xl transition flex items-center gap-1.5 font-medium ${
              text.trim() && !disabled && !isLoading
                ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-sm shadow-amber-600/30'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            {isLoading ? (
              <span className="flex items-center gap-1.5 text-xs px-2">
                <span className="w-3.5 h-3.5 border-2 border-amber-600 border-t-transparent rounded-full animate-spin" />
                <span>Thinking...</span>
              </span>
            ) : (
              <>
                <span className="text-xs hidden sm:inline px-1">Send</span>
                <Send className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
