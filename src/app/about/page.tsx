import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/hero-section";
import { MetricsBar } from "@/components/sections/metrics-bar";
import { CTASection } from "@/components/sections/cta-section";
import { FadeIn } from "@/components/animations/fade-in";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { METRICS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About",
  description:
    "Austin-based AI systems engineer building local-first AI infrastructure. 120+ technical articles on AI systems, local LLMs, and production automation.",
};

const expertise = [
  "Local LLMs",
  "RAG Systems",
  "AI Agents",
  "Knowledge Graphs",
  "Automation Pipelines",
  "MCP Protocol",
  "Next.js",
  "TypeScript",
  "Python",
];

export default function AboutPage() {
  return (
    <>
      <HeroSection
        headline="AI Systems Engineer. Local-First Advocate. Technical Writer."
        subtitle="Austin-based. I build private AI infrastructure for organizations that need control, privacy, and real integration."
        variant="default"
        background="grid"
      />

      <section className="py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-2xl font-semibold mb-6">The Short Version</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              I build local-first AI infrastructure for organizations that need
              control, privacy, and real integration. I started as a curious
              engineer experimenting with local LLMs and turned it into a
              consultancy that ships production systems.
            </p>

            <h2 className="text-2xl font-semibold mb-6">The Philosophy</h2>
            <div className="space-y-4">
              <div className="p-4 rounded-lg border border-border">
                <p className="font-medium">AI infrastructure should be owned, not rented.</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Cloud AI creates dependency. Local-first creates sovereignty.
                </p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-medium">
                  Local-first is both a privacy stance and an architectural
                  advantage.
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Lower latency, lower cost, full control.
                </p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-medium">
                  The best AI systems are built, not configured.
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  No-code tools have limits. Custom architecture has none.
                </p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-medium">
                  Technical depth is a business advantage.
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Deep understanding leads to better decisions, faster iteration,
                  and fewer surprises.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-semibold mt-12 mb-6">How I Work</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Card className="p-5">
                <h3 className="font-semibold">Discovery-First</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Understand before building. Every project starts with a deep
                  understanding of the problem.
                </p>
              </Card>
              <Card className="p-5">
                <h3 className="font-semibold">Iterative</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Ship quickly, refine continuously. First working prototype in
                  under a week.
                </p>
              </Card>
              <Card className="p-5">
                <h3 className="font-semibold">Transparent</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Fixed pricing, clear deliverables, weekly demos. No surprises.
                </p>
              </Card>
              <Card className="p-5">
                <h3 className="font-semibold">Knowledge Transfer</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  I teach as I build. Your team should understand the system I
                  deliver.
                </p>
              </Card>
            </div>

            <h2 className="text-2xl font-semibold mt-12 mb-6">Expertise</h2>
            <div className="flex flex-wrap gap-2">
              {expertise.map((item) => (
                <Badge key={item} variant="secondary" className="text-sm py-1.5">
                  {item}
                </Badge>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <MetricsBar metrics={METRICS} />

      <CTASection
        headline="Want to work together?"
        body="Let's talk about your project and how we can build something great."
        primaryCTA={{ text: "Book a Free Consultation", href: "/contact" }}
        secondaryCTA={{ text: "Read the Blog", href: "/blog" }}
        variant="default"
      />
    </>
  );
}
