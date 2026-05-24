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

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {experiments.map((exp) => {
              const Icon = exp.icon;
              return (
                <StaggerItem key={exp.title}>
                  <Card className="p-6 h-full flex flex-col group hover:translate-y-[-4px] transition-all duration-200 hover:shadow-md">
                    <div className="p-3 rounded-lg bg-accent/10 text-accent w-fit mb-4 group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-200">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="outline" className="text-xs">
                        {exp.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {exp.tech}
                      </span>
                    </div>
                    <h3 className="font-semibold text-lg">{exp.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground flex-1">
                      {exp.description}
                    </p>
                    {exp.status === "Coming Soon" ? (
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-4 w-full"
                        disabled
                      >
                        Coming Soon
                      </Button>
                    ) : (
                      <Link href={exp.href} className="mt-4 block">
                        <Button size="sm" className="w-full gap-2">
                          Launch <ArrowRight className="h-3 w-3" />
                        </Button>
                      </Link>
                    )}
                  </Card>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          <FadeIn className="mt-16 text-center">
            <p className="text-muted-foreground italic">
              The lab is a living space. Some experiments work perfectly. Some
              are works in progress. All are real.
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
