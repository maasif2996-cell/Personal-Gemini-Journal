export type AIMode = 'reflection' | 'summary' | 'brainstorm' | 'socratic';

export interface JournalMessage {
  id: string;
  role: 'user' | 'model' | 'system';
  content: string;
  createdAt: number; // epoch ms
  type?: 'chat' | AIMode;
}

export interface ReflectionSummary {
  overview: string;
  emotionalTone?: string;
  keyInsights: string[];
  suggestedPrompts?: string[];
  actionableSteps?: string[];
  generatedAt: number;
}

export interface JournalSession {
  id: string;
  userId: string;
  title: string;
  createdAt: number; // epoch ms
  updatedAt: number; // epoch ms
  summary?: ReflectionSummary;
  tags?: string[];
  lastMessagePreview?: string;
  messagesCount?: number;
}

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}
