import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { CaseStudy } from "@/types";

const DIR = path.join(process.cwd(), "content", "case-studies");

export function getCaseStudies(): CaseStudy[] {
  if (!fs.existsSync(DIR)) return [];

  const files = fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".md"));

  return files
    .map((file) => {
      const source = fs.readFileSync(path.join(DIR, file), "utf8");
      const { data, content } = matter(source);
      return {
        title: data.title,
        client: data.client,
        slug: data.slug || file.replace(".md", ""),
        timeline: data.timeline || "",
        role: data.role || "",
        technologies: data.technologies || [],
        metrics: data.metrics || [],
        description: data.description || "",
        featured: data.featured || false,
        content,
      } satisfies CaseStudy;
    })
    .sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });
}

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return getCaseStudies().find((cs) => cs.slug === slug);
}
