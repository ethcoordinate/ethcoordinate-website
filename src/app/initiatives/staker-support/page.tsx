import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FloatingOcto from "@/components/FloatingOcto";
import Card from "@/components/Card";
import {
  MapIcon, BookIcon, CodeIcon,
  DiscordIcon, CalendarIcon, MessageCircleIcon,
} from "@/components/Icons";

export const metadata: Metadata = {
  title: "Staker Support",
  description:
    "How EthCoordinate supports independent Ethereum stakers, with direct routes to EthStaker guidance, tools, documentation, and community help.",
};

const startHere = [
  {
    title: "Start staking",
    description: "Compare staking methods and pick the path that fits your hardware, capital, and time.",
    href: "https://ethstaker.org/staking",
    icon: <MapIcon color="var(--coord-green)" />,
  },
  {
    title: "Knowledge Base",
    description: "Open documentation from the first deposit to validator exit, maintained by the community.",
    href: "https://docs.ethstaker.org",
    icon: <BookIcon color="var(--coord-cyan)" />,
  },
  {
    title: "Staking software",
    description: "Eth Docker, Wagyu Key Gen, EthPillar, and other community-reviewed operator tools.",
    href: "https://ethstaker.org/staking-software",
    icon: <CodeIcon color="var(--coord-purple)" />,
  },
];

const getHelp = [
  {
    title: "Discord",
    description: "A validator is down, or your question is hard to search for. Stewards and the community answer in public channels.",
    href: "https://discord.com/invite/ethstaker",
    icon: <DiscordIcon color="var(--coord-purple)" />,
  },
  {
    title: "Office hours & events",
    description: "Educational streams, validator workshops, community calls, and event recordings.",
    href: "https://ethstaker.org/events",
    icon: <CalendarIcon color="var(--coord-yellow)" />,
  },
  {
    title: "Support channels",
    description: "Every public route to help, including client team channels, collected in one place.",
    href: "https://ethstaker.org/support",
    icon: <MessageCircleIcon color="var(--coord-cyan-alt)" />,
  },
];

export default function StakerSupportPage() {
  return (
    <>
      <Navigation />
      <main id="main-content" tabIndex={-1} className="relative z-10 max-w-[1100px] mx-auto page-container">
        <div className="page-header">
          <h1 className="page-title">Staker support</h1>
          <p className="page-desc">
            We maintain a safe, informed space for independent stakers to stay
            engaged with the network. We answer questions, document the work,
            and keep the tools running.
          </p>
          <div className="flex gap-3 flex-wrap" style={{ marginTop: "1.5rem" }}>
            <a href="https://ethstaker.org" target="_blank" rel="noopener noreferrer" className="card-btn" style={{ marginTop: 0 }}>
              Visit ethstaker.org <span>{"↗"}</span>
            </a>
          </div>
        </div>
        <div className="page-divider" />

        {/* Start here */}
        <section className="section">
          <h2 className="section-title">Start Here</h2>
          <p style={{ color: "var(--color-text-body)", fontSize: "0.95rem", marginBottom: "1.25rem" }}>
            Guides, documentation, and tooling live on ethstaker.org and keep
            their own community identity. These are the shortest routes in.
          </p>
          <div className="card-grid">
            {startHere.map((item) => (
              <Card key={item.href} title={item.title} description={item.description} href={item.href} external icon={item.icon} />
            ))}
          </div>
        </section>

        {/* Get help */}
        <section className="section">
          <h2 className="section-title">Get Help</h2>
          <div className="card-grid">
            {getHelp.map((item) => (
              <Card key={item.href} title={item.title} description={item.description} href={item.href} external icon={item.icon} />
            ))}
          </div>
        </section>

        {/* How support works */}
        <section className="section">
          <div className="card">
            <h3 style={{ fontSize: "1.25rem", fontWeight: 600, color: "var(--color-text-bright)", marginBottom: "1rem" }}>
              How Support Works
            </h3>
            <div style={{ color: "var(--color-text-body)", fontSize: "0.95rem", lineHeight: 1.7 }}>
              <ul style={{ listStyle: "disc", paddingLeft: "1.5rem" }}>
                <li>Help happens in public channels, so every answer stays searchable for the next staker.</li>
                <li><strong style={{ color: "var(--color-text-bright)" }}>Volunteers never send an unsolicited direct message.</strong> Treat any DM offering help as a scam.</li>
                <li>Never share seed phrases, validator keys, or keystore passwords with anyone, for any reason.</li>
              </ul>
            </div>
          </div>
        </section>

        <Footer />
      </main>
      <FloatingOcto />
    </>
  );
}
