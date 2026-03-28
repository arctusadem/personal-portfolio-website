import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import "./globals.css";

import { EasterEggProvider } from "@/components/layout/easter-egg-provider";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { siteContent } from "@/lib/content";
import { absoluteUrl, siteUrl } from "@/lib/seo";

const themeScript = `(function(){try{var stored=window.localStorage.getItem('theme');var prefersDark=window.matchMedia('(prefers-color-scheme: dark)').matches;var theme=(stored==='light'||stored==='dark')?stored:(prefersDark?'dark':'light');document.documentElement.dataset.theme=theme;document.documentElement.style.colorScheme=theme;}catch(e){document.documentElement.dataset.theme='light';document.documentElement.style.colorScheme='light';}})();`;

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: `${siteContent.profile.name} | ${siteContent.profile.role}`,
  description: siteContent.hero.supportingText,
  applicationName: `${siteContent.profile.name} Portfolio`,
  authors: [{ name: siteContent.profile.name }],
  creator: siteContent.profile.name,
  publisher: siteContent.profile.name,
  category: "technology",
  alternates: {
    canonical: absoluteUrl("/"),
  },
  keywords: [
    "Senior Backend Engineer",
    "Tech Lead",
    "Java",
    "Spring Boot",
    "AWS",
    "Payments",
    "Fintech",
    "Distributed Systems",
    "Canada",
  ],
  openGraph: {
    title: `${siteContent.profile.name} | ${siteContent.profile.role}`,
    description: siteContent.hero.supportingText,
    type: "website",
    url: absoluteUrl("/"),
    locale: "en_CA",
    siteName: siteContent.profile.name,
    images: [
      {
        url: absoluteUrl("/opengraph-image"),
        width: 1200,
        height: 630,
        alt: `${siteContent.profile.name} portfolio preview`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteContent.profile.name} | ${siteContent.profile.role}`,
    description: siteContent.hero.supportingText,
    images: [absoluteUrl("/opengraph-image")],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f1ea" },
    { media: "(prefers-color-scheme: dark)", color: "#07111a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en-CA" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <EasterEggProvider>
          <a className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-[var(--foreground)] focus:px-4 focus:py-2 focus:text-[var(--background)]" href="#content">
            Skip to content
          </a>
          <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
            <div className="absolute left-[-12rem] top-[-14rem] h-[30rem] w-[30rem] rounded-full bg-[color-mix(in_oklab,var(--accent-soft)_66%,transparent)] blur-3xl" />
            <div className="absolute right-[-10rem] top-28 h-[24rem] w-[24rem] rounded-full bg-[color-mix(in_oklab,#d7b983_40%,transparent)] blur-3xl" />
            <div className="absolute bottom-[-12rem] left-1/2 h-[22rem] w-[22rem] -translate-x-1/2 rounded-full bg-[color-mix(in_oklab,var(--accent)_10%,transparent)] blur-3xl" />
          </div>
          <div className="min-h-screen">
            <SiteHeader />
            <main id="content">{children}</main>
            <SiteFooter />
          </div>
        </EasterEggProvider>
      </body>
    </html>
  );
}
