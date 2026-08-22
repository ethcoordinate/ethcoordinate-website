import type { MDXComponents } from "mdx/types";
import Link from "next/link";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Headings
    h1: ({ children }) => (
      <h1
        className="text-3xl lg:text-4xl font-bold text-[var(--color-text-primary)] mb-6 mt-8"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2
        className="text-2xl font-bold text-[var(--color-text-primary)] mb-4 mt-8"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3
        className="text-xl font-semibold text-[var(--color-text-primary)] mb-3 mt-6"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {children}
      </h3>
    ),

    // Paragraphs
    p: ({ children }) => (
      <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4">
        {children}
      </p>
    ),

    // Links
    a: ({ href, children }) => {
      const isExternal = href?.startsWith("http");

      // Prevent javascript: URLs
      if (href?.startsWith("javascript:")) {
        return <span>{children}</span>;
      }

      if (isExternal) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-primary-400)] hover:text-[var(--color-primary-300)] underline underline-offset-2"
          >
            {children}
          </a>
        );
      }

      return (
        <Link
          href={href || "#"}
          className="text-[var(--color-primary-400)] hover:text-[var(--color-primary-300)] underline underline-offset-2"
        >
          {children}
        </Link>
      );
    },

    // Lists
    ul: ({ children }) => (
      <ul className="list-disc list-inside space-y-2 mb-4 text-[var(--color-text-secondary)] ml-4">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside space-y-2 mb-4 text-[var(--color-text-secondary)] ml-4">
        {children}
      </ol>
    ),
    li: ({ children }) => <li className="leading-relaxed">{children}</li>,

    // Code
    code: ({ children }) => (
      <code className="px-1.5 py-0.5 rounded bg-[var(--color-bg-elevated)] text-[var(--color-primary-300)] text-sm font-mono">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="p-4 rounded-xl bg-[var(--color-bg-surface)] border border-[var(--color-border)] overflow-x-auto mb-4">
        {children}
      </pre>
    ),

    // Blockquote
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[var(--color-primary-600)] pl-4 my-4 text-[var(--color-text-muted)] italic">
        {children}
      </blockquote>
    ),

    // Horizontal rule
    hr: () => (
      <hr className="border-t border-[var(--color-border)] my-8" />
    ),

    // Strong and emphasis
    strong: ({ children }) => (
      <strong className="font-semibold text-[var(--color-text-primary)]">
        {children}
      </strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,

    ...components,
  };
}
