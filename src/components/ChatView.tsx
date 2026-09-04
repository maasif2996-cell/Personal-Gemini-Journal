'use client';

import React, { useRef, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { JournalMessage, JournalSession, AIMode } from '@/types';
import { SummaryCard } from './SummaryCard';
import { InputBar } from './InputBar';
import {
  Sparkles,
  User,
  Check,
  Copy,
  Edit2,
  FileText,
  Lightbulb,
  Compass,
  Calendar,
  Menu,
} from 'lucide-react';

interface ChatViewProps {
  session: JournalSession | null;
  messages: JournalMessage[];
  onSendMessage: (text: string, mode: AIMode) => Promise<void>;
  onSummarize: () => Promise<void>;
  onUpdateTitle: (newTitle: string) => Promise<void>;
  isLoading: boolean;
  isSummarizing: boolean;
  onToggleSidebar?: () => void;
}

export function ChatView({
  session,
  messages,
  onSendMessage,
  onSummarize,
  onUpdateTitle,
  isLoading,
  isSummarizing,
  onToggleSidebar,
}: ChatViewProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [titleInput, setTitleInput] = useState(session?.title || '');

  useEffect(() => {
    setTitleInput(session?.title || '');
  }, [session?.title]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSaveTitle = async () => {
    const trimmed = titleInput.trim();
    if (trimmed && trimmed !== session?.title) {
      await onUpdateTitle(trimmed);
    }
    setIsEditingTitle(false);
  };

  const formattedDate = session?.createdAt
    ? new Date(session.createdAt).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : '';

  return (
    <div className="flex-1 flex flex-col h-full bg-[#fbfbf9] overflow-hidden">
      {/* Session Workspace Header */}
      <div className="border-b border-[#e6e5e0] bg-white/80 backdrop-blur-md px-4 sm:px-6 py-3.5 flex items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          {onToggleSidebar && (
            <button
              onClick={onToggleSidebar}
              className="lg:hidden p-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition"
              title="Toggle sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

          <div className="min-w-0">
            {isEditingTitle ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={titleInput}
                  onChange={(e) => setTitleInput(e.target.value)}
                  onBlur={handleSaveTitle}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSaveTitle();
                    if (e.key === 'Escape') {
                      setTitleInput(session?.title || '');
                      setIsEditingTitle(false);
                    }
                  }}
                  autoFocus
                  className="px-2 py-1 text-base sm:text-lg font-serif font-semibold text-gray-900 border border-amber-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                />
              </div>
            ) : (
              <div className="flex items-center gap-2 group cursor-pointer" onClick={() => setIsEditingTitle(true)}>
                <h2 className="text-base sm:text-lg font-serif font-semibold text-gray-900 truncate">
                  {session?.title || 'Daily Reflection'}
                </h2>
                <Edit2 className="w-3.5 h-3.5 text-gray-400 opacity-0 group-hover:opacity-100 transition shrink-0" />
              </div>
            )}

            {formattedDate && (
              <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-0.5">
                <Calendar className="w-3 h-3 text-gray-400" />
                <span>{formattedDate}</span>
              </div>
            )}
          </div>
        </div>

        {/* AI Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onSummarize}
            disabled={messages.length === 0 || isSummarizing}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium border flex items-center gap-1.5 transition ${
              messages.length > 0 && !isSummarizing
                ? 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100/80 shadow-sm'
                : 'bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed'
            }`}
            title="Generate structured AI summary"
          >
            {isSummarizing ? (
              <span className="w-3.5 h-3.5 border-2 border-amber-700 border-t-transparent rounded-full animate-spin" />
            ) : (
              <FileText className="w-3.5 h-3.5 text-amber-700" />
            )}
            <span className="hidden sm:inline">Summarize</span>
          </button>

          <button
            onClick={() =>
              onSendMessage(
                'Help me brainstorm 3 fresh perspectives or creative angles on what we discussed so far.',
                'brainstorm'
              )
            }
            disabled={messages.length === 0 || isLoading}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium border flex items-center gap-1.5 transition ${
              messages.length > 0 && !isLoading
                ? 'bg-white text-gray-700 border-[#e6e5e0] hover:bg-gray-50'
                : 'bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed'
            }`}
            title="Brainstorm creative directions"
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
            <span className="hidden md:inline">Brainstorm</span>
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-6">
        <div className="max-w-4xl mx-auto">
          {/* Summary Card if available */}
          {session?.summary && <SummaryCard summary={session.summary} />}

          {/* Empty state welcome banner */}
          {messages.length === 0 && (
            <div className="text-center py-16 px-4 space-y-4 max-w-md mx-auto">
              <div className="w-12 h-12 rounded-2xl bg-amber-100/70 text-amber-700 flex items-center justify-center mx-auto">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-gray-900">
                Your quiet space to reflect
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed font-light">
                Write freely about what happened today, what you learned, or a challenge on your mind.
                Gemini will listen with empathy, reflect back key insights, and help you find clarity.
              </p>
              <div className="pt-2 flex flex-wrap justify-center gap-2 text-xs">
                <button
                  onClick={() => onSendMessage('I had a really busy day and need help unwinding my thoughts.', 'reflection')}
                  className="px-3 py-1.5 rounded-full bg-white border border-[#e6e5e0] text-gray-700 hover:bg-amber-50 hover:border-amber-300 transition"
                >
                  Unwind after a busy day &rarr;
                </button>
                <button
                  onClick={() => onSendMessage('I am facing a decision and want to explore the tradeoffs clearly.', 'socratic')}
                  className="px-3 py-1.5 rounded-full bg-white border border-[#e6e5e0] text-gray-700 hover:bg-amber-50 hover:border-amber-300 transition"
                >
                  Explore a tough decision &rarr;
                </button>
              </div>
            </div>
          )}

          {/* Render Multi-Turn Messages */}
          {messages.map((msg) => {
            const isUser = msg.role === 'user';
            const timeStr = new Date(msg.createdAt).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            });

            return (
              <div
                key={msg.id}
                className={`flex gap-3 sm:gap-4 my-5 ${
                  isUser ? 'justify-end' : 'justify-start'
                }`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 text-white flex items-center justify-center shrink-0 shadow-sm shadow-amber-500/20 mt-1">
                    <Sparkles className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[88%] sm:max-w-[80%] rounded-2xl p-4 sm:p-5 transition shadow-sm ${
                    isUser
                      ? 'bg-[#f4f3ef] border border-[#e6e5e0] text-gray-900 rounded-tr-sm'
                      : 'bg-white border border-[#e6e5e0] text-gray-900 rounded-tl-sm'
                  }`}
                >
                  {/* Message Header */}
                  <div className="flex items-center justify-between gap-4 mb-2 text-xs text-gray-400">
                    <span className="font-medium text-gray-600">
                      {isUser ? 'Your Journal Reflection' : 'Gemini Reflection'}
                    </span>
                    <div className="flex items-center gap-2">
                      <span>{timeStr}</span>
                      <button
                        onClick={() => handleCopy(msg.id, msg.content)}
                        className="hover:text-gray-700 transition"
                        title="Copy text"
                      >
                        {copiedId === msg.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Message Content */}
                  {isUser ? (
                    <div className="font-serif whitespace-pre-wrap leading-relaxed text-gray-800 text-sm sm:text-base">
                      {msg.content}
                    </div>
                  ) : (
                    <div className="prose-reflection text-sm sm:text-base text-gray-800">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {msg.content}
                      </ReactMarkdown>
                    </div>
                  )}
                </div>

                {isUser && (
                  <div className="w-8 h-8 rounded-xl bg-gray-200 text-gray-600 flex items-center justify-center shrink-0 mt-1">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {/* Loading indicator */}
          {isLoading && (
            <div className="flex gap-3 my-4">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 text-white flex items-center justify-center shrink-0 shadow-sm shadow-amber-500/20">
                <Sparkles className="w-4 h-4 animate-spin" />
              </div>
              <div className="bg-white border border-[#e6e5e0] rounded-2xl rounded-tl-sm p-4 text-xs text-gray-500 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                <span>Gemini is reflecting on your entry...</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input bar pinned at bottom */}
      <InputBar
        onSendMessage={onSendMessage}
        disabled={!session}
        isLoading={isLoading}
      />
    </div>
  );
}
