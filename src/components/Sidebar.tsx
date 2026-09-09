'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { JournalSession } from '@/types';
import {
  Plus,
  Search,
  BookOpen,
  LogOut,
  Trash2,
  Settings,
  Sparkles,
  CheckCircle2,
  FileText,
  X,
  Briefcase,
  ArrowUpRight,
} from 'lucide-react';

interface SidebarProps {
  sessions: JournalSession[];
  activeSessionId: string | null;
  onSelectSession: (id: string) => void;
  onNewSession: () => void;
  onDeleteSession: (id: string) => Promise<void>;
  isOpen: boolean;
  onClose: () => void;
  onOpenConfig: () => void;
}

export function Sidebar({
  sessions,
  activeSessionId,
  onSelectSession,
  onNewSession,
  onDeleteSession,
  isOpen,
  onClose,
  onOpenConfig,
}: SidebarProps) {
  const { user, logout, isDemoMode } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filteredSessions = sessions.filter((s) => {
    const q = searchTerm.toLowerCase();
    return (
      s.title.toLowerCase().includes(q) ||
      (s.lastMessagePreview && s.lastMessagePreview.toLowerCase().includes(q))
    );
  });

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this journal reflection?')) {
      setDeletingId(id);
      try {
        await onDeleteSession(id);
      } finally {
        setDeletingId(null);
      }
    }
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/30 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      <aside
        className={`fixed lg:static top-0 bottom-0 left-0 z-50 w-72 sm:w-80 bg-white border-r border-[#e6e5e0] flex flex-col transition-transform duration-200 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand & New Session */}
        <div className="p-4 border-b border-[#e6e5e0] flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 text-white flex items-center justify-center shadow-sm shadow-amber-500/20">
                <Sparkles className="w-4 h-4" />
              </div>
              <h1 className="font-serif font-semibold text-gray-900 tracking-tight">
                Gemini Journal
              </h1>
            </div>

            <button
              onClick={onClose}
              className="lg:hidden p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <button
            onClick={() => {
              onNewSession();
              onClose();
            }}
            className="w-full py-2.5 px-3.5 bg-gray-900 hover:bg-black text-white rounded-xl text-xs sm:text-sm font-medium flex items-center justify-center gap-2 shadow-sm transition"
          >
            <Plus className="w-4 h-4" />
            <span>New Reflection</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="px-3 pt-3 pb-2">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search past reflections..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#f4f3ef] border border-transparent focus:border-amber-400 focus:bg-white rounded-lg focus:outline-none transition"
            />
          </div>
        </div>

        {/* Sessions List */}
        <div className="flex-1 overflow-y-auto px-2 py-2 space-y-1">
          <div className="px-2 py-1 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
            Past Entries ({filteredSessions.length})
          </div>

          {filteredSessions.length === 0 ? (
            <div className="text-center py-8 px-4 text-xs text-gray-400">
              {searchTerm ? 'No entries matching search' : 'No reflections saved yet.'}
            </div>
          ) : (
            filteredSessions.map((session) => {
              const isActive = session.id === activeSessionId;
              const dateStr = new Date(session.updatedAt || session.createdAt).toLocaleDateString(
                'en-US',
                { month: 'short', day: 'numeric' }
              );

              return (
                <div
                  key={session.id}
                  onClick={() => {
                    onSelectSession(session.id);
                    onClose();
                  }}
                  className={`group relative w-full p-2.5 rounded-xl text-left cursor-pointer transition flex flex-col gap-1 ${
                    isActive
                      ? 'bg-amber-50/80 border border-amber-200/80 text-gray-900'
                      : 'hover:bg-gray-50 border border-transparent text-gray-600'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <BookOpen
                        className={`w-3.5 h-3.5 shrink-0 ${
                          isActive ? 'text-amber-700' : 'text-gray-400'
                        }`}
                      />
                      <span className="font-medium text-xs sm:text-sm truncate">
                        {session.title || 'Untitled Reflection'}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      {session.summary && (
                        <span title="Has AI Summary">
                          <FileText className="w-3 h-3 text-amber-600 shrink-0" />
                        </span>
                      )}
                      <span className="text-[10px] text-gray-400">{dateStr}</span>
                    </div>
                  </div>

                  {session.lastMessagePreview && (
                    <p className="text-[11px] text-gray-500 line-clamp-1 pl-5">
                      {session.lastMessagePreview}
                    </p>
                  )}

                  {/* Delete Button on Hover */}
                  <button
                    onClick={(e) => handleDelete(e, session.id)}
                    disabled={deletingId === session.id}
                    className="absolute right-2 top-2 p-1 rounded-md text-gray-400 hover:text-red-600 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition"
                    title="Delete entry"
                  >
                    {deletingId === session.id ? (
                      <span className="w-3 h-3 border border-red-500 border-t-transparent rounded-full animate-spin inline-block" />
                    ) : (
                      <Trash2 className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* User Footer */}
        <div className="p-3 border-t border-[#e6e5e0] bg-gray-50/50 flex flex-col gap-2">
          <Link
            href="/portfolio"
            className="px-2.5 py-1.5 rounded-lg border border-amber-200/80 bg-white hover:bg-amber-50 text-[11px] font-medium text-gray-700 flex items-center justify-between transition shadow-2xs group"
          >
            <span className="flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-amber-600 group-hover:scale-110 transition" />
              <span>Developer Portfolio</span>
            </span>
            <ArrowUpRight className="w-3 h-3 text-gray-400 group-hover:text-amber-600 transition" />
          </Link>

          {isDemoMode && (
            <div className="px-2 py-1 rounded bg-amber-100/70 border border-amber-200 text-amber-800 text-[10px] flex items-center justify-between">
              <span>Local Demo Mode</span>
              <CheckCircle2 className="w-3 h-3 text-amber-600" />
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              {user?.photoURL ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={user.photoURL}
                  alt={user.displayName || 'User'}
                  className="w-8 h-8 rounded-full border border-gray-200 shrink-0"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-amber-200 text-amber-900 font-medium text-xs flex items-center justify-center shrink-0">
                  {user?.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
                </div>
              )}
              <div className="min-w-0">
                <div className="text-xs font-semibold text-gray-900 truncate">
                  {user?.displayName || 'Personal Journal'}
                </div>
                <div className="text-[10px] text-gray-500 truncate">
                  {user?.email || 'Logged in user'}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={onOpenConfig}
                className="p-1.5 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-white transition"
                title="Config & Setup"
              >
                <Settings className="w-4 h-4" />
              </button>
              <button
                onClick={logout}
                className="p-1.5 rounded-lg text-gray-500 hover:text-red-600 hover:bg-white transition"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
