# Critical CSS Optimization Guide

## What is Critical CSS?

Critical CSS is the minimal CSS required to render the visible portion of a webpage (above the fold content). By inlining this CSS in the `<head>` of your HTML, you can significantly improve the Largest Contentful Paint (LCP) metric and overall page load performance.

## How to Use the Critical CSS Components

### Basic Usage

The `CriticalCSS` component inlines the critical CSS for a specific page:

```jsx
import { CriticalCSS } from '../components/CriticalCSS';
import criticalCssData from '../lib/criticalCssData';

// In your layout component
<head>
  <CriticalCSS css={criticalCssData["/"]} isMobile={false} />
</head>
```

### Dynamic Usage Based on Page

The `PageCriticalCSS` component automatically selects the appropriate critical CSS based on the current route:

```jsx
import { PageCriticalCSS } from '../components/PageCriticalCSS';

// In your layout component
<head>
  <PageCriticalCSS />
</head>
```

### Responsive Critical CSS

The `CriticalCSSWithViewportDetection` component loads the appropriate CSS based on the viewport size:

```jsx
import { CriticalCSSWithViewportDetection } from '../components/CriticalCSS';
import criticalCssData from '../lib/criticalCssData';

// In your layout component
<head>
  <CriticalCSSWithViewportDetection css={criticalCssData["/"]} />
</head>
```

## Regenerating Critical CSS

When you make significant changes to your site's design, you should regenerate the critical CSS:

1. Start your development server: `npm run dev`
2. Run the critical CSS script: `node scripts/optimize-critical-path.js`

## Best Practices

1. **Keep Critical CSS Small**: Aim for less than 14KB of critical CSS to fit within the initial TCP window.

2. **Focus on Above-the-Fold Content**: Only include styles for content visible without scrolling.

3. **Defer Non-Critical CSS**: Load non-critical CSS asynchronously:

   ```html
   <link rel="preload" href="/styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
   <noscript><link rel="stylesheet" href="/styles.css"></noscript>
   ```

4. **Update Regularly**: Regenerate critical CSS when making significant UI changes.

5. **Test on Multiple Devices**: Ensure your critical CSS works well across different screen sizes.

6. **Monitor Performance**: Use Lighthouse and WebPageTest to verify improvements.

## Troubleshooting

- **Flash of Unstyled Content (FOUC)**: If you see a FOUC, your critical CSS might be missing important styles. Review and regenerate.

- **Oversized Critical CSS**: If your critical CSS is too large, focus on reducing it by:
  - Removing unused styles
  - Focusing only on above-the-fold content
  - Simplifying your above-the-fold design

- **Layout Shifts**: If you experience layout shifts after the full CSS loads, ensure your critical CSS includes proper sizing for all above-the-fold elements.
