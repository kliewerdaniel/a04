import { type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        primary: "bg-primary-muted text-primary",
        secondary: "bg-secondary text-secondary-foreground",
        accent: "bg-accent-muted text-accent",
        success: "bg-success/10 text-success",
        warning: "bg-warning/10 text-warning",
        outline: "border border-border text-muted-foreground",
        subtle: "text-muted-foreground bg-muted",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

interface BadgeProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}
