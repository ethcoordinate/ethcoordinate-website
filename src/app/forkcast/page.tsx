import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FloatingOcto from "@/components/FloatingOcto";
import Card from "@/components/Card";

export const metadata: Metadata = {
  title: "Forkcast",
  description:
    "Track Ethereum network upgrades in real time. Monitor EIP inclusion, testnet activations, and mainnet readiness across every fork.",
};
import { ForkIcon, MapIcon, GitHubIcon, FileTextIcon, UsersIcon, MessageCircleIcon, GlobeIcon, YouTubeIcon, BookIcon, ShieldIcon } from "@/components/Icons";

export default function ForkcastPage() {
  return (
    <>
      <Navigation />
      <main id="main-content" tabIndex={-1} className="relative z-10 max-w-[1100px] mx-auto page-container">
        <div className="page-header">
          <h1 className="page-title">Forkcast</h1>
          <p className="page-desc">
            Forkcast tracks every Ethereum upgrade from EIP proposal to mainnet:
            AllCoreDevs decisions, client team views, and testing progress in one
            place, so you don&apos;t have to attend every call.
          </p>
          <div className="flex gap-3 flex-wrap" style={{ marginTop: "1.5rem" }}>
            <a href="https://forkcast.org" target="_blank" rel="noopener noreferrer" className="card-btn" style={{ marginTop: 0 }}>
              Visit forkcast.org <span>{"\u2197"}</span>
            </a>
          </div>
          <p style={{ color: "var(--color-text-muted)", fontSize: "0.85rem", marginTop: "1rem" }}>
            New to the process? Start with the <Link href="/navigator" className="link-blue">ACD Navigator</Link> — Forkcast tracks the live record.
          </p>
        </div>
        <div className="page-divider" />

        {/* Why Forkcast Exists */}
        <section className="section">
          <div className="why-forkcast-grid">
            {/* Text */}
            <div>
              <h2 className="section-title">Why Forkcast?</h2>
              <p style={{ color: "var(--color-text-body)", fontSize: "0.95rem", lineHeight: 1.7, marginBottom: "0.75rem" }}>
                Ethereum has no CEO who pushes an update button. An upgrade happens
                only when 11+ independent client teams, researchers, and the community
                agree to change the rules across dozens of calls, hundreds of GitHub
                threads, and months of testing.
              </p>
              <p style={{ color: "var(--color-text-body)", fontSize: "0.95rem", lineHeight: 1.7 }}>
                Forkcast shows that process: which EIPs are proposed, which have
                client support, and how far each upgrade is from mainnet.
              </p>
            </div>
            {/* Fork/merge illustration */}
            <div className="why-forkcast-illustration">
              <svg viewBox="0 0 260 232" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
                {/* Top trunk */}
                <line x1="130" y1="0" x2="130" y2="22" stroke="var(--color-border)" strokeWidth="2" />
                {/* Fork to EL and CL */}
                <path d="M130 22 Q130 42 65 52" stroke="var(--coord-cyan)" strokeWidth="1.5" className="fork-line" fill="none" />
                <path d="M130 22 Q130 42 195 52" stroke="var(--coord-green)" strokeWidth="1.5" className="fork-line" fill="none" />
                {/* EL and CL nodes */}
                <circle cx="65" cy="58" r="8" fill="var(--color-bg-surface)" stroke="var(--coord-cyan)" strokeWidth="1.5" className="fork-node" />
                <circle cx="195" cy="58" r="8" fill="var(--color-bg-surface)" stroke="var(--coord-green)" strokeWidth="1.5" className="fork-node" />
                {/* EL and CL labels */}
                <text x="65" y="44" textAnchor="middle" fill="var(--color-text-muted)" fontSize="9" fontFamily="var(--font-mono)" fontWeight="700">EL</text>
                <text x="195" y="44" textAnchor="middle" fill="var(--color-text-muted)" fontSize="9" fontFamily="var(--font-mono)" fontWeight="700">CL</text>
                {/* Work lines down */}
                <line x1="65" y1="66" x2="65" y2="108" stroke="var(--coord-cyan)" strokeWidth="1" opacity="0.4" strokeDasharray="2 2" />
                <line x1="195" y1="66" x2="195" y2="108" stroke="var(--coord-green)" strokeWidth="1" opacity="0.4" strokeDasharray="2 2" />
                {/* EL and CL merge into Testing */}
                <path d="M65 108 Q65 132 130 142" stroke="var(--coord-cyan)" strokeWidth="1.5" className="fork-line" fill="none" />
                <path d="M195 108 Q195 132 130 142" stroke="var(--coord-green)" strokeWidth="1.5" className="fork-line" fill="none" />
                {/* Testing node */}
                <text x="130" y="128" textAnchor="middle" fill="var(--color-text-muted)" fontSize="9" fontFamily="var(--font-mono)" fontWeight="700">Testing</text>
                <circle cx="130" cy="142" r="8" fill="var(--color-bg-surface)" stroke="var(--coord-purple)" strokeWidth="1.5" className="fork-node" />
                {/* Testing to checkmark */}
                <line x1="130" y1="150" x2="130" y2="182" stroke="var(--coord-purple)" strokeWidth="1" opacity="0.4" strokeDasharray="2 2" />
                {/* Checkmark node */}
                <circle cx="130" cy="190" r="10" fill="var(--color-bg-surface)" stroke="var(--coord-green)" strokeWidth="2" />
                <path d="M125 190 L128.5 193.5 L135 186.5" fill="none" stroke="var(--coord-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                {/* Bottom trunk */}
                <line x1="130" y1="200" x2="130" y2="212" stroke="var(--color-border)" strokeWidth="2" />
                <text x="130" y="224" textAnchor="middle" fill="var(--color-text-muted)" fontSize="9" fontFamily="var(--font-mono)" fontWeight="700">MAINNET</text>
              </svg>
            </div>
          </div>
        </section>

        {/* What Forkcast Shows - feature cards with deep links */}
        <section className="section">
          <h2 className="section-title">What Forkcast Shows</h2>
          <div className="card-grid">
            <Card
              title="Upgrade Dashboards"
              description="See every EIP proposed, considered, or included for each fork, with status history and ACD call references."
              href="https://forkcast.org/upgrade/glamsterdam"
              external
              icon={<ForkIcon color="var(--coord-cyan)" />}
            />
            <Card
              title="Call Summaries"
              description="AI-generated summaries and full transcripts of AllCoreDevs calls, breakout rooms, and working groups."
              href="https://forkcast.org/calls"
              external
              icon={<FileTextIcon color="var(--coord-purple)" />}
            />
            <Card
              title="Client Priorities"
              description="Where all 11 client teams stand on each EIP: support, oppose, or more research is needed."
              href="https://forkcast.org/priority"
              external
              icon={<UsersIcon color="var(--coord-green)" />}
            />
            <Card
              title="Stakeholder Impacts"
              description="Filter upgrade impact by audience: app developers, stakers, node operators, L2 teams, or end users."
              href="https://forkcast.org/upgrade/glamsterdam/stakeholders"
              external
              icon={<GlobeIcon color="var(--coord-yellow)" />}
            />
            <Card
              title="EIP Explorer"
              description="Individual pages for each tracked EIP with plain-language descriptions, stakeholder impacts, and tradeoffs."
              href="https://forkcast.org/eips"
              external
              icon={<BookIcon color="var(--coord-pink)" />}
            />
            <Card
              title="Devnet Tracking"
              description="See which EIPs are live on which devnets and testnets, and how ready each client is."
              href="https://forkcast.org/devnets"
              external
              icon={<ShieldIcon color="var(--coord-cyan-alt)" />}
            />
          </div>
        </section>

        {/* Resources */}
        <section className="section">
          <h2 className="section-title">Related Resources</h2>
          <div className="card-grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(min(440px, 100%), 1fr))" }}>
            <Card
              title="Protocol Upgrade Process"
              description="How Ethereum coordinates network upgrades from proposal to mainnet deployment."
              href="https://github.com/ethereum/pm/blob/master/processes/protocol-upgrade.md"
              external
              icon={<MapIcon color="var(--coord-purple)" />}
            />
            <Card
              title="Forkcast Repository"
              description="Source code and EIP data for forkcast.org. Submit PRs to add your EIP to the tracker."
              href="https://github.com/ethereum/forkcast"
              external
              icon={<GitHubIcon color="var(--coord-cyan)" />}
            />
            <Card
              title="Protocol YouTube"
              description="Recordings of all AllCoreDevs calls, breakout rooms, and working group sessions."
              href="https://www.youtube.com/@EthereumProtocol"
              external
              icon={<YouTubeIcon color="var(--coord-pink)" />}
            />
            <Card
              title="R&D Discord"
              description="Where core developers discuss protocol changes asynchronously between calls."
              href="https://discord.gg/a4gm9nT3Ty"
              external
              icon={<MessageCircleIcon color="var(--coord-cyan-alt)" />}
            />
          </div>
        </section>

        <Footer />
      </main>
      <FloatingOcto />
    </>
  );
}
