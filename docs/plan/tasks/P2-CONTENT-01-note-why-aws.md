---
id: P2-CONTENT-01
title: Note EN "Why I'm formalizing AWS now" (~300 words)
category: CONTENT
priority: P2
estimate_hours: 1
depends_on: [P0-DOC-01]
blocks: []
status: pending
---

# P2-CONTENT-01 — Seed Note "Why I'm formalizing AWS now"

## Context

The `/writing` feed is empty. The first Note is a short seed piece (~300 words) in EN that establishes the "Formalizing" framing from CONTEXT.md and ADR 0004. It must sound senior — never "I'm learning AWS", always "formalizing cloud knowledge I already use in production".

**References:**
- `CONTEXT.md` § Formalizing (post P0-DOC-03)
- `docs/adr/0004-reposition-ai-engineer-backend-first.md`

## Inputs

**Files to read:**
- `CONTEXT.md` (post P0-DOC-03 — but can proceed with draft version too)

## Outputs

**Files to create:**
- `content/writing/formalizing-aws-now.mdx`

## Implementation steps

1. Create `content/writing/formalizing-aws-now.mdx`:
   ```mdx
   ---
   title: "Why I'm formalizing AWS now"
   type: note
   publishedAt: 2026-10-15
   lang: en
   description: "The move toward AWS Solutions Architect, framed as formalization — not learning."
   tags: [aws, cloud, career]
   ---

   I've been running Spring Boot services against AWS primitives for years —
   S3 for artifacts, RDS Postgres for everything, SQS for the ugly jobs
   nobody wants to retry. Not under some cloud-native rebuild — just the
   usual production bills, scaled for whatever the team was shipping.

   The gap I'm closing now is the signed artifact: AWS Solutions Architect
   Associate. Not because I need the technical content — I need the
   formalization. The certification turns practice I already have into
   something a hiring manager in San Francisco can match against a job
   description without a 30-minute conversation.

   This is the pattern senior engineers run into when they switch markets.
   The local reputation ("Omar built that") doesn't travel. The signed
   artifacts do.

   Side effect: I get a chance to notice the AWS pieces I've been avoiding —
   IAM edge cases, the SCP/OU model, the parts of KMS most people get
   wrong. Writing this in public forces me to actually sit with those
   instead of punting them another year.

   First few study-adjacent posts coming over the next weeks. If you're a
   backend engineer on the same move — I'm interested in hearing what you
   skipped versus what you deepened.
   ```
2. ~310 words. Tone: senior pragmatic, no "learning", no "journey".
3. No commit.

## Verification

```bash
test -f content/writing/formalizing-aws-now.mdx && echo OK
grep -c "formalizing" content/writing/formalizing-aws-now.mdx
# expected: >=1
grep -c "learning AWS\|AWS journey" content/writing/formalizing-aws-now.mdx
# expected: 0 (forbidden framings)
wc -w content/writing/formalizing-aws-now.mdx
# expected: 250-350 (frontmatter counts, so ballpark)
npm run build
# expected: /writing shows new post; /writing/formalizing-aws-now renders
```

## Non-goals

- Do NOT make it a tutorial. It's a Note, not a Post.
- Do NOT include personal AWS account numbers, specific project names under NDA.
- Do NOT translate to pt-BR here. If pt-BR variant desired later, separate task.
- Do NOT commit.

## Open questions

None.
