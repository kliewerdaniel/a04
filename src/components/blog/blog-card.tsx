import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn, formatDate } from "@/lib/utils";
import type { BlogPost } from "@/types";

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

export function BlogCard({ post, featured }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="block group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-2xl">
      <Card className={cn(
        "p-5 sm:p-6 h-full hover:shadow-elevated hover:-translate-y-0.5 transition-all duration-300",
        featured && "sm:p-7"
      )}>
        <div className="flex items-center gap-2.5 mb-3">
          <Badge variant="primary" className="text-xs">{post.category}</Badge>
          <span className="text-xs text-muted-foreground">{post.reading_time} min read</span>
        </div>
        <h3 className={cn(
          "font-semibold leading-snug group-hover:text-primary transition-colors line-clamp-2",
          featured ? "text-xl" : "text-sm"
        )}>
          {post.title}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2">
          {post.description}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">{formatDate(post.date)}</span>
          <span className="text-xs font-medium text-primary inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            Read <ArrowRight className="h-3 w-3" aria-hidden="true" />
          </span>
        </div>
      </Card>
    </Link>
  );
}
