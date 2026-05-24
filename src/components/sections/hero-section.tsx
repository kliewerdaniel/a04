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
  variant?: "default" | "centered" | "split";
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
        "relative min-h-[80vh] flex items-center overflow-hidden pt-16",
        className
      )}
    >
      {/* Background */}
      {background === "grid" && (
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
            style={{
              backgroundImage:
                "radial-gradient(circle, currentColor 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
          <motion.div
            className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]"
            style={{
              backgroundImage:
                "radial-gradient(circle, currentColor 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
            animate={{ y: [0, -32, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        </div>
      )}

      {background === "gradient" && (
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
      )}

      <div
        className={cn(
          "relative z-10 mx-auto w-full px-4 sm:px-6 lg:px-8",
          variant === "centered" ? "text-center" : "",
          variant === "default" ? "max-w-6xl" : "max-w-7xl"
        )}
      >
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.05]">
            {words.map((word, i) => (
              <motion.span
                key={i}
                className="inline-block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.08,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              >
                {word}{" "}
              </motion.span>
            ))}
          </h1>

          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed"
            >
              {subtitle}
            </motion.p>
          )}

          {(primaryCTA || secondaryCTA) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="mt-8 flex flex-col sm:flex-row gap-4"
            >
              {primaryCTA && (
                <Link href={primaryCTA.href}>
                  <Button size="xl" className="gap-2 w-full sm:w-auto">
                    {primaryCTA.text}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              )}
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
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
