import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import UpgradeTimeline from "./UpgradeTimeline";

export const metadata: Metadata = {
  title: "Ethereum Upgrades",
  description:
    "An interactive timeline of every Ethereum network upgrade, from Frontier in 2015 through the Merge to today's forks.",
};

export default function UpgradesPage() {
  return (
    <>
      <Navigation />
      <main id="main-content" tabIndex={-1} className="relative z-10 max-w-[1100px] mx-auto page-container">
        <div className="page-header">
          <p className="page-eyebrow">Every fork, one timeline</p>
          <h1 className="page-title">Ethereum upgrades</h1>
          <p className="page-desc">
            From Frontier to the Merge to today&apos;s forks. Hover any point for
            its name and date; click through to the primary record.
          </p>
        </div>
        <div className="page-divider" />
        <section className="section">
          <UpgradeTimeline />
        </section>
      </main>
      <Footer />
    </>
  );
}
