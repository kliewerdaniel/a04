---
title: "Local LLM Infrastructure"
client: "Healthcare Tech Company"
slug: "local-llm-infrastructure"
timeline: "4 months"
role: "Infrastructure Architect"
technologies:
  - vLLM
  - Docker
  - Kubernetes
  - NVIDIA
  - Prometheus
  - Grafana
metrics:
  - value: "100%"
    label: "Data privacy"
  - value: "4"
    label: "Models deployed"
  - value: "Zero"
    label: "Cloud dependencies"
description: "Deployed a fully air-gapped LLM infrastructure for processing sensitive healthcare data."
featured: false
---

## The Challenge

A healthcare technology company processing protected health information (PHI) needed AI capabilities — summarization of clinical notes, automated ICD-10 coding suggestions, and a question-answering system over their medical knowledge base — but with an absolute requirement: **zero data could leave their network**.

HIPAA compliance meant no cloud AI APIs, no SaaS embeddings services, nothing that touched the public internet. They also required audit logging for every inference request and the ability to reproduce any model output on demand.

Previous attempts with on-premise model serving had failed — the engineers had tried running raw Hugging Face models behind Flask APIs and run into reliability, latency, and memory management issues.

## The Approach

We deployed a production-grade LLM serving infrastructure on their existing Kubernetes cluster, fully air-gapped.

**Hardware**
- 4× NVIDIA A100 80GB nodes in an on-prem Dell PowerEdge cluster
- NVMe storage for model weights and KV cache
- 100GbE InfiniBand interconnect between GPU nodes

**Serving Stack**
- **vLLM** for model serving — PagedAttention for efficient KV cache management, continuous batching for throughput
- **4 models deployed:**
  1. `Llama 3.1 70B` — Primary model for clinical note summarization
  2. `Mistral 7B` — Lightweight model for ICD-10 code suggestions (lower latency)
  3. `nomic-embed-text` — Embedding model for retrieval over medical knowledge base
  4. `Qwen 2.5 32B` — QA model with function calling for structured data queries

**Infrastructure**
<pre style="background:hsl(var(--muted));padding:1rem;border-radius:0.5rem;font-size:0.8125rem;overflow-x:auto">
┌─────────────────────────────────────────────┐
│              Air-Gapped Network               │
│                                              │
│  ┌──────────┐   ┌──────────┐   ┌──────────┐ │
│  │  vLLM    │   │  vLLM    │   │  vLLM    │ │
│  │ Llama 70B│   │ Mistral 7│   │ Qwen 32B │ │
│  ├──────────┤   ├──────────┤   ├──────────┤ │
│  │ GPU Pod 1│   │ GPU Pod 2│   │ GPU Pod 3│ │
│  └──────────┘   └──────────┘   └──────────┘ │
│        │              │              │        │
│        └──────────────┼──────────────┘        │
│                       ▼                        │
│              ┌────────────────┐                │
│              │   K8s Ingress  │                │
│              │  (internal TLS)│                │
│              └───────┬────────┘                │
│                      │                         │
│              ┌───────┴────────┐                │
│              │  Internal Apps │                │
│              └────────────────┘                │
└─────────────────────────────────────────────┘
</pre>

**Observability**
- Prometheus metrics for: tokens/sec, request latency (P50/P95/P99), GPU utilization, KV cache hit rate, queue depth
- Grafana dashboards for operations team with alerting on model degradation
- Every inference request logged to immutable audit store with input hash, model output, and timing

**Security**
- All model weights loaded from internal registry — no outbound connections
- Request payloads encrypted in transit via internal mTLS
- GPU memory zeroed between model reloads
- Weekly vulnerability scanning of base images

## The Results

The system has been serving production traffic for 8 months. Key metrics:

| Metric | Value |
|---|---|
| Uptime | 99.97% |
| Llama 70B throughput | 2,400 tokens/sec (batch) |
| Mistral 7B P50 latency | 120ms |
| Audit log completeness | 100% |
| Compliance findings | Zero |

The client's CISO has used this deployment as a reference architecture for their broader HIPAA compliance program. The team is now adding a fine-tuning pipeline using QLoRA on their domain-specific clinical data.
