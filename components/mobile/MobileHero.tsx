import React from 'react';
import Image from 'next/image';
import { SparklesCore } from '../ui/SparklesCore';
import { Cover } from '../ui/cover';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedButton } from '../ui/AnimatedButton';

export function Hero() {
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-[100dvh] flex flex-col bg-black opacity-0 animate-fade-in animation-delay-200 overflow-x-hidden overflow-y-auto pb-24 pt-16">
      {/* Sparkles Animation */}
      <div className="absolute inset-0 z-[2] pointer-events-none">
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

      {/* Hero Images Container - Absolute position (fixed to hero section) */}
      <div className="absolute inset-0 bottom-0 z-[3] transform-gpu pointer-events-none">
        <div className="relative h-full w-full">
          {/* Main Hero Image */}
          <AnimatePresence mode="wait">
            {isLoaded && (
              <motion.div 
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
                    src="/images/hayden-hero-1.webp"
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
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
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

            <div className="opacity-0 animate-fade-in-up animation-delay-700 bg-black/40 backdrop-blur-sm px-4 py-3 rounded-2xl max-w-[280px] mx-auto">
              <p className="text-white/90 text-sm leading-relaxed">
                Fast response. Fair pricing.
                <span className="block font-medium text-[#00E6CA]">Guaranteed satisfaction.</span>
              </p>
            </div>

            <div className="opacity-0 animate-fade-in-up animation-delay-800 bg-black/40 backdrop-blur-sm px-4 py-3 rounded-2xl max-w-[280px] mx-auto">
              <div className="flex flex-col items-center gap-1">
                <span className="text-white/90 text-sm">Technician to your home at</span>
                <Cover className="text-[#00E6CA] font-semibold text-base">warp speed</Cover>
              </div>
            </div>
            
            <div className="opacity-0 animate-scale-up animation-delay-900 transform-gpu mt-4">
              <AnimatedButton 
                href="#book"
                variant="primary"
                className="shadow-lg hover:shadow-xl hover:shadow-[#00E6CA]/20 text-white"
                onClick={(e) => {
                  e.preventDefault();
                  const bookingForm = document.getElementById('book');
                  if (bookingForm) {
                    bookingForm.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
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