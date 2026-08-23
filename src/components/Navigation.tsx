"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ThemeToggle from "./ThemeToggle";

type NavChild = {
  href: string;
  label: string;
  note: string;
};

type NavItem = {
  href: string;
  label: string;
  activePrefixes?: readonly string[];
  children?: readonly NavChild[];
};

const navLinks: readonly NavItem[] = [
  {
    href: "/#initiatives",
    label: "Initiatives",
    activePrefixes: ["/initiatives", "/forkcast", "/products/forkcast"],
    children: [
      { href: "/initiatives/staker-support", label: "Staker support", note: "Guidance, tools, and community" },
      { href: "/initiatives/protocol-coordination", label: "Protocol coordination", note: "Calls, breakouts, and EIP support" },
      { href: "/forkcast", label: "Forkcast", note: "Upgrades, EIPs, calls, and decisions" },
    ],
  },
  {
    href: "/pm-repo",
    label: "Governance",
    activePrefixes: ["/pm-repo", "/guides"],
    children: [
      { href: "/pm-repo", label: "PM repository", note: "Calls, agendas, and coordination" },
      { href: "/pm-repo/breakouts", label: "Breakout rooms", note: "Focused protocol discussions" },
      { href: "/guides", label: "Participation guides", note: "EIPs, proposals, and breakouts" },
      { href: "/guides/champion", label: "Champion an EIP", note: "A practical author journey" },
    ],
  },
  {
    href: "/about",
    label: "About",
    activePrefixes: ["/about", "/team"],
    children: [
      { href: "/about", label: "About EthCoordinate", note: "Story, principles, community, FAQ" },
      { href: "/team", label: "Team", note: "People behind the work" },
      { href: "/about#community", label: "Community", note: "Discord, Reddit, and live programmes" },
      { href: "/about#faq", label: "FAQ", note: "Funding, neutrality, and scope" },
    ],
  },
];

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  const isActive = (item: NavItem) => {
    const prefixes = item.activePrefixes ?? [item.href];
    return prefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
  };

  // The most specific child whose route contains the current path (so /pm-repo/breakouts lights
  // up "Breakout rooms" rather than "PM repository"). A child only counts when its own parent
  // is active too: /pm-repo sits in both menus, and without that check the Initiatives row
  // would light up while its top-level item stayed inactive.
  const activeChild = (item: NavItem) => {
    if (!isActive(item)) return null;
    const matches = (item.children ?? []).filter(
      (child) => !child.href.includes("#") && (pathname === child.href || pathname.startsWith(`${child.href}/`)),
    );
    return matches.sort((a, b) => b.href.length - a.href.length)[0]?.href ?? null;
  };

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  const showMenu = (href: string) => {
    cancelClose();
    setOpenMenu(href);
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpenMenu(null), 140);
  };

  const closeNavigation = () => {
    setMobileMenuOpen(false);
    setMobileExpanded(null);
    setOpenMenu(null);
  };

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenMenu(null);
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("keydown", handleKey);
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <nav className="fixed top-0 left-0 right-0 z-[100] nav-backdrop page-container" aria-label="Primary navigation">
        <div className="max-w-[1100px] mx-auto nav-shell">
          <Link href="/" className="brand-link" aria-label="EthCoordinate home" onClick={closeNavigation}>
            <Image
              src="/favicon.svg"
              alt=""
              width={30}
              height={30}
              unoptimized
              className="nav-logo-mark"
            />
            <span className="brand-copy">
              <strong>ETHCOORDINATE</strong>
              <small>COORDINATION ENGINE</small>
            </span>
          </Link>

          <ul className="desktop-nav" role="list">
            {navLinks.map((item) => {
              const active = isActive(item);
              const expanded = openMenu === item.href;
              return (
                <li
                  key={item.href}
                  className="desktop-nav-item"
                  onMouseEnter={() => item.children && showMenu(item.href)}
                  onMouseLeave={(event) => {
                    if (item.children && !event.currentTarget.contains(document.activeElement)) {
                      scheduleClose();
                    }
                  }}
                  onFocus={() => item.children && showMenu(item.href)}
                  onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                      setOpenMenu(null);
                    }
                  }}
                >
                  <div className="desktop-nav-trigger">
                    <Link href={item.href} className={active ? "active" : ""} aria-current={pathname === item.href ? "page" : undefined} onClick={closeNavigation}>
                      {item.label}
                    </Link>
                    {item.children && (
                      <button
                        type="button"
                        aria-label={`${expanded ? "Close" : "Open"} ${item.label} menu`}
                        aria-expanded={expanded}
                        aria-haspopup="menu"
                        onClick={() => setOpenMenu(expanded ? null : item.href)}
                      >
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true" className={expanded ? "rotated" : ""}>
                          <path d="M2.5 4L5 6.5L7.5 4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    )}
                  </div>

                  {item.children && expanded && (
                    <div className="nav-dropdown" role="menu">
                      {item.children.map((child, i, arr) => {
                        const childActive = activeChild(item) === child.href;
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            role="menuitem"
                            className={childActive ? "active" : undefined}
                            aria-current={childActive ? "page" : undefined}
                            onClick={closeNavigation}
                          >
                            <span className="nav-tree" aria-hidden="true">{i === arr.length - 1 ? "└─" : "├─"}</span>
                            {child.label}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="desktop-nav-actions">
            <ThemeToggle />
          </div>

          <div className="mobile-nav-actions">
            <ThemeToggle />
            <button
              type="button"
              className="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div id="mobile-navigation" className="mobile-nav-panel">
          <div className="mobile-nav-inner">
            <p className="mobile-nav-kicker">Navigate the work</p>
            {navLinks.map((item) => {
              const active = isActive(item);
              const expanded = mobileExpanded === item.href;
              return (
                <div key={item.href} className="mobile-nav-group">
                  <div className="mobile-nav-parent">
                    <Link href={item.href} className={active ? "active" : ""} onClick={closeNavigation}>{item.label}</Link>
                    {item.children && (
                      <button
                        type="button"
                        aria-label={`${expanded ? "Collapse" : "Expand"} ${item.label} links`}
                        aria-expanded={expanded}
                        onClick={() => setMobileExpanded(expanded ? null : item.href)}
                      >
                        <span aria-hidden="true">{expanded ? "−" : "+"}</span>
                      </button>
                    )}
                  </div>
                  {item.children && expanded && (
                    <div className="mobile-nav-children">
                      {item.children.map((child) => (
                        <Link key={child.href} href={child.href} onClick={closeNavigation}>
                          <strong>{child.label}</strong>
                          <span>{child.note}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
