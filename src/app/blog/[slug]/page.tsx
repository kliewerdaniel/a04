import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getPost, getPosts, getRelatedPosts, getHeadings, getAdjacentPosts } from "@/lib/blog";
import { SITE_URL } from "@/lib/constants";
import { formatDate } from "@/lib/utils";

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

  function renderMarkdown(content: string) {
    const lines = content.split("\n");
    const elements: React.ReactNode[] = [];
    let inCodeBlock = false;
    let codeContent = "";

    lines.forEach((line, i) => {
      if (line.startsWith("```")) {
        if (inCodeBlock) {
          elements.push(
            <pre key={i} className="overflow-x-auto rounded-xl bg-code-bg border border-border-subtle p-4 my-6 text-sm leading-relaxed">
              <code className="font-mono text-xs">{codeContent}</code>
            </pre>
          );
          codeContent = "";
          inCodeBlock = false;
        } else {
          inCodeBlock = true;
        }
        return;
      }

      if (inCodeBlock) {
        codeContent += (codeContent ? "\n" : "") + line;
        return;
      }

      if (line.startsWith("## ")) {
        const text = line.replace("## ", "");
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
        elements.push(
          <h2 key={i} id={id} className="text-2xl sm:text-3xl font-bold tracking-tight mt-12 mb-4 scroll-mt-24">
            {text}
          </h2>
        );
        return;
      }

      if (line.startsWith("### ")) {
        const text = line.replace("### ", "");
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
        elements.push(
          <h3 key={i} id={id} className="text-xl font-semibold tracking-tight mt-8 mb-3 scroll-mt-24">
            {text}
          </h3>
        );
        return;
      }

      if (line.startsWith("---")) {
        elements.push(<hr key={i} className="my-10 border-border-subtle" />);
        return;
      }

      if (line.startsWith("- ")) {
        const text = line.replace("- ", "");
        elements.push(
          <li key={i} className="text-base leading-relaxed text-foreground/90 ml-6 list-disc pl-2">
            {text}
          </li>
        );
        return;
      }

      if (line.match(/^\d+\.\s/)) {
        const text = line.replace(/^\d+\.\s/, "");
        elements.push(
          <li key={i} className="text-base leading-relaxed text-foreground/90 ml-6 list-decimal pl-2">
            {text}
          </li>
        );
        return;
      }

      const processed = line
        .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
        .replace(/`([^`]+)`/g, "<code class='px-1.5 py-0.5 rounded-md bg-code-bg text-sm font-mono text-primary'>$1</code>");

      if (!line.trim()) {
        elements.push(<div key={i} className="h-4" />);
        return;
      }

      elements.push(
        <p key={i} className="text-base leading-relaxed text-foreground/90" dangerouslySetInnerHTML={{ __html: processed }} />
      );
    });

    return elements;
  }

  return (
    <article className="pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 group"
        >
          <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-0.5 transition-transform" aria-hidden="true" /> Back to blog
        </Link>

        <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-14">
          <div>
            <header className="mb-10">
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <Badge variant="primary">{post.category}</Badge>
                <span className="text-sm text-muted-foreground">{formatDate(post.date)}</span>
                <span className="text-sm text-muted-foreground">· {post.reading_time} min read</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-balance">
                {post.title}
              </h1>
              {post.description && (
                <p className="mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
                  {post.description}
                </p>
              )}
            </header>

            <div className="max-w-3xl">
              {renderMarkdown(post.content)}
            </div>

            {post.tags && post.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-border-subtle max-w-3xl">
                <h4 className="text-sm font-semibold mb-3">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="outline">{tag}</Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-10 flex items-center justify-between border-t border-border-subtle pt-8 max-w-3xl">
              <div>
                {prev && (
                  <Link
                    href={`/blog/${prev.slug}`}
                    className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
                    <span className="max-w-[200px] truncate">{prev.title}</span>
                  </Link>
                )}
              </div>
              <div>
                {next && (
                  <Link
                    href={`/blog/${next.slug}`}
                    className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <span className="max-w-[200px] truncate">{next.title}</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </Link>
                )}
              </div>
            </div>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-8">
              {headings.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">
                    On this page
                  </h4>
                  <nav className="space-y-2" aria-label="Table of contents">
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
                  <h4 className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">
                    Related
                  </h4>
                  <div className="space-y-3">
                    {related.map((rp) => (
                      <Link
                        key={rp.slug}
                        href={`/blog/${rp.slug}`}
                        className="block p-4 rounded-xl border border-border-subtle hover:bg-muted transition-colors"
                      >
                        <p className="text-sm font-medium leading-snug line-clamp-2">{rp.title}</p>
                        <p className="text-xs text-muted-foreground mt-2">{rp.reading_time} min read</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <Card className="p-5">
                <h4 className="text-sm font-semibold mb-2">Need help implementing this?</h4>
                <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                  I build production AI systems for organizations. Let&apos;s talk about your project.
                </p>
                <Link href="/contact">
                  <Button size="sm" className="w-full gap-1.5">
                    Get in Touch <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Button>
                </Link>
              </Card>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
