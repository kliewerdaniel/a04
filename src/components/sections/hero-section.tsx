"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  headline: string;
  subtitle?: string;
  primaryCTA?: { text: string; href: string };
  secondaryCTA?: { text: string; href: string };
  variant?: "default" | "centered" | "compact";
  background?: "grid" | "gradient" | "none";
  className?: string;
}

export function HeroSection({
  headline,
  subtitle,
  primaryCTA,
  secondaryCTA,
  variant = "default",
  background = "grid",
  className,
}: HeroSectionProps) {
  const words = headline.split(" ");

  return (
    <section
      className={cn(
        "relative min-h-[85vh] lg:min-h-[90vh] flex items-center overflow-hidden",
        variant === "compact" && "min-h-[60vh] lg:min-h-[65vh]",
        className
      )}
    >
      {background === "grid" && (
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div
            className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
              backgroundSize: "32px 32px",
            }}
          />
          <motion.div
            className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
              backgroundSize: "32px 32px",
            }}
            animate={{ y: [0, -32, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          />
        </div>
      )}

      {background === "gradient" && (
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" aria-hidden="true" />
      )}

      <div
        className={cn(
          "relative z-10 mx-auto w-full px-5 sm:px-8 lg:px-10 pt-24 lg:pt-28",
          variant === "centered" ? "text-center" : "",
          variant === "default" ? "max-w-6xl" : "max-w-5xl"
        )}
      >
        <div className={cn(variant === "default" ? "max-w-3xl" : "mx-auto max-w-4xl")}>
          <h1 className="text-[clamp(2.25rem,5vw,4.5rem)] font-bold tracking-tight leading-[1.06] text-balance">
            {words.map((word, i) => (
              <motion.span
                key={i}
                className="inline-block"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.07,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              >
                {word}{" "}
              </motion.span>
            ))}
          </h1>

          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + words.length * 0.03 }}
              className={cn(
                "mt-6 text-base sm:text-lg leading-relaxed text-muted-foreground max-w-2xl",
                variant === "centered" && "mx-auto"
              )}
            >
              {subtitle}
            </motion.p>
          )}

          {(primaryCTA || secondaryCTA) && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 + words.length * 0.03 }}
              className={cn(
                "mt-8 flex flex-col sm:flex-row gap-3",
                variant === "centered" && "justify-center"
              )}
            >
              {primaryCTA && (
                <Link href={primaryCTA.href}>
                  <Button size="lg" className="w-full sm:w-auto gap-2">
                    {primaryCTA.text}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </Link>
              )}
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
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
