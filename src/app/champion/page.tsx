import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FloatingOcto from "@/components/FloatingOcto";
import Link from "next/link";

export const metadata: Metadata = {
  title: "EIP Champion's Handbook",
  description:
    "A practical guide to championing an EIP through the Ethereum protocol process, from preparation to mainnet inclusion.",
};

const journeySteps = [
  {
    num: 1,
    label: "Prepare",
    desc: "Assess readiness, understand the landscape, identify stakeholders",
    color: "var(--coord-cyan)",
  },
  {
    num: 2,
    label: "Propose",
    desc: "Open a PFI PR, begin implementations, create a Forkcast entry",
    color: "var(--coord-purple)",
  },
  {
    num: 3,
    label: "Build Consensus",
    desc: "Engage client teams, gather evidence, drive toward CFI",
    color: "var(--coord-yellow)",
  },
  {
    num: 4,
    label: "Ship",
    desc: "SFI, devnets, testnets, mainnet",
    color: "var(--coord-green)",
  },
];

const checklist = [
  {
    text: "Time commitment",
    detail:
      "Are you available for the next few months to coordinate and follow up?",
  },
  {
    text: "Know your layer",
    detail:
      "Execution, consensus, or cross-layer? Which client teams are most impacted?",
  },
  {
    text: "Know your stakeholders",
    detail:
      "Who else needs to understand this change: wallets, dApps, L2s, infra?",
  },
  {
    text: "Understand the tradeoffs",
    detail:
      "What needs benchmarking, careful reasoning, or is likely to be contentious?",
  },
  {
    text: "Implementation plan",
    detail:
      "Who is likely to implement? What's the first concrete milestone?",
  },
  {
    text: "Be reachable",
    detail:
      "Plan to be responsive in R&D Discord, GitHub, and on calls when your EIP is discussed.",
  },
];

const keyLinks = [
  {
    label: "Champion Guide on GitHub",
    href: "https://github.com/ethereum/pm/blob/master/processes/2026_championing_an_EIP.md",
    color: "var(--coord-cyan)",
  },
  {
    label: "Forkcast",
    href: "https://forkcast.org",
    color: "var(--coord-purple)",
  },
  {
    label: "R&D Discord",
    href: "https://discord.gg/EVTQ9crVgQ",
    color: "var(--coord-green)",
  },
  {
    label: "ethereum/pm",
    href: "https://github.com/ethereum/pm",
    color: "var(--coord-yellow)",
  },
  {
    label: "EIP Office Hours",
    href: "https://github.com/ethereum/pm/issues?q=label%3AEIPOfficeHr",
    color: "var(--coord-pink)",
  },
];

export default function ChampionGuidePage() {
  return (
    <>
      <Navigation />
      <main id="main-content" tabIndex={-1} className="relative z-10 max-w-[1100px] mx-auto page-container">
        {/* Breadcrumb */}
        <div className="page-header">
          <div className="guide-breadcrumb">
            <Link href="/guides" className="link-muted">
              Guides
            </Link>
            <span style={{ color: "var(--color-text-dim)" }}>/</span>
            <span style={{ color: "var(--color-text-bright)" }}>
              Champion&apos;s Handbook
            </span>
          </div>

          <h1 className="page-title">EIP Champion&apos;s Handbook</h1>
          <p className="page-desc" style={{ marginBottom: "1rem" }}>
            Championing an EIP is how protocol changes move from idea to
            mainnet. As a champion, you&apos;re the point person who keeps it moving:
          </p>
          <ul style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            display: "flex",
            flexDirection: "column",
            gap: "0.4rem",
            fontSize: "0.95rem",
            color: "var(--color-text-body)",
            lineHeight: 1.6,
          }}>
            {[
              "Coordinate implementation progress across client teams",
              "Surface concerns and drive them to resolution",
              "Keep information current and easy to find",
              "Engage in predictable venues (calls + Discord) when your EIP is discussed",
            ].map((item) => (
              <li key={item} style={{ display: "flex", alignItems: "baseline", gap: "0.6rem" }}>
                <span style={{ color: "var(--color-blue)", fontSize: "0.7rem", flexShrink: 0 }}>▸</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="page-divider" />

        {/* Journey Map */}
        <section className="section" style={{ paddingTop: "1rem" }}>
          <h2 className="section-title">The Champion&apos;s Journey</h2>
          <div className="guide-journey">
            {journeySteps.map((step, i) => (
              <div key={step.num} className="guide-journey-step">
                <div
                  className="guide-journey-node"
                  style={{ borderColor: step.color, color: step.color }}
                >
                  {step.num}
                </div>
                {i < journeySteps.length - 1 && (
                  <div className="guide-journey-connector" />
                )}
                <div
                  className="guide-journey-label"
                  style={{ color: step.color }}
                >
                  {step.label}
                </div>
                <div className="guide-journey-desc">{step.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Quick-Start Checklist */}
        <section className="section">
          <h2 className="section-title">Quick-Start Checklist</h2>
          <p
            style={{
              color: "var(--color-text-body)",
              fontSize: "0.95rem",
              lineHeight: 1.7,
              marginBottom: "1.5rem",
            }}
          >
            Before you commit to championing an EIP, make sure you can check
            these boxes.
          </p>
          <div className="guide-checklist">
            {checklist.map((item, i) => (
              <div key={i} className="guide-checklist-item">
                <div className="guide-checklist-num">{i + 1}</div>
                <div>
                  <strong
                    style={{
                      color: "var(--color-text-bright)",
                      fontSize: "0.9rem",
                      display: "block",
                      marginBottom: "0.15rem",
                    }}
                  >
                    {item.text}
                  </strong>
                  <span
                    style={{
                      color: "var(--color-text-muted)",
                      fontSize: "0.8rem",
                      lineHeight: 1.5,
                    }}
                  >
                    {item.detail}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Deep Dive Cards */}
        <section className="section">
          <h2 className="section-title">Deep Dives</h2>
          <div className="card-grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(min(380px, 100%), 1fr))" }}>
            <Link
              href="/champion/process"
              className="card"
              style={{ textDecoration: "none" }}
            >
              <div className="flex justify-between items-start mb-3">
                <h3
                  style={{
                    fontSize: "1.15rem",
                    fontWeight: 600,
                    color: "var(--color-text-bright)",
                  }}
                >
                  Navigating the Process
                </h3>
                <span className="card-tag">Process</span>
              </div>
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "var(--color-text-body)",
                  lineHeight: 1.6,
                  marginBottom: "1rem",
                  flex: 1,
                }}
              >
                How ACD calls work, what PFI/CFI/SFI mean in practice, where
                decisions happen, implementation requirements, and how to stay
                informed.
              </p>
              <span className="card-btn">
                Read Guide <span>&rarr;</span>
              </span>
            </Link>

            <Link
              href="/champion/strengthen"
              className="card"
              style={{ textDecoration: "none" }}
            >
              <div className="flex justify-between items-start mb-3">
                <h3
                  style={{
                    fontSize: "1.15rem",
                    fontWeight: 600,
                    color: "var(--color-text-bright)",
                  }}
                >
                  Strengthening Your Proposal
                </h3>
                <span className="card-tag">New</span>
              </div>
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "var(--color-text-body)",
                  lineHeight: 1.6,
                  marginBottom: "1rem",
                  flex: 1,
                }}
              >
                Guidance on validating demand, gathering stakeholder evidence,
                and building a compelling case for inclusion, before you invest
                months of work.
              </p>
              <span className="card-btn">
                Read Guide <span>&rarr;</span>
              </span>
            </Link>
          </div>
        </section>

        {/* Key Links */}
        <section className="section">
          <h2 className="section-title">Key Links</h2>
          <div className="quick-links-grid">
            {keyLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: link.color,
                    flexShrink: 0,
                    opacity: 0.8,
                  }}
                />
                {link.label}
                <span
                  style={{
                    marginLeft: "auto",
                    fontSize: "0.75rem",
                    opacity: 0.4,
                  }}
                >
                  {"\u2197"}
                </span>
              </a>
            ))}
          </div>
        </section>

        <Footer />
      </main>
      <FloatingOcto />
    </>
  );
}
