'use client';

import React, { useEffect, useState } from 'react';
import { AnimatedButton } from './ui/AnimatedButton';
import { SparklesCore } from './ui/SparklesCore';
import { Cover } from './ui/cover';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Hero as MobileHero } from './mobile';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { getImageLoadingProps, IMAGE_SIZES } from '@/utils/imageLoading';

export function Hero() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Small delay to ensure proper animation on initial load
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (isMobile) {
    return <MobileHero />;
  }

  return (
    <div className="relative min-h-[100dvh] flex items-center justify-center bg-black opacity-0 animate-fade-in animation-delay-200 overflow-x-hidden overflow-y-auto">
      {/* Sparkles Animation */}
      <div className="absolute inset-0 z-[2]">
        <SparklesCore
          background="transparent"
          minSize={0.8}
          maxSize={2}
          particleDensity={150}
          className="w-full h-full"
          particleColor="#00E6CA"
          speed={0.4}
        />
      </div>

      {/* Hero Images Container */}
      <div className="absolute inset-0 top-[80px] z-[3] transform-gpu">
        <div className="relative h-full w-full">
          {/* Main Hero Image */}
          <AnimatePresence mode="wait">
            {isLoaded && (
              <motion.div 
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
              >
                <div className="relative w-full h-full">
                  <Image
                    src="/images/hayden-hero-1.webp"
                    alt="Professional Technician"
                    fill
                    sizes={IMAGE_SIZES.HERO}
                    style={{ 
                      objectFit: 'contain', 
                      objectPosition: 'left center',
                      transform: 'translateZ(0)',
                      willChange: 'transform',
                      filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.5))'
                    }}
                    className="select-none"
                    draggable="false"
                    {...getImageLoadingProps(true)}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <div className="absolute inset-0 bg-gradient-to-b from-transparent from-70% via-black/70 via-85% to-black transform-gpu" />
        </div>
      </div>
      
      <div className="relative z-[4] container mx-auto px-4 py-20">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto select-none transform-gpu">
          {/* Desktop Text Content */}
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

            {/* New Warp Speed Section */}
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
        </div>
      </div>
    </div>
  );
} 