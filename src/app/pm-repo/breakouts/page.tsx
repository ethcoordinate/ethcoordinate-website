import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FloatingOcto from "@/components/FloatingOcto";
import Link from "next/link";
import { getActiveBreakouts } from "@/lib/github";

export const metadata: Metadata = {
  title: "Breakout Rooms",
  description:
    "Active breakout room discussions for Ethereum protocol development. Focused working groups on specific EIPs and technical topics.",
};

export const revalidate = 3600;

export default async function BreakoutsPage() {
  const activeBreakouts = await getActiveBreakouts();

  return (
    <>
      <Navigation />
      <main id="main-content" tabIndex={-1} className="relative z-10 max-w-[1100px] mx-auto page-container">
        <div className="page-header">
          <h1 className="page-title">Breakout Calls</h1>
          <p className="page-desc">
            Focused technical discussions on specific Ethereum protocol topics.
            Anyone can propose and participate in breakout calls.
          </p>
        </div>
        <div className="page-divider" />

        {/* What are Breakout Calls */}
        <section className="section">
          <h2 className="section-title">What are Breakout Calls?</h2>
          <div style={{ color: "var(--color-text-body)", fontSize: "0.95rem", lineHeight: 1.75, maxWidth: 650 }}>
            <p style={{ marginBottom: "0.75rem" }}>
              Breakout calls are feature- or topic-specific calls for items in active
              implementation stages, aiming for inclusion in an upcoming fork, that
              benefit from synchronous discussion beyond what fits into AllCoreDevs.
            </p>
            <p style={{ marginBottom: "0.5rem" }}>Start a breakout when:</p>
            <ul style={{ listStyle: "disc", paddingLeft: "1.5rem", marginBottom: "1rem" }}>
              <li>There&apos;s active development or open questions to address</li>
              <li>It can&apos;t fit responsibly in the ACD agenda</li>
              <li>There&apos;s enough interest that multiple participants will attend</li>
            </ul>
            <p style={{ marginBottom: "0.5rem" }}>Examples of breakout series:</p>
            <ul style={{ listStyle: "disc", paddingLeft: "1.5rem" }}>
              <li>ePBS (EIP-7732)</li>
              <li>PeerDAS</li>
              <li>FOCIL</li>
            </ul>
          </div>
        </section>

        {/* How to Run a Breakout */}
        <section className="section">
          <h2 className="section-title">Want to Run a Breakout?</h2>
          <div className="card">
            <p style={{ color: "var(--color-text-body)", fontSize: "0.9rem", lineHeight: 1.6, marginBottom: "1rem" }}>
              Our guide walks you through setting up a breakout series: who to
              contact, what information to provide, and how to schedule calls
              using the ethereum/pm tooling.
            </p>
            <Link href="/guides/breakout" className="card-btn">
              Read the Guide <span>&rarr;</span>
            </Link>
          </div>
        </section>

        {/* Active Breakout Topics */}
        <section className="section">
          <h2 className="section-title">Active Breakout Topics</h2>
          <p style={{ color: "var(--color-text-body)", fontSize: "0.95rem", lineHeight: 1.75, marginBottom: "1.25rem", maxWidth: 650 }}>
            Breakout series that have had a call within the last three months.
            Each links to its coordination issue on GitHub.
          </p>
          <div className="card-grid">
            {activeBreakouts.map((room) => (
              <a
                key={room.issueUrl}
                href={room.issueUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="card"
                style={{ textDecoration: "none" }}
              >
                <span style={{ fontSize: "0.95rem", fontWeight: 500, color: "var(--color-text-bright)" }}>
                  {room.name}
                </span>
                <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", marginTop: "0.25rem" }}>
                  Latest: {room.latestDate}
                </span>
              </a>
            ))}
          </div>
          <div style={{ marginTop: "1.5rem" }}>
            <a href="https://github.com/ethereum/pm/blob/master/Breakout-Room-Meetings/active-breakout-series.md" target="_blank" rel="noopener noreferrer" className="link-blue" style={{ fontSize: "0.9rem" }}>
              View active breakout series on GitHub &rarr;
            </a>
          </div>
        </section>


        <Footer />
      </main>
      <FloatingOcto />
    </>
  );
}
