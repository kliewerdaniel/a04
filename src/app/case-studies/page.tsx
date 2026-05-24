import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/hero-section";
import { CTASection } from "@/components/sections/cta-section";
import { CaseStudiesGrid } from "./case-studies-grid";
import { getCaseStudies } from "@/lib/case-studies";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Real AI infrastructure projects. Detailed case studies of knowledge systems, automation pipelines, and local AI deployments.",
};

export default function CaseStudiesPage() {
  const caseStudies = getCaseStudies();

  return (
    <>
      <HeroSection
        headline="Case Studies"
        subtitle="Real systems, real results. Detailed breakdowns of AI infrastructure projects."
        variant="centered"
        background="gradient"
      />

      <section className="py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <CaseStudiesGrid caseStudies={caseStudies} />
        </div>
      </section>

      <CTASection
        headline="Want results like these?"
        body="Let&apos;s talk about your project and how we can build something great together."
        primaryCTA={{ text: "Book a Free Consultation", href: "/contact" }}
        variant="default"
      />
    </>
  );
}
