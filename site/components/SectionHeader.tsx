interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export default function SectionHeader({
  title,
  subtitle,
  centered = false,
}: SectionHeaderProps) {
  return (
    <div className={centered ? "text-center mb-16" : "mb-16"}>
      <h2 className="text-h2 font-heading text-text-heading mb-6">
        {title}
      </h2>
      {subtitle && (
        <p className="text-xl text-text-muted max-w-3xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
