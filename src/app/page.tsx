import { HeroSection } from "@/components/sections/hero-section";
import { ServicesGrid } from "@/components/sections/services-grid";
import { MetricsBar } from "@/components/sections/metrics-bar";
import { CTASection } from "@/components/sections/cta-section";
import { CaseStudyCard } from "@/components/sections/case-study-card";
import { BlogCard } from "@/components/blog/blog-card";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/fade-in";
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

      <section className="py-24 lg:py-32 bg-muted/30">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Recent Work
            </h2>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Real systems, real results. Detailed case studies of AI infrastructure I&apos;ve built.
            </p>
          </FadeIn>

          <StaggerContainer className="mt-12 lg:mt-16 grid gap-6 md:grid-cols-2">
            {featuredCaseStudies.map((cs) => (
              <StaggerItem key={cs.slug}>
                <CaseStudyCard {...cs} variant="featured" />
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeIn className="mt-10 text-center">
            <Link
              href="/case-studies"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1.5 group"
            >
              View all case studies <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
            </Link>
          </FadeIn>
        </div>
      </section>

      <MetricsBar metrics={METRICS} />

      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Latest Writing
            </h2>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Deep technical content on AI systems, local LLMs, and production automation.
            </p>
          </FadeIn>

          <StaggerContainer className="mt-12 lg:mt-16 grid gap-5 md:grid-cols-3">
            {posts.map((post) => (
              <StaggerItem key={post.slug}>
                <BlogCard post={post} />
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeIn className="mt-10 text-center">
            <Link
              href="/blog"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1.5 group"
            >
              Read all 120+ articles <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
            </Link>
          </FadeIn>
        </div>
      </section>

      <section className="py-20 lg:py-24 border-y border-border-subtle">
        <div className="mx-auto max-w-4xl px-5 sm:px-8 lg:px-10 text-center">
          <FadeIn>
            <div className="w-12 h-0.5 bg-primary/40 mx-auto mb-8" aria-hidden="true" />
            <blockquote>
              <p className="text-xl sm:text-2xl lg:text-3xl italic text-muted-foreground leading-relaxed font-light text-balance">
                &ldquo;AI infrastructure should be owned, not rented. Local-first, private, and built to last.&rdquo;
              </p>
            </blockquote>
            <cite className="block mt-6 text-sm text-muted-foreground not-italic font-medium">
              — Daniel Kliewer
            </cite>
          </FadeIn>
        </div>
      </section>

      <CTASection
        headline="Ready to Build?"
        body="Let&apos;s talk about your AI infrastructure needs. Free 30-minute consultation — no pressure, no pitch."
        primaryCTA={{ text: "Book a Free Consultation", href: "/contact" }}
        variant="prominent"
      />
    </>
  );
}
