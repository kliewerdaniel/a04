"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/animations/fade-in";
import { cn } from "@/lib/utils";

interface CTASectionProps {
  headline: string;
  body?: string;
  primaryCTA: { text: string; href: string };
  secondaryCTA?: { text: string; href: string };
  variant?: "default" | "subtle" | "prominent";
  align?: "center" | "left";
  className?: string;
}

export function CTASection({
  headline,
  body,
  primaryCTA,
  secondaryCTA,
  variant = "default",
  align = "center",
  className,
}: CTASectionProps) {
  return (
    <section
      className={cn(
        "py-24 lg:py-32",
        variant === "prominent" &&
          "bg-gradient-to-b from-primary/5 via-primary/[0.03] to-transparent",
        variant === "subtle" && "border-y border-border-subtle",
        className
      )}
    >
      <div
        className={cn(
          "mx-auto max-w-4xl px-5 sm:px-8 lg:px-10",
          align === "center" ? "text-center" : ""
        )}
      >
        <FadeIn>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance leading-[1.1]">
            {headline}
          </h2>
          {body && (
            <p className={cn(
              "mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed",
              align === "center" ? "mx-auto max-w-2xl" : ""
            )}>
              {body}
            </p>
          )}
          <div
            className={cn(
              "mt-8 flex flex-col sm:flex-row gap-3",
              align === "center" ? "justify-center" : ""
            )}
          >
            <Link href={primaryCTA.href}>
              <Button size="lg" className="w-full sm:w-auto gap-2">
                {primaryCTA.text}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </Link>
            {secondaryCTA && (
              <Link href={secondaryCTA.href}>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  {secondaryCTA.text}
                </Button>
              </Link>
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
