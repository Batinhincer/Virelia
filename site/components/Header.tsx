import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { categoryInfo } from "@/data/products";
import SearchModal, { SearchButton, useSearchModal } from "@/components/SearchModal";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsExpanded, setIsProductsExpanded] = useState(false);
  const router = useRouter();
  const { isOpen: isSearchOpen, openSearch, closeSearch } = useSearchModal();

  // Close mobile menu on route change
  useEffect(() => {
    const handleRouteChange = () => {
      setIsMobileMenuOpen(false);
      setIsProductsExpanded(false);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => router.events.off("routeChangeComplete", handleRouteChange);
  }, [router.events]);

  // Close mobile menu on ESC key
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape" && isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
      setIsProductsExpanded(false);
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Check if a link is active
  const isActiveLink = (href: string) => {
    if (href === "/") {
      return router.pathname === "/";
    }
    return router.pathname.startsWith(href);
  };

  // Check if products section is active
  const isProductsActive = () => {
    return router.pathname.startsWith("/product") || router.pathname.startsWith("/products");
  };

  const navLinkClasses = (href: string, isProducts = false) => {
    const active = isProducts ? isProductsActive() : isActiveLink(href);
    return `text-white hover:text-secondary-light transition-colors duration-300 relative pb-1 ${
      active
        ? "text-secondary-light after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-secondary-light"
        : "after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-secondary-light after:transition-all after:duration-300 hover:after:w-full"
    }`;
  };

  const mobileNavLinkClasses = (href: string, isProducts = false) => {
    const active = isProducts ? isProductsActive() : isActiveLink(href);
    return `block py-3 text-lg font-medium transition-colors duration-200 ${
      active ? "text-secondary-light" : "text-white hover:text-secondary-light"
    }`;
  };

  return (
    <header className="bg-primary text-white shadow-soft-lg fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-opacity-95">
      <div className="container-custom flex justify-between items-center py-5">
        {/* Logo */}
        <Link href="/" aria-label="Frezya - Home">
          <span className="text-3xl font-bold tracking-tight cursor-pointer hover:text-secondary-light transition-colors duration-300 font-heading">
            Frezya
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex space-x-10 text-sm font-medium items-center" aria-label="Main navigation">
          <Link href="/" className={navLinkClasses("/")}>
            Home
          </Link>
          <div className="relative group">
            <button 
              className={navLinkClasses("/products", true)}
              aria-haspopup="true"
              aria-expanded="false"
            >
              Products
            </button>
            <div 
              className="absolute left-0 mt-4 w-72 bg-white text-text rounded-2xl shadow-soft-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 overflow-hidden"
              role="menu"
              aria-label="Product categories"
            >
              {categoryInfo.map((category) => (
                <Link
                  key={category.slug}
                  href={`/products/${category.slug}`}
                  className="block px-5 py-3 hover:bg-bg-surface transition-colors duration-200 border-b border-bg-surface last:border-b-0"
                  role="menuitem"
                >
                  <div className="font-medium text-text-heading">{category.name}</div>
                  <div className="text-xs text-text-muted mt-0.5 line-clamp-1">
                    {category.description.split('.')[0]}
                  </div>
                </Link>
              ))}
              <Link
                href="/#products"
                className="block px-5 py-3 hover:bg-primary hover:text-white transition-colors duration-200 font-semibold text-center text-primary"
                role="menuitem"
              >
                View All Products →
              </Link>
            </div>
          </div>
          <Link href="/about" className={navLinkClasses("/about")}>
            About
          </Link>
          <Link href="/logistics" className={navLinkClasses("/logistics")}>
            Logistics
          </Link>
          <Link href="/certifications" className={navLinkClasses("/certifications")}>
            Certifications
          </Link>
          <a href="/#contact" className={navLinkClasses("/#contact")}>
            Contact
          </a>
          {/* Desktop Search Button */}
          <SearchButton onClick={openSearch} />
        </nav>

        {/* Mobile Controls */}
        <div className="flex items-center gap-2 lg:hidden">
          {/* Mobile Search Button */}
          <SearchButton onClick={openSearch} />
          
          {/* Mobile Menu Button */}
          <button
            className="p-2 rounded-lg hover:bg-primary-dark transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-secondary-light focus:ring-offset-2 focus:ring-offset-primary"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Panel */}
      <nav
        id="mobile-menu"
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-primary z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Mobile navigation"
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-5 border-b border-primary-dark">
            <span className="text-2xl font-bold font-heading">Frezya</span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-primary-dark transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-secondary-light"
              aria-label="Close menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Mobile Menu Links */}
          <div className="flex-1 overflow-y-auto px-5 py-4">
            <Link href="/" className={mobileNavLinkClasses("/")}>
              Home
            </Link>

            {/* Products with expandable submenu */}
            <div>
              <button
                onClick={() => setIsProductsExpanded(!isProductsExpanded)}
                className={`w-full flex items-center justify-between py-3 text-lg font-medium transition-colors duration-200 ${
                  isProductsActive() ? "text-secondary-light" : "text-white hover:text-secondary-light"
                }`}
                aria-expanded={isProductsExpanded}
                aria-controls="mobile-products-menu"
              >
                <span>Products</span>
                <svg
                  className={`w-5 h-5 transform transition-transform duration-200 ${
                    isProductsExpanded ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                id="mobile-products-menu"
                className={`pl-4 overflow-hidden transition-all duration-300 ${
                  isProductsExpanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                }`}
                role="menu"
              >
                {categoryInfo.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/products/${category.slug}`}
                    className="block py-2 text-sm text-white/80 hover:text-secondary-light transition-colors duration-200"
                    role="menuitem"
                  >
                    {category.name}
                  </Link>
                ))}
                <Link
                  href="/#products"
                  className="block py-2 text-sm text-secondary-light font-medium"
                  role="menuitem"
                >
                  View All Products →
                </Link>
              </div>
            </div>

            <Link href="/about" className={mobileNavLinkClasses("/about")}>
              About
            </Link>
            <Link href="/logistics" className={mobileNavLinkClasses("/logistics")}>
              Logistics
            </Link>
            <Link href="/certifications" className={mobileNavLinkClasses("/certifications")}>
              Certifications
            </Link>
            <a href="/#contact" className={mobileNavLinkClasses("/#contact")}>
              Contact
            </a>
          </div>

          {/* Mobile Menu Footer */}
          <div className="p-5 border-t border-primary-dark">
            <a
              href="/#contact"
              className="block w-full py-3 px-4 text-center font-semibold text-primary bg-white rounded-xl hover:bg-secondary-light transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Request a Quote
            </a>
          </div>
        </div>
      </nav>

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={closeSearch} />
    </header>
  );
}
