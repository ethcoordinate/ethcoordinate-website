import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import NavigatorApp from "../NavigatorApp";
import { screenFromSlug, screenRoutes, screens } from "../screens";

type Params = { screen?: string[] };

export function generateStaticParams(): Params[] {
  return screens.map((screen) => {
    const { slug } = screenRoutes[screen];
    return slug ? { screen: [slug] } : { screen: [] };
  });
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { screen: segments } = await params;
  const screen = screenFromSlug(segments?.[0]);
  if (!screen) return {};
  const { title, description } = screenRoutes[screen];
  return { title, description };
}

export default async function NavigatorPage({ params }: { params: Promise<Params> }) {
  const { screen: segments } = await params;
  if (segments && segments.length > 1) notFound();
  const screen = screenFromSlug(segments?.[0]);
  if (!screen) notFound();

  return (
    <>
      <Navigation />
      <main id="main-content" tabIndex={-1} className="relative z-10 max-w-[1100px] mx-auto page-container">
        <NavigatorApp initialScreen={screen} />
        <Footer />
      </main>
    </>
  );
}
