import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import NavigatorApp from "./NavigatorApp";

export const metadata: Metadata = {
  title: "Protocol Navigator",
  description:
    "An interactive, plain-language guide to Ethereum's EIP, AllCoreDevs, and network-upgrade processes. Start with your goal, not the process vocabulary.",
};

export default function NavigatorPage() {
  return (
    <>
      <Navigation />
      <main id="main-content" tabIndex={-1} className="relative z-10 max-w-[1100px] mx-auto page-container">
        <NavigatorApp />
      </main>
      <Footer />
    </>
  );
}
