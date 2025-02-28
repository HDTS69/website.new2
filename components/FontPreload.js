'use client'

// FontPreload.js - Optimizes font loading
import React from 'react';

export function FontPreload() {
  return (
    <>
      {/* Preload critical fonts with high priority */}
      <link
        rel="preload"
        href="/_next/static/media/a34f9d1faa5f3315-s.p.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
        fetchPriority="high"
      />
      
      {/* Font display optimization */}
      <style dangerouslySetInnerHTML={{
        __html: `
          /* Optimize font display */
          @font-face {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 400;
            font-display: swap;
            src: url('/_next/static/media/a34f9d1faa5f3315-s.p.woff2') format('woff2');
          }
          
          /* Font loading optimization */
          html {
            font-display: swap;
          }
          
          /* Prevent layout shift with font loading */
          body {
            text-rendering: optimizeSpeed;
          }
        `
      }} />
    </>
  );
}

export default FontPreload;
