import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FloatingOcto from "@/components/FloatingOcto";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Strengthening Your Proposal: EIP Champion's Handbook",
  description:
    "Guidance on validating ecosystem demand, gathering stakeholder evidence, and building a compelling brief for EIP inclusion.",
};

const tiers = [
  {
    id: "A",
    label: "Demand-Dependent",
    color: "var(--coord-cyan)",
    bg: "rgba(0,212,255,0.08)",
    description:
      "Features that only work if wallets, dApps, or infra providers integrate them. Without voluntary adoption, there's no impact.",
    examples: "maxEB, EIP-7702",
    brief: "Recommended",
  },
  {
    id: "B",
    label: "Exploratory",
    color: "var(--coord-yellow)",
    bg: "rgba(251,191,36,0.08)",
    description:
      "New primitives where users can't articulate demand yet because the thing doesn't exist. Inclusion is thesis-driven, not evidence-driven.",
    examples: "Account abstraction, Merge, Lean Staking",
    brief: "Recommended (lighter bar)",
  },
  {
    id: "C",
    label: "Protocol-Internal & Security",
    color: "var(--coord-green)",
    bg: "rgba(52,211,153,0.08)",
    description:
      "Changes invisible to end users, or security EIPs driven by external threat models rather than user demand.",
    examples: "Faster finality, opcode repricing, post-quantum crypto",
    brief: "Not needed",
  },
];

const faqs = [
  {
    q: "Does this add bureaucracy?",
    a: "It's a one-page document, not a committee. You submit it alongside your spec. If anything, it saves time by surfacing adoption problems early instead of after months of implementation.",
  },
  {
    q: "What if I can't find 10 stakeholders?",
    a: "That's worth knowing before you invest months in implementation. It might mean your EIP is Tier B and the brief should reflect that. Or it might mean the EIP solves a problem nobody has.",
  },
  {
    q: "Is crypto twitter sentiment valid evidence?",
    a: "Sentiment is useful context, but it's not the same as a wallet team telling you they'd integrate. The brief asks for evidence of real conversations with real teams, not engagement metrics.",
  },
];

export default function StrengthenPage() {
  return (
    <>
      <Navigation />
      <main id="main-content" tabIndex={-1} className="relative z-10 max-w-[1100px] mx-auto page-container">
        {/* Breadcrumb */}
        <div className="page-header">
          <div className="guide-breadcrumb">
            <Link href="/guides" className="link-muted">Guides</Link>
            <span style={{ color: "var(--color-text-dim)" }}>/</span>
            <Link href="/champion" className="link-muted">Champion&apos;s Handbook</Link>
            <span style={{ color: "var(--color-text-dim)" }}>/</span>
            <span style={{ color: "var(--color-text-bright)" }}>Strengthening Your Proposal</span>
          </div>

          <h1 className="page-title" style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)" }}>
            Strengthening Your Proposal
          </h1>
          <p className="page-desc">
            The EIP process is rigorous on technical spec, security, and
            implementation quality. This guide addresses a gap it doesn&apos;t
            cover: helping you validate whether your EIP has real ecosystem
            demand.
          </p>
        </div>
        <div className="page-divider" />

        {/* TOC */}
        <nav className="guide-toc" aria-label="Table of contents">
          <span className="guide-toc-label">On this page</span>
          <a href="#why">Why This Exists</a>
          <a href="#tiers">Understanding Your EIP&apos;s Relationship to Demand</a>
          <a href="#brief">The Brief</a>
          <a href="#evidence">Gathering Stakeholder Evidence</a>
          <a href="#tips">Tips for Better Conversations</a>
          <a href="#faq">FAQ</a>
        </nav>

        {/* Why This Exists */}
        <section className="section" id="why">
          <h2 className="section-title">Why This Exists</h2>
          <p style={prose}>
            EIPs that need <strong style={bright}>voluntary adoption</strong> from wallets, dApps,
            L2s, and infra providers benefit from early stakeholder engagement. Without it, champions
            risk reaching CFI on technical merit alone, only to discover that the teams who need to
            integrate haven&apos;t been consulted.
          </p>
          <p style={{ ...prose, marginTop: "0.75rem" }}>
            This guide recommends flipping the typical order: gather stakeholder feedback first, shape
            your research around real needs, then build with committed stakeholders already lined up.
            The result is an EIP that&apos;s harder to argue against at CFI and more likely to see
            adoption after mainnet.
          </p>
          <div className="guide-callout" style={{ marginTop: "1.25rem" }}>
            This is guidance from EthCoordinate, not a requirement. Some EIPs should move
            forward on technical intuition and research conviction alone. This guide helps you
            figure out when that&apos;s the case and when stakeholder evidence will strengthen
            your position.
          </div>
        </section>

        {/* Tiering Framework */}
        <section className="section" id="tiers">
          <h2 className="section-title">Understanding Your EIP&apos;s Relationship to Demand</h2>
          <p style={prose}>
            Not all EIPs relate to market demand the same way. Ask yourself:{" "}
            <strong style={bright}>does my EIP need voluntary adoption to be useful?</strong> The
            answer shapes what kind of evidence will make your case stronger.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1.5rem" }}>
            {tiers.map((tier) => (
              <div key={tier.id} className="guide-tier-card" style={{ borderLeftColor: tier.color }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.5rem" }}>
                  <span className="guide-tier-badge" style={{ background: tier.bg, color: tier.color }}>
                    Tier {tier.id}
                  </span>
                  <strong style={{ color: "var(--color-text-bright)", fontSize: "0.95rem" }}>
                    {tier.label}
                  </strong>
                </div>
                <p style={proseSm}>{tier.description}</p>
                <div style={{ display: "flex", gap: "1.5rem", marginTop: "0.6rem", flexWrap: "wrap" }}>
                  <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>
                    Examples: <span style={{ color: "var(--color-text-secondary)" }}>{tier.examples}</span>
                  </span>
                  <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>
                    Brief: <span style={{ color: tier.color }}>{tier.brief}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>

          <p style={{ ...proseSm, marginTop: "1.25rem", fontStyle: "italic" }}>
            This is a self-assessment to help you understand what evidence will strengthen your case.
            It&apos;s not a formal classification or requirement.
          </p>
        </section>

        {/* The Brief */}
        <section className="section" id="brief">
          <h2 className="section-title">The Brief</h2>
          <p style={prose}>
            If your EIP is Tier A or Tier B, we recommend putting together a short{" "}
            <strong style={bright}>Brief</strong> (~1 page) alongside your technical spec when
            you propose for CFI. It gives ACD participants the information they need to make an
            informed signal. EthCoordinate can help extend your stakeholder reach
            once your EIP is CFI&apos;d.
          </p>

          <div className="guide-brief-template" style={{ marginTop: "1.5rem" }}>
            <div className="guide-brief-header">Brief Template</div>
            <div className="guide-brief-body">
              <div className="guide-brief-section">
                <strong style={bright}>What This Enables</strong>
                <p style={proseSm}>
                  Two to three sentences from the <em>user&apos;s perspective</em>, not the
                  protocol&apos;s. What can someone do after this EIP ships that they can&apos;t do
                  today?
                </p>
              </div>
              <div className="guide-brief-section">
                <strong style={bright}>Stakeholder Evidence</strong>
                <p style={proseSm}>
                  Tier A: documented conversations with 10+ entities.
                  Tier B: a compelling thesis with whatever validation you can gather.
                  See <a href="#evidence" className="link-blue">Gathering Stakeholder Evidence</a> below.
                </p>
              </div>
              <div className="guide-brief-section">
                <strong style={bright}>Adoption Path</strong>
                <p style={proseSm}>
                  Who integrates first? What&apos;s the realistic timeline for meaningful
                  adoption after mainnet? (Or for Tier B: what needs to happen for adoption to
                  emerge?)
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Gathering Stakeholder Evidence */}
        <section className="section" id="evidence">
          <h2 className="section-title">Gathering Stakeholder Evidence</h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "2rem", marginTop: "0.5rem" }}>
            {/* Tier A */}
            <div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--coord-cyan)", marginBottom: "0.75rem" }}>
                Tier A: Validate Problem &amp; Solution
              </h3>
              <p style={prose}>
                Talk to at least 10 entities across the value chain (wallets, dApps, L2s, infra
                providers, protocols) who would need to build on or integrate your EIP. The
                &ldquo;saturation point&rdquo; is when further discussions stop generating new
                perspectives.
              </p>
              <p style={{ ...prose, marginTop: "0.75rem" }}>
                Structure conversations in two parts:
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(300px, 100%), 1fr))", gap: "1rem", marginTop: "1rem" }}>
                <div className="card" style={{ padding: "1.25rem" }}>
                  <span className="guide-tier-badge" style={{ background: "rgba(0,212,255,0.08)", color: "var(--coord-cyan)", marginBottom: "0.75rem", display: "inline-block" }}>
                    Part 1
                  </span>
                  <strong style={{ ...bright, display: "block", marginBottom: "0.5rem", fontSize: "0.9rem" }}>Validate the problem</strong>
                  <p style={proseSm}>
                    Don&apos;t lead with your solution. Start by understanding whether stakeholders
                    actually experience the problem your EIP addresses.
                  </p>
                  <ul style={questionList}>
                    <li>&ldquo;What are your biggest challenges with [area]?&rdquo;</li>
                    <li>&ldquo;How are you working around this today?&rdquo;</li>
                    <li>&ldquo;How important is solving this relative to other priorities?&rdquo;</li>
                  </ul>
                </div>
                <div className="card" style={{ padding: "1.25rem" }}>
                  <span className="guide-tier-badge" style={{ background: "rgba(0,212,255,0.08)", color: "var(--coord-cyan)", marginBottom: "0.75rem", display: "inline-block" }}>
                    Part 2
                  </span>
                  <strong style={{ ...bright, display: "block", marginBottom: "0.5rem", fontSize: "0.9rem" }}>Validate the solution</strong>
                  <p style={proseSm}>
                    Once you understand the problem from their perspective, present your approach.
                    Don&apos;t ask if they like it; ask how they&apos;d use it.
                  </p>
                  <ul style={questionList}>
                    <li>&ldquo;What would your integration timeline look like?&rdquo;</li>
                    <li>&ldquo;What would need to change on your end?&rdquo;</li>
                    <li>&ldquo;What concerns would you have about adopting this?&rdquo;</li>
                  </ul>
                </div>
              </div>

              <div className="guide-callout" style={{ marginTop: "1.25rem" }}>
                <strong style={bright}>Example:</strong>{" "}
                <span style={{ fontSize: "0.85rem", color: "var(--color-text-body)", lineHeight: 1.7 }}>
                  &ldquo;We spoke with MetaMask, Fireblocks, Safe, Coinbase Wallet, and Ambire.
                  All five confirmed they maintain custom relayer infrastructure as a workaround.
                  MetaMask estimated they&apos;d integrate within one release cycle. Coinbase Wallet
                  raised concerns about backwards compatibility and estimated 4–6 months.&rdquo;
                </span>
              </div>
            </div>

            {/* Tier B */}
            <div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--coord-yellow)", marginBottom: "0.75rem" }}>
                Tier B: Build a Compelling Thesis
              </h3>
              <p style={prose}>
                You won&apos;t have 10 teams ready to integrate something that doesn&apos;t exist
                yet, and that&apos;s fine. Make the case for why this will unlock value, what the
                adoption path looks like once the primitive exists, and what comparable attempts have
                been tried elsewhere. Where possible, validate the underlying problem even if the
                solution is still theoretical.
              </p>

              <div className="guide-callout" style={{ marginTop: "1rem" }}>
                <strong style={bright}>Example:</strong>{" "}
                <span style={{ fontSize: "0.85rem", color: "var(--color-text-body)", lineHeight: 1.7 }}>
                  &ldquo;Reducing validator hardware requirements has been a long-standing goal
                  across PoS networks. Efforts to build lighter-weight clients and Ethereum&apos;s
                  own portal network both point to demand for lighter-weight participation. While
                  no staking provider has committed yet, Lido and Rocket Pool have both published
                  research notes on reduced operator overhead.&rdquo;
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Tips */}
        <section className="section" id="tips">
          <h2 className="section-title">Tips for Better Conversations</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(280px, 100%), 1fr))", gap: "1rem" }}>
            <div className="card" style={{ padding: "1.25rem", borderTopColor: "var(--coord-green)", borderTopWidth: 2 }}>
              <strong style={{ color: "var(--coord-green)", fontSize: "0.85rem", display: "block", marginBottom: "0.75rem" }}>
                Do
              </strong>
              <ul style={{ ...questionList, gap: "0.5rem" }}>
                {["Ask open-ended questions that surface real priorities and constraints",
                  "Start with the problem before presenting your solution",
                  "Look for specifics: timelines, trade-offs, concerns",
                ].map((item) => (
                  <li key={item} style={{ display: "flex", alignItems: "baseline", gap: "0.5rem" }}>
                    <span style={{ color: "var(--coord-green)", fontSize: "0.65rem", flexShrink: 0 }}>▸</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card" style={{ padding: "1.25rem", borderTopColor: "var(--coord-pink)", borderTopWidth: 2 }}>
              <strong style={{ color: "var(--coord-pink)", fontSize: "0.85rem", display: "block", marginBottom: "0.75rem" }}>
                Don&apos;t
              </strong>
              <ul style={{ ...questionList, gap: "0.5rem" }}>
                {["Ask yes/no questions: \u201CWould you use this?\u201D invites easy agreement with no commitment",
                  "Lead with your solution and ask if they like it",
                  "Treat \u201Csounds cool\u201D as validation",
                ].map((item) => (
                  <li key={item} style={{ display: "flex", alignItems: "baseline", gap: "0.5rem" }}>
                    <span style={{ color: "var(--coord-pink)", fontSize: "0.65rem", flexShrink: 0 }}>▸</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section" id="faq">
          <h2 className="section-title">FAQ</h2>
          <p style={{ ...prose, marginBottom: "1.25rem" }}>
            Every EIP that reaches CFI costs the ecosystem real resources: client team engineering
            hours, devnet infrastructure, tooling updates, and stakeholder integration work. Doing
            the demand work upfront is cheaper than finding out nobody wanted it after mainnet.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {faqs.map((faq) => (
              <details key={faq.q} className="guide-details">
                <summary className="guide-details-summary">
                  <span style={{ fontWeight: 600, color: "var(--color-text-bright)" }}>{faq.q}</span>
                  <span className="guide-details-toggle" />
                </summary>
                <div className="guide-details-content">
                  <p style={proseSm}>{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Nav */}
        <div className="guide-nav">
          <Link href="/champion/process" className="guide-nav-link">
            <span style={{ fontSize: "0.7rem", color: "var(--color-text-muted)" }}>← Previous</span>
            <span>Navigating the Process</span>
          </Link>
          <Link href="/champion" className="guide-nav-link" style={{ textAlign: "right", marginLeft: "auto" }}>
            <span style={{ fontSize: "0.7rem", color: "var(--color-text-muted)" }}>Back to →</span>
            <span>Champion&apos;s Handbook</span>
          </Link>
        </div>

        <Footer />
      </main>
      <FloatingOcto />
    </>
  );
}

const prose = {
  color: "var(--color-text-body)",
  fontSize: "0.95rem",
  lineHeight: 1.75,
} as const;

const proseSm = {
  color: "var(--color-text-body)",
  fontSize: "0.85rem",
  lineHeight: 1.7,
  margin: 0,
} as const;

const bright = { color: "var(--color-text-bright)" } as const;

const questionList = {
  margin: "0.5rem 0 0",
  paddingLeft: "1.2rem",
  fontSize: "0.82rem",
  color: "var(--color-text-body)",
  lineHeight: 1.7,
  display: "flex",
  flexDirection: "column" as const,
  gap: "0.35rem",
};
