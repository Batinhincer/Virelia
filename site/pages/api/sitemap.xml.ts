import type { NextApiRequest, NextApiResponse } from 'next';
import { products, categoryInfo } from '@/data/products';
import { fetchAllSlugs, isSanityConfigured } from '@/lib/sanity';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://frezya.nl';

// Static pages with their priorities and change frequencies
const staticPages = [
  { url: '/', priority: 1.0, changefreq: 'weekly' },
  { url: '/about', priority: 0.8, changefreq: 'monthly' },
  { url: '/logistics', priority: 0.8, changefreq: 'monthly' },
  { url: '/certifications', priority: 0.8, changefreq: 'monthly' },
];

function generateSitemap(
  productSlugs: string[],
  categorySlugs: string[],
  lastmod: string
): string {
  const staticUrls = staticPages
    .map(
      (page) => `
  <url>
    <loc>${SITE_URL}${page.url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
    )
    .join('');

  const categoryUrls = categorySlugs
    .map(
      (slug) => `
  <url>
    <loc>${SITE_URL}/products/${slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`
    )
    .join('');

  const productUrls = productSlugs
    .map(
      (slug) => `
  <url>
    <loc>${SITE_URL}/product/${slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`
    )
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticUrls}
${categoryUrls}
${productUrls}
</urlset>`;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const lastmod = new Date().toISOString().split('T')[0];

  let productSlugs: string[] = [];
  let categorySlugs: string[] = [];

  // Try to get slugs from Sanity first
  if (isSanityConfigured) {
    try {
      const sanityData = await fetchAllSlugs();
      if (sanityData.products.length > 0) {
        productSlugs = sanityData.products.map((p: { slug: string }) => p.slug);
      }
      if (sanityData.categories.length > 0) {
        categorySlugs = sanityData.categories.map((c: { slug: string }) => c.slug);
      }
    } catch (error) {
      console.error('Error fetching from Sanity for sitemap:', error);
    }
  }

  // Fall back to local data if Sanity data is not available
  if (productSlugs.length === 0) {
    productSlugs = products.map((p) => p.slug);
  }
  if (categorySlugs.length === 0) {
    categorySlugs = categoryInfo.map((c) => c.slug);
  }

  const sitemap = generateSitemap(productSlugs, categorySlugs, lastmod);

  res.setHeader('Content-Type', 'application/xml');
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate');
  res.status(200).send(sitemap);
}
