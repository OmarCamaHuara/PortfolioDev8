---
id: P2-RAG-API-11
title: Testcontainers integration test for retrieval end-to-end
category: RAG-API
priority: P2
estimate_hours: 2
depends_on: [P2-RAG-API-05]
blocks: []
status: pending
---

# P2-RAG-API-11 — Testcontainers E2E test

## Context

End-to-end integration test using Testcontainers (pgvector/pgvector:pg16 container). Boots a real postgres with pgvector, runs Flyway, seeds a few chunks with mocked embeddings, hits `/api/search`, asserts top result.

**References:**
- https://java.testcontainers.org/modules/databases/postgres/

## Inputs

**Files to read:**
- `rag-api/src/main/java/dev/ohmar/rag/retrieval/SearchController.java`
- `rag-api/src/main/java/dev/ohmar/rag/embedding/EmbeddingAdapter.java`

## Outputs

**Files to create:**
- `rag-api/src/test/java/dev/ohmar/rag/SearchIntegrationTest.java`
- `rag-api/src/test/resources/application-test.yml`

## Implementation steps

1. `SearchIntegrationTest.java`:
   ```java
   @SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
   @ActiveProfiles("test")
   @Testcontainers
   class SearchIntegrationTest {

     @Container
     static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("pgvector/pgvector:pg16")
       .withDatabaseName("rag").withUsername("rag").withPassword("rag");

     @DynamicPropertySource
     static void props(DynamicPropertyRegistry r) {
       r.add("spring.datasource.url", postgres::getJdbcUrl);
       r.add("spring.datasource.username", postgres::getUsername);
       r.add("spring.datasource.password", postgres::getPassword);
     }

     @MockBean EmbeddingAdapter embeddingAdapter;
     @Autowired ChunkRepository chunkRepository;
     @Autowired TestRestTemplate rest;

     @Test
     void returnsRelevantChunk() {
       // Seed with known embeddings (deterministic float arrays)
       float[] vA = constantVector(0.9f);  // close to query
       float[] vB = constantVector(0.1f);  // far from query

       chunkRepository.save(buildChunk(1L, "post", "A", "/a", vA, "Java Spring Boot content"));
       chunkRepository.save(buildChunk(2L, "post", "B", "/b", vB, "Totally unrelated"));

       when(embeddingAdapter.embed("spring boot"))
         .thenReturn(constantVector(0.9f));

       SearchResponse resp = rest.postForObject("/api/search",
         Map.of("query", "spring boot"), SearchResponse.class);

       assertThat(resp.results()).hasSize(1);
       assertThat(resp.results().get(0).title()).isEqualTo("A");
     }
   }
   ```
2. Helper `constantVector(float v) → float[768]`.
3. Ensure Flyway runs against the Testcontainers postgres (set `spring.flyway.enabled=true` in test profile).
4. No commit.

## Verification

```bash
cd rag-api && mvn test -Dtest=SearchIntegrationTest
# expected: BUILD SUCCESS, test passes
```

## Non-goals

- Do NOT call real Google API in tests (mock EmbeddingAdapter).
- Do NOT run this test in a tight unit test loop — it's slow (~15s).
- Do NOT commit.

## Open questions

None.
