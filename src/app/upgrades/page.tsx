import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import UpgradeTimeline from "./UpgradeTimeline";

export const metadata: Metadata = {
  title: "Fork History",
  description:
    "An interactive timeline of every Ethereum network upgrade, from Frontier in 2015 through the Merge to today's forks.",
};

export default function UpgradesPage() {
  return (
    <>
      {/* the loop is the largest above-fold image; start it before first paint */}
      <link rel="preload" as="image" href="/upgrades/loop.webp" />
      <Navigation />
      <main id="main-content" tabIndex={-1} className="relative z-10 max-w-[1100px] mx-auto page-container upgrades-page">
        <div className="page-header">
          <p className="page-eyebrow">Ethereum&apos;s upgrades</p>
          <h1 className="page-title">Fork history</h1>
        </div>
        <UpgradeTimeline />
      </main>
      <Footer />
    </>
  );
}
