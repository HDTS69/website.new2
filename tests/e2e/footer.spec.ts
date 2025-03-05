import { test, expect } from '@playwright/test';

test.describe('Footer Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display all footer sections @smoke', async ({ page }) => {
    // Check main sections
    await expect(page.getByText('HD Trade Services')).toBeVisible();
    await expect(page.getByText('Our Services')).toBeVisible();
    await expect(page.getByText('Quick Links')).toBeVisible();
    await expect(page.getByText('Connect With Us')).toBeVisible();
  });

  test('should have working contact information with copy functionality @smoke', async ({ page }) => {
    // Phone number
    const phoneLink = page.getByRole('link', { name: '1300 420 911' });
    await expect(phoneLink).toBeVisible();
    await expect(phoneLink).toHaveAttribute('href', 'tel:1300420911');
    
    // Email
    const emailLink = page.getByRole('link', { name: 'admin@hdtradeservices.com.au' });
    await expect(emailLink).toBeVisible();
    await expect(emailLink).toHaveAttribute('href', 'mailto:admin@hdtradeservices.com.au');
    
    // Copy buttons
    const copyButtons = page.locator('button[aria-label*="Copy"]');
    await expect(copyButtons).toHaveCount(2);
  });

  test('should copy contact information when clicked @interaction', async ({ page }) => {
    // Test phone number copy
    const phoneCopyButton = page.locator('button[aria-label="Copy phone number"]');
    await phoneCopyButton.click();
    
    // Check for success message
    await expect(page.getByText('Copied!')).toBeVisible();
    
    // Test email copy
    const emailCopyButton = page.locator('button[aria-label="Copy email address"]');
    await emailCopyButton.click();
    
    // Check for success message
    await expect(page.getByText('Copied!')).toBeVisible();
  });

  test('should have working service links @smoke', async ({ page }) => {
    const serviceLinks = [
      { name: 'Plumbing Services', href: '/services/plumbing' },
      { name: 'Gas Fitting', href: '/services/gas' },
      { name: 'Roofing Solutions', href: '/services/roofing' },
      { name: 'Air Conditioning', href: '/services/air-conditioning' }
    ];

    for (const service of serviceLinks) {
      const link = page.getByRole('link', { name: service.name });
      await expect(link).toBeVisible();
      await expect(link).toHaveAttribute('href', service.href);
    }
  });

  test('should have working quick links @smoke', async ({ page }) => {
    const quickLinks = [
      { name: 'Book Online', href: '/book' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'FAQs', href: '/faqs' }
    ];

    for (const link of quickLinks) {
      const element = page.getByRole('link', { name: link.name });
      await expect(element).toBeVisible();
      await expect(element).toHaveAttribute('href', link.href);
    }
  });

  test('should have working social media links @smoke', async ({ page }) => {
    const socialLinks = page.locator('.flex.gap-4 a');
    await expect(socialLinks).toHaveCount(2); // Facebook, LinkedIn
    
    // Check each social link
    await expect(page.getByRole('link', { name: /facebook/i })).toHaveAttribute('href', 'https://facebook.com');
    await expect(page.getByRole('link', { name: /linkedin/i })).toHaveAttribute('href', 'https://linkedin.com');
  });

  test('should display certification information @smoke', async ({ page }) => {
    await expect(page.getByText('Licensed & Certified')).toBeVisible();
    await expect(page.getByText('QBCC: 15371385')).toBeVisible();
    await expect(page.getByText('ARC: L176115')).toBeVisible();
  });

  test('should display copyright information @smoke', async ({ page }) => {
    const currentYear = new Date().getFullYear();
    await expect(page.getByText(`© ${currentYear} HD Trade Services. All rights reserved.`)).toBeVisible();
  });

  test('should maintain responsive layout @visual', async ({ page }) => {
    // Test desktop view
    await page.setViewportSize({ width: 1920, height: 1080 });
    await expect(page.locator('footer .grid')).toHaveClass(/lg:grid-cols-4/);
    
    // Test tablet view
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.locator('footer .grid')).toHaveClass(/md:grid-cols-2/);
    
    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('footer .grid')).toHaveClass(/grid-cols-1/);
  });
}); 