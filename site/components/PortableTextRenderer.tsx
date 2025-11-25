import type { PortableTextBlock } from '@/lib/sanity';

interface PortableTextRendererProps {
  content: PortableTextBlock[];
  className?: string;
}

export default function PortableTextRenderer({
  content,
  className = '',
}: PortableTextRendererProps) {
  if (!content || content.length === 0) {
    return null;
  }

  return (
    <div className={`prose prose-lg max-w-none ${className}`}>
      {content.map((block) => {
        if (block._type !== 'block') {
          return null;
        }

        const text = block.children
          .map((child) => {
            let textContent = child.text;
            if (child.marks?.includes('strong')) {
              textContent = `<strong>${textContent}</strong>`;
            }
            if (child.marks?.includes('em')) {
              textContent = `<em>${textContent}</em>`;
            }
            return textContent;
          })
          .join('');

        switch (block.style) {
          case 'h2':
            return (
              <h2
                key={block._key}
                className="text-h2 font-semibold text-text-heading mb-6 mt-12 first:mt-0"
                dangerouslySetInnerHTML={{ __html: text }}
              />
            );
          case 'h3':
            return (
              <h3
                key={block._key}
                className="text-h3 font-semibold text-text-heading mb-4 mt-8"
                dangerouslySetInnerHTML={{ __html: text }}
              />
            );
          case 'blockquote':
            return (
              <blockquote
                key={block._key}
                className="border-l-4 border-primary pl-6 my-8 italic text-text-muted"
                dangerouslySetInnerHTML={{ __html: text }}
              />
            );
          default:
            return (
              <p
                key={block._key}
                className="text-lg text-text leading-relaxed mb-6"
                dangerouslySetInnerHTML={{ __html: text }}
              />
            );
        }
      })}
    </div>
  );
}
