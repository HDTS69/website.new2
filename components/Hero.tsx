'use client';

import React, { useEffect, useState, lazy, Suspense, memo, useCallback } from 'react';
import { AnimatedButton } from './ui/AnimatedButton';
import { Cover } from './ui/cover';
import Image from 'next/image';
import { LazyMotionDiv, LazyAnimatePresence } from '@/components/ui/motion/LazyMotion';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import type { ComponentType } from 'react';

// Define types for the components we're lazy loading
type SparklesCoreProps = {
  background: string;
  minSize: number;
  maxSize: number;
  particleDensity: number;
  className: string;
  particleColor: string;
  speed: number;
};

// Lazy load heavy components with increased delay and better error handling
const SparklesCore = lazy(() => {
  // Delay loading SparklesCore to prioritize critical content
  return new Promise<{ default: ComponentType<SparklesCoreProps> }>(resolve => {
    // Use requestIdleCallback for non-critical components
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      window.requestIdleCallback(() => 
        import('./ui/SparklesCore')
          .then(mod => resolve({ default: mod.default }))
          .catch(err => {
            console.error('Failed to load SparklesCore:', err);
            // Return a fallback component on error
            resolve({ 
              default: () => <div className="absolute inset-0 z-[2] bg-black" /> 
            });
          }),
        { timeout: 4000 } // Increased timeout for slower connections
      );
    } else {
      // Fallback to setTimeout with a delay
      setTimeout(() => 
        import('./ui/SparklesCore')
          .then(mod => resolve({ default: mod.default }))
          .catch(err => {
            console.error('Failed to load SparklesCore:', err);
            // Return a fallback component on error
            resolve({ 
              default: () => <div className="absolute inset-0 z-[2] bg-black" /> 
            });
          }),
        2000 // Increased delay to 2000ms
      );
    }
  });
});

const MobileHero = lazy(() => {
  // Delay loading MobileHero to prioritize critical content
  return new Promise<{ default: ComponentType<{}> }>(resolve => {
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      window.requestIdleCallback(() => 
        import('./mobile/Hero')
          .then(mod => resolve({ default: mod.Hero }))
          .catch(err => {
            console.error('Failed to load MobileHero:', err);
            // Return a fallback component on error
            resolve({ 
              default: () => (
                <div className="min-h-[100dvh] flex items-center justify-center bg-black">
                  <p className="text-white">Loading mobile view...</p>
                </div>
              ) 
            });
          }),
        { timeout: 2000 }
      );
    } else {
      // Fallback to setTimeout with a delay
      setTimeout(() => 
        import('./mobile/Hero')
          .then(mod => resolve({ default: mod.Hero }))
          .catch(err => {
            console.error('Failed to load MobileHero:', err);
            // Return a fallback component on error
            resolve({ 
              default: () => (
                <div className="min-h-[100dvh] flex items-center justify-center bg-black">
                  <p className="text-white">Loading mobile view...</p>
                </div>
              ) 
            });
          }),
        800
      );
    }
  });
});

// Loading fallbacks - simplified to reduce DOM nodes
const SparklesFallback = memo(() => <div className="absolute inset-0 z-[2] bg-black" />);
const MobileHeroFallback = memo(() => <div className="min-h-[100dvh] flex items-center justify-center bg-black" />);

// Memoize the HeroText component
const HeroText = memo(() => (
  <div className="flex flex-col items-center text-center">
    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 tracking-tight leading-tight">
      <span className="block mb-2 opacity-0 animate-fade-in-up animation-delay-300">Brisbane</span>
      <span className="inline-block mb-2 text-[#00E6CA] opacity-0 animate-fade-in-up animation-delay-400 whitespace-nowrap">24/7 Emergency Repairs</span>
      <span className="block opacity-0 animate-fade-in-up animation-delay-500">& Installations</span>
    </h1>
    
    <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-10 leading-relaxed opacity-0 animate-fade-in-up animation-delay-600 drop-shadow-[0_2px_4px_rgba(0,0,0,1)] font-medium bg-transparent p-0 rounded-xl transform-gpu max-w-2xl mx-auto">
      Professional plumbing, gas, roofing & air conditioning services. 
      <span className="block mt-2">Fast response. Fair pricing. Guaranteed satisfaction.</span>
    </p>

    <div className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed opacity-0 animate-fade-in-up animation-delay-700 flex items-center justify-center gap-2 drop-shadow-[0_2px_4px_rgba(0,0,0,1)] font-medium bg-transparent p-0 rounded-xl transform-gpu max-w-2xl mx-auto">
      <span>We can have a technician to your home at</span>
      <Cover className="text-[#00E6CA] font-semibold">warp speed</Cover>
    </div>

    <div className="opacity-0 animate-scale-up animation-delay-700 transform-gpu">
      <AnimatedButton 
        href="#book"
        variant="primary"
        className="shadow-lg hover:shadow-xl hover:shadow-[#00E6CA]/20 text-white"
      >
        Book Online
      </AnimatedButton>
    </div>
  </div>
));

// Optimized image component with better error handling and performance
const HeroImage = memo(({ isLoaded, imageError }: { isLoaded: boolean; imageError: boolean }) => (
  <LazyAnimatePresence mode="wait">
    {isLoaded && (
      <LazyMotionDiv 
        className="absolute inset-0 left-0 w-[45%] h-full"
        initial={{ x: '-100vw', opacity: 0 }}
        animate={{ 
          x: 0,
          opacity: 1,
          transition: {
            type: "spring",
            damping: 20,
            mass: 0.75,
            stiffness: 100,
            delay: 0.2
          }
        }}
        key="hero-image"
        style={{
          willChange: 'transform, opacity',
          transform: 'translateZ(0)',
        }}
      >
        <div className="relative w-full h-full">
          <Image
            src={imageError ? "https://via.placeholder.com/800x1200?text=HD+Trade+Services" : "/images/hayden-hero-1.webp"}
            alt="Professional Technician"
            fill
            sizes="(max-width: 768px) 100vw, 45vw"
            priority
            fetchPriority="high"
            style={{ 
              objectFit: 'contain', 
              objectPosition: 'left center',
              transform: 'translateZ(0)',
              willChange: 'transform',
              filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.5))'
            }}
            className="select-none"
            loading="eager"
            onLoad={() => {
              // Mark performance only in development
              if (process.env.NODE_ENV === 'development' && typeof performance !== 'undefined') {
                performance.mark('hero-image-loaded');
              }
            }}
            onError={() => {
              console.error("Failed to load hero image");
            }}
          />
        </div>
      </LazyMotionDiv>
    )}
  </LazyAnimatePresence>
));

// Set displayNames for memo components
HeroImage.displayName = 'HeroImage';
SparklesFallback.displayName = 'SparklesFallback';
HeroText.displayName = 'HeroText';
MobileHeroFallback.displayName = 'MobileHeroFallback';

export function Hero() {
  // Use useState with a function initializer to ensure consistent server/client rendering
  const [isMobileState, setIsMobileState] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false); // Start with false for consistent hydration
  const [shouldLoadSparkles, setShouldLoadSparkles] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Get the media query result
  const isMobileQuery = useMediaQuery('(max-width: 768px)');
  
  // Use useEffect to update state after hydration
  useEffect(() => {
    setIsMobileState(isMobileQuery);
    setIsLoaded(true);
  }, [isMobileQuery]);

  // Use useCallback to memoize functions
  const handleImageLoad = useCallback(() => {
    // Use requestAnimationFrame for visual updates
    requestAnimationFrame(() => {
      setImageLoaded(true);
    });
  }, []);

  const handleImageError = useCallback(() => {
    console.error("Failed to preload hero image");
    setImageError(true);
  }, []);

  useEffect(() => {
    // Use requestAnimationFrame for visual updates
    let mounted = true;
    
    // Delay loading sparkles to improve initial page load
    const sparklesTimer = setTimeout(() => {
      // Use requestIdleCallback if available
      if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
        window.requestIdleCallback(() => {
          if (mounted) {
            setShouldLoadSparkles(true);
          }
        }, { timeout: 2000 });
      } else {
        if (mounted) {
          setShouldLoadSparkles(true);
        }
      }
    }, 1500); // Increased from 1000ms to 1500ms for better initial load

    return () => {
      mounted = false;
      clearTimeout(sparklesTimer);
    };
  }, []);

  // Preload the hero image
  useEffect(() => {
    // Only run this effect once and only if not already loaded
    if (imageLoaded) return;

    // Use the window.Image constructor with proper typing
    const img = new (window as any).Image();
    img.src = '/images/hayden-hero-1.webp';
    img.onload = handleImageLoad;
    img.onerror = handleImageError;

    // Clean up
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [imageLoaded, handleImageLoad, handleImageError]);

  // During server-side rendering or initial hydration, render a simple placeholder
  // This ensures consistent rendering between server and client
  if (typeof window === 'undefined') {
    return (
      <div className="relative min-h-[100dvh] flex items-center justify-center bg-black">
        <div className="absolute inset-0 z-[2] bg-black" />
      </div>
    );
  }

  // Render mobile hero if on mobile
  if (isMobileState) {
    return (
      <Suspense fallback={<MobileHeroFallback />}>
        <MobileHero />
      </Suspense>
    );
  }

  return (
    <div className="relative min-h-[100dvh] flex items-center justify-center bg-black opacity-0 animate-fade-in animation-delay-200 overflow-x-hidden overflow-y-auto">
      {/* Sparkles Animation - Lazy loaded */}
      <div className="absolute inset-0 z-[2]">
        {shouldLoadSparkles ? (
          <Suspense fallback={<SparklesFallback />}>
            <SparklesCore
              background="transparent"
              minSize={0.8}
              maxSize={1.8} /* Reduced from 2 to 1.8 */
              particleDensity={10} /* Further reduced from 15 to 10 for better performance */
              className="w-full h-full"
              particleColor="#1CD4A7"
              speed={0.15} /* Reduced from 0.2 to 0.15 */
            />
          </Suspense>
        ) : (
          <SparklesFallback />
        )}
      </div>

      {/* Hero Images Container */}
      <div className="absolute inset-0 top-[80px] z-[3] transform-gpu">
        <div className="relative h-full w-full">
          {/* Main Hero Image */}
          <HeroImage isLoaded={isLoaded} imageError={imageError} />
          
          <div className="absolute inset-0 bg-gradient-to-b from-transparent from-70% via-black/70 via-85% to-black transform-gpu" />
        </div>
      </div>
      
      <div className="relative z-[4] container mx-auto px-4 py-20">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto select-none transform-gpu">
          {/* Desktop Text Content */}
          <HeroText />
        </div>
      </div>
    </div>
  );
} 