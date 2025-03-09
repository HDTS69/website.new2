'use client';

import React, { Suspense } from 'react';

// Wrapper for components that might fail
const SafeComponent = ({ 
  children, 
  fallback = null 
}: { 
  children: React.ReactNode, 
  fallback?: React.ReactNode 
}) => {
  try {
    return <>{children}</>;
  } catch (error) {
    console.error("Component Error:", error);
    return <>{fallback}</>;
  }
};

// Dynamic imports to prevent issues with undefined components
const PullToRefresh = React.lazy(() => 
  import('@/components/PullToRefresh').then(mod => ({ default: mod.PullToRefresh }))
);

const ScrollToTop = React.lazy(() => 
  import('@/components/ui/ScrollToTop').then(mod => ({ default: mod.ScrollToTop }))
);

const Analytics = React.lazy(() => 
  import('@/components/Analytics').then(mod => ({ default: mod.Analytics }))
);

const GoogleMapsScript = React.lazy(() => 
  import('@/components/ui/BookingForm/GoogleMapsScript').then(mod => ({ default: mod.GoogleMapsScript }))
);

interface ClientLayoutProps {
  children: React.ReactNode;
}

export function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <>
      <div className="flex min-h-screen flex-col bg-black">
        <Suspense fallback={null}>
          <SafeComponent>
            <PullToRefresh />
          </SafeComponent>
        </Suspense>
        
        {children}
        
        <Suspense fallback={null}>
          <SafeComponent>
            <ScrollToTop />
          </SafeComponent>
        </Suspense>
      </div>
      
      <Suspense fallback={null}>
        <SafeComponent>
          <Analytics />
        </SafeComponent>
      </Suspense>
      
      <Suspense fallback={null}>
        <SafeComponent>
          <GoogleMapsScript />
        </SafeComponent>
      </Suspense>
    </>
  );
} 