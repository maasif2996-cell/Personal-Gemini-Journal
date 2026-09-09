import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Muhammad Asif | Full Stack & Generative AI Engineer Portfolio',
  description:
    'Portfolio of Muhammad Asif — Full Stack and Generative AI Engineer specializing in Next.js, TypeScript, Google Gemini AI systems, and secure Firebase architectures. Featuring Personal Gemini Journal.',
  keywords: [
    'Muhammad Asif',
    'Full Stack Engineer',
    'Generative AI Engineer',
    'Personal Gemini Journal',
    'Next.js 15',
    'Google Gemini Flash',
    'Firebase Cloud Firestore',
    'TypeScript Portfolio',
  ],
  openGraph: {
    title: 'Muhammad Asif | Full Stack & Generative AI Engineer',
    description:
      'Explore projects and architecture including Personal Gemini Journal — an empathetic AI reflection platform built with Gemini Flash and Firestore.',
    type: 'website',
  },
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
