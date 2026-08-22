import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import MatrixRain from "@/components/MatrixRain";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ethcoordinate.org"),
  title: {
    default: "EthCoordinate: A coordination engine for Ethereum",
    template: "%s | EthCoordinate",
  },
  description:
    "Providing support for governance operations, facilitating stakeholder engagement, and maintaining home staking tooling & software.",
  keywords: [
    "Ethereum",
    "Ethereum coordination",
    "EthCoordinate",
    "EthStaker",
    "EIP",
    "AllCoreDevs",
    "Forkcast",
    "protocol governance",
    "core development",
    "network upgrades",
  ],
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "EthCoordinate: A coordination engine for Ethereum",
    description:
      "Providing support for governance operations, facilitating stakeholder engagement, and maintaining home staking tooling & software.",
    type: "website",
    siteName: "EthCoordinate",
    locale: "en_US",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "EthCoordinate",
      },
    ],
  },
  alternates: {
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
  twitter: {
    card: "summary_large_image",
    site: "@ethcoordinate",
    title: "EthCoordinate: A coordination engine for Ethereum",
    description:
      "Providing support for governance operations, facilitating stakeholder engagement, and maintaining home staking tooling & software.",
    images: ["/og.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className={`${jetbrainsMono.variable} antialiased min-h-screen`}>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("ps-theme");if(t==="dark"||t==="light"){document.documentElement.setAttribute("data-theme",t)}else{document.documentElement.setAttribute("data-theme",window.matchMedia("(prefers-color-scheme:light)").matches?"light":"dark")}}catch(e){document.documentElement.setAttribute("data-theme","dark")}})()`,
          }}
        />
        <div className="scanlines" aria-hidden="true" />
        <MatrixRain />
        {children}
      </body>
    </html>
  );
}
