---
id: P2-RAG-UI-02
title: SourceCard component (title, snippet, URL, source_type chip, score)
category: RAG-UI
priority: P2
estimate_hours: 1.5
depends_on: [P1-DESIGN-01, P2-UI-FEED-04]
blocks: [P2-RAG-UI-01]
status: pending
---

# P2-RAG-UI-02 — SourceCard component

## Context

Reusable card component for displaying a single RAG search result. Shows title (linked), snippet (truncated), URL, source_type as chip, score as mono small meta.

**References:**
- `docs/plan/design-system.md` § Writing List Item + § Chip de Stack

## Inputs

**Files to read:**
- `docs/plan/design-system.md`
- `rag-api/src/main/java/dev/ohmar/rag/retrieval/SearchResult.java` (shape — post P2-RAG-API-05)

## Outputs

**Files to create:**
- `src/components/SourceCard/SourceCard.tsx`
- `src/components/SourceCard/SourceCard.module.scss`

## Implementation steps

1. Component:
   ```tsx
   type SourceCardProps = {
     title: string;
     url: string;
     snippet: string;
     sourceType: 'post' | 'work' | 'adr' | 'design' | 'profile';
     lang?: string;
     score: number;
   };

   export default function SourceCard({ title, url, snippet, sourceType, lang, score }: SourceCardProps) {
     return (
       <article className={styles.card}>
         <div className={styles.head}>
           <StackChip label={sourceType} />
           {lang && <StackChip label={lang} />}
           <span className={styles.score}>{(score * 100).toFixed(0)}%</span>
         </div>
         <h3 className={styles.title}>
           <Link href={url}>{title}</Link>
         </h3>
         <p className={styles.snippet}>{snippet}</p>
       </article>
     );
   }
   ```
2. SCSS:
   - Border `1px solid var(--border)`, radius 4px, padding `var(--sp-5)`.
   - Hover: `border-color: var(--border-strong); transform: translateY(-2px);`.
   - Head row: flex row, gap `--sp-2`, align center.
   - Title: Inter semibold `--fs-md`, color `--text-strong`, link color `--accent` on hover.
   - Snippet: Inter `--fs-sm`, `--text-muted`, line-clamp 3.
   - Score: Roboto Mono `--fs-xs`, `--text-muted`.
3. No commit.

## Verification

```bash
test -f src/components/SourceCard/SourceCard.tsx && echo OK
grep -c "StackChip" src/components/SourceCard/SourceCard.tsx
# expected: >=1
npm run build
# expected: succeeds
```

## Non-goals

- Do NOT fetch the full chunk content on hover — snippet from server is enough.
- Do NOT commit.

## Open questions

None.
