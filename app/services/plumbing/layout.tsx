import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Plumbing Services Sydney | HD Trade Services',
  description: 'Professional plumbing services in Sydney. From emergency repairs to bathroom renovations, our licensed plumbers deliver quality solutions for all your plumbing needs.',
};

export default function PlumbingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 