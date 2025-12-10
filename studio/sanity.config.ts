import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';
import type { StructureBuilder } from 'sanity/structure';

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || '';
const dataset = process.env.SANITY_STUDIO_DATASET || 'production';

// Custom structure for the Studio
const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      // Products with custom list
      S.listItem()
        .title('Products')
        .schemaType('product')
        .child(
          S.documentTypeList('product')
            .title('Products')
            .defaultOrdering([{ field: 'title', direction: 'asc' }])
            .menuItems([
              S.orderingMenuItem({ title: 'Title A-Z', name: 'titleAsc', by: [{ field: 'title', direction: 'asc' }] }),
              S.orderingMenuItem({ title: 'Title Z-A', name: 'titleDesc', by: [{ field: 'title', direction: 'desc' }] }),
              S.orderingMenuItem({ title: 'Featured First', name: 'featuredFirst', by: [{ field: 'featured', direction: 'desc' }, { field: 'title', direction: 'asc' }] }),
            ])
        ),
      // Categories with custom list sorted by title
      S.listItem()
        .title('Categories')
        .schemaType('category')
        .child(
          S.documentTypeList('category')
            .title('Categories')
            .defaultOrdering([{ field: 'title', direction: 'asc' }])
        ),
      S.divider(),
      // Pages
      S.listItem()
        .title('Pages')
        .schemaType('page')
        .child(S.documentTypeList('page').title('Pages')),
      // Inquiries
      S.listItem()
        .title('Inquiries')
        .schemaType('inquiry')
        .child(S.documentTypeList('inquiry').title('Inquiries')),
      S.divider(),
      // Bulk Import Guide
      S.listItem()
        .title('Bulk Import')
        .schemaType('bulkImportGuide')
        .child(
          S.documentTypeList('bulkImportGuide')
            .title('Bulk Import Guide')
        ),
    ]);

export default defineConfig({
  name: 'virelia-cms',
  title: 'Virelia CMS',
  projectId,
  dataset,
  basePath: '/',
  plugins: [
    structureTool({
      structure,
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
});
