import Image from "next/image";
import heroMark from "@/assets/hero-mark.webp";

interface HeroProps {
  updates?: string[];
}

export default function Hero({ updates }: HeroProps) {
  const lines = updates && updates.length > 0 ? updates : [
    "Governance operations are public",
    "Staker support is online",
    "Five initiatives are active",
  ];
  return (
    <section className="relative flex items-center justify-center text-center hero-section ethcoord-hero">
      <Image
        src={heroMark}
        alt=""
        priority
        sizes="(max-width: 680px) 86vw, 720px"
        className="hero-bg-mark"
      />
      <div className="hero-glow" />

      <div className="relative z-[2] max-w-[760px]">
        <h1 style={{
          fontSize: "clamp(3.1rem, 8vw, 5.4rem)",
          fontWeight: 300,
          lineHeight: 1.05,
          color: "var(--color-text-bright)",
          marginBottom: "1.5rem",
          letterSpacing: "-0.02em",
        }}>
          <strong style={{ fontWeight: 700 }}>EthCoordinate</strong>
        </h1>

        <p style={{
          fontSize: "1.05rem",
          color: "var(--color-text-secondary)",
          lineHeight: 1.8,
          maxWidth: 540,
          margin: "0 auto 3rem",
        }}>
          Providing support for governance operations, facilitating stakeholder
          engagement, and maintaining home staking tooling & software.
        </p>

        <div className="terminal">
          <div className="terminal-bar">
            <div className="terminal-dot r" />
            <div className="terminal-dot y" />
            <div className="terminal-dot g" />
            <span className="terminal-title">ethcoordinate — zsh</span>
          </div>
          <div className="terminal-body">
            <div className="t-line"><span className="t-prompt">&rarr;</span><span className="t-cmd">./coordinate --current</span></div>
            {lines.map((line, i) => (
              <div key={i} className="t-out">{"\u2713"} {line}</div>
            ))}
            <div className="t-line"><span className="t-prompt">&rarr;</span><span className="cursor" /></div>
          </div>
        </div>
      </div>
    </section>
  );
}
