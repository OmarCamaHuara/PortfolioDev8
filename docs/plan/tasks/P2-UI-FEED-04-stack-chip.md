---
id: P2-UI-FEED-04
title: Build StackChip component (reusable)
category: UI-FEED
priority: P2
estimate_hours: 1
depends_on: [P1-DESIGN-01, P1-DESIGN-02]
blocks: [P2-UI-FEED-02, P2-UI-FEED-03, P2-UI-FEED-05]
status: pending
---

# P2-UI-FEED-04 — StackChip component

## Context

Small reusable chip for stack labels (Java 17, Spring Boot, etc.). Used in ProjectCard, LabCard, Timeline, and /hire-me. Monospace, bordered, 12px, hover accent.

**References:**
- `docs/plan/design-system.md` § Chip de Stack

## Inputs

**Files to read:**
- `docs/plan/design-system.md`

## Outputs

**Files to create:**
- `src/components/StackChip/StackChip.tsx`
- `src/components/StackChip/StackChip.module.scss`
- `src/components/StackChip/index.ts` (export barrel)

## Implementation steps

1. Component:
   ```tsx
   export default function StackChip({ label, active = false }: { label: string; active?: boolean }) {
     return <span className={cx(styles.chip, active && styles.active)}>{label}</span>;
   }
   ```
2. SCSS:
   ```scss
   .chip {
     display: inline-block;
     font-family: var(--ff-mono);
     font-size: var(--fs-xs);
     letter-spacing: 0.05em;
     padding: var(--sp-2) var(--sp-3);
     border: 1px solid var(--border);
     border-radius: 2px;
     color: var(--text-muted);
     transition: all 150ms ease;
   }
   .chip:hover { border-color: var(--accent); color: var(--accent); }
   .chip.active { border-color: var(--accent); color: var(--accent); background: var(--accent-dim); }
   ```
3. No commit.

## Verification

```bash
test -f src/components/StackChip/StackChip.tsx && echo OK
grep -c "font-family: var(--ff-mono)" src/components/StackChip/StackChip.module.scss
# expected: >=1
npm run build
# expected: succeeds
```

## Non-goals

- Do NOT make it a form input (just a label).
- Do NOT commit.

## Open questions

None.
