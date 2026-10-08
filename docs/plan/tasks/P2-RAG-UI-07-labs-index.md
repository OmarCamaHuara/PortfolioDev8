---
id: P2-RAG-UI-07
title: /labs index page listing all Labs with LabCard
category: RAG-UI
priority: P2
estimate_hours: 1
depends_on: [P2-UI-FEED-03]
blocks: []
status: pending
---

# P2-RAG-UI-07 — /labs index page

## Context

Index page listing all Labs with their LabCard. First and only Lab for now is semantic search. Future Labs added as new entries.

**References:**
- `docs/plan/design-system.md` § Lab Card
- `CONTEXT.md` § Labs (Feeds and Surfaces)

## Inputs

**Files to read:**
- `src/components/LabCard/LabCard.tsx` (post P2-UI-FEED-03)

## Outputs

**Files to create:**
- `src/app/labs/page.tsx`
- `src/app/labs/labs.module.scss`
- `src/content/labs.ts` — static data source

## Implementation steps

1. `src/content/labs.ts`:
   ```ts
   export type Lab = {
     slug: string;
     title: string;
     status: 'live' | 'wip';
     hint: string;
     description: string;
     stack: string[];
   };
   export const LABS: Lab[] = [
     {
       slug: 'semantic-search',
       title: 'Lab 01 — Semantic Search',
       status: 'live',
       hint: 'Try: "spring and oracle"',
       description: 'Top-K RAG retrieval over this portfolio. Java 17 + Spring Boot + pgvector + Google text-embedding-004.',
       stack: ['Java 17', 'Spring Boot', 'pgvector', 'Gemini embeddings'],
     },
   ];
   ```
2. `page.tsx`:
   ```tsx
   export default function LabsPage() {
     return (
       <main>
         <PageHeader title="Labs" subtitle="Working artifacts. Code open on GitHub." />
         <ul className={styles.grid}>
           {LABS.map(lab => <li key={lab.slug}><LabCard {...lab} /></li>)}
         </ul>
       </main>
     );
   }
   ```
3. Grid: `grid-template-columns: 1fr; gap: var(--sp-6); @media (min-width: 768px) { grid-template-columns: 1fr 1fr; }`.
4. Metadata (title "Labs · Omar Cama", description).
5. No commit.

## Verification

```bash
test -f src/app/labs/page.tsx && echo OK
test -f src/content/labs.ts && echo OK
grep -c "semantic-search" src/content/labs.ts
# expected: >=1
npm run build
# expected: /labs compiled
```

## Non-goals

- Do NOT list WIP Labs with empty content ("coming soon" cards).
- Do NOT commit.

## Open questions

None.
