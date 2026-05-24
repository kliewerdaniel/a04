export const SITE_NAME = "Daniel Kliewer";
export const SITE_TAGLINE = "AI Infrastructure & Systems Engineering";
export const SITE_DESCRIPTION =
  "Local AI infrastructure for organizations that own their stack. Consulting, architecture, and production systems for private AI deployment.";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://danielkliewer.com";

export const SOCIAL = {
  github: "https://github.com/kliewerdaniel",
  twitter: "https://twitter.com/kliewerdaniel",
  linkedin: "https://linkedin.com/in/kliewerdaniel",
} as const;

export const NAV_ITEMS = [
  { label: "Services", href: "/services" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Blog", href: "/blog" },
  { label: "Lab", href: "/lab" },
  { label: "About", href: "/about" },
] as const;

export const SERVICES = [
  {
    title: "AI Knowledge Systems",
    description:
      "Custom RAG, knowledge graphs, and document intelligence pipelines that keep your data private.",
    icon: "Brain",
    price: "$5k–$25k",
    timeline: "2–8 weeks",
    href: "/services#knowledge-systems",
    features: [
      "Custom architecture design",
      "Production-ready deployment",
      "Documentation & training",
      "30-day support",
    ],
  },
  {
    title: "Workflow Automation",
    description:
      "Multi-step AI agents and automation pipelines that integrate with your existing stack.",
    icon: "Workflow",
    price: "$2k–$15k",
    timeline: "1–6 weeks",
    href: "/services#automation",
    features: [
      "Custom agent development",
      "API integrations",
      "Monitoring dashboard",
      "Error handling & retry logic",
    ],
  },
  {
    title: "Local AI Deployment",
    description:
      "On-premise LLMs, private inference, and secure AI infrastructure. Your data never leaves your control.",
    icon: "Server",
    price: "$2k–$10k",
    timeline: "1–4 weeks",
    href: "/services#local-ai",
    features: [
      "Model serving infrastructure",
      "API endpoint setup",
      "Monitoring & alerting",
      "Deployment runbook",
    ],
  },
  {
    title: "AI-Powered Websites",
    description:
      "Intelligent web applications with AI at the architecture level, not bolted on.",
    icon: "Globe",
    price: "$3k–$10k",
    timeline: "2–4 weeks",
    href: "/services#ai-websites",
    features: [
      "Full-stack development",
      "AI integration",
      "Responsive design",
      "Performance optimization",
    ],
  },
  {
    title: "Content & Research Pipelines",
    description:
      "Automated content generation, research analysis, and data pipeline systems.",
    icon: "FileText",
    price: "$1k–$8k",
    timeline: "1–4 weeks",
    href: "/services#content-pipelines",
    features: [
      "Automated pipeline setup",
      "Content templates",
      "Publishing integrations",
      "Quality metrics dashboard",
    ],
  },
] as const;

export const METRICS = [
  { value: "120+", label: "Technical articles" },
  { value: "20+", label: "Projects delivered" },
  { value: "3+", label: "Years in AI" },
  { value: "60%", label: "Avg. efficiency gain", prefix: "", suffix: "%" },
] as const;

export const CASE_STUDIES = [
  {
    title: "Enterprise Knowledge System",
    client: "Anonymous SaaS Company",
    slug: "enterprise-knowledge-system",
    metrics: [
      { value: "60%", label: "Faster retrieval" },
      { value: "50k", label: "Documents indexed" },
      { value: "200ms", label: "Query latency" },
    ],
    technologies: ["Ollama", "RAG", "LangChain"],
    description:
      "Built a private knowledge retrieval system that processed 50k documents with 200ms average latency.",
    featured: true,
  },
  {
    title: "AI Workflow Automation Pipeline",
    client: "B2B SaaS Startup",
    slug: "ai-workflow-automation",
    metrics: [
      { value: "85%", label: "Manual work reduced" },
      { value: "10x", label: "Throughput increase" },
      { value: "3", label: "Days to deploy" },
    ],
    technologies: ["CrewAI", "Ollama", "Python"],
    description:
      "Designed and deployed a multi-agent automation pipeline that reduced manual processing by 85%.",
    featured: true,
  },
  {
    title: "Local LLM Infrastructure",
    client: "Healthcare Tech Company",
    slug: "local-llm-infrastructure",
    metrics: [
      { value: "100%", label: "Data privacy" },
      { value: "4", label: "Models deployed" },
      { value: "Zero", label: "Cloud dependencies" },
    ],
    technologies: ["vLLM", "Docker", "Kubernetes"],
    description:
      "Deployed a fully air-gapped LLM infrastructure for processing sensitive healthcare data.",
    featured: false,
  },
] as const;
