# Website Performance Optimization Guide

This document provides a comprehensive overview of the performance optimization strategies implemented in this project, with a focus on improving Core Web Vitals, particularly Largest Contentful Paint (LCP).

## Table of Contents

1. [Introduction](#introduction)
2. [Optimization Scripts](#optimization-scripts)
3. [Core Web Vitals Optimization](#core-web-vitals-optimization)
4. [Image Optimization](#image-optimization)
5. [JavaScript Optimization](#javascript-optimization)
6. [CSS Optimization](#css-optimization)
7. [Font Optimization](#font-optimization)
8. [Next.js Configuration Optimization](#nextjs-configuration-optimization)
9. [Critical Rendering Path Optimization](#critical-rendering-path-optimization)
10. [Monitoring and Measuring Performance](#monitoring-and-measuring-performance)
11. [Troubleshooting](#troubleshooting)

## Introduction

Website performance is crucial for user experience, SEO, and conversion rates. This project includes a suite of optimization tools designed to improve your website's performance metrics, with a particular focus on Core Web Vitals.

## Optimization Scripts

We've created several optimization scripts to automate the performance improvement process:

### Master Optimization Script

Run all optimizations with a single command:

```bash
node scripts/optimize-all.js
```

This interactive script allows you to choose which optimizations to run or run them all at once.

### Individual Optimization Scripts

Each script focuses on a specific aspect of performance optimization:

1. **Image Optimization**: `node scripts/optimize-images.js`
   - Compresses and optimizes images
   - Converts images to modern formats (WebP)
   - Creates responsive image sizes
   - Generates low-quality image placeholders (LQIP)

2. **Next.js Configuration**: `node scripts/optimize-nextjs-config.js`
   - Enhances Next.js configuration for better performance
   - Enables image optimization
   - Configures compiler options
   - Sets up experimental features for better performance

3. **CSS Optimization**: `node scripts/optimize-css.js`
   - Removes unused CSS
   - Analyzes and reports on CSS usage
   - Provides recommendations for CSS improvements

4. **Font Optimization**: `node scripts/optimize-fonts.js`
   - Improves font loading strategies
   - Adds font-display: swap
   - Creates a FontPreload component
   - Updates layout files to include optimized font loading

5. **Critical Path Optimization**: `node scripts/optimize-critical-path.js`
   - Extracts and inlines critical CSS
   - Creates components for critical CSS management
   - Improves above-the-fold rendering

6. **Framer Motion Optimization**: `node scripts/apply-motion-optimizations.js`
   - Optimizes framer-motion imports
   - Implements lazy loading for animations
   - Reduces initial JavaScript bundle size

## Core Web Vitals Optimization

### Largest Contentful Paint (LCP)

LCP measures the time it takes for the largest content element to become visible. Optimizations include:

- Image optimization and proper sizing
- Font optimization with preloading
- Critical CSS extraction and inlining
- Lazy loading of non-critical components
- Removal of render-blocking resources

### First Input Delay (FID)

FID measures the time from when a user first interacts with your site to when the browser can respond. Optimizations include:

- JavaScript optimization and code splitting
- Deferred loading of non-critical JavaScript
- Reduced JavaScript execution time
- Optimized event handlers

### Cumulative Layout Shift (CLS)

CLS measures visual stability. Optimizations include:

- Pre-defined image dimensions
- Font display: swap implementation
- Stable layout with proper placeholders
- Avoiding dynamic content insertion above existing content

## Image Optimization

Images often account for the largest portion of page weight. Our optimizations include:

- **Compression**: Reducing file size while maintaining visual quality
- **Format Conversion**: Using WebP for modern browsers
- **Responsive Images**: Serving appropriately sized images for different devices
- **Lazy Loading**: Loading images only when they enter the viewport
- **LQIP**: Using low-quality image placeholders for faster perceived loading

## JavaScript Optimization

JavaScript can significantly impact performance. Our optimizations include:

- **Code Splitting**: Breaking down large bundles into smaller chunks
- **Dynamic Imports**: Loading JavaScript only when needed
- **Tree Shaking**: Removing unused code
- **Lazy Loading Components**: Loading components only when required
- **Optimized Libraries**: Special handling for large libraries like framer-motion

## CSS Optimization

CSS optimization is crucial for rendering performance. Our optimizations include:

- **Unused CSS Removal**: Eliminating unused styles
- **Critical CSS Extraction**: Inlining critical styles for faster rendering
- **CSS Minification**: Reducing file size
- **Efficient Selectors**: Using performant CSS selectors
- **Reduced CSS Variables**: Optimizing CSS variable usage

## Font Optimization

Fonts can significantly impact LCP. Our optimizations include:

- **Font Display Swap**: Ensuring text remains visible during font loading
- **Font Preloading**: Prioritizing critical fonts
- **Self-hosting**: Reducing third-party requests
- **Font Subsetting**: Including only necessary character sets
- **Variable Fonts**: Using variable fonts where appropriate

## Next.js Configuration Optimization

Next.js provides several performance optimization features. Our optimizations include:

- **Image Optimization**: Configuring the Next.js Image component
- **Script Optimization**: Properly loading third-party scripts
- **Compiler Options**: Optimizing the build process
- **Experimental Features**: Enabling performance-enhancing experimental features
- **Bundle Analysis**: Setting up tools to analyze bundle size

## Critical Rendering Path Optimization

The critical rendering path affects how quickly content is displayed. Our optimizations include:

- **Critical CSS**: Extracting and inlining critical styles
- **Resource Prioritization**: Using preload, prefetch, and preconnect
- **Reduced Render-Blocking Resources**: Deferring non-critical resources
- **Server-Side Rendering**: Leveraging SSR for faster initial render
- **HTML Optimization**: Minimizing HTML size and complexity

## Monitoring and Measuring Performance

To track the effectiveness of these optimizations, we recommend:

- **Lighthouse**: Run regular Lighthouse audits
- **PageSpeed Insights**: Check performance on mobile and desktop
- **Web Vitals**: Monitor Core Web Vitals in the field
- **Chrome DevTools**: Use the Performance and Network tabs
- **Real User Monitoring (RUM)**: Implement RUM to track actual user experiences

## Recent Updates and Fixes

We've made several improvements to the optimization scripts to ensure they work correctly:

1. **Node.js Version Update**:
   - Updated from Node.js v18.20.5 to v20.18.3 (LTS)
   - Added `.nvmrc` file to specify the required Node.js version
   - Resolved compatibility warnings with packages requiring Node.js v20+
   - See `OPTIMIZATION-FIXES.md` for detailed information

2. **Critical Path Optimization Script Fixes**:
   - Fixed ES Module import issues with the `critical` module
   - Improved dependency checking and error handling
   - Enhanced configuration for better compatibility
   - See `OPTIMIZATION-FIXES.md` for detailed changes

3. **Node.js Version Compatibility Fixes**:
   - Added version checking to handle Node.js v18 compatibility
   - Suppressed warnings for packages requiring Node.js v20+
   - Ensured scripts can run despite version mismatches

4. **Framer-Motion Optimization Improvements**:
   - Enhanced pattern matching for better component detection
   - Added backup file creation for safer changes
   - Improved error handling and reporting

5. **Backup File Management**:
   - Added a new script `scripts/cleanup-backups.js` to manage backup files
   - Provides options to remove, restore, or selectively manage backups
   - Integrated with the master optimization tool

For a complete list of changes, please refer to the `OPTIMIZATION-FIXES.md` file.

## Troubleshooting

If you encounter issues after applying optimizations:

1. **Check Browser Console**: Look for errors or warnings
2. **Restore Backups**: Each optimization script creates backups (.bak files)
3. **Incremental Testing**: Apply optimizations one at a time to identify issues
4. **Browser Compatibility**: Test in multiple browsers
5. **Clear Cache**: Ensure you're testing with a fresh cache

For specific issues, refer to the individual optimization guides:
- `FONT-OPTIMIZATION.md`
- `CRITICAL-CSS-GUIDE.md`

---

By implementing these optimizations, your website should see significant improvements in loading speed, interactivity, and visual stability, leading to better user experience and potentially higher conversion rates. 

node scripts/cleanup-backups.js 