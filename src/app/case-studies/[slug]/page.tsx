import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { CTASection } from "@/components/sections/cta-section";
import { getCaseStudy, getCaseStudies } from "@/lib/case-studies";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getCaseStudies().map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return { title: "Case Study Not Found" };
  return { title: cs.title, description: cs.description };
}

function renderMarkdown(md: string): React.ReactNode[] {
  const elements: React.ReactNode[] = [];
  const lines = md.split("\n");
  let inCodeBlock = false;
  let codeContent = "";
  let idx = 0;

  lines.forEach((line) => {
    if (line.startsWith("```")) {
      if (inCodeBlock) {
        elements.push(
          <pre key={idx++} className="overflow-x-auto rounded-xl bg-code-bg border border-border-subtle p-4 my-6 text-sm leading-relaxed">
            <code className="font-mono text-xs">{codeContent}</code>
          </pre>
        );
        codeContent = "";
      }
      inCodeBlock = !inCodeBlock;
      return;
    }

    if (inCodeBlock) {
      codeContent += (codeContent ? "\n" : "") + line;
      return;
    }

    if (line.startsWith("### ")) {
      const text = line.replace("### ", "");
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      elements.push(
        <h3 key={idx++} id={id} className="text-xl font-semibold tracking-tight mt-8 mb-4 scroll-mt-24">{text}</h3>
      );
      return;
    }

    if (line.startsWith("## ")) {
      const text = line.replace("## ", "");
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      elements.push(
        <h2 key={idx++} id={id} className="text-2xl font-bold tracking-tight mt-10 mb-4 scroll-mt-24">{text}</h2>
      );
      return;
    }

    if (line.startsWith("---")) {
      elements.push(<hr key={idx++} className="my-8 border-border-subtle" />);
      return;
    }

    if (line.startsWith("- ")) {
      const text = line.replace("- ", "");
      elements.push(
        <li key={idx++} className="text-base leading-relaxed ml-6 list-disc pl-2">{text}</li>
      );
      return;
    }

    const processed = line
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/`([^`]+)`/g, "<code class='px-1.5 py-0.5 rounded-md bg-code-bg text-sm font-mono text-primary'>$1</code>");

    if (!line.trim()) {
      elements.push(<div key={idx++} className="h-3" />);
      return;
    }

    elements.push(
      <p key={idx++} className="text-base leading-relaxed mb-4 text-pretty" dangerouslySetInnerHTML={{ __html: processed }} />
    );
  });

  return elements;
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();

  return (
    <article className="pt-28 pb-20">
      <div className="mx-auto max-w-4xl px-5 sm:px-8 lg:px-10">
        <Link
          href="/case-studies"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 group"
        >
          <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-0.5 transition-transform" aria-hidden="true" /> Back to case studies
        </Link>

        <header className="mb-12">
          <div className="flex flex-wrap gap-2 mb-4">
            {cs.technologies.map((t) => (
              <Badge key={t} variant="secondary">{t}</Badge>
            ))}
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">{cs.title}</h1>
          <p className="mt-2 text-lg text-muted-foreground">{cs.client}</p>
          {(cs.timeline || cs.role) && (
            <div className="flex flex-wrap gap-4 mt-3 text-sm text-muted-foreground">
              {cs.timeline && <span>Timeline: {cs.timeline}</span>}
              {cs.role && <span>Role: {cs.role}</span>}
            </div>
          )}
          <p className="mt-6 text-lg leading-relaxed text-pretty">{cs.description}</p>
        </header>

        <div className="grid grid-cols-3 gap-8 p-8 rounded-2xl border border-border bg-card mb-12">
          {cs.metrics.map((m) => (
            <div key={m.label} className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-primary tabular-nums">{m.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{m.label}</div>
            </div>
          ))}
        </div>

        <section className="prose prose-neutral dark:prose-invert max-w-none">
          {renderMarkdown(cs.content)}
        </section>
      </div>

      <CTASection
        headline="Have a similar challenge?"
        body="Let&apos;s discuss how I can help your team."
        primaryCTA={{ text: "Book a Free Consultation", href: "/contact" }}
        variant="default"
        className="mt-20"
      />
    </article>
  );
}
