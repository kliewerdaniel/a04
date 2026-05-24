type ProductConfig = {
  variantId: string;
  name: string;
  price: string;
};

const PRODUCTS: Record<string, ProductConfig> = {
  "local-llm-deployment-guide": {
    variantId: process.env.LS_VARIANT_LOCAL_LLM_GUIDE || "",
    name: "Local LLM Deployment Guide",
    price: "$19",
  },
  "prompt-engineering-toolkit": {
    variantId: process.env.LS_VARIANT_PROMPT_TOOLKIT || "",
    name: "Prompt Engineering Toolkit",
    price: "$29",
  },
  "ai-workflow-templates": {
    variantId: process.env.LS_VARIANT_WORKFLOW_TEMPLATES || "",
    name: "AI Workflow Templates",
    price: "$39",
  },
  "rag-starter-kit": {
    variantId: process.env.LS_VARIANT_RAG_KIT || "",
    name: "RAG Starter Kit",
    price: "$97",
  },
  "agent-architecture-blueprint": {
    variantId: process.env.LS_VARIANT_AGENT_BLUEPRINT || "",
    name: "Agent Architecture Blueprint",
    price: "$147",
  },
};

export function getProduct(slug: string): ProductConfig | undefined {
  return PRODUCTS[slug];
}

export function getApiKey(): string | null {
  return process.env.LEMONSQUEEZY_API_KEY || null;
}
