import type { MetadataRoute } from "next";

import { articles, projects } from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = [
    "/",
    "/about",
    "/experience",
    "/projects",
    "/skills",
    "/writing",
    "/contact",
    "/resume",
  ] as const;

  return [
    ...routes.map((route): MetadataRoute.Sitemap[number] => ({
      url: absoluteUrl(route),
      lastModified: now,
      changeFrequency: route === "/" ? "weekly" : "monthly",
      priority: route === "/" ? 1 : 0.7,
    })),
    ...projects.map((project): MetadataRoute.Sitemap[number] => ({
      url: absoluteUrl(`/projects/${project.slug}`),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    })),
    ...articles.map((article): MetadataRoute.Sitemap[number] => ({
      url: absoluteUrl(`/writing/${article.slug}`),
      lastModified: new Date(article.publishedAt),
      changeFrequency: "monthly",
      priority: 0.7,
    })),
  ];
}
