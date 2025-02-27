"use client";

import { useEffect, useState, Suspense } from 'react';
import { usePathname, useSearchParams } from "next/navigation";
import dynamic from 'next/dynamic';

import AOS from "aos";
import "aos/dist/aos.css";

// Import header and footer normally as they're critical for initial render
import Header from "@/components/ui/header";
import { MobileHeader } from "@/components/mobile";
import Footer from "@/components/ui/footer";
import { Navigation } from "@/components/ui/Navigation";
import { navigationItems, actionItems } from "@/lib/navigation";
import { BannerCTA } from "@/components/BannerCTA";

// Dynamically import LoadingScreen as it's only needed occasionally
const LoadingScreen = dynamic(() => import("@/components/ui/LoadingScreen"), {
  ssr: false,
  loading: () => null
});

function DefaultLayoutInner({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Handle initial mount and route changes
  useEffect(() => {
    // Initialize AOS
    AOS.init({
      once: true,
      disable: "phone",
      duration: 700,
      easing: "ease-out-cubic",
    });

    // Handle loading state
    let loadingTimer: NodeJS.Timeout;

    const show = () => {
      setIsVisible(true);
      setIsLoading(false);
    };

    if (document.readyState === 'complete') {
      show();
    } else {
      loadingTimer = setTimeout(show, 800);
    }

    const handleReadyStateChange = () => {
      if (document.readyState === 'complete') {
        show();
      }
    };

    document.addEventListener('readystatechange', handleReadyStateChange);

    return () => {
      clearTimeout(loadingTimer);
      document.removeEventListener('readystatechange', handleReadyStateChange);
    };
  }, [pathname, searchParams]);

  // Handle refresh
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const handleBeforeUnload = () => {
      sessionStorage.setItem('scrollPosition', window.scrollY.toString());
    };

    const handleLoad = () => {
      const scrollPosition = sessionStorage.getItem('scrollPosition');
      if (scrollPosition) {
        window.scrollTo(0, parseInt(scrollPosition));
        sessionStorage.removeItem('scrollPosition');
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('load', handleLoad);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  return (
    <>
      {isLoading && <LoadingScreen />}
      <div 
        className={`min-h-screen ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <Header />
        <Navigation items={navigationItems} actionItems={actionItems} />
        <main className="pb-[72px] md:pb-0">{children}</main>
        <Footer />
        <BannerCTA />
      </div>
    </>
  );
}

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense>
      <DefaultLayoutInner>{children}</DefaultLayoutInner>
    </Suspense>
  );
}
