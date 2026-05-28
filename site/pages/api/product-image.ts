import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchProductBySlug } from '@/lib/sanity';

interface ProductImageResponse {
  image: string | null;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProductImageResponse | { error: string }>
) {
  const slugParam = req.query.slug;
  const slug = Array.isArray(slugParam) ? slugParam[0] : slugParam;

  if (!slug) {
    return res.status(400).json({ error: 'Missing product slug' });
  }

  try {
    const product = await fetchProductBySlug(slug);

    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');

    return res.status(200).json({
      image: product?.image || null,
    });
  } catch (error) {
    console.error('Error fetching product image from Sanity:', error);
    return res.status(500).json({ error: 'Failed to fetch product image' });
  }
}
