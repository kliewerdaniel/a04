import { getPosts } from "./blog";
import Fuse from "fuse.js";

const fuse = new Fuse(getPosts(), {
  keys: [
    { name: "title", weight: 2 },
    { name: "description", weight: 1.5 },
    { name: "tags", weight: 1.5 },
    { name: "content", weight: 1 },
  ],
  threshold: 0.4,
  includeScore: true,
});

export function searchBlogPosts(query: string, limit = 5) {
  const results = fuse.search(query);
  return results.slice(0, limit).map((r) => ({
    slug: r.item.slug,
    title: r.item.title,
    score: r.score ?? 1,
    excerpt: extractExcerpt(r.item.content, query),
  }));
}

function extractExcerpt(content: string, query: string, maxLen = 600): string {
  const lower = content.toLowerCase();
  const qLower = query.toLowerCase();
  const idx = lower.indexOf(qLower);

  if (idx === -1) return content.slice(0, maxLen).replace(/\n+/g, " ") + "...";

  const start = Math.max(0, idx - 150);
  const end = Math.min(content.length, idx + qLower.length + 300);
  let excerpt = content.slice(start, end).replace(/\n+/g, " ");

  if (start > 0) excerpt = "..." + excerpt;
  if (end < content.length) excerpt = excerpt + "...";
  return excerpt;
}
