import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

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
    return '/placeholder.jpg';
  }
  return builder.image(source).url();
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
  longDescription: string;
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
  heroImage?: SanityImageSource;
}

export interface SanityPage {
  _id: string;
  title: string;
  slug: { current: string };
  pageType: 'about' | 'logistics' | 'certifications';
  content: unknown[]; // Portable Text blocks
  seoTitle?: string;
  seoDescription?: string;
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
    "image": mainImage.asset->url
  }`,

  // Get page by slug
  pageBySlug: `*[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    pageType,
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

export async function fetchCategoryBySlug(slug: string) {
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

export async function fetchPageBySlug(slug: string) {
  if (!sanityClient) return null;
  try {
    return await sanityClient.fetch(queries.pageBySlug, { slug });
  } catch (error) {
    console.error('Error fetching page from Sanity:', error);
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
