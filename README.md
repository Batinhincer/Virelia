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