export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  description: string;
  tags: string[];
  category: string;
  image?: string;
  canonical_url?: string;
  draft?: boolean;
  featured?: boolean;
  reading_time?: number;
  content: string;
  og?: {
    title?: string;
    description?: string;
    image?: string;
    type?: string;
  };
  twitter?: {
    title?: string;
    description?: string;
    image?: string;
  };
}

export interface CaseStudy {
  title: string;
  client: string;
  slug: string;
  timeline: string;
  role: string;
  technologies: string[];
  metrics: Array<{ value: string; label: string }>;
  description: string;
  featured: boolean;
  content: string;
}

export interface Resource {
  title: string;
  slug: string;
  type: string;
  price: string;
  description: string;
  cover?: string;
  tags: string[];
  file?: string;
}

export interface Service {
  title: string;
  description: string;
  icon: string;
  price: string;
  timeline: string;
  href: string;
  features: string[];
}

export interface Metric {
  value: string;
  label: string;
  prefix?: string;
  suffix?: string;
}
