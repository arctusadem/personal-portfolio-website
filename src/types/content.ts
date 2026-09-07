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
  company: string;
  summary: string;
  outcomes: string[];
  location: string;
  stack: string[];
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
  updatedAt: string;
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

export type StudyNode = { name: string; details: string };
export type Project = {
  slug: string;
  directory: "payment-orchestration" | "money-movement" | "decision-hub";
  title: string;
  category: string;
  strapline: string;
  excerpt: string;
  stack: string[];
  principle: string;
  question: string;
  problem: string;
  approach: string;
  flow: StudyNode[];
  durableBoundary: string;
  asyncBoundary: string;
  decisions: Array<{ title: string; choice: string; cost: string }>;
  operations: Array<{ title: string; body: string }>;
  demo: { title: string; description: string; limitation: string };
  endpoint: string;
  request: string;
  response: string;
  outcome: string;
  next: string[];
  sources: SocialLink[];
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
