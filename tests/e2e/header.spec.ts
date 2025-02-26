import { test, expect } from '@playwright/test';

test.describe('Header Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display header with correct elements @smoke', async ({ page }) => {
    // Check if header exists
    const header = page.locator('header');
    await expect(header).toBeVisible();

    // Check logo images
    const iconLogo = page.getByRole('img', { name: 'Company Icon' });
    const textLogo = page.getByRole('img', { name: 'Company Name' });
    await expect(iconLogo).toBeVisible();
    await expect(textLogo).toBeVisible();

    // Check buttons
    const callButton = page.getByRole('link', { name: 'Call Now' });
    const bookButton = page.getByRole('link', { name: 'Book Online' });
    await expect(callButton).toBeVisible();
    await expect(bookButton).toBeVisible();
  });

  test('header should be transparent at top and solid when scrolled @visual', async ({ page }) => {
    // Check initial transparent state
    const header = page.locator('header');
    await expect(header).toHaveClass(/bg-transparent/);

    // Scroll down
    await page.evaluate(() => window.scrollTo(0, 100));
    await page.waitForTimeout(500); // Wait for transition

    // Check scrolled state
    await expect(header).toHaveClass(/bg-black\/90/);
  });

  test('call now button should have correct phone number @smoke', async ({ page }) => {
    const callButton = page.getByRole('link', { name: 'Call Now' });
    await expect(callButton).toHaveAttribute('href', 'tel:1300000000');
  });

  test('book online button should scroll to booking section @smoke', async ({ page }) => {
    const bookButton = page.getByRole('link', { name: 'Book Online' });
    await expect(bookButton).toHaveAttribute('href', '#book');
  });

  test('header should be responsive @visual', async ({ page }) => {
    // Test desktop view
    await page.setViewportSize({ width: 1920, height: 1080 });
    const header = page.locator('header');
    await expect(header).toBeVisible();

    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(header).toBeVisible();
  });
}); 