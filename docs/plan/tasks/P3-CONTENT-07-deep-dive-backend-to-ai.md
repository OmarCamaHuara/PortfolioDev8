---
id: P3-CONTENT-07
title: Deep Dive EN "Backend engineer's path to AI engineering" (~3000 words)
category: CONTENT
priority: P3
estimate_hours: 6
depends_on: [P2-CONTENT-04]
blocks: []
status: pending
---

# P3-CONTENT-07 — Deep Dive: Backend engineer's path to AI engineering

## Context

The headline Deep Dive. Target: 3000 words EN, reference-grade. Positioning anchor: argues that AI engineers who come from senior backend background ship different (and more deployable) systems than AI engineers who came from ML/data science. Omar is Exhibit A.

**References:**
- `CONTEXT.md` § Deep Dive
- Omar's actual production experience (Java/Spring/Oracle at Philips)
- Lab 01/02 as concrete artifacts

## Inputs

**Files to read:**
- All of Omar's existing content in `content/writing/` and `content/work/`
- The Lab 01 architecture and code

## Outputs

**Files to create:**
- `content/writing/backend-engineers-path-to-ai.mdx`

## Implementation steps

1. Frontmatter:
   ```mdx
   ---
   title: "Backend engineer's path to AI engineering"
   type: deep-dive
   publishedAt: 2026-12-20
   lang: en
   description: "What backend engineers bring to AI engineering that ML practitioners don't: production discipline, uptime SLAs, cost awareness, and the ability to say 'this will break in 3 months'."
   tags: [ai-engineering, backend, career]
   ---
   ```
2. Target 3000-3500 words. Sections:
   - **Opening**: a story — a time an AI demo worked locally and shattered in production because of a missing retry, a timeout, or no circuit breaker. Problem-first.
   - **Thesis**: AI engineers from ML and AI engineers from backend ship different systems. Neither is wrong, but the backend path is undervalued.
   - **What backend brings**: observability-by-default, SLAs, cost ceilings, dependency management, deploy pipelines.
   - **What backend has to learn**: embeddings, prompt engineering, retrieval, evaluation, non-determinism in testing.
   - **Case study**: Lab 01 as concrete evidence. What was the "backend reflex" that shaped each decision? (Threshold, logging, rate limit, obs — all backend reflexes applied to LLM.)
   - **Where the career goes**: hiring markets, title inflation, where senior backend-AI roles actually sit.
   - **Close**: what to avoid when hiring a "AI engineer" without backend DNA.
3. Include 2-3 code snippets from the Lab.
4. Link to Lab 01/02 at /labs.
5. Link to related Posts.
6. No commit.

## Verification

```bash
test -f content/writing/backend-engineers-path-to-ai.mdx && echo OK
wc -w content/writing/backend-engineers-path-to-ai.mdx
# expected: 2800-3500
grep -c "ML\|machine learning" content/writing/backend-engineers-path-to-ai.mdx
# expected: >=3 (naming the counter-category)
```

## Non-goals

- Do NOT be dismissive of ML engineers. Argue for complementarity, not supremacy.
- Do NOT include unverified career statistics.
- Do NOT commit.

## Open questions

None.
