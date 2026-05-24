import { HeroSection } from "@/components/sections/hero-section";
import { ServicesGrid } from "@/components/sections/services-grid";
import { MetricsBar } from "@/components/sections/metrics-bar";
import { CTASection } from "@/components/sections/cta-section";
import { CaseStudyCard } from "@/components/sections/case-study-card";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/fade-in";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getPosts } from "@/lib/blog";
import { METRICS } from "@/lib/constants";
import { getCaseStudies } from "@/lib/case-studies";

export default function HomePage() {
  const posts = getPosts().slice(0, 3);
  const featuredCaseStudies = getCaseStudies().filter((cs) => cs.featured);

  return (
    <>
      <HeroSection
        headline="Local AI Infrastructure. Production Systems. Technical Authority."
        subtitle="I build private, local-first AI infrastructure for organizations that need control, privacy, and real integration. Consulting, architecture, and production systems."
        primaryCTA={{ text: "Book a Free Consultation", href: "/contact" }}
        secondaryCTA={{ text: "View Services", href: "/services" }}
        variant="default"
        background="grid"
      />

      <ServicesGrid maxItems={3} />

      <section className="py-24 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Recent Work
            </h2>
            <p className="mt-3 text-lg text-muted-foreground max-w-2xl">
              Real systems, real results.
            </p>
          </FadeIn>

          <StaggerContainer className="mt-12 grid gap-6 md:grid-cols-2">
            {featuredCaseStudies.map((cs) => (
              <StaggerItem key={cs.slug}>
                <CaseStudyCard {...cs} variant="featured" />
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeIn className="mt-10 text-center">
            <Link
              href="/case-studies"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
            >
              View all case studies <ArrowRight className="h-3 w-3" />
            </Link>
          </FadeIn>
        </div>
      </section>

      <MetricsBar metrics={METRICS} />

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Latest Writing
            </h2>
            <p className="mt-3 text-lg text-muted-foreground max-w-2xl">
              Deep technical content on AI systems, local LLMs, and production
              automation.
            </p>
          </FadeIn>

          <StaggerContainer className="mt-12 grid gap-6 md:grid-cols-3">
            {posts.map((post) => (
              <StaggerItem key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="block group">
                  <Card className="p-5 h-full hover:translate-y-[-4px] transition-all duration-200 hover:shadow-md">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="secondary" className="text-xs">
                        {post.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {post.reading_time} min read
                      </span>
                    </div>
                    <h3 className="font-semibold group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                      {post.description}
                    </p>
                    <div className="mt-3 text-xs text-muted-foreground">
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                  </Card>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-16 border-y border-border">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <p className="text-lg sm:text-xl italic text-muted-foreground leading-relaxed">
              &ldquo;I believe AI infrastructure should be owned, not rented.
              Local-first, private, and built to last.&rdquo;
            </p>
          </FadeIn>
        </div>
      </section>

      <CTASection
        headline="Ready to Build?"
        body="Let's talk about your AI infrastructure needs. Free 30-minute consultation — no pressure, no pitch."
        primaryCTA={{ text: "Book a Free Consultation", href: "/contact" }}
        variant="prominent"
      />
    </>
  );
}
