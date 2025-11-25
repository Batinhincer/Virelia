import type { PortableTextBlock } from '@/lib/sanity';
import React from 'react';

interface PortableTextRendererProps {
  content: PortableTextBlock[];
  className?: string;
}

// Escape HTML special characters to prevent XSS
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}

// Render text with marks as React elements
function renderTextWithMarks(
  children: PortableTextBlock['children']
): React.ReactNode[] {
  return children.map((child, index) => {
    const escapedText = escapeHtml(child.text);
    let element: React.ReactNode = escapedText;

    if (child.marks?.includes('strong')) {
      element = <strong key={`strong-${index}`}>{element}</strong>;
    }
    if (child.marks?.includes('em')) {
      element = <em key={`em-${index}`}>{element}</em>;
    }

    return <React.Fragment key={child._key || index}>{element}</React.Fragment>;
  });
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

        const textElements = renderTextWithMarks(block.children);

        switch (block.style) {
          case 'h2':
            return (
              <h2
                key={block._key}
                className="text-h2 font-semibold text-text-heading mb-6 mt-12 first:mt-0"
              >
                {textElements}
              </h2>
            );
          case 'h3':
            return (
              <h3
                key={block._key}
                className="text-h3 font-semibold text-text-heading mb-4 mt-8"
              >
                {textElements}
              </h3>
            );
          case 'blockquote':
            return (
              <blockquote
                key={block._key}
                className="border-l-4 border-primary pl-6 my-8 italic text-text-muted"
              >
                {textElements}
              </blockquote>
            );
          default:
            return (
              <p
                key={block._key}
                className="text-lg text-text leading-relaxed mb-6"
              >
                {textElements}
              </p>
            );
        }
      })}
    </div>
  );
}
