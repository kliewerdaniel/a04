import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { BlogPost } from "@/types";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export function getPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md") && f !== "temp.md");

  const posts: BlogPost[] = files.map((file) => {
    const source = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
    const { data, content } = matter(source);

    const slug = file.replace(".md", "");

    return {
      slug,
      title: data.title || slug,
      date: data.date || new Date().toISOString().split("T")[0],
      author: data.author || "Daniel Kliewer",
      description: data.description || "",
      tags: data.tags || [],
      category: data.category || "Uncategorized",
      image: data.image || undefined,
      canonical_url: data.canonical_url || undefined,
      draft: data.draft || false,
      featured: data.featured || false,
      reading_time: data.reading_time || estimateReadingTime(content),
      content,
      og: data.og || undefined,
      twitter: data.twitter || undefined,
    };
  });

  return posts
    .filter((p) => !p.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPost(slug: string): BlogPost | null {
  const posts = getPosts();
  return posts.find((p) => p.slug === slug) || null;
}

export function getCategories(posts: BlogPost[]): string[] {
  const cats = new Set(posts.map((p) => p.category));
  return ["All", ...Array.from(cats).sort()];
}

export function getRelatedPosts(
  post: BlogPost,
  allPosts: BlogPost[],
  limit = 3
): BlogPost[] {
  return allPosts
    .filter((p) => p.slug !== post.slug)
    .map((p) => ({
      ...p,
      _score: p.tags.filter((t) => post.tags.includes(t)).length,
    }))
    .filter((p) => p._score > 0)
    .sort((a, b) => b._score - a._score)
    .slice(0, limit);
}

function estimateReadingTime(content: string): number {
  const words = content.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function getHeadings(
  content: string
): Array<{ id: string; text: string; level: number }> {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: Array<{ id: string; text: string; level: number }> = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    headings.push({ id, text, level });
  }

  return headings;
}

export function getAdjacentPosts(
  slug: string
): { prev: BlogPost | null; next: BlogPost | null } {
  const posts = getPosts();
  const index = posts.findIndex((p) => p.slug === slug);
  return {
    prev: index > 0 ? posts[index - 1] : null,
    next: index < posts.length - 1 ? posts[index + 1] : null,
  };
}
