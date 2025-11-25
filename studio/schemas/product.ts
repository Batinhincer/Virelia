import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fieldsets: [
    {
      name: 'basicInfo',
      title: 'Basic Info',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'specifications',
      title: 'Specifications',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'b2bDetails',
      title: 'B2B Details',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'certifications',
      title: 'Certifications',
      options: { collapsible: true, collapsed: false },
    },
  ],
  fields: [
    // Basic Info fieldset
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      fieldset: 'basicInfo',
      description: 'The product name displayed on the website',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      fieldset: 'basicInfo',
      description: 'URL-friendly identifier (auto-generated from title)',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      fieldset: 'basicInfo',
      description: 'Select the product category',
      to: [{ type: 'category' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      fieldset: 'basicInfo',
      description: 'Show this product in featured sections on the homepage',
      initialValue: false,
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      fieldset: 'basicInfo',
      rows: 2,
      description: 'Brief product summary (max 200 characters) shown in product listings',
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'longDescription',
      title: 'Long Description',
      type: 'array',
      fieldset: 'basicInfo',
      description: 'Detailed product description with rich text formatting',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
            ],
          },
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      fieldset: 'basicInfo',
      description: 'Primary product image shown on product cards and detail page',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'images',
      title: 'Additional Images',
      type: 'array',
      fieldset: 'basicInfo',
      description: 'Gallery images for the product detail page',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    }),

    // Specifications fieldset
    defineField({
      name: 'packaging',
      title: 'Packaging',
      type: 'string',
      fieldset: 'specifications',
      description: 'Available packaging options (e.g., "Glass bottles 250ml, 500ml, 1L")',
    }),
    defineField({
      name: 'shelfLife',
      title: 'Shelf Life',
      type: 'string',
      fieldset: 'specifications',
      description: 'Product shelf life (e.g., "18 months from production date")',
    }),
    defineField({
      name: 'origin',
      title: 'Origin',
      type: 'string',
      fieldset: 'specifications',
      description: 'Country or region of origin',
    }),

    // B2B Details fieldset
    defineField({
      name: 'moq',
      title: 'Minimum Order Quantity (MOQ)',
      type: 'string',
      fieldset: 'b2bDetails',
      description: 'Minimum order quantity for B2B buyers (e.g., "500L" or "100 units")',
    }),
    defineField({
      name: 'hsCode',
      title: 'HS Code',
      type: 'string',
      fieldset: 'b2bDetails',
      description: 'Harmonized System code for customs and international trade',
    }),

    // Certifications fieldset
    defineField({
      name: 'certifications',
      title: 'Certifications',
      type: 'array',
      fieldset: 'certifications',
      description: 'Quality and safety certifications (e.g., HACCP, ISO 22000, Halal)',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
  ],
  orderings: [
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
    {
      title: 'Title Z-A',
      name: 'titleDesc',
      by: [{ field: 'title', direction: 'desc' }],
    },
    {
      title: 'Featured First',
      name: 'featuredFirst',
      by: [
        { field: 'featured', direction: 'desc' },
        { field: 'title', direction: 'asc' },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category.title',
      featured: 'featured',
      media: 'mainImage',
    },
    prepare({ title, category, featured, media }) {
      const subtitle = [
        category,
        featured ? '⭐ Featured' : '',
      ].filter(Boolean).join(' • ');
      return {
        title,
        subtitle,
        media,
      };
    },
  },
});
