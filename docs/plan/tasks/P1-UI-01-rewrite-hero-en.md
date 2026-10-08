---
id: P1-UI-01
title: Rewrite Hero.tsx in EN with new positioning
category: UI
priority: P1
estimate_hours: 2
depends_on: [P0-DOC-01, P0-DOC-03, P1-DESIGN-01, P1-DESIGN-02]
blocks: []
status: pending
---

# P1-UI-01 — Rewrite Hero.tsx in EN

## Context

The current Hero copy (`src/components/Hero/Hero.tsx`) says "Backend engineer escrevendo em público..." in pt-BR and references Philips/sistemas médicos. This conflicts with ADR 0004 (positioning = AI engineer with senior backend background, EN primary audience US/EU) and ADR 0005 (EN primary). Rewrite Hero in EN with new positioning and two CTAs.

**References:**
- `docs/plan/design-system.md` § Hero (Home only)
- `docs/adr/0004-reposition-ai-engineer-backend-first.md` (post P0-DOC-01)
- `docs/plan/visual-comparison.html` (ASCII mockup of final Hero)
- `CONTEXT.md` § Positioning (post P0-DOC-03)

## Inputs

**Files to read:**
- `src/components/Hero/Hero.tsx`
- `src/components/Hero/Hero.module.scss`
- `docs/plan/design-system.md`
- `CONTEXT.md`

## Outputs

**Files to modify:**
- `src/components/Hero/Hero.tsx` — new EN copy
- `src/components/Hero/Hero.module.scss` — use tokens from `globals.scss`

## Implementation steps

1. Replace the headline (`<h1>`) copy with:
   ```
   AI engineer with
   senior backend background.
   ```
   using Instrument Serif via `font-family: var(--ff-serif)`, `--fs-3xl`, `--lh-tight`, `color: var(--text-strong)`, `letter-spacing: -0.02em`.
2. Replace the dek (`<p>`) with:
   ```
   I ship LLM-integrated systems with the discipline of production backend.
   Formalizing AWS. Open to remote US/EU.
   ```
   using Inter, `--fs-md`, `color: var(--text-muted)`, max-width 60ch.
3. Replace CTAs:
   - Primary: `<Link href="/hire-me">Open to Work →</Link>` — class `cta-primary`, bg `--accent`, text `--bg`.
   - Secondary: `<Link href="/writing">Read my writing</Link>` — class `cta-secondary`, ghost (border `--border`, text `--text`).
   - Both using Roboto Mono via `--ff-mono`, `--fs-sm`, uppercase, letter-spacing +0.05em.
4. Hover states as per design-system § Interactions.
5. No commit.

## Verification

```bash
grep -c "AI engineer with" src/components/Hero/Hero.tsx
# expected: 1
grep -c "Open to Work" src/components/Hero/Hero.tsx
# expected: 1
grep -c "sistemas médicos\|Philips" src/components/Hero/Hero.tsx
# expected: 0
grep -c "pt-BR\|em público" src/components/Hero/Hero.tsx
# expected: 0
npm run build
# expected: build succeeds
```

**Manual check:**
- [ ] Visit http://localhost:3000, Hero section shows new copy in EN with Instrument Serif headline, yellow CTA button.

## Non-goals

- Do NOT touch Nav or add CTA to Nav (that's P1-HIRE-03).
- Do NOT create `/hire-me` page in this task (that's P1-HIRE-01).
- Do NOT translate — the Hero is EN only, no pt-BR variant.
- Do NOT commit.

## Open questions

None.
