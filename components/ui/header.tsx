'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
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
      setIsScrolled(currentScroll > 0);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const LogoButton = () => {
    const containerVariants = {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: {
          staggerChildren: 0.2,
          delayChildren: 0.1
        }
      }
    };
    
    const itemVariants = {
      hidden: { opacity: 0, y: 20, scale: 0.8 },
      visible: { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        transition: {
          type: "spring",
          stiffness: 260,
          damping: 20
        }
      }
    };

    if (isHomePage) {
      return (
        <motion.button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3"
          aria-label="Return to top"
          style={{ touchAction: 'pan-x pan-y' }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div className="relative w-12 h-12 md:w-16 md:h-16" variants={itemVariants}>
            <Image
              src="/images/icon-logo.png"
              alt="Return to top"
              fill
              sizes="(max-width: 768px) 48px, 64px"
              className="object-contain"
              priority
              draggable="false"
            />
          </motion.div>
          <motion.div className="relative h-8 w-[160px] md:h-10 md:w-[200px]" variants={itemVariants}>
            <Image
              src="/images/text-logo.png"
              alt="Company Name"
              fill
              sizes="(max-width: 768px) 160px, 200px"
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
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Link 
          href="/"
          className="flex items-center gap-3"
          aria-label="Return to homepage"
          style={{ touchAction: 'pan-x pan-y' }}
        >
          <motion.div className="relative w-12 h-12 md:w-16 md:h-16" variants={itemVariants}>
            <Image
              src="/images/icon-logo.png"
              alt="Return to homepage"
              fill
              sizes="(max-width: 768px) 48px, 64px"
              className="object-contain"
              priority
              draggable="false"
            />
          </motion.div>
          <motion.div className="relative h-8 w-[160px] md:h-10 md:w-[200px]" variants={itemVariants}>
            <Image
              src="/images/text-logo.png"
              alt="Company Name"
              fill
              sizes="(max-width: 768px) 160px, 200px"
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
        "relative w-full",
        // Background and transition
        "transition-all duration-300 ease-in-out",
        isScrolled ? 'bg-black backdrop-blur-sm' : 'bg-transparent',
        // Hide on mobile
        "hidden md:block"
      )}
      style={{ touchAction: 'pan-x pan-y' }}
    >
      <div className="container mx-auto px-4">
        <AnimatePresence>
          {isVisible && (
            <motion.div 
              className="flex items-center justify-between h-24"
              initial={{ opacity: 0, y: -50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 20,
                duration: 1.2
              }}
            >
              {/* Logo Section */}
              <LogoButton />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
