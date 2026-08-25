import Link from "next/link";
import { ReactNode } from "react";

interface CardProps {
  href?: string;
  external?: boolean;
  title: string;
  description: string;
  tag?: string;
  icon?: ReactNode;
  className?: string;
}

export default function Card({
  href,
  external = false,
  title,
  description,
  tag,
  icon,
  className = "",
}: CardProps) {
  const cardContent = (
    <>
      {icon && <div style={{ marginBottom: "0.75rem" }}>{icon}</div>}
      <div className="flex justify-between items-start mb-3">
        <h3 style={{ fontSize: "1.25rem", fontWeight: 600, color: "var(--color-text-bright)" }}>
          {title}
          {external && (
            <span style={{ fontSize: "0.75rem", marginLeft: "0.4rem", opacity: 0.4 }}>{"\u2197"}</span>
          )}
        </h3>
        {tag && <span className="card-tag">{tag}</span>}
      </div>
      <p style={{ fontSize: "0.9rem", color: "var(--color-text-body)", lineHeight: 1.6 }}>
        {description}
      </p>
    </>
  );

  if (!href) {
    return <div className={`card ${className}`}>{cardContent}</div>;
  }

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={`card ${className}`} style={{ textDecoration: "none" }}>
        {cardContent}
      </a>
    );
  }

  return (
    <Link href={href} className={`card ${className}`} style={{ textDecoration: "none" }}>
      {cardContent}
    </Link>
  );
}
