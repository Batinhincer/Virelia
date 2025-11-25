import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'inquiry',
  title: 'Inquiry',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'company',
      title: 'Company',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'country',
      title: 'Country',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
      rows: 6,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'productName',
      title: 'Product Name',
      type: 'string',
    }),
    defineField({
      name: 'productSlug',
      title: 'Product Slug',
      type: 'string',
    }),
    defineField({
      name: 'productCategory',
      title: 'Product Category',
      type: 'string',
    }),
    defineField({
      name: 'source',
      title: 'Source',
      type: 'string',
      options: {
        list: [
          { title: 'Product Page', value: 'product-page' },
          { title: 'Contact Page', value: 'contact-page' },
          { title: 'Other', value: 'other' },
        ],
      },
      initialValue: 'other',
    }),
    defineField({
      name: 'urlPath',
      title: 'URL Path',
      type: 'string',
      description: 'Page path where the inquiry was submitted',
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'In Progress', value: 'in-progress' },
          { title: 'Closed', value: 'closed' },
        ],
      },
      initialValue: 'new',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      company: 'company',
      productName: 'productName',
      status: 'status',
      createdAt: 'createdAt',
    },
    prepare({ title, company, productName, status, createdAt }) {
      const statusEmoji = status === 'new' ? '🆕' : status === 'in-progress' ? '🔄' : '✅';
      const date = createdAt ? new Date(createdAt).toLocaleDateString() : '';
      const subtitle = productName 
        ? `${company} – ${productName} – ${date}`
        : `${company} – ${date}`;
      return {
        title: `${statusEmoji} ${title}`,
        subtitle,
      };
    },
  },
  orderings: [
    {
      title: 'Created At, Newest',
      name: 'createdAtDesc',
      by: [{ field: 'createdAt', direction: 'desc' }],
    },
    {
      title: 'Status',
      name: 'statusAsc',
      by: [{ field: 'status', direction: 'asc' }],
    },
  ],
});
