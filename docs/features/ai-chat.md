# Feature: AI Chat Sandbox

## Overview

A RAG-powered chat interface that answers questions about the blog content. Demonstrates local-first AI by using the blog's own content as a knowledge base.

## Technical Implementation

- **Frontend:** Custom chat UI (React, streaming)
- **AI SDK:** Vercel AI SDK for streaming responses
- **LLM:** Ollama (local) or API fallback (OpenRouter)
- **RAG:** Embed blog posts, retrieve relevant chunks, generate answers
- **Streaming:** Server-Sent Events for real-time response display

## Architecture

```
User Message → API Route → Embed query → Vector search blog content →
Retrieve top-K chunks → Build prompt → LLM generate → Stream response
                                                              │
                                                              ▼
                                                     Source citations
                                                     in response
```

## UI Components

### Chat Interface
- Message list (user + AI alternating)
- Input field with send button
- Loading indicator during generation
- Source citations (linked to blog posts)
- Copy response button

### States
- **Idle:** Welcome message + suggested questions
- **Loading:** Typing indicator, shimmer animation
- **Streaming:** Text appears character by character
- **Complete:** Full response with source citations
- **Error:** "Something went wrong" + retry button
- **Empty:** Prompt for first message

## Rate Limiting

| Limit | Scope |
|---|---|
| 10 messages per hour | Per IP |
| 100 messages per day | Per IP |
| 1000 tokens per response | Max length |

## Fallback Behavior

When LLM is unavailable:
1. Show informative message: "The AI sandbox is currently offline. Here's how it works..."
2. Display the architecture diagram of the system
3. Link to relevant blog posts about the technology

## Privacy

- No chat history stored server-side
- No messages used for training
- No PII collected through chat
- Session-based, ephemeral
