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
    <Link href={`/case-studies/${slug}`} className="block group">
      <Card
        className={cn(
          "p-6 hover:translate-y-[-4px] transition-all duration-200 hover:shadow-md h-full",
          variant === "featured" && "lg:p-8"
        )}
      >
        {client && (
          <p className="text-xs text-muted-foreground mb-2">{client}</p>
        )}
        <h3
          className={cn(
            "font-semibold group-hover:text-primary transition-colors",
            variant === "featured" ? "text-xl" : "text-lg"
          )}
        >
          {title}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>

        <div className="mt-4 grid grid-cols-3 gap-4">
          {metrics.map((m) => (
            <div key={m.label}>
              <div className="text-lg font-bold text-primary">
                {m.value}
              </div>
              <div className="text-xs text-muted-foreground">{m.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {technologies.map((t) => (
            <Badge key={t} variant="secondary" className="text-xs">
              {t}
            </Badge>
          ))}
        </div>

        <div className="mt-4 text-sm font-medium text-primary inline-flex items-center gap-1 group/link">
          Read case study{" "}
          <ArrowRight className="h-3 w-3 group-hover/link:translate-x-0.5 transition-transform" />
        </div>
      </Card>
    </Link>
  );
}
