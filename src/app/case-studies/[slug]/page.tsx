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

function renderMarkdown(md: string): string {
  return md
    .replace(/^### (.+)$/gm, '<h3 id="$1" class="text-xl font-semibold mt-8 mb-4">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 id="$1" class="text-2xl font-bold mt-10 mb-4">$1</h2>')
    .replace(/^---$/gm, '<hr class="my-8 border-border" />')
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/`([^`]+)`/g, "<code class=\"px-1.5 py-0.5 rounded bg-muted text-sm font-mono\">$1</code>")
    .split(/\n\n+/)
    .map((block) => {
      block = block.trim();
      if (!block) return "";
      if (block.startsWith("<h") || block.startsWith("<hr") || block.startsWith("<pre")) return block;
      if (block.startsWith("| ")) {
        const rows = block.split("\n");
        const headers = rows[0].split("|").filter(Boolean).map((h) => h.trim());
        const bodyRows = rows.slice(2).filter((r) => r.trim() && !r.includes("---"));
        let table = '<div class="overflow-x-auto my-6"><table class="w-full text-sm"><thead><tr>';
        headers.forEach((h) => { table += `<th class="text-left px-4 py-2 font-semibold border-b border-border">${h}</th>`; });
        table += "</tr></thead><tbody>";
        bodyRows.forEach((row) => {
          const cells = row.split("|").filter(Boolean).map((c) => c.trim());
          table += "<tr>";
          cells.forEach((c) => { table += `<td class="px-4 py-2 border-b border-border">${c}</td>`; });
          table += "</tr>";
        });
        return table + "</tbody></table></div>";
      }
      if (block.startsWith("- ")) {
        const items = block.split("\n").filter((l) => l.startsWith("- "));
        const lis = items.map((item) => `<li>${item.replace(/^- /, "")}</li>`).join("");
        return `<ul class="list-disc pl-6 space-y-1 my-4">${lis}</ul>`;
      }
      return `<p class="leading-relaxed mb-4 text-pretty">${block}</p>`;
    })
    .join("\n");
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();

  const html = renderMarkdown(cs.content);

  return (
    <article className="pt-24 pb-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/case-studies"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-3 w-3" /> Back to case studies
        </Link>

        <header className="mb-12">
          <div className="flex flex-wrap gap-2 mb-4">
            {cs.technologies.map((t) => (
              <Badge key={t} variant="secondary">
                {t}
              </Badge>
            ))}
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            {cs.title}
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">{cs.client}</p>
          <div className="flex flex-wrap gap-4 mt-3 text-sm text-muted-foreground">
            {cs.timeline && <span>Timeline: {cs.timeline}</span>}
            {cs.role && <span>Role: {cs.role}</span>}
          </div>
          <p className="mt-6 text-lg">{cs.description}</p>
        </header>

        <div className="grid grid-cols-3 gap-8 p-8 rounded-xl border border-border bg-card mb-12">
          {cs.metrics.map((m) => (
            <div key={m.label} className="text-center">
              <div className="text-3xl font-bold text-primary">{m.value}</div>
              <div className="text-sm text-muted-foreground mt-1">
                {m.label}
              </div>
            </div>
          ))}
        </div>

        <section
          className="prose prose-neutral dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>

      <CTASection
        headline="Have a similar challenge?"
        body="Let's discuss how we can build something for your team."
        primaryCTA={{ text: "Book a Free Consultation", href: "/contact" }}
        variant="default"
        className="mt-16"
      />
    </article>
  );
}
