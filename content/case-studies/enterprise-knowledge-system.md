---
title: "Enterprise Knowledge System"
client: "Anonymous SaaS Company"
slug: "enterprise-knowledge-system"
timeline: "3 months"
role: "Lead AI Architect"
technologies:
  - Ollama
  - RAG
  - LangChain
  - Qdrant
metrics:
  - value: "60%"
    label: "Faster retrieval"
  - value: "50k"
    label: "Documents indexed"
  - value: "200ms"
    label: "Query latency"
description: "Built a private knowledge retrieval system that processed 50k documents with 200ms average latency."
featured: true
---

## The Challenge

The client, a rapidly growing SaaS company, had accumulated over 50,000 internal documents across engineering, product, and customer success teams. Their existing search infrastructure consisted of basic full-text search across fragmented silos — engineers used Notion, product teams kept specs in Confluence, and customer success maintained a separate knowledge base in a CRM.

Employees spent an average of 45 minutes per day searching for information. Knowledge existed but was inaccessible at the moment it was needed. The CTO estimated this cost the company roughly $400k/year in lost productivity.

They needed a unified retrieval system that respected existing access controls, worked with their on-prem infrastructure, and could return answers — not just document links.

## The Approach

We designed a retrieval-augmented generation (RAG) pipeline deployed entirely within their existing Kubernetes cluster:

**Ingestion Pipeline**
- Custom connectors for Notion, Confluence, and their CRM API
- Document chunking with semantic boundary detection (section-aware, not arbitrary token splitting)
- Embedding generation via Ollama running `nomic-embed-text` on a dedicated GPU node

**Vector Storage**
- Qdrant deployed as a sidecar in the cluster — zero cloud dependencies
- Hybrid search: dense vector embeddings + sparse keyword (BM25) for out-of-domain queries
- Metadata filtering for access control enforcement at query time

**Retrieval & Generation**
- Multi-stage retrieval: broad ANN search → rerank by cross-encoder → top-5 context window
- Generation via Ollama with a fine-tuned `Llama 3.1 8B` instructed to cite specific document IDs
- Streaming responses with source footnotes rendered in the web UI

**Architecture Diagram**
<pre style="background:hsl(var(--muted));padding:1rem;border-radius:0.5rem;font-size:0.8125rem;overflow-x:auto">
┌──────────┐   ┌──────────┐   ┌──────────┐
│ Notion   │   │Confluence│   │   CRM    │
│ Connector│   │Connector │   │Connector │
└────┬─────┘   └────┬─────┘   └────┬─────┘
     └──────────────┼──────────────┘
                    ▼
           ┌────────────────┐
           │ Chunking Engine │
           │ (semantic       │
           │  boundary detect)│
           └───────┬────────┘
                   ▼
           ┌────────────────┐
           │   Ollama       │
           │ nomic-embed-text│
           └───────┬────────┘
                   ▼
           ┌────────────────┐
           │    Qdrant      │
           │  (vector + BM25)│
           └───────┬────────┘
                   ▼
           ┌────────────────┐
           │ Cross-encoder  │
           │    reranker    │
           └───────┬────────┘
                   ▼
           ┌────────────────┐
           │   Ollama       │
           │ Llama 3.1 8B   │
           └───────┬────────┘
                   ▼
           ┌────────────────┐
           │   Web UI       │
           │  (streaming +  │
           │   citations)   │
           └────────────────┘
</pre>

## Key Design Decisions

**Hybrid search was non-negotiable.** Pure vector search fails on precise queries like "deployment playbook for v3.2" where exact keyword matching matters. The BM25 fallback catches these without needing a separate Elasticsearch cluster.

**Section-aware chunking** preserved document structure. Instead of splitting at arbitrary token boundaries (which often cuts mid-sentence), we parsed the document hierarchy and kept sections intact. This improved retrieval precision by roughly 20% in our A/B tests.

**Access control at query time**, not ingestion time. Rather than duplicating the vector store per permission group, we applied metadata filters during retrieval. This kept infrastructure simple while maintaining security.

## The Results

| Metric | Before | After |
|---|---|---|
| Avg. search time | 4-5 min | 45 sec |
| Query latency | N/A (just search) | 200ms |
| Document retrieval | <50% relevant | 85% relevant |
| Employee satisfaction | 3.2/5 | 4.6/5 |

The system has been in production for 6 months with zero downtime. The client is now expanding the pipeline to process customer support tickets and automatically generate draft responses.
