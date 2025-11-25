import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

/** Generate a sanitized test ID from a label */
function generateTestId(label: string): string {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
    .replace(/\s+/g, '-')          // Replace spaces with hyphens
    .replace(/-+/g, '-')           // Collapse multiple hyphens
    .replace(/^-|-$/g, '');        // Trim leading/trailing hyphens
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav 
      className="flex items-center space-x-2 text-sm text-text-muted mb-6"
      aria-label="Breadcrumb"
      data-testid="breadcrumb"
    >
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          {index > 0 && (
            <svg
              className="w-4 h-4 mx-2 text-text-light"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          )}
          {item.href ? (
            <Link
              href={item.href}
              className="hover:text-primary transition-colors font-medium"
              data-testid={`breadcrumb-link-${generateTestId(item.label)}`}
            >
              {item.label}
            </Link>
          ) : (
            <span 
              className="text-text-heading font-medium"
              aria-current="page"
              data-testid={`breadcrumb-current`}
            >
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
}
