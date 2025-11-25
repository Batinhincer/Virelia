import { test, expect } from '@playwright/test';

test.describe('Product Inquiry Form', () => {
  test.describe('Form Visibility and Scroll', () => {
    test('Request Product Information CTA scrolls to inquiry form', async ({ page }) => {
      await page.goto('/product/olive-oil');

      const requestInfoCta = page.getByTestId('request-info-cta');
      await expect(requestInfoCta).toBeVisible();

      // Click should scroll to inquiry form
      await requestInfoCta.click();

      // The inquiry section should be visible after click
      const inquirySection = page.getByTestId('inquiry-form-section');
      await expect(inquirySection).toBeVisible();

      // Wait for scroll animation
      await page.waitForTimeout(500);

      // Verify the form is in viewport
      const isInViewport = await inquirySection.evaluate((el) => {
        const rect = el.getBoundingClientRect();
        return rect.top >= 0 && rect.top < window.innerHeight;
      });
      expect(isInViewport).toBe(true);
    });

    test('product context box shows product name and category', async ({ page }) => {
      await page.goto('/product/olive-oil');

      // Scroll to form
      const inquirySection = page.getByTestId('inquiry-form-section');
      await inquirySection.scrollIntoViewIfNeeded();

      // Check product context box is visible
      const contextBox = page.getByTestId('product-context-box');
      await expect(contextBox).toBeVisible();

      // Verify it contains product name
      await expect(contextBox).toContainText('Olive Oil');

      // Verify it contains category
      await expect(contextBox).toContainText('Oils & Condiments');
    });
  });

  test.describe('Form Validation', () => {
    test('submitting empty form shows validation errors', async ({ page }) => {
      await page.goto('/product/olive-oil');

      // Scroll to form
      const inquirySection = page.getByTestId('inquiry-form-section');
      await inquirySection.scrollIntoViewIfNeeded();

      // Submit empty form
      const submitButton = page.getByTestId('submit-button');
      await submitButton.click();

      // Check validation errors appear
      const validationSummary = page.getByTestId('validation-summary');
      await expect(validationSummary).toBeVisible();
      await expect(validationSummary).toContainText('error');

      // Check individual error messages
      await expect(page.getByTestId('fullName-error')).toBeVisible();
      await expect(page.getByTestId('companyName-error')).toBeVisible();
      await expect(page.getByTestId('email-error')).toBeVisible();
      await expect(page.getByTestId('country-error')).toBeVisible();
      await expect(page.getByTestId('message-error')).toBeVisible();
    });

    test('email validation shows error for invalid email', async ({ page }) => {
      await page.goto('/product/olive-oil');

      const emailInput = page.getByTestId('email-input');
      await emailInput.scrollIntoViewIfNeeded();
      await emailInput.fill('invalid-email');

      // Submit form
      const submitButton = page.getByTestId('submit-button');
      await submitButton.click();

      // Check email error
      const emailError = page.getByTestId('email-error');
      await expect(emailError).toBeVisible();
      await expect(emailError).toContainText('valid email');
    });

    test('message validation shows error for short message', async ({ page }) => {
      await page.goto('/product/olive-oil');

      const messageInput = page.getByTestId('message-input');
      await messageInput.scrollIntoViewIfNeeded();
      await messageInput.fill('Short');

      // Submit form
      const submitButton = page.getByTestId('submit-button');
      await submitButton.click();

      // Check message error
      const messageError = page.getByTestId('message-error');
      await expect(messageError).toBeVisible();
      await expect(messageError).toContainText('at least');
    });

    test('clearing a field with error clears the error on input', async ({ page }) => {
      await page.goto('/product/olive-oil');

      // Submit empty form first to show errors
      const submitButton = page.getByTestId('submit-button');
      await submitButton.scrollIntoViewIfNeeded();
      await submitButton.click();

      // Error should be visible
      await expect(page.getByTestId('fullName-error')).toBeVisible();

      // Start typing in the field
      const fullNameInput = page.getByTestId('fullName-input');
      await fullNameInput.fill('John Doe');

      // Error should be cleared
      await expect(page.getByTestId('fullName-error')).not.toBeVisible();
    });
  });

  test.describe('Form Submission', () => {
    test('valid form submission shows success message', async ({ page }) => {
      // Mock the API to add a delay so we can test the loading state
      await page.route('/api/inquiry', async (route) => {
        // Small delay to allow testing the loading state
        await new Promise((resolve) => setTimeout(resolve, 500));
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ message: 'Inquiry submitted successfully' }),
        });
      });

      await page.goto('/product/olive-oil');

      // Fill out the form
      await page.getByTestId('fullName-input').fill('John Doe');
      await page.getByTestId('companyName-input').fill('Test Company Ltd');
      await page.getByTestId('email-input').fill('john@testcompany.com');
      await page.getByTestId('country-input').fill('Netherlands');
      await page.getByTestId('message-input').fill('I am interested in ordering olive oil for my company. Please send me a quote.');

      // Submit form
      const submitButton = page.getByTestId('submit-button');
      await submitButton.scrollIntoViewIfNeeded();
      await submitButton.click();

      // Button should show "Sending..." while submitting
      await expect(submitButton).toContainText('Sending');
      await expect(submitButton).toBeDisabled();

      // Wait for success message
      const successMessage = page.getByTestId('success-message');
      await expect(successMessage).toBeVisible({ timeout: 5000 });
      await expect(successMessage).toContainText('Thank you');
      await expect(successMessage).toContainText('Olive Oil');

      // Form should be reset
      await expect(page.getByTestId('fullName-input')).toHaveValue('');
      await expect(page.getByTestId('message-input')).toHaveValue('');
    });

    test('submit button is disabled while form is submitting', async ({ page }) => {
      // Mock the API to add a delay so we can test the disabled state
      await page.route('/api/inquiry', async (route) => {
        // Small delay to allow testing the loading state
        await new Promise((resolve) => setTimeout(resolve, 500));
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ message: 'Inquiry submitted successfully' }),
        });
      });

      await page.goto('/product/olive-oil');

      // Fill out the form
      await page.getByTestId('fullName-input').fill('John Doe');
      await page.getByTestId('companyName-input').fill('Test Company Ltd');
      await page.getByTestId('email-input').fill('john@testcompany.com');
      await page.getByTestId('country-input').fill('Netherlands');
      await page.getByTestId('message-input').fill('I am interested in ordering olive oil.');

      // Submit form
      const submitButton = page.getByTestId('submit-button');
      await submitButton.click();

      // Button should be disabled
      await expect(submitButton).toBeDisabled();

      // Wait for submission to complete
      await expect(submitButton).not.toBeDisabled({ timeout: 5000 });
    });
  });

  test.describe('Accessibility', () => {
    test('form fields have proper labels', async ({ page }) => {
      await page.goto('/product/olive-oil');

      // Check that labels are associated with inputs
      const fullNameInput = page.getByTestId('fullName-input');
      await fullNameInput.scrollIntoViewIfNeeded();
      const fullNameId = await fullNameInput.getAttribute('id');
      const fullNameLabel = page.locator(`label[for="${fullNameId}"]`);
      await expect(fullNameLabel).toBeVisible();
      await expect(fullNameLabel).toContainText('Full Name');
    });

    test('error messages have role=alert', async ({ page }) => {
      await page.goto('/product/olive-oil');

      // Submit empty form
      const submitButton = page.getByTestId('submit-button');
      await submitButton.scrollIntoViewIfNeeded();
      await submitButton.click();

      // Check error messages have role="alert"
      const errorMessage = page.getByTestId('fullName-error');
      await expect(errorMessage).toHaveAttribute('role', 'alert');
    });

    test('required fields have aria-required attribute', async ({ page }) => {
      await page.goto('/product/olive-oil');

      const fullNameInput = page.getByTestId('fullName-input');
      await fullNameInput.scrollIntoViewIfNeeded();
      await expect(fullNameInput).toHaveAttribute('aria-required', 'true');
    });

    test('invalid fields have aria-invalid attribute', async ({ page }) => {
      await page.goto('/product/olive-oil');

      // Submit empty form
      const submitButton = page.getByTestId('submit-button');
      await submitButton.scrollIntoViewIfNeeded();
      await submitButton.click();

      // Check aria-invalid is set
      const fullNameInput = page.getByTestId('fullName-input');
      await expect(fullNameInput).toHaveAttribute('aria-invalid', 'true');
    });

    test('success/error messages have aria-live for screen readers', async ({ page }) => {
      await page.goto('/product/olive-oil');

      // Fill and submit form
      await page.getByTestId('fullName-input').fill('John Doe');
      await page.getByTestId('companyName-input').fill('Test Company');
      await page.getByTestId('email-input').fill('john@test.com');
      await page.getByTestId('country-input').fill('Netherlands');
      await page.getByTestId('message-input').fill('Test message for inquiry form');

      const submitButton = page.getByTestId('submit-button');
      await submitButton.click();

      const successMessage = page.getByTestId('success-message');
      await expect(successMessage).toBeVisible({ timeout: 5000 });
      await expect(successMessage).toHaveAttribute('aria-live', 'polite');
    });
  });
});

test.describe('Contact Page', () => {
  test.describe('Basic Rendering', () => {
    test('contact page renders correctly', async ({ page }) => {
      await page.goto('/contact');

      await expect(page).toHaveTitle(/Contact.*Frezya/);

      const h1 = page.locator('h1');
      await expect(h1).toContainText('Contact Us');

      // Form should be present
      const inquiryForm = page.getByTestId('inquiry-form');
      await expect(inquiryForm).toBeVisible();
    });

    test('contact information is displayed', async ({ page }) => {
      await page.goto('/contact');

      // Email (in main content, not footer)
      const mainContent = page.locator('main, section').filter({ has: page.locator('h1') }).first();
      await expect(page.getByRole('link', { name: 'batinhincer@frezya.nl' }).first()).toBeVisible();

      // Phone
      await expect(page.getByRole('link', { name: '+90 507 707 54 07' }).first()).toBeVisible();

      // Business hours
      await expect(page.getByText(/Monday - Friday/).first()).toBeVisible();
    });
  });

  test.describe('Query Parameter Context', () => {
    test('shows product context when product query param is provided', async ({ page }) => {
      await page.goto('/contact?product=Olive+Oil&category=Oils+%26+Condiments');

      // Context box should be visible
      const contextBox = page.getByTestId('contact-product-context');
      await expect(contextBox).toBeVisible();

      // Should show product name
      const productName = page.getByTestId('contact-product-name');
      await expect(productName).toContainText('Olive Oil');

      // Should show category
      const productCategory = page.getByTestId('contact-product-category');
      await expect(productCategory).toContainText('Oils & Condiments');
    });

    test('shows product context without category', async ({ page }) => {
      await page.goto('/contact?product=Test+Product');

      const contextBox = page.getByTestId('contact-product-context');
      await expect(contextBox).toBeVisible();

      const productName = page.getByTestId('contact-product-name');
      await expect(productName).toContainText('Test Product');

      // Category should not be visible
      await expect(page.getByTestId('contact-product-category')).not.toBeVisible();
    });

    test('no product context shown without query params', async ({ page }) => {
      await page.goto('/contact');

      // Context box should not be visible
      const contextBox = page.getByTestId('contact-product-context');
      await expect(contextBox).not.toBeVisible();
    });
  });

  test.describe('Form Functionality', () => {
    test('form submission works on contact page', async ({ page }) => {
      await page.goto('/contact');

      // Fill out the form
      await page.getByTestId('fullName-input').fill('Jane Smith');
      await page.getByTestId('companyName-input').fill('Smith Distributors');
      await page.getByTestId('email-input').fill('jane@smithdist.com');
      await page.getByTestId('country-input').fill('Germany');
      await page.getByTestId('message-input').fill('I would like to learn more about becoming a distributor.');

      // Submit form
      const submitButton = page.getByTestId('submit-button');
      await submitButton.click();

      // Wait for success message
      const successMessage = page.getByTestId('success-message');
      await expect(successMessage).toBeVisible({ timeout: 5000 });
      await expect(successMessage).toContainText('Thank you');
    });

    test('validation works on contact page', async ({ page }) => {
      await page.goto('/contact');

      // Submit empty form
      const submitButton = page.getByTestId('submit-button');
      await submitButton.click();

      // Validation summary should appear
      const validationSummary = page.getByTestId('validation-summary');
      await expect(validationSummary).toBeVisible();
    });
  });

  test.describe('Navigation', () => {
    test('breadcrumb shows correct navigation', async ({ page }) => {
      await page.goto('/contact');

      const breadcrumb = page.getByTestId('breadcrumb');
      await expect(breadcrumb).toBeVisible();

      // Should contain Home link
      const homeLink = page.getByTestId('breadcrumb-link-home');
      await expect(homeLink).toBeVisible();

      // Should show current page
      const currentPage = page.getByTestId('breadcrumb-current');
      await expect(currentPage).toContainText('Contact');
    });
  });
});

test.describe('CTA Integration', () => {
  test('CTAStrip links to contact page', async ({ page }) => {
    await page.goto('/product/olive-oil');

    // Find the CTA Strip
    const ctaStripLink = page.locator('a[href="/contact"]').filter({ hasText: 'Request a Quote' }).first();
    await ctaStripLink.scrollIntoViewIfNeeded();
    await expect(ctaStripLink).toBeVisible();

    // Click should navigate to contact page
    await ctaStripLink.click();
    await expect(page).toHaveURL('/contact');
  });

  test('Footer Request a Quote links to contact page', async ({ page }) => {
    await page.goto('/');

    // Scroll to footer
    const footer = page.locator('footer');
    await footer.scrollIntoViewIfNeeded();

    // Find the Request a Quote link in footer
    const footerLink = footer.locator('a[href="/contact"]').filter({ hasText: 'Request a Quote' });
    await expect(footerLink).toBeVisible();

    // Click should navigate to contact page
    await footerLink.click();
    await expect(page).toHaveURL('/contact');
  });
});
