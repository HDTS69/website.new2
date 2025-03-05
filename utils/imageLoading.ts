/**
 * Utility functions for managing image loading behavior across the site
 */

/**
 * Image priority levels
 */
export enum ImagePriority {
  HIGH = 'high',
  LOW = 'low',
}

/**
 * Returns the appropriate loading props for an image based on its priority level
 * @param priority The priority level of the image (HIGH for hero/header, LOW for everything else)
 * @returns Object with loading, priority, fetchPriority, and quality props
 */
export function getImageLoadingProps(priority: ImagePriority = ImagePriority.LOW) {
  const isHighPriority = priority === ImagePriority.HIGH;
  
  return {
    loading: isHighPriority ? 'eager' as const : 'lazy' as const,
    priority: isHighPriority,
    fetchPriority: isHighPriority ? 'high' as const : 'auto' as const,
    quality: isHighPriority ? 90 : 75,
  };
}

/**
 * Constants for common image sizes to use with the Next.js Image component
 */
export const IMAGE_SIZES = {
  // Full width images
  FULL_WIDTH: '100vw',
  // Hero images
  HERO: '(max-width: 768px) 100vw, 45vw',
  // Card images
  CARD: '(max-width: 768px) 100vw, 50vw',
  // Thumbnail images
  THUMBNAIL: '(max-width: 768px) 33vw, 25vw',
}; 