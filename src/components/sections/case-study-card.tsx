"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Metric } from "@/types";

interface CaseStudyCardProps {
  title: string;
  slug: string;
  client?: string;
  metrics: readonly Metric[];
  technologies: readonly string[];
  description: string;
  variant?: "default" | "featured";
}

export function CaseStudyCard({
  title,
  slug,
  client,
  metrics,
  technologies,
  description,
  variant = "default",
}: CaseStudyCardProps) {
  return (
    <Link href={`/case-studies/${slug}`} className="block group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-2xl">
      <Card
        className={cn(
          "p-6 sm:p-7 h-full hover:shadow-elevated hover:-translate-y-0.5 transition-all duration-300",
          variant === "featured" && "lg:p-8"
        )}
      >
        {client && (
          <p className="text-xs text-muted-foreground mb-2 font-medium">{client}</p>
        )}
        <h3
          className={cn(
            "font-semibold tracking-tight group-hover:text-primary transition-colors",
            variant === "featured" ? "text-xl sm:text-2xl" : "text-lg"
          )}
        >
          {title}
        </h3>
        <p className="mt-2.5 text-sm text-muted-foreground leading-relaxed line-clamp-2">
          {description}
        </p>

        <div className="mt-5 grid grid-cols-3 gap-4 py-4 border-y border-border-subtle">
          {metrics.map((m) => (
            <div key={m.label}>
              <div className="text-lg sm:text-xl font-bold text-primary tabular-nums">
                {m.value}
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">{m.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {technologies.map((t) => (
            <Badge key={t} variant="subtle" className="text-xs">
              {t}
            </Badge>
          ))}
        </div>

        <div className="mt-5 text-sm font-medium text-primary inline-flex items-center gap-1.5 group/link">
          Read case study
          <ArrowRight className="h-3.5 w-3.5 group-hover/link:translate-x-0.5 transition-transform" aria-hidden="true" />
        </div>
      </Card>
    </Link>
  );
}
