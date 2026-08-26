import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FloatingOcto from "@/components/FloatingOcto";
import { getActiveBreakouts } from "@/lib/github";

export const metadata: Metadata = {
  title: "Breakout Calls",
  description:
    "Active breakout room discussions for Ethereum protocol development, and how to organize and run your own breakout call.",
};

export const revalidate = 3600;

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

const codeStyle = {
  fontSize: "0.8rem",
  background: "var(--color-bg-elevated)",
  padding: "0.15rem 0.4rem",
  borderRadius: "3px",
  color: "var(--color-text-secondary)",
} as const;

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
          <p style={prose}>
            Breakout calls are feature- or topic-specific calls for items in
            active implementation stages, aiming for inclusion in an upcoming
            fork, that benefit from synchronous discussion beyond what fits
            into AllCoreDevs.
          </p>
          <p style={{ ...prose, marginTop: "1rem" }}>
            Start a breakout when:
          </p>
          <ul style={{ listStyle: "none", padding: 0, margin: "0.75rem 0 0", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            {[
              "There's active development or open questions to address",
              "It can't fit responsibly in the ACD agenda",
              "There's enough interest that multiple participants will attend",
            ].map((item) => (
              <li key={item} style={{ display: "flex", alignItems: "baseline", gap: "0.6rem", fontSize: "0.95rem", color: "var(--color-text-body)" }}>
                <span style={{ color: "var(--coord-purple)", fontSize: "0.7rem", flexShrink: 0 }}>▸</span>
                {item}
              </li>
            ))}
          </ul>
          <p style={{ ...prose, marginTop: "1rem" }}>
            Examples of breakout series:
          </p>
          <ul style={{ listStyle: "none", padding: 0, margin: "0.75rem 0 0", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            {[
              "ePBS (EIP-7732)",
              "PeerDAS",
              "FOCIL",
            ].map((item) => (
              <li key={item} style={{ display: "flex", alignItems: "baseline", gap: "0.6rem", fontSize: "0.95rem", color: "var(--color-text-body)" }}>
                <span style={{ color: "var(--coord-purple)", fontSize: "0.7rem", flexShrink: 0 }}>▸</span>
                {item}
              </li>
            ))}
          </ul>
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

        {/* How to Set Up (merged from the breakout guide) */}
        <section className="section">
          <h2 className="section-title">How to Set Up a Breakout Call</h2>
          <div className="flex flex-col gap-4">
            <div className="card">
              <div className="step-card-layout">
                <span className="step-badge">1</span>
                <div>
                  <h3 style={{ fontSize: "1.15rem", fontWeight: 600, color: "var(--color-text-bright)", marginBottom: "0.4rem" }}>
                    Contact EthCoordinate
                  </h3>
                  <p style={{ ...proseSm, marginBottom: "0.5rem" }}>
                    Email the coordination team at{" "}
                    <a href="mailto:team@ethcoordinate.org" className="link-blue">
                      team@ethcoordinate.org
                    </a>.
                  </p>
                  <p style={{ ...proseSm, marginBottom: "0.4rem" }}>
                    Provide:
                  </p>
                  <ul style={{ color: "var(--color-text-body)", fontSize: "0.85rem", lineHeight: 1.7, listStyle: "disc", paddingLeft: "1.25rem", marginBottom: "0.5rem" }}>
                    <li>Title</li>
                    <li>Cadence (weekly, biweekly, etc.)</li>
                    <li>Reason for the breakout</li>
                    <li>Associated EIP(s)</li>
                    <li>Target fork (if relevant)</li>
                    <li>Your GitHub username</li>
                  </ul>
                  <div className="guide-callout" style={{ marginTop: "0.75rem" }}>
                    <strong style={bright}>Wait for EthCoordinate to confirm creation of your series</strong> before
                    proceeding to step 2.
                  </div>
                  <p style={{ color: "var(--color-text-muted)", fontSize: "0.82rem", lineHeight: 1.6, marginTop: "0.75rem" }}>
                    You can use your own Zoom or the EF zoom-bot, which provides
                    transcripts, an AI summary, and YouTube upload. The EF zoom-bot
                    requires someone with an @ethereum.org email to be assigned host.
                  </p>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="step-card-layout">
                <span className="step-badge">2</span>
                <div>
                  <h3 style={{ fontSize: "1.15rem", fontWeight: 600, color: "var(--color-text-bright)", marginBottom: "0.4rem" }}>
                    Schedule the First Meeting
                  </h3>
                  <p style={{ ...proseSm, marginBottom: "0.5rem" }}>
                    Once EthCoordinate confirms your series, create a{" "}
                    <a href="https://github.com/ethereum/pm/issues/new/choose" target="_blank" rel="noopener noreferrer" className="link-blue">
                      new issue
                    </a>{" "}
                    in ethereum/pm and choose the <strong style={bright}>Protocol Call</strong> template.
                  </p>
                  <ul style={{ color: "var(--color-text-body)", fontSize: "0.85rem", lineHeight: 1.7, listStyle: "disc", paddingLeft: "1.25rem" }}>
                    <li>Title format: <code style={codeStyle}>&lt;Call Name&gt; #N, &lt;Date&gt;</code></li>
                    <li>Add the UTC date, time, and agenda items</li>
                    <li>Select your call series from the dropdown</li>
                    <li>Check <strong style={bright}>Autopilot Mode</strong> (recommended). It applies preconfigured
                      defaults for duration, recurrence, Zoom, and calendar</li>
                  </ul>
                  <p style={{ color: "var(--color-text-muted)", fontSize: "0.82rem", lineHeight: 1.6, marginTop: "0.5rem" }}>
                    Only uncheck Autopilot if you need to customize settings for
                    a specific meeting (duration, custom Zoom link, livestream, etc.).
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div style={{ marginTop: "1.25rem" }}>
            <a href="https://github.com/ethereum/pm/blob/master/processes/running-a-breakout.md" target="_blank" rel="noopener noreferrer" className="link-blue" style={{ fontSize: "0.9rem" }}>
              Full reference on GitHub &rarr;
            </a>
          </div>
        </section>

        <Footer />
      </main>
      <FloatingOcto />
    </>
  );
}
