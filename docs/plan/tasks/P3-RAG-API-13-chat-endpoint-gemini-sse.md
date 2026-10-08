---
id: P3-RAG-API-13
title: Chat endpoint POST /api/chat with Gemini + SSE streaming
category: RAG-API
priority: P3
estimate_hours: 4
depends_on: [P3-RAG-API-12, P2-RAG-API-04]
blocks: [P3-RAG-UI-01]
status: pending
---

# P3-RAG-API-13 — Chat endpoint SSE

## Context

Add generation layer. Server-Sent Events stream Gemini 2.0 Flash tokens to the client. Guard rails from P3-RAG-API-12 wrap each call. Temperature 0.3, max output 300 tokens.

**References:**
- `docs/plan/rag-architecture.md` § v2 Endpoint POST /api/chat (SSE)

## Inputs

**Files to read:**
- `rag-api/src/main/java/dev/ohmar/rag/generation/GuardRails.java` (post P3-RAG-API-12)
- `rag-api/src/main/java/dev/ohmar/rag/embedding/EmbeddingAdapter.java`

## Outputs

**Files to create:**
- `rag-api/src/main/java/dev/ohmar/rag/generation/ChatController.java`
- `rag-api/src/main/java/dev/ohmar/rag/generation/ChatService.java`
- `rag-api/src/main/java/dev/ohmar/rag/generation/ChatRequest.java` + `ChatMessage.java`
- `rag-api/src/main/java/dev/ohmar/rag/generation/GeminiClient.java` — thin wrapper

## Implementation steps

1. `ChatController.java` with WebFlux `Flux<ServerSentEvent<?>>` return type:
   ```java
   @PostMapping(value = "/api/chat", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
   public Flux<ServerSentEvent<?>> chat(@RequestBody ChatRequest req, ServerHttpRequest http) {
     return chatService.chat(req, hashIp(http));
   }
   ```
2. `ChatService.chat()`:
   - Embed query → retrieve top-5 chunks.
   - GuardRails evaluate.
   - If not proceed: emit single `event: token data: {canned}` + `event: done`.
   - If proceed: PromptComposer builds prompt → GeminiClient.streamGenerate(prompt) → map to SSE tokens.
   - After stream completes, emit `event: sources data: {...}` + `event: done data: {latencyMs, tokensInput, tokensOutput, model}`.
   - Save to chat_logs (via P3-RAG-API-14 repo).
3. `GeminiClient.java`: WebClient-based client calling Gemini REST API with streaming. Model `gemini-2.0-flash`, temperature 0.3, max output 300.
4. Add specific rate limit: 5 req/min per IP (half of search). Config in RateLimitConfig.
5. No commit.

## Verification

```bash
cd rag-api && mvn test -Dtest=ChatServiceTest
# expected: tests pass with mocked GeminiClient
# Integration (with GOOGLE_API_KEY):
curl -s -N -X POST http://localhost:8080/api/chat \
  -H 'Content-Type: application/json' \
  -d '{"message":"what is omars stack?"}'
# expected: SSE stream of tokens, then source + done events
```

## Non-goals

- Do NOT add claim detector here (P3-RAG-API-15).
- Do NOT commit.

## Open questions

- Confirm Gemini model name. If `gemini-2.0-flash` is deprecated at execution time, use latest stable Flash model and record in a comment.
