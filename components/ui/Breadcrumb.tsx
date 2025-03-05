'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbProps {
  className?: string;
}

export function Breadcrumb({ className = '' }: BreadcrumbProps) {
  const pathname = usePathname();
  
  // Skip rendering breadcrumbs on homepage
  if (pathname === '/') return null;
  
  // Create breadcrumb segments
  const segments = pathname.split('/').filter(Boolean);
  
  // Format segment names for display (convert kebab-case to Title Case)
  const formatSegmentName = (segment: string) => {
    return segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  
  return (
    <nav aria-label="Breadcrumb" className={`py-4 px-4 md:px-8 text-sm ${className}`}>
      <ol className="flex flex-wrap items-center gap-2">
        <li className="flex items-center">
          <Link 
            href="/" 
            className="text-gray-400 hover:text-[#00E6CA] transition-colors flex items-center"
          >
            <Home className="w-4 h-4 mr-1" />
            <span className="hidden sm:inline">Home</span>
          </Link>
        </li>
        
        {segments.map((segment, index) => {
          // Build the href for this segment
          const href = `/${segments.slice(0, index + 1).join('/')}`;
          const isLast = index === segments.length - 1;
          
          return (
            <li key={segment} className="flex items-center">
              <ChevronRight className="w-3 h-3 text-gray-500 mx-1" />
              {isLast ? (
                <span className="text-[#00E6CA] font-medium">
                  {formatSegmentName(segment)}
                </span>
              ) : (
                <Link 
                  href={href}
                  className="text-gray-400 hover:text-[#00E6CA] transition-colors"
                >
                  {formatSegmentName(segment)}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
} 