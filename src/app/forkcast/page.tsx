import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FloatingOcto from "@/components/FloatingOcto";
import Card from "@/components/Card";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Forkcast",
  description:
    "Track Ethereum network upgrades in real time. Monitor EIP inclusion, testnet activations, and mainnet readiness across every fork.",
};
import { ForkIcon, MapIcon, GitHubIcon, FileTextIcon, UsersIcon, MessageCircleIcon, GlobeIcon, YouTubeIcon, BookIcon, ShieldIcon } from "@/components/Icons";
import { getForkcastUpgrades } from "@/lib/github";

export const revalidate = 3600;

export default async function ForkcastPage() {
  const fetched = await getForkcastUpgrades();
  return (
    <>
      <Navigation />
      <main id="main-content" tabIndex={-1} className="relative z-10 max-w-[1100px] mx-auto page-container">
        <div className="page-header">
          <p className="page-eyebrow">Developed and stewarded by EthCoordinate</p>
          <h1 className="page-title">Forkcast</h1>
          <p className="page-desc">
            Tracking every Ethereum upgrade from EIP proposal to mainnet,
            aggregating AllCoreDevs decisions, client team perspectives, and
            testing progress so you don&apos;t have to attend every call.
          </p>
          <div className="flex gap-3 flex-wrap" style={{ marginTop: "1.5rem" }}>
            <a href="https://forkcast.org" target="_blank" rel="noopener noreferrer" className="card-btn" style={{ marginTop: 0 }}>
              Visit forkcast.org <span>{"\u2197"}</span>
            </a>
          </div>
          <div className="product-attribution">
            <span>Tier 1 · own domain</span>
            <div>
              <strong>One product, one focused destination.</strong>
              <p>
                Forkcast tracks upgrades, EIPs, AllCoreDevs calls, decisions,
                and network status. It keeps its own brand and domain while
                EthCoordinate provides the development and stewardship behind it.
              </p>
            </div>
          </div>
        </div>
        <div className="page-divider" />

        {/* Why Forkcast Exists */}
        <section className="section">
          <div className="why-forkcast-grid">
            {/* Text */}
            <div>
              <h2 className="section-title">Why Forkcast?</h2>
              <p style={{ color: "var(--color-text-body)", fontSize: "0.95rem", lineHeight: 1.7, marginBottom: "0.75rem" }}>
                Ethereum has no CEO who pushes the update button. Upgrades succeed only
                when 11+ independent client teams, researchers, and the community agree to
                change the rules simultaneously, coordinated across dozens of calls,
                hundreds of GitHub threads, and months of testing.
              </p>
              <p style={{ color: "var(--color-text-body)", fontSize: "0.95rem", lineHeight: 1.7 }}>
                Forkcast is the visual layer on top of this process. It shows which EIPs
                are proposed, which have client support, and where each upgrade stands on
                the path to mainnet, without requiring you to follow every meeting.
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
              description="Published perspectives from all 11 client teams on which EIPs they support, oppose, or want more research on."
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
              description="Monitor which EIPs are activated on which devnets and testnets, and track client readiness across the board."
              href="https://forkcast.org/devnets"
              external
              icon={<ShieldIcon color="var(--coord-cyan-alt)" />}
            />
          </div>
        </section>

        {/* The Upgrade Lifecycle - pipeline rail */}
        <section className="section">
          <h2 className="section-title">The Upgrade Lifecycle</h2>
          <p style={{ fontSize: "0.85rem", color: "var(--color-text-muted)", marginBottom: "1.5rem", maxWidth: "540px" }}>
            Every Ethereum upgrade flows through four phases. Expand any phase to see the steps inside.
          </p>

          <div className="pipe">
            {/* ── Phase 1: Scoping ── */}
            <details className="pipe-phase">
              <summary className="pipe-gate">
                <span className="pipe-rail">
                  <span className="pipe-node" />
                  <span className="pipe-wire" />
                </span>
                <span className="pipe-label">
                  <span className="pipe-tag">Phase 01</span>
                  <span className="pipe-name">Scoping</span>
                </span>
                <span className="pipe-brief">EIPs proposed &amp; selected</span>
                <span className="pipe-toggle">+</span>
              </summary>
              <div className="pipe-expand">
                <div className="pipe-rail-cont"><span className="pipe-wire" /></div>
                <div className="pipe-steps">
                  <div className="pipe-step">
                    <span className="pipe-tick" />
                    <div>
                      <strong>Headliner Proposals</strong>
                      <p>Major EIPs are proposed for inclusion in the upcoming fork.</p>
                    </div>
                  </div>
                  <div className="pipe-step">
                    <span className="pipe-tick" />
                    <div>
                      <strong>Headliner Selection</strong>
                      <p>Core devs select the headline features that define the upgrade scope.</p>
                    </div>
                  </div>
                  <div className="pipe-step">
                    <span className="pipe-tick" />
                    <div>
                      <strong>Non-headliner Proposals &amp; Selection</strong>
                      <p>Smaller EIPs proposed alongside confirmed headliners. Remaining EIPs accepted or deferred; scope finalized.</p>
                    </div>
                  </div>
                  <div className="pipe-step pipe-step--parallel">
                    <span className="pipe-tick pipe-tick--alt" />
                    <div>
                      <strong>EIP-specific Devnets <span className="pipe-concurrent">concurrent</span></strong>
                      <p>Individual EIPs tested in isolation on dedicated devnets. Begins as soon as headliners are chosen; ends when generalized devnets start.</p>
                    </div>
                  </div>
                </div>
              </div>
            </details>

            {/* ── Phase 2: Implementation ── */}
            <details className="pipe-phase">
              <summary className="pipe-gate">
                <span className="pipe-rail">
                  <span className="pipe-node" />
                  <span className="pipe-wire" />
                </span>
                <span className="pipe-label">
                  <span className="pipe-tag">Phase 02</span>
                  <span className="pipe-name">Implementation</span>
                </span>
                <span className="pipe-brief">Freeze, devnets, releases</span>
                <span className="pipe-toggle">+</span>
              </summary>
              <div className="pipe-expand">
                <div className="pipe-rail-cont"><span className="pipe-wire" /></div>
                <div className="pipe-steps">
                  <div className="pipe-step pipe-step--gate">
                    <span className="pipe-tick pipe-tick--gate" />
                    <div>
                      <strong>Feature Freeze</strong>
                      <p>No new features added. Existing features can still be removed if insufficiently ready.*</p>
                    </div>
                  </div>
                  <div className="pipe-step">
                    <span className="pipe-tick" />
                    <div>
                      <strong>Generalized Devnets</strong> <span className="pipe-dur">~30d</span>
                      <p>All EIPs tested together on combined devnets. EIP-specific devnets merge into this phase.</p>
                    </div>
                  </div>
                  <div className="pipe-step">
                    <span className="pipe-tick" />
                    <div>
                      <strong>Client Releases</strong>
                      <p>Client teams ship implementations of all included EIPs.</p>
                    </div>
                  </div>
                </div>
              </div>
            </details>

            {/* ── Phase 3: Review ── */}
            <details className="pipe-phase">
              <summary className="pipe-gate">
                <span className="pipe-rail">
                  <span className="pipe-node" />
                  <span className="pipe-wire" />
                </span>
                <span className="pipe-label">
                  <span className="pipe-tag">Phase 03</span>
                  <span className="pipe-name">Review</span>
                </span>
                <span className="pipe-brief">Audit &amp; testnet deployment</span>
                <span className="pipe-toggle">+</span>
              </summary>
              <div className="pipe-expand">
                <div className="pipe-rail-cont"><span className="pipe-wire" /></div>
                <div className="pipe-steps">
                  <div className="pipe-step">
                    <span className="pipe-tick" />
                    <div>
                      <strong>Security Review</strong> <span className="pipe-dur">~30d</span>
                      <p>Dedicated security audit period before testnet deployment.</p>
                    </div>
                  </div>
                  <div className="pipe-step">
                    <span className="pipe-tick" />
                    <div>
                      <strong>Permissioned Testnet</strong> <span className="pipe-dur">min 14d</span>
                      <p>Deployed to a controlled testnet with vetted validators.</p>
                    </div>
                  </div>
                  <div className="pipe-step">
                    <span className="pipe-tick" />
                    <div>
                      <strong>Permissionless Testnet</strong> <span className="pipe-dur">min 14d</span>
                      <p>Activated on public testnets (Holesky, Sepolia) for open validation.</p>
                    </div>
                  </div>
                </div>
              </div>
            </details>

            {/* ── Phase 4: Deployment ── */}
            <details className="pipe-phase">
              <summary className="pipe-gate">
                <span className="pipe-rail">
                  <span className="pipe-node pipe-node--final" />
                </span>
                <span className="pipe-label">
                  <span className="pipe-tag">Phase 04</span>
                  <span className="pipe-name">Deployment</span>
                </span>
                <span className="pipe-brief">Mainnet activation</span>
                <span className="pipe-toggle">+</span>
              </summary>
              <div className="pipe-expand">
                <div className="pipe-rail-cont"><span className="pipe-wire" /></div>
                <div className="pipe-steps">
                  <div className="pipe-step">
                    <span className="pipe-tick" />
                    <div>
                      <strong>Mainnet Date Chosen</strong>
                      <p>A specific epoch is locked in for the network upgrade.</p>
                    </div>
                  </div>
                  <div className="pipe-step">
                    <span className="pipe-tick" />
                    <div>
                      <strong>Buffer</strong> <span className="pipe-dur">~30d</span>
                      <p>Time for L2s and protocols to prepare once the mainnet date is announced.</p>
                    </div>
                  </div>
                  <div className="pipe-step pipe-step--final">
                    <span className="pipe-tick pipe-tick--final" />
                    <div>
                      <strong className="pipe-final-label">Mainnet Fork</strong>
                      <p>The upgrade activates on the live Ethereum network.</p>
                    </div>
                  </div>
                </div>
              </div>
            </details>
          </div>
          <p style={{ fontSize: "0.7rem", color: "var(--color-text-muted)", marginTop: "1.25rem", fontFamily: "var(--font-mono)" }}>
            * Features can be removed after freeze if insufficiently ready.
          </p>
        </section>

        {/* How It Connects to ACD - redesigned with better typography */}
        <section className="section">
          <h2 className="section-title">How Forkcast Connects to ACD</h2>
          <p style={{ fontSize: "1.05rem", color: "var(--color-text-body)", lineHeight: 1.7, fontWeight: 500, marginBottom: "1.5rem", maxWidth: "640px" }}>
            Forkcast is the visual layer on top of the AllCoreDevs process.
            The <Link href="/pm-repo" className="link-blue">PM repo</Link> is
            where the work happens; Forkcast is where you see the state of that work.
          </p>
          <div className="card" style={{ padding: 0, overflow: "hidden" }}>
            <div className="acd-quadrants">
              {[
                {
                  label: "Before calls",
                  color: "var(--coord-cyan)",
                  text: "Client teams publish their EIP perspectives. Forkcast aggregates them so you can see the consensus landscape before discussion begins.",
                },
                {
                  label: "During calls",
                  color: "var(--coord-purple)",
                  text: "ACD calls produce decisions about which EIPs move from Proposed to Considered for Inclusion (CFI) to Scheduled for Inclusion (SFI).",
                },
                {
                  label: "After calls",
                  color: "var(--coord-green)",
                  text: "Forkcast records these decisions with timestamps and call references, and publishes AI-generated summaries and transcripts.",
                },
                {
                  label: "Between calls",
                  color: "var(--coord-yellow)",
                  text: "EIP detail pages and stakeholder views let you follow progress asynchronously without attending every meeting.",
                },
              ].map((item, i) => (
                <div key={item.label} className="acd-quadrant" style={{
                  padding: "1.25rem 1.5rem",
                }}>
                  <div style={{
                    fontSize: "1.15rem",
                    fontFamily: "var(--font-mono)",
                    fontWeight: 600,
                    color: item.color,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    marginBottom: "0.6rem",
                  }}>
                    <span style={{ opacity: 0.5 }}>{i + 1}.</span> {item.label}
                  </div>
                  <p style={{
                    fontSize: "0.95rem",
                    color: "var(--color-text-body)",
                    lineHeight: 1.6,
                  }}>
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Propose an EIP */}
        <section className="section" id="propose">
          <h2 className="section-title">Propose an EIP for a Fork</h2>
          <div className="card" style={{ borderLeft: "2px solid var(--color-blue)" }}>
            <p style={{ fontSize: "0.95rem", color: "var(--color-text-body)", lineHeight: 1.6, marginBottom: "1.25rem" }}>
              Want your EIP tracked on Forkcast and considered for an upcoming upgrade?
              Follow these three steps:
            </p>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <div style={{
                  width: 24, height: 24, borderRadius: "50%",
                  background: "rgba(0, 212, 255, 0.1)", border: "1px solid var(--color-blue)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "0.75rem", fontWeight: 700, color: "var(--color-blue)", flexShrink: 0,
                }}>1</div>
                <div>
                  <strong style={{ color: "var(--color-text-bright)", fontSize: "0.95rem" }}>Write your EIP</strong>
                  <p style={{ fontSize: "0.85rem", color: "var(--color-text-muted)", marginTop: "0.25rem" }}>
                    Draft your proposal following the{" "}
                    <a href="https://eips.ethereum.org" target="_blank" rel="noopener noreferrer" className="link-blue">EIP standards</a> and
                    get it to Draft status on ethereum/EIPs.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div style={{
                  width: 24, height: 24, borderRadius: "50%",
                  background: "rgba(0, 212, 255, 0.1)", border: "1px solid var(--color-blue)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "0.75rem", fontWeight: 700, color: "var(--color-blue)", flexShrink: 0,
                }}>2</div>
                <div>
                  <strong style={{ color: "var(--color-text-bright)", fontSize: "0.95rem" }}>Add it to Forkcast</strong>
                  <p style={{ fontSize: "0.85rem", color: "var(--color-text-muted)", marginTop: "0.25rem" }}>
                    Submit a PR adding your EIP data to the{" "}
                    <a href="https://github.com/ethereum/forkcast/tree/main/src/data/eips" target="_blank" rel="noopener noreferrer" className="link-blue">
                      src/data/eips/
                    </a>{" "}
                    directory in the Forkcast repository.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div style={{
                  width: 24, height: 24, borderRadius: "50%",
                  background: "rgba(0, 212, 255, 0.1)", border: "1px solid var(--color-blue)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "0.75rem", fontWeight: 700, color: "var(--color-blue)", flexShrink: 0,
                }}>3</div>
                <div>
                  <strong style={{ color: "var(--color-text-bright)", fontSize: "0.95rem" }}>Champion it through ACD</strong>
                  <p style={{ fontSize: "0.85rem", color: "var(--color-text-muted)", marginTop: "0.25rem" }}>
                    Present your EIP at an AllCoreDevs call and build consensus. See the{" "}
                    <a href="https://github.com/ethereum/pm/blob/master/processes/2026_championing_an_EIP.md" target="_blank" rel="noopener noreferrer" className="link-blue">
                      championing guide
                    </a>{" "}
                    for the full process.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Upgrade History Tracker */}
        <section className="section">
          <h2 className="section-title">Every Ethereum Upgrade</h2>
          <p style={{ fontSize: "0.95rem", color: "var(--color-text-body)", lineHeight: 1.7, marginBottom: "1.5rem", maxWidth: "640px" }}>
            Names are chosen by core developers on AllCoreDevs calls. Execution layer
            upgrades are named after Devcon host cities, consensus layer upgrades after
            stars. Combined upgrades merge both into a portmanteau (e.g. Pectra = Prague + Electra).
          </p>
          <div className="upgrade-table-scroll">
          <div style={{ display: "flex", flexDirection: "column", gap: "2px", borderRadius: "8px", overflow: "hidden" }}>
            {/* Header */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "2.5fr 1.5fr 1.5fr 1fr",
              padding: "0.6rem 1.25rem",
              background: "var(--color-bg-elevated)",
              fontSize: "0.65rem",
              fontFamily: "var(--font-mono)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "var(--color-text-muted)",
            }}>
              <span>Upgrade</span>
              <span>Execution Layer</span>
              <span>Consensus Layer</span>
              <span style={{ textAlign: "right" }}>Date</span>
            </div>
            {(() => {
              const base = [
                { id: "hegota", name: "Hegota", el: "Bogota", elNote: "Devcon 6", cl: "Heze", clNote: "Star", date: "TBD", status: "planned" },
                { id: "glamsterdam", name: "Glamsterdam", el: "Amsterdam", elNote: "Devconnect", cl: "Gloas", clNote: "Star", date: "TBD", status: "active" },
                { id: "fusaka", name: "Fusaka", el: "Osaka", elNote: "Devcon 5", cl: "Fulu", clNote: "Star", date: "Dec 2025", status: "done" },
                { id: "pectra", name: "Pectra", el: "Prague", elNote: "Devcon 4", cl: "Electra", clNote: "Star", date: "May 2025", status: "done" },
                { id: "dencun", name: "Dencun", el: "Cancun", elNote: "Devcon 3", cl: "Deneb", clNote: "Star", date: "Mar 2024", status: "done" },
                { id: "shapella", name: "Shapella", el: "Shanghai", elNote: "Devcon 2", cl: "Capella", clNote: "Star", date: "Apr 2023", status: "done" },
                { id: "the-merge", name: "The Merge", el: "Paris", elNote: "EthCC", cl: "Bellatrix", clNote: "Star", date: "Sep 2022", status: "done" },
                { id: "london", name: "London", el: "London", elNote: "Devcon 1", cl: "-", clNote: "Pre-Beacon", date: "Aug 2021", status: "done" },
                { id: "berlin", name: "Berlin", el: "Berlin", elNote: "Devcon 0", cl: "-", clNote: "", date: "Apr 2021", status: "done" },
                { id: "istanbul", name: "Istanbul", el: "Istanbul", elNote: "Historical", cl: "-", clNote: "", date: "Dec 2019", status: "done" },
                { id: "constantinople", name: "Constantinople", el: "-", elNote: "Historical", cl: "-", clNote: "", date: "Feb 2019", status: "done" },
                { id: "byzantium", name: "Byzantium", el: "-", elNote: "Historical", cl: "-", clNote: "", date: "Oct 2017", status: "done" },
                { id: "homestead", name: "Homestead", el: "-", elNote: "", cl: "-", clNote: "", date: "Mar 2016", status: "done" },
                { id: "frontier", name: "Frontier", el: "-", elNote: "", cl: "-", clNote: "", date: "Jul 2015", status: "done" },
              ];
              // Overlay live status/date from forkcast
              const rows = base.map(u => {
                const live = fetched.find(f => f.id === u.id);
                if (!live) return u;
                const date = live.activationDate.replace(/\s\d{1,2},/, "");
                return { ...u, status: live.status, date: date || u.date };
              });
              // Append new upgrades from forkcast not in base
              const baseIds = new Set(base.map(b => b.id));
              const newUpgrades = fetched
                .filter(f => !baseIds.has(f.id))
                .map(f => ({
                  id: f.id, name: f.name, el: "-", elNote: "", cl: "-", clNote: "",
                  date: f.activationDate.replace(/\s\d{1,2},/, ""), status: f.status,
                }));
              return [...newUpgrades, ...rows];
            })().map((u) => (
              <div key={u.name} style={{
                display: "grid",
                gridTemplateColumns: "2.5fr 1.5fr 1.5fr 1fr",
                padding: "0.65rem 1.25rem",
                background: u.status === "active" ? "rgba(0,212,255,0.04)" : "var(--color-bg-surface)",
                borderLeft: u.status === "active" ? "2px solid var(--color-blue)" : "2px solid transparent",
                alignItems: "center",
              }}>
                <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span className={`upgrade-pip upgrade-pip-${u.status}`} />
                  <span style={{
                    fontSize: "0.9rem",
                    fontWeight: u.status === "active" ? 700 : 500,
                    color: u.status === "active" ? "var(--color-text-bright)" : u.status === "planned" ? "var(--color-text-muted)" : "var(--color-text-bright)",
                  }}>
                    {u.name}
                  </span>
                </span>
                <span className="upgrade-cell">
                  <span style={{ color: "var(--color-text-bright)", fontSize: "0.8rem" }}>{u.el}</span>
                  {u.elNote && <span className="upgrade-note">{u.elNote}</span>}
                </span>
                <span className="upgrade-cell">
                  <span style={{ color: "var(--color-text-bright)", fontSize: "0.8rem" }}>{u.cl}</span>
                  {u.clNote && <span className="upgrade-note">{u.clNote}</span>}
                </span>
                <span style={{
                  fontSize: "0.75rem",
                  fontFamily: "var(--font-mono)",
                  color: u.status === "active" ? "var(--color-blue)" : "var(--color-text-muted)",
                  textAlign: "right",
                }}>
                  {u.date}
                </span>
              </div>
            ))}
          </div>
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
