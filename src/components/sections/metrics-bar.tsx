"use client";

import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { Metric } from "@/types";

interface MetricsBarProps {
  metrics: readonly Metric[];
  animate?: boolean;
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
          let start = 0;
          const duration = 1500;
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
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, animate]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
        {prefix}
        {display}
        {suffix}
      </div>
      <div className="mt-1 text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

export function MetricsBar({ metrics, animate = true }: MetricsBarProps) {
  return (
    <section className="py-16 border-y border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((metric) => (
            <AnimatedMetric key={metric.label} {...metric} animate={animate} />
          ))}
        </div>
      </div>
    </section>
  );
}
