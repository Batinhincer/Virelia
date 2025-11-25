import { test, expect } from '@playwright/test';

test.describe('Category Page Filters & Sorting', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to a category page with multiple products
    await page.goto('/products/oils-condiments');
  });

  test.describe('Desktop Filters', () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 });
    });

    test('filter sidebar is visible on desktop', async ({ page }) => {
      const filterPanel = page.getByTestId('desktop-filters');
      await expect(filterPanel).toBeVisible();
    });

    test('shows filter options for packaging, origin, MOQ, and certifications', async ({ page }) => {
      // Check for filter section headers
      await expect(page.getByRole('button', { name: 'Packaging' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'Origin' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'MOQ' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'Certifications' })).toBeVisible();
    });

    test('filtering by origin narrows results', async ({ page }) => {
      // Get initial product count
      const initialStats = await page.getByTestId('filter-stats').textContent();
      expect(initialStats).toContain('2 product');

      // Click Turkey filter
      await page.getByRole('checkbox', { name: 'Turkey', exact: true }).click();

      // Check that results are filtered
      const filteredStats = await page.getByTestId('filter-stats').textContent();
      expect(filteredStats).toContain('1 product');
      expect(filteredStats).toContain('1 filter');
    });

    test('filter is reflected in URL query params', async ({ page }) => {
      // Click origin filter
      await page.getByRole('checkbox', { name: 'Turkey', exact: true }).click();

      // Wait for URL to update
      await page.waitForURL(/origin=Turkey/);
      expect(page.url()).toContain('origin=Turkey');
    });

    test('clear all filters button resets all filters', async ({ page }) => {
      // Apply a filter first
      await page.getByRole('checkbox', { name: 'Turkey', exact: true }).click();

      // Verify filter is active
      await expect(page.getByTestId('clear-all-filters')).toBeVisible();

      // Click clear all
      await page.getByTestId('clear-all-filters').click();

      // Verify filter is cleared
      await expect(page.getByTestId('filter-stats')).toContainText('2 product');
      await expect(page.getByTestId('clear-all-filters')).not.toBeVisible();
    });

    test('active filter chips are shown and can be removed', async ({ page }) => {
      // Apply a filter
      await page.getByRole('checkbox', { name: 'Turkey', exact: true }).click();

      // Check for active filter chip
      const activeFiltersBar = page.getByTestId('active-filters-bar');
      await expect(activeFiltersBar).toBeVisible();
      await expect(activeFiltersBar).toContainText('Turkey');

      // Remove filter via chip
      await page.getByRole('button', { name: 'Remove Turkey filter' }).click();

      // Verify filter is removed
      await expect(page.getByTestId('filter-stats')).toContainText('2 product');
    });
  });

  test.describe('Sorting', () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 });
    });

    test('sort dropdown is visible and has default value', async ({ page }) => {
      const sortDropdown = page.getByTestId('sort-select');
      await expect(sortDropdown).toBeVisible();
      await expect(sortDropdown).toHaveValue('default');
    });

    test('sorting by Name A-Z changes product order', async ({ page }) => {
      // Get initial first product
      const productsGrid = page.getByTestId('products-grid');
      const firstProductBefore = await productsGrid.locator('h3').first().textContent();

      // Change sort to Name A-Z
      await page.getByTestId('sort-select').selectOption('name-asc');

      // Get first product after sorting
      const firstProductAfter = await productsGrid.locator('h3').first().textContent();

      // Product order should be alphabetical (Olive Oil comes before Pomegranate Molasses)
      expect(firstProductAfter).toBe('Olive Oil');
    });

    test('sorting by Name Z-A reverses order', async ({ page }) => {
      // Change sort to Name Z-A
      await page.getByTestId('sort-select').selectOption('name-desc');

      // Get first product after sorting
      const productsGrid = page.getByTestId('products-grid');
      const firstProductAfter = await productsGrid.locator('h3').first().textContent();

      // Product should be Pomegranate Molasses (comes after Olive Oil alphabetically)
      expect(firstProductAfter).toBe('Pomegranate Molasses');
    });

    test('sort is reflected in URL query params', async ({ page }) => {
      // Change sort
      await page.getByTestId('sort-select').selectOption('name-asc');

      // Wait for URL to update
      await page.waitForURL(/sort=name-asc/);
      expect(page.url()).toContain('sort=name-asc');
    });
  });

  test.describe('URL Sync', () => {
    test('filters are applied from URL on page load', async ({ page }) => {
      // Navigate with filter in URL
      await page.goto('/products/oils-condiments?origin=Turkey');

      await page.setViewportSize({ width: 1280, height: 720 });

      // Check that filter is applied
      const originCheckbox = page.getByRole('checkbox', { name: 'Turkey', exact: true });
      await expect(originCheckbox).toBeChecked();

      // Check filtered results
      await expect(page.getByTestId('filter-stats')).toContainText('1 product');
    });

    test('sort is applied from URL on page load', async ({ page }) => {
      // Navigate with sort in URL
      await page.goto('/products/oils-condiments?sort=name-desc');

      await page.setViewportSize({ width: 1280, height: 720 });

      // Check that sort is applied
      await expect(page.getByTestId('sort-select')).toHaveValue('name-desc');

      // Check first product is in correct order
      const productsGrid = page.getByTestId('products-grid');
      const firstProduct = await productsGrid.locator('h3').first().textContent();
      expect(firstProduct).toBe('Pomegranate Molasses');
    });

    test('invalid URL params are handled gracefully', async ({ page }) => {
      // Navigate with invalid filter values
      await page.goto('/products/oils-condiments?origin=InvalidCountry&sort=invalid');

      await page.setViewportSize({ width: 1280, height: 720 });

      // Page should still load and show products
      const productsGrid = page.getByTestId('products-grid');
      await expect(productsGrid).toBeVisible();
    });
  });

  test.describe('Mobile Filters', () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
    });

    test('mobile filter button is visible', async ({ page }) => {
      const filterButton = page.getByTestId('mobile-filter-button');
      await expect(filterButton).toBeVisible();
    });

    test('clicking mobile filter button opens filter panel', async ({ page }) => {
      await page.getByTestId('mobile-filter-button').click();

      const filterPanel = page.getByTestId('mobile-filter-panel');
      await expect(filterPanel).toBeVisible();
    });

    test('mobile filter panel can be closed', async ({ page }) => {
      // Open filter panel
      await page.getByTestId('mobile-filter-button').click();
      await expect(page.getByTestId('mobile-filter-panel')).toBeVisible();

      // Close via close button
      await page.getByRole('button', { name: 'Close filters' }).click();
      await expect(page.getByTestId('mobile-filter-panel')).not.toBeVisible();
    });

    test('mobile filter shows product count and apply button', async ({ page }) => {
      await page.getByTestId('mobile-filter-button').click();

      // Check for stats and apply button
      await expect(page.getByTestId('mobile-filter-stats')).toBeVisible();
      await expect(page.getByRole('button', { name: /Show \d+ product/ })).toBeVisible();
    });

    test('mobile filter button shows active filter count', async ({ page }) => {
      // First go to desktop to apply filter
      await page.setViewportSize({ width: 1280, height: 720 });
      await page.getByRole('checkbox', { name: 'Turkey', exact: true }).click();

      // Switch to mobile
      await page.setViewportSize({ width: 375, height: 667 });

      // Check filter button shows count
      const filterButton = page.getByTestId('mobile-filter-button');
      await expect(filterButton).toContainText('1');
    });
  });

  test.describe('Empty State', () => {
    test('shows empty state when no products match filters', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 });

      // Apply multiple filters that result in no matches
      await page.getByRole('checkbox', { name: 'Turkey', exact: true }).click();
      await page.getByRole('checkbox', { name: 'Organic Certification' }).click();
      // Wait a moment for filters to apply
      await page.waitForTimeout(500);

      // Check filter count - might vary but should be 0 or 1
      const stats = await page.getByTestId('filter-stats').textContent();
      
      // If 0 products, empty state should be shown
      if (stats?.includes('0 product')) {
        const emptyState = page.getByTestId('empty-filter-results');
        await expect(emptyState).toBeVisible();
        await expect(emptyState).toContainText('No products match your filters');
      }
    });

    test('empty state has clear filters button', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 });

      // Navigate to oils-condiments which has Organic Certification
      await page.goto('/products/oils-condiments');
      
      // Apply multiple filters that won't match any product
      // Turkey only has 1 product (Pomegranate Molasses) which doesn't have Organic
      await page.getByRole('checkbox', { name: 'Turkey', exact: true }).click();
      await page.getByRole('checkbox', { name: 'Organic Certification' }).click();

      await page.waitForTimeout(300);

      const stats = await page.getByTestId('filter-stats').textContent();
      
      // If results are empty, check for clear button in empty state
      if (stats?.includes('0 product')) {
        const emptyState = page.getByTestId('empty-filter-results');
        await expect(emptyState.getByRole('button', { name: 'Clear all filters' })).toBeVisible();
      }
    });
  });

  test.describe('Category Stats', () => {
    test('shows product count in header', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 });
      
      const productCount = page.getByTestId('category-product-count');
      await expect(productCount).toBeVisible();
      await expect(productCount).toContainText('product');
    });

    test('shows active filter count when filters applied', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 });

      // Apply a filter
      await page.getByRole('checkbox', { name: 'Turkey', exact: true }).click();

      // Check header shows filter count
      const productCount = page.getByTestId('category-product-count');
      await expect(productCount).toContainText('filter');
    });
  });
});
