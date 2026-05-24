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
        "py-24",
        variant === "prominent" &&
          "bg-gradient-to-b from-primary/5 via-primary/5 to-transparent",
        variant === "subtle" && "border-y border-border",
        className
      )}
    >
      <div
        className={cn(
          "mx-auto max-w-3xl px-4 sm:px-6 lg:px-8",
          align === "center" ? "text-center" : ""
        )}
      >
        <FadeIn>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            {headline}
          </h2>
          {body && (
            <p className="mt-4 text-lg text-muted-foreground">{body}</p>
          )}
          <div
            className={cn(
              "mt-8 flex flex-col sm:flex-row gap-4",
              align === "center" ? "justify-center" : ""
            )}
          >
            <Link href={primaryCTA.href}>
              <Button size="xl" className="gap-2 w-full sm:w-auto">
                {primaryCTA.text}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            {secondaryCTA && (
              <Link href={secondaryCTA.href}>
                <Button
                  variant="outline"
                  size="xl"
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
