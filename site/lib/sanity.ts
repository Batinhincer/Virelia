import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { PLACEHOLDER_IMAGE } from './constants';
// Import local data for fallback (used only in this module and seeding scripts)
import {
  products as localProducts,
  categoryInfo as localCategoryInfo,
  getProductBySlug as getLocalProductBySlug,
  getProductsByCategory as getLocalProductsByCategory,
  getCategoryBySlug as getLocalCategoryBySlug,
  getCategoryByName as getLocalCategoryByName,
  getCategorySlug as getLocalCategorySlug,
  getRelatedProducts as getLocalRelatedProducts,
  type Product as LocalProduct,
  type CategoryInfo as LocalCategoryInfo,
} from '@/data/products';

// Sanity configuration
// Server-side variables take precedence over public ones for security
const projectId = process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = process.env.SANITY_API_VERSION || '2024-01-01';

// Check if Sanity is configured
export const isSanityConfigured = Boolean(projectId);

// Create the Sanity client
export const sanityClient = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: process.env.NODE_ENV === 'production',
      token: process.env.SANITY_READ_TOKEN,
    })
  : null;

// Image URL builder
const builder = projectId
  ? imageUrlBuilder({
      projectId,
      dataset,
    })
  : null;

export function urlFor(source: SanityImageSource): string {
  if (!builder || !source) {
    return PLACEHOLDER_IMAGE;
  }
  try {
    return builder.image(source).url();
  } catch {
    return PLACEHOLDER_IMAGE;
  }
}

// Types for Sanity data
export interface SanityProduct {
  _id: string;
  title: string;
  slug: { current: string };
  category: {
    _ref: string;
    title?: string;
    slug?: { current: string };
  };
  shortDescription: string;
  longDescription: string | PortableTextBlock[]; // Can be string or Portable Text
  images?: SanityImageSource[];
  mainImage?: SanityImageSource;
  packaging?: string;
  shelfLife?: string;
  moq?: string;
  origin?: string;
  certifications?: string[];
  hsCode?: string;
  featured?: boolean;
}

export interface SanityCategory {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  richDescription?: PortableTextBlock[];
  heroImage?: SanityImageSource;
}

// Portable Text block type
export interface PortableTextBlock {
  _type: 'block';
  _key: string;
  style?: 'normal' | 'h2' | 'h3' | 'blockquote';
  children: {
    _type: 'span';
    _key: string;
    text: string;
    marks?: string[];
  }[];
  markDefs?: {
    _type: string;
    _key: string;
    href?: string;
  }[];
}

export interface SanityPage {
  _id: string;
  title: string;
  slug: string;
  pageType: 'home' | 'about' | 'logistics' | 'certifications';
  heroTitle?: string;
  heroSubtitle?: string;
  content?: PortableTextBlock[];
  seoTitle?: string;
  seoDescription?: string;
}

// Type guard to check if a value is a PortableTextBlock array
export function isPortableTextArray(value: unknown): value is PortableTextBlock[] {
  return (
    Array.isArray(value) &&
    value.length > 0 &&
    typeof value[0] === 'object' &&
    value[0] !== null &&
    '_type' in value[0] &&
    value[0]._type === 'block'
  );
}

// Utility to extract plain text from Portable Text blocks
export function extractPlainTextFromPortableText(blocks: PortableTextBlock[]): string {
  return blocks
    .map(block => {
      if (block._type === 'block' && block.children) {
        return block.children.map(child => child.text).join('');
      }
      return '';
    })
    .filter(Boolean)
    .join('\n\n');
}

// GROQ Queries
export const queries = {
  // Get all products
  allProducts: `*[_type == "product"] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    longDescription,
    "category": category->title,
    "categorySlug": category->slug.current,
    "image": mainImage.asset->url,
    images,
    packaging,
    shelfLife,
    moq,
    origin,
    certifications,
    hsCode,
    featured
  }`,

  // Get featured products
  featuredProducts: `*[_type == "product" && featured == true] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    "category": category->title,
    "categorySlug": category->slug.current,
    "image": mainImage.asset->url
  }`,

  // Get product by slug
  productBySlug: `*[_type == "product" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    longDescription,
    "category": category->title,
    "categorySlug": category->slug.current,
    "image": mainImage.asset->url,
    images,
    packaging,
    shelfLife,
    moq,
    origin,
    certifications,
    hsCode,
    featured
  }`,

  // Get all categories
  allCategories: `*[_type == "category"] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    description,
    heroImage
  }`,

  // Get category by slug
  categoryBySlug: `*[_type == "category" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    description,
    richDescription,
    heroImage
  }`,

  // Get products by category slug
  productsByCategory: `*[_type == "product" && category->slug.current == $categorySlug] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    "category": category->title,
    "categorySlug": category->slug.current,
    "image": mainImage.asset->url,
    packaging,
    moq,
    origin,
    certifications,
    featured
  }`,

  // Get page by slug
  pageBySlug: `*[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    pageType,
    heroTitle,
    heroSubtitle,
    content,
    seoTitle,
    seoDescription
  }`,

  // Get page by pageType
  pageByType: `*[_type == "page" && pageType == $pageType][0] {
    _id,
    title,
    "slug": slug.current,
    pageType,
    heroTitle,
    heroSubtitle,
    content,
    seoTitle,
    seoDescription
  }`,

  // Get all product slugs for sitemap
  allProductSlugs: `*[_type == "product"] { "slug": slug.current }`,

  // Get all category slugs for sitemap
  allCategorySlugs: `*[_type == "category"] { "slug": slug.current }`,
};

// Fetch functions with fallback support
export async function fetchProducts() {
  if (!sanityClient) return null;
  try {
    return await sanityClient.fetch(queries.allProducts);
  } catch (error) {
    console.error('Error fetching products from Sanity:', error);
    return null;
  }
}

export async function fetchFeaturedProducts() {
  if (!sanityClient) return null;
  try {
    return await sanityClient.fetch(queries.featuredProducts);
  } catch (error) {
    console.error('Error fetching featured products from Sanity:', error);
    return null;
  }
}

export async function fetchProductBySlug(slug: string) {
  if (!sanityClient) return null;
  try {
    return await sanityClient.fetch(queries.productBySlug, { slug });
  } catch (error) {
    console.error('Error fetching product from Sanity:', error);
    return null;
  }
}

export async function fetchCategories() {
  if (!sanityClient) return null;
  try {
    return await sanityClient.fetch(queries.allCategories);
  } catch (error) {
    console.error('Error fetching categories from Sanity:', error);
    return null;
  }
}

// Type for category data returned from Sanity queries
export interface SanityCategoryData {
  _id: string;
  title: string;
  slug: string;
  description: string;
  richDescription: PortableTextBlock[] | null;
  heroImage?: SanityImageSource;
}

export async function fetchCategoryBySlug(slug: string): Promise<SanityCategoryData | null> {
  if (!sanityClient) return null;
  try {
    return await sanityClient.fetch(queries.categoryBySlug, { slug });
  } catch (error) {
    console.error('Error fetching category from Sanity:', error);
    return null;
  }
}

export async function fetchProductsByCategory(categorySlug: string) {
  if (!sanityClient) return null;
  try {
    return await sanityClient.fetch(queries.productsByCategory, { categorySlug });
  } catch (error) {
    console.error('Error fetching products by category from Sanity:', error);
    return null;
  }
}

export async function fetchPageBySlug(slug: string): Promise<SanityPage | null> {
  if (!sanityClient) return null;
  try {
    return await sanityClient.fetch(queries.pageBySlug, { slug });
  } catch (error) {
    console.error('Error fetching page from Sanity:', error);
    return null;
  }
}

export async function fetchPageByType(pageType: SanityPage['pageType']): Promise<SanityPage | null> {
  if (!sanityClient) return null;
  try {
    return await sanityClient.fetch(queries.pageByType, { pageType });
  } catch (error) {
    console.error('Error fetching page by type from Sanity:', error);
    return null;
  }
}

export async function fetchAllSlugs() {
  if (!sanityClient) return { products: [], categories: [] };
  try {
    const [products, categories] = await Promise.all([
      sanityClient.fetch(queries.allProductSlugs),
      sanityClient.fetch(queries.allCategorySlugs),
    ]);
    return { products, categories };
  } catch (error) {
    console.error('Error fetching slugs from Sanity:', error);
    return { products: [], categories: [] };
  }
}

// ========================================================================
// Centralized helper functions for getStaticPaths with local fallback
// ========================================================================

/**
 * Get all product slugs for getStaticPaths.
 * Tries Sanity first, falls back to local data.
 */
export async function getAllProductSlugs(): Promise<string[]> {
  // Try Sanity first
  if (sanityClient) {
    try {
      // The GROQ query `.slug.current` returns an array of strings directly
      const result = await sanityClient.fetch<string[]>(
        `*[_type == "product" && defined(slug.current)].slug.current`
      );
      if (result && result.length > 0) {
        // Filter nulls and duplicates
        const slugs = result.filter((slug): slug is string => typeof slug === 'string' && slug.length > 0);
        return [...new Set(slugs)];
      }
    } catch (error) {
      console.error('Error fetching product slugs from Sanity, falling back to local data:', error);
    }
  }
  
  // Fallback to local data
  const slugs = localProducts.map(p => p.slug).filter(Boolean);
  return [...new Set(slugs)];
}

/**
 * Get all category slugs for getStaticPaths.
 * Tries Sanity first, falls back to local data.
 */
export async function getAllCategorySlugs(): Promise<string[]> {
  // Try Sanity first
  if (sanityClient) {
    try {
      // The GROQ query `.slug.current` returns an array of strings directly
      const result = await sanityClient.fetch<string[]>(
        `*[_type == "category" && defined(slug.current)].slug.current`
      );
      if (result && result.length > 0) {
        // Filter nulls and duplicates
        const slugs = result.filter((slug): slug is string => typeof slug === 'string' && slug.length > 0);
        return [...new Set(slugs)];
      }
    } catch (error) {
      console.error('Error fetching category slugs from Sanity, falling back to local data:', error);
    }
  }
  
  // Fallback to local data - derive unique category slugs from categoryInfo
  const slugs = localCategoryInfo.map(c => c.slug).filter(Boolean);
  return [...new Set(slugs)];
}

// ========================================================================
// Re-export local product helpers for backward compatibility and fallback
// ========================================================================

export {
  localProducts,
  localCategoryInfo,
  getLocalProductBySlug,
  getLocalProductsByCategory,
  getLocalCategoryBySlug,
  getLocalCategoryByName,
  getLocalCategorySlug,
  getLocalRelatedProducts,
};
export type { LocalProduct, LocalCategoryInfo };
