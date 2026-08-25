import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FloatingOcto from "@/components/FloatingOcto";
import { communityLinks, faqItems, organization } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Why EthCoordinate exists, how it works, who supports it, and how to join its communities.",
};

const principles = [
  {
    title: "Coordination, not control",
    body: "We help shared work move forward without trying to own Ethereum's roadmap.",
  },
  {
    title: "Credible neutrality",
    body: "We disclose and manage conflicts of interest so people can trust the process and its outcomes.",
  },
  {
    title: "Public by default",
    body: "Our calls, documentation, repositories, and community channels are open to everyone.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main id="main-content" className="relative z-10 max-w-[1100px] mx-auto page-container">
        <header className="page-header about-header">
          <h1 className="page-title">About EthCoordinate</h1>
          <p className="page-desc">
            We support governance operations, help stakeholders engage with the
            protocol, and maintain home-staking tools and software.
          </p>
        </header>
        <div className="page-divider" />

        <section className="about-story section--major" aria-labelledby="story-title">
          <div>
            <p className="page-eyebrow">Our story</p>
            <h2 id="story-title">From EthStaker to EthCoordinate</h2>
          </div>
          <div className="about-story-copy">
            {organization.about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <div className="about-actions">
              <Link href="/#initiatives" className="card-btn">Explore initiatives <span aria-hidden="true">→</span></Link>
              <Link href="/team" className="link-muted initiative-text-link">Meet the team →</Link>
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="principles-title">
          <p className="page-eyebrow">How we work</p>
          <h2 id="principles-title" className="section-title">Principles for coordination</h2>
          <div className="principle-grid">
            {principles.map((principle, index) => (
              <article key={principle.title}>
                <span>0{index + 1}</span>
                <h3>{principle.title}</h3>
                <p>{principle.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="community" className="join-panel" aria-labelledby="join-title">
          <div className="join-intro">
            <p className="page-eyebrow">Join us</p>
            <h2 id="join-title">The community is open to everyone.</h2>
            <p>
              Ask a question in Discord, start a longer thread on Reddit, or
              catch up with workshops and calls on YouTube.
            </p>
            <div className="join-stats" aria-label="Community statistics">
              <div><strong>25k+</strong><span>Discord members</span></div>
              <div><strong>50k+</strong><span>Reddit members</span></div>
            </div>
          </div>
          <div className="join-links">
            {communityLinks.map((channel) => (
              <a key={channel.href} href={channel.href} target="_blank" rel="noopener noreferrer">
                <span><strong>{channel.label}</strong><small>{channel.note}</small></span>
                <span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </section>

        <section id="faq" className="section section--major" aria-labelledby="faq-title">
          <div className="section-heading-row">
            <div>
              <p className="page-eyebrow">A few things worth knowing</p>
              <h2 id="faq-title" className="section-title">FAQ</h2>
            </div>
            <p>We&apos;re just getting started, so consider this an evolving FAQ.</p>
          </div>
          <div className="faq-list">
            {faqItems.map((item, index) => (
              <details key={item.question} className="faq-item">
                <summary>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{item.question}</strong>
                  <span className="faq-toggle" aria-hidden="true" />
                </summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="community-cta" aria-labelledby="about-cta-title">
          <div>
            <p className="page-eyebrow">Open channel</p>
            <h2 id="about-cta-title">Working on something we should know about?</h2>
            <p>Reach the team directly. We read every message.</p>
          </div>
          <a href={`mailto:${organization.email}`} className="card-btn">
            {organization.email} <span aria-hidden="true">↗</span>
          </a>
        </section>

        <Footer />
      </main>
      <FloatingOcto />
    </>
  );
}
