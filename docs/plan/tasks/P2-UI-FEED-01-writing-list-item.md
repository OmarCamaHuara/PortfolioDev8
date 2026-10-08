---
id: P2-UI-FEED-01
title: Rebuild Writing list item (date + lang chip + title + description)
category: UI-FEED
priority: P2
estimate_hours: 2
depends_on: [P1-DESIGN-01, P1-DESIGN-02]
blocks: []
status: pending
---

# P2-UI-FEED-01 — Writing list item component

## Context

The current `PostList` (`src/components/PostList/`) needs to adopt the design-system list-item format: date in Roboto Mono, lang chip, title in Inter semibold, 1-line description in Inter muted. Used in `/writing`.

**References:**
- `docs/plan/design-system.md` § Writing List Item + § Chip de Stack
- `src/components/PostList/`
- `src/lib/content.ts` (data shape — frontmatter contains `title`, `publishedAt`, `lang`, `description`)

## Inputs

**Files to read:**
- `src/components/PostList/*`
- `src/lib/content.ts`

## Outputs

**Files to create (or modify):**
- `src/components/PostList/PostListItem.tsx`
- `src/components/PostList/PostListItem.module.scss`

**Files to modify:**
- `src/components/PostList/PostList.tsx` — use new PostListItem

## Implementation steps

1. Build `PostListItem.tsx`:
   ```tsx
   <article className={styles.item}>
     <time className={styles.date} dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
     <span className={styles.langChip}>{post.lang}</span>
     <Link href={post.url} className={styles.title}>{post.title}</Link>
     <p className={styles.description}>{post.description}</p>
   </article>
   ```
2. SCSS using tokens:
   - `.item`: grid 2 cols on desktop (`140px 1fr`), stack on mobile. Border-bottom `1px solid var(--border)`, padding `var(--sp-4) 0`.
   - `.date`: `font-family: var(--ff-mono)`, `--fs-xs`, `--text-muted`.
   - `.langChip`: `--fs-xs`, mono, `background: var(--accent-dim)`, `color: var(--accent)`, border-radius 2px, padding `0 var(--sp-2)`.
   - `.title`: Inter, `--fs-md`, `--text-strong`, `font-weight: 600`. Hover `color: var(--accent)`.
   - `.description`: Inter, `--fs-sm`, `--text-muted`, max 1 line (`-webkit-line-clamp: 1`).
3. Date format: `Oct 08, 2026` (en-US short).
4. No commit.

## Verification

```bash
test -f src/components/PostList/PostListItem.tsx && echo OK
grep -c "langChip" src/components/PostList/PostListItem.module.scss
# expected: >=1
npm run build
# expected: succeeds
```

## Non-goals

- Do NOT change `/writing` page structure (just the item component).
- Do NOT add filter chips here (filter toolbar is separate, see ADR 0003).
- Do NOT commit.

## Open questions

None.
