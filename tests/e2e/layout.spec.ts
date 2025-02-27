import { test, expect } from '@playwright/test';

// Add this type declaration at the top of the file
declare global {
  interface Window {
    AOS: any;
  }
}

test.describe('Layout Components', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should show loading screen on initial load @smoke', async ({ page }) => {
    // Navigate to trigger loading screen
    await page.goto('/');
    
    // Check loading screen visibility
    const loadingScreen = page.locator('.wheel-and-hamster');
    await expect(loadingScreen).toBeVisible();
    
    // Check hamster wheel animation elements
    await expect(page.locator('.wheel')).toBeVisible();
    await expect(page.locator('.hamster')).toBeVisible();
    await expect(page.locator('.spoke')).toBeVisible();
    
    // Verify loading screen disappears
    await expect(loadingScreen).toBeHidden({ timeout: 3000 });
  });

  test('should show loading screen on route changes @smoke', async ({ page }) => {
    // Initial load
    await page.goto('/');
    await page.waitForTimeout(1000); // Wait for initial load to complete
    
    // Trigger route change
    await page.evaluate(() => {
      window.history.pushState({}, '', '/test-route');
    });
    
    // Check loading screen appears
    const loadingScreen = page.locator('.wheel-and-hamster');
    await expect(loadingScreen).toBeVisible();
    
    // Verify it disappears after animation
    await expect(loadingScreen).toBeHidden({ timeout: 1000 });
  });

  test('should maintain proper z-index layering @visual', async ({ page }) => {
    await page.goto('/');
    
    // Check z-index hierarchy
    const header = page.locator('header');
    const main = page.locator('main');
    const footer = page.locator('footer');
    const loadingScreen = page.locator('.wheel-and-hamster').first();
    
    // Loading screen should be on top when visible
    await expect(loadingScreen).toHaveCSS('z-index', '50');
    
    // Wait for loading to complete
    await page.waitForTimeout(1000);
    
    // Check header is above main content
    await expect(header).toHaveCSS('z-index', '50');
    
    // Verify footer is present
    await expect(footer).toBeVisible();
  });

  test('should initialize AOS animations @visual', async ({ page }) => {
    await page.goto('/');
    
    // Wait for AOS to initialize
    await page.waitForFunction(() => {
      return window.AOS !== undefined;
    });
    
    // Check if AOS attributes are present
    const elements = await page.locator('[data-aos]').count();
    expect(elements).toBeGreaterThan(0);
  });

  test('should handle window resize events @visual', async ({ page }) => {
    // Test desktop view
    await page.setViewportSize({ width: 1920, height: 1080 });
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
    
    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
  });
}); 