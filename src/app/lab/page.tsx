import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Brain, MessageSquare, Box } from "lucide-react";
import { HeroSection } from "@/components/sections/hero-section";
import { CTASection } from "@/components/sections/cta-section";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/fade-in";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Lab — Experimental AI Systems",
  description:
    "Interactive AI demos and experimental systems. Explore knowledge graphs, chat with RAG-powered AI, and view system architectures.",
};

const experiments = [
  {
    title: "Knowledge Graph Explorer",
    description:
      "Interactive 3D visualization of blog content relationships. Explore how AI topics connect through an interactive graph.",
    icon: Brain,
    href: "/lab/knowledge-graph",
    status: "Experimental",
    tech: "Three.js, react-force-graph",
  },
  {
    title: "AI Chat Sandbox",
    description:
      "Chat with the blog content via local LLM. Ask questions about AI systems and get answers grounded in the actual posts.",
    icon: MessageSquare,
    href: "/lab/chat",
    status: "Experimental",
    tech: "RAG, Ollama, Vercel AI SDK",
  },
  {
    title: "Architecture Explorer",
    description:
      "Interactive system architecture diagrams. Explore how different AI systems connect and communicate.",
    icon: Box,
    href: "/lab/architecture",
    status: "Coming Soon",
    tech: "ReactFlow",
  },
];

export default function LabPage() {
  return (
    <>
      <HeroSection
        headline="Lab"
        subtitle="Experimental AI systems. Working prototypes. Proof of concept."
        variant="centered"
        background="grid"
      />

      <section className="py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {experiments.map((exp) => {
              const Icon = exp.icon;
              return (
                <StaggerItem key={exp.title}>
                  <Card className="p-6 sm:p-7 h-full flex flex-col group hover:shadow-elevated hover:-translate-y-0.5 transition-all duration-300">
                    <div className="p-3 rounded-2xl bg-accent-muted text-accent w-fit mb-5 group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-300">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="outline" className="text-xs">{exp.status}</Badge>
                      <span className="text-xs text-muted-foreground">{exp.tech}</span>
                    </div>
                    <h3 className="font-semibold text-lg">{exp.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed flex-1">{exp.description}</p>
                    {exp.status === "Coming Soon" ? (
                      <Button variant="outline" size="sm" className="mt-5 w-full" disabled>
                        Coming Soon
                      </Button>
                    ) : (
                      <Link href={exp.href} className="mt-5 block">
                        <Button size="sm" className="w-full gap-2">
                          Launch <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </Button>
                      </Link>
                    )}
                  </Card>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          <FadeIn className="mt-16 text-center">
            <div className="w-12 h-0.5 bg-accent/40 mx-auto mb-6" aria-hidden="true" />
            <p className="text-muted-foreground italic max-w-2xl mx-auto leading-relaxed">
              The lab is a living space. Some experiments work perfectly. Some are works in progress. All are real.
            </p>
          </FadeIn>
        </div>
      </section>

      <CTASection
        headline="Want a custom experiment for your team?"
        primaryCTA={{ text: "Book a Free Consultation", href: "/contact" }}
        variant="default"
      />
    </>
  );
}
