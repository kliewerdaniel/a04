"use client";

import { useState } from "react";
import { CaseStudyCard } from "@/components/sections/case-study-card";
import { StaggerContainer, StaggerItem } from "@/components/animations/fade-in";
import { cn } from "@/lib/utils";
import type { CaseStudy } from "@/types";

export function CaseStudiesGrid({
  caseStudies,
}: {
  caseStudies: CaseStudy[];
}) {
  const technologies = [
    "All",
    ...Array.from(new Set(caseStudies.flatMap((cs) => cs.technologies))),
  ];

  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? caseStudies
      : caseStudies.filter((cs) => cs.technologies.includes(activeFilter));

  return (
    <>
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 mb-8" role="tablist" aria-label="Filter by technology">
        {technologies.map((t) => (
          <button
            key={t}
            onClick={() => setActiveFilter(t)}
            role="tab"
            aria-selected={activeFilter === t}
            className={cn(
              "px-3.5 py-1.5 text-sm rounded-full whitespace-nowrap transition-all duration-200 font-medium",
              activeFilter === t
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-muted-foreground text-lg">No case studies match this filter.</p>
        </div>
      ) : (
        <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((cs) => (
            <StaggerItem key={cs.slug}>
              <CaseStudyCard {...cs} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      )}
    </>
  );
}
