---
id: P0-DOC-06
title: Write ADR 0007 (backend scope revision — Spring Boot approved for Lab RAG)
category: DOC
priority: P0
estimate_hours: 0.5
depends_on: []
blocks: [P2-RAG-API-01]
status: pending
---

# P0-DOC-06 — Write ADR 0007 (backend scope)

## Context

Memory `project-backend-scope.md` (dated 2026-09-17) stated "Next-only + Edge Function for chat. No Spring Boot, no Postgres." That decision assumed the site stayed as a creator platform with low technical surface. The new positioning (AI engineer backend-first for US/EU hiring) and the planned Lab RAG endpoint reverse that: Spring Boot 3 + Postgres+pgvector + Docker become the backend of the Lab RAG, while the rest of the site stays Next-only. This ADR formalizes the reversal with clear scope boundaries.

**References:**
- `docs/plan/rag-architecture.md` — full backend spec
- `docs/adr/0004-reposition-ai-engineer-backend-first.md` (motivates the reversal)

## Inputs

**Files to read:**
- `docs/plan/rag-architecture.md`
- `docs/adr/0004-reposition-ai-engineer-backend-first.md` (post P0-DOC-01)

## Outputs

**Files to create:**
- `docs/adr/0007-backend-scope-spring-rag.md`

## Implementation steps

1. Write a short ADR (~15 lines) following the voice of ADR 0001-0006:
   - 1st paragraph: context + decision (Spring Boot 3 + pgvector approved exclusively for Lab RAG `rag-api/`).
   - 2nd paragraph: scope boundary (the rest of the site remains Next-only; the Spring Boot code must NOT grow beyond the Lab RAG endpoints).
   - 3rd paragraph: supersede clause for memory `project-backend-scope` (2026-09-17).
2. Reference `docs/plan/rag-architecture.md`.
3. No commit.

## Verification

```bash
test -f docs/adr/0007-backend-scope-spring-rag.md && echo OK
grep -c "Spring Boot" docs/adr/0007-backend-scope-spring-rag.md
# expected: >=1
grep -c "rag-api" docs/adr/0007-backend-scope-spring-rag.md
# expected: >=1
grep -c "Next-only" docs/adr/0007-backend-scope-spring-rag.md
# expected: >=1 (scope boundary explicit)
```

## Non-goals

- Do NOT re-spec rag-architecture here.
- Do NOT scaffold the Spring Boot project (P2-RAG-API-01).
- Do NOT commit.

## Open questions

None.
