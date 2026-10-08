---
id: P1-UI-03
title: Rewrite llms.txt in EN
category: UI
priority: P1
estimate_hours: 0.5
depends_on: [P0-DOC-02]
blocks: []
status: pending
---

# P1-UI-03 — Rewrite llms.txt in EN

## Context

`src/app/llms.txt/route.ts` (or similar) serves `/llms.txt` for agent discovery. It must be in EN per ADR 0005, pointing to EN canonical routes, including the new `/hire-me` and `/labs`.

**References:**
- `src/app/llms.txt/` (current implementation)
- `docs/adr/0005-language-policy-en-primary.md` (post P0-DOC-02)
- https://llmstxt.org/ (format reference)

## Inputs

**Files to read:**
- `src/app/llms.txt/` (locate the route handler)

## Outputs

**Files to modify:**
- `src/app/llms.txt/route.ts` (or equivalent) — serve EN content

## Implementation steps

1. Locate the current llms.txt handler.
2. Replace content with:
   ```
   # Omar Cama Huarahuara

   > AI engineer with senior backend background. Java 17, Spring Boot,
   > hexagonal architecture. LLM/RAG/MCP in production. Open to remote
   > US/EU AI engineer roles.

   ## Writing
   - [Writing feed](https://ohmar.dev/writing): posts, notes, deep dives
   - [RSS](https://ohmar.dev/rss.xml)

   ## Work
   - [Project write-ups](https://ohmar.dev/work)

   ## Labs
   - [Lab 01 — Semantic search](https://ohmar.dev/labs/semantic-search):
     RAG retrieval over this portfolio. API spec at
     https://api.ohmar.dev/api/search

   ## Profile
   - [Public profile markdown](https://ohmar.dev/perfil_llm.public.md)

   ## Hire
   - [Open to remote US/EU](https://ohmar.dev/hire-me)
   ```
3. (If domain not final, use `example.com` placeholder with TODO; the P4-OPS-03 task will fix.)
4. No commit.

## Verification

```bash
grep -c "AI engineer with senior backend" src/app/llms.txt/route.ts || \
  grep -c "AI engineer with senior backend" src/app/llms.txt/*.ts
# expected: >=1

curl -s http://localhost:3000/llms.txt | grep -c "Labs"
# expected: >=1 (requires dev server running)
```

## Non-goals

- Do NOT translate to pt-BR — llms.txt is EN per ADR 0005.
- Do NOT include URLs to private resources.
- Do NOT commit.

## Open questions

- Domain final? If not decided, use placeholder with TODO. Resolved in P4-OPS-03.
