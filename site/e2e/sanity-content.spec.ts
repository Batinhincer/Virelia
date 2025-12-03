import { test, expect } from '@playwright/test';

test.describe('Sanity CMS Content & Fallback', () => {
  test.describe('Category Pages', () => {
    test('category page renders with description section', async ({ page }) => {
      await page.goto('/products/oils-condiments');
      
      // Check page loads correctly
      await expect(page).toHaveTitle(/Oils.*Condiments.*Virelia/);
      
      // Category heading should be visible
      const h1 = page.locator('h1');
      await expect(h1).toContainText('Oils & Condiments');
      
      // Either rich description or plain description should be present
      const richDescription = page.getByTestId('category-rich-description');
      const plainDescription = page.getByTestId('category-description');
      
      // At least one description type should be visible
      const hasRichDescription = await richDescription.isVisible().catch(() => false);
      const hasPlainDescription = await plainDescription.isVisible().catch(() => false);
      
      expect(hasRichDescription || hasPlainDescription).toBe(true);
    });

    test('category page shows product count', async ({ page }) => {
      await page.goto('/products/oils-condiments');
      
      const productCount = page.getByTestId('category-product-count');
      await expect(productCount).toBeVisible();
      await expect(productCount).toContainText(/\d+ product/);
    });

    test('category page has products grid', async ({ page }) => {
      await page.goto('/products/pepper-chili-products');
      
      const productsGrid = page.getByTestId('products-grid');
      await expect(productsGrid).toBeVisible();
      
      // Should have at least one product card
      const productCards = productsGrid.locator('[data-testid^="product-card-"]');
      const count = await productCards.count();
      expect(count).toBeGreaterThan(0);
    });

    test('coffee products category page renders correctly', async ({ page }) => {
      await page.goto('/products/coffee-products');
      
      // Check page title
      await expect(page).toHaveTitle(/Coffee Products.*Virelia/);
      
      // Category heading should be visible
      const h1 = page.locator('h1');
      await expect(h1).toContainText('Coffee Products');
    });

    test('category pages fallback to local data when Sanity is unavailable', async ({ page }) => {
      // This test verifies that local data works as expected
      // The site always falls back to local data when Sanity is not configured
      await page.goto('/products/asian-specialties');
      
      // Page should still render
      await expect(page).toHaveTitle(/Asian Specialties.*Virelia/);
      
      // Should have at least the sambal product from local data
      const sambalCard = page.getByTestId('product-card-sambal');
      await expect(sambalCard).toBeVisible();
    });
  });

  test.describe('Product Detail Pages', () => {
    test('product detail page has long description section', async ({ page }) => {
      await page.goto('/product/olive-oil');
      
      // Long description section should be visible
      const longDescSection = page.getByTestId('product-long-description');
      await expect(longDescSection).toBeVisible();
      
      // Should have "About This Product" heading
      const sectionHeading = longDescSection.locator('h2');
      await expect(sectionHeading).toContainText('About This Product');
    });

    test('product detail page renders description content', async ({ page }) => {
      await page.goto('/product/pepper-paste');
      
      const longDescSection = page.getByTestId('product-long-description');
      await expect(longDescSection).toBeVisible();
      
      // Either rich description or plain description should have content
      const richDescription = page.getByTestId('product-rich-description');
      const hasRichDescription = await richDescription.isVisible().catch(() => false);
      
      if (hasRichDescription) {
        // Rich description should have some text content
        const richText = await richDescription.textContent();
        expect(richText?.length).toBeGreaterThan(10);
      } else {
        // Plain description should have content
        const plainText = await longDescSection.textContent();
        expect(plainText?.length).toBeGreaterThan(50);
      }
    });

    test('product detail page falls back to local data', async ({ page }) => {
      // Test with a product that should have local fallback data
      await page.goto('/product/harissa');
      
      // Page should render correctly
      await expect(page).toHaveTitle(/Harissa.*Virelia/);
      
      // Product name should be visible
      const h1 = page.locator('h1');
      await expect(h1).toContainText('Harissa');
      
      // Long description should have content from local data
      const longDescSection = page.getByTestId('product-long-description');
      await expect(longDescSection).toBeVisible();
      const text = await longDescSection.textContent();
      expect(text).toContain('North African');
    });

    test('product detail page has specifications section when available', async ({ page }) => {
      await page.goto('/product/olive-oil');
      
      // Olive oil has packaging, MOQ, origin - specs section should be visible
      const specsSection = page.locator('text=Product Specifications').first();
      await expect(specsSection).toBeVisible();
    });

    test('product detail page has certifications when available', async ({ page }) => {
      await page.goto('/product/olive-oil');
      
      // Olive oil has certifications - should display them
      const certBadge = page.locator('text=HACCP').first();
      await expect(certBadge).toBeVisible();
    });
  });

  test.describe('Homepage', () => {
    test('homepage renders hero section', async ({ page }) => {
      await page.goto('/');
      
      // Hero title should be visible
      const heroTitle = page.locator('h1');
      await expect(heroTitle).toBeVisible();
      
      // Default title if Sanity is not configured
      const titleText = await heroTitle.textContent();
      expect(titleText?.length).toBeGreaterThan(10);
    });

    test('homepage renders even when Sanity returns null', async ({ page }) => {
      // Test that homepage works with local data fallback
      await page.goto('/');
      
      // Page should load successfully
      await expect(page).toHaveTitle(/Virelia/);
      
      // Hero section should have content
      const heroTitle = page.locator('h1');
      await expect(heroTitle).toContainText(/Gourmet|Premium/i);
    });

    test('homepage has product categories section', async ({ page }) => {
      await page.goto('/');
      
      // Categories section should be visible
      const categoriesSection = page.locator('text=Product Categories').first();
      await expect(categoriesSection).toBeVisible();
    });

    test('homepage has featured products section', async ({ page }) => {
      await page.goto('/');
      
      // Featured products section should be visible
      const featuredSection = page.locator('text=Featured Products').first();
      await expect(featuredSection).toBeVisible();
    });

    test('homepage has contact section', async ({ page }) => {
      await page.goto('/');
      
      // Navigate to contact section
      await page.locator('#contact').scrollIntoViewIfNeeded();
      
      // Contact section should be visible
      const contactHeading = page.locator('#contact h3');
      await expect(contactHeading).toContainText('Contact Us');
    });
  });

  test.describe('SEO & Metadata', () => {
    test('category page has correct meta description', async ({ page }) => {
      await page.goto('/products/oils-condiments');
      
      const metaDescription = page.locator('meta[name="description"]');
      const content = await metaDescription.getAttribute('content');
      
      // Meta description should have meaningful content
      expect(content?.length).toBeGreaterThan(20);
    });

    test('product page has Open Graph tags', async ({ page }) => {
      await page.goto('/product/olive-oil');
      
      // Check for OG title
      const ogTitle = page.locator('meta[property="og:title"]');
      await expect(ogTitle).toHaveAttribute('content', /Olive Oil/);
      
      // Check for OG type
      const ogType = page.locator('meta[property="og:type"]');
      await expect(ogType).toHaveAttribute('content', 'product');
    });

    test('homepage has proper canonical URL', async ({ page }) => {
      await page.goto('/');
      
      const canonical = page.locator('link[rel="canonical"]');
      const href = await canonical.getAttribute('href');
      
      expect(href).toMatch(/https?:\/\/.*virelia/i);
    });
  });

  test.describe('Navigation & Links', () => {
    test('category page has working product links', async ({ page }) => {
      await page.goto('/products/oils-condiments');
      
      // Click on first product card
      const firstProductCard = page.getByTestId('product-card-olive-oil');
      await expect(firstProductCard).toBeVisible();
      
      await firstProductCard.click();
      
      // Should navigate to product detail page
      await expect(page).toHaveURL(/\/product\/olive-oil/);
    });

    test('product page has working category badge link', async ({ page }) => {
      await page.goto('/product/olive-oil');
      
      // Click category badge
      const categoryBadge = page.getByTestId('category-badge');
      await expect(categoryBadge).toBeVisible();
      
      await categoryBadge.click();
      
      // Should navigate to category page
      await expect(page).toHaveURL(/\/products\/oils-condiments/);
    });
  });
});
