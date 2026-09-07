import type { Metadata } from "next";
import { profile } from "@/lib/profile";

export const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL || profile.siteUrl,
);
export const isPreview = process.env.VERCEL_ENV === "preview";
export const absoluteUrl = (path = "/") => new URL(path, siteUrl).toString();

export function buildMetadata({
  title,
  description,
  path = "/",
  keywords = [],
}: {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
}): Metadata {
  const fullTitle = title.includes(profile.name)
    ? title
    : title + " | " + profile.name;
  return {
    title: { absolute: fullTitle },
    description,
    keywords: [
      ...new Set([
        "Java",
        "Spring Boot",
        "AWS",
        "Payments",
        "Fintech",
        "Distributed systems",
        "Senior Backend Engineer",
        "Tech Lead",
        "Canada",
        ...keywords,
      ]),
    ],
    alternates: { canonical: absoluteUrl(path) },
    robots: { index: !isPreview, follow: !isPreview },
    openGraph: {
      title: fullTitle,
      description,
      type: "website",
      url: absoluteUrl(path),
      siteName: profile.name,
      locale: "en_CA",
      images: [
        {
          url: absoluteUrl("/opengraph-image"),
          width: 1200,
          height: 630,
          alt: "Bruno Salgado. Tech Lead and Senior Backend Engineer. Java, Spring Boot and AWS.",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [absoluteUrl("/opengraph-image")],
    },
  };
}
