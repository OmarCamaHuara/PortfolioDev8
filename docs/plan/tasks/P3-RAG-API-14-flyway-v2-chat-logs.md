---
id: P3-RAG-API-14
title: Flyway V2 — chat_logs table + logging in ChatController
category: RAG-API
priority: P3
estimate_hours: 1
depends_on: [P2-RAG-API-02]
blocks: [P3-RAG-API-16]
status: pending
---

# P3-RAG-API-14 — Flyway V2 chat_logs

## Context

New migration adds the `chat_logs` table per the schema in `rag-architecture.md`. Each chat request writes a row with query, response, chunks used, tokens, latency, IP hash, model name.

**References:**
- `docs/plan/rag-architecture.md` § Schema do banco (chat_logs definition)

## Inputs

**Files to read:**
- `rag-api/src/main/resources/db/migration/V1__init.sql` (reference convention)

## Outputs

**Files to create:**
- `rag-api/src/main/resources/db/migration/V2__chat_logs.sql`
- `rag-api/src/main/java/dev/ohmar/rag/generation/ChatLogRepository.java`
- `rag-api/src/main/java/dev/ohmar/rag/generation/ChatLogEntity.java`

## Implementation steps

1. `V2__chat_logs.sql`:
   ```sql
   CREATE TABLE chat_logs (
       id              BIGSERIAL PRIMARY KEY,
       query           TEXT NOT NULL,
       response        TEXT NOT NULL,
       chunks_used     JSONB NOT NULL,
       client_ip_hash  TEXT NOT NULL,
       latency_ms      INT NOT NULL,
       tokens_input    INT NOT NULL,
       tokens_output   INT NOT NULL,
       model           TEXT NOT NULL,
       created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
   );
   CREATE INDEX chat_logs_created_at ON chat_logs (created_at DESC);
   ```
2. JPA entity + repository.
3. Update `ChatService` (P3-RAG-API-13) to save a row after `done` event emits.
4. No commit.

## Verification

```bash
test -f rag-api/src/main/resources/db/migration/V2__chat_logs.sql && echo OK
# After boot:
docker exec pg-dev psql -U rag -d rag -c "\d chat_logs"
# expected: table exists with correct columns
```

## Non-goals

- Do NOT backfill search_logs into chat_logs.
- Do NOT commit.

## Open questions

None.
