---
id: P2-RAG-API-02
title: Flyway migration V1 — pgvector schema (chunks, search_logs)
category: RAG-API
priority: P2
estimate_hours: 1
depends_on: [P2-RAG-API-01]
blocks: [P2-RAG-API-03, P2-RAG-API-05]
status: pending
---

# P2-RAG-API-02 — Flyway V1 pgvector migration

## Context

Install the pgvector extension and create the `chunks` + `search_logs` tables per the schema in `docs/plan/rag-architecture.md`. The migration runs automatically on Spring Boot startup via Flyway.

**References:**
- `docs/plan/rag-architecture.md` § Schema do banco (SQL spec)

## Inputs

**Files to read:**
- `docs/plan/rag-architecture.md`

## Outputs

**Files to create:**
- `rag-api/src/main/resources/db/migration/V1__init.sql`

## Implementation steps

1. Create `V1__init.sql` with the exact content from `docs/plan/rag-architecture.md` § Schema do banco:
   ```sql
   CREATE EXTENSION IF NOT EXISTS vector;

   CREATE TABLE chunks (
       id              BIGSERIAL PRIMARY KEY,
       source_path     TEXT NOT NULL,
       source_type     TEXT NOT NULL,
       title           TEXT NOT NULL,
       url             TEXT NOT NULL,
       lang            TEXT,
       chunk_index     INT NOT NULL,
       content         TEXT NOT NULL,
       embedding       vector(768) NOT NULL,
       tokens          INT NOT NULL,
       ingested_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
       UNIQUE (source_path, chunk_index)
   );

   CREATE INDEX chunks_embedding_ivfflat
       ON chunks USING ivfflat (embedding vector_cosine_ops) WITH (lists = 10);

   CREATE INDEX chunks_source_type ON chunks (source_type);
   CREATE INDEX chunks_lang ON chunks (lang);

   CREATE TABLE search_logs (
       id              BIGSERIAL PRIMARY KEY,
       query           TEXT NOT NULL,
       results         JSONB NOT NULL,
       client_ip_hash  TEXT NOT NULL,
       latency_ms      INT NOT NULL,
       created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
   );
   ```
2. Verify migration name matches Flyway convention (`V1__init.sql`, double underscore).
3. Note: `chat_logs` is NOT in V1 (added in V2 later as part of P3-RAG-API-14).
4. No commit.

## Verification

```bash
test -f rag-api/src/main/resources/db/migration/V1__init.sql && echo OK
grep -c "CREATE EXTENSION IF NOT EXISTS vector" rag-api/src/main/resources/db/migration/V1__init.sql
# expected: 1
grep -c "vector(768)" rag-api/src/main/resources/db/migration/V1__init.sql
# expected: 1
# Local test with docker postgres:
docker run -d --name pg-test -e POSTGRES_PASSWORD=rag -e POSTGRES_DB=rag -e POSTGRES_USER=rag -p 5432:5432 pgvector/pgvector:pg16
# Wait a few seconds, then run Flyway via Spring Boot startup:
cd rag-api && mvn spring-boot:run
# expected: Flyway logs "Successfully applied 1 migration to schema"
docker stop pg-test && docker rm pg-test
```

## Non-goals

- Do NOT create a V2 migration here (chat_logs is for P3).
- Do NOT seed data.
- Do NOT commit.

## Open questions

- Embedding dimension: pinned at 768 for Google text-embedding-004. If adapter in P2-RAG-API-04 uses a different model, this must be amended via V1a or V2 — do not change V1 after it runs anywhere.
