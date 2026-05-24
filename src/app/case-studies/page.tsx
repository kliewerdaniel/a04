import { HeroSection } from "@/components/sections/hero-section";
import { CTASection } from "@/components/sections/cta-section";
import { CaseStudiesGrid } from "./case-studies-grid";
import { getCaseStudies } from "@/lib/case-studies";

export default function CaseStudiesPage() {
  const caseStudies = getCaseStudies();

  return (
    <>
      <HeroSection
        headline="Case Studies"
        subtitle="Real systems, real results. Detailed breakdowns of AI systems we've built."
        variant="centered"
        background="gradient"
      />

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <CaseStudiesGrid caseStudies={caseStudies} />
        </div>
      </section>

      <CTASection
        headline="Want results like these?"
        body="Let's talk about your project and how we can build something great together."
        primaryCTA={{ text: "Book a Free Consultation", href: "/contact" }}
        variant="default"
      />
    </>
  );
}
