"use client";

import dynamic from 'next/dynamic';
import { memo } from 'react';
import { cn } from '@/lib/utils';

// Define the props type
type ParticlesProps = {
  id?: string;
  className?: string;
  background?: string;
  particleSize?: number;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  particleColor?: string;
  particleDensity?: number;
};

// Create a loading placeholder that matches the dimensions of the SparklesCore component
const SparklesPlaceholder = memo(({ className }: { className?: string }) => {
  return (
    <div 
      className={cn("opacity-70 transform-gpu", className)}
      style={{
        willChange: 'transform, opacity',
        backfaceVisibility: 'hidden',
        transform: 'translateZ(0)',
        isolation: 'isolate'
      }}
    />
  );
});

SparklesPlaceholder.displayName = "SparklesPlaceholder";

// Dynamically import the SparklesCore component with SSR disabled
const LazySparklesCore = dynamic(
  () => import('./SparklesCore').then((mod) => mod.SparklesCore),
  {
    loading: () => <SparklesPlaceholder />,
    ssr: false, // Disable server-side rendering for better performance
  }
);

// Export a wrapped version with the same props interface
const WrappedLazySparklesCore = memo((props: ParticlesProps) => {
  return <LazySparklesCore {...props} />;
});

WrappedLazySparklesCore.displayName = "LazySparklesCore";

export { WrappedLazySparklesCore as LazySparklesCore };
export type { ParticlesProps }; 