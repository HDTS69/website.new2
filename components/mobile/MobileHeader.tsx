'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export function MobileHeader() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  useEffect(() => {
    // Set header visible after a short delay for entrance animation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      // Update background opacity
      setIsScrolled(currentScroll > 20);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const LogoButton = () => {
    const buttonContent = (
      <motion.div 
        className="flex items-center w-full"
        initial={{ opacity: 0, y: -20 }}
        animate={{ 
          opacity: isVisible ? 1 : 0, 
          y: isVisible ? 0 : -20,
          transition: {
            duration: 0.5,
            ease: "easeOut"
          }
        }}
      >
        {/* Icon logo aligned to the left - increased size */}
        <motion.div 
          className="relative w-12 h-12 flex-shrink-0"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Image
            src="/images/icon-logo.png"
            alt={isHomePage ? "Return to top" : "Return to homepage"}
            fill
            sizes="48px"
            className="object-contain"
            priority
            draggable="false"
          />
        </motion.div>
        
        {/* Text logo centered - increased size */}
        <motion.div 
          className="flex-grow flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: isVisible ? 1 : 0,
            transition: { delay: 0.2, duration: 0.5 }
          }}
        >
          <div className="relative h-10 w-[180px]">
            <Image
              src="/images/text-logo.png"
              alt="HD Trade Services"
              fill
              sizes="180px"
              className="object-contain"
              priority
              draggable="false"
            />
          </div>
        </motion.div>
        
        {/* Empty div to balance the layout - increased size to match icon logo */}
        <div className="w-12 h-12 flex-shrink-0"></div>
      </motion.div>
    );

    if (isHomePage) {
      return (
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-full"
          aria-label="Return to top"
        >
          {buttonContent}
        </button>
      );
    }

    return (
      <Link 
        href="/"
        className="w-full"
        aria-label="Return to homepage"
      >
        {buttonContent}
      </Link>
    );
  };

  return (
    <motion.header 
      className={cn(
        // Base styles
        "fixed top-0 left-0 right-0 w-full z-50",
        // Background and transition
        "transition-all duration-300 ease-in-out",
        isScrolled ? 'bg-black/90 backdrop-blur-sm shadow-md' : 'bg-transparent',
        // Show only on mobile
        "block md:hidden"
      )}
      initial={{ opacity: 0, y: -100 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        y: isVisible ? 0 : -100,
        transition: {
          type: "spring",
          stiffness: 100,
          damping: 15,
          delay: 0.1
        }
      }}
    >
      <div className="px-4 py-3">
        <LogoButton />
      </div>
    </motion.header>
  );
} 