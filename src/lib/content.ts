import articlesData from "@/content/articles.json";
import projectsData from "@/content/projects.json";
import socialPostsData from "@/content/social-posts.json";
import type { Article, Project, SocialPost } from "@/types/content";

export { siteContent } from "@/lib/profile";
export const projects = projectsData as Project[];
export const articles = articlesData as Article[];
export const socialPosts = socialPostsData as SocialPost[];

export const featuredProjects = projects;
export const featuredArticles = articles.slice(0, 3);
export const featuredSocialPosts = socialPosts.slice(0, 3);

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getArticleBySlug(slug: string) {
  return articles.find((article) => article.slug === slug);
}
