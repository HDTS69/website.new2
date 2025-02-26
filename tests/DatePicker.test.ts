import { test, expect } from '@playwright/test';
import { format, addDays } from 'date-fns';

test.describe('DatePicker Component', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the page with the booking form
    await page.goto('/booking');
  });

  test('should open calendar when clicking the date picker button', async ({ page }) => {
    // Click the date picker button
    await page.click('button:has-text("Select a date")');
    
    // Verify calendar is visible
    const calendar = await page.locator('[data-testid="calendar-grid"]');
    await expect(calendar).toBeVisible();
  });

  test('should select a date and update the input', async ({ page }) => {
    // Click the date picker button
    await page.click('button:has-text("Select a date")');
    
    // Get tomorrow's date
    const tomorrow = addDays(new Date(), 1);
    const formattedDate = format(tomorrow, 'dd MMMM yyyy');
    const dayOfMonth = format(tomorrow, 'd');
    
    // Click on tomorrow's date
    await page.click(`[data-testid="calendar-day-${dayOfMonth}"]`);
    
    // Verify the selected date is displayed
    const dateButton = await page.locator('button:has-text("Select a date")');
    await expect(dateButton).toHaveText(formattedDate);
  });

  test('should navigate between months', async ({ page }) => {
    // Click the date picker button
    await page.click('button:has-text("Select a date")');
    
    // Get current month and year
    const currentDate = new Date();
    const currentMonth = format(currentDate, 'MMMM yyyy');
    
    // Click next month button
    await page.click('button:has([data-testid="chevron-right"])');
    
    // Get next month and year
    const nextMonth = format(addDays(currentDate, 31), 'MMMM yyyy');
    
    // Verify month has changed
    const monthDisplay = await page.locator('.text-gray-300.font-medium');
    await expect(monthDisplay).not.toHaveText(currentMonth);
    await expect(monthDisplay).toHaveText(nextMonth);
    
    // Test previous month navigation
    await page.click('button:has([data-testid="chevron-left"])');
    await expect(monthDisplay).toHaveText(currentMonth);
  });

  test('should not allow selecting dates before today', async ({ page }) => {
    // Click the date picker button
    await page.click('button:has-text("Select a date")');
    
    // Try to click on a disabled date (first day of current month if it's in the past)
    const firstDayButton = await page.locator('[data-testid="calendar-day-1"]');
    const isDisabled = await firstDayButton.evaluate((el) => el.hasAttribute('disabled'));
    
    if (isDisabled) {
      // Verify clicking doesn't change the selection
      await firstDayButton.click();
      const dateButton = await page.locator('button:has-text("Select a date")');
      await expect(dateButton).toHaveText('Select a date');
    }
  });

  test('should close calendar when clicking outside', async ({ page }) => {
    // Click the date picker button
    await page.click('button:has-text("Select a date")');
    
    // Verify calendar is visible
    const calendar = await page.locator('[data-testid="calendar-grid"]');
    await expect(calendar).toBeVisible();
    
    // Click outside the calendar
    await page.click('body', { position: { x: 0, y: 0 } });
    
    // Verify calendar is hidden
    await expect(calendar).not.toBeVisible();
  });

  test('should handle multiple date selections', async ({ page }) => {
    // Click the date picker button
    await page.click('button:has-text("Select a date")');
    
    // Select a date
    const tomorrow = addDays(new Date(), 1);
    const dayOfMonth = format(tomorrow, 'd');
    await page.click(`[data-testid="calendar-day-${dayOfMonth}"]`);
    
    // Open calendar again
    await page.click('button:has-text("Select a date")');
    
    // Select a different date
    const nextDay = addDays(tomorrow, 1);
    const nextDayOfMonth = format(nextDay, 'd');
    await page.click(`[data-testid="calendar-day-${nextDayOfMonth}"]`);
    
    // Verify the new date is displayed
    const dateButton = await page.locator('button:has-text("Select a date")');
    await expect(dateButton).toHaveText(format(nextDay, 'dd MMMM yyyy'));
  });
}); 