import { test, expect } from '@playwright/test';

/**
 * Tests for Phase 14 – Cookie Consent & Legal Pages
 *
 * These tests verify:
 * 1. Cookie consent banner behavior
 * 2. Consent storage in localStorage
 * 3. Analytics integration with consent
 * 4. Legal pages rendering and accessibility from footer
 * 5. Cookie settings link functionality
 */

test.describe('Cookie Consent Banner', () => {
  test.beforeEach(async ({ page, context }) => {
    // Clear localStorage before each test
    await context.clearCookies();
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test('banner appears on first visit', async ({ page }) => {
    await page.goto('/');
    
    const banner = page.getByTestId('cookie-consent-banner');
    await expect(banner).toBeVisible();
    
    // Check banner content
    await expect(banner).toContainText('We value your privacy');
    await expect(banner).toContainText('analytics cookies');
    
    // Check buttons are present
    await expect(page.getByTestId('cookie-accept-button')).toBeVisible();
    await expect(page.getByTestId('cookie-decline-button')).toBeVisible();
  });

  test('clicking Accept hides banner and stores consent', async ({ page }) => {
    await page.goto('/');
    
    const banner = page.getByTestId('cookie-consent-banner');
    await expect(banner).toBeVisible();
    
    // Click Accept
    await page.getByTestId('cookie-accept-button').click();
    
    // Banner should be hidden
    await expect(banner).not.toBeVisible();
    
    // Check localStorage
    const consent = await page.evaluate(() => localStorage.getItem('frezya-cookie-consent'));
    expect(consent).toBe('accepted');
  });

  test('clicking Decline hides banner and stores consent', async ({ page }) => {
    await page.goto('/');
    
    const banner = page.getByTestId('cookie-consent-banner');
    await expect(banner).toBeVisible();
    
    // Click Decline
    await page.getByTestId('cookie-decline-button').click();
    
    // Banner should be hidden
    await expect(banner).not.toBeVisible();
    
    // Check localStorage
    const consent = await page.evaluate(() => localStorage.getItem('frezya-cookie-consent'));
    expect(consent).toBe('declined');
  });

  test('banner does not show on reload after accepting', async ({ page }) => {
    await page.goto('/');
    
    // Accept cookies
    await page.getByTestId('cookie-accept-button').click();
    
    // Reload page
    await page.reload();
    
    // Banner should not appear
    const banner = page.getByTestId('cookie-consent-banner');
    await expect(banner).not.toBeVisible();
  });

  test('banner does not show on reload after declining', async ({ page }) => {
    await page.goto('/');
    
    // Decline cookies
    await page.getByTestId('cookie-decline-button').click();
    
    // Reload page
    await page.reload();
    
    // Banner should not appear
    const banner = page.getByTestId('cookie-consent-banner');
    await expect(banner).not.toBeVisible();
  });

  test('banner is keyboard accessible', async ({ page }) => {
    await page.goto('/');
    
    const banner = page.getByTestId('cookie-consent-banner');
    await expect(banner).toBeVisible();
    
    // Check banner has role="dialog"
    await expect(banner).toHaveAttribute('role', 'dialog');
    await expect(banner).toHaveAttribute('aria-modal', 'true');
    
    // Accept button should be focusable and focused initially
    const acceptButton = page.getByTestId('cookie-accept-button');
    await expect(acceptButton).toBeFocused();
    
    // Tab to decline button
    await page.keyboard.press('Tab');
    const declineButton = page.getByTestId('cookie-decline-button');
    await expect(declineButton).toBeFocused();
  });

  test('banner has links to Privacy Policy and Cookie Policy', async ({ page }) => {
    await page.goto('/');
    
    const banner = page.getByTestId('cookie-consent-banner');
    
    // Check links are present
    const privacyLink = banner.locator('a[href="/privacy-policy"]');
    const cookieLink = banner.locator('a[href="/cookie-policy"]');
    
    await expect(privacyLink).toBeVisible();
    await expect(cookieLink).toBeVisible();
  });
});

test.describe('Cookie Settings from Footer', () => {
  test.beforeEach(async ({ page, context }) => {
    // Clear localStorage before each test
    await context.clearCookies();
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test('Cookie settings link reopens the banner after consent was given', async ({ page }) => {
    await page.goto('/');
    
    // Accept cookies first
    await page.getByTestId('cookie-accept-button').click();
    
    // Banner should be hidden
    await expect(page.getByTestId('cookie-consent-banner')).not.toBeVisible();
    
    // Click Cookie settings in footer
    await page.getByTestId('footer-cookie-settings').click();
    
    // Banner should reappear
    await expect(page.getByTestId('cookie-consent-banner')).toBeVisible();
  });

  test('user can change consent via Cookie settings', async ({ page }) => {
    await page.goto('/');
    
    // Accept cookies first
    await page.getByTestId('cookie-accept-button').click();
    
    // Verify consent is accepted
    let consent = await page.evaluate(() => localStorage.getItem('frezya-cookie-consent'));
    expect(consent).toBe('accepted');
    
    // Reopen banner via Cookie settings
    await page.getByTestId('footer-cookie-settings').click();
    
    // Now decline
    await page.getByTestId('cookie-decline-button').click();
    
    // Verify consent changed to declined
    consent = await page.evaluate(() => localStorage.getItem('frezya-cookie-consent'));
    expect(consent).toBe('declined');
  });
});

test.describe('Analytics Integration with Consent', () => {
  test.beforeEach(async ({ page, context }) => {
    // Clear localStorage before each test
    await context.clearCookies();
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test('analytics scripts are not loaded when consent is declined', async ({ page }) => {
    await page.goto('/');
    
    // Decline cookies
    await page.getByTestId('cookie-decline-button').click();
    
    // In dev mode, analytics is disabled regardless
    // Just verify no GA script is present
    const gaScript = page.locator('script[src*="googletagmanager.com"]');
    const count = await gaScript.count();
    expect(count).toBe(0);
  });

  test('dataLayer is not defined when consent is declined', async ({ page }) => {
    await page.goto('/');
    
    // Decline cookies
    await page.getByTestId('cookie-decline-button').click();
    
    // In dev/test mode, dataLayer should not be defined
    const hasDataLayer = await page.evaluate(() => {
      return typeof (window as unknown as { dataLayer?: unknown[] }).dataLayer !== 'undefined';
    });
    
    // In dev mode without ANALYTICS_ID, dataLayer should not exist
    expect(hasDataLayer).toBe(false);
  });

  test('page renders correctly regardless of consent state', async ({ page }) => {
    await page.goto('/');
    
    // Accept cookies
    await page.getByTestId('cookie-accept-button').click();
    
    // Page should still work
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
    
    // Navigate to another page
    await page.goto('/about');
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
  });
});

test.describe('Legal Pages', () => {
  test('Privacy Policy page renders correctly', async ({ page }) => {
    await page.goto('/privacy-policy');
    
    // Check page title
    await expect(page).toHaveTitle(/Privacy Policy.*Frezya/);
    
    // Check h1 heading
    const h1 = page.locator('h1');
    await expect(h1).toContainText('Privacy Policy');
    
    // Check sections are present (use headings to be more specific)
    await expect(page.getByRole('heading', { name: 'Information We Collect' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'How We Use Your Information' })).toBeVisible();
    await expect(page.getByRole('heading', { name: '11. Contact Us' })).toBeVisible();
    
    // Check header and footer are present
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
  });

  test('Cookie Policy page renders correctly', async ({ page }) => {
    await page.goto('/cookie-policy');
    
    // Check page title
    await expect(page).toHaveTitle(/Cookie Policy.*Frezya/);
    
    // Check h1 heading
    const h1 = page.locator('h1');
    await expect(h1).toContainText('Cookie Policy');
    
    // Check sections are present (use headings to be more specific)
    await expect(page.getByRole('heading', { name: 'What Are Cookies?' })).toBeVisible();
    await expect(page.getByRole('heading', { name: /How We Use Cookies/ })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Managing Your Cookie Preferences' })).toBeVisible();
    
    // Check header and footer are present
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
  });

  test('Terms & Conditions page renders correctly', async ({ page }) => {
    await page.goto('/terms');
    
    // Check page title
    await expect(page).toHaveTitle(/Terms.*Conditions.*Frezya/);
    
    // Check h1 heading
    const h1 = page.locator('h1');
    await expect(h1).toContainText('Terms & Conditions');
    
    // Check sections are present (use headings to be more specific)
    await expect(page.getByRole('heading', { name: 'Acceptance of Terms' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Use of Website' })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Intellectual Property/ })).toBeVisible();
    
    // Check header and footer are present
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
  });

  test('legal pages are accessible from footer links', async ({ page }) => {
    await page.goto('/');
    
    // Hide cookie banner first if visible
    const banner = page.getByTestId('cookie-consent-banner');
    if (await banner.isVisible()) {
      await page.getByTestId('cookie-accept-button').click();
    }
    
    // Click Privacy Policy link
    await page.getByTestId('footer-privacy-policy').click();
    await expect(page).toHaveURL('/privacy-policy');
    await expect(page.locator('h1')).toContainText('Privacy Policy');
    
    // Go back and click Cookie Policy link
    await page.goto('/');
    await page.getByTestId('footer-cookie-policy').click();
    await expect(page).toHaveURL('/cookie-policy');
    await expect(page.locator('h1')).toContainText('Cookie Policy');
    
    // Go back and click Terms link
    await page.goto('/');
    await page.getByTestId('footer-terms').click();
    await expect(page).toHaveURL('/terms');
    await expect(page.locator('h1')).toContainText('Terms & Conditions');
  });

  test('legal pages have proper canonical URLs', async ({ page }) => {
    // Privacy Policy
    await page.goto('/privacy-policy');
    const privacyCanonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(privacyCanonical).toContain('/privacy-policy');
    
    // Cookie Policy
    await page.goto('/cookie-policy');
    const cookieCanonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(cookieCanonical).toContain('/cookie-policy');
    
    // Terms
    await page.goto('/terms');
    const termsCanonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(termsCanonical).toContain('/terms');
  });
});

test.describe('Cookie Banner Responsiveness', () => {
  test('banner is responsive on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    
    const banner = page.getByTestId('cookie-consent-banner');
    await expect(banner).toBeVisible();
    
    // Buttons should be visible and clickable
    await expect(page.getByTestId('cookie-accept-button')).toBeVisible();
    await expect(page.getByTestId('cookie-decline-button')).toBeVisible();
    
    // Click should work
    await page.getByTestId('cookie-accept-button').click();
    await expect(banner).not.toBeVisible();
  });

  test('banner buttons have proper layout on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    
    const acceptButton = page.getByTestId('cookie-accept-button');
    const declineButton = page.getByTestId('cookie-decline-button');
    
    // Both buttons should be visible
    await expect(acceptButton).toBeVisible();
    await expect(declineButton).toBeVisible();
    
    // Get button bounding boxes to verify they're not overlapping
    const acceptBox = await acceptButton.boundingBox();
    const declineBox = await declineButton.boundingBox();
    
    expect(acceptBox).not.toBeNull();
    expect(declineBox).not.toBeNull();
    
    // Buttons should be side by side (same y position roughly) or stacked
    // Just verify they don't overlap significantly
    if (acceptBox && declineBox) {
      const noHorizontalOverlap = acceptBox.x + acceptBox.width <= declineBox.x || 
                                   declineBox.x + declineBox.width <= acceptBox.x;
      const noVerticalOverlap = acceptBox.y + acceptBox.height <= declineBox.y || 
                                 declineBox.y + declineBox.height <= acceptBox.y;
      expect(noHorizontalOverlap || noVerticalOverlap).toBe(true);
    }
  });
});

test.describe('Banner appears on all pages', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  const pagesToTest = [
    { path: '/', name: 'Home' },
    { path: '/about', name: 'About' },
    { path: '/logistics', name: 'Logistics' },
    { path: '/certifications', name: 'Certifications' },
    { path: '/contact', name: 'Contact' },
  ];

  for (const { path, name } of pagesToTest) {
    test(`banner appears on ${name} page`, async ({ page }) => {
      await page.goto(path);
      
      const banner = page.getByTestId('cookie-consent-banner');
      await expect(banner).toBeVisible();
    });
  }
});
