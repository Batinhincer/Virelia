/**
 * Seed Sanity Studio with categories and products from local data
 * 
 * This script imports data from site/data/products.ts and upserts
 * categories and products into Sanity. Using deterministic IDs ensures
 * re-running does not create duplicates.
 * 
 * Usage:
 *   cd studio
 *   npm run import:seed
 * 
 * Required environment variables:
 *   SANITY_STUDIO_PROJECT_ID - Your Sanity project ID
 *   SANITY_STUDIO_DATASET - Dataset name (defaults to 'production')
 *   SANITY_WRITE_TOKEN - Write token for API mutations
 */

import { createClient } from '@sanity/client';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Import local data - using dynamic import for ES module compatibility
interface Product {
  slug: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  category: string;
  image: string;
  packaging?: string;
  shelfLife?: string;
  moq?: string;
  origin?: string;
  certifications?: string[];
  hsCode?: string;
}

interface CategoryInfo {
  name: string;
  slug: string;
  description: string;
}

// Sanity document types
interface SanityCategory {
  _id: string;
  _type: 'category';
  title: string;
  slug: { _type: 'slug'; current: string };
  description: string;
}

interface SanityProduct {
  _id: string;
  _type: 'product';
  title: string;
  slug: { _type: 'slug'; current: string };
  shortDescription: string;
  longDescription: string;
  category: { _type: 'reference'; _ref: string };
  packaging?: string;
  shelfLife?: string;
  moq?: string;
  origin?: string;
  certifications?: string[];
  hsCode?: string;
}

// Helper function to convert title to kebab-case slug
function toKebabCase(str: string): string {
  return str
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Generate deterministic ID for categories based on slug
function getCategoryId(slug: string): string {
  return `category-${slug}`;
}

// Generate deterministic ID for products based on slug
function getProductId(slug: string): string {
  return `product-${slug}`;
}

async function main(): Promise<void> {
  console.log('🌱 Starting Sanity seed from local data...\n');

  // Validate environment variables
  const projectId = process.env.SANITY_STUDIO_PROJECT_ID;
  const dataset = process.env.SANITY_STUDIO_DATASET || 'production';
  const token = process.env.SANITY_WRITE_TOKEN;

  if (!projectId) {
    console.error('❌ Error: SANITY_STUDIO_PROJECT_ID is not set');
    process.exit(1);
  }

  if (!token) {
    console.error('❌ Error: SANITY_WRITE_TOKEN is not set');
    console.error('   Please add a write token to your .env file');
    process.exit(1);
  }

  // Create Sanity client with write access
  const client = createClient({
    projectId,
    dataset,
    token,
    apiVersion: '2024-01-01',
    useCdn: false,
  });

  console.log(`📡 Connected to Sanity project: ${projectId}`);
  console.log(`📂 Dataset: ${dataset}\n`);

  // Dynamically import the local data
  // Using require for CommonJS compatibility with ts-node
  const productsDataPath = path.resolve(__dirname, '../../site/data/products.ts');
  
  // Use dynamic import with ts-node
  let products: Product[];
  let categoryInfo: CategoryInfo[];
  
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const data = require(productsDataPath);
    products = data.products;
    categoryInfo = data.categoryInfo;
    
    if (!products || !Array.isArray(products)) {
      throw new Error('products array not found in site/data/products.ts');
    }
    if (!categoryInfo || !Array.isArray(categoryInfo)) {
      throw new Error('categoryInfo array not found in site/data/products.ts');
    }
  } catch (error) {
    console.error('❌ Error loading local data:', error);
    process.exit(1);
  }

  console.log(`📦 Found ${products.length} products`);
  console.log(`📁 Found ${categoryInfo.length} categories\n`);

  // Step 1: Upsert categories first
  console.log('📁 Upserting categories...');
  
  const categoryMap = new Map<string, string>(); // category name -> _id
  
  for (const cat of categoryInfo) {
    const categoryId = getCategoryId(cat.slug);
    categoryMap.set(cat.name, categoryId);
    
    const sanityCategory: SanityCategory = {
      _id: categoryId,
      _type: 'category',
      title: cat.name,
      slug: {
        _type: 'slug',
        current: cat.slug,
      },
      description: cat.description,
    };

    try {
      await client.createOrReplace(sanityCategory);
      console.log(`   ✅ ${cat.name} (${categoryId})`);
    } catch (error) {
      console.error(`   ❌ Failed to upsert category "${cat.name}":`, error);
      process.exit(1);
    }
  }

  console.log(`\n✅ Successfully upserted ${categoryInfo.length} categories\n`);

  // Step 2: Upsert products with category references
  console.log('📦 Upserting products...');
  
  let successCount = 0;
  let errorCount = 0;

  for (const product of products) {
    const productId = getProductId(product.slug);
    
    // Find the category info for this product's category
    const catInfo = categoryInfo.find(c => c.name === product.category);
    let categorySlug: string;
    
    if (catInfo) {
      categorySlug = catInfo.slug;
    } else {
      // Fallback: derive slug from category name
      categorySlug = toKebabCase(product.category);
      console.warn(`   ⚠️  Category "${product.category}" not found in categoryInfo, using derived slug: ${categorySlug}`);
    }
    
    const categoryId = getCategoryId(categorySlug);
    
    // Check if category exists in our map (should have been created above)
    if (!categoryMap.has(product.category)) {
      // Create category on the fly if it wasn't in categoryInfo
      const newCategoryId = getCategoryId(categorySlug);
      const newCategory: SanityCategory = {
        _id: newCategoryId,
        _type: 'category',
        title: product.category,
        slug: {
          _type: 'slug',
          current: categorySlug,
        },
        description: '',
      };
      
      try {
        await client.createOrReplace(newCategory);
        categoryMap.set(product.category, newCategoryId);
        console.log(`   📁 Created missing category: ${product.category}`);
      } catch (error) {
        console.error(`   ❌ Failed to create category "${product.category}":`, error);
      }
    }

    const sanityProduct: SanityProduct = {
      _id: productId,
      _type: 'product',
      title: product.title,
      slug: {
        _type: 'slug',
        current: product.slug,
      },
      shortDescription: product.shortDesc,
      longDescription: product.longDesc,
      category: {
        _type: 'reference',
        _ref: categoryId,
      },
    };

    // Add optional fields if present
    if (product.packaging) {
      sanityProduct.packaging = product.packaging;
    }
    if (product.shelfLife) {
      sanityProduct.shelfLife = product.shelfLife;
    }
    if (product.moq) {
      sanityProduct.moq = product.moq;
    }
    if (product.origin) {
      sanityProduct.origin = product.origin;
    }
    if (product.certifications && product.certifications.length > 0) {
      sanityProduct.certifications = product.certifications;
    }
    if (product.hsCode) {
      sanityProduct.hsCode = product.hsCode;
    }

    try {
      await client.createOrReplace(sanityProduct);
      console.log(`   ✅ ${product.title} (${productId})`);
      successCount++;
    } catch (error) {
      console.error(`   ❌ Failed to upsert product "${product.title}":`, error);
      errorCount++;
    }
  }

  console.log(`\n${'='.repeat(50)}`);
  console.log('📊 Seed Summary:');
  console.log(`   Categories: ${categoryInfo.length} upserted`);
  console.log(`   Products: ${successCount} upserted, ${errorCount} failed`);
  console.log('='.repeat(50));

  if (errorCount > 0) {
    console.log('\n⚠️  Some items failed to sync. Check the errors above.');
    process.exit(1);
  }

  console.log('\n🎉 Seed completed successfully!');
}

main().catch((error: Error) => {
  console.error('\n❌ Unexpected error:', error);
  process.exit(1);
});
