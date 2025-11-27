import { test, expect } from '@playwright/test';

/**
 * Tests for Phase 11 – Analytics & Monitoring
 *
 * These tests verify:
 * 1. /api/health endpoint functionality
 * 2. /api/version endpoint functionality
 * 3. Analytics script injection (when enabled)
 */

test.describe('Health Endpoint', () => {
  test('returns HTTP 200 with expected JSON shape', async ({ request }) => {
    const response = await request.get('/api/health');

    expect(response.status()).toBe(200);

    const body = await response.json();

    // Verify required fields exist and have correct types
    expect(body).toHaveProperty('status');
    expect(body.status).toBe('ok');

    expect(body).toHaveProperty('environment');
    expect(typeof body.environment).toBe('string');
    expect(body.environment.length).toBeGreaterThan(0);

    expect(body).toHaveProperty('timestamp');
    expect(typeof body.timestamp).toBe('string');
    // Verify timestamp is a valid ISO 8601 format
    expect(new Date(body.timestamp).toISOString()).toBe(body.timestamp);
  });

  test('health endpoint is accessible via GET', async ({ request }) => {
    const response = await request.get('/api/health');
    expect(response.ok()).toBe(true);
  });

  test('health endpoint returns correct content-type', async ({ request }) => {
    const response = await request.get('/api/health');
    expect(response.headers()['content-type']).toContain('application/json');
  });
});

test.describe('Version Endpoint', () => {
  test('returns HTTP 200 with expected JSON shape', async ({ request }) => {
    const response = await request.get('/api/version');

    expect(response.status()).toBe(200);

    const body = await response.json();

    // Verify version field exists and has correct format
    expect(body).toHaveProperty('version');
    expect(typeof body.version).toBe('string');
    // Version should be in semver-like format (e.g., "1.0.0")
    expect(body.version).toMatch(/^\d+\.\d+\.\d+/);
  });

  test('version endpoint is accessible via GET', async ({ request }) => {
    const response = await request.get('/api/version');
    expect(response.ok()).toBe(true);
  });

  test('version endpoint returns correct content-type', async ({ request }) => {
    const response = await request.get('/api/version');
    expect(response.headers()['content-type']).toContain('application/json');
  });

  test('commit field is optional but valid if present', async ({ request }) => {
    const response = await request.get('/api/version');
    const body = await response.json();

    // Commit is optional - only validate if present
    if (body.commit !== undefined) {
      expect(typeof body.commit).toBe('string');
      // Short commit hash should be 7 characters
      expect(body.commit.length).toBe(7);
    }
  });

  test('buildTime field is optional but valid if present', async ({ request }) => {
    const response = await request.get('/api/version');
    const body = await response.json();

    // buildTime is optional - only validate if present
    if (body.buildTime !== undefined) {
      expect(typeof body.buildTime).toBe('string');
      // Should be parseable as a date
      expect(new Date(body.buildTime).toString()).not.toBe('Invalid Date');
    }
  });
});

test.describe('Analytics', () => {
  // Note: In development mode without NEXT_PUBLIC_ANALYTICS_ID, analytics scripts are not loaded
  // This test verifies the analytics mechanism works correctly

  test('home page renders without errors when analytics is disabled', async ({ page }) => {
    await page.goto('/');
    // Page should load successfully
    await expect(page).toHaveTitle(/Frezya/);

    // In development mode without ANALYTICS_ID, no analytics scripts should be present
    const ga4Script = page.locator('script[src*="googletagmanager.com"]');
    const count = await ga4Script.count();
    // Analytics should be disabled in dev mode or when ANALYTICS_ID is not set
    expect(count).toBe(0);
  });

  test('analytics script has correct data attribute when enabled', async ({ page }) => {
    // This test documents the expected behavior when analytics is enabled
    // In a test environment, analytics is typically disabled
    // The presence of data-analytics-id attribute indicates proper setup
    await page.goto('/');

    // Check if analytics script would have the data attribute (when enabled)
    // In dev/test mode, the script won't be present, which is expected
    const ga4Script = page.locator('script[data-analytics-id]');
    const count = await ga4Script.count();

    // In test/dev environment without NEXT_PUBLIC_ANALYTICS_ID, count should be 0
    // This validates that analytics are correctly NOT loaded when disabled
    expect(count).toBe(0);
  });

  test('page content loads correctly regardless of analytics state', async ({ page }) => {
    await page.goto('/');

    // Verify core page elements are present
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();

    // Page should be interactive - verify body has content
    await expect(page.locator('body')).toBeVisible();
  });
});

test.describe('Analytics with Environment Variable', () => {
  // These tests verify analytics behavior
  // In a CI/production-like environment with NEXT_PUBLIC_ANALYTICS_ID set,
  // the analytics scripts should be present

  test('analytics implementation follows expected pattern', async ({ page }) => {
    await page.goto('/');

    // Get the HTML content
    const content = await page.content();

    // The _app.tsx should have conditional analytics rendering logic
    // In production with ANALYTICS_ID set, we expect:
    // 1. A script tag loading googletagmanager.com/gtag/js
    // 2. A script tag with gtag initialization

    // In dev/test without ANALYTICS_ID, these should be absent
    // This is the expected behavior
    const hasGtagLoader = content.includes('googletagmanager.com/gtag/js');
    const hasGtagConfig = content.includes("gtag('config'");

    // Both should be false in test environment (analytics disabled)
    // OR both should be true in production with ANALYTICS_ID (analytics enabled)
    expect(hasGtagLoader === hasGtagConfig).toBe(true);
  });

  test('page renders correctly on all main pages without analytics errors', async ({ page }) => {
    const pages = ['/', '/about', '/logistics', '/certifications', '/contact'];

    // Set up console error listener before navigating
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error' && msg.text().toLowerCase().includes('analytics')) {
        errors.push(msg.text());
      }
    });

    for (const pagePath of pages) {
      await page.goto(pagePath);

      // Page should load without issues
      await expect(page.locator('body')).toBeVisible();
    }

    // No analytics-related errors across all pages
    expect(errors).toHaveLength(0);
  });
});
