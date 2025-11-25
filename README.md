# Virelia

Virelia - Premium Mediterranean Food Products B2B Website

## Overview

This is a Next.js-based website for Virelia Ticaret Limited Şirketi, showcasing premium Mediterranean food products for B2B export.

## Features

- **Product Catalog**: Browse products by category with detailed product pages
- **B2B Product Details**: Premium product detail pages with specifications, certifications, and packaging information
- **Inquiry System**: Request quotes directly from product pages via email
- **Responsive Design**: Optimized for desktop and mobile devices
- **Premium UI**: Designed with B2B catalog style using consistent design tokens
- **Sanity CMS Integration**: Product and category data can be managed via Sanity Studio with automatic fallback to local data

## Recent Updates

### Phase 6A – Product & Category UX Upgrade

This phase introduced significant UX improvements to product and category pages:

- **Category Pages** (`/products/[category]`):
  - Clean B2B catalog layout with responsive grid (2-4 columns)
  - Category title and description from Sanity (with local fallback)
  - Product cards showing name, description, key specs summary (packaging, origin, MOQ)
  - "View Details" buttons with hover animations
  - Improved empty state and "not found" handling

- **Product Detail Pages** (`/product/[slug]`):
  - Professional B2B spec page layout
  - Hero section with product name, category badge, and short description
  - Quick stats bar showing MOQ, origin, and shelf life
  - Comprehensive specifications table with packaging, shelf life, MOQ, origin, and HS code
  - Certification badges displayed prominently
  - Long description section
  - Prominent "Request a Quote" CTA
  - Related products section
  - B2B services info box

- **Data Integration**:
  - Product/category pages now fetch data from Sanity CMS when configured
  - Graceful fallback to local data (`site/data/products.ts`) when Sanity is not available
  - GROQ queries updated to fetch all required B2B specification fields

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Batinhincer/Virelia.git
cd Virelia/site
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables (see Environment Setup below)

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## Environment Setup

The inquiry/quote request system requires SMTP configuration to send emails. 

### Local Development

1. Copy the example environment file:
```bash
cp .env.example .env.local
```

2. Edit `.env.local` and add your SMTP credentials:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-specific-password
SMTP_FROM=your-email@gmail.com
```

**Note:** If SMTP is not configured in development mode, inquiry submissions will be logged to the console instead of sending emails. This allows testing the form without email setup.

### SMTP Provider Setup

#### Gmail
1. Enable 2-Factor Authentication on your Google account
2. Generate an App Password: Account Settings → Security → 2-Step Verification → App Passwords
3. Use the generated app password as `SMTP_PASS`
4. Set `SMTP_HOST=smtp.gmail.com` and `SMTP_PORT=587`

#### Office 365 / Outlook
- `SMTP_HOST=smtp.office365.com`
- `SMTP_PORT=587`
- Use your full email and password

#### Other Providers
Consult your email provider's SMTP documentation for the correct host and port settings.

### Production Deployment

For production deployments (Vercel, Netlify, etc.), add the SMTP environment variables in your platform's environment variable settings. **Never commit real credentials to the repository.**

## Project Structure

```
site/
├── components/       # React components
│   ├── Header.tsx
│   ├── ProductCard.tsx
│   ├── InquiryForm.tsx
│   └── ...
├── data/            # Product data and content
│   └── products.ts
├── pages/           # Next.js pages
│   ├── api/        # API routes
│   │   └── inquiry.ts
│   ├── product/
│   │   └── [slug].tsx
│   └── ...
├── public/          # Static assets
├── styles/          # Global styles
└── package.json
```

## Technologies Used

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Nodemailer** - Email sending

## License

Copyright © 2025 Virelia Ticaret Limited Şirketi. All rights reserved.

## Studio Deployment Instructions

The Sanity Studio is extracted into a separate standalone project under `/studio`. This allows for independent deployment and better separation of concerns.

### Deploying Studio to Vercel

1. Create a new Vercel project and set the root directory to `studio`.

2. Configure the following environment variables in your Vercel project settings:

| Variable | Required | Description |
|----------|----------|-------------|
| `SANITY_STUDIO_PROJECT_ID` | Yes | Your Sanity project ID |
| `SANITY_STUDIO_DATASET` | No | Sanity dataset (defaults to `production`) |

3. Configure the build settings:
   - **Build Command**: `npm install && npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. Deploy the project.

### Local Development

1. Navigate to the studio directory:
```bash
cd studio
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with your Sanity credentials:
```bash
cp .env.example .env
# Edit .env with your Sanity project ID
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3333](http://localhost:3333) in your browser.

### Seeding Data from Local Files

The studio includes a seeding script to automatically import categories and products from the local Next.js site data.

1. Ensure your `.env` file has the following variables set:
```bash
SANITY_STUDIO_PROJECT_ID=your-project-id
SANITY_STUDIO_DATASET=production
SANITY_WRITE_TOKEN=your-write-token
```

2. Generate a write token from [Sanity Manage](https://sanity.io/manage) → Your Project → API → Tokens (select "Editor" or "Read + Write" permissions).

3. Run the seed script:
```bash
cd studio
npm run import:seed
```

The script will:
- Import product data from `site/data/products.ts`
- Create/update category documents in Sanity
- Create/update product documents with category references
- Use deterministic IDs to prevent duplicates on re-runs

### Studio Structure

```
studio/
├── sanity.config.ts    # Sanity configuration (basePath = "/")
├── schemas/            # Content schemas
│   ├── index.ts
│   ├── product.ts
│   ├── category.ts
│   └── page.ts
├── scripts/            # Utility scripts
│   └── seedFromLocal.ts  # Data seeding script
├── package.json        # Studio dependencies
├── tsconfig.json       # TypeScript configuration
└── .env.example        # Environment variables template
```

### Notes

- The Studio is configured with `basePath: "/"` for standalone deployment
- The main Next.js site (`/site`) continues to use Sanity via `site/lib/sanity.ts` for data fetching
- The `/site/pages/admin.tsx` page redirects users to the standalone Studio URL