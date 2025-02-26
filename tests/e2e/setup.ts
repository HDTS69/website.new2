import { test as setup, expect } from '@playwright/test';

setup('do global setup', async ({ page }) => {
  // Add retry logic for development server startup
  let retries = 3;
  while (retries > 0) {
    try {
      await page.goto('/');
      break;
    } catch (error) {
      retries--;
      if (retries === 0) throw error;
      // Wait 2 seconds before retrying
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
}); 