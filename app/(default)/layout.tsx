"use client";

import { useEffect, useState, Suspense, memo } from 'react';
import { usePathname, useSearchParams } from "next/navigation";
import dynamic from 'next/dynamic';

// Import header and footer normally as they're critical for initial render
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import { Navigation } from "@/components/ui/Navigation";
import { navigationItems, actionItems } from "@/lib/navigation";
import { BannerCTA } from "@/components/BannerCTA";

// Dynamically import LoadingScreen with reduced priority
const LoadingScreen = dynamic(() => import("@/components/ui/LoadingScreen"), {
  ssr: false,
  loading: () => null,
});

// Memoize inner layout to prevent unnecessary re-renders
const DefaultLayoutInner = memo(function DefaultLayoutInner({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [aosInitialized, setAosInitialized] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Handle initial mount and route changes
  useEffect(() => {
    // Handle loading state with requestAnimationFrame for better performance
    let loadingTimer: number;
    let mounted = true;

    const show = () => {
      if (!mounted) return;
      
      // Use requestAnimationFrame for visual updates
      requestAnimationFrame(() => {
        setIsVisible(true);
        setIsLoading(false);
      });
    };

    if (document.readyState === 'complete') {
      show();
    } else {
      loadingTimer = window.setTimeout(show, 600); // Reduced from 800ms to 600ms
    }

    const handleReadyStateChange = () => {
      if (document.readyState === 'complete') {
        show();
      }
    };

    document.addEventListener('readystatechange', handleReadyStateChange);

    return () => {
      mounted = false;
      clearTimeout(loadingTimer);
      document.removeEventListener('readystatechange', handleReadyStateChange);
    };
  }, [pathname, searchParams]);

  // Initialize AOS only after the page is visible
  useEffect(() => {
    if (isVisible && !aosInitialized) {
      // Use requestIdleCallback to initialize AOS during idle time
      const initAOS = async () => {
        try {
          // Dynamically import AOS
          const aosModule = await import('aos');
          
          // Manually add AOS styles to avoid TypeScript errors
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = 'https://unpkg.com/aos@next/dist/aos.css';
          document.head.appendChild(link);
          
          // Initialize AOS
          aosModule.default.init({
            once: true,
            disable: "phone",
            duration: 700,
            easing: "ease-out-cubic",
          });
          
          setAosInitialized(true);
        } catch (err) {
          console.error('Failed to load AOS:', err);
        }
      };
      
      if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
        window.requestIdleCallback(() => initAOS(), { timeout: 2000 });
      } else {
        // Fallback to setTimeout
        setTimeout(initAOS, 1000);
      }
    }
  }, [isVisible, aosInitialized]);

  // Handle scroll position restoration with reduced event listeners
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Store scroll position only when needed
    const handleBeforeUnload = () => {
      sessionStorage.setItem('scrollPosition', window.scrollY.toString());
    };

    window.addEventListener('beforeunload', handleBeforeUnload, { passive: true });

    // Restore scroll position only once on initial load
    const scrollPosition = sessionStorage.getItem('scrollPosition');
    if (scrollPosition) {
      // Use requestAnimationFrame for smoother visual updates
      requestAnimationFrame(() => {
        window.scrollTo(0, parseInt(scrollPosition));
        sessionStorage.removeItem('scrollPosition');
      });
    }

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <>
      {isLoading && <LoadingScreen />}
      
      <div 
        className={`min-h-screen ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } transition-opacity duration-300`}
        style={{
          willChange: isVisible ? 'auto' : 'opacity',
          transform: 'translateZ(0)',
        }}
      >
        <Header />
        <Navigation items={navigationItems} actionItems={actionItems} />
        <main className="pb-[72px] md:pb-0">{children}</main>
        <Footer />
        <BannerCTA />
      </div>
    </>
  );
});

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={null}>
      <DefaultLayoutInner>{children}</DefaultLayoutInner>
    </Suspense>
  );
}
