---
id: P2-RAG-API-05
title: Retrieval endpoint POST /api/search with pgvector cosine search
category: RAG-API
priority: P2
estimate_hours: 3
depends_on: [P2-RAG-API-02, P2-RAG-API-04]
blocks: [P2-RAG-UI-01, P2-RAG-API-11]
status: pending
---

# P2-RAG-API-05 — Retrieval endpoint

## Context

HTTP endpoint that embeds the user query, runs cosine similarity against the `chunks` table via pgvector, filters by threshold (0.5 minimum), returns top-K results with snippet.

**References:**
- `docs/plan/rag-architecture.md` § v1 Endpoint POST /api/search

## Inputs

**Files to read:**
- `rag-api/src/main/java/dev/ohmar/rag/embedding/EmbeddingAdapter.java` (post P2-RAG-API-04)
- `rag-api/src/main/java/dev/ohmar/rag/retrieval/ChunkRepository.java` (post P2-RAG-API-03)

## Outputs

**Files to create:**
- `rag-api/src/main/java/dev/ohmar/rag/retrieval/SearchController.java`
- `rag-api/src/main/java/dev/ohmar/rag/retrieval/SearchService.java`
- `rag-api/src/main/java/dev/ohmar/rag/retrieval/SearchRequest.java`
- `rag-api/src/main/java/dev/ohmar/rag/retrieval/SearchResponse.java`
- `rag-api/src/main/java/dev/ohmar/rag/retrieval/SearchResult.java`
- `rag-api/src/main/java/dev/ohmar/rag/retrieval/SearchLogRepository.java` + `SearchLogEntity.java`

## Implementation steps

1. Define request/response DTOs matching the spec in rag-architecture.md.
2. `SearchController.java`:
   ```java
   @RestController
   @RequestMapping("/api/search")
   public class SearchController {
     private final SearchService service;
     @PostMapping
     public SearchResponse search(@RequestBody @Valid SearchRequest req, HttpServletRequest http) {
       return service.search(req, http.getRemoteAddr());
     }
   }
   ```
3. `SearchService.java`:
   - Embed query via EmbeddingAdapter.
   - Query ChunkRepository with native `SELECT ..., embedding <=> ? AS score FROM chunks ORDER BY embedding <=> ? LIMIT ?` (cosine distance; score = 1 - distance).
   - Filter results with score < 0.5 (threshold).
   - Build snippet: first 200 chars of chunk.content + "..." if longer.
   - Save to SearchLogRepository with IP hash (SHA-256 of request IP + salt).
4. SQL via `@Query(nativeQuery=true)`:
   ```sql
   SELECT id, title, url, source_type, lang, content, (1 - (embedding <=> :queryVec)) AS score
   FROM chunks
   WHERE source_type IN (:sourceTypes) OR :sourceTypes IS NULL
   ORDER BY embedding <=> :queryVec
   LIMIT :topK
   ```
5. Default `topK = 5`, max 20.
6. Return `SearchResponse { results, query, latencyMs, tokensUsed }`.
7. No commit.

## Acceptance Criteria

**Scenario: Valid query returns results**
```gherkin
Given the chunks table has at least 10 ingested chunks
When POST /api/search with body {"query":"spring boot"}
Then the response has status 200
  And the response body has 1-5 items in results
  And each item has score >= 0.5
  And each item has non-null url and title
```

**Scenario: Low-signal query returns empty**
```gherkin
Given the chunks table has 10 ingested chunks
When POST /api/search with body {"query":"xylophone purple quantum"}
Then the response has status 200
  And the response body has results = []
```

**Scenario: Request logged**
```gherkin
Given valid search is executed
When the response is sent
Then a row is inserted in search_logs with query, results JSON, ip_hash, latency_ms
```

## Verification

```bash
cd rag-api && mvn test
# expected: SearchServiceTest passes
# Integration (with pg + ingested data):
curl -s -X POST http://localhost:8080/api/search \
  -H 'Content-Type: application/json' \
  -d '{"query":"java","topK":3}' | jq '.results | length'
# expected: 0-3
```

## Non-goals

- Do NOT implement chat/generation here (P3-RAG-API-13).
- Do NOT add rate limit here (P2-RAG-API-06).
- Do NOT commit.

## Open questions

None.
