import { FadeIn } from "@/components/animations/fade-in";
import { BlogList } from "@/components/blog/blog-list";
import { getPosts, getCategories } from "@/lib/blog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Deep technical content on AI systems, local LLMs, RAG, AI agents, and production automation. 120+ articles from an AI systems engineer.",
};

export default function BlogPage() {
  const posts = getPosts();
  const categories = getCategories(posts);

  return (
    <div className="pt-28 pb-20 lg:pb-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <FadeIn>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
            Blog
          </h1>
          <p className="mt-4 sm:mt-5 text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Deep technical content on AI systems, local LLMs, and production automation. 120+ articles and counting.
          </p>
        </FadeIn>

        <BlogList posts={posts} categories={categories} />
      </div>
    </div>
  );
}
