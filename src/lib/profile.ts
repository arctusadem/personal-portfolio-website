import data from "@/content/site.json";
import type { SiteContent } from "@/types/content";

// Keep client imports independent of the case-study collection.
export const siteContent: SiteContent = data;
export const profile = siteContent.profile;
