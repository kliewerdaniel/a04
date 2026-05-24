"use client";

import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import type { Metric } from "@/types";
import { FadeIn } from "@/components/animations/fade-in";

interface MetricsBarProps {
  metrics: readonly Metric[];
  animate?: boolean;
  className?: string;
}

function AnimatedMetric({
  value,
  label,
  prefix = "",
  suffix = "",
  animate,
}: Metric & { animate?: boolean }) {
  const [display, setDisplay] = useState(animate ? "0" : value);
  const ref = useRef<HTMLDivElement>(null);
  const done = useRef(false);

  useEffect(() => {
    if (!animate) return;

    const numVal = parseInt(value.replace(/[^0-9]/g, ""));
    if (isNaN(numVal) || done.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !done.current) {
          done.current = true;
          const duration = 1800;
          const startTime = performance.now();

          function tick(now: number) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(eased * numVal);
            setDisplay(current.toString());

            if (progress < 1) {
              requestAnimationFrame(tick);
            } else {
              setDisplay(value);
            }
          }

          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, animate]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground tabular-nums">
        {prefix}
        {display}
        {suffix}
      </div>
      <div className="mt-2 text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

export function MetricsBar({ metrics, animate = true, className }: MetricsBarProps) {
  return (
    <section className={cn("py-16 lg:py-20 border-y border-border-subtle", className)}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <FadeIn>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {metrics.map((metric) => (
              <AnimatedMetric key={metric.label} {...metric} animate={animate} />
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
