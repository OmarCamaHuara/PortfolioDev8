---
id: P2-UI-FEED-03
title: Build LabCard component (status badge + CTA)
category: UI-FEED
priority: P2
estimate_hours: 1.5
depends_on: [P1-DESIGN-01, P1-DESIGN-02, P2-UI-FEED-04]
blocks: [P2-RAG-UI-01, P2-RAG-UI-07]
status: pending
---

# P2-UI-FEED-03 — LabCard component

## Context

Vitrine primária de artefatos técnicos funcionais. Used in `/labs` index and potentially linked from Home. Each LabCard shows status (LIVE/WIP), title, 1-line hint, stack chips, and a CTA button "Try it".

**References:**
- `docs/plan/design-system.md` § Lab Card

## Inputs

**Files to read:**
- `docs/plan/design-system.md`

## Outputs

**Files to create:**
- `src/components/LabCard/LabCard.tsx`
- `src/components/LabCard/LabCard.module.scss`

## Implementation steps

1. Props shape:
   ```ts
   type LabCardProps = {
     title: string;
     slug: string;         // → href /labs/${slug}
     status: 'live' | 'wip';
     hint: string;         // 1-line CTA like 'Try: "spring and oracle"'
     description: string;
     stack: string[];
   };
   ```
2. JSX:
   ```tsx
   <article className={styles.card}>
     <div className={styles.head}>
       <h3 className={styles.title}>{title}</h3>
       <span className={cx(styles.badge, styles[status])}>{status.toUpperCase()}</span>
     </div>
     <p className={styles.hint}>{hint}</p>
     <p className={styles.description}>{description}</p>
     <ul className={styles.chips}>
       {stack.map(t => <StackChip key={t} label={t} />)}
     </ul>
     <Link href={`/labs/${slug}`} className={styles.cta}>Try it →</Link>
   </article>
   ```
3. Badge SCSS:
   - `.live { background: rgba(63,185,80,0.15); color: var(--success); border: 1px solid rgba(63,185,80,0.3); }`
   - `.wip { background: var(--accent-dim); color: var(--accent); border: 1px solid var(--accent); }`
   - Mono, uppercase, letter-spacing 0.1em, padding `2px 8px`, border-radius 2px.
4. Card hover: same as ProjectCard (border + lift).
5. No commit.

## Verification

```bash
test -f src/components/LabCard/LabCard.tsx && echo OK
grep -c "LIVE\|WIP" src/components/LabCard/LabCard.tsx || \
  grep -c "status.toUpperCase" src/components/LabCard/LabCard.tsx
# expected: >=1
npm run build
# expected: succeeds
```

## Non-goals

- Do NOT create /labs index here (P2-RAG-UI-07).
- Do NOT commit.

## Open questions

None.
