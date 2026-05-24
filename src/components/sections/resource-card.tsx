"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Lock, Loader2 } from "lucide-react";
import Link from "next/link";

interface ResourceCardProps {
  title: string;
  type: string;
  price: string;
  description: string;
  badge: string;
  badgeVariant: "default" | "success" | "accent" | "secondary";
  slug: string;
}

export function ResourceCard({
  title,
  type,
  price,
  description,
  badge,
  badgeVariant,
  slug,
}: ResourceCardProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handlePurchase() {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productSlug: slug }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || data.error || "Checkout unavailable");
        return;
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      setError("Could not connect to checkout service");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-muted-foreground uppercase tracking-wider">
          {type}
        </span>
        <Badge variant={badgeVariant}>{badge}</Badge>
      </div>
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground flex-1">
        {description}
      </p>
      <div className="mt-4 space-y-2">
        {price === "Free" ? (
          <Link href="/contact">
            <Button size="sm" className="w-full gap-2">
              <Download className="h-3 w-3" /> Download Free
            </Button>
          </Link>
        ) : (
          <>
            <Button
              size="sm"
              variant="outline"
              className="w-full gap-2"
              onClick={handlePurchase}
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : (
                <Lock className="h-3 w-3" />
              )}
              {loading ? "Opening checkout..." : `Buy Now — ${price}`}
            </Button>
            {error && (
              <p className="text-xs text-center text-muted-foreground">
                {error}
              </p>
            )}
          </>
        )}
      </div>
    </Card>
  );
}
