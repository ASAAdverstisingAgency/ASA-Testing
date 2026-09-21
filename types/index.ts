export type ProjectLayout =
  | "full"
  | "split"
  | "split-reverse"
  | "image-meta"
  | "type-image";

export type ProjectCategory =
  | "Billboard"
  | "Digital"
  | "OOH"
  | "Campaign"
  | "Brand";

export interface ProjectImage {
  src: string;
  alt: string;
}

export interface ProjectMetric {
  value: string;
  label: string;
}

export interface Project {
  slug: string;
  title: string;
  client: string;
  category: ProjectCategory;
  year: string;
  services: string[];
  excerpt: string;
  overview: string;
  challenge: string;
  solution: string;
  layout: ProjectLayout;
  cover: ProjectImage;
  gallery: readonly ProjectImage[];
  metrics: ProjectMetric[];
  nextSlug: string;
}

export interface Service {
  id: string;
  number: string;
  title: string;
  description: string;
  tag: string;
  theme: "dark" | "light" | "muted";
  image: {
    src: string;
    alt: string;
  };
  capabilities: string[];
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export interface Client {
  name: string;
  sector: string;
}

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readingTime: string;
  cover: ProjectImage;
  content: string[];
}

export interface NavItem {
  label: string;
  href: string;
}
