# Preventing Hydration Mismatches and Module Not Found Errors

This document provides guidance on how to prevent common Next.js issues like hydration mismatches and module not found errors.

## Hydration Mismatches

Hydration mismatches occur when the server-rendered HTML doesn't match what React tries to render on the client side. This can happen for several reasons:

1. Components that use client-side state management
2. Components that fetch data after mounting
3. Components that render different content based on client-side conditions (like window size)
4. Components that use browser-only APIs (like localStorage)

### Solution: Use the ClientOnly Component

We've created a reusable `ClientOnly` component that ensures its children are only rendered on the client side:

```tsx
import { ClientOnly } from '@/components/ui/ClientOnly';

function MyComponent() {
  // Component with client-side logic
  return <div>Client-side content</div>;
}

// Usage with a placeholder
export function MyComponentWrapper() {
  return (
    <ClientOnly fallback={<div>Loading...</div>}>
      <MyComponent />
    </ClientOnly>
  );
}
```

### Best Practices for Preventing Hydration Mismatches

1. **Use the ClientOnly component** for any component that:
   - Uses hooks like `useState`, `useEffect`
   - Fetches data client-side
   - Uses browser APIs
   - Renders different content based on client-side conditions

2. **Provide a placeholder** that matches the structure of the actual content to prevent layout shifts.

3. **Avoid opacity: 0 animations** - Use `opacity: 0.01` instead to avoid Lighthouse LCP detection issues.

4. **Set explicit minimum heights** on containers to help Lighthouse identify potential LCP candidates.

5. **Use `requestAnimationFrame`** for smoother mounting and to ensure the browser has painted.

## Module Not Found Errors

Module not found errors can occur when the Next.js build cache becomes corrupted or when dependencies are not properly installed.

### Solution: Use the Clean Start Script

We've created a script to clean the Next.js cache and restart the development server:

```bash
npm run clean-dev
```

This script:
1. Removes the `.next` directory
2. Clears the Node.js module cache
3. Cleans the npm cache
4. Restarts the development server

### When to Use the Clean Start Script

Use the clean start script when:

1. You encounter "Cannot find module" errors
2. You see hydration mismatches that persist after code changes
3. You've installed new dependencies
4. You've switched branches or pulled new code
5. You're experiencing unexplained build or runtime errors

## Lighthouse LCP Detection Issues

If Lighthouse reports a "NO_LCP" error, it means it couldn't identify the Largest Contentful Paint element. This can happen when:

1. The largest element animates from opacity: 0
2. Content loads too slowly or is delayed by animations
3. Elements don't have explicit dimensions

### Solution: LCP-Friendly Animations

1. **Use non-zero opacity values** - Always use `opacity: 0.01` instead of `opacity: 0` for initial animation states.

2. **Set explicit minimum heights** - Add `style={{ minHeight: '200px' }}` to potential LCP elements.

3. **Reduce animation delays** - Keep animation delays under 100ms for important content.

4. **Use `priority` and `fetchPriority="high"`** on important images.

5. **Ensure fast initial loading** - Minimize the delay before content appears.

## Additional Resources

- [Next.js Hydration Documentation](https://nextjs.org/docs/messages/react-hydration-error)
- [Web.dev LCP Guide](https://web.dev/articles/lcp)
- [Lighthouse Documentation](https://developer.chrome.com/docs/lighthouse/performance/) 