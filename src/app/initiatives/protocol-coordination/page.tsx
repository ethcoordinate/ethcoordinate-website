import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FloatingOcto from "@/components/FloatingOcto";
import Card from "@/components/Card";
import StatusConsole, { type ConsoleLine } from "@/components/StatusConsole";
import {
  CalendarIcon, UsersIcon, FileTextIcon,
  YouTubeIcon, GitHubIcon, DiscordIcon,
} from "@/components/Icons";
import { getForkcastUpgrades, getLatestCallSummary, getLatestEipChange } from "@/lib/github";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Protocol coordination",
  description:
    "How EthCoordinate facilitates coordination around Ethereum core protocol development: AllCoreDevs calls, breakout rooms, EIP championing, and Forkcast.",
};

const whereItHappens = [
  {
    title: "AllCoreDevs calls",
    description: "Bi-weekly execution, consensus, and testing calls. Agendas, notes, and recordings live in the ethereum/pm repository.",
    href: "/pm-repo",
    icon: <CalendarIcon color="var(--coord-cyan)" />,
  },
  {
    title: "Breakout rooms",
    description: "Focused technical discussions on specific protocol topics. Anyone can propose one for an EIP, a research thread, or cross-team work.",
    href: "/pm-repo/breakouts",
    icon: <UsersIcon color="var(--coord-pink)" />,
  },
  {
    title: "Championing an EIP",
    description: "What it takes to carry a proposal through the process, and how to build a credible case for inclusion.",
    href: "/guides/champion",
    icon: <FileTextIcon color="var(--coord-green)" />,
  },
];

const getInvolved = [
  {
    title: "Watch the calls",
    description: "AllCoreDevs calls stream live and stay up as recordings.",
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
];

export default async function ProtocolCoordinationPage() {
  const [callSummary, eipChange, upgrades] = await Promise.all([
    getLatestCallSummary(),
    getLatestEipChange(),
    getForkcastUpgrades(),
  ]);
  const active = upgrades.find((u) => u.status === "active");
  const signal = [
    callSummary ? { tag: "acd", text: callSummary } : null,
    eipChange ? { tag: "eip", text: eipChange } : null,
    active ? { tag: "fork", text: `${active.name} is the active upgrade` } : null,
  ].filter((line): line is ConsoleLine => line !== null);
  const lines: readonly ConsoleLine[] = signal.length > 0
    ? signal
    : [{ tag: "forkcast", text: "Live data is unavailable right now" }];

  return (
    <>
      <Navigation />
      <main id="main-content" tabIndex={-1} className="relative z-10 max-w-[1100px] mx-auto page-container">
        <div className="page-header">
          <p className="page-eyebrow">Initiative 02 · Core protocol</p>
          <h1 className="page-title">Protocol coordination</h1>
          <p className="page-desc">
            We facilitate coordination around core protocol development and its
            adjacent efforts: the calls, the breakout rooms, the proposals moving
            through them, and the record that comes out the other side.
          </p>
          <div className="flex gap-3 flex-wrap" style={{ marginTop: "1.5rem" }}>
            <Link href="/pm-repo" className="card-btn" style={{ marginTop: 0 }}>
              The PM repository <span>&rarr;</span>
            </Link>
            <a href="https://github.com/ethereum/pm" target="_blank" rel="noopener noreferrer" className="card-btn" style={{ marginTop: 0 }}>
              ethereum/pm on GitHub <span>{"↗"}</span>
            </a>
          </div>
        </div>
        <div className="page-divider" />

        {/* Live signal */}
        <section className="section">
          <h2 className="section-title">Live Signal</h2>
          <p style={{ color: "var(--color-text-body)", fontSize: "0.95rem", marginBottom: "1.25rem" }}>
            The most recent output of the process, read from Forkcast: the
            tracker for upgrades, EIPs, calls, and decisions.
          </p>
          <StatusConsole lines={lines} style={{ margin: 0, maxWidth: 720 }} />
          <Link href="/forkcast" className="card-btn">Explore Forkcast <span>&rarr;</span></Link>
        </section>

        {/* Where it happens */}
        <section className="section">
          <h2 className="section-title">Where It Happens</h2>
          <div className="card-grid">
            {whereItHappens.map((item) => (
              <Card key={item.href} title={item.title} description={item.description} href={item.href} icon={item.icon} />
            ))}
          </div>
        </section>

        {/* How we work */}
        <section className="section">
          <div className="card">
            <h3 style={{ fontSize: "1.25rem", fontWeight: 600, color: "var(--color-text-bright)", marginBottom: "1rem" }}>
              Coordination, Not Control
            </h3>
            <div style={{ color: "var(--color-text-body)", fontSize: "0.95rem", lineHeight: 1.7 }}>
              <ul style={{ listStyle: "disc", paddingLeft: "1.5rem", marginBottom: "0.75rem" }}>
                <li>We make shared work easier to understand and advance without trying to own Ethereum&apos;s roadmap. We avoid taking positions on roadmap items or primary research.</li>
                <li><strong style={{ color: "var(--color-text-bright)" }}>Credible neutrality</strong> is one of Ethereum&apos;s defining features. Where a member is exposed to a conflict in any initiative, ACD included, a mechanism is set up so the neutrality of the outcome is not in question.</li>
                <li>Public by default: the calls are streamed and recorded, the notes are committed to ethereum/pm, and Forkcast tracks the outcomes.</li>
              </ul>
              <p>
                On the <Link href="/team" className="link-blue">team</Link>, Yorick works on protocol
                coordination and Butta on stakeholder coordination. The{" "}
                <Link href="/about#faq" className="link-blue">FAQ</Link> covers funding, neutrality, and scope.
              </p>
            </div>
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

        <Footer />
      </main>
      <FloatingOcto />
    </>
  );
}
