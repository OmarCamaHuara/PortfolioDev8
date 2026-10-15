---
id: P0-DOC-01
title: Formalize ADR 0004 (reposition as AI engineer backend-first)
category: DOC
priority: P0
estimate_hours: 0.5
depends_on: []
blocks: [P0-DOC-03, P1-UI-01, P1-UI-02, P1-UI-04]
status: done
---

# P0-DOC-01 — Formalize ADR 0004

## Context

Omar is entering an active job search targeting remote US/EU AI engineer roles. The new positioning is "AI engineer with senior backend background", with Java/Spring/Oracle reframed from headline to proof-of-production. The draft of this ADR exists at `docs/plan/draft/adr-0004-proposed-reposition.md`. This task promotes it to the canonical ADR location.

**References:**
- `docs/plan/README.md` § Estado do planejamento
- `docs/plan/draft/adr-0004-proposed-reposition.md` (source)
- `docs/adr/0001-reposition-as-authority-platform.md` (parent, superseded in part)

## Inputs

**Files to read:**
- `docs/plan/draft/adr-0004-proposed-reposition.md` — source content, promote verbatim

## Outputs

**Files to create:**
- `docs/adr/0004-reposition-ai-engineer-backend-first.md` — identical content

**Files to delete:**
- `docs/plan/draft/adr-0004-proposed-reposition.md`

## Implementation steps

1. Read `docs/plan/draft/adr-0004-proposed-reposition.md`.
2. Create `docs/adr/0004-reposition-ai-engineer-backend-first.md` with identical content.
3. Delete the draft file.
4. No commit.

## Verification

```bash
test -f docs/adr/0004-reposition-ai-engineer-backend-first.md && echo OK
test ! -f docs/plan/draft/adr-0004-proposed-reposition.md && echo OK
head -1 docs/adr/0004-reposition-ai-engineer-backend-first.md
# expected: "# 0004 — Reposicionar como AI engineer backend-first para remoto US/EU"
```

## Non-goals

- Do NOT modify the body text.
- Do NOT commit.
- Do NOT touch CONTEXT.md (that's P0-DOC-03).

## Open questions

None.
