---
id: P0-DOC-05
title: Write ADR 0006 (visual direction — Brittany + monkeytype hybrid)
category: DOC
priority: P0
estimate_hours: 1
depends_on: []
blocks: [P1-DESIGN-01, P0-DOC-07]
status: done
---

# P0-DOC-05 — Write ADR 0006 (visual direction)

## Context

The visual direction was partially revised during planning: structure follows Brittany Chiang (sidebar fixa, dark navy #0a192f, timeline, cards) while accents come from monkeytype (yellow #e2b714, Roboto Mono in UI). The decision supersedes part of ADR 0003 (which allowed Spider-Verse graffiti accents — now explicitly rejected). This ADR formalizes the hybrid.

**References:**
- `docs/plan/design-system.md` — full design system spec, source for ADR body
- `docs/adr/0003-visual-iteration-monkeytype-elements.md` (partial supersede)
- `docs/design/visual-direction.md` (older design doc, must align after this ADR)

## Inputs

**Files to read:**
- `docs/plan/design-system.md`
- `docs/adr/0003-visual-iteration-monkeytype-elements.md`

## Outputs

**Files to create:**
- `docs/adr/0006-visual-direction-brittany-monkeytype-hybrid.md`

## Implementation steps

1. Study the voice and length of ADRs 0001-0003 — short, dense, trade-off explicit, dated.
2. Write ADR 0006 with the following structure:
   - 1st paragraph: context (post-pivô to AI engineer US/EU, 2026-10-08) + decision summary (Brittany structure + monkeytype accents).
   - 2nd paragraph: trade-offs accepted (hybrid risk, mitigations).
   - 3rd paragraph: explicitly rejected (Spider-Verse graffiti, mono-everywhere, scroll parallax, glassmorphism).
   - Partial supersede clause: references ADR 0003.
3. End with reference links to `docs/plan/design-system.md`.
4. No commit.

## Verification

```bash
test -f docs/adr/0006-visual-direction-brittany-monkeytype-hybrid.md && echo OK
grep -c "Brittany" docs/adr/0006-visual-direction-brittany-monkeytype-hybrid.md
# expected: >=1
grep -c "monkeytype\|#e2b714" docs/adr/0006-visual-direction-brittany-monkeytype-hybrid.md
# expected: >=1
grep -c "Spider-Verse\|graffiti" docs/adr/0006-visual-direction-brittany-monkeytype-hybrid.md
# expected: >=1 (should appear in "rejected" clause)
wc -l docs/adr/0006-visual-direction-brittany-monkeytype-hybrid.md
# expected: 10-20 lines (short, dense — ADR convention)
```

## Non-goals

- Do NOT re-spec the design system here — reference `docs/plan/design-system.md`.
- Do NOT modify ADR 0003 content.
- Do NOT touch `src/app/globals.scss` (that's P1-DESIGN-01).
- Do NOT commit.

## Open questions

None.
