---
id: P1-UI-05
title: Update Nav labels to EN (Writing / Work / Labs / Hire)
category: UI
priority: P1
estimate_hours: 1
depends_on: [P0-DOC-02]
blocks: []
status: pending
---

# P1-UI-05 — Update Nav labels to EN

## Context

Nav currently uses pt-BR labels ("Textos", "Trabalhos") in some places. Routes themselves are already EN (`/writing`, `/work`). This task updates visible labels to EN primary per ADR 0005, keeps route paths unchanged.

**References:**
- `src/components/Nav/Nav.tsx`
- `docs/adr/0005-language-policy-en-primary.md` (post P0-DOC-02)
- `CONTEXT.md` § Feeds and Surfaces

## Inputs

**Files to read:**
- `src/components/Nav/Nav.tsx`
- Any other component referencing nav labels (`PageHeader`, `SectionHeading`, etc.)

## Outputs

**Files to modify:**
- `src/components/Nav/Nav.tsx` — labels in EN
- Any other file with nav labels — same change

## Implementation steps

1. In `src/components/Nav/Nav.tsx`, replace labels:
   - `Textos` → `Writing`
   - `Trabalhos` → `Work`
   - `Projetos` → `Work` (if present)
   - Add `Labs` → links to `/labs`
   - Add `Hire me` → links to `/hire-me`
2. Keep `href` values unchanged (`/writing`, `/work`, etc.).
3. Grep for any residual pt-BR label and update.
4. No commit.

## Verification

```bash
grep -r "Textos\|Trabalhos\|Projetos" src/components/
# expected: no matches
grep -c "Writing" src/components/Nav/Nav.tsx
# expected: >=1
grep -c "Work" src/components/Nav/Nav.tsx
# expected: >=1
grep -c "Labs" src/components/Nav/Nav.tsx
# expected: >=1
grep -c "Hire me" src/components/Nav/Nav.tsx
# expected: >=1
npm run build
# expected: succeeds
```

## Non-goals

- Do NOT change route paths.
- Do NOT add CTA Open-to-Work badge (that's P1-HIRE-03).
- Do NOT touch Hero (P1-UI-01).
- Do NOT commit.

## Open questions

None.
