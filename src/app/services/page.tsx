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

const steps = [
  { number: "01", title: "Discovery", body: "Understand your stack, goals, and constraints." },
  { number: "02", title: "Architecture", body: "Design the system, choose technologies, plan integration." },
  { number: "03", title: "Delivery", body: "Build, test, deploy, document, and hand off." },
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

      <section className="py-24 lg:py-32 border-b border-border-subtle">
        <div className="mx-auto max-w-5xl px-5 sm:px-8 lg:px-10">
          <FadeIn>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-center mb-12">
              How It Works
            </h2>
          </FadeIn>
          <div className="grid gap-8 sm:grid-cols-3">
            {steps.map((step, i) => (
              <FadeIn key={step.number} delay={i * 0.15}>
                <div className="text-center">
                  <div className="w-14 h-14 rounded-2xl bg-primary-muted text-primary flex items-center justify-center text-xl font-bold mx-auto">
                    {step.number}
                  </div>
                  <h3 className="font-semibold text-lg mt-5">{step.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed max-w-xs mx-auto">{step.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <ServicesGrid maxItems={5} showAll variant="default" />

      <section className="py-24 lg:py-32 bg-muted/30">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <FadeIn>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-center text-balance">
              Engagement Models
            </h2>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground text-center max-w-2xl mx-auto leading-relaxed">
              Different needs, different approaches. All fixed-price, all outcome-oriented.
            </p>
          </FadeIn>

          <StaggerContainer className="mt-12 lg:mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {engagements.map((eng) => (
              <StaggerItem key={eng.title}>
                <Card className="p-6 sm:p-7 h-full flex flex-col hover:shadow-elevated hover:-translate-y-0.5 transition-all duration-300">
                  <h3 className="font-semibold text-lg">{eng.title}</h3>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-3xl font-bold tracking-tight">{eng.price}</span>
                    <span className="text-sm text-muted-foreground">{eng.duration}</span>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground leading-relaxed flex-1">{eng.description}</p>
                  <p className="mt-5 text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">Best for:</span> {eng.ideal}
                  </p>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
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

function StaggerContainer({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}

function StaggerItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <FadeIn className={className}>
      {children}
    </FadeIn>
  );
}
