import Link from "next/link";
import Image from "next/image";
import { organization } from "@/data/site";

const footerGroups = [
  {
    label: "Explore",
    links: [
      { label: "Initiatives", href: "/#initiatives" },
      { label: "Governance", href: "/pm-repo" },
      { label: "Protocol Navigator", href: "/navigator" },
    ],
  },
  {
    label: "Organization",
    links: [
      { label: "About", href: "/about" },
      { label: "Team", href: "/team" },
    ],
  },
] as const;

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <div className="footer-brand-heading">
            <Image
              src="/favicon.svg"
              alt=""
              width={32}
              height={32}
              unoptimized
              className="footer-brand-mark"
            />
            <strong>{organization.name}</strong>
          </div>
          <p>{organization.tagline}</p>
          <a href={`mailto:${organization.email}`} className="link-muted">{organization.email}</a>
        </div>
        <div className="footer-nav-groups">
          {footerGroups.map((group) => (
            <nav key={group.label} aria-label={`${group.label} links`}>
              <span>{group.label}</span>
              {group.links.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}
            </nav>
          ))}
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 EthCoordinate</span>
        <div className="footer-links">
          <a href={organization.social.x} target="_blank" rel="noopener noreferrer">X</a>
          <a href={organization.social.discord} target="_blank" rel="noopener noreferrer">Discord</a>
          <a href={organization.social.github} target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
      </div>
    </footer>
  );
}
