# Lab Page Specification

## Purpose

Showcase experimental AI systems and interactive demos. The lab is proof that we build real, working AI systems — not just write about them. It's the most technically impressive page on the site.

## Target Audience

- Technical visitors who want to see working AI
- Prospective clients evaluating technical capability
- Community/peer audience interested in novel implementations
- Recruiters and technical screeners

## Conversion Goals

| Goal | Metric |
|---|---|
| Demonstrate technical capability | Time spent in lab |
| Drive consulting interest | Click-through to services/contact |
| Newsletter signup (if impressed) | Email capture |
| Social sharing | Share clicks |

## Layout Hierarchy

```
┌─────────────────────────────────────────────────┐
│  NAV                                               │
├─────────────────────────────────────────────────┤
│                                                   │
│  HERO                                              │
│  "Lab"                                             │
│  "Experimental AI systems. Working prototypes.     │
│   Proof of concept."                              │
│                                                   │
├─ ACTIVE EXPERIMENTS ─────────────────────────────┤
│  Featured interactive demos:                       │
│                                                   │
│  ┌─────────────────────────────────────────────┐  │
│  │  Knowledge Graph Explorer                    │  │
│  │  Interactive 3D visualization of blog       │  │
│  │  content relationships (react-force-graph)  │  │
│  │  [Launch →]                                 │  │
│  └─────────────────────────────────────────────┘  │
│                                                   │
│  ┌─────────────────────────────────────────────┐  │
│  │  AI Chat Sandbox                            │  │
│  │  Chat with the blog content via local LLM   │  │
│  │  (RAG over all posts)                       │  │
│  │  [Launch →]                                 │  │
│  └─────────────────────────────────────────────┘  │
│                                                   │
│  ┌─────────────────────────────────────────────┐  │
│  │  Architecture Explorer                       │  │
│  │  Interactive system architecture diagrams    │  │
│  │  Explore how different AI systems connect    │  │
│  │  [Launch →]                                  │  │
│  └─────────────────────────────────────────────┘  │
│                                                   │
├─ EXPERIMENT LOG ────────────────────────────────┤
│  Blog-style updates about lab experiments:        │
│  - What I'm building                              │
│  - Technical decisions                           │
│  - Lessons learned                               │
│  - Open-source releases                          │
│                                                   │
├─ OPEN SOURCE ────────────────────────────────────┤
│  Links to GitHub repos associated with lab         │
│  projects.                                        │
│  "All lab projects are open source."              │
│                                                   │
├─ NOTE ───────────────────────────────────────────┤
│  "The lab is a living space. Some experiments      │
│   work perfectly. Some are works in progress.      │
│   All are real."                                  │
│                                                   │
├─ FINAL CTA ──────────────────────────────────────┤
│  "Want a custom experiment for your team?"        │
│  [Book a Free Consultation]                        │
│                                                   │
├─ FOOTER ──────────────────────────────────────────┤
└─────────────────────────────────────────────────┘
```

## Individual Experiment Pages

Each experiment has its own page under `/lab/[slug]`:

```
┌─────────────────────────────────────────────────┐
│  Full-screen (or near full-screen) interactive   │
│  demo                                             │
│                                                   │
│  Sidebar/Overlay with:                            │
│  - Description                                   │
│  - Tech stack used                               │
│  - "How it works" explanation                    │
│  - GitHub link                                   │
│  - Related blog post                             │
└─────────────────────────────────────────────────┘
```

## Experiment: Knowledge Graph Explorer

- **Technology:** react-force-graph-3d, Three.js, custom backend
- **Data:** Blog posts as nodes, tag/category relationships as edges
- **Interaction:** Drag, zoom, click nodes to open posts
- **Performance:** Lazy load, GPU-accelerated, mobile fallback to 2D
- **Design:** Dark background with glowing node colors by category

## Experiment: AI Chat Sandbox

- **Technology:** Vercel AI SDK, Ollama (or API fallback), RAG pipeline over blog content
- **Interaction:** Chat interface with blog-aware responses
- **Features:** Show sources, streaming responses, persona selection (optional)
- **Fallback:** If LLM is unavailable, show informative message with explanation of the architecture instead
- **Rate limiting:** Prevent abuse

## Experiment: Architecture Explorer

- **Technology:** ReactFlow or custom SVG diagrams
- **Content:** Pre-built system architecture diagrams
- **Interaction:** Pan, zoom, click components for details
- **Purpose:** Educational tool for understanding AI system architecture

## SEO Targets

- **Title:** "Lab — Experimental AI Systems & Interactive Demos"
- **Description:** "Interactive AI demos and experimental systems. Explore knowledge graphs, chat with RAG-powered AI, and view system architectures."
- **Note:** Lab pages are rich for schema.org with `WebApplication` type

## Mobile Behavior

- Knowledge graph: Fallback to 2D canvas (too heavy for 3D on mobile)
- Chat sandbox: Full-screen on mobile, keyboard-friendly
- Architecture explorer: Touch-optimized pan/zoom
- Experiment cards stack vertically
- Demos that can't work on mobile should clearly state "Best experienced on desktop" with a screenshot fallback
