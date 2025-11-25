/**
 * Import products from CSV file into Sanity
 *
 * This script imports product data from a CSV file and upserts
 * products into Sanity. Using deterministic IDs ensures
 * re-running does not create duplicates.
 *
 * Usage:
 *   cd studio
 *   npm run import:csv -- /path/to/products.csv
 *
 * CSV Format (columns):
 *   title, slug, category, shortDescription, longDescription,
 *   packaging, moq, origin, shelfLife, hsCode, certifications,
 *   featured, imageUrl
 *
 * Required environment variables:
 *   SANITY_STUDIO_PROJECT_ID - Your Sanity project ID
 *   SANITY_STUDIO_DATASET - Dataset name (defaults to 'production')
 *   SANITY_WRITE_TOKEN - Write token for API mutations
 */

import { createClient } from '@sanity/client';
import { parse } from 'csv-parse/sync';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Constants
const SEPARATOR_WIDTH = 50;

// CSV Row Interface
interface CSVRow {
  title?: string;
  slug?: string;
  category?: string;
  shortDescription?: string;
  longDescription?: string;
  packaging?: string;
  moq?: string;
  origin?: string;
  shelfLife?: string;
  hsCode?: string;
  certifications?: string;
  featured?: string;
  imageUrl?: string;
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
  featured?: boolean;
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

// Validate URL format
function isValidUrl(urlString: string): boolean {
  try {
    // Check if it's a relative path starting with /
    if (urlString.startsWith('/')) {
      return true;
    }
    // Check if it's a valid absolute URL
    new URL(urlString);
    return true;
  } catch {
    return false;
  }
}

// Parse certifications from comma-separated string
function parseCertifications(certString: string | undefined): string[] {
  if (!certString || certString.trim() === '') {
    return [];
  }
  return certString
    .split(',')
    .map((cert) => cert.trim())
    .filter((cert) => cert.length > 0);
}

// Parse featured boolean from string
function parseFeatured(featuredString: string | undefined): boolean {
  if (!featuredString) {
    return false;
  }
  const value = featuredString.toLowerCase().trim();
  return value === 'true' || value === '1' || value === 'yes';
}

// Validation result
interface ValidationResult {
  valid: boolean;
  errors: string[];
  row: CSVRow;
  rowNumber: number;
}

// Validate a single CSV row
function validateRow(row: CSVRow, rowNumber: number): ValidationResult {
  const errors: string[] = [];

  // Required: title
  if (!row.title || row.title.trim() === '') {
    errors.push(`Row ${rowNumber}: title is required`);
  }

  // Required: category
  if (!row.category || row.category.trim() === '') {
    errors.push(`Row ${rowNumber}: category is required`);
  }

  // Slug: auto-generate if empty (not an error)
  // We'll handle this in processing

  // Validate imageUrl if provided
  if (row.imageUrl && row.imageUrl.trim() !== '') {
    if (!isValidUrl(row.imageUrl.trim())) {
      errors.push(`Row ${rowNumber}: imageUrl "${row.imageUrl}" is not a valid URL`);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    row,
    rowNumber,
  };
}

async function main(): Promise<void> {
  console.log('📦 Starting CSV product import...\n');

  // Check for CSV file argument
  const csvPath = process.argv[2];
  if (!csvPath) {
    console.error('❌ Error: No CSV file provided');
    console.error('   Usage: npm run import:csv -- /path/to/products.csv');
    process.exit(1);
  }

  // Resolve the CSV file path
  const resolvedPath = path.isAbsolute(csvPath) ? csvPath : path.resolve(process.cwd(), csvPath);

  // Check if file exists
  if (!fs.existsSync(resolvedPath)) {
    console.error(`❌ Error: CSV file not found: ${resolvedPath}`);
    process.exit(1);
  }

  console.log(`📄 Reading CSV file: ${resolvedPath}\n`);

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

  // Read and parse CSV file
  let csvContent: string;
  try {
    csvContent = fs.readFileSync(resolvedPath, 'utf-8');
  } catch (error) {
    console.error(`❌ Error reading CSV file: ${error}`);
    process.exit(1);
  }

  let records: CSVRow[];
  try {
    records = parse(csvContent, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    }) as CSVRow[];
  } catch (error) {
    console.error(`❌ Error parsing CSV file: ${error}`);
    process.exit(1);
  }

  console.log(`📊 Found ${records.length} rows in CSV\n`);

  // Validate all rows first
  console.log('🔍 Validating rows...\n');
  const validationResults: ValidationResult[] = records.map((row, index) => validateRow(row, index + 2)); // +2 for header row and 1-based indexing

  const invalidRows = validationResults.filter((r) => !r.valid);
  if (invalidRows.length > 0) {
    console.error('❌ Validation errors found:');
    for (const result of invalidRows) {
      for (const error of result.errors) {
        console.error(`   ${error}`);
      }
    }
    console.error(`\n❌ ${invalidRows.length} row(s) failed validation. Please fix the errors and try again.`);
    process.exit(1);
  }

  console.log('✅ All rows passed validation\n');

  // Track categories that need to be created
  const categoryMap = new Map<string, string>(); // category name -> _id

  // Fetch existing categories from Sanity
  console.log('📁 Fetching existing categories...\n');
  try {
    const existingCategories = await client.fetch<Array<{ _id: string; title: string }>>(
      `*[_type == "category"]{ _id, title }`
    );
    for (const cat of existingCategories) {
      categoryMap.set(cat.title, cat._id);
    }
    console.log(`   Found ${existingCategories.length} existing categories\n`);
  } catch (error) {
    console.warn('⚠️  Could not fetch existing categories:', error);
  }

  // Process each row
  console.log('📦 Processing products...\n');

  let successCount = 0;
  let errorCount = 0;
  const createdCategories: string[] = [];

  for (let i = 0; i < records.length; i++) {
    const row = records[i];
    const rowNumber = i + 2; // +2 for header row and 1-based indexing

    // Generate slug if empty
    const slug = row.slug && row.slug.trim() !== '' ? row.slug.trim() : toKebabCase(row.title!);

    // Check/create category
    const categoryName = row.category!.trim();
    let categoryId = categoryMap.get(categoryName);

    if (!categoryId) {
      // Auto-create category
      const categorySlug = toKebabCase(categoryName);
      categoryId = getCategoryId(categorySlug);

      const newCategory: SanityCategory = {
        _id: categoryId,
        _type: 'category',
        title: categoryName,
        slug: {
          _type: 'slug',
          current: categorySlug,
        },
        description: `Category for ${categoryName} products`,
      };

      try {
        await client.createOrReplace(newCategory);
        categoryMap.set(categoryName, categoryId);
        createdCategories.push(categoryName);
        console.log(`   📁 Created category: ${categoryName}`);
      } catch (error) {
        console.error(`   ❌ Failed to create category "${categoryName}":`, error);
        errorCount++;
        continue;
      }
    }

    // Build product document
    const productId = getProductId(slug);

    const sanityProduct: SanityProduct = {
      _id: productId,
      _type: 'product',
      title: row.title!.trim(),
      slug: {
        _type: 'slug',
        current: slug,
      },
      shortDescription: row.shortDescription?.trim() || '',
      longDescription: row.longDescription?.trim() || '',
      category: {
        _type: 'reference',
        _ref: categoryId,
      },
    };

    // Add optional fields if present
    if (row.packaging && row.packaging.trim() !== '') {
      sanityProduct.packaging = row.packaging.trim();
    }
    if (row.shelfLife && row.shelfLife.trim() !== '') {
      sanityProduct.shelfLife = row.shelfLife.trim();
    }
    if (row.moq && row.moq.trim() !== '') {
      sanityProduct.moq = row.moq.trim();
    }
    if (row.origin && row.origin.trim() !== '') {
      sanityProduct.origin = row.origin.trim();
    }
    if (row.hsCode && row.hsCode.trim() !== '') {
      sanityProduct.hsCode = row.hsCode.trim();
    }

    const certifications = parseCertifications(row.certifications);
    if (certifications.length > 0) {
      sanityProduct.certifications = certifications;
    }

    const featured = parseFeatured(row.featured);
    if (featured) {
      sanityProduct.featured = true;
    }

    // Note: imageUrl is validated but not uploaded - user should manage images separately
    // or extend this script to upload images to Sanity

    try {
      await client.createOrReplace(sanityProduct);
      console.log(`   ✅ Row ${rowNumber}: ${row.title} (${productId})`);
      successCount++;
    } catch (error) {
      console.error(`   ❌ Row ${rowNumber}: Failed to upsert "${row.title}":`, error);
      errorCount++;
    }
  }

  // Print summary
  console.log(`\n${'='.repeat(SEPARATOR_WIDTH)}`);
  console.log('📊 Import Summary:');
  console.log(`   Products imported: ${successCount}`);
  console.log(`   Products failed: ${errorCount}`);
  if (createdCategories.length > 0) {
    console.log(`   Categories created: ${createdCategories.length}`);
    for (const cat of createdCategories) {
      console.log(`      - ${cat}`);
    }
  }
  console.log('='.repeat(SEPARATOR_WIDTH));

  if (errorCount > 0) {
    console.log('\n⚠️  Some items failed to import. Check the errors above.');
    process.exit(1);
  }

  console.log('\n🎉 Import completed successfully!');
}

main().catch((error: Error) => {
  console.error('\n❌ Unexpected error:', error);
  process.exit(1);
});
