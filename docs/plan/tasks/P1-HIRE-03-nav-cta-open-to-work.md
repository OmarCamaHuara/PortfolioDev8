---
id: P1-HIRE-03
title: Add CTA "Open to Work" (pulsing dot) permanent in Nav
category: HIRE
priority: P1
estimate_hours: 2
depends_on: [P1-DESIGN-01, P1-HIRE-01]
blocks: []
status: pending
---

# P1-HIRE-03 — Nav CTA "Open to Work"

## Context

Primary signaling to recruiters that Omar is actively seeking roles. Permanent small badge in the Nav with a pulsing green dot (success color). Links to `/hire-me`. Removable in a single PR once Omar accepts an offer.

**References:**
- `docs/plan/design-system.md` § Componente "CTA Open to Work"
- `src/components/Nav/Nav.tsx`

## Inputs

**Files to read:**
- `src/components/Nav/Nav.tsx`
- `src/components/Nav/Nav.module.scss` (or similar)

## Outputs

**Files to modify:**
- `src/components/Nav/Nav.tsx` — add badge component
- `src/components/Nav/Nav.module.scss` — add styles

## Implementation steps

1. In Nav, add after the primary nav items (far right desktop, below on mobile):
   ```tsx
   <Link href="/hire-me" className={styles.openToWork} aria-label="Open to work. Click for details.">
     <span className={styles.pulseDot} aria-hidden="true" />
     Open to Work
   </Link>
   ```
2. SCSS using tokens:
   ```scss
   .openToWork {
     display: inline-flex;
     align-items: center;
     gap: var(--sp-2);
     font-family: var(--ff-mono);
     font-size: var(--fs-xs);
     text-transform: uppercase;
     letter-spacing: 0.1em;
     padding: var(--sp-2) var(--sp-3);
     border: 1px solid var(--success);
     border-radius: 2px;
     color: var(--success);
     text-decoration: none;
     transition: all 150ms ease;
     &:hover { background: var(--success); color: var(--bg); }
   }
   .pulseDot {
     width: 6px;
     height: 6px;
     border-radius: 50%;
     background: var(--success);
     animation: pulse 2s ease-in-out infinite;
   }
   @keyframes pulse { 50% { opacity: 0.3; } }
   @media (prefers-reduced-motion: reduce) { .pulseDot { animation: none; } }
   ```
3. On mobile (<640px), the badge appears below the main nav or inside a slide-out menu — not between items. Keep readable.
4. No commit.

## Verification

```bash
grep -c "Open to Work" src/components/Nav/Nav.tsx
# expected: 1
grep -c "pulseDot\|openToWork" src/components/Nav/Nav.module.scss
# expected: >=1
npm run build
# expected: succeeds
```

**Manual checks:**
- [ ] Nav shows green badge with pulsing dot.
- [ ] Click → navigates to `/hire-me`.
- [ ] Narrow viewport: badge visible and tappable.
- [ ] With `prefers-reduced-motion`: dot does not animate but is still visible.

## Non-goals

- Do NOT make this badge dismissable. It's permanent during hire-me layer.
- Do NOT change label text. Must say "Open to Work" (consistent signal).
- Do NOT commit.

## Open questions

None.
