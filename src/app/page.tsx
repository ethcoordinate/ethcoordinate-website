import Link from "next/link";
import Image from "next/image";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import FloatingOcto from "@/components/FloatingOcto";
import InitiativesDiagram from "@/components/InitiativesDiagram";
import { communityLinks } from "@/data/site";
import {
  getForkcastUpgrades,
  getLatestCallSummary,
  getLatestEipChange,
} from "@/lib/github";

export const revalidate = 3600;

export default async function Home() {
  const [callSummary, eipChange, upgrades] = await Promise.all([
    getLatestCallSummary(),
    getLatestEipChange(),
    getForkcastUpgrades(),
  ]);
  const heroUpdates = [
    callSummary,
    eipChange,
    "Staker support and community channels are open",
  ].filter((item): item is string => Boolean(item));
  const done = upgrades.filter((u) => u.status === "done").pop();
  const active = upgrades.find((u) => u.status === "active");
  const planned = upgrades.find((u) => u.status === "planned");
  const timelineItems = [
    done ? { name: done.name, pip: "done" } : { name: "Fusaka", pip: "done" },
    active ? { name: active.name, pip: "active" } : { name: "Glamsterdam", pip: "active" },
    planned ? { name: planned.name, pip: "planned" } : { name: "Hegota", pip: "planned" },
  ];

  return (
    <>
      <Navigation />
      <main id="main-content" className="relative z-10 max-w-[1100px] mx-auto page-container">
        <Hero updates={heroUpdates} />

        {/* CORE SYSTEMS */}
        <div className="divider">
          <div className="divider-line" />
          <span className="divider-text">Core Systems</span>
          <div className="divider-line" />
        </div>

        <section aria-labelledby="core-systems-title">
          <h2 id="core-systems-title" className="sr-only">Core systems</h2>
          <div className="bento-grid">
            {/* Forkcast - featured, wide */}
            <div className="card card-featured" style={{ gridColumn: "1 / 3" }}>
              <div className="flex justify-between items-start mb-3">
                <h3 style={{ fontSize: "1.3rem", fontWeight: 600, color: "var(--color-text-bright)" }}>
                  <Image src="/logos/forkcast.png" alt="Forkcast" width={360} height={78} unoptimized className="card-logo-wordmark" />
                </h3>
                <span className="card-tag">Upgrade Tracker</span>
              </div>
              <p style={{ fontSize: "0.95rem", color: "var(--color-text-body)", lineHeight: 1.6, marginBottom: "1rem", flex: 1 }}>
                Track Ethereum network upgrades in real time. Monitor EIP inclusion, testnet activations,
                and mainnet readiness across every fork, from proposal to deployment.
              </p>
              <div className="flex items-center gap-4" style={{ marginBottom: "1rem" }}>
                <div className="upgrade-timeline" style={{ flexDirection: "row", gap: "0.5rem", margin: 0, flexWrap: "wrap" }}>
                  {timelineItems.map((item, i) => (
                    <span key={item.name} className="flex items-center" style={{ gap: "0.5rem" }}>
                      {i > 0 && <div style={{ width: 16, height: 1, background: "var(--color-text-dim)", alignSelf: "center" }} />}
                      <div className="upgrade-item">
                        <div className={`upgrade-pip upgrade-pip-${item.pip}`} />
                        <span style={{ color: item.pip === "active" ? "var(--color-text-bright)" : "var(--color-text-secondary)", fontWeight: item.pip === "active" ? 600 : 400 }}>{item.name}</span>
                      </div>
                    </span>
                  ))}
                </div>
              </div>
              <Link href="/forkcast" className="card-btn">Explore Forkcast <span>&rarr;</span></Link>
            </div>

            {/* Quick Links */}
            <div className="card">
              <div className="flex justify-between items-start mb-3">
                <h3 style={{ fontSize: "1.25rem", fontWeight: 600, color: "var(--color-text-bright)" }}>Quick Links</h3>
                <span className="card-tag">Resources</span>
              </div>
              <p style={{ fontSize: "0.95rem", color: "var(--color-text-body)", lineHeight: 1.6, marginBottom: "0.75rem" }}>
                Essential channels and tools for protocol developers.
              </p>
              <div className="quick-links-grid">
                <a href="https://www.youtube.com/c/ethstaker" target="_blank" rel="noopener noreferrer">
                  <svg width="14" height="14" viewBox="0 0 24 24" style={{ flexShrink: 0, opacity: 0.7, fill: "var(--coord-pink)" }}><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  EthStaker YouTube <span style={{ marginLeft: "auto", fontSize: "0.9rem", color: "var(--color-text-muted)" }}>&rarr;</span>
                </a>
                <a href="https://discord.gg/a4gm9nT3Ty" target="_blank" rel="noopener noreferrer">
                  <svg width="14" height="14" viewBox="0 0 24 24" style={{ flexShrink: 0, opacity: 0.7, fill: "var(--coord-purple)" }}><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
                  R&D Discord <span style={{ marginLeft: "auto", fontSize: "0.9rem", color: "var(--color-text-muted)" }}>&rarr;</span>
                </a>
                <a href="https://ethereum.org/governance" target="_blank" rel="noopener noreferrer">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, opacity: 0.7, stroke: "var(--coord-green)" }} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                  Ethereum Governance <span style={{ marginLeft: "auto", fontSize: "0.9rem", color: "var(--color-text-muted)" }}>&rarr;</span>
                </a>
              </div>
            </div>

            {/* EthStaker - wide */}
            <div className="card" style={{ gridColumn: "1 / 3" }}>
              <div className="flex justify-between items-start mb-3">
                <h3 className="card-title-logo" style={{ fontSize: "1.25rem", fontWeight: 600, color: "var(--color-text-bright)" }}>
                  <Image src="/logos/ethstaker.svg" alt="" width={28} height={28} unoptimized className="card-logo-mark" />
                  EthStaker
                </h3>
                <span className="card-tag">Home Staking</span>
              </div>
              <p style={{ fontSize: "0.95rem", color: "var(--color-text-body)", lineHeight: 1.6, marginBottom: "1rem", flex: 1 }}>
                A safe, informed space for independent stakers to stay engaged with the network: operational guides, staking software, community support, and weekly office hours for anyone running a validator at home.
              </p>
              <div className="quick-links-grid quick-links-grid--row" style={{ marginBottom: "1rem" }}>
                <a href="https://docs.ethstaker.org" target="_blank" rel="noopener noreferrer">Knowledge Base <span style={{ fontSize: "0.75rem", opacity: 0.5 }}>{"↗"}</span></a>
                <a href="https://ethstaker.org/support" target="_blank" rel="noopener noreferrer">Staking support <span style={{ fontSize: "0.75rem", opacity: 0.5 }}>{"↗"}</span></a>
                <a href="https://ethstaker.org/staking-software" target="_blank" rel="noopener noreferrer">Staking software <span style={{ fontSize: "0.75rem", opacity: 0.5 }}>{"↗"}</span></a>
              </div>
              <Link href="/initiatives/staker-support" className="card-btn">Explore EthStaker <span>&rarr;</span></Link>
            </div>

            {/* Open-source tooling */}
            <div className="card">
              <div className="flex justify-between items-start mb-3">
                <h3 style={{ fontSize: "1.25rem", fontWeight: 600, color: "var(--color-text-bright)" }}>Open-source tooling</h3>
                <span className="card-tag">OSS</span>
              </div>
              <p style={{ fontSize: "0.95rem", color: "var(--color-text-body)", lineHeight: 1.6, marginBottom: "0.75rem" }}>
                Open-source tools and documentation used by participants of the consensus set.
              </p>
              <div className="quick-links-grid">
                <a href="https://ethdocker.com" target="_blank" rel="noopener noreferrer">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, opacity: 0.7, stroke: "var(--coord-cyan)" }} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
                  Eth Docker <span style={{ marginLeft: "auto", fontSize: "0.9rem", color: "var(--color-text-muted)" }}>&rarr;</span>
                </a>
                <a href="https://wagyu.gg" target="_blank" rel="noopener noreferrer">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, opacity: 0.7, stroke: "var(--coord-yellow)" }} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>
                  Wagyu Key Gen <span style={{ marginLeft: "auto", fontSize: "0.9rem", color: "var(--color-text-muted)" }}>&rarr;</span>
                </a>
                <a href="https://github.com/ethstaker/ethstaker-deposit-cli" target="_blank" rel="noopener noreferrer">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, opacity: 0.7, stroke: "var(--coord-green)" }} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>
                  Deposit CLI <span style={{ marginLeft: "auto", fontSize: "0.9rem", color: "var(--color-text-muted)" }}>&rarr;</span>
                </a>
                <a href="https://hoodi.console.ethstaker.org/dashboard" target="_blank" rel="noopener noreferrer">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, opacity: 0.7, stroke: "var(--coord-purple)" }} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                  Hoodi Staker Console <span style={{ marginLeft: "auto", fontSize: "0.9rem", color: "var(--color-text-muted)" }}>&rarr;</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* INITIATIVES */}
        <div className="divider" id="initiatives">
          <div className="divider-line" />
          <span className="divider-text">Initiatives</span>
          <div className="divider-line" />
        </div>

        <section aria-labelledby="initiatives-title" style={{ paddingBottom: "5rem" }}>
          <h2 id="initiatives-title" className="sr-only">Initiatives</h2>
          <InitiativesDiagram />
        </section>

        <section className="home-community" aria-labelledby="community-title">
          <div>
            <p className="page-eyebrow">Join us</p>
            <h2 id="community-title">The community is open to everyone.</h2>
            <p>Ask a question, join a live call, or follow a longer discussion.</p>
          </div>
          <div className="home-community-links">
            {communityLinks.map((channel) => (
              <a key={channel.href} href={channel.href} target="_blank" rel="noopener noreferrer">
                <strong>{channel.label}</strong>
                <span>{channel.note}</span>
                <i aria-hidden="true">↗</i>
              </a>
            ))}
          </div>
          <Link href="/about#community" className="card-btn">More ways to join <span aria-hidden="true">→</span></Link>
        </section>

        <Footer />
      </main>
      <FloatingOcto />
    </>
  );
}
