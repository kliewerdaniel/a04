import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/hero-section";
import { CTASection } from "@/components/sections/cta-section";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/fade-in";
import { Button } from "@/components/ui/button";
import { ResourceCard } from "@/components/sections/resource-card";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Free guides, templates, and tools for building local AI infrastructure. Download the AI Audit Checklist, RAG Starter Kit, and more.",
};

const resources = [
  {
    title: "AI Infrastructure Audit Checklist",
    type: "Guide",
    price: "Free",
    description:
      "A 10-point checklist to assess your organization's AI readiness and identify automation opportunities.",
    badge: "Free",
    badgeVariant: "success" as const,
    slug: "ai-audit-checklist",
  },
  {
    title: "Local LLM Deployment Guide",
    type: "eBook",
    price: "$19",
    description:
      "Step-by-step guide to deploying open-source LLMs on your own infrastructure with Ollama and Docker.",
    badge: "$19",
    badgeVariant: "default" as const,
    slug: "local-llm-deployment-guide",
  },
  {
    title: "Prompt Engineering Toolkit",
    type: "Templates",
    price: "$29",
    description:
      "A structured library of prompt templates for common AI tasks — content generation, analysis, extraction, and more.",
    badge: "$29",
    badgeVariant: "default" as const,
    slug: "prompt-engineering-toolkit",
  },
  {
    title: "AI Workflow Templates",
    type: "Templates",
    price: "$39",
    description:
      "Ready-to-deploy n8n and Make automation workflows for content, data, and customer operations.",
    badge: "$39",
    badgeVariant: "default" as const,
    slug: "ai-workflow-templates",
  },
  {
    title: "RAG Starter Kit",
    type: "Code",
    price: "$97",
    description:
      "Production-ready RAG pipeline with Ollama, Chroma, and LangChain. Full documentation and deployment guide included.",
    badge: "$97",
    badgeVariant: "accent" as const,
    slug: "rag-starter-kit",
  },
  {
    title: "Agent Architecture Blueprint",
    type: "Blueprint",
    price: "$147",
    description:
      "Complete multi-agent system templates with architecture diagrams, code, and deployment strategies.",
    badge: "$147",
    badgeVariant: "accent" as const,
    slug: "agent-architecture-blueprint",
  },
];

export default function ResourcesPage() {
  return (
    <>
      <HeroSection
        headline="Resources"
        subtitle="Free guides, templates, and tools for building local AI infrastructure."
        variant="centered"
        background="gradient"
      />

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {resources.map((r) => (
              <StaggerItem key={r.title}>
                <ResourceCard {...r} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-16 border-y border-border">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="text-2xl font-semibold">
              Get new resources delivered to your inbox.
            </h2>
            <p className="mt-2 text-muted-foreground">
              No spam. Unsubscribe anytime.
            </p>
            <form className="mt-6 flex gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <Button type="submit">Subscribe</Button>
            </form>
          </FadeIn>
        </div>
      </section>

      <CTASection
        headline="Need a custom solution?"
        body="I build production AI systems tailored to your specific needs."
        primaryCTA={{ text: "Book a Free Consultation", href: "/contact" }}
        variant="default"
      />
    </>
  );
}
