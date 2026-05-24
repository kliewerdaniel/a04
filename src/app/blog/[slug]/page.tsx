import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getPost, getPosts, getRelatedPosts, getHeadings, getAdjacentPosts } from "@/lib/blog";
import { SITE_URL } from "@/lib/constants";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: post.title,
    description: post.description,
    authors: [{ name: post.author }],
    keywords: post.tags?.join(", "),
    openGraph: {
      title: post.og?.title || post.title,
      description: post.og?.description || post.description,
      type: "article",
      publishedTime: post.date,
      url: `${SITE_URL}/blog/${post.slug}`,
      images: post.og?.image
        ? [{ url: post.og.image, width: 1200, height: 630 }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.twitter?.title || post.title,
      description: post.twitter?.description || post.description,
    },
    alternates: {
      canonical: post.canonical_url || `${SITE_URL}/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const allPosts = getPosts();
  const related = getRelatedPosts(post, allPosts);
  const { prev, next } = getAdjacentPosts(slug);
  const headings = getHeadings(post.content);

  return (
    <article className="pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-3 w-3" /> Back to blog
        </Link>

        <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-12">
          <div>
            <header className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="secondary">{post.category}</Badge>
                <span className="text-sm text-muted-foreground">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span className="text-sm text-muted-foreground">
                  {post.reading_time} min read
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
                {post.title}
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                {post.description}
              </p>
            </header>

            <div className="prose prose-neutral dark:prose-invert max-w-none">
              {post.content.split("\n").map((line, i) => {
                if (line.startsWith("## ")) {
                  const text = line.replace("## ", "");
                  const id = text
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/(^-|-$)/g, "");
                  return (
                    <h2 key={i} id={id} className="scroll-mt-24">
                      {text}
                    </h2>
                  );
                }
                if (line.startsWith("### ")) {
                  const text = line.replace("### ", "");
                  const id = text
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/(^-|-$)/g, "");
                  return (
                    <h3 key={i} id={id} className="scroll-mt-24">
                      {text}
                    </h3>
                  );
                }
                if (line.startsWith("```")) return null;
                if (line.startsWith("---")) return null;
                if (!line.trim()) return <br key={i} />;
                return <p key={i}>{line}</p>;
              })}
            </div>

            {post.tags && post.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-border">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 flex items-center justify-between border-t border-border pt-8">
              <div>
                {prev && (
                  <Link
                    href={`/blog/${prev.slug}`}
                    className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="hidden sm:inline">{prev.title}</span>
                    <span className="sm:hidden">Previous</span>
                  </Link>
                )}
              </div>
              <div>
                {next && (
                  <Link
                    href={`/blog/${next.slug}`}
                    className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <span className="hidden sm:inline">{next.title}</span>
                    <span className="sm:hidden">Next</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                )}
              </div>
            </div>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-8">
              {headings.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold mb-3">
                    Table of Contents
                  </h4>
                  <nav className="space-y-2">
                    {headings.map((h) => (
                      <a
                        key={h.id}
                        href={`#${h.id}`}
                        className={`block text-sm text-muted-foreground hover:text-foreground transition-colors ${
                          h.level === 3 ? "pl-4" : ""
                        }`}
                      >
                        {h.text}
                      </a>
                    ))}
                  </nav>
                </div>
              )}

              {related.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold mb-3">Related Posts</h4>
                  <div className="space-y-3">
                    {related.map((rp) => (
                      <Link
                        key={rp.slug}
                        href={`/blog/${rp.slug}`}
                        className="block p-3 rounded-lg border border-border hover:bg-muted transition-colors"
                      >
                        <p className="text-sm font-medium line-clamp-2">
                          {rp.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {rp.reading_time} min read
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div className="p-4 rounded-lg border border-border bg-card">
                <h4 className="text-sm font-semibold mb-2">
                  Need help implementing this?
                </h4>
                <p className="text-xs text-muted-foreground mb-3">
                  I build production AI systems for organizations.
                </p>
                <Link href="/contact">
                  <Button size="sm" className="w-full text-xs gap-1">
                    Get in Touch <ArrowRight className="h-3 w-3" />
                  </Button>
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
