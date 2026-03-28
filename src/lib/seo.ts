import type { Metadata } from "next";

import { siteContent } from "@/lib/content";

export const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL || siteContent.profile.siteUrl,
);

const sharedKeywords = [
  "Java",
  "Spring Boot",
  "AWS",
  "Payments",
  "Fintech",
  "Distributed Systems",
  "Senior Backend Engineer",
  "Tech Lead",
  siteContent.profile.name,
];

export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}

type MetadataInput = {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
};

export function buildMetadata({
  title,
  description,
  path = "/",
  keywords = [],
}: MetadataInput): Metadata {
  const fullTitle = `${title} | ${siteContent.profile.name}`;
  const url = absoluteUrl(path);
  const mergedKeywords = Array.from(new Set([...sharedKeywords, ...keywords]));

  return {
    title: fullTitle,
    description,
    keywords: mergedKeywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      type: "website",
      url,
      siteName: siteContent.profile.name,
      locale: "en_CA",
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
      title: fullTitle,
      description,
      images: [absoluteUrl("/opengraph-image")],
    },
  };
}

