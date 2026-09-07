import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { EasterEggProvider } from "@/components/layout/easter-egg-provider";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteAnalytics } from "@/components/layout/site-analytics";
import { profile } from "@/lib/profile";
import { buildMetadata, siteUrl } from "@/lib/seo";

const themeScript = `(function(){try{var stored=localStorage.getItem('theme');var theme=(stored==='light'||stored==='dark')?stored:(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.dataset.theme=theme;document.documentElement.style.colorScheme=theme;}catch(e){document.documentElement.dataset.theme='light';document.documentElement.style.colorScheme='light';}})();`;
export const metadata: Metadata = {
  ...buildMetadata({
    title: "Tech Lead & Senior Backend Engineer",
    description:
      "Bruno Salgado builds Java, Spring Boot and AWS backends for payments, fintech and distributed systems.",
  }),
  metadataBase: siteUrl,
  applicationName: "Bruno Salgado",
  authors: [{ name: profile.name, url: profile.siteUrl }],
  creator: profile.name,
  category: "technology",
};
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f6f2" },
    { media: "(prefers-color-scheme: dark)", color: "#0c171c" },
  ],
};
export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en-CA" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <EasterEggProvider>
          <a
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-[var(--foreground)] focus:px-5 focus:py-3 focus:text-[var(--background)]"
            href="#content"
          >
            Skip to content
          </a>
          <SiteHeader />
          <main id="content" tabIndex={-1} className="min-h-[60vh]">
            {children}
          </main>
          <SiteFooter />
        </EasterEggProvider>
        {process.env.VERCEL_ENV === "production" && <SiteAnalytics />}
      </body>
    </html>
  );
}
