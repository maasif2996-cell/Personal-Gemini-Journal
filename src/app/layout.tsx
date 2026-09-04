import type { Metadata } from 'next';
import { Inter, Lora } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-serif',
});

export const metadata: Metadata = {
  title: 'Personal Gemini Journal | AI Reflections & Mindful Insights',
  description:
    'A private, user-authenticated journaling space powered by Google Gemini and Cloud Firestore with strict per-user data isolation.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${lora.variable}`}>
      <body className="min-h-screen bg-[#fbfbf9] text-[#1c1c1a] antialiased selection:bg-amber-100 selection:text-amber-900">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
