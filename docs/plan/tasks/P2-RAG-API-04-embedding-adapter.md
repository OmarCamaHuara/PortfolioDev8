---
id: P2-RAG-API-04
title: Embedding adapter (Spring AI + Google text-embedding-004)
category: RAG-API
priority: P2
estimate_hours: 2
depends_on: [P2-RAG-API-01]
blocks: [P2-RAG-API-03, P2-RAG-API-05]
status: pending
---

# P2-RAG-API-04 — Embedding adapter

## Context

Wrap Spring AI's embedding client around Google's `text-embedding-004` model. 768-dim vectors, consistent with the Flyway schema. Expose a single `embed(String)` method used by both ingestion and retrieval.

**References:**
- `docs/plan/rag-architecture.md` § v1 Stack técnico (Embeddings)
- https://docs.spring.io/spring-ai/reference/api/embeddings.html

## Inputs

**External dependencies:**
- Env var `GOOGLE_API_KEY` (Vertex AI or Generative Language API key)

## Outputs

**Files to create:**
- `rag-api/src/main/java/dev/ohmar/rag/embedding/EmbeddingAdapter.java`
- `rag-api/src/main/java/dev/ohmar/rag/config/EmbeddingConfig.java`

**Files to modify:**
- `rag-api/src/main/resources/application.yml` — add `spring.ai.vertex.ai.embedding.*` config

## Implementation steps

1. `EmbeddingConfig.java`:
   ```java
   @Configuration
   public class EmbeddingConfig {
     @Bean
     public EmbeddingClient embeddingClient(@Value("${google.api.key}") String apiKey) {
       // configure VertexAiEmbeddingClient or whatever Spring AI exposes for text-embedding-004
       return new VertexAiEmbeddingClient(apiKey, "text-embedding-004");
     }
   }
   ```
2. `EmbeddingAdapter.java`:
   ```java
   @Service
   public class EmbeddingAdapter {
     private final EmbeddingClient client;
     public EmbeddingAdapter(EmbeddingClient client) { this.client = client; }
     public float[] embed(String text) {
       EmbeddingResponse r = client.embedForResponse(List.of(text));
       List<Double> values = r.getResults().get(0).getOutput();
       float[] arr = new float[values.size()];
       for (int i = 0; i < values.size(); i++) arr[i] = values.get(i).floatValue();
       return arr;
     }
   }
   ```
3. `application.yml`:
   ```yaml
   google:
     api:
       key: ${GOOGLE_API_KEY:}
   spring:
     ai:
       vertex:
         ai:
           embedding:
             project-id: ${GOOGLE_PROJECT_ID:}
             location: us-central1
             embedding:
               options:
                 model: text-embedding-004
                 dimensions: 768
   ```
4. Unit test: mock `EmbeddingClient`, verify `embed()` returns `float[768]`.
5. No commit.

## Verification

```bash
cd rag-api && mvn test
# expected: EmbeddingAdapterTest passes
# With GOOGLE_API_KEY set:
GOOGLE_API_KEY=... mvn spring-boot:run &
curl -s -X POST http://localhost:8080/internal/test-embed -d '{"text":"hello"}' | jq '.length'
# (only if you add a test endpoint; otherwise unit test is sufficient)
```

## Non-goals

- Do NOT use OpenAI embeddings (768 dims schema is pinned for Google).
- Do NOT cache embeddings in-process yet.
- Do NOT commit.

## Open questions

- Vertex vs. Generative Language API: both expose text-embedding-004. Prefer Generative Language API (free tier more generous for low volume). Confirm env var naming.
