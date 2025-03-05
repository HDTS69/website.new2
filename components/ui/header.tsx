'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { getImageLoadingProps, IMAGE_SIZES, ImagePriority } from '@/utils/imageLoading';
import { OpenNowIndicator } from './OpenNowIndicator';

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
    if (isHomePage) {
      return (
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3"
          aria-label="Return to top"
          style={{ touchAction: 'pan-x pan-y' }}
        >
          <div className="relative w-12 h-12 md:w-16 md:h-16">
            <Image
              src="/images/icon-logo.webp"
              alt="Return to top"
              fill
              sizes={IMAGE_SIZES.THUMBNAIL}
              className="object-contain"
              {...getImageLoadingProps(ImagePriority.HIGH)}
              draggable="false"
            />
          </div>
          <div className="relative h-8 w-[160px] md:h-10 md:w-[200px]">
            <Image
              src="/images/text-logo.webp"
              alt="Company Name"
              fill
              sizes={IMAGE_SIZES.THUMBNAIL}
              className="object-contain"
              {...getImageLoadingProps(ImagePriority.HIGH)}
              draggable="false"
            />
          </div>
        </button>
      );
    }

    return (
      <Link 
        href="/"
        className="flex items-center gap-3"
        aria-label="Return to homepage"
        style={{ touchAction: 'pan-x pan-y' }}
      >
        <div className="relative w-12 h-12 md:w-16 md:h-16">
          <Image
            src="/images/icon-logo.webp"
            alt="Return to homepage"
            fill
            sizes={IMAGE_SIZES.THUMBNAIL}
            className="object-contain"
            {...getImageLoadingProps(ImagePriority.HIGH)}
            draggable="false"
          />
        </div>
        <div className="relative h-8 w-[160px] md:h-10 md:w-[200px]">
          <Image
            src="/images/text-logo.webp"
            alt="Company Name"
            fill
            sizes={IMAGE_SIZES.THUMBNAIL}
            className="object-contain"
            {...getImageLoadingProps(ImagePriority.HIGH)}
            draggable="false"
          />
        </div>
      </Link>
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
        {isVisible ? (
          <motion.div 
            className="flex items-center justify-between h-24"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              duration: 0.8
            }}
          >
            {/* Logo Section */}
            <LogoButton />
            
            {/* Open Now Indicator */}
            <OpenNowIndicator className="ml-auto" />
          </motion.div>
        ) : (
          <div className="h-24 opacity-0"></div>
        )}
      </div>
    </header>
  );
}
