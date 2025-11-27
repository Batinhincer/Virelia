/**
 * Analytics configuration and helpers
 *
 * This module provides provider-agnostic analytics support.
 * Analytics are only loaded in production when:
 * 1. NEXT_PUBLIC_ANALYTICS_ID is set and valid
 * 2. User has accepted cookie consent
 */

/**
 * Regex pattern for valid GA4 Measurement IDs.
 * Format: G-XXXXXXXXXX (G- followed by alphanumeric characters)
 */
const GA4_ID_PATTERN = /^G-[A-Z0-9]+$/i;

/**
 * The analytics ID from environment variable.
 * This is a public env var and will be included in the client bundle.
 */
export const ANALYTICS_ID = process.env.NEXT_PUBLIC_ANALYTICS_ID || '';

/**
 * Validate that the analytics ID matches expected GA4 format.
 * Returns true if the ID is valid, false otherwise.
 */
export function isValidAnalyticsId(id: string): boolean {
  return GA4_ID_PATTERN.test(id);
}

/**
 * Check if analytics configuration is valid (env var and production mode).
 * This does NOT check consent - use isAnalyticsAllowed() for that.
 */
export function isAnalyticsEnabled(): boolean {
  return process.env.NODE_ENV === 'production' && !!ANALYTICS_ID && isValidAnalyticsId(ANALYTICS_ID);
}

/**
 * Check if user has accepted cookie consent (SSR-safe).
 * Returns true only if consent is explicitly "accepted".
 */
export function hasAnalyticsConsent(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  return localStorage.getItem('frezya-cookie-consent') === 'accepted';
}

/**
 * Check if analytics should be allowed (config valid AND consent given).
 * This is the main check to use before loading analytics scripts.
 */
export function isAnalyticsAllowed(): boolean {
  return isAnalyticsEnabled() && hasAnalyticsConsent();
}

/**
 * Get the Google Analytics (GA4) script URL.
 * Returns empty string if analytics is not enabled or ID is invalid.
 */
export function getGA4ScriptUrl(): string {
  if (!isAnalyticsEnabled()) {
    return '';
  }
  return `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ANALYTICS_ID)}`;
}

/**
 * Get the inline GA4 initialization script.
 * Returns empty string if analytics is not enabled or ID is invalid.
 */
export function getGA4InitScript(): string {
  if (!isAnalyticsEnabled()) {
    return '';
  }
  // ANALYTICS_ID is already validated to match GA4 format (G-XXXXXXXXXX)
  // which only contains safe alphanumeric characters
  return `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${ANALYTICS_ID}');
  `;
}
