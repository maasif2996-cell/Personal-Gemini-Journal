'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { db, isFirebaseConfigured } from '@/lib/firebase';
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  onSnapshot,
  getDocs,
} from 'firebase/firestore';
import { JournalSession, JournalMessage, AIMode } from '@/types';
import { Sidebar } from './Sidebar';
import { ChatView } from './ChatView';
import { ConfigGuide } from './ConfigGuide';

export function Dashboard() {
  const { user, isDemoMode } = useAuth();
  const [sessions, setSessions] = useState<JournalSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<JournalMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSummarizing, setIsSummarizing] = useState<boolean>(false);
  const [showConfig, setShowConfig] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  // 1. Subscribe to User's Sessions in Firestore (or localStorage for demo mode)
  useEffect(() => {
    if (!user) return;

    if (isDemoMode || !isFirebaseConfigured || !db) {
      // Local Storage Mode
      const storedSessions = localStorage.getItem(`demo_sessions_${user.uid}`);
      if (storedSessions) {
        try {
          const parsed = JSON.parse(storedSessions);
          setSessions(parsed);
          if (parsed.length > 0 && !activeSessionId) {
            setActiveSessionId(parsed[0].id);
          }
        } catch (e) {
          console.error(e);
        }
      } else {
        // Initialize with default session
        const initialSession: JournalSession = {
          id: 'demo-session-welcome',
          userId: user.uid,
          title: 'Welcome to Your Journal',
          createdAt: Date.now(),
          updatedAt: Date.now(),
          lastMessagePreview: 'Start writing your first reflection...',
        };
        const initialList = [initialSession];
        setSessions(initialList);
        setActiveSessionId(initialSession.id);
        localStorage.setItem(`demo_sessions_${user.uid}`, JSON.stringify(initialList));
      }
      return;
    }

    // Live Cloud Firestore with strict per-user collection isolation:
    // Path: /users/{user.uid}/journals
    const journalsRef = collection(db, 'users', user.uid, 'journals');
    const q = query(journalsRef, orderBy('updatedAt', 'desc'));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const list: JournalSession[] = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...(docSnap.data() as Omit<JournalSession, 'id'>),
        }));
        setSessions(list);

        // Auto-select first session if none selected
        if (list.length > 0 && !activeSessionId) {
          setActiveSessionId(list[0].id);
        }
      },
      (error) => {
        console.error('Firestore Sessions Sync Error:', error);
      }
    );

    return () => unsubscribe();
  }, [user, isDemoMode, activeSessionId]);

  // 2. Subscribe to Messages of the Active Session
  useEffect(() => {
    if (!user || !activeSessionId) {
      setMessages([]);
      return;
    }

    if (isDemoMode || !isFirebaseConfigured || !db) {
      // Local Storage Mode
      const storedMessages = localStorage.getItem(`demo_messages_${activeSessionId}`);
      if (storedMessages) {
        try {
          setMessages(JSON.parse(storedMessages));
        } catch {
          setMessages([]);
        }
      } else {
        setMessages([]);
      }
      return;
    }

    // Live Cloud Firestore subcollection:
    // Path: /users/{user.uid}/journals/{activeSessionId}/messages
    const messagesRef = collection(db, 'users', user.uid, 'journals', activeSessionId, 'messages');
    const q = query(messagesRef, orderBy('createdAt', 'asc'));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const list: JournalMessage[] = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...(docSnap.data() as Omit<JournalMessage, 'id'>),
        }));
        setMessages(list);
      },
      (error) => {
        console.error('Firestore Messages Sync Error:', error);
      }
    );

    return () => unsubscribe();
  }, [user, activeSessionId, isDemoMode]);

  // Create a new journal session
  const handleNewSession = async () => {
    if (!user) return;
    const now = Date.now();
    const newSessionData: Omit<JournalSession, 'id'> = {
      userId: user.uid,
      title: 'New Reflection',
      createdAt: now,
      updatedAt: now,
      lastMessagePreview: '',
    };

    if (isDemoMode || !isFirebaseConfigured || !db) {
      const newSession: JournalSession = {
        id: `local-${now}`,
        ...newSessionData,
      };
      const updated = [newSession, ...sessions];
      setSessions(updated);
      setActiveSessionId(newSession.id);
      localStorage.setItem(`demo_sessions_${user.uid}`, JSON.stringify(updated));
      return;
    }

    try {
      const docRef = await addDoc(collection(db, 'users', user.uid, 'journals'), newSessionData);
      setActiveSessionId(docRef.id);
    } catch (err) {
      console.error('Failed to create session in Firestore:', err);
    }
  };

  // Delete a journal session
  const handleDeleteSession = async (id: string) => {
    if (!user) return;

    if (isDemoMode || !isFirebaseConfigured || !db) {
      const updated = sessions.filter((s) => s.id !== id);
      setSessions(updated);
      localStorage.setItem(`demo_sessions_${user.uid}`, JSON.stringify(updated));
      localStorage.removeItem(`demo_messages_${id}`);
      if (activeSessionId === id) {
        setActiveSessionId(updated.length > 0 ? updated[0].id : null);
      }
      return;
    }

    try {
      // Delete subcollection messages first
      const messagesRef = collection(db, 'users', user.uid, 'journals', id, 'messages');
      const msgSnap = await getDocs(messagesRef);
      await Promise.all(msgSnap.docs.map((d) => deleteDoc(d.ref)));

      // Delete the session document
      await deleteDoc(doc(db, 'users', user.uid, 'journals', id));

      if (activeSessionId === id) {
        const remaining = sessions.filter((s) => s.id !== id);
        setActiveSessionId(remaining.length > 0 ? remaining[0].id : null);
      }
    } catch (err) {
      console.error('Failed to delete session:', err);
    }
  };

  // Update session title
  const handleUpdateTitle = async (newTitle: string) => {
    if (!user || !activeSessionId) return;

    if (isDemoMode || !isFirebaseConfigured || !db) {
      const updated = sessions.map((s) => (s.id === activeSessionId ? { ...s, title: newTitle } : s));
      setSessions(updated);
      localStorage.setItem(`demo_sessions_${user.uid}`, JSON.stringify(updated));
      return;
    }

    try {
      const sessionRef = doc(db, 'users', user.uid, 'journals', activeSessionId);
      await updateDoc(sessionRef, { title: newTitle, updatedAt: Date.now() });
    } catch (err) {
      console.error('Failed to update title:', err);
    }
  };

  // Send a message and generate Gemini reflection
  const handleSendMessage = async (prompt: string, mode: AIMode) => {
    if (!user) return;

    // If no active session, create one first
    let currentSessionId = activeSessionId;
    if (!currentSessionId) {
      const now = Date.now();
      if (isDemoMode || !isFirebaseConfigured || !db) {
        const newSession: JournalSession = {
          id: `local-${now}`,
          userId: user.uid,
          title: prompt.slice(0, 30) + '...',
          createdAt: now,
          updatedAt: now,
        };
        const updated = [newSession, ...sessions];
        setSessions(updated);
        localStorage.setItem(`demo_sessions_${user.uid}`, JSON.stringify(updated));
        currentSessionId = newSession.id;
        setActiveSessionId(newSession.id);
      } else {
        const docRef = await addDoc(collection(db, 'users', user.uid, 'journals'), {
          userId: user.uid,
          title: prompt.slice(0, 30) + '...',
          createdAt: now,
          updatedAt: now,
        });
        currentSessionId = docRef.id;
        setActiveSessionId(docRef.id);
      }
    }

    const now = Date.now();
    const userMessage: JournalMessage = {
      id: `msg-${now}-user`,
      role: 'user',
      content: prompt,
      createdAt: now,
      type: 'chat',
    };

    // Save user message
    if (isDemoMode || !isFirebaseConfigured || !db) {
      const newMessages = [...messages, userMessage];
      setMessages(newMessages);
      localStorage.setItem(`demo_messages_${currentSessionId}`, JSON.stringify(newMessages));
    } else {
      await addDoc(
        collection(db, 'users', user.uid, 'journals', currentSessionId, 'messages'),
        userMessage
      );
    }

    // Call Gemini API route
    setIsLoading(true);
    try {
      const history = messages.map((m) => ({ role: m.role, content: m.content }));
      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, history, mode }),
      });

      const data = await res.json();
      const replyContent = data.text || data.error || 'Gemini could not respond.';

      const replyMessage: JournalMessage = {
        id: `msg-${Date.now()}-model`,
        role: 'model',
        content: replyContent,
        createdAt: Date.now(),
        type: mode,
      };

      // Save model reply
      if (isDemoMode || !isFirebaseConfigured || !db) {
        const finalMessages = [...messages, userMessage, replyMessage];
        setMessages(finalMessages);
        localStorage.setItem(`demo_messages_${currentSessionId}`, JSON.stringify(finalMessages));

        // Update session preview & title if needed
        const updatedSessions = sessions.map((s) => {
          if (s.id === currentSessionId) {
            return {
              ...s,
              lastMessagePreview: prompt.slice(0, 60),
              updatedAt: Date.now(),
              title: s.title === 'New Reflection' ? prompt.slice(0, 30) : s.title,
            };
          }
          return s;
        });
        setSessions(updatedSessions);
        localStorage.setItem(`demo_sessions_${user.uid}`, JSON.stringify(updatedSessions));
      } else {
        await addDoc(
          collection(db, 'users', user.uid, 'journals', currentSessionId, 'messages'),
          replyMessage
        );

        // Update session summary in Firestore
        const sessionRef = doc(db, 'users', user.uid, 'journals', currentSessionId);
        const currentSession = sessions.find((s) => s.id === currentSessionId);
        await updateDoc(sessionRef, {
          lastMessagePreview: prompt.slice(0, 60),
          updatedAt: Date.now(),
          ...(currentSession?.title === 'New Reflection'
            ? { title: prompt.slice(0, 30) }
            : {}),
        });
      }
    } catch (err) {
      console.error('Gemini call failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Summarize the current session
  const handleSummarize = async () => {
    if (!activeSessionId || messages.length === 0 || !user) return;

    setIsSummarizing(true);
    try {
      const currentSession = sessions.find((s) => s.id === activeSessionId);
      const res = await fetch('/api/gemini/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages,
          title: currentSession?.title,
        }),
      });

      const data = await res.json();
      if (data.success && data.summary) {
        if (isDemoMode || !isFirebaseConfigured || !db) {
          const updated = sessions.map((s) =>
            s.id === activeSessionId ? { ...s, summary: data.summary } : s
          );
          setSessions(updated);
          localStorage.setItem(`demo_sessions_${user.uid}`, JSON.stringify(updated));
        } else {
          const sessionRef = doc(db, 'users', user.uid, 'journals', activeSessionId);
          await updateDoc(sessionRef, {
            summary: data.summary,
            updatedAt: Date.now(),
          });
        }
      }
    } catch (err) {
      console.error('Summarization failed:', err);
    } finally {
      setIsSummarizing(false);
    }
  };

  const activeSession = sessions.find((s) => s.id === activeSessionId) || null;

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#fbfbf9]">
      {/* Setup Guide Modal */}
      {showConfig && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <ConfigGuide onClose={() => setShowConfig(false)} />
        </div>
      )}

      {/* Sidebar with past entries */}
      <Sidebar
        sessions={sessions}
        activeSessionId={activeSessionId}
        onSelectSession={(id) => setActiveSessionId(id)}
        onNewSession={handleNewSession}
        onDeleteSession={handleDeleteSession}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onOpenConfig={() => setShowConfig(true)}
      />

      {/* Main Journal Reflection Workspace */}
      <ChatView
        session={activeSession}
        messages={messages}
        onSendMessage={handleSendMessage}
        onSummarize={handleSummarize}
        onUpdateTitle={handleUpdateTitle}
        isLoading={isLoading}
        isSummarizing={isSummarizing}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />
    </div>
  );
}
