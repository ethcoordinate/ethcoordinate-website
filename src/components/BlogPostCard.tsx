import Link from "next/link";

interface BlogPostCardProps {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  tags?: string[];
}

export default function BlogPostCard({
  slug,
  title,
  date,
  author,
  excerpt,
  tags,
}: BlogPostCardProps) {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Link href={`/blog/${slug}`} className="card group" style={{ textDecoration: "none" }}>
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.slice(0, 3).map((tag) => (
            <span key={tag} className="card-tag">{tag}</span>
          ))}
        </div>
      )}

      <h3 style={{ fontSize: "1.15rem", fontWeight: 600, color: "var(--color-text-bright)", marginBottom: "0.5rem" }}>
        {title}
      </h3>

      <p style={{ color: "var(--color-text-body)", fontSize: "0.9rem", lineHeight: 1.6, marginBottom: "1rem" }}>
        {excerpt}
      </p>

      <div className="flex items-center gap-3" style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>
        <span>{author}</span>
        <span style={{ width: 3, height: 3, borderRadius: "50%", background: "var(--color-border)", display: "inline-block" }} />
        <time dateTime={date}>{formattedDate}</time>
      </div>
    </Link>
  );
}
