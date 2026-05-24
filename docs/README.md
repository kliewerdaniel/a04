# a04 — Consultancy Platform Documentation

**Repository:** https://github.com/kliewerdaniel/a01
**Domain:** danielkliewer.com
**Status:** Rebuild in planning

## Purpose

This directory contains the complete architectural, strategic, and implementation documentation for rebuilding danielkliewer.com from a personal AI blog into a commercially viable AI consultancy and product platform.

## What This Site Is

- An AI consultancy platform
- A systems engineering studio
- A local-first AI infrastructure company
- A technical authority platform
- A lead-generation engine
- A monetization platform

## What This Site Is Not

- A simple portfolio
- A resume
- An academic blog
- A generic AI landing page

## Documentation Index

| Directory | Purpose |
|---|---|
| `/architecture` | Next.js App Router structure, data flow, API design, MDX/CMS, deployment |
| `/branding` | Brand positioning, voice & tone, visual identity |
| `/components` | Reusable component system — props, variants, animations |
| `/content-strategy` | Blog organization, pillar pages, lead magnets, newsletter |
| `/conversion` | Lead generation, consultation flows, CRM, email workflows |
| `/copywriting` | Page-level copy frameworks, tone principles, CTA language |
| `/design-system` | Typography, spacing, color, animation, dark mode, breakpoints |
| `/development` | Setup, workflow, testing, code conventions |
| `/features` | Lead gen, knowledge graph, AI chat, search |
| `/implementation` | Phased build roadmap (6 phases) |
| `/marketing` | SEO, content marketing, social proof, launch |
| `/monetization` | Consulting, digital products, courses, pricing, upsell |
| `/pages` | Per-page specs: purpose, layout, CTAs, copy, SEO |
| `/performance` | Budgets, optimization, monitoring |
| `/seo` | Metadata, schema, OpenGraph, sitemap, keyword strategy |
| `/services` | Service definitions: knowledge systems, automation, AI websites, local AI, content pipelines |
| `/technical` | Stack decisions, state management, form handling, analytics |
| `/user-flows` | Visitor journeys: lead conversion, booking, purchase, reading |
| `/visual-direction` | Design principles, cinematic aesthetic, motion language |

## Before Building

Read these root documents first:

1. **PRODUCT_VISION.md** — What we're building and why
2. **BRAND_POSITIONING.md** — Who we are and how we speak
3. **SITE_STRATEGY.md** — How the site achieves business goals
4. **MONETIZATION_STRATEGY.md** — How the site makes money
5. **DEVELOPMENT_ROADMAP.md** — How we build it, phase by phase
6. **docs/pages/homepage.md** — Start here for the page build order

## Stack Summary

| Concern | Choice |
|---|---|
| Framework | Next.js (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS |
| Motion | motion/react (Framer Motion) |
| Components | shadcn/ui (customized) |
| Content | MDX + gray-matter (git-based) |
| Forms | react-hook-form + Zod |
| Icons | lucide-react |
| Theme | next-themes |
| Deployment | Vercel |
| Analytics | Vercel Analytics / PostHog |
| Email | Resend |
| Payments | Stripe / LemonSqueezy |
