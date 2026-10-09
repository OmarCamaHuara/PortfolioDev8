---
id: P0-DOC-03
title: Update CONTEXT.md (promote draft version)
category: DOC
priority: P0
estimate_hours: 1
depends_on: [P0-DOC-01, P0-DOC-02]
blocks: [P1-UI-01, P1-UI-02, P1-HIRE-01, P1-HIRE-02]
status: done
---

# P0-DOC-03 — Update CONTEXT.md

## Context

CONTEXT.md is the ubiquitous language source. It must reflect the new positioning (AI engineer backend-first, ADR 0004), new language policy (EN primary, ADR 0005), and the new terms (`Hire Me Layer`, `Lab`, `Formalizing`). Draft exists at `docs/plan/draft/context-md-proposed.md`.

**References:**
- `docs/plan/draft/context-md-proposed.md` (source — target content for CONTEXT.md)
- `docs/adr/0004-reposition-ai-engineer-backend-first.md` (post P0-DOC-01)
- `docs/adr/0005-language-policy-en-primary.md` (post P0-DOC-02)

## Inputs

**Files to read:**
- `docs/plan/draft/context-md-proposed.md`

## Outputs

**Files to modify:**
- `CONTEXT.md` — overwrite with content from `docs/plan/draft/context-md-proposed.md`

**Files to delete:**
- `docs/plan/draft/context-md-proposed.md`

## Implementation steps

1. Read `docs/plan/draft/context-md-proposed.md`.
2. Overwrite `CONTEXT.md` with identical content.
3. Delete the draft file.
4. No commit.

## Verification

```bash
diff CONTEXT.md docs/plan/draft/context-md-proposed.md 2>/dev/null | wc -l
# expected: 0 BEFORE deletion. After step 3, the draft file no longer exists.

test ! -f docs/plan/draft/context-md-proposed.md && echo OK
grep -c "AI engineer backend-first" CONTEXT.md
# expected: >=1
grep -c "EN primary" CONTEXT.md
# expected: >=1
grep -c "Hire Me Layer" CONTEXT.md
# expected: >=1
grep -c "Formalizing" CONTEXT.md
# expected: >=1
```

## Non-goals

- Do NOT modify body text differently from the draft.
- Do NOT commit.
- Do NOT touch Hero.tsx or page.tsx (that's P1-UI-01 / P1-UI-02).

## Open questions

None.
