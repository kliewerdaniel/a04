# Design Principles

## Core Principles

### 1. Content is the Interface

The design exists to make content readable, scannable, and credible. Decorative elements never compete with content.

- Typography carries the brand voice
- Whitespace directs attention
- Color is reserved for meaning
- Motion explains relationships

### 2. Technical Elegance

The site should look like it was built by a skilled engineer who also cares about design. Not like a designer who learned to code.

- Clean, precise spacing
- Information-dense layouts
- Code blocks as design elements
- Architecture diagrams as visual content
- No "designer-y" flourishes that add no information

### 3. Cinematic Restraint

Borrow from cinema: dramatic when appropriate, invisible when not.

- Dark backgrounds create depth
- Hero sections have a "stage" feel
- Scroll reveals content like a story unfolding
- Motion is used for reveal and emphasis, not decoration
- Every page has a clear focal point

### 4. Premium Minimalism

Fewer elements, higher quality. Every element earns its place.

- Remove everything that doesn't serve the content or conversion goals
- Border-radius: subtle (0.5rem) — not pill-shaped, not square
- Shadows: deep and dark, not colored or spread
- Glassmorphism: used only for overlay/premium elements, sparingly
- No gratuitous gradients

### 5. Dark-First, Light-Always

Dark mode is the premium experience. Light mode is a first-class accessible alternative.

- Dark mode designed first
- Light mode adapts the same hierarchy and spacing
- Both themes undergo contrast testing
- Theme switching is smooth and preserves all design quality

### 6. Motion with Purpose

If motion doesn't serve understanding, emphasis, or feedback, it doesn't exist.

- Entrance animations guide attention
- Hover effects confirm interactivity
- Scroll reveals make content feel substantial
- Page transitions signal navigation
- No looping decorative animations

### 7. Mobile as First Constraint

Design for the smallest screen first, then expand.

- Single column is the default
- Touch targets minimum 44px
- No hover-dependent interactions
- Readable without horizontal scroll
- Performance-critical on mobile connections

## Design Quality Checklist

For every page:

- [ ] Is the primary action obvious within 3 seconds?
- [ ] Can a user understand what we do in 5 seconds?
- [ ] Can the page be read comfortably in light AND dark mode?
- [ ] Is there clear visual hierarchy?
- [ ] Does the page load and render without layout shift?
- [ ] Are all interactive elements focusable and keyboard-navigable?
- [ ] Does the page work at 320px width?
- [ ] Is the page visually consistent with the rest of the site?
- [ ] Is the page beautiful without feeling "designed"?
- [ ] Is there anything that could be removed without losing meaning?
