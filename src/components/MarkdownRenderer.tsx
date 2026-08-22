"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export default function MarkdownRenderer({
  content,
  className = "",
}: MarkdownRendererProps) {
  if (!content) {
    return (
      <div className="card">
        <p style={{ color: "var(--color-text-muted)", fontSize: "0.9rem" }}>Content not available.</p>
      </div>
    );
  }

  return (
    <div className={className}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-3xl lg:text-4xl font-bold text-[var(--color-text-primary)] mb-6 mt-8">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4 mt-8">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-3 mt-6">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4">
              {children}
            </p>
          ),
          a: ({ href, children }) => {
            const isExternal = href?.startsWith("http");
            return (
              <a
                href={href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className="text-[var(--color-primary-400)] hover:text-[var(--color-primary-300)] underline underline-offset-2"
              >
                {children}
              </a>
            );
          },
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
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-[var(--color-primary-600)] pl-4 my-4 text-[var(--color-text-muted)] italic">
              {children}
            </blockquote>
          ),
          img: ({ src, alt }) => (
            // Markdown content can reference arbitrary remote image hosts, so a plain image is intentional here.
            // eslint-disable-next-line @next/next/no-img-element
            <img src={src || ""} alt={alt || ""} className="rounded-xl my-6 w-full h-auto" />
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto my-6">
              <table className="w-full border-collapse text-left text-sm">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-[var(--color-bg-elevated)] text-[var(--color-text-primary)]">
              {children}
            </thead>
          ),
          tbody: ({ children }) => (
            <tbody className="text-[var(--color-text-secondary)]">{children}</tbody>
          ),
          tr: ({ children }) => (
            <tr className="border-b border-[var(--color-border)]">{children}</tr>
          ),
          th: ({ children }) => (
            <th className="px-4 py-3 font-semibold align-top">{children}</th>
          ),
          td: ({ children }) => <td className="px-4 py-3 align-top">{children}</td>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
