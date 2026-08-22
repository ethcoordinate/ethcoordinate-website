import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FloatingOcto from "@/components/FloatingOcto";
import BlogPostCard from "@/components/BlogPostCard";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Updates on Ethereum governance, network upgrades, staking support, and protocol coordination from EthCoordinate.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <Navigation />
      <main id="main-content" tabIndex={-1} className="relative z-10 max-w-[1100px] mx-auto page-container">
        <div className="page-header">
          <h1 className="page-title">Blog</h1>
          <p className="page-desc">
            Updates, insights, and announcements from EthCoordinate and the
            Ethereum coordination work it stewards.
          </p>
        </div>
        <div className="page-divider" />

        <section className="section">
          {posts.length > 0 ? (
            <div className="grid gap-4">
              {posts.map((post) => (
                <BlogPostCard
                  key={post.slug}
                  slug={post.slug}
                  title={post.frontmatter.title}
                  date={post.frontmatter.date}
                  author={post.frontmatter.author}
                  excerpt={post.frontmatter.excerpt}
                  tags={post.frontmatter.tags}
                />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "4rem 0" }}>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 600, color: "var(--color-text-bright)", marginBottom: "0.75rem" }}>
                No posts yet
              </h2>
              <p style={{ color: "var(--color-text-muted)", fontSize: "0.9rem", maxWidth: 400, margin: "0 auto" }}>
                Check back soon for updates from the EthCoordinate team.
                In the meantime, explore our{" "}
                <Link href="/#initiatives" className="link-blue">initiatives</Link>.
              </p>
            </div>
          )}
        </section>

        <Footer />
      </main>
      <FloatingOcto />
    </>
  );
}
