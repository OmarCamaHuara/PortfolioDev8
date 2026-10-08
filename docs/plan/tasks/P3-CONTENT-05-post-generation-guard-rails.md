---
id: P3-CONTENT-05
title: Post EN "Adding generation to the Lab — guard rails against hallucination"
category: CONTENT
priority: P3
estimate_hours: 3
depends_on: [P3-RAG-API-13]
blocks: []
status: pending
---

# P3-CONTENT-05 — Post: Guard rails against hallucination

## Context

Follow-up Post to P2-CONTENT-04 ("Building RAG retrieval"). Now that generation is live, document the 6-layer guard rails framework. Target audience: AI engineers and hiring managers evaluating senior candidates — this post is the single strongest piece of evidence for the positioning.

**References:**
- `docs/plan/rag-architecture.md` § v2 Guard rails em camadas
- `content/writing/rag-retrieval-over-portfolio.mdx` (previous post in series)

## Inputs

**Files to read:**
- `docs/plan/rag-architecture.md`
- `rag-api/src/main/java/dev/ohmar/rag/generation/GuardRails.java`
- `rag-api/src/main/java/dev/ohmar/rag/generation/PromptComposer.java`
- `rag-api/src/main/java/dev/ohmar/rag/generation/ClaimDetector.java`

## Outputs

**Files to create:**
- `content/writing/guard-rails-against-hallucination.mdx`

## Implementation steps

1. Frontmatter:
   ```mdx
   ---
   title: "Adding generation to the Lab — guard rails against hallucination"
   type: post
   publishedAt: 2026-12-10
   lang: en
   description: "Six-layer defense against an LLM inventing facts about me. Threshold, prompt rigor, temperature, max tokens, regex detector, weekly review."
   tags: [rag, llm, gemini, spring-boot, lab-01]
   ---
   ```
2. Structure (~1800 words):
   - Problem: a hallucinating assistant that says "Omar worked at Google" during a hiring call ends the conversation.
   - Why retrieval-only wasn't enough: visitors want synthesis.
   - Layer 1 — threshold: cosine min 0.6, canned response otherwise.
   - Layer 2 — prompt rigor: system prompt with numbered rules.
   - Layer 3 — temperature: 0.3 instead of 1.0.
   - Layer 4 — max tokens: 300.
   - Layer 5 — post-processing claim detector: regex scan, non-blocking warn log.
   - Layer 6 — logging + weekly review: all queries persisted, SQL review every week.
   - What's STILL possible to go wrong (honesty): legitimate but out-of-corpus questions; patterns the regex doesn't catch.
   - Code snippets from GuardRails, PromptComposer, ClaimDetector.
   - Link to live Lab 02 at /labs/chat.
3. No commit.

## Verification

```bash
test -f content/writing/guard-rails-against-hallucination.mdx && echo OK
wc -w content/writing/guard-rails-against-hallucination.mdx
# expected: 1500-2200
grep -c "guard rails" content/writing/guard-rails-against-hallucination.mdx
# expected: >=1
npm run build
# expected: new post in /writing
```

## Non-goals

- Do NOT claim the guard rails are bulletproof. Honesty is part of the signal.
- Do NOT commit.

## Open questions

None.
