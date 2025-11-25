import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { products, categoryInfo } from "@/data/products";
import { PLACEHOLDER_IMAGE } from "@/lib/constants";

interface SearchResult {
  slug: string;
  title: string;
  shortDesc: string;
  category: string;
  image: string;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Debounced search function
  const searchProducts = useCallback((searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    const normalizedQuery = searchQuery.toLowerCase().trim();

    // Search through local products (fallback data)
    const matchedProducts = products.filter((product) => {
      const titleMatch = product.title.toLowerCase().includes(normalizedQuery);
      const categoryMatch = product.category.toLowerCase().includes(normalizedQuery);
      const descMatch = product.shortDesc.toLowerCase().includes(normalizedQuery);
      return titleMatch || categoryMatch || descMatch;
    });

    // Map to search result format
    const searchResults: SearchResult[] = matchedProducts.map((product) => ({
      slug: product.slug,
      title: product.title,
      shortDesc: product.shortDesc,
      category: product.category,
      image: product.image,
    }));

    setResults(searchResults);
    setSelectedIndex(0);
    setIsLoading(false);
  }, []);

  // Debounce effect for search
  useEffect(() => {
    const timer = setTimeout(() => {
      searchProducts(query);
    }, 200);

    return () => clearTimeout(timer);
  }, [query, searchProducts]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
    if (!isOpen) {
      setQuery("");
      setResults([]);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "Escape":
          e.preventDefault();
          onClose();
          break;
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev < results.length - 1 ? prev + 1 : prev
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
          break;
        case "Enter":
          e.preventDefault();
          if (results[selectedIndex]) {
            window.location.href = `/product/${results[selectedIndex].slug}`;
          }
          break;
      }
    },
    [isOpen, onClose, results, selectedIndex]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Scroll selected item into view
  useEffect(() => {
    if (resultsRef.current && results.length > 0) {
      const selectedElement = resultsRef.current.children[selectedIndex] as HTMLElement;
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: "nearest" });
      }
    }
  }, [selectedIndex, results.length]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Focus trap
  useEffect(() => {
    if (!isOpen || !modalRef.current) return;

    const focusableElements = modalRef.current.querySelectorAll(
      'a[href], button, input, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.addEventListener("keydown", handleTabKey);
    return () => document.removeEventListener("keydown", handleTabKey);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] transition-opacity duration-200"
        onClick={onClose}
        aria-hidden="true"
        data-testid="search-backdrop"
      />

      {/* Modal */}
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="search-modal-title"
        className="fixed inset-x-4 top-[10vh] sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 sm:w-full sm:max-w-2xl z-[101] transition-all duration-200"
        data-testid="search-modal"
      >
        <div className="bg-white rounded-2xl shadow-soft-lg overflow-hidden">
          {/* Search Header */}
          <div className="p-4 border-b border-bg-surface">
            <h2 id="search-modal-title" className="sr-only">
              Search Products
            </h2>
            <div className="relative">
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-12 pr-12 py-3 text-lg bg-bg-surface rounded-xl border-2 border-transparent focus:border-primary focus:bg-white focus:outline-none transition-all duration-200"
                aria-label="Search products"
                data-testid="search-input"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-text-muted hover:text-text transition-colors duration-200"
                  aria-label="Clear search"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            <div className="flex items-center justify-between mt-3 text-xs text-text-muted">
              <span>
                <kbd className="px-2 py-1 bg-bg-surface rounded font-mono">↑↓</kbd> to navigate
                <span className="mx-2">•</span>
                <kbd className="px-2 py-1 bg-bg-surface rounded font-mono">Enter</kbd> to select
                <span className="mx-2">•</span>
                <kbd className="px-2 py-1 bg-bg-surface rounded font-mono">Esc</kbd> to close
              </span>
            </div>
          </div>

          {/* Results */}
          <div
            ref={resultsRef}
            className="max-h-[50vh] sm:max-h-[60vh] overflow-y-auto"
            role="listbox"
            aria-label="Search results"
            data-testid="search-results"
          >
            {isLoading && (
              <div className="p-8 text-center text-text-muted">
                <div className="inline-block w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                <p className="mt-2">Searching...</p>
              </div>
            )}

            {!isLoading && query && results.length === 0 && (
              <div className="p-8 text-center text-text-muted" data-testid="no-results">
                <svg className="w-12 h-12 mx-auto mb-3 text-text-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-lg font-medium">No products found</p>
                <p className="text-sm mt-1">Try a different search term</p>
              </div>
            )}

            {!isLoading && !query && (
              <div className="p-6">
                <p className="text-sm text-text-muted mb-4">Popular categories</p>
                <div className="grid grid-cols-2 gap-2">
                  {categoryInfo.slice(0, 4).map((category) => (
                    <Link
                      key={category.slug}
                      href={`/products/${category.slug}`}
                      onClick={onClose}
                      className="p-3 bg-bg-surface rounded-xl hover:bg-secondary-light transition-colors duration-200 text-sm font-medium text-text-heading"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {!isLoading && results.length > 0 && (
              <div className="p-2" data-testid="search-results-list">
                {results.map((result, index) => (
                  <Link
                    key={result.slug}
                    href={`/product/${result.slug}`}
                    onClick={onClose}
                    role="option"
                    aria-selected={index === selectedIndex}
                    className={`flex items-center gap-4 p-3 rounded-xl transition-all duration-200 ${
                      index === selectedIndex
                        ? "bg-primary text-white"
                        : "hover:bg-bg-surface"
                    }`}
                    data-testid={`search-result-${result.slug}`}
                  >
                    <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-bg-surface">
                      <img
                        src={result.image || PLACEHOLDER_IMAGE}
                        alt=""
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className={`font-medium truncate ${
                        index === selectedIndex ? "text-white" : "text-text-heading"
                      }`}>
                        {result.title}
                      </h3>
                      <p className={`text-sm truncate ${
                        index === selectedIndex ? "text-white/80" : "text-text-muted"
                      }`}>
                        {result.shortDesc}
                      </p>
                      <span className={`inline-block mt-1 text-xs px-2 py-0.5 rounded-full ${
                        index === selectedIndex
                          ? "bg-white/20 text-white"
                          : "bg-secondary-light text-primary"
                      }`}>
                        {result.category}
                      </span>
                    </div>
                    <svg
                      className={`w-5 h-5 flex-shrink-0 ${
                        index === selectedIndex ? "text-white" : "text-text-light"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-3 border-t border-bg-surface bg-bg-surface/50 flex items-center justify-between text-xs text-text-muted">
            <span>{results.length > 0 ? `${results.length} result${results.length !== 1 ? 's' : ''}` : ''}</span>
            <button
              onClick={onClose}
              className="px-3 py-1.5 bg-white rounded-lg hover:bg-bg-surface transition-colors duration-200 font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

// Search button component to be used in Header
export function SearchButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="p-2 rounded-lg text-white hover:bg-primary-dark transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-secondary-light focus:ring-offset-2 focus:ring-offset-primary"
      aria-label="Search products (Ctrl+K)"
      data-testid="search-button"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </button>
  );
}

// Hook to manage search modal state with keyboard shortcuts
export function useSearchModal() {
  const [isOpen, setIsOpen] = useState(false);

  const openSearch = useCallback(() => setIsOpen(true), []);
  const closeSearch = useCallback(() => setIsOpen(false), []);

  // Global keyboard shortcut (Ctrl+K / Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return { isOpen, openSearch, closeSearch };
}
