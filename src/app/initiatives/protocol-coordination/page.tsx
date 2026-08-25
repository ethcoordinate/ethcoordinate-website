import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FloatingOcto from "@/components/FloatingOcto";
import Card from "@/components/Card";
import { getRecentArtifactCalls } from "@/lib/github";
import type { ArtifactCall } from "@/lib/github";
import {
  CalendarIcon, UsersIcon, FileTextIcon,
  YouTubeIcon, GitHubIcon, DiscordIcon,
} from "@/components/Icons";

export const metadata: Metadata = {
  title: "Protocol coordination",
  description:
    "How EthCoordinate helps coordinate Ethereum core protocol development: AllCoreDevs calls, breakout rooms, EIP championing, and Forkcast.",
};

const whereItHappens = [
  {
    title: "AllCoreDevs calls",
    description: "Bi-weekly execution, consensus, and testing calls. Agendas, notes, and recordings are in the ethereum/pm repository.",
    href: "https://forkcast.org/calls?filter=acd",
    external: true,
    icon: <CalendarIcon color="var(--coord-cyan)" />,
  },
  {
    title: "Breakout rooms",
    description: "Technical discussions on specific protocol topics. Anyone can propose one for an EIP, a research question, or work that spans several teams.",
    href: "/breakouts",
    icon: <UsersIcon color="var(--coord-pink)" />,
  },
];

const getInvolved = [
  {
    title: "Watch the calls",
    description: "AllCoreDevs calls are streamed live, and recordings stay available afterward.",
    href: "https://www.youtube.com/@EthereumProtocol",
    external: true,
    icon: <YouTubeIcon color="var(--coord-pink)" />,
  },
  {
    title: "Read the agendas",
    description: "Every call has an issue in ethereum/pm. Comment on it to raise an agenda item.",
    href: "https://github.com/ethereum/pm/issues",
    external: true,
    icon: <GitHubIcon color="var(--coord-cyan)" />,
  },
  {
    title: "Join the R&D Discord",
    description: "Where client teams and researchers talk between calls.",
    href: "https://discord.gg/a4gm9nT3Ty",
    external: true,
    icon: <DiscordIcon color="var(--coord-purple)" />,
  },
  {
    title: "Championing an EIP",
    description: "How to guide a proposal through the process and make a convincing case for including it in an upgrade.",
    href: "/guides/champion",
    external: false,
    icon: <FileTextIcon color="var(--coord-green)" />,
  },
];

export default async function ProtocolCoordinationPage() {
  const [acdeCalls, acdcCalls, acdtCalls] = await Promise.all([
    getRecentArtifactCalls("acde", 3),
    getRecentArtifactCalls("acdc", 3),
    getRecentArtifactCalls("acdt", 3),
  ]);

  return (
    <>
      <Navigation />
      <main id="main-content" tabIndex={-1} className="relative z-10 max-w-[1100px] mx-auto page-container">
        <div className="page-header">
          <h1 className="page-title">Protocol coordination</h1>
          <p className="page-desc">
            We help coordinate core protocol development and related work. ACD
            Calls, breakout rooms, the proposals discussed on them, and the
            notes and recordings.
          </p>
          <div className="flex gap-3 flex-wrap" style={{ marginTop: "1.5rem" }}>
            <a href="https://github.com/ethereum/pm" target="_blank" rel="noopener noreferrer" className="card-btn" style={{ marginTop: 0 }}>
              ethereum/pm on GitHub <span>{"↗"}</span>
            </a>
            <Link href="/forkcast" className="card-btn" style={{ marginTop: 0 }}>
              Explore Forkcast <span>&rarr;</span>
            </Link>
          </div>
        </div>
        <div className="page-divider" />

        {/* Where it happens */}
        <section className="section">
          <h2 className="section-title">Where It Happens</h2>
          <div className="card-grid">
            {whereItHappens.map((item) => (
              <Card key={item.href} title={item.title} description={item.description} href={item.href} external={item.external} icon={item.icon} />
            ))}
          </div>
        </section>

        {/* How AllCoreDevs Works (folded from the PM repo page) */}
        <section className="section">
          <div className="card">
            <h3 style={{ fontSize: "1.25rem", fontWeight: 600, color: "var(--color-text-bright)", marginBottom: "1rem" }}>
              How AllCoreDevs Works
            </h3>
            <div style={{ color: "var(--color-text-body)", fontSize: "0.95rem", lineHeight: 1.7 }}>
              <p style={{ marginBottom: "0.75rem" }}>
                AllCoreDevs (ACD) calls happen bi-weekly and cover execution,
                consensus, and testing topics:
              </p>
              <ul style={{ listStyle: "disc", paddingLeft: "1.5rem", marginBottom: "0.75rem" }}>
                <li><strong style={{ color: "var(--color-text-bright)" }}>ACDE</strong>: Execution Layer (EVM, transaction processing, state management)</li>
                <li><strong style={{ color: "var(--color-text-bright)" }}>ACDC</strong>: Consensus Layer (proof-of-stake, validators, finality)</li>
                <li><strong style={{ color: "var(--color-text-bright)" }}>ACDT</strong>: Testing (devnets, interop testing, implementation specifics)</li>
              </ul>
              <p>
                Anyone can watch live or view recordings on the{" "}
                <a href="https://www.youtube.com/@EthereumProtocol" target="_blank" rel="noopener noreferrer" className="link-blue">
                  Ethereum Protocol YouTube channel
                </a>.
              </p>
            </div>
          </div>
        </section>

        {/* Recent Calls (folded from the PM repo page) */}
        <section className="section">
          <h2 className="section-title">Recent Calls</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
            {([
              { label: "Execution Layer (ACDE)", color: "var(--coord-yellow)", calls: acdeCalls },
              { label: "Consensus Layer (ACDC)", color: "var(--coord-purple)", calls: acdcCalls },
              { label: "Testing (ACDT)", color: "var(--coord-green)", calls: acdtCalls },
            ] as const).map(({ label, color, calls }) => (
              <div key={label}>
                <h3 style={{ fontSize: "0.95rem", fontWeight: 600, color, marginBottom: "0.75rem" }}>{label}</h3>
                {calls.length > 0 ? (
                  <div className="flex flex-col gap-2">
                    {calls.map((call: ArtifactCall) => (
                      <div key={`${call.type}-${call.number}`}
                        style={{ padding: "0.5rem 0.75rem", background: "var(--color-bg-deep)", borderRadius: 4, fontSize: "0.85rem" }}>
                        <div style={{ color: "var(--color-text-muted)", marginBottom: "0.35rem" }}>
                          #{call.number} · {call.date}
                        </div>
                        <div style={{ display: "flex", gap: "0.75rem", fontSize: "0.8rem" }}>
                          <a href={`https://forkcast.org/calls/${call.type}/${call.number}`} target="_blank" rel="noopener noreferrer" className="link-blue">
                            Watch
                          </a>
                          {call.issueUrl && (
                            <a href={call.issueUrl} target="_blank" rel="noopener noreferrer" className="link-blue">
                              Agenda
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={{ color: "var(--color-text-muted)", fontSize: "0.9rem" }}>Unable to load calls.</p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Get involved */}
        <section className="section">
          <h2 className="section-title">Get Involved</h2>
          <div className="card-grid">
            {getInvolved.map((item) => (
              <Card key={item.href} title={item.title} description={item.description} href={item.href} external={item.external} icon={item.icon} />
            ))}
          </div>
        </section>

        {/* Proposing (folded from the PM repo page) */}
        <section className="section">
          <h2 className="section-title">Want to Add Something to the Agenda?</h2>
          <div style={{ color: "var(--color-text-body)", fontSize: "0.95rem", lineHeight: 1.75, maxWidth: 650 }}>
            <p style={{ marginBottom: "0.75rem" }}>
              If you have a topic for an AllCoreDevs call, propose it by opening an issue:
            </p>
            <ol style={{ listStyle: "decimal", paddingLeft: "1.5rem", marginBottom: "1rem" }}>
              <li>Go to the <a href="https://github.com/ethereum/pm/issues" target="_blank" rel="noopener noreferrer" className="link-blue">PM repo issues</a></li>
              <li>Find the agenda issue for the upcoming call</li>
              <li>Add a comment with your topic and relevant context</li>
            </ol>
            <p>
              For more focused discussions, consider{" "}
              <Link href="/breakouts" className="link-blue">scheduling a breakout call</Link>.
            </p>
          </div>
        </section>

        <Footer />
      </main>
      <FloatingOcto />
    </>
  );
}
