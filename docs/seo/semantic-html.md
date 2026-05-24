# Semantic HTML & Structured Content

## Philosophy

Semantic HTML is the foundation of SEO. Proper markup ensures search engines, screen readers, and other tools understand the content hierarchy and meaning.

## HTML Structure Rules

### Page Shell
```html
<body>
  <a href="#main-content" class="skip-link">Skip to main content</a>

  <header role="banner">
    <nav aria-label="Main navigation">...</nav>
  </header>

  <main id="main-content">
    <article>  <!-- or <section> for non-article pages -->
      ...
    </article>
  </main>

  <footer role="contentinfo">...</footer>
</body>
```

### Blog Post
```html
<article itemscope itemtype="https://schema.org/TechArticle">
  <header>
    <h1 itemprop="headline">Post Title</h1>
    <p class="metadata">
      <time itemprop="datePublished" datetime="2026-03-17">March 17, 2026</time>
      <span itemprop="author">Daniel Kliewer</span>
      <span>12 min read</span>
    </p>
  </header>

  <section itemprop="articleBody">
    <h2 id="section-1">Section Heading</h2>
    <p>Content...</p>

    <h3 id="subsection-1">Subsection Heading</h3>
    <p>Content...</p>

    <pre><code class="language-typescript">code here</code></pre>

    <blockquote cite="https://...">
      <p>Quote text</p>
    </blockquote>

    <figure>
      <img src="/images/diagram.png" alt="Architecture diagram showing RAG pipeline" />
      <figcaption>Figure 1: RAG system architecture</figcaption>
    </figure>
  </section>

  <footer>
    <p>Tags: <a href="/blog?tag=rag" rel="tag">RAG</a>, ...</p>
  </footer>
</article>
```

## Heading Rules

- **Exactly one `<h1>`** per page, matching the primary topic
- **`<h2>`** for major sections
- **`<h3>`** for subsections within H2 sections
- **`<h4>`** for detailed breakdowns (rare)
- No skipping levels (H1 → H3 is invalid)
- Headings contain keywords naturally
- Headings are descriptive, not generic ("Results" not "What we found")

## Image Rules

```html
<!-- Every image needs alt text -->
<img
  src="/images/rag-architecture.png"
  alt="RAG system architecture diagram showing document ingestion, embedding, retrieval, and generation pipeline"
  loading="lazy"
  decoding="async"
/>

<!-- Decorative images get empty alt -->
<img
  src="/images/background-pattern.svg"
  alt=""
  aria-hidden="true"
/>
```

## Link Rules

- Link text is descriptive (not "click here" or "read more")
- External links open in new tab with `rel="noopener noreferrer"`
- Same-site links don't open in new tab
- Download links include `download` attribute
- Navigation links use `<nav>` with `aria-label`

## Form Markup

```html
<form action="/api/contact" method="POST" novalidate>
  <div class="form-field">
    <label for="name">Full Name</label>
    <input
      type="text"
      id="name"
      name="name"
      required
      minlength="2"
      aria-describedby="name-hint"
    />
    <p id="name-hint" class="hint">At least 2 characters</p>
    <p class="error" role="alert" aria-live="polite"></p>
  </div>
</form>
```

## Lists

- Navigation: `<ul>` with `<li>` (always)
- Feature lists: `<ul>` with `<li>`
- Process steps: `<ol>` with `<li>`
- Tags: `<ul>` with `<li>` (inline)
- No `<br>` for layout spacing

## Tables

- Use for data only (not layout)
- Include `<thead>`, `<tbody>`, `<th>` with `scope`
- Responsive: horizontal scroll or card transform on mobile
- `<caption>` for table description

## Code Blocks

- `<pre>` wraps `<code>` for multi-line code
- `<code>` for inline code
- `<pre>` has role="none" (it's presentational)
- Language class on `<code>` for syntax highlighting

## Performance of Semantic HTML

Semantic HTML improves:
- **SEO:** Better content understanding → better rankings
- **Accessibility:** Screen readers navigate correctly
- **Core Web Vitals:** Lower CLS (proper image dimensions), faster FCP (optimized loading)
- **Maintainability:** Clear structure for developers
