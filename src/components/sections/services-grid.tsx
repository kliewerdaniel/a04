"use client";

import Link from "next/link";
import {
  Brain,
  Workflow,
  Server,
  Globe,
  FileText,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/fade-in";
import { SERVICES } from "@/lib/constants";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  Brain,
  Workflow,
  Server,
  Globe,
  FileText,
};

interface ServicesGridProps {
  maxItems?: number;
  showAll?: boolean;
  className?: string;
  variant?: "default" | "compact";
}

export function ServicesGrid({ maxItems = 3, showAll = false, className, variant = "default" }: ServicesGridProps) {
  const services = showAll ? SERVICES : SERVICES.slice(0, maxItems);

  return (
    <section className={cn("py-24 lg:py-32", className)}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <FadeIn>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
            What I Build
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Production AI systems for organizations that need control, privacy, and real integration.
          </p>
        </FadeIn>

        <StaggerContainer
          className={cn(
            "mt-12 lg:mt-16 grid gap-6",
            variant === "default" ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2"
          )}
        >
          {services.map((service) => {
            const Icon = iconMap[service.icon] || Brain;
            return (
              <StaggerItem key={service.title}>
                <Card className="group p-6 sm:p-7 h-full flex flex-col hover:shadow-elevated hover:-translate-y-0.5 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-xl bg-primary-muted text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <h3 className="font-semibold text-base">{service.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                    {service.description}
                  </p>
                  <div className="mt-5 flex items-center gap-2">
                    <Badge variant="subtle">{service.price}</Badge>
                    <Badge variant="outline">{service.timeline}</Badge>
                  </div>
                  <Link
                    href={service.href}
                    className="mt-5 text-sm font-medium text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1.5 group/link"
                  >
                    Learn more
                    <ArrowRight className="h-3.5 w-3.5 group-hover/link:translate-x-0.5 transition-transform" aria-hidden="true" />
                  </Link>
                </Card>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {!showAll && (
          <FadeIn className="mt-12 text-center">
            <Link
              href="/services"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1.5 group"
            >
              See all services
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
            </Link>
          </FadeIn>
        )}
      </div>
    </section>
  );
}
