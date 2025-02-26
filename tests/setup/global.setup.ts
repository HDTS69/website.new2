import { test as setup, expect } from '@playwright/test';

setup('do global setup', async ({ page }) => {
  // Add any global setup here
  console.log('Running global setup...');
}); 