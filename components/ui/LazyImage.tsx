"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface LazyImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  onLoad?: () => void;
}

/**
 * LazyImage component for optimized image loading
 * 
 * Features:
 * - Uses Next.js Image component for optimization
 * - Supports blur-up loading effect
 * - Implements proper lazy loading
 * - Handles loading states with fade-in animation
 */
export function LazyImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  quality = 85,
  placeholder = 'empty',
  blurDataURL,
  onLoad,
  ...props
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  // Generate placeholder if not provided
  const placeholderUrl = blurDataURL || 
    (src && src.startsWith('/') ? `${src.split('.')[0]}-placeholder.webp` : undefined);

  // Handle image load
  const handleImageLoad = () => {
    setIsLoaded(true);
    if (onLoad) onLoad();
  };

  // Handle image error
  const handleImageError = () => {
    setError(true);
    console.error(`Failed to load image: ${src}`);
  };

  return (
    <div 
      className={cn(
        "relative overflow-hidden",
        className
      )}
      style={{ aspectRatio: `${width}/${height}` }}
    >
      {/* Main image */}
      <Image
        src={error ? '/images/placeholder.webp' : src}
        alt={alt}
        width={width}
        height={height}
        quality={quality}
        priority={priority}
        sizes={sizes}
        loading={priority ? 'eager' : 'lazy'}
        placeholder={placeholder}
        blurDataURL={placeholderUrl}
        onLoad={handleImageLoad}
        onError={handleImageError}
        className={cn(
          "object-cover transition-opacity duration-500",
          isLoaded ? "opacity-100" : "opacity-0"
        )}
        {...props}
      />

      {/* Loading indicator */}
      {!isLoaded && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 dark:border-gray-600 border-t-primary"></div>
        </div>
      )}

      {/* Error fallback */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <span className="text-sm text-gray-500 dark:text-gray-400">Image not available</span>
        </div>
      )}
    </div>
  );
} 