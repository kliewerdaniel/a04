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
}

export function ServicesGrid({ maxItems = 3, showAll = false }: ServicesGridProps) {
  const services = showAll ? SERVICES : SERVICES.slice(0, maxItems);

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            What I Build
          </h2>
          <p className="mt-3 text-lg text-muted-foreground max-w-2xl">
            Production AI systems for organizations that need control, privacy,
            and real integration.
          </p>
        </FadeIn>

        <StaggerContainer className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = iconMap[service.icon] || Brain;
            return (
              <StaggerItem key={service.title}>
                <Card className="group p-6 hover:translate-y-[-4px] transition-all duration-200 hover:shadow-md h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-200">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold">{service.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground flex-1">
                    {service.description}
                  </p>
                  <div className="mt-4 flex items-center gap-3">
                    <Badge variant="secondary">{service.price}</Badge>
                    <Badge variant="outline">{service.timeline}</Badge>
                  </div>
                  <Link
                    href={service.href}
                    className="mt-4 text-sm font-medium text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1 group/link"
                  >
                    Learn more{" "}
                    <ArrowRight className="h-3 w-3 group-hover/link:translate-x-0.5 transition-transform" />
                  </Link>
                </Card>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {!showAll && (
          <FadeIn className="mt-10 text-center">
            <Link
              href="/services"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
            >
              See all services <ArrowRight className="h-3 w-3" />
            </Link>
          </FadeIn>
        )}
      </div>
    </section>
  );
}
