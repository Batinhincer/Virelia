import Head from "next/head";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Breadcrumb from "@/components/Breadcrumb";
import ProductCard from "@/components/ProductCard";
import CTAButton from "@/components/CTAButton";
import CTAStrip from "@/components/CTAStrip";
import { BreadcrumbSchema } from "@/components/SEO";
import {
  getCategoryBySlug,
  getProductsByCategory,
  categoryInfo,
  CategoryInfo,
} from "@/data/products";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://frezya.nl';

interface CategoryPageProps {
  categorySlug: string;
}

export default function CategoryPage({ categorySlug }: CategoryPageProps) {
  const categoryData = getCategoryBySlug(categorySlug);

  if (!categoryData) {
    return (
      <div className="min-h-screen bg-bg">
        <Header />
        <div className="max-w-4xl mx-auto py-32 px-6 text-center mt-[80px]">
          <h1 className="text-h2 font-bold text-text-heading mb-6">
            Category not found
          </h1>
          <p className="text-text-muted mb-10 text-lg">
            The category you're looking for doesn't exist.
          </p>
          <CTAButton href="/">Back to Home</CTAButton>
        </div>
      </div>
    );
  }

  const categoryProducts = getProductsByCategory(categoryData.name);

  // SEO metadata
  const pageTitle = `${categoryData.name} | Virelia`;
  const pageDescription = categoryData.description;
  const pageUrl = `${SITE_URL}/products/${categoryData.slug}`;
  
  // Compute OG image URL with proper fallback
  const getOgImage = (): string => {
    const firstProductImage = categoryProducts[0]?.image;
    if (!firstProductImage) {
      return `${SITE_URL}/hero1.jpg`;
    }
    return firstProductImage.startsWith('http') 
      ? firstProductImage 
      : `${SITE_URL}${firstProductImage}`;
  };
  const ogImage = getOgImage();

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: categoryData.name },
  ];

  return (
    <div className="min-h-screen bg-bg text-text">
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={pageUrl} />
        
        {/* OpenGraph tags */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={ogImage} />
        <meta property="og:site_name" content="Virelia" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={ogImage} />
      </Head>

      {/* JSON-LD Breadcrumb Schema */}
      <BreadcrumbSchema items={breadcrumbItems} />

      <Header />

      <div className="container-custom py-12 mt-[80px]">
        <Breadcrumb items={breadcrumbItems} />

        {/* Category Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-h1 font-bold text-text-heading mb-6">
            {categoryData.name}
          </h1>
          <p className="text-xl text-text-muted leading-relaxed max-w-3xl">
            {categoryData.description}
          </p>
          <div className="mt-6 text-sm text-text-light">
            {categoryProducts.length} product{categoryProducts.length !== 1 ? "s" : ""}{" "}
            available
          </div>
        </motion.div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {categoryProducts.map((product, index) => (
            <motion.div
              key={product.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 bg-primary text-white py-16 px-8 lg:px-12 rounded-3xl shadow-soft-lg"
        >
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-h2 font-semibold mb-6">
              Interested in {categoryData.name}?
            </h2>
            <p className="text-xl leading-relaxed mb-10 text-white/90">
              Contact our sales team for pricing, minimum order quantities, and
              custom packaging options. We're here to help you source the perfect
              products for your market.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <a
                  href="/#contact"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-2xl font-semibold text-lg text-primary bg-white transition-all duration-200 hover:bg-secondary-light hover:shadow-soft-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary"
                >
                  Request a Quote
                </a>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <a
                  href="mailto:batinhincer@gmail.com"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-2xl font-semibold text-lg text-white bg-transparent border-2 border-white transition-all duration-200 hover:bg-white hover:text-primary hover:shadow-soft focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary"
                >
                  Contact Sales
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* CTA Strip */}
      <CTAStrip />

      {/* Footer */}
      <footer className="bg-text-heading text-bg py-12 mt-20">
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

// This function tells Next.js which category slugs to pre-render at build time
export async function getStaticPaths() {
  const paths = categoryInfo.map((cat) => ({
    params: { category: cat.slug },
  }));

  return {
    paths,
    fallback: false, // Show 404 for non-existent categories
  };
}

// This function generates the props for each category page
export async function getStaticProps({ params }: { params: { category: string } }) {
  return {
    props: {
      categorySlug: params.category,
    },
  };
}
