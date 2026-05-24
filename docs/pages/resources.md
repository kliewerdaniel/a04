# Resources Page Specification

## Purpose

A central hub for all lead magnets, downloadable content, and free resources. This page converts anonymous traffic into known leads by offering high-value content in exchange for email addresses.

## Target Audience

- Blog readers who want to go deeper on a topic
- Prospective clients evaluating expertise before engaging
- Self-serve learners who want immediate value

## Conversion Goals

| Goal | Metric |
|---|---|
| Email capture | Lead magnet downloads |
| Introduction to consulting | Click-through to services |
| List growth | New subscriber count |

## Layout Hierarchy

```
┌─────────────────────────────────────────────────┐
│  NAV                                               │
├─────────────────────────────────────────────────┤
│                                                   │
│  HERO                                              │
│  "Resources"                                       │
│  "Free guides, templates, and tools for building  │
│   local AI infrastructure."                        │
│                                                   │
├─ FEATURED RESOURCE ──────────────────────────────┤
│  Large card for the primary lead magnet            │
│  [Image/Preview] [Title] [Description]             │
│  "AI Infrastructure Audit Checklist"              │
│  10-point checklist for assessing your AI         │
│  readiness.                                       │
│  [Download Free →] (opens email form)             │
│                                                   │
├─ RESOURCE GRID ───────────────────────────────────┤
│                                                   │
│  ┌──────────────┐  ┌──────────────┐              │
│  │ Free         │  │ $19          │              │
│  │ AI Audit     │  │ Local LLM    │              │
│  │ Checklist    │  │ Deployment   │              │
│  │              │  │ Guide        │              │
│  ├──────────────┤  ├──────────────┤              │
│  │ [Download]   │  │ [Buy Now]    │              │
│  └──────────────┘  └──────────────┘              │
│                                                   │
│  ┌──────────────┐  ┌──────────────┐              │
│  │ $29          │  │ $97          │              │
│  │ Prompt       │  │ RAG Starter  │              │
│  │ Toolkit      │  │ Kit          │              │
│  ├──────────────┤  ├──────────────┤              │
│  │ [Buy Now]    │  │ [Buy Now]    │              │
│  └──────────────┘  └──────────────┘              │
│                                                   │
├─ NEWSLETTER SECTION ─────────────────────────────┤
│  "Get new resources delivered to your inbox."      │
│  Email input + Subscribe button                    │
│  "No spam. Unsubscribe anytime."                   │
│                                                   │
├─ FOOTER ──────────────────────────────────────────┤
└─────────────────────────────────────────────────┘
```

## Resource Card Variations

### Free Resource (Lead Magnet)
- **Visual:** Preview image or icon
- **Badge:** "Free" in green/success color
- **CTA:** "Download Free" → email form → direct download
- **Email required:** Yes

### Paid Resource
- **Visual:** Product mockup or cover image
- **Badge:** Price displayed
- **CTA:** "Buy Now" → /shop/[slug] or direct checkout
- **Email required:** For delivery only

## Resource Categories

| Category | Examples | Price |
|---|---|---|
| Checklists & Assessments | AI Audit Checklist, Readiness Scorecard | Free |
| Guides & eBooks | Local LLM Deployment Guide, RAG Architecture Guide | $19–$47 |
| Templates | Prompt Engineering Toolkit, AI Workflow Templates | $29–$39 |
| Code & Boilerplates | RAG Starter Kit, Agent Architecture Blueprint | $97–$197 |
| Bundles | Complete AI Toolkit (everything above) | $397 |

## Lead Magnet Delivery Flow

1. User clicks "Download Free" on a resource
2. Modal or inline email form appears (name + email)
3. User submits
4. Email sent via Resend with download link
5. User redirected to thank-you page with download link
6. User added to email list (with resource tag for segmentation)

## SEO Targets

- **Primary:** "AI resources", "AI implementation guides"
- **Secondary:** "free AI templates", "RAG starter kit"
- **Title:** "Resources — AI Infrastructure Guides & Tools"
- **Description:** "Free guides, templates, and tools for building local AI infrastructure. Download the AI Audit Checklist, RAG Starter Kit, and more."

## Mobile Behavior

- Resource cards stack in single column
- Featured resource is full-width
- Newsletter section simplified
- Email modals should be full-screen on mobile
