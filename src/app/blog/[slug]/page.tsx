import { notFound } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FloatingOcto from "@/components/FloatingOcto";
import { getAllPostSlugs, getPostBySlug } from "@/lib/posts";
import Link from "next/link";
import MarkdownRenderer from "@/components/MarkdownRenderer";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);

  if (!post) {
    return {
      title: "Post Not Found | EthCoordinate",
    };
  }

  return {
    title: `${post.frontmatter.title} | EthCoordinate`,
    description: post.frontmatter.excerpt,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const formattedDate = new Date(post.frontmatter.date).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <>
      <Navigation />
      <main id="main-content" tabIndex={-1} className="relative z-10 max-w-[1100px] mx-auto" style={{ padding: "0 2rem" }}>
        <div className="page-header">
          <Link
            href="/blog"
            className="link-blue"
            style={{ fontSize: "0.85rem", display: "inline-flex", alignItems: "center", gap: "0.4rem", marginBottom: "2rem" }}
          >
            &larr; Back to Blog
          </Link>

          {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
            <div className="flex flex-wrap gap-2" style={{ marginBottom: "1rem" }}>
              {post.frontmatter.tags.map((tag) => (
                <span key={tag} className="card-tag">{tag}</span>
              ))}
            </div>
          )}

          <h1 className="page-title">{post.frontmatter.title}</h1>

          <div className="flex items-center gap-3" style={{ marginTop: "1rem", fontSize: "0.85rem", color: "var(--color-text-muted)" }}>
            <span style={{ color: "var(--color-text-secondary)" }}>{post.frontmatter.author}</span>
            <span style={{ width: 3, height: 3, borderRadius: "50%", background: "var(--color-border)", display: "inline-block" }} />
            <time dateTime={post.frontmatter.date}>{formattedDate}</time>
          </div>
        </div>
        <div className="page-divider" />

        <section className="section">
          <article style={{ maxWidth: 700 }}>
            <MarkdownRenderer content={post.content} />
          </article>
        </section>

        <div style={{ borderTop: "1px solid var(--color-border)", paddingTop: "1.5rem", marginBottom: "3rem" }}>
          <Link href="/blog" className="link-blue" style={{ fontSize: "0.85rem", display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
            &larr; All Posts
          </Link>
        </div>

        <Footer />
      </main>
      <FloatingOcto />
    </>
  );
}
