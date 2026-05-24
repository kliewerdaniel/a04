---
title: "AI Workflow Automation Pipeline"
client: "B2B SaaS Startup"
slug: "ai-workflow-automation"
timeline: "6 weeks"
role: "AI Systems Engineer"
technologies:
  - CrewAI
  - Ollama
  - Python
  - PostgreSQL
  - Docker
metrics:
  - value: "85%"
    label: "Manual work reduced"
  - value: "10x"
    label: "Throughput increase"
  - value: "3"
    label: "Days to deploy initial prototype"
description: "Designed and deployed a multi-agent automation pipeline that reduced manual processing by 85%."
featured: true
---

## The Challenge

A B2B SaaS startup was drowning in manual operations. Their customer onboarding process required 12 distinct steps — data migration, configuration validation, access provisioning, documentation generation — each handled by a different team member. A single onboarding averaged 6-8 hours of human labor, and with 30+ new customers per month, the process was becoming the bottleneck to growth.

The CEO had tried off-the-shelf RPA tools, but they were brittle — any change to the SaaS platform's UI broke the automations. They needed something adaptive, not scripted.

## The Approach

We built a multi-agent orchestration system using CrewAI, running entirely on their existing infrastructure with local LLMs via Ollama.

**Agent Architecture**
- **Orchestrator Agent** — Receives the new customer intake form, decomposes it into sub-tasks, and monitors execution
- **Migration Agent** — Extracts data from legacy formats, transforms schemas, validates integrity
- **Config Agent** — Provisions tenant configuration based on product tier and feature flags
- **Access Agent** — Creates user accounts, sets RBAC roles, sends welcome credentials
- **Docs Agent** — Generates customized onboarding documentation from templates
- **Quality Agent** — Reviews all outputs, runs validation checks, flags anomalies

**Execution Flow**
<pre style="background:hsl(var(--muted));padding:1rem;border-radius:0.5rem;font-size:0.8125rem;overflow-x:auto">
Intake Form
    │
    ▼
Orchestrator ──┬──→ Migration Agent → Validate Schema
               │──→ Config Agent    → Provision Tenant
               │──→ Access Agent    → Create Users
               │──→ Docs Agent      → Generate Docs
               │
               ▼
           Quality Agent
               │
         ┌─────┴─────┐
         │           │
       Pass        Fail
         │           │
         ▼           ▼
    Notify CEO   Flag for Review
</pre>

**Key Implementation Details**

**Task decomposition** was the hardest part. Rather than hardcoding a linear workflow, we designed the orchestrator to dynamically plan and re-plan based on agent outputs. If the migration agent reported schema conflicts, the orchestrator would pause, gather more information from the human operator, and retry — no code changes needed.

**Local LLM reliability** required careful prompt engineering. Each agent had a structured system prompt with explicit output schemas (JSON with validation rules). We found that smaller models (8B-14B) were sufficient for individual sub-tasks when given clear instructions and examples, while the orchestrator needed a larger model (30B+) for planning.

**Human-in-the-loop** was preserved for critical paths. Financial provisioning and access to production data required a manual approval step, which was implemented as a simple "approve/reject" button in a dashboard.

## The Results

The pipeline processes a new customer onboarding in roughly 20 minutes of wall-clock time, down from 6-8 hours. The human operator now reviews and approves rather than executing.

Within 3 months, the system handled 120+ onboardings with only 3 escalation events — each caused by genuinely novel edge cases that the training data hadn't covered.

The startup is now expanding the system to handle their offboarding, billing adjustments, and compliance reporting workflows.
