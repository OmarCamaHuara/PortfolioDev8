---
id: P1-DESIGN-01
title: Define SCSS tokens (colors, type scale, spacing) in globals.scss
category: DESIGN
priority: P1
estimate_hours: 2
depends_on: [P0-DOC-05]
blocks: [P1-UI-01, P1-UI-02, P1-HIRE-01, P1-HIRE-03, P2-UI-SHELL-01, P2-UI-SHELL-02, P2-UI-FEED-01, P2-UI-FEED-02, P2-UI-FEED-03, P2-UI-FEED-04, P2-UI-FEED-05, P2-RAG-UI-01]
status: pending
---

# P1-DESIGN-01 — SCSS tokens in globals.scss

## Context

Every UI component downstream depends on CSS custom properties being defined in a single place. This task installs the token palette from `docs/plan/design-system.md` into `src/app/globals.scss` so that P1-UI-* and P2-UI-* can consume `var(--bg)`, `var(--accent)`, `var(--fs-base)` etc.

**References:**
- `docs/plan/design-system.md` § Paleta, Tipografia, Spacing
- `docs/adr/0006-visual-direction-brittany-monkeytype-hybrid.md` (post P0-DOC-05)

## Inputs

**Files to read:**
- `docs/plan/design-system.md`
- `src/app/globals.scss` (current state — do not fully overwrite; merge)

## Outputs

**Files to modify:**
- `src/app/globals.scss` — add `:root` block with all tokens from design-system.md

## Implementation steps

1. Read current `src/app/globals.scss`.
2. Add (or merge into existing) `:root { ... }` block with EXACT values from `docs/plan/design-system.md`:
   - Colors: `--bg`, `--bg-elevated`, `--bg-light`, `--text`, `--text-muted`, `--text-strong`, `--accent`, `--accent-dim`, `--border`, `--border-strong`, `--error`, `--success`
   - Type scale: `--fs-xs` through `--fs-3xl`
   - Line heights: `--lh-tight`, `--lh-heading`, `--lh-body`
   - Spacing: `--sp-1` through `--sp-32`
3. Set `html { background: var(--bg); color: var(--text); }` and body base styles.
4. Add `@media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.01ms !important; } }`.
5. No commit.

## Verification

```bash
grep -c "^\s*--accent:\s*#e2b714" src/app/globals.scss
# expected: 1
grep -c "^\s*--bg:\s*#0a192f" src/app/globals.scss
# expected: 1
grep -c "^\s*--fs-3xl:" src/app/globals.scss
# expected: 1
npm run build
# expected: build succeeds, no SCSS compilation errors
```

## Non-goals

- Do NOT change any component yet (that's P1-UI-* and P2-UI-*).
- Do NOT add fonts here (that's P1-DESIGN-02).
- Do NOT commit.
- Do NOT invent token values — exact match with design-system.md.

## Open questions

None.
