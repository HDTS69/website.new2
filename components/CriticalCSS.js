// CriticalCSS.js - Inlines critical CSS for better LCP
'use client';

import React from 'react';

export function CriticalCSS({ css, isMobile }) {
  // Skip if no CSS
  if (!css) return null;
  
  // Use the appropriate CSS based on viewport
  const criticalCss = isMobile ? css.mobile : css.desktop;
  
  return (
    <style 
      id="critical-css" 
      dangerouslySetInnerHTML={{ 
        __html: criticalCss 
      }} 
    />
  );
}

// Client-side component to detect viewport and load appropriate CSS
export function CriticalCSSWithViewportDetection({ css }) {
  const [isMobile, setIsMobile] = React.useState(false);
  
  React.useEffect(() => {
    // Check if mobile viewport
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Listen for resize events
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return <CriticalCSS css={css} isMobile={isMobile} />;
}

export default CriticalCSS;
