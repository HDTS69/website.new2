import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [textLoaded, setTextLoaded] = useState(false);

  useEffect(() => {
    // Staggered loading sequence
    const imageTimer = setTimeout(() => {
      setImageLoaded(true);
    }, 800); // Load image after header (which loads at 300ms)

    const textTimer = setTimeout(() => {
      setTextLoaded(true);
    }, 1200); // Load text after image

    const mainTimer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    return () => {
      clearTimeout(imageTimer);
      clearTimeout(textTimer);
      clearTimeout(mainTimer);
    };
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        duration: 1.2
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        duration: 1
      }
    }
  };

  return (
    <section className="relative w-full h-screen overflow-hidden touch-auto">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black/70 z-10" />
      
      {/* Hero content container */}
      <motion.div 
        className="relative z-20 flex flex-col items-center justify-center h-full px-4 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence>
          {/* Hero image - loads second */}
          {imageLoaded && (
            <motion.div 
              className="relative w-full max-w-[280px] h-[280px] mb-6"
              variants={imageVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, scale: 0.8, y: -20 }}
            >
              <Image
                src="/images/hayden-hero.png"
                alt="Hayden Drew"
                fill
                priority
                className="object-contain"
                sizes="(max-width: 768px) 280px, 400px"
                draggable="false"
              />
            </motion.div>
          )}
          
          {/* Hero text - loads last */}
          {textLoaded && (
            <motion.div 
              className="space-y-4"
              variants={textVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: 20 }}
            >
              <h1 className="text-3xl font-bold text-white">
                <span className="block">Your Local</span>
                <span className="block text-[#00E6CA]">Plumbing Experts</span>
              </h1>
              
              <p className="text-gray-300 text-sm max-w-xs mx-auto">
                Professional plumbing, gas fitting, and hot water services in Brisbane and surrounding areas.
              </p>
              
              <div className="flex flex-col gap-3 mt-6">
                <motion.a
                  href="tel:1300420911"
                  className={cn(
                    "flex items-center justify-center gap-2 px-6 py-3 rounded-full",
                    "bg-white text-black font-medium text-sm",
                    "hover:bg-gray-200 transition-colors"
                  )}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Call Now: 1300 420 911
                </motion.a>
                
                <motion.a
                  href="#book"
                  className={cn(
                    "flex items-center justify-center gap-2 px-6 py-3 rounded-full",
                    "bg-gradient-to-r from-[#00E6CA] to-[#00A2FF] text-black font-medium text-sm",
                    "hover:from-[#00A2FF] hover:to-[#00E6CA] transition-all"
                  )}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.preventDefault();
                    const bookingForm = document.getElementById('book');
                    if (bookingForm) {
                      bookingForm.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  Book Online
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      
      {/* Background image with blur effect */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/plumbing-bg-mobile.jpg"
          alt="Background"
          fill
          priority
          className="object-cover opacity-30 blur-sm"
          draggable="false"
        />
      </div>
    </section>
  );
} 