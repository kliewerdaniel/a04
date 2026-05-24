import { searchBlogPosts } from "@/lib/blog-search";

const OLLAMA_URL = process.env.OLLAMA_URL || "http://localhost:11434";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();
    const lastUserMsg = [...messages].reverse().find((m: any) => m.role === "user");

    if (!lastUserMsg) {
      return Response.json({ error: "No user message found" }, { status: 400 });
    }

    const query = (lastUserMsg.content as string).trim();
    if (!query) {
      return Response.json({ error: "Message is empty" }, { status: 400 });
    }

    const relevantPosts = searchBlogPosts(query, 5);
    const context = relevantPosts
      .map(
        (p, i) =>
          `[${i + 1}] "${p.title}"\n${p.excerpt}`
      )
      .join("\n\n");

    const prompt = `You are a technical AI consultant answering questions about blog content. Answer clearly and cite specific sources using [1], [2], etc.

Context from blog posts:
${context || "(No directly relevant posts found.)"}

Question: ${query}

Answer based on the context above. If the context doesn't contain enough information, say so and offer general guidance.`;

    const ollamaBody = JSON.stringify({
      model: process.env.OLLAMA_MODEL || "llama3.1:8b",
      prompt,
      stream: true,
    });

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    try {
      const ollamaRes = await fetch(`${OLLAMA_URL}/api/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: ollamaBody,
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (!ollamaRes.ok) throw new Error(`Ollama returned ${ollamaRes.status}`);

      const stream = new ReadableStream({
        async start(controller) {
          const reader = ollamaRes.body!.getReader();
          const decoder = new TextDecoder();
          let buffer = "";

          try {
            while (true) {
              const { done, value } = await reader.read();
              if (done) break;

              buffer += decoder.decode(value, { stream: true });
              const lines = buffer.split("\n");
              buffer = lines.pop() || "";

              for (const line of lines) {
                if (!line.trim()) continue;
                try {
                  const parsed = JSON.parse(line);
                  if (parsed.response) {
                    controller.enqueue(
                      new TextEncoder().encode(
                        `data: ${JSON.stringify({ content: parsed.response })}\n\n`
                      )
                    );
                  }
                } catch {}
              }
            }
          } finally {
            reader.releaseLock();
          }

          controller.enqueue(
            new TextEncoder().encode(
              `data: ${JSON.stringify({ sources: relevantPosts.map((p) => ({ title: p.title, slug: p.slug })) })}\n\n`
            )
          );
          controller.close();
        },
      });

      return new Response(stream, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        },
      });
    } catch {
      clearTimeout(timeout);

      const fallbackResponse = generateFallbackResponse(query, relevantPosts);
      const enc = new TextEncoder();
      const stream = new ReadableStream({
        async start(controller) {
          const words = fallbackResponse.split(/(?<=\s)/);
          for (const word of words) {
            controller.enqueue(
              enc.encode(`data: ${JSON.stringify({ content: word })}\n\n`)
            );
            await new Promise((r) => setTimeout(r, 15));
          }
          controller.enqueue(
            enc.encode(
              `data: ${JSON.stringify({ sources: relevantPosts.map((p) => ({ title: p.title, slug: p.slug })) })}\n\n`
            )
          );
          controller.close();
        },
      });

      return new Response(stream, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        },
      });
    }
  } catch (error) {
    console.error("Chat API error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

function generateFallbackResponse(query: string, posts: { title: string; slug: string }[]): string {
  if (posts.length === 0) {
    return `I couldn't find any blog posts directly related to "${query}". Try asking about AI systems, local LLMs, RAG architectures, knowledge graphs, agent frameworks, or AI infrastructure topics.`;
  }

  const titles = posts.map((p) => `"${p.title}"`).join(", ");
  return `Based on the blog content, I found ${posts.length} relevant post${posts.length > 1 ? "s" : ""}: ${titles}. The blog covers topics like sovereign AI systems, local-first architectures, RAG implementations, knowledge graphs, agent frameworks, and practical deployment guides. For a complete answer on "${query}", I'd recommend reviewing these posts in detail — they contain technical walkthroughs, architecture diagrams, and production considerations.`;
}
