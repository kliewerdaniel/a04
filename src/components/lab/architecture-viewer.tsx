"use client";

import { useCallback, useState } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  Handle,
  Position,
  type NodeProps,
  type Edge,
  type Node,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

type Arch = {
  id: string;
  label: string;
  description: string;
  nodes: Node[];
  edges: Edge[];
};

function ArchNode({ data }: NodeProps) {
  return (
    <div className="px-4 py-2 rounded-lg border border-border bg-card shadow-sm text-sm max-w-[200px]">
      <div className="font-semibold text-xs">{data.category as string}</div>
      <div className="text-sm mt-0.5">{data.label as string}</div>
      <Handle type="target" position={Position.Top} className="!border-border" />
      <Handle type="source" position={Position.Bottom} className="!border-border" />
    </div>
  );
}

const nodeTypes = { arch: ArchNode };

const ARCHITECTURES: Arch[] = [
  {
    id: "rag-pipeline",
    label: "RAG Pipeline",
    description:
      "Full retrieval-augmented generation pipeline from document ingestion to streaming response.",
    nodes: [
      {
        id: "docs",
        type: "arch",
        position: { x: 200, y: 0 },
        data: { label: "Documents (PDF, HTML, MD)", category: "Ingestion" },
      },
      {
        id: "chunk",
        type: "arch",
        position: { x: 200, y: 100 },
        data: { label: "Semantic Chunking", category: "Processing" },
      },
      {
        id: "embed",
        type: "arch",
        position: { x: 200, y: 200 },
        data: { label: "Embedding Model (nomic-embed-text)", category: "Vectorization" },
      },
      {
        id: "vectordb",
        type: "arch",
        position: { x: 200, y: 300 },
        data: { label: "Vector Database (Qdrant)", category: "Storage" },
      },
      {
        id: "retrieve",
        type: "arch",
        position: { x: 80, y: 400 },
        data: { label: "Hybrid Retrieval (ANN + BM25)", category: "Retrieval" },
      },
      {
        id: "rerank",
        type: "arch",
        position: { x: 320, y: 400 },
        data: { label: "Cross-Encoder Reranker", category: "Ranking" },
      },
      {
        id: "llm",
        type: "arch",
        position: { x: 200, y: 500 },
        data: { label: "LLM Generation (Llama 3.1 8B)", category: "Generation" },
      },
      {
        id: "response",
        type: "arch",
        position: { x: 200, y: 600 },
        data: { label: "Streaming Response + Citations", category: "Output" },
      },
    ],
    edges: [
      { id: "e-docs-chunk", source: "docs", target: "chunk", label: "raw text" },
      { id: "e-chunk-embed", source: "chunk", target: "embed", label: "chunks" },
      { id: "e-embed-vdb", source: "embed", target: "vectordb", label: "vectors" },
      {
        id: "e-vdb-retrieve",
        source: "vectordb",
        target: "retrieve",
        label: "query",
      },
      {
        id: "e-retrieve-rerank",
        source: "retrieve",
        target: "rerank",
        label: "candidates",
      },
      { id: "e-rerank-llm", source: "rerank", target: "llm", label: "context" },
      { id: "e-llm-resp", source: "llm", target: "response", label: "stream" },
    ],
  },
  {
    id: "multi-agent",
    label: "Multi-Agent System",
    description:
      "Orchestrated multi-agent pipeline with task decomposition, specialized agents, and quality control.",
    nodes: [
      {
        id: "intake",
        type: "arch",
        position: { x: 220, y: 0 },
        data: { label: "Intake Form", category: "Input" },
      },
      {
        id: "orchestrator",
        type: "arch",
        position: { x: 220, y: 100 },
        data: { label: "Orchestrator Agent", category: "Planning" },
      },
      {
        id: "migrate",
        type: "arch",
        position: { x: 20, y: 220 },
        data: { label: "Migration Agent", category: "Execution" },
      },
      {
        id: "config",
        type: "arch",
        position: { x: 160, y: 220 },
        data: { label: "Config Agent", category: "Execution" },
      },
      {
        id: "access",
        type: "arch",
        position: { x: 300, y: 220 },
        data: { label: "Access Agent", category: "Execution" },
      },
      {
        id: "docs-agent",
        type: "arch",
        position: { x: 440, y: 220 },
        data: { label: "Docs Agent", category: "Execution" },
      },
      {
        id: "quality",
        type: "arch",
        position: { x: 220, y: 340 },
        data: { label: "Quality Agent", category: "Validation" },
      },
      {
        id: "output",
        type: "arch",
        position: { x: 120, y: 440 },
        data: { label: "✓ Complete", category: "Output" },
      },
      {
        id: "escalate",
        type: "arch",
        position: { x: 360, y: 440 },
        data: { label: "⚠ Flag for Review", category: "Output" },
      },
    ],
    edges: [
      { id: "a-in-orc", source: "intake", target: "orchestrator" },
      { id: "a-orc-mig", source: "orchestrator", target: "migrate" },
      { id: "a-orc-con", source: "orchestrator", target: "config" },
      { id: "a-orc-acc", source: "orchestrator", target: "access" },
      { id: "a-orc-doc", source: "orchestrator", target: "docs-agent" },
      { id: "a-mig-qual", source: "migrate", target: "quality" },
      { id: "a-con-qual", source: "config", target: "quality" },
      { id: "a-acc-qual", source: "access", target: "quality" },
      { id: "a-doc-qual", source: "docs-agent", target: "quality" },
      {
        id: "a-qual-out",
        source: "quality",
        target: "output",
        label: "pass",
      },
      {
        id: "a-qual-esc",
        source: "quality",
        target: "escalate",
        label: "fail",
      },
    ],
  },
  {
    id: "llm-infra",
    label: "Local LLM Infrastructure",
    description:
      "Production-grade air-gapped LLM serving stack with Kubernetes, vLLM, and observability.",
    nodes: [
      {
        id: "gpu1",
        type: "arch",
        position: { x: 20, y: 20 },
        data: { label: "GPU Pod 1\nvLLM · Llama 70B", category: "Compute" },
      },
      {
        id: "gpu2",
        type: "arch",
        position: { x: 200, y: 20 },
        data: { label: "GPU Pod 2\nvLLM · Mistral 7B", category: "Compute" },
      },
      {
        id: "gpu3",
        type: "arch",
        position: { x: 380, y: 20 },
        data: { label: "GPU Pod 3\nvLLM · Qwen 32B", category: "Compute" },
      },
      {
        id: "ingress",
        type: "arch",
        position: { x: 200, y: 140 },
        data: { label: "K8s Ingress\n(internal mTLS)", category: "Networking" },
      },
      {
        id: "apps",
        type: "arch",
        position: { x: 80, y: 260 },
        data: { label: "Internal Applications", category: "Consumers" },
      },
      {
        id: "audit",
        type: "arch",
        position: { x: 320, y: 260 },
        data: { label: "Audit Log\n(immutable store)", category: "Observability" },
      },
      {
        id: "monitor",
        type: "arch",
        position: { x: 200, y: 380 },
        data: { label: "Prometheus + Grafana", category: "Observability" },
      },
    ],
    edges: [
      { id: "b-g1-in", source: "gpu1", target: "ingress" },
      { id: "b-g2-in", source: "gpu2", target: "ingress" },
      { id: "b-g3-in", source: "gpu3", target: "ingress" },
      { id: "b-in-app", source: "ingress", target: "apps", label: "internal TLS" },
      { id: "b-in-aud", source: "ingress", target: "audit", label: "requests" },
      { id: "b-app-mon", source: "apps", target: "monitor", label: "metrics" },
      { id: "b-g1-mon", source: "gpu1", target: "monitor", label: "metrics" },
    ],
  },
  {
    id: "knowledge-graph",
    label: "Knowledge Graph Pipeline",
    description:
      "End-to-end knowledge graph pipeline: entity extraction, graph construction, and hybrid querying.",
    nodes: [
      {
        id: "sources",
        type: "arch",
        position: { x: 160, y: 0 },
        data: { label: "Content Sources\n(blog, docs, data)", category: "Ingestion" },
      },
      {
        id: "extract",
        type: "arch",
        position: { x: 160, y: 100 },
        data: { label: "Entity & Relation\nExtraction (LLM)", category: "Processing" },
      },
      {
        id: "graphdb",
        type: "arch",
        position: { x: 160, y: 200 },
        data: { label: "Graph Database\n(Neo4j)", category: "Storage" },
      },
      {
        id: "vector",
        type: "arch",
        position: { x: 20, y: 300 },
        data: { label: "Vector Embeddings", category: "Retrieval" },
      },
      {
        id: "cypher",
        type: "arch",
        position: { x: 300, y: 300 },
        data: { label: "Graph Traversal\n(Cypher)", category: "Retrieval" },
      },
      {
        id: "fusion",
        type: "arch",
        position: { x: 160, y: 400 },
        data: { label: "Fusion Retrieval\n(vector + graph)", category: "Fusion" },
      },
      {
        id: "gen",
        type: "arch",
        position: { x: 160, y: 500 },
        data: { label: "Response Generation", category: "Output" },
      },
    ],
    edges: [
      { id: "c-src-ext", source: "sources", target: "extract" },
      { id: "c-ext-gdb", source: "extract", target: "graphdb" },
      { id: "c-gdb-vec", source: "graphdb", target: "vector", label: "entities" },
      {
        id: "c-gdb-cyp",
        source: "graphdb",
        target: "cypher",
        label: "relations",
      },
      { id: "c-vec-fus", source: "vector", target: "fusion" },
      { id: "c-cyp-fus", source: "cypher", target: "fusion" },
      { id: "c-fus-gen", source: "fusion", target: "gen" },
    ],
  },
];

export default function ArchitectureViewer() {
  const [active, setActive] = useState(ARCHITECTURES[0]);

  const handleSelect = useCallback((arch: Arch) => {
    setActive(arch);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {ARCHITECTURES.map((arch) => (
          <button
            key={arch.id}
            onClick={() => handleSelect(arch)}
            className={`px-3 py-1.5 text-sm rounded-full whitespace-nowrap transition-colors ${
              active.id === arch.id
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            {arch.label}
          </button>
        ))}
      </div>

      <p className="text-sm text-muted-foreground">{active.description}</p>

      <div className="w-full aspect-[2/1] rounded-xl border border-border bg-card overflow-hidden">
        <ReactFlow
          nodes={active.nodes}
          edges={active.edges.map((e) => ({
            ...e,
            style: { stroke: "hsl(var(--border))", strokeWidth: 1.5 },
            labelStyle: { fontSize: 10, fill: "hsl(var(--muted-foreground))" },
            labelBgStyle: { fill: "hsl(var(--card))" },
            labelBgPadding: [6, 3],
            animated: true,
          }))}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.3 }}
          minZoom={0.3}
          maxZoom={2}
          attributionPosition="bottom-left"
          proOptions={{ hideAttribution: true }}
        >
          <Background color="hsl(var(--border))" gap={20} size={1} />
          <Controls className="!bg-card !border-border [&>button]:!border-border [&>button]:!bg-card [&>button]:!text-foreground" />
          <MiniMap
            className="!border-border"
            nodeColor="hsl(var(--muted))"
            maskColor="rgba(0,0,0,0.1)"
          />
        </ReactFlow>
      </div>
    </div>
  );
}
