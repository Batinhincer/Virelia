import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

test.describe('CSV Import Script Structure Tests', () => {
  const scriptsDir = path.resolve(__dirname, '../../studio/scripts');
  const importScript = path.join(scriptsDir, 'importProductsFromCSV.ts');

  test('CSV import script file exists', async () => {
    expect(fs.existsSync(importScript)).toBe(true);
  });

  test('CSV import script contains required functions', async () => {
    const content = fs.readFileSync(importScript, 'utf-8');
    
    // Check for required functions and exports
    expect(content).toContain('toKebabCase');
    expect(content).toContain('getCategoryId');
    expect(content).toContain('getProductId');
    expect(content).toContain('isValidUrl');
    expect(content).toContain('parseCertifications');
    expect(content).toContain('parseFeatured');
    expect(content).toContain('validateRow');
    expect(content).toContain('async function main');
  });

  test('CSV import script handles CSV columns correctly', async () => {
    const content = fs.readFileSync(importScript, 'utf-8');
    
    // Check CSV columns are defined in the interface
    expect(content).toContain('title?: string');
    expect(content).toContain('slug?: string');
    expect(content).toContain('category?: string');
    expect(content).toContain('shortDescription?: string');
    expect(content).toContain('longDescription?: string');
    expect(content).toContain('packaging?: string');
    expect(content).toContain('moq?: string');
    expect(content).toContain('origin?: string');
    expect(content).toContain('shelfLife?: string');
    expect(content).toContain('hsCode?: string');
    expect(content).toContain('certifications?: string');
    expect(content).toContain('featured?: string');
    expect(content).toContain('imageUrl?: string');
  });

  test('CSV import script validates required fields', async () => {
    const content = fs.readFileSync(importScript, 'utf-8');
    
    // Check validation for required fields
    expect(content).toContain('title is required');
    expect(content).toContain('category is required');
  });

  test('CSV import script validates imageUrl format', async () => {
    const content = fs.readFileSync(importScript, 'utf-8');
    
    // Check imageUrl validation
    expect(content).toContain('isValidUrl');
    expect(content).toContain('is not a valid URL');
  });

  test('CSV import script uses deterministic IDs', async () => {
    const content = fs.readFileSync(importScript, 'utf-8');
    
    // Check for deterministic ID generation
    expect(content).toContain('product-${slug}');
    expect(content).toContain('category-${slug}');
  });

  test('CSV import script handles certifications parsing', async () => {
    const content = fs.readFileSync(importScript, 'utf-8');
    
    // Check certifications parsing logic
    expect(content).toContain('parseCertifications');
    expect(content).toContain('split');
  });

  test('CSV import script auto-generates slugs', async () => {
    const content = fs.readFileSync(importScript, 'utf-8');
    
    // Check slug auto-generation
    expect(content).toContain('toKebabCase(row.title!)');
  });

  test('CSV import script auto-creates categories', async () => {
    const content = fs.readFileSync(importScript, 'utf-8');
    
    // Check category auto-creation
    expect(content).toContain('Auto-create category');
    expect(content).toContain('createOrReplace');
  });
});

test.describe('Studio Schema Structure Tests', () => {
  const schemasDir = path.resolve(__dirname, '../../studio/schemas');

  test('product schema file exists', async () => {
    const productSchema = path.join(schemasDir, 'product.ts');
    expect(fs.existsSync(productSchema)).toBe(true);
  });

  test('product schema has fieldsets defined', async () => {
    const productSchema = path.join(schemasDir, 'product.ts');
    const content = fs.readFileSync(productSchema, 'utf-8');
    
    // Check for fieldsets
    expect(content).toContain("name: 'basicInfo'");
    expect(content).toContain("title: 'Basic Info'");
    expect(content).toContain("name: 'specifications'");
    expect(content).toContain("title: 'Specifications'");
    expect(content).toContain("name: 'b2bDetails'");
    expect(content).toContain("title: 'B2B Details'");
    expect(content).toContain("name: 'certifications'");
    expect(content).toContain("title: 'Certifications'");
  });

  test('product schema has rich text longDescription', async () => {
    const productSchema = path.join(schemasDir, 'product.ts');
    const content = fs.readFileSync(productSchema, 'utf-8');
    
    // Check longDescription is array type (rich text)
    expect(content).toMatch(/name:\s*['"]longDescription['"],[\s\S]*?type:\s*['"]array['"],/);
  });

  test('product schema has custom preview with featured badge', async () => {
    const productSchema = path.join(schemasDir, 'product.ts');
    const content = fs.readFileSync(productSchema, 'utf-8');
    
    // Check for featured in preview
    expect(content).toContain('featured: \'featured\'');
    expect(content).toContain('⭐ Featured');
  });

  test('product schema has ordering options', async () => {
    const productSchema = path.join(schemasDir, 'product.ts');
    const content = fs.readFileSync(productSchema, 'utf-8');
    
    // Check for ordering
    expect(content).toContain('orderings:');
    expect(content).toContain("title: 'Title A-Z'");
    expect(content).toContain("title: 'Featured First'");
  });

  test('category schema file exists', async () => {
    const categorySchema = path.join(schemasDir, 'category.ts');
    expect(fs.existsSync(categorySchema)).toBe(true);
  });

  test('category schema has rich text description', async () => {
    const categorySchema = path.join(schemasDir, 'category.ts');
    const content = fs.readFileSync(categorySchema, 'utf-8');
    
    // Check for rich text description field
    expect(content).toContain("name: 'richDescription'");
    expect(content).toContain("title: 'Category Description (Rich Text)'");
    expect(content).toMatch(/name:\s*['"]richDescription['"],[\s\S]*?type:\s*['"]array['"],/);
  });

  test('category schema has ordering options', async () => {
    const categorySchema = path.join(schemasDir, 'category.ts');
    const content = fs.readFileSync(categorySchema, 'utf-8');
    
    // Check for ordering
    expect(content).toContain('orderings:');
    expect(content).toContain("title: 'Title A-Z'");
  });

  test('bulkImportGuide schema file exists', async () => {
    const guideSchema = path.join(schemasDir, 'bulkImportGuide.ts');
    expect(fs.existsSync(guideSchema)).toBe(true);
  });

  test('bulkImportGuide schema has required fields', async () => {
    const guideSchema = path.join(schemasDir, 'bulkImportGuide.ts');
    const content = fs.readFileSync(guideSchema, 'utf-8');
    
    expect(content).toContain("name: 'title'");
    expect(content).toContain("name: 'content'");
    expect(content).toContain("name: 'csvTemplate'");
    expect(content).toContain("name: 'commandExample'");
  });

  test('schema index exports all schema types', async () => {
    const indexFile = path.join(schemasDir, 'index.ts');
    const content = fs.readFileSync(indexFile, 'utf-8');
    
    expect(content).toContain("import product from './product'");
    expect(content).toContain("import category from './category'");
    expect(content).toContain("import bulkImportGuide from './bulkImportGuide'");
    expect(content).toContain('schemaTypes');
  });
});

test.describe('Studio Config Structure Tests', () => {
  const studioDir = path.resolve(__dirname, '../../studio');

  test('sanity.config.ts has custom structure', async () => {
    const configFile = path.join(studioDir, 'sanity.config.ts');
    const content = fs.readFileSync(configFile, 'utf-8');
    
    // Check for custom structure
    expect(content).toContain('structureTool');
    expect(content).toContain('structure');
    expect(content).toContain("S.listItem()");
  });

  test('sanity.config.ts has Products list with ordering', async () => {
    const configFile = path.join(studioDir, 'sanity.config.ts');
    const content = fs.readFileSync(configFile, 'utf-8');
    
    expect(content).toContain(".title('Products')");
    expect(content).toContain('defaultOrdering');
    expect(content).toContain('menuItems');
  });

  test('sanity.config.ts has Categories list', async () => {
    const configFile = path.join(studioDir, 'sanity.config.ts');
    const content = fs.readFileSync(configFile, 'utf-8');
    
    expect(content).toContain(".title('Categories')");
  });

  test('sanity.config.ts has Bulk Import menu item', async () => {
    const configFile = path.join(studioDir, 'sanity.config.ts');
    const content = fs.readFileSync(configFile, 'utf-8');
    
    expect(content).toContain(".title('Bulk Import')");
    expect(content).toContain('bulkImportGuide');
  });

  test('package.json has import:csv script', async () => {
    const packageFile = path.join(studioDir, 'package.json');
    const content = fs.readFileSync(packageFile, 'utf-8');
    const pkg = JSON.parse(content);
    
    expect(pkg.scripts['import:csv']).toBeDefined();
    expect(pkg.scripts['import:csv']).toContain('importProductsFromCSV.ts');
  });
});
