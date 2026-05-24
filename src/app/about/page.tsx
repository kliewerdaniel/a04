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

const philosophy = [
  {
    title: "AI infrastructure should be owned, not rented.",
    body: "Cloud AI creates dependency. Local-first creates sovereignty. Your data, your models, your control.",
  },
  {
    title: "Local-first is both a privacy stance and an architectural advantage.",
    body: "Lower latency, lower cost, full control over your data and infrastructure.",
  },
  {
    title: "The best AI systems are built, not configured.",
    body: "No-code tools have limits. Custom architecture has none. Every system is tailored to the problem.",
  },
  {
    title: "Technical depth is a business advantage.",
    body: "Deep understanding leads to better decisions, faster iteration, and fewer surprises in production.",
  },
];

const workStyle = [
  { title: "Discovery-First", body: "Understand before building. Every project starts with deep understanding of the problem space." },
  { title: "Iterative", body: "Ship quickly, refine continuously. First working prototype in under a week." },
  { title: "Transparent", body: "Fixed pricing, clear deliverables, weekly demos. No surprises, no scope creep." },
  { title: "Knowledge Transfer", body: "I teach as I build. Your team should understand and own the system I deliver." },
];

const expertise = [
  "Local LLMs", "RAG Systems", "AI Agents", "Knowledge Graphs",
  "Automation Pipelines", "MCP Protocol", "Next.js", "TypeScript", "Python",
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

      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-3xl px-5 sm:px-8 lg:px-10">
          <FadeIn>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-8">The Short Version</h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              I build local-first AI infrastructure for organizations that need control, privacy, and real integration. I started as a curious engineer experimenting with local LLMs and turned it into a consultancy that ships production systems.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-muted/30">
        <div className="mx-auto max-w-5xl px-5 sm:px-8 lg:px-10">
          <FadeIn>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-12 text-center">The Philosophy</h2>
          </FadeIn>
          <div className="grid gap-6 sm:grid-cols-2">
            {philosophy.map((item, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <Card className="p-6 sm:p-7 h-full">
                  <h3 className="font-semibold text-base">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{item.body}</p>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-5xl px-5 sm:px-8 lg:px-10">
          <FadeIn>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-12 text-center">How I Work</h2>
          </FadeIn>
          <div className="grid gap-6 sm:grid-cols-2">
            {workStyle.map((item, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <Card className="p-6 sm:p-7 h-full">
                  <h3 className="font-semibold text-base">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{item.body}</p>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-muted/30">
        <div className="mx-auto max-w-3xl px-5 sm:px-8 lg:px-10 text-center">
          <FadeIn>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-8">Expertise</h2>
            <div className="flex flex-wrap gap-2 justify-center">
              {expertise.map((item) => (
                <Badge key={item} variant="secondary" className="text-sm py-1.5 px-3.5">
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
        body="Let&apos;s talk about your project and how I can help."
        primaryCTA={{ text: "Book a Free Consultation", href: "/contact" }}
        secondaryCTA={{ text: "Read the Blog", href: "/blog" }}
        variant="default"
      />
    </>
  );
}
