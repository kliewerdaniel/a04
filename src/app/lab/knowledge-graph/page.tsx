import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getPosts } from "@/lib/blog";
import KnowledgeGraph from "@/components/lab/knowledge-graph";

export default function KnowledgeGraphPage() {
  const posts = getPosts();

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/lab"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-3 w-3" /> Back to Lab
        </Link>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight">
            Knowledge Graph Explorer
          </h1>
          <p className="mt-2 text-muted-foreground">
            Interactive 3D visualization of {posts.length} blog posts connected
            by shared topics and technologies. Click a node to explore.
          </p>
        </div>

        <KnowledgeGraph posts={posts} />
      </div>
    </div>
  );
}
