---
id: P1-DESIGN-02
title: Configure font loading via next/font (Inter + Roboto Mono + Instrument Serif)
category: DESIGN
priority: P1
estimate_hours: 1
depends_on: []
blocks: [P1-UI-01, P1-UI-02, P2-UI-SHELL-01, P2-UI-FEED-01, P2-UI-FEED-02]
status: pending
---

# P1-DESIGN-02 — Font loading via next/font

## Context

Three font families are needed per `docs/plan/design-system.md`: Instrument Serif (H1), Inter (body + H2+), Roboto Mono (UI, chips, meta). Use `next/font/google` to self-host (no external request at runtime).

**References:**
- `docs/plan/design-system.md` § Tipografia
- https://nextjs.org/docs/app/building-your-application/optimizing/fonts

## Inputs

**Files to read:**
- `src/app/layout.tsx`

## Outputs

**Files to modify:**
- `src/app/layout.tsx` — import fonts, expose CSS variables

## Implementation steps

1. In `src/app/layout.tsx` top:
   ```tsx
   import { Instrument_Serif, Inter, Roboto_Mono } from 'next/font/google';

   const serif = Instrument_Serif({ subsets: ['latin'], weight: '400', variable: '--font-serif', display: 'swap' });
   const sans = Inter({ subsets: ['latin'], weight: ['400','600'], variable: '--font-sans', display: 'swap' });
   const mono = Roboto_Mono({ subsets: ['latin'], weight: '400', variable: '--font-mono', display: 'swap' });
   ```
2. Add `${serif.variable} ${sans.variable} ${mono.variable}` to `<html className=...>`.
3. In `src/app/globals.scss`, bind to CSS vars:
   ```scss
   :root {
     --ff-serif: var(--font-serif), ui-serif, serif;
     --ff-sans: var(--font-sans), system-ui, -apple-system, sans-serif;
     --ff-mono: var(--font-mono), ui-monospace, monospace;
   }
   body { font-family: var(--ff-sans); }
   ```
4. No commit.

## Verification

```bash
grep -c "Instrument_Serif" src/app/layout.tsx
# expected: 1
grep -c "Roboto_Mono" src/app/layout.tsx
# expected: 1
npm run build
# expected: build succeeds; fonts preloaded
```

**Manual check:**
- [ ] View network tab in dev tools on dev server: Instrument Serif, Inter, Roboto Mono woff2 files are self-hosted (served from `/_next/static/media/`).

## Non-goals

- Do NOT change any component yet.
- Do NOT add other fonts.
- Do NOT commit.

## Open questions

None.
