// PageCriticalCSS.js - Page-specific critical CSS
import React from 'react';
import { useRouter } from 'next/router';
import { CriticalCSS } from './CriticalCSS';
import criticalCssData from '../lib/criticalCssData';

export function PageCriticalCSS() {
  const router = useRouter();
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
  
  // Get the current path
  const path = router.pathname || '/';
  
  // Get CSS for current path, fallback to home
  const css = criticalCssData[path] || criticalCssData['/'];
  
  return <CriticalCSS css={css} isMobile={isMobile} />;
}

export default PageCriticalCSS;
