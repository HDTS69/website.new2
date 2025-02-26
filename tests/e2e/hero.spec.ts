import { test, expect } from '@playwright/test';

test.describe('Hero Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display main heading with correct text and animations @smoke', async ({ page }) => {
    // Check main heading text
    const heading = page.getByRole('heading', { level: 1 });
    await expect(heading).toBeVisible();
    
    // Check each line of text
    const brisbaneText = heading.getByText('Brisbane');
    const emergencyText = heading.getByText('24/7 Emergency Repairs');
    const installationsText = heading.getByText('& Installations');
    
    await expect(brisbaneText).toBeVisible();
    await expect(emergencyText).toBeVisible();
    await expect(installationsText).toBeVisible();
    
    // Verify animation classes
    await expect(brisbaneText).toHaveClass(/animate-fade-in-up/);
    await expect(emergencyText).toHaveClass(/animate-fade-in-up/);
    await expect(installationsText).toHaveClass(/animate-fade-in-up/);
  });

  test('should display subheading with service description and animations @smoke', async ({ page }) => {
    const description = page.getByText('Professional plumbing, gas, roofing & air conditioning services.');
    const subDescription = page.getByText('Fast response. Fair pricing. Guaranteed satisfaction.');
    
    await expect(description).toBeVisible();
    await expect(subDescription).toBeVisible();
    
    // Verify animation classes
    const descriptionContainer = page.locator('p.text-lg');
    await expect(descriptionContainer).toHaveClass(/animate-fade-in-up/);
    await expect(descriptionContainer).toHaveClass(/animation-delay-1000/);
  });

  test('should have a functional Book Online button with animations @smoke', async ({ page }) => {
    const bookButton = page.getByRole('link', { name: 'Book Online' });
    await expect(bookButton).toBeVisible();
    await expect(bookButton).toHaveAttribute('href', '#book');
    
    // Check button container animations
    const buttonContainer = page.locator('div.animate-scale-up');
    await expect(buttonContainer).toHaveClass(/animation-delay-1100/);
    
    // Check button styling
    await expect(bookButton).toHaveClass(/bg-gradient-to-r/);
    await expect(bookButton).toHaveClass(/shadow-lg/);
  });

  test('should have sparkles animation with correct configuration @visual', async ({ page }) => {
    // Check sparkles container
    const sparklesContainer = page.locator('.absolute.inset-0.z-\\[1\\]');
    await expect(sparklesContainer).toBeVisible();
    
    // Check tsParticles canvas
    const particlesCanvas = page.locator('canvas');
    await expect(particlesCanvas).toBeVisible();
    
    // Verify sparkles are above background but below content
    await expect(sparklesContainer).toHaveCSS('z-index', '1');
    await expect(page.locator('.relative.z-10')).toHaveCSS('z-index', '10');
  });

  test('should maintain responsive layout @visual', async ({ page }) => {
    // Test desktop layout
    await page.setViewportSize({ width: 1920, height: 1080 });
    await expect(page.getByRole('heading', { level: 1 })).toHaveClass(/lg:text-7xl/);
    
    // Test tablet layout
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.getByRole('heading', { level: 1 })).toHaveClass(/md:text-6xl/);
    
    // Test mobile layout
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.getByRole('heading', { level: 1 })).toHaveClass(/text-5xl/);
  });

  test('should have proper background and gradient overlay @visual', async ({ page }) => {
    const heroSection = page.locator('.relative.min-h-screen');
    await expect(heroSection).toBeVisible();
    await expect(heroSection).toHaveClass(/bg-black/);
    
    // Check gradient overlay
    const overlay = page.locator('.bg-gradient-to-b');
    await expect(overlay).toBeVisible();
    await expect(overlay).toHaveClass(/from-black\/50/);
    await expect(overlay).toHaveClass(/to-black\/50/);
  });

  test('should have proper text alignment and spacing @visual', async ({ page }) => {
    const contentContainer = page.locator('.container');
    await expect(contentContainer).toHaveClass(/mx-auto/);
    await expect(contentContainer).toHaveClass(/px-4/);
    
    const textContent = page.locator('.flex.flex-col.items-center.text-center');
    await expect(textContent).toBeVisible();
    await expect(textContent).toHaveClass(/text-center/);
  });
}); 