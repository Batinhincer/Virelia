# Frezya

Frezya - Premium Mediterranean Food Products B2B Website

## Overview

This is a Next.js-based website for Frezya Dış Ticaret Ltd. Şti., showcasing premium Mediterranean food products for B2B export.

## Features

- **Product Catalog**: Browse products by category with detailed product pages
- **B2B Product Details**: Premium product detail pages with specifications, certifications, and packaging information
- **Inquiry System**: Request quotes directly from product pages via email
- **Responsive Design**: Optimized for desktop and mobile devices
- **Premium UI**: Designed with B2B catalog style using consistent design tokens
- **Sanity CMS Integration**: Product and category data can be managed via Sanity Studio with automatic fallback to local data

## Recent Updates

### Phase 13 – Sanity-first Data & Local Fallback Cleanup

This phase centralizes data fetching in `site/lib/sanity.ts` and ensures all product and category pages use Sanity as the primary data source while maintaining a robust local fallback for CI/tests:

- **Centralized Data Helpers in `sanity.ts`**:
  - `getAllProductSlugs()`: Fetches all product slugs from Sanity for `getStaticPaths`, falls back to local data if Sanity is unavailable
  - `getAllCategorySlugs()`: Fetches all category slugs from Sanity for `getStaticPaths`, falls back to local data if Sanity is unavailable
  - Re-exports local product helpers (`getLocalProductBySlug`, `getLocalCategoryBySlug`, etc.) for internal fallback use
  - All local data imports (`@/data/products`) are now centralized in `sanity.ts`

- **Product Detail Pages** (`/product/[slug]`):
  - `getStaticPaths` now uses `getAllProductSlugs()` from `sanity.ts`
  - `getStaticProps` returns `{ notFound: true }` when a product is not found in either Sanity or local data
  - Removed direct imports of `@/data/products`

- **Category Listing Pages** (`/products/[category]`):
  - `getStaticPaths` now uses `getAllCategorySlugs()` from `sanity.ts`
  - `getStaticProps` returns `{ notFound: true }` when a category is not found in either Sanity or local data
  - Removed direct imports of `@/data/products`

- **404 Behavior**:
  - Visiting a non-existing product slug (e.g., `/product/non-existing`) returns the Next.js 404 page
  - Visiting a non-existing category (e.g., `/products/non-existing-category`) also returns 404
  - Breadcrumbs and canonical URLs remain correct for existing products/categories

- **Local Fallback Data**:
  - `site/data/products.ts` is now only used inside `sanity.ts` and seeding scripts (`studio/scripts/seedFromLocal.ts`)
  - The file remains the source of truth for CI/test environments without Sanity configuration
  - Client-side components (Search, Header) still use local data for static navigation/search

- **Seeding from Local Data**:
  - Run `cd studio && npm run import:seed` to import local products into Sanity
  - The seed script uses `site/data/products.ts` as the source

**How Fallback Works:**

When Sanity environment variables are not set or Sanity queries fail:
1. `getAllProductSlugs()` and `getAllCategorySlugs()` return slugs from local data
2. `fetchProductBySlug()` and `fetchCategoryBySlug()` return `null`, triggering local data lookup
3. The site renders correctly using `site/data/products.ts` data

This ensures the site builds and tests pass in CI environments without Sanity credentials.

### Phase 12 – Sanity-powered Content & CMS Handover

This phase implements full Sanity CMS integration for product, category, and homepage content with graceful fallbacks:

- **Sanity-first Data Fetching**:
  - Products and categories are now primarily sourced from Sanity CMS
  - If Sanity is unavailable or returns null, the site gracefully falls back to local data (`site/data/products.ts`)
  - This ensures the site always works, even without a Sanity connection configured

- **Portable Text (Rich Text) Support**:
  - Product `longDescription` can now use Portable Text blocks from Sanity for rich formatting
  - Category `richDescription` field supports Portable Text for detailed category introductions
  - Uses the existing `PortableTextRenderer` component for consistent rendering
  - Falls back to plain text when Portable Text is not available

- **Category Pages** (`/products/[category]`):
  - Fetches category data and products from Sanity
  - Renders rich description using Portable Text when available
  - Falls back to plain text description from local data
  - All existing filters, sorting, and UX remain unchanged

- **Product Detail Pages** (`/product/[slug]`):
  - Fetches product data from Sanity by slug
  - Renders `longDescription` as Portable Text when available
  - Falls back to plain text for local products
  - Specifications, certifications, and related products work with both data sources

- **Homepage** (`/`):
  - Already integrated with Sanity for hero title, subtitle, and SEO metadata
  - Featured products and categories can be managed from Sanity
  - Falls back to hardcoded content when Sanity is not configured

- **Testing**:
  - 20 new Playwright e2e tests in `site/e2e/sanity-content.spec.ts`
  - Tests verify content rendering for categories, products, and homepage
  - Tests confirm fallback behavior works correctly
  - Tests validate SEO metadata and navigation

**For Content Editors:**

To manage content via Sanity Studio:

1. **Products**: Edit the `product` document type
   - `longDescription`: Use the rich text editor for formatted content
   - Products appear on product detail pages and category listings

2. **Categories**: Edit the `category` document type
   - `description`: Plain text summary (used as fallback)
   - `richDescription`: Rich text field for detailed category introductions

3. **Homepage**: Edit the `page` document with `pageType: home`
   - `heroTitle` and `heroSubtitle`: Customize the hero section
   - `seoTitle` and `seoDescription`: Override SEO metadata

The site automatically picks up changes from Sanity with ISR (Incremental Static Regeneration).

### Phase 11 – Analytics & Monitoring

This phase adds optional analytics support and health/version endpoints for monitoring:

- **Analytics Support (GA4)**:
  - Provider-agnostic analytics implementation using Google Analytics 4
  - Controlled via `NEXT_PUBLIC_ANALYTICS_ID` environment variable
  - Analytics scripts are only loaded in production when the env var is set
  - No hard-coded tracking IDs - fully configurable per environment
  - To enable: Set `NEXT_PUBLIC_ANALYTICS_ID` to your GA4 Measurement ID (e.g., `G-XXXXXXXXXX`)
  - To disable: Leave `NEXT_PUBLIC_ANALYTICS_ID` unset or empty

- **Health Endpoint** (`/api/health`):
  - Returns JSON: `{ "status": "ok", "environment": "production", "timestamp": "2025-01-01T12:00:00.000Z" }`
  - Use for uptime monitoring, load balancer health checks, and deployment verification
  - Always returns HTTP 200 when the service is running

- **Version Endpoint** (`/api/version`):
  - Returns JSON: `{ "version": "1.0.0", "commit": "abc1234", "buildTime": "2025-01-01T12:00:00.000Z" }`
  - `version`: From package.json
  - `commit`: Short Git commit hash (from `VERCEL_GIT_COMMIT_SHA` or `GIT_COMMIT` env var)
  - `buildTime`: Build timestamp (from `BUILD_TIME` env var, if set)
  - Use for deployment verification and debugging

- **New Environment Variables**:
  - `NEXT_PUBLIC_ANALYTICS_ID`: Google Analytics 4 Measurement ID (optional, public)
  - `GIT_COMMIT` or `VERCEL_GIT_COMMIT_SHA`: Git commit hash for version endpoint (automatically set by Vercel)
  - `BUILD_TIME`: Build timestamp for version endpoint (optional)

- **Testing**:
  - 13 new Playwright e2e tests for health, version, and analytics
  - Tests verify endpoint responses, JSON shapes, and analytics behavior

**Vercel Configuration:**

To configure analytics in Vercel:
1. Go to your project settings → Environment Variables
2. Add `NEXT_PUBLIC_ANALYTICS_ID` with your GA4 Measurement ID
3. Scope it to Production only (analytics should not run in Preview/Development)
4. Redeploy your application

The `VERCEL_GIT_COMMIT_SHA` is automatically provided by Vercel during builds.

### Phase 7C – Product Detail UX & SEO

This phase enhances the product detail page with improved UX, better CTAs, and SEO optimizations:

- **Enhanced Breadcrumb Navigation**:
  - Updated breadcrumb structure: Home > Products > {Category} > {Product Name}
  - Added "Products" link to breadcrumb path
  - Improved accessibility with `aria-label` and `aria-current` attributes
  - Added test IDs for e2e testing

- **Improved CTA Layout**:
  - Primary CTA: "Request Product Information" linking to inquiry form
  - Secondary CTA: "View All {Category}" linking to category page
  - Both CTAs work on desktop and mobile (responsive flex layout)

- **Related Products Section**:
  - Shows up to 3 related products from the same category
  - Excludes the current product from related items
  - Uses existing ProductCard component for consistent styling
  - Gracefully hidden when no related products exist
  - Updated grid layout (3-column on desktop)

- **Category Badge**:
  - Added test ID for e2e testing
  - Links to category page for easy navigation

- **SEO & Structured Data**:
  - Proper `<title>` and `<meta name="description">` already in place
  - Product JSON-LD with required fields: name, description, image, category, brand
  - BreadcrumbList JSON-LD for search engine understanding

- **Accessibility Improvements**:
  - Logical heading order (H1 for product name, H2 for sections)
  - Keyboard accessible interactive elements
  - Meaningful alt text on images
  - ARIA attributes on breadcrumb navigation

- **Testing**:
  - 22 new Playwright e2e tests for product detail page
  - Tests cover: page rendering, breadcrumbs, CTAs, related products, SEO, accessibility
  - Tests for both desktop and mobile views

### Phase 7B – Product Filtering & Category Enhancements

This phase implements comprehensive filtering and sorting capabilities for category pages:

- **Filter UI Component** (`site/components/CategoryFilters.tsx`):
  - Multi-select filters for: Packaging, Origin, MOQ buckets, and Certifications
  - Desktop: Sidebar filter panel with collapsible sections
  - Mobile: Slide-out filter panel with "Filters" button
  - Active filter chips with individual remove buttons
  - "Clear All" button to reset all filters
  - Empty state when no products match filters
  - Real-time filter count display

- **Sorting Options**:
  - Default / Relevance (featured products first, then alphabetical)
  - Name A–Z (ascending alphabetical)
  - Name Z–A (descending alphabetical)
  - MOQ Low → High (minimum order quantity ascending)

- **URL Query Parameter Sync**:
  - Filters and sort options sync to URL query params
  - Example: `/products/pepper-paste?origin=Turkey,Greece&packaging=IBC&sort=name-asc`
  - Filters are restored on page load from URL
  - Invalid params are handled gracefully
  - Supports browser back/forward navigation

- **Category Stats**:
  - Dynamic product count display (e.g., "15 products")
  - Active filter indicator (e.g., "8 products • 3 filters active")
  - Updates in real-time as filters change

- **Accessibility & UX**:
  - Keyboard accessible: Tab navigation, Space/Enter to toggle
  - ARIA attributes on all interactive elements
  - Responsive design: clear desktop sidebar, collapsible mobile panel
  - Focus management in mobile filter panel
  - Body scroll lock when mobile panel is open

- **Testing**:
  - 22 Playwright e2e tests covering all filter functionality
  - Tests for filter application, URL sync, sorting, and empty states
  - Tests for both desktop and mobile views

### Phase 7A – Global Search System

This phase implements a comprehensive global search system for the Frezya B2B site:

- **Search Modal Component** (`site/components/SearchModal.tsx`):
  - Command Palette style interface (similar to Spotlight/VS Code)
  - Real-time debounced filtering (200ms delay)
  - Product results display with image, title, description, and category badge
  - Keyboard navigation: ↑↓ arrows to navigate, Enter to select, ESC to close
  - Focus trap for accessibility
  - Smooth animations and hover states

- **Header Integration** (`site/components/Header.tsx`):
  - Search icon added to desktop navigation (visible on large screens)
  - Search icon added to mobile header (next to hamburger menu)
  - Both trigger the same SearchModal component

- **Keyboard Shortcuts**:
  - `Ctrl+K` / `Cmd+K` to open search from anywhere on the site
  - `ESC` to close the search modal
  - Arrow keys for result navigation
  - Enter to select highlighted result

- **Features**:
  - Searches across product titles, descriptions, and categories
  - Shows "Popular categories" when search is empty
  - "No results" state with helpful message
  - Click backdrop to close
  - Uses Next.js router for client-side navigation

- **Testing**:
  - 15 Playwright e2e tests covering all functionality
  - Tests for desktop and mobile views
  - Tests for keyboard shortcuts and navigation

### Phase 6C – Navigation, Footer & Global UI Polishing

This phase focuses on navigation, footer consistency, and overall UI polish:

- **Header / Navigation Improvements** (`site/components/Header.tsx`):
  - Added responsive mobile navigation with hamburger menu
  - Mobile menu includes full-screen slide-out panel with all navigation links
  - Products dropdown with category links (expanded/collapsible on mobile)
  - Active link highlighting using `useRouter` to detect current page
  - Keyboard accessibility: ESC key closes mobile menu
  - Proper ARIA attributes: `aria-label`, `aria-expanded`, `aria-controls`, `aria-haspopup`
  - Body scroll lock when mobile menu is open
  - Navigation structure: Home, Products (dropdown), About, Logistics, Certifications, Contact
  - "Request a Quote" CTA button in mobile menu footer

- **Footer Improvements** (`site/components/Footer.tsx`):
  - New responsive multi-column layout (4 columns on desktop, stacked on mobile)
  - Company information section with:
    - Company name: Frezya Dış Ticaret Ltd. Şti.
    - Full address: Akpınar, Şht. Mümin Mutlu Sk. No:7 Kat:2, Ofis:36, 16160 Osmangazi/Bursa, Türkiye
  - Quick links section: Home, Products, About Us, Logistics, Certifications
  - Contact section with:
    - Email: batinhincer@frezya.nl
    - Phone: +90 507 707 54 07
    - "Request a Quote" link
  - Dynamic copyright year
  - Semantic footer with `role="contentinfo"` and navigation `aria-label`

- **Footer Consistency**:
  - Footer component now used consistently across all pages:
    - Homepage (`/`)
    - About (`/about`)
    - Logistics (`/logistics`)
    - Certifications (`/certifications`)
    - Product detail pages (`/product/[slug]`)
    - Category pages (`/products/[category]`)
    - 404 page

- **Branding Update**:
  - Updated all references from "Virelia" to "Frezya" across the site
  - Updated company contact information throughout
  - Updated SEO metadata and structured data (Organization, Product, WebSite schemas)

- **Accessibility Improvements**:
  - Header mobile menu with full ARIA support
  - Footer navigation with proper labels
  - Focus states maintained for keyboard navigation
  - External links pattern ready (target="_blank" with rel="noopener noreferrer")

### Phase 6B – Homepage & Static Pages Polish

This phase polishes the homepage and adds Sanity CMS integration to static pages (About, Logistics, Certifications) with safe local fallback:

- **Homepage Redesign** (`/`):
  - Premium B2B export landing page design
  - Hero section with dynamic content from Sanity (heroTitle, heroSubtitle)
  - "Product Categories" section with category descriptions and "View Category" links
  - "Featured Products" grid (6 products in 3-column layout)
  - "Why Choose Frezya?" value proposition cards
  - "Export Ready for Global Markets" section with EU/UK/USA compliance badges
  - New "Quality & Certifications" teaser section with certification badges
  - Link to Logistics page from export section
  - All sections use Sanity data when available with local fallback

- **Static Pages with Sanity Integration**:
  - About (`/about`), Logistics (`/logistics`), and Certifications (`/certifications`) pages now use SSG with `getStaticProps`
  - Content fetched from Sanity `page` documents by `pageType` (about/logistics/certifications)
  - Hero title and subtitle customizable via Sanity
  - SEO metadata (title, description) from Sanity when available
  - Graceful fallback to hardcoded content when Sanity is not configured

- **New Reusable Components**:
  - `PageHero` – consistent hero section across static pages
  - `Footer` – shared footer component
  - `PortableTextRenderer` – basic Portable Text renderer for Sanity content

- **Sanity Schema Updates** (`/studio/schemas/page.ts`):
  - Added `home` pageType for homepage content
  - Added `heroTitle` and `heroSubtitle` fields for hero customization

**Managing Page Content in Sanity:**

To edit homepage/static page content via Sanity Studio:

1. Create a new "Page" document in Sanity Studio
2. Set the `pageType` to one of: `home`, `about`, `logistics`, `certifications`
3. Fill in the `heroTitle` and `heroSubtitle` for custom hero text
4. Optionally set `seoTitle` and `seoDescription` for SEO metadata
5. The site will automatically use this content when available

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

Copyright © 2025 Frezya Dış Ticaret Ltd. Şti. All rights reserved.

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

### Bulk Product Import from CSV

The studio supports bulk importing products from CSV files. This is useful for importing large datasets or migrating from other systems.

#### CSV Format

The CSV file should have the following columns:

| Column | Required | Description |
|--------|----------|-------------|
| `title` | Yes | Product name |
| `slug` | No | URL-friendly identifier (auto-generated from title if empty) |
| `category` | Yes | Category name (auto-created if doesn't exist) |
| `shortDescription` | No | Brief product summary (max 200 characters) |
| `longDescription` | No | Detailed product description |
| `packaging` | No | Packaging options (e.g., "Glass bottles 250ml, 500ml, 1L") |
| `moq` | No | Minimum Order Quantity (e.g., "500L" or "100 units") |
| `origin` | No | Country or region of origin |
| `shelfLife` | No | Shelf life information (e.g., "18 months") |
| `hsCode` | No | HS code for customs |
| `certifications` | No | Comma-separated list (e.g., "HACCP, ISO 22000, Halal") |
| `featured` | No | Boolean: true/false (marks product as featured) |
| `imageUrl` | No | URL or path to product image (validated but not uploaded) |

#### Example CSV

```csv
title,slug,category,shortDescription,longDescription,packaging,moq,origin,shelfLife,hsCode,certifications,featured,imageUrl
Premium Olive Oil,,Oils & Condiments,Extra virgin cold-pressed olive oil,Our premium olive oil is carefully crafted...,Glass bottles 250ml-1L,500L,Turkey,18 months,1509.10,"HACCP, ISO 22000",true,/products/olive-oil.jpg
Organic Honey,organic-honey,Honey Products,Pure organic wildflower honey,Sourced from mountain apiaries...,Jars 250g-1kg,200kg,Greece,24 months,0409.00,"HACCP, Organic",false,https://example.com/honey.jpg
```

#### Running the Import

1. Ensure your `.env` file has the Sanity credentials (same as seeding):
```bash
SANITY_STUDIO_PROJECT_ID=your-project-id
SANITY_STUDIO_DATASET=production
SANITY_WRITE_TOKEN=your-write-token
```

2. Run the import script with your CSV file:
```bash
cd studio
npm run import:csv -- /path/to/products.csv
```

#### Validations

The import script performs the following validations:
- **Required fields**: `title` and `category` must be present
- **Slug generation**: Auto-generates slug from title if not provided
- **Category handling**: Auto-creates categories that don't exist
- **Image URL**: Validates URL format (relative paths like `/products/` or absolute URLs)
- **Deterministic IDs**: Uses `product-{slug}` format to prevent duplicates on re-runs

#### Notes

- Products are upserted (created or updated) based on their slug
- If a category doesn't exist, it will be automatically created with a generated slug
- Image URLs are validated but images are not automatically uploaded to Sanity
- The script provides a summary of imported and failed products

### Studio Structure

```
studio/
├── sanity.config.ts    # Sanity configuration (basePath = "/")
├── schemas/            # Content schemas
│   ├── index.ts
│   ├── product.ts
│   ├── category.ts
│   ├── page.ts
│   └── bulkImportGuide.ts
├── scripts/            # Utility scripts
│   ├── seedFromLocal.ts      # Data seeding from local site data
│   └── importProductsFromCSV.ts  # CSV bulk import script
├── package.json        # Studio dependencies
├── tsconfig.json       # TypeScript configuration
└── .env.example        # Environment variables template
```

### Notes

- The Studio is configured with `basePath: "/"` for standalone deployment
- The main Next.js site (`/site`) continues to use Sanity via `site/lib/sanity.ts` for data fetching
- The `/site/pages/admin.tsx` page redirects users to the standalone Studio URL