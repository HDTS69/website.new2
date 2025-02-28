import React, { Suspense, lazy, ComponentType } from 'react';

interface DynamicImportProps {
  importFn: () => Promise<{ default: ComponentType<any> }>;
  fallback?: React.ReactNode;
  onLoad?: () => void;
  onError?: (error: Error) => void;
  errorComponent?: React.ReactNode;
  [key: string]: any;
}

/**
 * DynamicImport component for code splitting
 * 
 * This component handles dynamic imports with proper loading states,
 * error boundaries, and retry functionality.
 * 
 * @example
 * ```tsx
 * <DynamicImport 
 *   importFn={() => import('@/components/HeavyComponent')}
 *   fallback={<LoadingSpinner />}
 *   onError={(err) => console.error(err)}
 *   {...props}
 * />
 * ```
 */
export function DynamicImport({
  importFn,
  fallback = <DefaultLoadingFallback />,
  onLoad,
  onError,
  errorComponent = <DefaultErrorFallback />,
  ...props
}: DynamicImportProps) {
  // Create a lazy-loaded component with error handling
  const LazyComponent = lazy(() => {
    return importFn()
      .then((module) => {
        if (onLoad) onLoad();
        return module;
      })
      .catch((error) => {
        if (onError) onError(error);
        console.error('Error loading dynamic component:', error);
        
        // Return a dummy component when there's an error
        return {
          default: () => <>{errorComponent}</>
        };
      });
  });

  return (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  );
}

// Default loading fallback component
function DefaultLoadingFallback() {
  return (
    <div className="flex items-center justify-center p-4 min-h-[100px]">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-primary"></div>
    </div>
  );
}

// Default error fallback component
function DefaultErrorFallback() {
  return (
    <div className="flex flex-col items-center justify-center p-4 min-h-[100px] text-center">
      <p className="text-red-500 mb-2">Failed to load component</p>
      <button 
        onClick={() => window.location.reload()}
        className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
      >
        Retry
      </button>
    </div>
  );
} 