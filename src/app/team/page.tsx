import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FloatingOcto from "@/components/FloatingOcto";
import TeamMemberCard from "@/components/TeamMemberCard";
import butta from "@/assets/team/butta.jpg";
import francoBalzani from "@/assets/team/franco-balzani.jpg";
import jeromeDeTychey from "@/assets/team/jerome-de-tychey.jpg";
import lamboshi from "@/assets/team/lamboshi.jpg";
import marc from "@/assets/team/marc.jpg";
import nixo from "@/assets/team/nixo.jpg";
import patricioWorthalter from "@/assets/team/patricio-worthalter.jpg";
import yorick from "@/assets/team/yorick.jpg";

export const metadata: Metadata = {
  title: "Team",
  description:
    "Meet the EthCoordinate team supporting Ethereum protocol coordination, independent stakers, research, and open-source tooling.",
};

const teamMembers = [
  {
    name: "Nixo",
    role: "Founder",
    bio: "Former team lead EF Protocol Support, long-time EthStaker member.",
    image: nixo,
    twitter: "nixorokish",
  },
  {
    name: "Patricio Worthalter",
    role: "Founder",
    bio: "Recovering founder of POAP.",
    image: patricioWorthalter,
    twitter: "worthalter",
  },
  {
    name: "Butta",
    role: "Stakeholder coordination",
    bio: "Co-founder of Beaconchain.",
    image: butta,
    twitter: "Butta_eth",
  },
  {
    name: "Jerome de Tychey",
    role: "Ecosystem builder",
    bio: "Driving Ethereum ecosystem & DeFi growth, one block at a time.",
    image: jeromeDeTychey,
    twitter: "jdetychey",
  },
  {
    name: "Yorick",
    role: "Protocol coordination",
    bio: "Exited founder of Cryptomanufaktur.",
    image: yorick,
    twitter: "yorickdowne",
  },
  {
    name: "Marc",
    role: "Dev",
    bio: "Building forkcast.org",
    image: marc,
    twitter: "wolovim",
  },
  {
    name: "Lamboshi",
    role: "Advisor",
    bio: "Community leader at @ethstaker.",
    image: lamboshi,
    twitter: "L_Nakaghini",
  },
  {
    name: "Franco Balzani",
    role: "Project manager and operations",
    bio: "A decade around projects.",
    image: francoBalzani,
    twitter: "holafiasco",
  },
];

export default function TeamPage() {
  return (
    <>
      <Navigation />
      <main id="main-content" className="relative z-10 max-w-[1100px] mx-auto page-container">
        <div className="page-header">
          <p className="page-eyebrow">People behind the work</p>
          <h1 className="page-title">Meet the Team</h1>
          <p className="page-desc">
            Our team is made up of Ethereum professionals across research,
            protocol development, and community.
          </p>
        </div>
        <div className="page-divider" />

        {/* Team Grid */}
        <section className="section">
          <div className="card-grid">
            {teamMembers.map((member, index) => (
              <TeamMemberCard
                key={index}
                name={member.name}
                role={member.role}
                bio={member.bio}
                image={member.image}
                twitter={member.twitter}
              />
            ))}
          </div>
        </section>

        {/* Contact */}
        <section className="section">
          <h2 className="section-title">Get in Touch</h2>
          <p style={{ color: "var(--color-text-body)", fontSize: "0.95rem", lineHeight: 1.75, marginBottom: "1.5rem", maxWidth: 650 }}>
            Working on something we should know about? Reach the team directly
            or join one of the public community channels.
          </p>
          <div className="flex flex-wrap gap-6" style={{ alignItems: "center" }}>
            <a href="https://x.com/ethcoordinate" target="_blank" rel="noopener noreferrer" className="link-blue" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontSize: "0.95rem" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ opacity: 0.7 }}><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              @ethcoordinate
            </a>
            <span style={{ color: "var(--color-text-dim)" }}>·</span>
            <a href="mailto:team@ethcoordinate.org" className="link-blue" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontSize: "0.95rem" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.7 }}><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              team@ethcoordinate.org
            </a>
            <span style={{ color: "var(--color-text-dim)" }}>·</span>
            <a href="https://discord.com/invite/ethstaker" target="_blank" rel="noopener noreferrer" className="link-blue" style={{ fontSize: "0.95rem" }}>
              Community Discord ↗
            </a>
          </div>
        </section>

        <Footer />
      </main>
      <FloatingOcto />
    </>
  );
}
