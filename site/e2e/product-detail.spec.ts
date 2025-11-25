import { test, expect } from '@playwright/test';

test.describe('Product Detail Page', () => {
  test.describe('Page Rendering', () => {
    test('product detail page renders correctly for olive-oil', async ({ page }) => {
      await page.goto('/product/olive-oil');
      
      // Check page title
      await expect(page).toHaveTitle(/Olive Oil.*Frezya/);
      
      // Check H1 heading with product name
      const h1 = page.locator('h1');
      await expect(h1).toContainText('Olive Oil');
      
      // Check meta description exists
      const metaDescription = page.locator('meta[name="description"]');
      await expect(metaDescription).toHaveAttribute('content', /olive oil/i);
    });

    test('product detail page renders correctly for pepper-paste', async ({ page }) => {
      await page.goto('/product/pepper-paste');
      
      // Check page title
      await expect(page).toHaveTitle(/Pepper Paste.*Frezya/);
      
      // Check H1 heading with product name
      const h1 = page.locator('h1');
      await expect(h1).toContainText('Pepper Paste');
    });
  });

  test.describe('Breadcrumbs', () => {
    test('breadcrumbs are visible and contain correct structure', async ({ page }) => {
      await page.goto('/product/olive-oil');
      
      const breadcrumb = page.getByTestId('breadcrumb');
      await expect(breadcrumb).toBeVisible();
      
      // Check breadcrumb contains Home link
      const homeLink = page.getByTestId('breadcrumb-link-home');
      await expect(homeLink).toBeVisible();
      await expect(homeLink).toHaveAttribute('href', '/');
      
      // Check breadcrumb contains Products link
      const productsLink = page.getByTestId('breadcrumb-link-products');
      await expect(productsLink).toBeVisible();
      await expect(productsLink).toHaveAttribute('href', '/#products');
      
      // Check breadcrumb contains Category link (sanitized test ID removes special chars)
      const categoryLink = page.getByTestId('breadcrumb-link-oils-condiments');
      await expect(categoryLink).toBeVisible();
      await expect(categoryLink).toHaveAttribute('href', '/products/oils-condiments');
      
      // Check current page (product name) is shown without link
      const currentPage = page.getByTestId('breadcrumb-current');
      await expect(currentPage).toBeVisible();
      await expect(currentPage).toContainText('Olive Oil');
    });

    test('breadcrumb Home link navigates correctly', async ({ page }) => {
      await page.goto('/product/olive-oil');
      
      const homeLink = page.getByTestId('breadcrumb-link-home');
      await homeLink.click();
      
      await expect(page).toHaveURL('/');
    });

    test('breadcrumb Category link navigates correctly', async ({ page }) => {
      await page.goto('/product/olive-oil');
      
      // Category link for "Oils & Condiments" becomes "oils-condiments" after sanitization
      const categoryLink = page.getByTestId('breadcrumb-link-oils-condiments');
      await categoryLink.click();
      
      await expect(page).toHaveURL('/products/oils-condiments');
    });
  });

  test.describe('CTAs', () => {
    test('Request Product Information CTA is visible and clickable', async ({ page }) => {
      await page.goto('/product/olive-oil');
      
      const requestInfoCta = page.getByTestId('request-info-cta');
      await expect(requestInfoCta).toBeVisible();
      await expect(requestInfoCta).toContainText('Request Product Information');
      
      // Click should scroll to inquiry form
      await requestInfoCta.click();
      
      // The inquiry section should be visible after click
      const inquirySection = page.locator('#inquiry');
      await expect(inquirySection).toBeVisible();
    });

    test('View Category CTA is visible and navigates correctly', async ({ page }) => {
      await page.goto('/product/olive-oil');
      
      const viewCategoryCta = page.getByTestId('view-category-cta');
      await expect(viewCategoryCta).toBeVisible();
      await expect(viewCategoryCta).toContainText('View All Oils & Condiments');
      
      // Click should navigate to category page
      await viewCategoryCta.click();
      await expect(page).toHaveURL('/products/oils-condiments');
    });
  });

  test.describe('Related Products', () => {
    test('related products section appears for products with related items', async ({ page }) => {
      await page.goto('/product/olive-oil');
      
      const relatedSection = page.getByTestId('related-products-section');
      await expect(relatedSection).toBeVisible();
      
      // Check section title
      await expect(relatedSection.locator('h2')).toContainText('Related Products');
    });

    test('related products grid shows product cards', async ({ page }) => {
      await page.goto('/product/olive-oil');
      
      const relatedGrid = page.getByTestId('related-products-grid');
      await expect(relatedGrid).toBeVisible();
      
      // There should be product cards in the grid (at most 3)
      const productCards = relatedGrid.locator('a');
      const count = await productCards.count();
      expect(count).toBeGreaterThan(0);
      expect(count).toBeLessThanOrEqual(3);
    });

    test('related products excludes the current product', async ({ page }) => {
      await page.goto('/product/olive-oil');
      
      const relatedGrid = page.getByTestId('related-products-grid');
      
      // The current product (Olive Oil) should not appear in related products
      const productTitles = await relatedGrid.locator('h3').allTextContents();
      expect(productTitles).not.toContain('Olive Oil');
    });

    test('clicking a related product navigates to that product page', async ({ page }) => {
      await page.goto('/product/olive-oil');
      
      const relatedGrid = page.getByTestId('related-products-grid');
      const firstProductLink = relatedGrid.locator('a').first();
      
      // Get the href to verify navigation
      const href = await firstProductLink.getAttribute('href');
      expect(href).toMatch(/\/product\/.+/);
      
      await firstProductLink.click();
      
      // Should navigate to a product page
      await expect(page).toHaveURL(/\/product\/.+/);
    });
  });

  test.describe('Product Information', () => {
    test('product specifications section is visible when specs exist', async ({ page }) => {
      await page.goto('/product/olive-oil');
      
      // Olive oil has specifications (packaging, shelfLife, moq, origin, certifications)
      const specsSection = page.locator('h2:has-text("Product Specifications")');
      await expect(specsSection).toBeVisible();
    });

    test('product image has meaningful alt text', async ({ page }) => {
      await page.goto('/product/olive-oil');
      
      // The main product image should have alt text matching product name
      const productImage = page.locator('img[alt="Olive Oil"]');
      await expect(productImage).toBeVisible();
    });

    test('category badge is visible and links to category page', async ({ page }) => {
      await page.goto('/product/olive-oil');
      
      // Category badge should be visible in the product hero section
      const categoryBadge = page.getByTestId('category-badge');
      await expect(categoryBadge).toBeVisible();
      await expect(categoryBadge).toContainText('Oils & Condiments');
      await expect(categoryBadge).toHaveAttribute('href', '/products/oils-condiments');
    });
  });

  test.describe('Responsive Layout', () => {
    test('desktop layout shows two-column view', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 });
      await page.goto('/product/olive-oil');
      
      // On desktop, the grid should have 2 columns
      const heroGrid = page.locator('.grid.lg\\:grid-cols-2').first();
      await expect(heroGrid).toBeVisible();
    });

    test('mobile layout stacks content vertically', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/product/olive-oil');
      
      // The product title should be visible
      const h1 = page.locator('h1');
      await expect(h1).toBeVisible();
      
      // CTAs should be visible and full-width on mobile
      const requestInfoCta = page.getByTestId('request-info-cta');
      await expect(requestInfoCta).toBeVisible();
    });
  });

  test.describe('SEO & Structured Data', () => {
    test('page has proper meta tags', async ({ page }) => {
      await page.goto('/product/olive-oil');
      
      // Check title
      await expect(page).toHaveTitle(/Olive Oil.*Frezya/);
      
      // Check canonical URL
      const canonical = page.locator('link[rel="canonical"]');
      await expect(canonical).toHaveAttribute('href', /\/product\/olive-oil$/);
      
      // Check Open Graph tags
      const ogTitle = page.locator('meta[property="og:title"]');
      await expect(ogTitle).toHaveAttribute('content', /Olive Oil.*Frezya/);
      
      const ogType = page.locator('meta[property="og:type"]');
      await expect(ogType).toHaveAttribute('content', 'product');
    });

    test('page has Product JSON-LD structured data', async ({ page }) => {
      await page.goto('/product/olive-oil');
      
      // Check for JSON-LD script with Product schema
      const jsonLd = page.locator('script[type="application/ld+json"]');
      const count = await jsonLd.count();
      expect(count).toBeGreaterThanOrEqual(1);
      
      // Get the first script content and verify it's Product schema
      const scripts = await jsonLd.allTextContents();
      const hasProductSchema = scripts.some(script => {
        try {
          const data = JSON.parse(script);
          return data['@type'] === 'Product';
        } catch {
          return false;
        }
      });
      expect(hasProductSchema).toBe(true);
    });

    test('Product JSON-LD contains required fields', async ({ page }) => {
      await page.goto('/product/olive-oil');
      
      const jsonLd = page.locator('script[type="application/ld+json"]');
      const scripts = await jsonLd.allTextContents();
      
      const productScript = scripts.find(script => {
        try {
          const data = JSON.parse(script);
          return data['@type'] === 'Product';
        } catch {
          return false;
        }
      });
      
      expect(productScript).toBeDefined();
      
      const productData = JSON.parse(productScript!);
      
      // Check required fields
      expect(productData.name).toBe('Olive Oil');
      expect(productData.description).toBeTruthy();
      expect(productData.image).toBeTruthy();
      expect(productData.category).toBe('Oils & Condiments');
      expect(productData.brand?.name).toBe('Frezya');
    });
  });

  test.describe('Accessibility', () => {
    test('headings follow logical order', async ({ page }) => {
      await page.goto('/product/olive-oil');
      
      // H1 should be the product name
      const h1 = page.locator('h1');
      await expect(h1).toBeVisible();
      const h1Count = await h1.count();
      expect(h1Count).toBe(1);
      
      // H2 should be for section headings
      const h2Elements = page.locator('h2');
      const h2Count = await h2Elements.count();
      expect(h2Count).toBeGreaterThanOrEqual(1);
    });

    test('breadcrumb has proper aria attributes', async ({ page }) => {
      await page.goto('/product/olive-oil');
      
      const breadcrumb = page.getByTestId('breadcrumb');
      await expect(breadcrumb).toHaveAttribute('aria-label', 'Breadcrumb');
      
      // Current page should have aria-current
      const currentPage = page.getByTestId('breadcrumb-current');
      await expect(currentPage).toHaveAttribute('aria-current', 'page');
    });

    test('interactive elements are keyboard accessible', async ({ page }) => {
      await page.goto('/product/olive-oil');
      
      // Tab to CTA button
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      
      // One of the CTAs should be focused eventually
      const focusedElement = page.locator(':focus');
      const tagName = await focusedElement.evaluate(el => el.tagName);
      expect(['A', 'BUTTON']).toContain(tagName);
    });
  });
});
