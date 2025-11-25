import { createClient } from '@sanity/client';

/**
 * Server-only Sanity client for write operations.
 * This client uses SANITY_WRITE_TOKEN and must NEVER be imported in client-side code.
 * Only use in API routes or server-side code.
 */

// Sanity configuration - same as read client
const projectId = process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = process.env.SANITY_API_VERSION || '2024-01-01';

// Write token - only available server-side
const writeToken = process.env.SANITY_WRITE_TOKEN;

// Check if write client can be configured
export const isSanityWriteConfigured = Boolean(projectId && writeToken);

// Create the write-enabled Sanity client (only if configured)
export const sanityWriteClient = (projectId && writeToken)
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false, // Write operations should never use CDN
      token: writeToken,
    })
  : null;

/**
 * Inquiry document type for Sanity
 */
export interface SanityInquiryDocument {
  _type: 'inquiry';
  name: string;
  email: string;
  company: string;
  country: string;
  phone?: string;
  message: string;
  productName?: string;
  productSlug?: string;
  productCategory?: string;
  source: 'product-page' | 'contact-page' | 'other';
  urlPath: string;
  createdAt: string;
  status: 'new' | 'in-progress' | 'closed';
}

/**
 * Creates an inquiry document in Sanity.
 * Returns the created document ID or null if the operation fails or is not configured.
 * 
 * @param inquiry - The inquiry document to create
 * @returns The created document ID or null
 */
export async function createInquiry(inquiry: SanityInquiryDocument): Promise<string | null> {
  if (!sanityWriteClient) {
    // Gracefully skip if write client is not configured
    return null;
  }

  try {
    const result = await sanityWriteClient.create(inquiry);
    return result._id;
  } catch (error) {
    // Log error without sensitive details
    console.error('Failed to create inquiry in Sanity:', error instanceof Error ? error.message : 'Unknown error');
    return null;
  }
}
