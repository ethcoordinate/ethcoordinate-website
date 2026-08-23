import Image from "next/image";
import heroMark from "@/assets/hero-mark.webp";
import StatusConsole, { type ConsoleLine } from "@/components/StatusConsole";

interface HeroProps {
  updates?: readonly ConsoleLine[];
}

export default function Hero({ updates }: HeroProps) {
  const lines: readonly ConsoleLine[] = updates && updates.length > 0 ? updates : [
    { tag: "acd", text: "Governance operations are public" },
    { tag: "stakers", text: "Staker support is online" },
    { tag: "org", text: "Five initiatives are active" },
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

        <StatusConsole lines={lines} />
      </div>
    </section>
  );
}
