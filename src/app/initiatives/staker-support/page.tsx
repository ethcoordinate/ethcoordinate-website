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
    "How EthCoordinate supports independent Ethereum stakers, with links to EthStaker guides, tools, documentation, and community help.",
};

const startHere = [
  {
    title: "Start staking",
    description: "Compare staking methods and pick the one that fits your hardware, capital, and time.",
    href: "https://ethstaker.org/staking",
    icon: <MapIcon color="var(--coord-green)" />,
  },
  {
    title: "Knowledge Base",
    description: "Community-maintained documentation covering everything from your first deposit to validator exit.",
    href: "https://docs.ethstaker.org",
    icon: <BookIcon color="var(--coord-cyan)" />,
  },
  {
    title: "Staking software",
    description: "Eth Docker, Wagyu Key Gen, EthPillar, and other community-reviewed staking tools.",
    href: "https://ethstaker.org/staking-software",
    icon: <CodeIcon color="var(--coord-purple)" />,
  },
];

const getHelp = [
  {
    title: "Discord",
    description: "Get help when your validator is down or you have a question.",
    href: "https://discord.com/invite/ethstaker",
    icon: <DiscordIcon color="var(--coord-purple)" />,
  },
  {
    title: "Events",
    description: "Educational streams, validator workshops, community calls, and event recordings.",
    href: "https://ethstaker.org/events",
    icon: <CalendarIcon color="var(--coord-yellow)" />,
  },
  {
    title: "Support channels",
    description: "All public places to get help, including client team channels.",
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
          <h1 className="page-title">Staking support</h1>
          <p className="page-desc">
            EthStaker is a community providing guidance, education, support, and resources for existing and potential stakers. EthStaker’s principal goal is to maximize decentralization of the Ethereum network.
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
            The guides, documentation, and tools all live on ethstaker.org.
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

        <Footer />
      </main>
      <FloatingOcto />
    </>
  );
}
