import { Suspense } from "react";
import type { Metadata, Viewport } from "next";
import { Newsreader, Public_Sans } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import { getOrganizationSchema } from "@/lib/seo";
import { getSchools, getProgrammes } from "@/sanity/lib/fetch";
import { AnnouncementBar } from "@/layout/AnnouncementBar";
import { Header } from "@/layout/Header";
import { Footer } from "@/layout/Footer";
import { DraftModeProvider } from "@/components/cms/DraftModeProvider";

const displayFont = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const bodyFont = Public_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} | Saapade, Ogun State`,
    template: `%s | ${site.name}`,
  },
  description: `Official website for ${site.name}. Hands-on ND and HND training in innovation, technology, agriculture, environmental science, and academic excellence in Ogun State, Nigeria.`,
  keywords: [
    site.name,
    site.shortName,
    "Polytechnic Saapade",
    "Gateway ICT Polytechnic",
    "ND programmes",
    "HND programmes",
    "Technology and ICT Polytechnic",
    "Ogun State Polytechnic",
  ],
  authors: [{ name: site.name }],
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: siteUrl,
    siteName: site.name,
    title: `${site.name} | Saapade, Ogun State`,
    description:
      "Fostering innovation, technology, and academic excellence across ND and HND programmes.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Saapade, Ogun State`,
    description:
      "Fostering innovation, technology, and academic excellence across ND and HND programmes.",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "android-chrome-192x192",
        url: "/android-chrome-192x192.png",
      },
    ],
  },
  manifest: "/site.webmanifest",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgSchema = getOrganizationSchema();
  const [schools, programmes] = await Promise.all([
    getSchools(),
    getProgrammes(),
  ]);

  return (
    <html lang="en-NG" className={`${displayFont.variable} ${bodyFont.variable} overflow-x-hidden`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col bg-white text-ink overflow-x-hidden">
        {/* Accessible Skip to Main Content Link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-navy focus:text-white focus:rounded focus:outline-none focus:ring-2 focus:ring-white"
        >
          Skip to main content
        </a>

        {/* Global Layout Components */}
        <AnnouncementBar />
        <Header initialSchools={schools} initialProgrammes={programmes} />

        <main id="main-content" className="flex-1 overflow-x-hidden">
          {children}
        </main>

        <Footer />

        <Suspense fallback={null}>
          <DraftModeProvider />
        </Suspense>
      </body>
    </html>
  );
}
