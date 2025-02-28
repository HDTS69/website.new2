"use client";

import React, { useEffect, useState, ReactNode } from 'react';

interface ClientOnlyProps {
  children: ReactNode;
  fallback?: ReactNode;
  delay?: number;
}

/**
 * ClientOnly component to prevent hydration mismatches
 * 
 * This component ensures that its children are only rendered on the client side,
 * preventing hydration mismatches between server and client rendering.
 * 
 * @param children - The content to render on the client
 * @param fallback - Optional fallback UI to show during SSR (should match structure)
 * @param delay - Optional delay in ms before mounting (default: 0)
 */
export function ClientOnly({ 
  children, 
  fallback = null,
  delay = 0 
}: ClientOnlyProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Use requestAnimationFrame for smoother mounting
    const raf = requestAnimationFrame(() => {
      // Add optional delay if needed
      if (delay > 0) {
        const timer = setTimeout(() => {
          setIsMounted(true);
        }, delay);
        return () => clearTimeout(timer);
      } else {
        setIsMounted(true);
      }
    });
    
    return () => cancelAnimationFrame(raf);
  }, [delay]);

  // During SSR and initial client render, show fallback
  if (!isMounted) {
    return fallback ? <>{fallback}</> : null;
  }

  // After mounting on client, show actual content
  return <>{children}</>;
}

/**
 * withClientOnly HOC to wrap components that should only render on client
 * 
 * @param Component - The component to wrap
 * @param fallback - Optional fallback UI
 * @param delay - Optional delay in ms
 */
export function withClientOnly<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: ReactNode,
  delay?: number
) {
  return function WithClientOnly(props: P) {
    return (
      <ClientOnly fallback={fallback} delay={delay}>
        <Component {...props} />
      </ClientOnly>
    );
  };
} 