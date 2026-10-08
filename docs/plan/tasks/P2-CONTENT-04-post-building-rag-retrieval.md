---
id: P2-CONTENT-04
title: Post EN "Building a RAG retrieval endpoint over my own portfolio" (~1500 words)
category: CONTENT
priority: P2
estimate_hours: 4
depends_on: [P2-RAG-API-05, P2-RAG-UI-01]
blocks: []
status: pending
---

# P2-CONTENT-04 — Post: Building RAG retrieval over portfolio

## Context

Meta-content Post that documents the Lab 01 build. Serves triple purpose: (1) tira `/writing` do EmptyState com peça técnica substancial; (2) prova prática de IA engineering além do artefato; (3) SEO target for recruiter + developer traffic. Target: 1500 words EN, problem-first structure.

**References:**
- `docs/plan/rag-architecture.md` § v1
- `/labs/semantic-search` (post P2-RAG-UI-01, live demo linked from post)

## Inputs

**Files to read:**
- `docs/plan/rag-architecture.md`
- The actual code (rag-api/src/main/java/dev/ohmar/rag/*)

## Outputs

**Files to create:**
- `content/writing/rag-retrieval-over-portfolio.mdx`

## Implementation steps

1. Create MDX with frontmatter:
   ```mdx
   ---
   title: "Building a RAG retrieval endpoint over my own portfolio"
   type: post
   publishedAt: 2026-11-05
   lang: en
   description: "Why I wrote the Lab 01 RAG retrieval in Java/Spring instead of Python. Chunking tradeoffs, pgvector choices, and what you can learn from a Fly.io log."
   tags: [java, spring-boot, rag, pgvector, lab-01]
   ---
   ```
2. Target structure:
   - **The problem**: writing portfolios lie — the content is static, the engineering sits in a repo not a story. A RAG retrieval over the portfolio is a working artifact that proves AI practice.
   - **Why Java/Spring over Python**: enterprise reliability, consistency with my production stack, signaling to the hiring audience.
   - **Chunking tradeoffs**: ~500 tokens with 50-token overlap, prefer `##` heading boundaries. What happens with long sections. What breaks.
   - **Why pgvector**: SQL-familiar, Fly.io free Postgres, `ivfflat` index tradeoffs.
   - **Embedding provider**: Google text-embedding-004 at 768 dims, cost estimate.
   - **Guard rails for retrieval-only**: no generation yet (that's Lab 01 v2). Threshold filter at 0.5. Why I started here before Gemini chat.
   - **Deploy and cost**: Fly.io shared-cpu-1x cold start, Postgres 3GB free, ~$0-5/mo.
   - **What's next**: v2 adds generation with guard rails (link to future post).
3. Include 1-2 code snippets (search SQL, retrieval service skeleton).
4. Link to `/labs/semantic-search` as the live demo.
5. Link to the rag-api GitHub source.
6. No commit.

## Verification

```bash
test -f content/writing/rag-retrieval-over-portfolio.mdx && echo OK
wc -w content/writing/rag-retrieval-over-portfolio.mdx
# expected: 1200-1800
grep -c "pgvector" content/writing/rag-retrieval-over-portfolio.mdx
# expected: >=1
grep -c "/labs/semantic-search" content/writing/rag-retrieval-over-portfolio.mdx
# expected: >=1
npm run build
# expected: new post renders in /writing feed
```

## Non-goals

- Do NOT turn into a tutorial — this is a design-decision post with a demo.
- Do NOT include unresolved WIP sections.
- Do NOT commit.

## Open questions

None.
