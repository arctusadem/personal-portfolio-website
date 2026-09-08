import type { MetadataRoute } from "next";
import { articles, projects } from "@/lib/content";
import { siteContent } from "@/lib/profile";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "/",
    "/about",
    "/experience",
    "/projects",
    "/skills",
    "/writing",
    "/contact",
    "/resume",
    "/privacy",
    ...projects.map((project) => "/projects/" + project.slug),
    ...articles.map((article) => "/writing/" + article.slug),
  ];
  return routes.map((path) => ({
    url: absoluteUrl(path),
    lastModified: siteContent.updatedAt,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
