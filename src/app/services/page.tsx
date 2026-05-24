import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/hero-section";
import { ServicesGrid } from "@/components/sections/services-grid";
import { CTASection } from "@/components/sections/cta-section";
import { FadeIn } from "@/components/animations/fade-in";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "AI Consulting Services",
  description:
    "Custom AI infrastructure: knowledge systems, workflow automation, and local AI deployment. Fixed-price sprints. Production-ready delivery.",
};

const engagements = [
  {
    title: "AI Systems Audit",
    price: "$500",
    duration: "1 week",
    description:
      "Current state assessment, opportunity map, architecture recommendations, and implementation roadmap.",
    ideal: "Organizations unsure if AI applies to them",
  },
  {
    title: "Technical Sprint",
    price: "$5k–$10k",
    duration: "2 weeks",
    description:
      "Working prototype or production-ready feature with architecture documentation and deployment guide.",
    ideal: "Teams with a clear use case but no AI expertise",
  },
  {
    title: "Full System Build",
    price: "$10k–$25k",
    duration: "4–8 weeks",
    description:
      "Production-ready AI system, complete documentation, team training, and 30-day support.",
    ideal: "Organizations needing a complete AI system",
  },
  {
    title: "Fractional AI Engineer",
    price: "$5k/month",
    duration: "Ongoing",
    description:
      "~20 hours/week of architecture guidance, code reviews, and direct support.",
    ideal: "Teams needing ongoing AI expertise without a full-time hire",
  },
];

export default function ServicesPage() {
  return (
    <>
      <HeroSection
        headline="AI Infrastructure, Built to Order."
        subtitle="Custom systems for your specific needs. Fixed-price, scoped sprints. Working software delivered."
        variant="centered"
        background="gradient"
      />

      <section className="py-16 border-b border-border">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-2xl font-semibold text-center mb-8">
              How It Works
            </h2>
            <div className="grid gap-6 sm:grid-cols-3">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center text-lg font-bold mx-auto">
                  1
                </div>
                <h3 className="font-semibold mt-4">Discovery</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Understand your stack, goals, and constraints. Deliverable:
                  Architecture document.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center text-lg font-bold mx-auto">
                  2
                </div>
                <h3 className="font-semibold mt-4">Architecture</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Design the system, choose technologies, plan integration.
                  Deliverable: Technical specification.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center text-lg font-bold mx-auto">
                  3
                </div>
                <h3 className="font-semibold mt-4">Delivery</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Build, test, deploy, document, hand off. Deliverable: Working
                  system plus documentation.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <ServicesGrid maxItems={5} showAll />

      <section className="py-24 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-center">
              Engagement Models
            </h2>
            <p className="mt-3 text-lg text-muted-foreground text-center max-w-2xl mx-auto">
              Different needs, different approaches. All fixed-price, all
              outcome-oriented.
            </p>
          </FadeIn>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {engagements.map((eng) => (
              <FadeIn key={eng.title}>
                <Card className="p-6 h-full flex flex-col">
                  <h3 className="font-semibold text-lg">{eng.title}</h3>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-3xl font-bold">{eng.price}</span>
                    <span className="text-sm text-muted-foreground">
                      {eng.duration}
                    </span>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground flex-1">
                    {eng.description}
                  </p>
                  <p className="mt-4 text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">
                      Best for:
                    </span>{" "}
                    {eng.ideal}
                  </p>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        headline="Not sure what you need?"
        body="Book a free 30-minute consultation. I'll help you scope the problem and recommend the right approach."
        primaryCTA={{ text: "Book a Free Consultation", href: "/contact" }}
        secondaryCTA={{ text: "Describe Your Project", href: "/contact" }}
        variant="default"
      />
    </>
  );
}
