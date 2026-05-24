# Feature: Knowledge Graph Explorer

## Overview

An interactive 3D visualization of the blog's content ecosystem. Nodes represent blog posts, edges represent shared tags and categories. This feature demonstrates AI-native thinking by visualizing the relationships between ideas.

## Technical Implementation

- **Library:** react-force-graph-3d (Three.js wrapper)
- **Data:** Pre-computed at build time from blog content
- **Rendering:** WebGL via Three.js
- **Fallback:** 2D canvas for mobile / low-end devices

## Data Model

```typescript
interface GraphNode {
  id: string // post slug
  label: string // post title (truncated)
  category: string // post category
  val: number // node size (based on connections)
  color: string // derived from category
  url: string // link to post
}

interface GraphEdge {
  source: string
  target: string
  label?: string // shared tag name
  weight: number // number of shared tags
}
```

## Interaction

- **Drag:** Move nodes
- **Zoom:** Scroll to zoom
- **Click:** Open post in new tab or expand details
- **Hover:** Highlight connected nodes
- **Category filter:** Toggle visibility by category

## Performance

- Lazy loaded (dynamic import, not in initial bundle)
- GPU-accelerated (WebGL)
- Node count: ~120 (blog posts)
- Target: 60fps on desktop, 30fps on mobile (2D fallback)
- Memory: <100MB for graph data

## Mobile Behavior

- Force 2D rendering (better performance)
- Touch-optimized: tap to select, pinch to zoom
- Simplified UI: full-screen mode, back button
- Message: "Best experienced on desktop" with screenshot fallback
