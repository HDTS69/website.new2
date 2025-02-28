# Font Optimization Guide

## Best Practices for Font Loading

### 1. Use `next/font` for Next.js Applications

Next.js provides built-in font optimization through the `next/font` module:

```jsx
import { Inter } from 'next/font/google';

// Configure the font
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
});

// Use in your component
function MyComponent() {
  return (
    <div className={inter.className}>
      This text uses the Inter font
    </div>
  );
}
```

### 2. Use Font Display Swap

Always use `font-display: swap` to ensure text remains visible during font loading:

```css
@font-face {
  font-family: 'CustomFont';
  src: url('/fonts/custom-font.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap; /* Critical for performance */
}
```

### 3. Preload Critical Fonts

Add preload links for critical fonts in your document head:

```html
<link 
  rel="preload" 
  href="/fonts/critical-font.woff2" 
  as="font" 
  type="font/woff2" 
  crossorigin="anonymous" 
/>
```

### 4. Use the FontPreload Component

Import and use the `FontPreload` component in your app's layout or document:

```jsx
import FontPreload from '../components/FontPreload';

export default function Layout({ children }) {
  return (
    <html lang="en">
      <head>
        <FontPreload />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

### 5. Optimize Google Fonts

When using Google Fonts, add preconnect links:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet" />
```

### 6. Self-host Fonts When Possible

Self-hosting fonts eliminates third-party requests:

1. Download the font files (woff2 format is preferred)
2. Place them in your public directory
3. Create @font-face declarations in your CSS
4. Use the font in your styles

### 7. Subset Fonts

Only include the character sets you need:

```jsx
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'], // Only include Latin characters
  weight: ['400', '700'], // Only include regular and bold weights
});
```

### 8. Use Variable Fonts

Variable fonts can reduce the number of font files needed:

```css
@font-face {
  font-family: 'CustomVariable';
  src: url('/fonts/custom-variable.woff2') format('woff2-variations');
  font-weight: 100 900; /* Supports all weights between 100 and 900 */
  font-style: normal;
  font-display: swap;
}
```

### 9. Implement Font Loading Strategies

Consider using the Font Loading API for more control:

```js
// Font loading with fallback
const fontFaceSet = document.fonts;
const font = new FontFace('CustomFont', 'url(/fonts/custom.woff2)', {
  display: 'swap',
  weight: '400',
});

font.load().then(() => {
  fontFaceSet.add(font);
  document.documentElement.classList.add('font-loaded');
}).catch(err => {
  console.error('Font loading failed:', err);
});
```

### 10. Monitor Font Performance

Use Lighthouse and WebPageTest to monitor font loading performance.
