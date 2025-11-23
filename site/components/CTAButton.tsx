import Link from "next/link";

interface CTAButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  external?: boolean;
}

export default function CTAButton({
  href,
  children,
  variant = "primary",
  external = false,
}: CTAButtonProps) {
  const baseClasses =
    "inline-block px-6 py-3 rounded-md font-medium transition-colors duration-200";
  const variantClasses =
    variant === "primary"
      ? "bg-green-700 text-white hover:bg-green-600"
      : "bg-white text-green-700 border-2 border-green-700 hover:bg-green-50";

  const className = `${baseClasses} ${variantClasses}`;

  if (external || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
