import { test, expect } from '@playwright/test';

/**
 * Phase 10B Go-Live Deployment Tests
 * Tests for canonical URLs, robots.txt, sitemap.xml validity,
 * and other SEO/production requirements.
 */

test.describe('Canonical URL Correctness', () => {
  const EXPECTED_SITE_URL = 'https://www.virelias.com';

  test('homepage has correct canonical URL', async ({ page }) => {
    await page.goto('/');
    
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute('href', EXPECTED_SITE_URL);
  });

  test('product page has correct canonical URL', async ({ page }) => {
    await page.goto('/product/olive-oil');
    
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute('href', `${EXPECTED_SITE_URL}/product/olive-oil`);
  });

  test('category page has correct canonical URL', async ({ page }) => {
    await page.goto('/products/oils-condiments');
    
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute('href', `${EXPECTED_SITE_URL}/products/oils-condiments`);
  });

  test('about page has correct canonical URL', async ({ page }) => {
    await page.goto('/about');
    
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute('href', `${EXPECTED_SITE_URL}/about`);
  });

  test('logistics page has correct canonical URL', async ({ page }) => {
    await page.goto('/logistics');
    
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute('href', `${EXPECTED_SITE_URL}/logistics`);
  });

  test('certifications page has correct canonical URL', async ({ page }) => {
    await page.goto('/certifications');
    
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute('href', `${EXPECTED_SITE_URL}/certifications`);
  });

  test('canonical URL matches og:url', async ({ page }) => {
    await page.goto('/product/olive-oil');
    
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    const ogUrl = await page.locator('meta[property="og:url"]').getAttribute('content');
    
    expect(canonical).toBe(ogUrl);
  });

  test('canonical URL matches twitter:url', async ({ page }) => {
    await page.goto('/product/olive-oil');
    
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    const twitterUrl = await page.locator('meta[name="twitter:url"]').getAttribute('content');
    
    expect(canonical).toBe(twitterUrl);
  });
});

test.describe('robots.txt Validity', () => {
  test('robots.txt is accessible and returns 200', async ({ request }) => {
    const response = await request.get('/api/robots.txt');
    expect(response.status()).toBe(200);
  });

  test('robots.txt has correct content type', async ({ request }) => {
    const response = await request.get('/api/robots.txt');
    const contentType = response.headers()['content-type'];
    expect(contentType).toContain('text/plain');
  });

  test('robots.txt contains required directives', async ({ request }) => {
    const response = await request.get('/api/robots.txt');
    const body = await response.text();
    
    // Check for User-agent directive
    expect(body).toContain('User-agent: *');
    
    // Check for Allow directive
    expect(body).toContain('Allow: /');
    
    // Check for Sitemap directive with correct URL
    expect(body).toContain('Sitemap: https://www.virelias.com/api/sitemap.xml');
    
    // Check that admin and API routes are disallowed
    expect(body).toContain('Disallow: /admin');
    expect(body).toContain('Disallow: /api/');
  });

  test('robots.txt allows sitemap.xml and robots.txt endpoints', async ({ request }) => {
    const response = await request.get('/api/robots.txt');
    const body = await response.text();
    
    expect(body).toContain('Allow: /api/sitemap.xml');
    expect(body).toContain('Allow: /api/robots.txt');
  });
});

test.describe('sitemap.xml Validity', () => {
  test('sitemap.xml is accessible and returns 200', async ({ request }) => {
    const response = await request.get('/api/sitemap.xml');
    expect(response.status()).toBe(200);
  });

  test('sitemap.xml has correct content type', async ({ request }) => {
    const response = await request.get('/api/sitemap.xml');
    const contentType = response.headers()['content-type'];
    expect(contentType).toContain('application/xml');
  });

  test('sitemap.xml contains valid XML structure', async ({ request }) => {
    const response = await request.get('/api/sitemap.xml');
    const body = await response.text();
    
    // Check XML declaration
    expect(body).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    
    // Check urlset namespace
    expect(body).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
    
    // Check for closing urlset tag
    expect(body).toContain('</urlset>');
  });

  test('sitemap.xml contains static pages', async ({ request }) => {
    const response = await request.get('/api/sitemap.xml');
    const body = await response.text();
    
    // Check for homepage
    expect(body).toContain('<loc>https://www.virelias.com/</loc>');
    
    // Check for static pages
    expect(body).toContain('<loc>https://www.virelias.com/about</loc>');
    expect(body).toContain('<loc>https://www.virelias.com/logistics</loc>');
    expect(body).toContain('<loc>https://www.virelias.com/certifications</loc>');
  });

  test('sitemap.xml contains product pages', async ({ request }) => {
    const response = await request.get('/api/sitemap.xml');
    const body = await response.text();
    
    // Check for product pages
    expect(body).toContain('<loc>https://www.virelias.com/product/olive-oil</loc>');
    expect(body).toContain('<loc>https://www.virelias.com/product/pepper-paste</loc>');
  });

  test('sitemap.xml contains category pages', async ({ request }) => {
    const response = await request.get('/api/sitemap.xml');
    const body = await response.text();
    
    // Check for category pages
    expect(body).toContain('<loc>https://www.virelias.com/products/oils-condiments</loc>');
    expect(body).toContain('<loc>https://www.virelias.com/products/pepper-chili-products</loc>');
  });

  test('sitemap.xml URLs have lastmod, changefreq, and priority', async ({ request }) => {
    const response = await request.get('/api/sitemap.xml');
    const body = await response.text();
    
    // Check for lastmod (date format: YYYY-MM-DD)
    expect(body).toMatch(/<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/);
    
    // Check for changefreq
    expect(body).toMatch(/<changefreq>(daily|weekly|monthly)<\/changefreq>/);
    
    // Check for priority
    expect(body).toMatch(/<priority>[\d.]+<\/priority>/);
  });
});

test.describe('404 Page Behavior', () => {
  test('404 page returns correct status code', async ({ page }) => {
    const response = await page.goto('/nonexistent-page-xyz');
    expect(response?.status()).toBe(404);
  });

  test('404 page renders with proper content', async ({ page }) => {
    await page.goto('/nonexistent-page-xyz');
    
    // Check for 404 heading
    await expect(page.getByRole('heading', { name: 'Page Not Found' })).toBeVisible();
    
    // Check for navigation options
    await expect(page.getByRole('link', { name: 'Back to Home' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Browse Products' })).toBeVisible();
  });

  test('404 page has noindex meta tag', async ({ page }) => {
    await page.goto('/nonexistent-page-xyz');
    
    const robotsMeta = page.locator('meta[name="robots"]');
    await expect(robotsMeta).toHaveAttribute('content', 'noindex, nofollow');
  });

  test('404 page contains helpful links', async ({ page }) => {
    await page.goto('/nonexistent-page-xyz');
    
    // Check for helpful navigation links in the main 404 content area (first of multiple)
    // Links also exist in the footer, so we use .first()
    await expect(page.getByRole('link', { name: 'About Us' }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'Logistics' }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'Certifications' }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'Contact' }).first()).toBeVisible();
  });
});

test.describe('API Route Error Handling', () => {
  test('inquiry API returns 405 for non-POST methods', async ({ request }) => {
    const response = await request.get('/api/inquiry');
    expect(response.status()).toBe(405);
    
    const body = await response.json();
    expect(body.success).toBe(false);
    expect(body.message).toContain('not allowed');
  });

  test('inquiry API returns 400 for invalid data', async ({ request }) => {
    const response = await request.post('/api/inquiry', {
      data: {
        // Missing required fields
        fullName: 'Test User',
      },
    });
    expect(response.status()).toBe(400);
    
    const body = await response.json();
    expect(body.success).toBe(false);
    expect(body.message).toContain('required');
  });

  test('inquiry API returns 400 for invalid email', async ({ request }) => {
    const response = await request.post('/api/inquiry', {
      data: {
        fullName: 'Test User',
        companyName: 'Test Company',
        email: 'invalid-email-format',
        country: 'Netherlands',
        message: 'Test message',
      },
    });
    expect(response.status()).toBe(400);
    
    const body = await response.json();
    expect(body.success).toBe(false);
    expect(body.message.toLowerCase()).toContain('email');
  });
});

test.describe('Placeholder Image Fallback', () => {
  test('placeholder image is accessible', async ({ request }) => {
    const response = await request.get('/placeholder.jpg');
    expect(response.status()).toBe(200);
    
    const contentType = response.headers()['content-type'];
    expect(contentType).toContain('image/jpeg');
  });
});

test.describe('Open Graph and Twitter Meta Tags', () => {
  test('homepage has complete OG meta tags', async ({ page }) => {
    await page.goto('/');
    
    await expect(page.locator('meta[property="og:type"]')).toHaveAttribute('content', 'website');
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content', 'https://www.virelias.com');
    await expect(page.locator('meta[property="og:title"]')).toBeAttached();
    await expect(page.locator('meta[property="og:description"]')).toBeAttached();
    await expect(page.locator('meta[property="og:image"]')).toBeAttached();
    await expect(page.locator('meta[property="og:site_name"]')).toHaveAttribute('content', 'Virelia');
  });

  test('homepage has complete Twitter meta tags', async ({ page }) => {
    await page.goto('/');
    
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute('content', 'summary_large_image');
    await expect(page.locator('meta[name="twitter:url"]')).toHaveAttribute('content', 'https://www.virelias.com');
    await expect(page.locator('meta[name="twitter:title"]')).toBeAttached();
    await expect(page.locator('meta[name="twitter:description"]')).toBeAttached();
    await expect(page.locator('meta[name="twitter:image"]')).toBeAttached();
  });

  test('product page has og:type product', async ({ page }) => {
    await page.goto('/product/olive-oil');
    
    await expect(page.locator('meta[property="og:type"]')).toHaveAttribute('content', 'product');
  });

  test('OG images have absolute URLs', async ({ page }) => {
    await page.goto('/');
    
    const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content');
    expect(ogImage).toMatch(/^https?:\/\//);
    expect(ogImage).toContain('https://www.virelias.com');
  });
});
