'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { LazySparklesCore } from '../ui/LazySparklesCore';
import { Cover } from '../ui/cover';
import { LazyMotionDiv, LazyAnimatePresence } from '@/components/ui/motion/LazyMotion';
import { AnimatedButton } from '../ui/AnimatedButton';
import { MobileHeader } from './MobileHeader';

export function Hero() {
  // Start with false for consistent hydration
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Use useEffect to update state after hydration
  useEffect(() => {
    // Set a small delay to ensure hydration completes first
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 10);
    
    return () => clearTimeout(timer);
  }, []);

  // During server-side rendering, render a simple placeholder
  if (typeof window === 'undefined') {
    return (
      <div className="relative min-h-[100dvh] flex flex-col bg-black">
        <div className="absolute inset-0 z-[2] bg-black" />
      </div>
    );
  }

  return (
    <div className="relative min-h-[100dvh] flex flex-col bg-black opacity-0 animate-fade-in animation-delay-200 overflow-x-hidden overflow-y-auto pb-24 pt-16 touch-auto">
      {/* Mobile Header */}
      <MobileHeader />
      
      {/* Sparkles Animation */}
      <div className="absolute inset-0 z-[2] pointer-events-none">
        <LazySparklesCore
          background="transparent"
          minSize={0.8}
          maxSize={2}
          particleDensity={30} /* Reduced from 100 to 30 for better performance */
          className="w-full h-full"
          particleColor="#1CD4A7"
          speed={0.3}
        />
      </div>

      {/* Hero Images Container - Absolute position (fixed to hero section) */}
      <div className="absolute inset-0 bottom-0 z-[3] transform-gpu pointer-events-none">
        <div className="relative h-full w-full">
          {/* Main Hero Image */}
          <LazyAnimatePresence mode="wait">
            {isLoaded && (
              <LazyMotionDiv 
                className="absolute bottom-0 left-0 w-[55%] h-[70%]"
                initial={{ y: '100vh', opacity: 0 }}
                animate={{ 
                  y: 0,
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
              >
                <div className="relative w-full h-full">
                  <Image
                    src={imageError ? "https://via.placeholder.com/800x1200?text=HD+Trade+Services" : "/images/hayden-hero-mobile.webp"}
                    alt="Professional Technician"
                    fill
                    sizes="55vw"
                    style={{ 
                      objectFit: 'contain', 
                      objectPosition: 'left bottom',
                      transform: 'translateZ(0)',
                      willChange: 'transform',
                      filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.5))'
                    }}
                    className="select-none"
                    priority
                    fetchPriority="high"
                    loading="eager"
                    draggable="false"
                    onError={(e) => {
                      console.error("Failed to load mobile hero image:", e);
                      setImageError(true);
                    }}
                  />
                </div>
              </LazyMotionDiv>
            )}
          </LazyAnimatePresence>
          
          {/* Bottom fade gradient only */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent transform-gpu" />
        </div>
      </div>
      
      <div className="relative z-[4] container mx-auto px-4 py-0 flex-1">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto select-none transform-gpu mt-6 mb-20">
          {/* Mobile Text Content */}
          <div className="flex flex-col items-center mt-2 space-y-4">
            <h1 className="flex flex-col gap-1 text-[2rem] leading-[1.15] font-bold text-white tracking-tight">
              <span className="opacity-0 animate-fade-in-up animation-delay-300">Brisbane</span>
              <span className="opacity-0 animate-fade-in-up animation-delay-400 bg-gradient-to-r from-[#00E6CA] to-[#00E6CA]/80 bg-clip-text text-transparent">24/7 Emergency</span>
              <span className="opacity-0 animate-fade-in-up animation-delay-500">Repairs &amp; Installations</span>
            </h1>
            
            <p className="text-base leading-relaxed opacity-0 animate-fade-in-up animation-delay-600 font-medium bg-black/40 backdrop-blur-sm px-4 py-3 rounded-2xl max-w-[280px] mx-auto">
              <span className="text-[#00E6CA]">Professional services</span>
              <span className="block text-white/90 mt-1">Plumbing • Gas • Roofing • Air Con</span>
            </p>
            
            <div className="text-sm text-white/80 opacity-0 animate-fade-in-up animation-delay-650 max-w-[300px] mx-auto">
              <p>Fast response times across Brisbane. Licensed and insured technicians available 24/7.</p>
            </div>
            
            <div className="flex items-center justify-center gap-2 opacity-0 animate-fade-in-up animation-delay-675">
              <span className="text-white/90">We can have a technician to your home at</span>
              <Cover className="text-[#00E6CA] font-semibold">warp speed</Cover>
            </div>
            
            <div className="opacity-0 animate-scale-up animation-delay-700 transform-gpu mt-4">
              <AnimatedButton 
                href="#book"
                variant="primary"
                className="shadow-lg hover:shadow-xl hover:shadow-[#00E6CA]/20 text-white"
              >
                Book Online
              </AnimatedButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 