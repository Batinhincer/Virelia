import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'bulkImportGuide',
  title: 'Bulk Import Guide',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Bulk Product Import Guide',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
              { title: 'Code', value: 'code' },
            ],
          },
        },
      ],
    }),
    defineField({
      name: 'csvTemplate',
      title: 'CSV Column Reference',
      type: 'text',
      rows: 10,
      initialValue: `CSV Columns:
- title (required): Product name
- slug (optional): URL identifier, auto-generated if empty
- category (required): Category name, auto-created if not exists
- shortDescription: Brief product summary (max 200 chars)
- longDescription: Detailed product description
- packaging: Packaging options
- moq: Minimum Order Quantity
- origin: Country/region of origin
- shelfLife: Shelf life information
- hsCode: HS code for customs
- certifications: Comma-separated (e.g., "HACCP, ISO 22000")
- featured: true/false
- imageUrl: URL or path to product image`,
    }),
    defineField({
      name: 'commandExample',
      title: 'Command Example',
      type: 'string',
      initialValue: 'npm run import:csv -- /path/to/products.csv',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title,
        subtitle: 'Bulk Import Documentation',
      };
    },
  },
});
