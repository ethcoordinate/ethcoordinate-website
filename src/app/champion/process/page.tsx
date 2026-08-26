import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FloatingOcto from "@/components/FloatingOcto";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Navigating the Process: EIP Champion's Handbook",
  description:
    "How the ACD process works for EIP champions: stages, calls, decision venues, implementation requirements, and staying informed.",
};

export default function ProcessPage() {
  return (
    <>
      <Navigation />
      <main id="main-content" tabIndex={-1} className="relative z-10 max-w-[1100px] mx-auto page-container">
        {/* Breadcrumb */}
        <div className="page-header">
          <div className="guide-breadcrumb">
            <Link href="/guides" className="link-muted">Guides</Link>
            <span style={{ color: "var(--color-text-dim)" }}>/</span>
            <Link href="/champion" className="link-muted">Champion&apos;s Handbook</Link>
            <span style={{ color: "var(--color-text-dim)" }}>/</span>
            <span style={{ color: "var(--color-text-bright)" }}>Navigating the Process</span>
          </div>

          <h1 className="page-title" style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)" }}>
            Navigating the Process
          </h1>
          <p className="page-desc">
            The mechanics of how EIPs move through the Ethereum governance
            process, from proposal to mainnet.
          </p>
        </div>
        <div className="page-divider" />

        {/* TOC */}
        <nav className="guide-toc" aria-label="Table of contents">
          <span className="guide-toc-label">On this page</span>
          <a href="#headliners">Headliners vs. Non-Headliners</a>
          <a href="#stages">EIP Stages</a>
          <a href="#decisions">Where Decisions Happen</a>
          <a href="#calls">Call Expectations</a>
          <a href="#informed">Staying Informed</a>
          <a href="#breakouts">Running a Breakout Call</a>
          <a href="#implementation">Implementation &amp; Testing</a>
        </nav>

        {/* Headliners vs Non-Headliners */}
        <section className="section" id="headliners">
          <h2 className="section-title">Headliners vs. Non-Headliners</h2>
          <p style={prose}>
            Since the Pectra upgrade, Ethereum forks follow a <strong style={bright}>headliner-first model</strong>.
            A small number of major features (typically one per layer) are chosen first to define the
            fork&apos;s goals. Non-headliner EIPs are then collected during a proposal window and
            evaluated as a batch, and they&apos;re expected not to delay the headliners.
          </p>
          <div className="guide-callout" style={{ marginTop: "1rem" }}>
            <strong style={bright}>What this means for you:</strong> If your EIP is a headliner
            candidate, it needs to be proposed early during the headliner selection window (announced
            by the ACD facilitator on Ethereum Magicians). Non-headliners can be proposed later via
            a PR against the fork&apos;s Meta EIP.
          </div>
        </section>

        {/* EIP Stages */}
        <section className="section" id="stages">
          <h2 className="section-title">EIP Stages: PFI → CFI → SFI</h2>
          <p style={prose}>
            Defined in{" "}
            <a href="https://eips.ethereum.org/EIPS/eip-7723" target="_blank" rel="noopener noreferrer" className="link-blue">
              EIP-7723
            </a>
            , these are the inclusion stages every Core EIP moves through for a given fork:
          </p>

          <div className="eip-flow" style={{ margin: "1.5rem 0", fontSize: "0.85rem" }}>
            <span className="eip-stage eip-stage-draft">PFI</span>
            <span className="eip-arrow">→</span>
            <span className="eip-stage eip-stage-review">CFI</span>
            <span className="eip-arrow">→</span>
            <span className="eip-stage eip-stage-included">SFI</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", marginTop: "1rem" }}>
            <div className="guide-stage-card">
              <div className="guide-stage-badge" style={{ background: "rgba(59,130,160,0.2)", color: "var(--color-text-secondary)" }}>PFI</div>
              <div>
                <strong style={bright}>Proposed for Inclusion</strong>
                <p style={proseSm}>
                  Anyone can open a PR against the fork&apos;s Meta EIP to propose an EIP during the PFI window.
                  After PFI, your job is to ensure implementations are progressing, surface concerns early,
                  stay active in R&D Discord, and optionally create a Forkcast entry to help ACD participants
                  understand your EIP.
                </p>
              </div>
            </div>

            <div className="guide-stage-card">
              <div className="guide-stage-badge" style={{ background: "rgba(0,212,255,0.15)", color: "var(--color-blue)" }}>CFI</div>
              <div>
                <strong style={bright}>Considered for Inclusion</strong>
                <p style={proseSm}>
                  Moving PFI → CFI happens when your EIP is discussed on an ACD call during the
                  designated window and rough consensus is reached. The ACD facilitator updates the
                  Meta EIP. This is your green light to get serious about implementation: CFI
                  means the EIP will be part of the devnet cycle.
                </p>
              </div>
            </div>

            <div className="guide-stage-card">
              <div className="guide-stage-badge" style={{ background: "rgba(52,211,153,0.2)", color: "#34D399" }}>SFI</div>
              <div>
                <strong style={bright}>Scheduled for Inclusion</strong>
                <p style={proseSm}>
                  SFI means the EIP has achieved rough consensus and is on the path to mainnet
                  (devnets → testnets → mainnet). To reach SFI, your EIP <strong style={bright}>must</strong> have
                  executable specifications. The bar is higher than CFI: SFI means &ldquo;we&apos;re
                  confident this will ship.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Where Decisions Happen */}
        <section className="section" id="decisions">
          <h2 className="section-title">Where Decisions Happen</h2>
          <p style={prose}>
            Ethereum protocol decisions happen across a handful of recurring calls and async channels.
            Understanding which venue is appropriate for what saves you time and gets you heard.
          </p>

          <div style={{ overflowX: "auto", marginTop: "1.25rem" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                  <th style={th}>Call</th>
                  <th style={th}>When</th>
                  <th style={th}>Focus</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                  <td style={td}><strong style={{ color: "var(--color-blue)" }}>ACDE</strong></td>
                  <td style={td}>Every other Thursday, 14:00 UTC</td>
                  <td style={td}>Execution layer: what goes in the fork + status updates</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                  <td style={td}><strong style={{ color: "var(--color-purple)" }}>ACDC</strong></td>
                  <td style={td}>Alternating Thursdays, 14:00 UTC</td>
                  <td style={td}>Consensus layer: same scope as ACDE but for CL</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                  <td style={td}><strong style={{ color: "var(--coord-green)" }}>ACDT</strong></td>
                  <td style={td}>Every Monday, 14:00 UTC</td>
                  <td style={td}>Implementation &amp; testing: how to build it, debugging, devnets</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style={{ marginTop: "1.25rem" }}>
            <p style={proseSm}>
              <strong style={bright}>Async:</strong> The{" "}
              <a href="https://discord.gg/EVTQ9crVgQ" target="_blank" rel="noopener noreferrer" className="link-blue">
                Eth R&amp;D Discord
              </a>{" "}
              is the primary async venue. Key channels include <code style={code}>#allcoredevs</code>,{" "}
              <code style={code}>#execution-dev</code>, <code style={code}>#consensus-dev</code>, and
              the relevant testing channels.
            </p>
            <p style={{ ...proseSm, marginTop: "0.75rem" }}>
              <strong style={bright}>Getting on the agenda:</strong> Anyone can propose a topic by
              commenting on the relevant call&apos;s{" "}
              <a href="https://github.com/ethereum/pm/issues" target="_blank" rel="noopener noreferrer" className="link-blue">
                ethereum/pm issue
              </a>
              . Agendas are typically finalized the day before the call.
            </p>
          </div>
        </section>

        {/* Call Expectations */}
        <section className="section" id="calls">
          <h2 className="section-title">Call Expectations</h2>
          <p style={prose}>
            When your EIP is on the agenda, <strong style={bright}>attend the call</strong> (or
            send a representative). Decisions can be made without you.
          </p>
          <div className="guide-callout" style={{ marginTop: "1rem" }}>
            <strong style={bright}>If you can&apos;t attend:</strong>
            <ul style={{ margin: "0.5rem 0 0", paddingLeft: "1.2rem", fontSize: "0.85rem", color: "var(--color-text-body)", lineHeight: 1.7 }}>
              <li>Submit a written update ahead of time (on the agenda issue or in R&amp;D Discord)</li>
              <li>Send someone to represent your update</li>
              <li>Catch up by reading the{" "}
                <a href="https://forkcast.org/calls/" target="_blank" rel="noopener noreferrer" className="link-blue">
                  transcript and summary on Forkcast
                </a>
              </li>
            </ul>
          </div>
        </section>

        {/* Staying Informed */}
        <section className="section" id="informed">
          <h2 className="section-title">Staying Informed</h2>
          <p style={prose}>
            Protocol decisions can move fast. To avoid being caught off guard:
          </p>
          <div className="quick-links-grid" style={{ marginTop: "1rem" }}>
            <a href="https://forkcast.org/calls/" target="_blank" rel="noopener noreferrer">
              <div style={dot("var(--coord-cyan)")} />
              Forkcast: call transcripts, summaries, and fork timelines
              <span style={extArrow}>{"\u2197"}</span>
            </a>
            <a href="https://blog.ethereum.org/category/research-and-development" target="_blank" rel="noopener noreferrer">
              <div style={dot("var(--coord-purple)")} />
              EF Blog Checkpoint series: periodic governance summaries
              <span style={extArrow}>{"\u2197"}</span>
            </a>
            <a href="https://discord.gg/EVTQ9crVgQ" target="_blank" rel="noopener noreferrer">
              <div style={dot("var(--coord-green)")} />
              R&amp;D Discord #allcoredevs: async discussion hub
              <span style={extArrow}>{"\u2197"}</span>
            </a>
            <a href="https://github.com/ethereum/pm/issues" target="_blank" rel="noopener noreferrer">
              <div style={dot("var(--coord-yellow)")} />
              ethereum/pm agendas: check the day before ACD calls
              <span style={extArrow}>{"\u2197"}</span>
            </a>
          </div>
        </section>

        {/* Breakout Calls */}
        <section className="section" id="breakouts">
          <h2 className="section-title">Running a Breakout Call</h2>
          <p style={prose}>
            If your EIP has active development work or open questions that can&apos;t fit in the ACD
            agenda, consider organizing a breakout call. You&apos;ll be responsible for getting the
            right people to attend.
          </p>
          <p style={{ ...proseSm, marginTop: "0.75rem" }}>
            <strong style={bright}>When to start one:</strong> There&apos;s active work or open
            questions, it can&apos;t fit in ACD, and enough people will attend to make it worthwhile.
          </p>
          <p style={{ ...proseSm, marginTop: "0.75rem" }}>
            Breakouts are organized via issues in the{" "}
            <a href="https://github.com/ethereum/pm" target="_blank" rel="noopener noreferrer" className="link-blue">
              ethereum/pm repo
            </a>
            . See the{" "}
            <a href="https://github.com/ethereum/pm/blob/master/processes/running-a-breakout.md" target="_blank" rel="noopener noreferrer" className="link-blue">
              guide to running a breakout call
            </a>{" "}
            for setup details.
          </p>
        </section>

        {/* Implementation & Testing */}
        <section className="section" id="implementation">
          <h2 className="section-title">Implementation &amp; Testing</h2>
          <p style={prose}>
            Implementing your EIP in the relevant Python specifications early is one of the strongest
            things you can do. It lets the community collaboratively disambiguate the spec and
            generates reference tests for client teams. To reach SFI, executable specifications
            are <strong style={bright}>required</strong>.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1.25rem" }}>
            <details className="guide-details">
              <summary className="guide-details-summary">
                <span style={{ color: "var(--color-blue)", fontWeight: 600 }}>Execution Layer</span>
                <span className="guide-details-toggle" />
              </summary>
              <div className="guide-details-content">
                <ul style={detailList}>
                  <li>
                    Implement changes in{" "}
                    <a href="https://github.com/ethereum/execution-specs" target="_blank" rel="noopener noreferrer" className="link-blue">
                      execution-specs
                    </a>{" "}
                    (EELS). EIP authors are encouraged to try the implementation themselves; EELS
                    maintainers regularly step in once a PR is created.
                  </li>
                  <li>
                    Reference the{" "}
                    <a href="https://github.com/ethereum/execution-specs/blob/bf9dbb4dfe86298d54b07816fc1bd36ec062b004/docs/specs/adding_a_new_eip.md" target="_blank" rel="noopener noreferrer" className="link-blue">
                      EIP Author&apos;s Manual
                    </a>.
                  </li>
                  <li>
                    Add test cases in the <code style={code}>tests/unscheduled/</code> directory.
                  </li>
                  <li>
                    Reach out to the{" "}
                    <a href="https://steel.ethereum.foundation/team/" target="_blank" rel="noopener noreferrer" className="link-blue">
                      STEEL Team
                    </a>{" "}
                    in R&amp;D Discord <code style={code}>#el-testing</code> for help.
                  </li>
                </ul>
              </div>
            </details>

            <details className="guide-details">
              <summary className="guide-details-summary">
                <span style={{ color: "var(--color-purple)", fontWeight: 600 }}>Consensus Layer</span>
                <span className="guide-details-toggle" />
              </summary>
              <div className="guide-details-content">
                <ul style={detailList}>
                  <li>
                    Implement the feature in the{" "}
                    <a href="https://github.com/ethereum/consensus-specs" target="_blank" rel="noopener noreferrer" className="link-blue">
                      consensus-specs
                    </a>{" "}
                    repository. Maintainers will provide feedback once a PR is created.
                  </li>
                  <li>
                    Reference the feature addition{" "}
                    <a href="https://github.com/ethereum/consensus-specs/blob/master/docs/docs/new-feature.md" target="_blank" rel="noopener noreferrer" className="link-blue">
                      docs
                    </a>.
                  </li>
                  <li>
                    Reach out in R&amp;D Discord <code style={code}>#cl-testing</code> for help.
                  </li>
                </ul>
              </div>
            </details>
          </div>
        </section>

        {/* Nav */}
        <div className="guide-nav">
          <Link href="/champion" className="guide-nav-link">
            <span style={{ fontSize: "0.7rem", color: "var(--color-text-muted)" }}>← Back</span>
            <span>Champion&apos;s Handbook</span>
          </Link>
          <Link href="/champion/strengthen" className="guide-nav-link" style={{ textAlign: "right", marginLeft: "auto" }}>
            <span style={{ fontSize: "0.7rem", color: "var(--color-text-muted)" }}>Next →</span>
            <span>Strengthening Your Proposal</span>
          </Link>
        </div>

        <Footer />
      </main>
      <FloatingOcto />
    </>
  );
}

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

const th = {
  textAlign: "left" as const,
  padding: "0.6rem 0.75rem",
  fontWeight: 600,
  color: "var(--color-text-bright)",
  fontSize: "0.8rem",
  letterSpacing: "0.04em",
  textTransform: "uppercase" as const,
};

const td = {
  padding: "0.6rem 0.75rem",
  color: "var(--color-text-body)",
  verticalAlign: "top" as const,
};

const code = {
  fontSize: "0.8rem",
  background: "var(--color-bg-elevated)",
  padding: "0.15rem 0.4rem",
  borderRadius: "3px",
  color: "var(--color-text-secondary)",
};

const dot = (bg: string) => ({
  width: 6, height: 6, borderRadius: "50%",
  background: bg, flexShrink: 0, opacity: 0.8,
});

const extArrow = {
  marginLeft: "auto" as const,
  fontSize: "0.75rem",
  opacity: 0.4,
};

const detailList = {
  margin: 0,
  paddingLeft: "1.2rem",
  fontSize: "0.85rem",
  color: "var(--color-text-body)",
  lineHeight: 1.7,
  display: "flex",
  flexDirection: "column" as const,
  gap: "0.5rem",
};
