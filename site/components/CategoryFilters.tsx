import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";

// Types for filter state
export interface FilterState {
  packaging: string[];
  origin: string[];
  moqBucket: string[];
  certifications: string[];
}

export type SortOption = "default" | "name-asc" | "name-desc" | "moq-asc";

export interface CategoryProduct {
  slug: string;
  title: string;
  shortDescription: string;
  category: string;
  image: string;
  packaging: string | null;
  moq: string | null;
  origin: string | null;
  certifications?: string[];
  featured?: boolean;
}

// MOQ bucket definitions
export const MOQ_BUCKETS = [
  { key: "lte5", label: "≤5 pallets" },
  { key: "lte10", label: "≤10 pallets" },
  { key: "gt10", label: ">10 pallets" },
] as const;

// Helper to parse MOQ string to a number (extract first number found)
function parseMoqToNumber(moq: string | null): number | null {
  if (!moq) return null;
  const match = moq.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : null;
}

// Helper to determine MOQ bucket
function getMoqBucket(moq: string | null): string | null {
  const moqNum = parseMoqToNumber(moq);
  if (moqNum === null) return null;
  // Simplified buckets based on numeric value (could represent pallets, kg, L, etc.)
  // We'll treat values as-is for bucketing
  if (moqNum <= 5) return "lte5";
  if (moqNum <= 10) return "lte10";
  return "gt10";
}

// Extract unique values from products for filter options
export function extractFilterOptions(products: CategoryProduct[]) {
  const packagingSet = new Set<string>();
  const originSet = new Set<string>();
  const certificationsSet = new Set<string>();

  products.forEach((product) => {
    if (product.packaging) {
      // Split by comma if multiple packaging options
      product.packaging.split(",").forEach((p) => {
        const trimmed = p.trim();
        if (trimmed) packagingSet.add(trimmed);
      });
    }
    if (product.origin) {
      originSet.add(product.origin);
    }
    if (product.certifications) {
      product.certifications.forEach((cert) => certificationsSet.add(cert));
    }
  });

  return {
    packaging: Array.from(packagingSet).sort(),
    origin: Array.from(originSet).sort(),
    certifications: Array.from(certificationsSet).sort(),
  };
}

// Parse URL query params to filter state
export function parseFiltersFromQuery(query: Record<string, string | string[] | undefined>): FilterState {
  const parseParam = (param: string | string[] | undefined): string[] => {
    if (!param) return [];
    const value = Array.isArray(param) ? param[0] : param;
    return value.split(",").filter(Boolean);
  };

  return {
    packaging: parseParam(query.packaging),
    origin: parseParam(query.origin),
    moqBucket: parseParam(query.moq),
    certifications: parseParam(query.certifications),
  };
}

// Parse URL query params to sort option
export function parseSortFromQuery(query: Record<string, string | string[] | undefined>): SortOption {
  const sort = Array.isArray(query.sort) ? query.sort[0] : query.sort;
  if (sort === "name-asc" || sort === "name-desc" || sort === "moq-asc") {
    return sort;
  }
  return "default";
}

// Build query string from filter state
export function buildQueryString(filters: FilterState, sort: SortOption): string {
  const params = new URLSearchParams();

  if (filters.packaging.length > 0) {
    params.set("packaging", filters.packaging.join(","));
  }
  if (filters.origin.length > 0) {
    params.set("origin", filters.origin.join(","));
  }
  if (filters.moqBucket.length > 0) {
    params.set("moq", filters.moqBucket.join(","));
  }
  if (filters.certifications.length > 0) {
    params.set("certifications", filters.certifications.join(","));
  }
  if (sort !== "default") {
    params.set("sort", sort);
  }

  const queryString = params.toString();
  return queryString ? `?${queryString}` : "";
}

// Apply filters to products
export function applyFilters(products: CategoryProduct[], filters: FilterState): CategoryProduct[] {
  return products.filter((product) => {
    // Packaging filter
    if (filters.packaging.length > 0) {
      if (!product.packaging) return false;
      const productPackaging = product.packaging.split(",").map((p) => p.trim());
      const hasMatch = filters.packaging.some((filter) =>
        productPackaging.some((pkg) => pkg.toLowerCase().includes(filter.toLowerCase()))
      );
      if (!hasMatch) return false;
    }

    // Origin filter
    if (filters.origin.length > 0) {
      if (!product.origin) return false;
      if (!filters.origin.includes(product.origin)) return false;
    }

    // MOQ bucket filter
    if (filters.moqBucket.length > 0) {
      const productBucket = getMoqBucket(product.moq);
      if (!productBucket || !filters.moqBucket.includes(productBucket)) return false;
    }

    // Certifications filter
    if (filters.certifications.length > 0) {
      if (!product.certifications || product.certifications.length === 0) return false;
      const hasMatch = filters.certifications.some((cert) =>
        product.certifications!.includes(cert)
      );
      if (!hasMatch) return false;
    }

    return true;
  });
}

// Apply sorting to products
export function applySorting(products: CategoryProduct[], sort: SortOption): CategoryProduct[] {
  const sorted = [...products];

  switch (sort) {
    case "name-asc":
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case "name-desc":
      return sorted.sort((a, b) => b.title.localeCompare(a.title));
    case "moq-asc":
      return sorted.sort((a, b) => {
        const moqA = parseMoqToNumber(a.moq) ?? Infinity;
        const moqB = parseMoqToNumber(b.moq) ?? Infinity;
        return moqA - moqB;
      });
    case "default":
    default:
      // Featured products first, then alphabetically
      return sorted.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return a.title.localeCompare(b.title);
      });
  }
}

// Hook to manage filters with URL sync
export function useCategoryFilters(products: CategoryProduct[]) {
  const router = useRouter();
  const [isInitialized, setIsInitialized] = useState(false);

  // Parse initial state from URL
  const initialFilters = useMemo(
    () => parseFiltersFromQuery(router.query),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isInitialized]
  );
  const initialSort = useMemo(
    () => parseSortFromQuery(router.query),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isInitialized]
  );

  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [sort, setSort] = useState<SortOption>(initialSort);

  // Extract available filter options from products
  const filterOptions = useMemo(() => extractFilterOptions(products), [products]);

  // Initialize from URL when router is ready
  useEffect(() => {
    if (router.isReady && !isInitialized) {
      setFilters(parseFiltersFromQuery(router.query));
      setSort(parseSortFromQuery(router.query));
      setIsInitialized(true);
    }
  }, [router.isReady, router.query, isInitialized]);

  // Update URL when filters or sort change
  const updateUrl = useCallback(
    (newFilters: FilterState, newSort: SortOption) => {
      if (!isInitialized) return;

      const queryString = buildQueryString(newFilters, newSort);
      const currentPath = router.asPath.split("?")[0];
      const newPath = `${currentPath}${queryString}`;

      // Only update if different to avoid unnecessary navigation
      if (router.asPath !== newPath) {
        router.replace(newPath, undefined, { shallow: true });
      }
    },
    [router, isInitialized]
  );

  // Update filters
  const updateFilters = useCallback(
    (newFilters: FilterState) => {
      setFilters(newFilters);
      updateUrl(newFilters, sort);
    },
    [sort, updateUrl]
  );

  // Update sort
  const updateSort = useCallback(
    (newSort: SortOption) => {
      setSort(newSort);
      updateUrl(filters, newSort);
    },
    [filters, updateUrl]
  );

  // Toggle a single filter value
  const toggleFilter = useCallback(
    (category: keyof FilterState, value: string) => {
      const currentValues = filters[category];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];
      updateFilters({ ...filters, [category]: newValues });
    },
    [filters, updateFilters]
  );

  // Clear all filters
  const clearFilters = useCallback(() => {
    updateFilters({
      packaging: [],
      origin: [],
      moqBucket: [],
      certifications: [],
    });
  }, [updateFilters]);

  // Count active filters
  const activeFilterCount = useMemo(() => {
    return (
      filters.packaging.length +
      filters.origin.length +
      filters.moqBucket.length +
      filters.certifications.length
    );
  }, [filters]);

  // Apply filters and sorting to products
  const filteredProducts = useMemo(() => {
    const filtered = applyFilters(products, filters);
    return applySorting(filtered, sort);
  }, [products, filters, sort]);

  return {
    filters,
    sort,
    filterOptions,
    filteredProducts,
    activeFilterCount,
    toggleFilter,
    updateFilters,
    updateSort,
    clearFilters,
    isInitialized,
  };
}

// Filter Chip component
function FilterChip({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) {
  return (
    <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary text-white text-sm rounded-full">
      {label}
      <button
        onClick={onRemove}
        className="p-0.5 hover:bg-white/20 rounded-full transition-colors duration-200"
        aria-label={`Remove ${label} filter`}
      >
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </span>
  );
}

// Filter Section component (collapsible on mobile)
function FilterSection({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-bg-surface pb-4 mb-4 last:border-b-0 last:pb-0 last:mb-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-2 text-left font-medium text-text-heading hover:text-primary transition-colors duration-200"
        aria-expanded={isOpen}
      >
        {title}
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pt-2 space-y-2">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Checkbox item component
function FilterCheckbox({
  id,
  label,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label
      htmlFor={id}
      className="flex items-center gap-2 cursor-pointer group"
    >
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 rounded border-2 border-text-light text-primary focus:ring-primary focus:ring-offset-0 cursor-pointer"
      />
      <span className="text-sm text-text group-hover:text-primary transition-colors duration-200">
        {label}
      </span>
    </label>
  );
}

// Main Filter Panel Props
interface CategoryFiltersProps {
  filters: FilterState;
  sort: SortOption;
  filterOptions: {
    packaging: string[];
    origin: string[];
    certifications: string[];
  };
  totalProducts: number;
  filteredCount: number;
  activeFilterCount: number;
  toggleFilter: (category: keyof FilterState, value: string) => void;
  updateSort: (sort: SortOption) => void;
  clearFilters: () => void;
}

// Sort Options
const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "default", label: "Default / Relevance" },
  { value: "name-asc", label: "Name A–Z" },
  { value: "name-desc", label: "Name Z–A" },
  { value: "moq-asc", label: "MOQ (Low → High)" },
];

// Desktop Filter Sidebar
export function DesktopFilterPanel({
  filters,
  sort,
  filterOptions,
  totalProducts,
  filteredCount,
  activeFilterCount,
  toggleFilter,
  updateSort,
  clearFilters,
}: CategoryFiltersProps) {
  return (
    <div className="hidden lg:block w-64 flex-shrink-0" data-testid="desktop-filters">
      <div className="sticky top-[100px] bg-white rounded-2xl shadow-soft p-6">
        {/* Header with stats */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-bg-surface">
          <div>
            <h3 className="font-semibold text-text-heading">Filters</h3>
            <p className="text-xs text-text-muted mt-1" data-testid="filter-stats">
              {filteredCount} product{filteredCount !== 1 ? "s" : ""}
              {activeFilterCount > 0 && ` • ${activeFilterCount} filter${activeFilterCount !== 1 ? "s" : ""} active`}
            </p>
          </div>
          {activeFilterCount > 0 && (
            <button
              onClick={clearFilters}
              className="text-xs text-primary hover:text-primary-dark font-medium transition-colors duration-200"
              data-testid="clear-all-filters"
            >
              Clear all
            </button>
          )}
        </div>

        {/* Sort Dropdown */}
        <div className="mb-6">
          <label htmlFor="sort-desktop" className="block text-sm font-medium text-text-heading mb-2">
            Sort by
          </label>
          <select
            id="sort-desktop"
            value={sort}
            onChange={(e) => updateSort(e.target.value as SortOption)}
            className="w-full px-3 py-2 bg-bg-surface rounded-lg border-0 text-sm text-text focus:ring-2 focus:ring-primary focus:outline-none cursor-pointer"
            data-testid="sort-select"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Packaging Filter */}
        {filterOptions.packaging.length > 0 && (
          <FilterSection title="Packaging">
            {filterOptions.packaging.map((pkg) => (
              <FilterCheckbox
                key={pkg}
                id={`packaging-${pkg}`}
                label={pkg}
                checked={filters.packaging.includes(pkg)}
                onChange={() => toggleFilter("packaging", pkg)}
              />
            ))}
          </FilterSection>
        )}

        {/* Origin Filter */}
        {filterOptions.origin.length > 0 && (
          <FilterSection title="Origin">
            {filterOptions.origin.map((origin) => (
              <FilterCheckbox
                key={origin}
                id={`origin-${origin}`}
                label={origin}
                checked={filters.origin.includes(origin)}
                onChange={() => toggleFilter("origin", origin)}
              />
            ))}
          </FilterSection>
        )}

        {/* MOQ Bucket Filter */}
        <FilterSection title="MOQ">
          {MOQ_BUCKETS.map((bucket) => (
            <FilterCheckbox
              key={bucket.key}
              id={`moq-${bucket.key}`}
              label={bucket.label}
              checked={filters.moqBucket.includes(bucket.key)}
              onChange={() => toggleFilter("moqBucket", bucket.key)}
            />
          ))}
        </FilterSection>

        {/* Certifications Filter */}
        {filterOptions.certifications.length > 0 && (
          <FilterSection title="Certifications">
            {filterOptions.certifications.map((cert) => (
              <FilterCheckbox
                key={cert}
                id={`cert-${cert}`}
                label={cert}
                checked={filters.certifications.includes(cert)}
                onChange={() => toggleFilter("certifications", cert)}
              />
            ))}
          </FilterSection>
        )}
      </div>
    </div>
  );
}

// Mobile Filter Panel (slide-out)
export function MobileFilterPanel({
  isOpen,
  onClose,
  filters,
  sort,
  filterOptions,
  totalProducts,
  filteredCount,
  activeFilterCount,
  toggleFilter,
  updateSort,
  clearFilters,
}: CategoryFiltersProps & { isOpen: boolean; onClose: () => void }) {
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

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={onClose}
            aria-hidden="true"
            data-testid="mobile-filter-backdrop"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-y-0 right-0 w-full max-w-sm bg-white z-50 lg:hidden overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-filter-title"
            data-testid="mobile-filter-panel"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-bg-surface px-6 py-4 flex items-center justify-between">
              <h2 id="mobile-filter-title" className="text-lg font-semibold text-text-heading">
                Filters & Sort
              </h2>
              <button
                onClick={onClose}
                className="p-2 -mr-2 text-text-muted hover:text-text transition-colors duration-200"
                aria-label="Close filters"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Stats */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-text-muted" data-testid="mobile-filter-stats">
                  {filteredCount} product{filteredCount !== 1 ? "s" : ""}
                  {activeFilterCount > 0 && ` • ${activeFilterCount} filter${activeFilterCount !== 1 ? "s" : ""}`}
                </p>
                {activeFilterCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-primary hover:text-primary-dark font-medium transition-colors duration-200"
                    data-testid="mobile-clear-all"
                  >
                    Clear all
                  </button>
                )}
              </div>

              {/* Sort Dropdown */}
              <div className="mb-6">
                <label htmlFor="sort-mobile" className="block text-sm font-medium text-text-heading mb-2">
                  Sort by
                </label>
                <select
                  id="sort-mobile"
                  value={sort}
                  onChange={(e) => updateSort(e.target.value as SortOption)}
                  className="w-full px-3 py-2 bg-bg-surface rounded-lg border-0 text-sm text-text focus:ring-2 focus:ring-primary focus:outline-none cursor-pointer"
                  data-testid="mobile-sort-select"
                >
                  {SORT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Packaging Filter */}
              {filterOptions.packaging.length > 0 && (
                <FilterSection title="Packaging">
                  {filterOptions.packaging.map((pkg) => (
                    <FilterCheckbox
                      key={pkg}
                      id={`mobile-packaging-${pkg}`}
                      label={pkg}
                      checked={filters.packaging.includes(pkg)}
                      onChange={() => toggleFilter("packaging", pkg)}
                    />
                  ))}
                </FilterSection>
              )}

              {/* Origin Filter */}
              {filterOptions.origin.length > 0 && (
                <FilterSection title="Origin">
                  {filterOptions.origin.map((origin) => (
                    <FilterCheckbox
                      key={origin}
                      id={`mobile-origin-${origin}`}
                      label={origin}
                      checked={filters.origin.includes(origin)}
                      onChange={() => toggleFilter("origin", origin)}
                    />
                  ))}
                </FilterSection>
              )}

              {/* MOQ Bucket Filter */}
              <FilterSection title="MOQ">
                {MOQ_BUCKETS.map((bucket) => (
                  <FilterCheckbox
                    key={bucket.key}
                    id={`mobile-moq-${bucket.key}`}
                    label={bucket.label}
                    checked={filters.moqBucket.includes(bucket.key)}
                    onChange={() => toggleFilter("moqBucket", bucket.key)}
                  />
                ))}
              </FilterSection>

              {/* Certifications Filter */}
              {filterOptions.certifications.length > 0 && (
                <FilterSection title="Certifications">
                  {filterOptions.certifications.map((cert) => (
                    <FilterCheckbox
                      key={cert}
                      id={`mobile-cert-${cert}`}
                      label={cert}
                      checked={filters.certifications.includes(cert)}
                      onChange={() => toggleFilter("certifications", cert)}
                    />
                  ))}
                </FilterSection>
              )}
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-white border-t border-bg-surface px-6 py-4">
              <button
                onClick={onClose}
                className="w-full py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors duration-200"
              >
                Show {filteredCount} product{filteredCount !== 1 ? "s" : ""}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Mobile Filter Button
export function MobileFilterButton({
  onClick,
  activeFilterCount,
}: {
  onClick: () => void;
  activeFilterCount: number;
}) {
  return (
    <button
      onClick={onClick}
      className="lg:hidden inline-flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-soft text-sm font-medium text-text-heading hover:shadow-soft-lg transition-all duration-200"
      aria-label={`Open filters${activeFilterCount > 0 ? `, ${activeFilterCount} active` : ""}`}
      data-testid="mobile-filter-button"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
        />
      </svg>
      <span>Filters</span>
      {activeFilterCount > 0 && (
        <span className="inline-flex items-center justify-center w-5 h-5 bg-primary text-white text-xs rounded-full">
          {activeFilterCount}
        </span>
      )}
    </button>
  );
}

// Active Filters Chips Bar
export function ActiveFiltersBar({
  filters,
  toggleFilter,
  clearFilters,
  activeFilterCount,
}: {
  filters: FilterState;
  toggleFilter: (category: keyof FilterState, value: string) => void;
  clearFilters: () => void;
  activeFilterCount: number;
}) {
  if (activeFilterCount === 0) return null;

  const getMoqLabel = (key: string) => {
    const bucket = MOQ_BUCKETS.find((b) => b.key === key);
    return bucket?.label || key;
  };

  return (
    <div className="flex flex-wrap items-center gap-2 mb-6" data-testid="active-filters-bar">
      {filters.packaging.map((pkg) => (
        <FilterChip key={`pkg-${pkg}`} label={pkg} onRemove={() => toggleFilter("packaging", pkg)} />
      ))}
      {filters.origin.map((origin) => (
        <FilterChip key={`origin-${origin}`} label={origin} onRemove={() => toggleFilter("origin", origin)} />
      ))}
      {filters.moqBucket.map((bucket) => (
        <FilterChip
          key={`moq-${bucket}`}
          label={getMoqLabel(bucket)}
          onRemove={() => toggleFilter("moqBucket", bucket)}
        />
      ))}
      {filters.certifications.map((cert) => (
        <FilterChip key={`cert-${cert}`} label={cert} onRemove={() => toggleFilter("certifications", cert)} />
      ))}
      <button
        onClick={clearFilters}
        className="text-sm text-primary hover:text-primary-dark font-medium transition-colors duration-200 ml-2"
        data-testid="chips-clear-all"
      >
        Clear all
      </button>
    </div>
  );
}

// Empty State Component
export function EmptyFilterResults({ onClearFilters }: { onClearFilters: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-16"
      data-testid="empty-filter-results"
    >
      <svg
        className="w-16 h-16 mx-auto text-text-muted opacity-50 mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
        />
      </svg>
      <h3 className="text-xl font-semibold text-text-heading mb-2">No products match your filters</h3>
      <p className="text-text-muted mb-6">Try adjusting or clearing your filters to see more products.</p>
      <button
        onClick={onClearFilters}
        className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors duration-200"
      >
        Clear all filters
      </button>
    </motion.div>
  );
}
