'use client';

import React, { memo } from 'react';

/**
 * Global loading component shown during page transitions
 * Uses CSS animations for better performance where possible
 */
const Loading = memo(function Loading() {
  return (
    <div 
      className="fixed inset-0 bg-black z-50 flex items-center justify-center"
      style={{
        willChange: 'opacity',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
      }}
    >
      <div className="flex flex-col items-center">
        <div
          className="w-16 h-16 relative opacity-0 animate-fade-in"
          style={{ 
            animationDuration: '200ms',
            animationFillMode: 'forwards',
          }}
        >
          {/* Use CSS animation instead of Framer Motion for the spinner */}
          <div
            className="absolute inset-0 border-t-4 border-[#00E6CA] rounded-full animate-spin"
            style={{
              willChange: 'transform',
              transform: 'translateZ(0)',
              animationDuration: '1s',
              animationTimingFunction: 'linear',
              animationIterationCount: 'infinite',
            }}
          />
        </div>
        
        <p 
          className="mt-4 text-[#00E6CA] font-medium text-sm opacity-0 animate-fade-in"
          style={{ 
            animationDuration: '200ms',
            animationDelay: '50ms',
            animationFillMode: 'forwards',
          }}
        >
          Loading...
        </p>
      </div>
    </div>
  );
});

export default Loading; 