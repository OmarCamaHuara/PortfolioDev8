---
id: P2-RAG-UI-05
title: Error state (retry button, problem-first message)
category: RAG-UI
priority: P2
estimate_hours: 0.5
depends_on: []
blocks: []
status: pending
---

# P2-RAG-UI-05 — Error state component

## Context

When ragClient throws (timeout, 5xx, network), show an error component with a clear message and a Retry button. Follows the Problem-first editorial principle: name the user's situation first.

**References:**
- `CONTEXT.md` § Problem-first
- Frontend loading states general spec

## Inputs

**Files to read:**
- `src/components/EmptyState/EmptyState.tsx` (existing, as pattern reference)

## Outputs

**Files to create:**
- `src/components/ErrorState/ErrorState.tsx`
- `src/components/ErrorState/ErrorState.module.scss`

## Implementation steps

1. Component:
   ```tsx
   type ErrorStateProps = { onRetry: () => void };
   export default function ErrorState({ onRetry }: ErrorStateProps) {
     return (
       <div className={styles.wrapper} role="alert">
         <p className={styles.text}>
           Lab 01 is sleeping — Fly.io machine likely waking up. Takes a few seconds.
         </p>
         <button className={styles.retry} onClick={onRetry} type="button">
           Retry →
         </button>
       </div>
     );
   }
   ```
2. SCSS: text in Inter `--text-muted`, button in Roboto Mono `--fs-xs` uppercase, border `--border`, hover `--accent`.
3. No commit.

## Verification

```bash
test -f src/components/ErrorState/ErrorState.tsx && echo OK
grep -c "Retry" src/components/ErrorState/ErrorState.tsx
# expected: 1
npm run build
# expected: succeeds
```

## Non-goals

- Do NOT display stack traces.
- Do NOT use red color — Problem-first is dignified, not alarmist (yellow accent on button is fine).
- Do NOT commit.

## Open questions

None.
