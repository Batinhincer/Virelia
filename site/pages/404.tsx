import Link from 'next/link';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import CTAButton from '@/components/CTAButton';

export default function Custom404() {
  return (
    <div className="min-h-screen bg-bg text-text">
      <Head>
        <title>404 - Page Not Found | Virelia</title>
        <meta name="description" content="The page you're looking for doesn't exist." />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <Header />

      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center mt-[80px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-xl mx-auto px-6 text-center"
        >
          {/* 404 Number */}
          <div className="relative mb-8">
            <span className="text-[150px] lg:text-[200px] font-bold text-primary/10 leading-none select-none">
              404
            </span>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                className="w-24 h-24 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>

          {/* Message */}
          <h1 className="text-h2 font-bold text-text-heading mb-4">
            Page Not Found
          </h1>
          <p className="text-xl text-text-muted mb-8 leading-relaxed">
            Oops! The page you're looking for doesn't exist or has been moved.
            Let us help you find what you need.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CTAButton href="/">Back to Home</CTAButton>
            <CTAButton href="/#products" variant="secondary">
              Browse Products
            </CTAButton>
          </div>

          {/* Helpful Links */}
          <div className="mt-12 pt-8 border-t border-bg-surface">
            <p className="text-sm text-text-muted mb-4">You might be looking for:</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/about"
                className="text-primary hover:text-primary-dark transition-colors"
              >
                About Us
              </Link>
              <span className="text-text-light">•</span>
              <Link
                href="/logistics"
                className="text-primary hover:text-primary-dark transition-colors"
              >
                Logistics
              </Link>
              <span className="text-text-light">•</span>
              <Link
                href="/certifications"
                className="text-primary hover:text-primary-dark transition-colors"
              >
                Certifications
              </Link>
              <span className="text-text-light">•</span>
              <Link
                href="/#contact"
                className="text-primary hover:text-primary-dark transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="bg-text-heading text-bg py-12">
        <div className="container-custom text-center">
          <p className="mb-3 text-lg">
            &copy; {new Date().getFullYear()} Virelia Ticaret Limited Şirketi.
            All rights reserved.
          </p>
          <p className="text-sm text-text-muted">
            Premium Mediterranean Food Products | B2B Export Solutions
          </p>
        </div>
      </footer>
    </div>
  );
}
