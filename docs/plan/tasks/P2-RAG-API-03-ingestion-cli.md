---
id: P2-RAG-API-03
title: Document ingestion CLI (reads MDX, chunks, embeds, upserts)
category: RAG-API
priority: P2
estimate_hours: 4
depends_on: [P2-RAG-API-02, P2-RAG-API-04, P0-DOC-04]
blocks: []
status: pending
---

# P2-RAG-API-03 — Ingestion CLI

## Context

Standalone CLI (Spring Boot `CommandLineRunner`) that scans `content/writing/*.mdx`, `content/work/*.mdx`, `docs/perfil_llm.public.md`, `docs/adr/*.md`, `docs/design/*.md`; parses frontmatter; chunks (~500 tokens, overlap 50); embeds; upserts into `chunks` table. Run locally after publishing new content.

**References:**
- `docs/plan/rag-architecture.md` § v1 Ingestion CLI

## Inputs

**Files to read:**
- `rag-api/src/main/java/dev/ohmar/rag/embedding/EmbeddingAdapter.java` (post P2-RAG-API-04)
- `docs/perfil_llm.public.md`
- `content/writing/*.mdx` (if any exist)
- `content/work/*.mdx` (if any)
- `docs/adr/*.md`
- `docs/design/*.md`

## Outputs

**Files to create:**
- `rag-api/src/main/java/dev/ohmar/rag/ingestion/MarkdownIngestionCli.java`
- `rag-api/src/main/java/dev/ohmar/rag/ingestion/FrontmatterParser.java`
- `rag-api/src/main/java/dev/ohmar/rag/ingestion/Chunker.java`
- `rag-api/src/main/java/dev/ohmar/rag/retrieval/ChunkRepository.java` (JPA + custom upsert)
- `rag-api/src/main/java/dev/ohmar/rag/retrieval/ChunkEntity.java` — JPA entity for `chunks` table

## Implementation steps

1. `ChunkEntity.java` with JPA annotations mapping to `chunks` table. Use `@Column(columnDefinition = "vector(768)")` for embedding, custom type for pgvector.
2. `ChunkRepository.java extends JpaRepository<ChunkEntity, Long>` with method `upsertBySourcePathAndIndex(ChunkEntity)` using `@Modifying @Query` with `INSERT ... ON CONFLICT (source_path, chunk_index) DO UPDATE SET ...`.
3. `FrontmatterParser.java`: splits an MDX/MD file into `Frontmatter + Body`. Frontmatter is YAML between `---` fences. Returns `Map<String,String>` plus `String body`.
4. `Chunker.java`: splits body into ~500-token chunks with 50-token overlap. Prefer breaks at `##` heading boundaries. Count tokens as `body.length() / 4` approximation (safe for English/pt-BR mixed).
5. `MarkdownIngestionCli.java` implements `CommandLineRunner`:
   ```java
   @Component
   @Profile("ingest")
   public class MarkdownIngestionCli implements CommandLineRunner {
     // inject EmbeddingAdapter, ChunkRepository
     public void run(String... args) {
       String contentRoot = args.length > 0 ? args[0] : "..";
       List<Path> sources = scanSources(contentRoot);
       int total = 0;
       for (Path p : sources) {
         String raw = Files.readString(p);
         Frontmatter fm = FrontmatterParser.parse(raw);
         List<String> chunks = Chunker.chunk(fm.body(), 500, 50);
         for (int i = 0; i < chunks.size(); i++) {
           float[] embedding = embeddingAdapter.embed(chunks.get(i));
           ChunkEntity entity = buildEntity(p, fm, i, chunks.get(i), embedding);
           chunkRepository.upsert(entity);
           total++;
         }
       }
       log.info("Ingested {} chunks from {} sources", total, sources.size());
     }
   }
   ```
6. Activate via Spring profile `ingest`: `mvn spring-boot:run -Dspring-boot.run.profiles=ingest -Dspring-boot.run.arguments=../`.
7. No commit.

## Verification

```bash
cd rag-api && mvn test
# expected: unit tests for FrontmatterParser and Chunker pass
# Then with a test postgres running:
mvn spring-boot:run -Dspring-boot.run.profiles=ingest -Dspring-boot.run.arguments=../
# expected: logs show "Ingested N chunks from M sources"
# Verify DB:
docker exec pg-test psql -U rag -d rag -c "SELECT source_type, COUNT(*) FROM chunks GROUP BY source_type;"
# expected: rows for 'post','work','adr','design','profile'
```

## Non-goals

- Do NOT scan outside the specified directories.
- Do NOT ingest `docs/perfil_llm_omar_cama_huarahuara.md` (PII — gitignored anyway).
- Do NOT add a web endpoint — ingestion is CLI only.
- Do NOT commit.

## Open questions

- What chunking strategy if a single `##` section exceeds 500 tokens? Current spec: hard split at word boundary, keep overlap. Acceptable default.
