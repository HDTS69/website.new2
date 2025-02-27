'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      // Update background opacity
      setIsScrolled(currentScroll > 0);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const LogoButton = () => {
    if (isHomePage) {
      return (
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3"
          aria-label="Return to top"
        >
          <div className="relative w-12 h-12 md:w-16 md:h-16">
            <Image
              src="/images/icon-logo.png"
              alt="Return to top"
              fill
              sizes="(max-width: 768px) 48px, 64px"
              className="object-contain"
              priority
            />
          </div>
          <div className="relative h-8 w-[160px] md:h-10 md:w-[200px]">
            <Image
              src="/images/text-logo.png"
              alt="Company Name"
              fill
              sizes="(max-width: 768px) 160px, 200px"
              className="object-contain"
              priority
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
      >
        <div className="relative w-12 h-12 md:w-16 md:h-16">
          <Image
            src="/images/icon-logo.png"
            alt="Return to homepage"
            fill
            sizes="(max-width: 768px) 48px, 64px"
            className="object-contain"
            priority
          />
        </div>
        <div className="relative h-8 w-[160px] md:h-10 md:w-[200px]">
          <Image
            src="/images/text-logo.png"
            alt="Company Name"
            fill
            sizes="(max-width: 768px) 160px, 200px"
            className="object-contain"
            priority
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
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-24">
          {/* Logo Section */}
          <LogoButton />
        </div>
      </div>
    </header>
  );
}
