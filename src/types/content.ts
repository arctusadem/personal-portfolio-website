export type SocialLink = {
  label: string;
  href: string;
};

export type NavItem = {
  label: string;
  href: string;
};

export type Metric = {
  label: string;
  value: string;
};

export type Highlight = {
  title: string;
  body: string;
};

export type ExperienceItem = {
  period: string;
  title: string;
  subtitle: string;
  summary: string;
  outcomes: string[];
};

export type SkillCategory = {
  name: string;
  description: string;
  items: string[];
};

export type PhilosophyPoint = {
  title: string;
  body: string;
};

export type SiteContent = {
  profile: {
    name: string;
    role: string;
    location: string;
    email: string;
    siteUrl: string;
    linkedinUrl: string;
    githubUrl: string;
  };
  navigation: NavItem[];
  hero: {
    eyebrow: string;
    headline: string;
    subheadline: string;
    supportingText: string;
    availability: string;
  };
  recruiterSignals: Highlight[];
  metrics: Metric[];
  about: {
    intro: string[];
    philosophy: PhilosophyPoint[];
    strengths: Highlight[];
    leadership: string[];
  };
  experience: {
    intro: string[];
    roles: ExperienceItem[];
  };
  skills: SkillCategory[];
  contact: {
    heading: string;
    summary: string;
    responseNote: string;
    locations: string[];
  };
};

export type ArchitectureLayer = {
  name: string;
  details: string;
};

export type ProjectFeature = {
  title: string;
  body: string;
};

export type Decision = {
  title: string;
  body: string;
};

export type ProjectScreen = {
  title: string;
  caption: string;
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  strapline: string;
  excerpt: string;
  audience: string;
  year: string;
  status: string;
  role: string;
  stack: string[];
  heroMetrics: Metric[];
  context: string;
  problem: string[];
  approach: string[];
  features: ProjectFeature[];
  proofArtifacts: ProjectFeature[];
  interfaces: ProjectFeature[];
  operationalConcerns: ProjectFeature[];
  architecture: {
    summary: string;
    layers: ArchitectureLayer[];
    decisions: Decision[];
  };
  screens: ProjectScreen[];
  tradeoffs: string[];
  outcomes: string[];
  next: string[];
  repoStructure: string[];
};

export type ArticleSection = {
  heading: string;
  paragraphs: string[];
};

export type Article = {
  slug: string;
  title: string;
  category: string;
  publishedAt: string;
  readTime: string;
  summary: string;
  keyPoints: string[];
  sections: ArticleSection[];
  takeaways: string[];
};

export type SocialPost = {
  slug: string;
  title: string;
  embedUrl: string;
  height: number;
  sourceUrl: string;
};

