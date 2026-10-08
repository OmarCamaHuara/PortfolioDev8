---
id: P2-RAG-UI-04
title: Loading skeleton (3 SourceCard placeholders) for semantic search
category: RAG-UI
priority: P2
estimate_hours: 0.5
depends_on: [P2-RAG-UI-02]
blocks: []
status: pending
---

# P2-RAG-UI-04 — Loading skeleton

## Context

Replace spinner/"Loading..." text with proper skeleton of 3 SourceCard placeholders. Per the frontend-loading-states skill principle: every async fetch has 4 states (loading, error, empty, offline), and loading is a skeleton, never a bare spinner.

**References:**
- `docs/plan/design-system.md` § Motion
- Frontend loading states general spec

## Inputs

**Files to read:**
- `src/components/SourceCard/SourceCard.tsx` (post P2-RAG-UI-02)

## Outputs

**Files to create:**
- `src/components/SourceCard/SourceCardSkeleton.tsx`

**Files to modify:**
- `src/components/SourceCard/SourceCard.module.scss` — add `.skeleton` styles

## Implementation steps

1. `SourceCardSkeleton.tsx`:
   ```tsx
   export default function SourceCardSkeleton() {
     return (
       <article className={cx(styles.card, styles.skeleton)}>
         <div className={styles.head}>
           <span className={styles.chipPlaceholder} aria-hidden="true" />
           <span className={styles.chipPlaceholder} aria-hidden="true" />
         </div>
         <div className={styles.titlePlaceholder} aria-hidden="true" />
         <div className={styles.snippetPlaceholder} aria-hidden="true" />
         <div className={styles.snippetPlaceholder} aria-hidden="true" style={{ width: '70%' }} />
         <span className="sr-only">Loading result</span>
       </article>
     );
   }
   ```
2. SCSS additions:
   ```scss
   .skeleton {
     opacity: 0.6;
     pointer-events: none;
   }
   .chipPlaceholder,
   .titlePlaceholder,
   .snippetPlaceholder {
     background: linear-gradient(90deg, var(--bg-light) 0%, var(--bg-elevated) 50%, var(--bg-light) 100%);
     background-size: 200% 100%;
     animation: shimmer 1.5s ease-in-out infinite;
     border-radius: 2px;
   }
   .chipPlaceholder { width: 50px; height: 20px; display: inline-block; }
   .titlePlaceholder { width: 70%; height: 20px; margin: var(--sp-3) 0; }
   .snippetPlaceholder { width: 100%; height: 14px; margin-bottom: var(--sp-2); }
   @keyframes shimmer { 0% { background-position: -200% 0 } 100% { background-position: 200% 0 } }
   @media (prefers-reduced-motion: reduce) { .chipPlaceholder, .titlePlaceholder, .snippetPlaceholder { animation: none; } }
   ```
3. In `/labs/semantic-search`, render 3 skeletons when state is 'loading'.
4. No commit.

## Verification

```bash
test -f src/components/SourceCard/SourceCardSkeleton.tsx && echo OK
grep -c "shimmer" src/components/SourceCard/SourceCard.module.scss
# expected: >=1
npm run build
# expected: succeeds
```

## Non-goals

- Do NOT use a spinner.
- Do NOT animate aggressively.
- Do NOT commit.

## Open questions

None.
