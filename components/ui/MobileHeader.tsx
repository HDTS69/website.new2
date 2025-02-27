'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function MobileHeader() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      // Update background opacity
      setIsScrolled(currentScroll > 20);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const LogoButton = () => {
    const buttonContent = (
      <div className="flex items-center w-full">
        {/* Icon logo aligned to the left */}
        <div className="relative w-10 h-10 flex-shrink-0">
          <Image
            src="/images/icon-logo.png"
            alt={isHomePage ? "Return to top" : "Return to homepage"}
            fill
            sizes="40px"
            className="object-contain"
            priority
          />
        </div>
        
        {/* Text logo centered */}
        <div className="flex-grow flex justify-center">
          <div className="relative h-8 w-[140px]">
            <Image
              src="/images/text logo.png"
              alt="HD Trade Services"
              fill
              sizes="140px"
              className="object-contain"
              priority
            />
          </div>
        </div>
        
        {/* Empty div to balance the layout */}
        <div className="w-10 h-10 flex-shrink-0"></div>
      </div>
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
    <header 
      className={cn(
        // Base styles
        "fixed top-0 left-0 right-0 w-full z-50",
        // Background and transition
        "transition-all duration-300 ease-in-out",
        isScrolled ? 'bg-black/90 backdrop-blur-sm shadow-md' : 'bg-transparent',
        // Show only on mobile
        "block md:hidden"
      )}
    >
      <div className="px-4 py-3">
        <LogoButton />
      </div>
    </header>
  );
} 