import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import UpgradeTimeline from "./UpgradeTimeline";

export const metadata: Metadata = {
  title: "Fork History",
  description:
    "Every Ethereum network upgrade, from Frontier in 2015 through the Merge to today's forks, sorted by date.",
};

export default function UpgradesPage() {
  return (
    <>
      <Navigation />
      <main id="main-content" tabIndex={-1} className="relative z-10 max-w-[1100px] mx-auto page-container upgrades-page">
        <div className="page-header">
          <h1 className="page-title">Fork history</h1>
        </div>
        <UpgradeTimeline />
        <Footer />
      </main>
    </>
  );
}
