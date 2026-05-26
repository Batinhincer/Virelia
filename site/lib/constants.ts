/**
 * Application constants
 */

/** Default placeholder image used when product images are missing */
export const PLACEHOLDER_IMAGE = '/placeholder.jpg';

/** Site URL for SEO and Open Graph.
 * Force Virelia's production domain if an old Frezya/studio domain is accidentally supplied by Vercel env vars.
 */
const RAW_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.virelias.com';

export const SITE_URL =
  RAW_SITE_URL.includes('frezya.nl') || RAW_SITE_URL.includes('studio.frezya.nl')
    ? 'https://www.virelias.com'
    : RAW_SITE_URL;

/** Official site name for SEO and branding */
export const SITE_NAME = 'Virelia';

/**
 * Constructs an absolute URL using the configured SITE_URL
 * @param path - Relative path (should start with '/')
 * @returns Absolute URL
 */
export function getAbsoluteUrl(path: string): string {
  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  // Remove trailing slash from SITE_URL if present and ensure clean join
  const baseUrl = SITE_URL.replace(/\/$/, '');
  return `${baseUrl}${normalizedPath}`;
}

/**
 * Constructs a canonical URL for the given path
 * @param path - Page path (e.g., '/product/olive-oil')
 * @returns Full canonical URL
 */
export function getCanonicalUrl(path?: string): string {
  if (!path || path === '/') {
    return SITE_URL;
  }
  return getAbsoluteUrl(path);
}
