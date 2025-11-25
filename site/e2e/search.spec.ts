import { test, expect } from '@playwright/test';

test.describe('Global Search System', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('search button is visible in desktop header', async ({ page }) => {
    // Desktop view
    await page.setViewportSize({ width: 1280, height: 720 });
    const searchButton = page.getByTestId('search-button').first();
    await expect(searchButton).toBeVisible();
  });

  test('search button is visible in mobile header', async ({ page }) => {
    // Mobile view - the mobile button should be visible (it's the second one in DOM order)
    await page.setViewportSize({ width: 375, height: 667 });
    // Get the visible search button (the one in mobile controls)
    const searchButton = page.locator('[data-testid="search-button"]:visible');
    await expect(searchButton).toBeVisible();
  });

  test('clicking search button opens modal', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    const searchButton = page.getByTestId('search-button').first();
    await searchButton.click();
    
    const searchModal = page.getByTestId('search-modal');
    await expect(searchModal).toBeVisible();
  });

  test('Ctrl+K keyboard shortcut opens search modal', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');
    await page.keyboard.press('Control+k');
    
    const searchModal = page.getByTestId('search-modal');
    await expect(searchModal).toBeVisible({ timeout: 10000 });
  });

  test('ESC key closes search modal', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    // Open modal
    const searchButton = page.getByTestId('search-button').first();
    await searchButton.click();
    
    const searchModal = page.getByTestId('search-modal');
    await expect(searchModal).toBeVisible();
    
    // Press ESC to close
    await page.keyboard.press('Escape');
    await expect(searchModal).not.toBeVisible();
  });

  test('clicking backdrop closes search modal', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    // Open modal
    const searchButton = page.getByTestId('search-button').first();
    await searchButton.click();
    
    const searchModal = page.getByTestId('search-modal');
    await expect(searchModal).toBeVisible();
    
    // Click backdrop to close
    const backdrop = page.getByTestId('search-backdrop');
    await backdrop.click({ position: { x: 10, y: 10 } });
    await expect(searchModal).not.toBeVisible();
  });

  test('search input is focused when modal opens', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    const searchButton = page.getByTestId('search-button').first();
    await searchButton.click();
    
    const searchInput = page.getByTestId('search-input');
    await expect(searchInput).toBeFocused();
  });

  test('typing in search filters products', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    const searchButton = page.getByTestId('search-button').first();
    await searchButton.click();
    
    const searchInput = page.getByTestId('search-input');
    await searchInput.fill('olive');
    
    // Wait for debounce
    await page.waitForTimeout(300);
    
    const results = page.getByTestId('search-results-list');
    await expect(results).toBeVisible();
    
    // Verify "Olive Oil" is in results
    const oliveOilResult = page.getByTestId('search-result-olive-oil');
    await expect(oliveOilResult).toBeVisible();
  });

  test('no results message shows when no products match', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    const searchButton = page.getByTestId('search-button').first();
    await searchButton.click();
    
    const searchInput = page.getByTestId('search-input');
    await searchInput.fill('xyz123nonexistent');
    
    // Wait for debounce
    await page.waitForTimeout(300);
    
    const noResults = page.getByTestId('no-results');
    await expect(noResults).toBeVisible();
  });

  test('search results display product information', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    const searchButton = page.getByTestId('search-button').first();
    await searchButton.click();
    
    const searchInput = page.getByTestId('search-input');
    await searchInput.fill('pepper paste');
    
    // Wait for debounce
    await page.waitForTimeout(300);
    
    const results = page.getByTestId('search-results-list');
    await expect(results).toBeVisible();
    
    // Check that result contains product info
    const pepperPasteResult = page.getByTestId('search-result-pepper-paste');
    await expect(pepperPasteResult).toBeVisible();
    await expect(pepperPasteResult).toContainText('Pepper Paste');
    await expect(pepperPasteResult).toContainText('Pepper & Chili Products');
  });

  test('clicking a search result navigates to product page', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    const searchButton = page.getByTestId('search-button').first();
    await searchButton.click();
    
    const searchInput = page.getByTestId('search-input');
    await searchInput.fill('olive');
    
    // Wait for debounce
    await page.waitForTimeout(300);
    
    const oliveOilResult = page.getByTestId('search-result-olive-oil');
    await oliveOilResult.click();
    
    // Should navigate to product page
    await expect(page).toHaveURL('/product/olive-oil');
  });

  test('arrow keys navigate through search results', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    const searchButton = page.getByTestId('search-button').first();
    await searchButton.click();
    
    const searchInput = page.getByTestId('search-input');
    await searchInput.fill('pepper');
    
    // Wait for debounce
    await page.waitForTimeout(300);
    
    // First result should be selected by default
    const firstResult = page.getByTestId('search-results-list').locator('[aria-selected="true"]');
    await expect(firstResult).toBeVisible();
    
    // Press down arrow to navigate
    await page.keyboard.press('ArrowDown');
    
    // Second result should now be selected
    const results = page.getByRole('option');
    await expect(results.nth(1)).toHaveAttribute('aria-selected', 'true');
  });

  test('Enter key selects the highlighted result', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    const searchButton = page.getByTestId('search-button').first();
    await searchButton.click();
    
    const searchInput = page.getByTestId('search-input');
    await searchInput.fill('olive');
    
    // Wait for debounce
    await page.waitForTimeout(300);
    
    // Press Enter to select
    await page.keyboard.press('Enter');
    
    // Should navigate to product page
    await expect(page).toHaveURL('/product/olive-oil');
  });

  test('search modal is responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    // The visible search button in mobile view
    const searchButton = page.locator('[data-testid="search-button"]:visible');
    await expect(searchButton).toBeVisible();
    await searchButton.click();
    
    const searchModal = page.getByTestId('search-modal');
    await expect(searchModal).toBeVisible();
    
    // Modal should be visible and properly sized
    const searchInput = page.getByTestId('search-input');
    await expect(searchInput).toBeVisible();
  });

  test('popular categories are shown when no search query', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    const searchButton = page.getByTestId('search-button').first();
    await searchButton.click();
    
    // Should show popular categories text
    await expect(page.getByText('Popular categories')).toBeVisible();
    
    // Check categories within search results container
    const searchResults = page.getByTestId('search-results');
    await expect(searchResults.getByRole('link', { name: 'Oils & Condiments' })).toBeVisible();
    await expect(searchResults.getByRole('link', { name: 'Pepper & Chili Products' })).toBeVisible();
  });
});
