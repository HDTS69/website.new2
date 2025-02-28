/**
 * Utility functions for managing image loading behavior across the site
 */

/**
 * Returns the appropriate loading props for an image based on its position on the page
 * @param isAboveFold Whether the image is above the fold (visible on initial page load)
 * @returns Object with loading, priority, and fetchPriority props
 */
export function getImageLoadingProps(isAboveFold: boolean) {
  return {
    loading: isAboveFold ? 'eager' as const : 'lazy' as const,
    priority: isAboveFold,
    fetchPriority: isAboveFold ? 'high' as 'high' : 'auto' as 'auto',
  };
}

/**
 * Constants for common image sizes to use with the Next.js Image component
 */
export const IMAGE_SIZES = {
  // Full width images
  FULL_WIDTH: '100vw',
  // Hero images
  HERO: '45vw',
  // Card images
  CARD: '(max-width: 768px) 100vw, 50vw',
  // Thumbnail images
  THUMBNAIL: '(max-width: 768px) 33vw, 25vw',
}; 