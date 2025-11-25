import { test, expect } from '@playwright/test';

/**
 * Tests for /api/inquiry endpoint
 * These tests verify that the API correctly handles inquiry submissions
 * including the new metadata fields and Sanity integration.
 */

test.describe('Inquiry API', () => {
  const validInquiryFromProductPage = {
    fullName: 'John Doe',
    companyName: 'Test Company Ltd',
    email: 'john@testcompany.com',
    country: 'Netherlands',
    phone: '+31 20 123 4567',
    message: 'I am interested in ordering olive oil for my company. Please send me a quote.',
    productName: 'Olive Oil',
    productSlug: 'olive-oil',
    productCategory: 'Oils & Condiments',
    urlPath: '/product/olive-oil',
  };

  const validInquiryFromContactPage = {
    fullName: 'Jane Smith',
    companyName: 'Smith Distributors',
    email: 'jane@smithdist.com',
    country: 'Germany',
    message: 'I would like to learn more about becoming a distributor.',
    urlPath: '/contact',
  };

  test.describe('Valid Submissions', () => {
    test('returns 200 for valid inquiry from product page with all metadata', async ({ request }) => {
      const response = await request.post('/api/inquiry', {
        data: validInquiryFromProductPage,
      });

      expect(response.status()).toBe(200);
      const body = await response.json();
      expect(body.message).toMatch(/received|submitted/);
    });

    test('returns 200 for valid inquiry from contact page without product info', async ({ request }) => {
      const response = await request.post('/api/inquiry', {
        data: validInquiryFromContactPage,
      });

      expect(response.status()).toBe(200);
      const body = await response.json();
      expect(body.message).toMatch(/received|submitted/);
    });

    test('returns 200 with optional phone field omitted', async ({ request }) => {
      const inquiryWithoutPhone = { ...validInquiryFromProductPage };
      delete (inquiryWithoutPhone as Record<string, unknown>).phone;

      const response = await request.post('/api/inquiry', {
        data: inquiryWithoutPhone,
      });

      expect(response.status()).toBe(200);
    });

    test('returns 200 without product metadata (general inquiry)', async ({ request }) => {
      const generalInquiry = {
        fullName: 'Test User',
        companyName: 'Test Company',
        email: 'test@example.com',
        country: 'France',
        message: 'This is a general inquiry about your services.',
        urlPath: '/other-page',
      };

      const response = await request.post('/api/inquiry', {
        data: generalInquiry,
      });

      expect(response.status()).toBe(200);
    });
  });

  test.describe('Validation Errors', () => {
    test('returns 400 when fullName is missing', async ({ request }) => {
      const invalidInquiry = { ...validInquiryFromProductPage };
      delete (invalidInquiry as Record<string, unknown>).fullName;

      const response = await request.post('/api/inquiry', {
        data: invalidInquiry,
      });

      expect(response.status()).toBe(400);
      const body = await response.json();
      expect(body.message).toContain('required');
    });

    test('returns 400 when companyName is missing', async ({ request }) => {
      const invalidInquiry = { ...validInquiryFromProductPage };
      delete (invalidInquiry as Record<string, unknown>).companyName;

      const response = await request.post('/api/inquiry', {
        data: invalidInquiry,
      });

      expect(response.status()).toBe(400);
      const body = await response.json();
      expect(body.message).toContain('required');
    });

    test('returns 400 when email is missing', async ({ request }) => {
      const invalidInquiry = { ...validInquiryFromProductPage };
      delete (invalidInquiry as Record<string, unknown>).email;

      const response = await request.post('/api/inquiry', {
        data: invalidInquiry,
      });

      expect(response.status()).toBe(400);
      const body = await response.json();
      expect(body.message).toContain('required');
    });

    test('returns 400 when email format is invalid', async ({ request }) => {
      const invalidInquiry = { ...validInquiryFromProductPage, email: 'invalid-email' };

      const response = await request.post('/api/inquiry', {
        data: invalidInquiry,
      });

      expect(response.status()).toBe(400);
      const body = await response.json();
      expect(body.message.toLowerCase()).toContain('email');
    });

    test('returns 400 when country is missing', async ({ request }) => {
      const invalidInquiry = { ...validInquiryFromProductPage };
      delete (invalidInquiry as Record<string, unknown>).country;

      const response = await request.post('/api/inquiry', {
        data: invalidInquiry,
      });

      expect(response.status()).toBe(400);
      const body = await response.json();
      expect(body.message).toContain('required');
    });

    test('returns 400 when message is missing', async ({ request }) => {
      const invalidInquiry = { ...validInquiryFromProductPage };
      delete (invalidInquiry as Record<string, unknown>).message;

      const response = await request.post('/api/inquiry', {
        data: invalidInquiry,
      });

      expect(response.status()).toBe(400);
      const body = await response.json();
      expect(body.message).toContain('required');
    });
  });

  test.describe('HTTP Method Handling', () => {
    test('returns 405 for GET request', async ({ request }) => {
      const response = await request.get('/api/inquiry');
      expect(response.status()).toBe(405);
    });

    test('returns 405 for PUT request', async ({ request }) => {
      const response = await request.put('/api/inquiry', {
        data: validInquiryFromProductPage,
      });
      expect(response.status()).toBe(405);
    });

    test('returns 405 for DELETE request', async ({ request }) => {
      const response = await request.delete('/api/inquiry');
      expect(response.status()).toBe(405);
    });
  });

  test.describe('Request Body Fields', () => {
    test('request accepts productSlug field', async ({ request }) => {
      const inquiry = {
        ...validInquiryFromContactPage,
        productSlug: 'test-product',
      };

      const response = await request.post('/api/inquiry', {
        data: inquiry,
      });

      // Should return 200 (or development mode message)
      expect(response.status()).toBe(200);
    });

    test('request accepts productName field', async ({ request }) => {
      const inquiry = {
        ...validInquiryFromContactPage,
        productName: 'Test Product',
      };

      const response = await request.post('/api/inquiry', {
        data: inquiry,
      });

      expect(response.status()).toBe(200);
    });

    test('request accepts productCategory field', async ({ request }) => {
      const inquiry = {
        ...validInquiryFromContactPage,
        productCategory: 'Test Category',
      };

      const response = await request.post('/api/inquiry', {
        data: inquiry,
      });

      expect(response.status()).toBe(200);
    });

    test('request accepts urlPath field', async ({ request }) => {
      const inquiry = {
        ...validInquiryFromContactPage,
        urlPath: '/custom/path',
      };

      const response = await request.post('/api/inquiry', {
        data: inquiry,
      });

      expect(response.status()).toBe(200);
    });
  });
});

test.describe('Inquiry Form E2E - API Integration', () => {
  test('form submission on product page sends correct metadata to API', async ({ page }) => {
    // Intercept API requests
    let capturedRequest: { body: Record<string, unknown> } | null = null;
    
    await page.route('/api/inquiry', async (route, request) => {
      capturedRequest = {
        body: JSON.parse(request.postData() || '{}'),
      };
      
      // Return a mock successful response
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Inquiry received (development mode - email not sent)' }),
      });
    });

    await page.goto('/product/olive-oil');

    // Fill out the form
    await page.getByTestId('fullName-input').fill('John Doe');
    await page.getByTestId('companyName-input').fill('Test Company Ltd');
    await page.getByTestId('email-input').fill('john@testcompany.com');
    await page.getByTestId('country-input').fill('Netherlands');
    await page.getByTestId('message-input').fill('I am interested in ordering olive oil for my company.');

    // Submit form
    const submitButton = page.getByTestId('submit-button');
    await submitButton.scrollIntoViewIfNeeded();
    await submitButton.click();

    // Wait for success message
    await expect(page.getByTestId('success-message')).toBeVisible({ timeout: 5000 });

    // Verify the captured request contains the expected metadata
    expect(capturedRequest).not.toBeNull();
    expect(capturedRequest!.body.fullName).toBe('John Doe');
    expect(capturedRequest!.body.companyName).toBe('Test Company Ltd');
    expect(capturedRequest!.body.email).toBe('john@testcompany.com');
    expect(capturedRequest!.body.country).toBe('Netherlands');
    expect(capturedRequest!.body.productName).toBe('Olive Oil');
    expect(capturedRequest!.body.productSlug).toBe('olive-oil');
    expect(capturedRequest!.body.productCategory).toBe('Oils & Condiments');
    expect(capturedRequest!.body.urlPath).toContain('/product/olive-oil');
  });

  test('form submission on contact page sends urlPath without product metadata', async ({ page }) => {
    let capturedRequest: { body: Record<string, unknown> } | null = null;
    
    await page.route('/api/inquiry', async (route, request) => {
      capturedRequest = {
        body: JSON.parse(request.postData() || '{}'),
      };
      
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Inquiry received (development mode - email not sent)' }),
      });
    });

    await page.goto('/contact');

    // Fill out the form
    await page.getByTestId('fullName-input').fill('Jane Smith');
    await page.getByTestId('companyName-input').fill('Smith Distributors');
    await page.getByTestId('email-input').fill('jane@smithdist.com');
    await page.getByTestId('country-input').fill('Germany');
    await page.getByTestId('message-input').fill('I would like to learn more about your products.');

    // Submit form
    const submitButton = page.getByTestId('submit-button');
    await submitButton.scrollIntoViewIfNeeded();
    await submitButton.click();

    // Wait for success message
    await expect(page.getByTestId('success-message')).toBeVisible({ timeout: 5000 });

    // Verify the captured request
    expect(capturedRequest).not.toBeNull();
    expect(capturedRequest!.body.fullName).toBe('Jane Smith');
    expect(capturedRequest!.body.urlPath).toContain('/contact');
    // Product fields should be undefined on contact page (general contact mode)
    expect(capturedRequest!.body.productName).toBeUndefined();
    expect(capturedRequest!.body.productSlug).toBeUndefined();
  });

  test('success message shows system logged note', async ({ page }) => {
    await page.route('/api/inquiry', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Inquiry submitted successfully' }),
      });
    });

    await page.goto('/product/olive-oil');

    // Fill and submit form
    await page.getByTestId('fullName-input').fill('John Doe');
    await page.getByTestId('companyName-input').fill('Test Company');
    await page.getByTestId('email-input').fill('john@test.com');
    await page.getByTestId('country-input').fill('Netherlands');
    await page.getByTestId('message-input').fill('Test message for inquiry form');

    const submitButton = page.getByTestId('submit-button');
    await submitButton.click();

    // Wait for success message
    const successMessage = page.getByTestId('success-message');
    await expect(successMessage).toBeVisible({ timeout: 5000 });
    
    // Verify the updated success message includes the system logged note
    await expect(successMessage).toContainText('logged in our system');
    await expect(successMessage).toContainText('export team');
  });
});
