"use client";

import { useCallback, useRef, useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { X } from "lucide-react";
import type { BlogPost } from "@/types";

const ForceGraph3D: any = dynamic(() => import("react-force-graph-3d"), {
  ssr: false,
  loading: () => <LoadingPlaceholder />,
});

type GraphNode = {
  id: string;
  name: string;
  group: string;
  post: BlogPost;
  x?: number;
  y?: number;
  z?: number;
};

type GraphLink = {
  source: string;
  target: string;
  weight: number;
};

const CATEGORY_COLORS: Record<string, string> = {
  "Technical Guides": "#3b82f6",
  "AI Philosophy": "#a855f7",
  Tutorials: "#22c55e",
  Projects: "#f59e0b",
  Research: "#ef4444",
  Opinion: "#ec4899",
};

function getColor(category: string): string {
  return CATEGORY_COLORS[category] || "#6b7280";
}

export default function KnowledgeGraph({
  posts,
}: {
  posts: BlogPost[];
}) {
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ w: 800, h: 500 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({ w: Math.max(width, 400), h: Math.max(height, 300) });
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const { nodes, links } = useMemo(() => {
    const postNodes: GraphNode[] = posts.map((p) => ({
      id: p.slug,
      name: p.title,
      group: p.category,
      post: p,
    }));

    const linkMap = new Map<string, GraphLink>();
    for (let i = 0; i < posts.length; i++) {
      for (let j = i + 1; j < posts.length; j++) {
        const shared = posts[i].tags.filter((t) => posts[j].tags.includes(t));
        if (shared.length > 0) {
          const key = `${posts[i].slug}|${posts[j].slug}`;
          linkMap.set(key, {
            source: posts[i].slug,
            target: posts[j].slug,
            weight: shared.length,
          });
        }
      }
    }

    return { nodes: postNodes, links: Array.from(linkMap.values()) };
  }, [posts]);

  const handleNodeClick = useCallback((node: GraphNode) => {
    setSelectedNode(node);
  }, []);

  const handleBackgroundClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  return (
    <div className="space-y-6">
      <div
        ref={containerRef}
        className="relative w-full aspect-[2/1] rounded-xl border border-border bg-card overflow-hidden"
      >
        <ForceGraph3D
          graphData={{ nodes, links }}
          width={dimensions.w}
          height={dimensions.h}
          nodeLabel="name"
          nodeColor={(node: GraphNode) => getColor(node.group)}
          nodeVal={2}
          linkWidth={(link: GraphLink) => Math.min(link.weight * 0.5, 3)}
          linkColor={() => "rgba(100, 100, 120, 0.25)"}
          linkDirectionalParticles={1}
          linkDirectionalParticleWidth={1.5}
          linkDirectionalParticleSpeed={0.003}
          onNodeClick={handleNodeClick}
          onBackgroundClick={handleBackgroundClick}
          backgroundColor="rgba(0,0,0,0)"
          d3AlphaDecay={0.02}
          d3VelocityDecay={0.3}
        />

        {selectedNode && (
          <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 p-4 rounded-lg border border-border bg-card/95 backdrop-blur-sm shadow-lg">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <span
                  className="inline-block px-2 py-0.5 text-[10px] font-medium rounded-full mb-2"
                  style={{
                    backgroundColor: `${getColor(selectedNode.group)}20`,
                    color: getColor(selectedNode.group),
                  }}
                >
                  {selectedNode.group}
                </span>
                <h4 className="font-semibold text-sm leading-snug line-clamp-2">
                  {selectedNode.name}
                </h4>
                {selectedNode.post.description && (
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {selectedNode.post.description}
                  </p>
                )}
                <div className="flex flex-wrap gap-1 mt-2">
                  {selectedNode.post.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="px-1.5 py-0.5 text-[10px] rounded bg-secondary text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/blog/${selectedNode.post.slug}`}
                  className="inline-block mt-2 text-xs font-medium text-accent hover:underline"
                >
                  Read post →
                </Link>
              </div>
              <button
                onClick={() => setSelectedNode(null)}
                className="shrink-0 p-1 rounded-md hover:bg-secondary transition-colors"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-3 justify-center">
        {Array.from(new Set(posts.map((p) => p.category))).map((cat) => (
          <span
            key={cat}
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground"
          >
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: getColor(cat) }}
            />
            {cat}
          </span>
        ))}
      </div>
    </div>
  );
}

function LoadingPlaceholder() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-center p-8">
        <div className="w-16 h-16 rounded-full bg-accent/10 text-accent flex items-center justify-center mx-auto mb-4 animate-pulse">
          <svg
            className="w-8 h-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 7l8 5-8 5V7zM16 7l8 5-8 5V7z"
            />
          </svg>
        </div>
        <h3 className="font-semibold text-lg mb-2">
          Loading 3D Visualization
        </h3>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          Loading Three.js renderer...
        </p>
      </div>
    </div>
  );
}
