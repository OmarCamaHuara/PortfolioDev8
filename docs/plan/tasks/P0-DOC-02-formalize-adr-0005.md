---
id: P0-DOC-02
title: Formalize ADR 0005 (language policy EN primary)
category: DOC
priority: P0
estimate_hours: 0.5
depends_on: []
blocks: [P0-DOC-03, P1-UI-03, P1-UI-05]
status: pending
---

# P0-DOC-02 — Formalize ADR 0005

## Context

The site switches from pt-BR default to EN primary with pt-BR as per-piece variant. Draft at `docs/plan/draft/adr-0005-proposed-language.md` is promoted to canonical ADR.

**References:**
- `docs/plan/README.md` § Estado do planejamento
- `docs/plan/draft/adr-0005-proposed-language.md` (source)

## Inputs

**Files to read:**
- `docs/plan/draft/adr-0005-proposed-language.md`

## Outputs

**Files to create:**
- `docs/adr/0005-language-policy-en-primary.md` — identical content

**Files to delete:**
- `docs/plan/draft/adr-0005-proposed-language.md`

## Implementation steps

1. Read the draft.
2. Create canonical ADR with identical content.
3. Delete the draft.
4. No commit.

## Verification

```bash
test -f docs/adr/0005-language-policy-en-primary.md && echo OK
test ! -f docs/plan/draft/adr-0005-proposed-language.md && echo OK
head -1 docs/adr/0005-language-policy-en-primary.md
# expected: "# 0005 — Idioma: EN primário, pt-BR como variant por peça"
```

## Non-goals

- Do NOT modify body.
- Do NOT touch CONTEXT.md Language Policy section (P0-DOC-03).
- Do NOT change llms.txt (P1-UI-03).

## Open questions

None.
