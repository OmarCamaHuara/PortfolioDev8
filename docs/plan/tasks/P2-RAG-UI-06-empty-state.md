---
id: P2-RAG-UI-06
title: Empty state ("No matches above threshold. Try something broader.")
category: RAG-UI
priority: P2
estimate_hours: 0.5
depends_on: []
blocks: []
status: pending
---

# P2-RAG-UI-06 — Empty state component

## Context

When search returns 0 results (threshold too high or query out of domain), show a dignified empty state that teaches the user to broaden the query.

**References:**
- `src/components/EmptyState/EmptyState.tsx` (existing — may extend or create new specific one)
- `CONTEXT.md` § Problem-first

## Inputs

**Files to read:**
- `src/components/EmptyState/EmptyState.tsx`

## Outputs

**Files to create (or modify EmptyState):**
- Either extend EmptyState with a new `kind="search"` prop, OR create a dedicated `SearchEmptyState.tsx`. Pick simpler option.

## Implementation steps

1. Extend `EmptyState` with new kind:
   ```tsx
   const COPY = {
     writing: 'No writing yet. Check back soon.',
     work: 'No projects yet. Check back soon.',
     search: 'No matches above threshold. Try a broader query like "backend" or "AI".',
   };
   ```
2. In `/labs/semantic-search`, pass `kind="search"` when state is 'empty'.
3. Styling same as existing EmptyState.
4. No commit.

## Verification

```bash
grep -c "search" src/components/EmptyState/EmptyState.tsx
# expected: >=1
npm run build
# expected: succeeds
```

## Non-goals

- Do NOT suggest specific prompts (they're already in SuggestedPrompts above the input).
- Do NOT commit.

## Open questions

None.
