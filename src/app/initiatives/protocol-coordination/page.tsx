import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FloatingOcto from "@/components/FloatingOcto";
import Card from "@/components/Card";
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
    href: "/pm-repo",
    icon: <CalendarIcon color="var(--coord-cyan)" />,
  },
  {
    title: "Breakout rooms",
    description: "Technical discussions on specific protocol topics. Anyone can propose one for an EIP, a research question, or work that spans several teams.",
    href: "/pm-repo/breakouts",
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

export default function ProtocolCoordinationPage() {
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
            <Link href="/pm-repo" className="card-btn" style={{ marginTop: 0 }}>
              The PM repository <span>&rarr;</span>
            </Link>
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
              <Card key={item.href} title={item.title} description={item.description} href={item.href} icon={item.icon} />
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

        <Footer />
      </main>
      <FloatingOcto />
    </>
  );
}
