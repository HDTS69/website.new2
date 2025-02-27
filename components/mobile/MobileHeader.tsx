'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export default function MobileHeader() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  useEffect(() => {
    // Set header visible immediately for entrance animation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setIsScrolled(currentScroll > 0);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        duration: 0.8,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };

  const LogoButton = () => {
    if (isHomePage) {
      return (
        <motion.button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2"
          aria-label="Return to top"
          style={{ touchAction: 'pan-x pan-y' }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div 
            className="relative w-12 h-12"
            variants={logoVariants}
          >
            <Image
              src="/images/icon-logo.png"
              alt="Return to top"
              fill
              sizes="48px"
              className="object-contain"
              priority
              draggable="false"
            />
          </motion.div>
          <motion.div 
            className="relative h-10 w-[160px]"
            variants={logoVariants}
          >
            <Image
              src="/images/text-logo.png"
              alt="Company Name"
              fill
              sizes="160px"
              className="object-contain"
              priority
              draggable="false"
            />
          </motion.div>
        </motion.button>
      );
    }

    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link 
          href="/"
          className="flex items-center gap-2"
          aria-label="Return to homepage"
          style={{ touchAction: 'pan-x pan-y' }}
        >
          <motion.div 
            className="relative w-12 h-12"
            variants={logoVariants}
          >
            <Image
              src="/images/icon-logo.png"
              alt="Return to homepage"
              fill
              sizes="48px"
              className="object-contain"
              priority
              draggable="false"
            />
          </motion.div>
          <motion.div 
            className="relative h-10 w-[160px]"
            variants={logoVariants}
          >
            <Image
              src="/images/text-logo.png"
              alt="Company Name"
              fill
              sizes="160px"
              className="object-contain"
              priority
              draggable="false"
            />
          </motion.div>
        </Link>
      </motion.div>
    );
  };

  return (
    <header 
      className={cn(
        // Base styles
        "fixed top-0 left-0 right-0 w-full z-50",
        // Background and transition
        "transition-all duration-300 ease-in-out",
        isScrolled ? 'bg-black/90 backdrop-blur-sm' : 'bg-transparent',
        // Show only on mobile
        "block md:hidden"
      )}
      style={{ touchAction: 'pan-x pan-y' }}
    >
      <AnimatePresence>
        {isVisible && (
          <motion.div 
            className="container mx-auto px-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="flex items-center justify-between h-16">
              {/* Logo Section */}
              <LogoButton />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
} 