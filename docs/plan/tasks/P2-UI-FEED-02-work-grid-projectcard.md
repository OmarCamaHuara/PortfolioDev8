---
id: P2-UI-FEED-02
title: Rebuild Work grid with ProjectCard component
category: UI-FEED
priority: P2
estimate_hours: 2
depends_on: [P1-DESIGN-01, P1-DESIGN-02, P2-UI-FEED-04]
blocks: []
status: pending
---

# P2-UI-FEED-02 — Work grid with ProjectCard

## Context

The `/work` page shows Project Write-ups as a 2-column grid of cards on desktop, 1 column on mobile. Each card: title, 2-line description, stack chips, external+github icons. Hover: lift + border highlight.

**References:**
- `docs/plan/design-system.md` § Project Card
- `src/app/work/page.tsx`

## Inputs

**Files to read:**
- `src/app/work/page.tsx`
- `src/lib/content.ts` (project frontmatter shape)

## Outputs

**Files to create:**
- `src/components/ProjectCard/ProjectCard.tsx`
- `src/components/ProjectCard/ProjectCard.module.scss`

**Files to modify:**
- `src/app/work/page.tsx` — use new grid + ProjectCard

## Implementation steps

1. Build `ProjectCard.tsx`:
   ```tsx
   <article className={styles.card}>
     <div className={styles.head}>
       <h3 className={styles.title}><Link href={project.url}>{project.title}</Link></h3>
       <div className={styles.icons}>
         {project.demoUrl && <a href={project.demoUrl} aria-label="Live demo">↗</a>}
         {project.githubUrl && <a href={project.githubUrl} aria-label="GitHub">⌘</a>}
       </div>
     </div>
     <p className={styles.description}>{project.description}</p>
     <ul className={styles.chips}>
       {project.stack.map(tech => <li key={tech}><StackChip label={tech} /></li>)}
     </ul>
   </article>
   ```
2. Grid in `work/page.tsx`:
   ```tsx
   <div className={styles.grid}>
     {projects.map(p => <ProjectCard key={p.slug} project={p} />)}
   </div>
   ```
   SCSS grid: `grid-template-columns: 1fr; gap: var(--sp-6); @media (min-width: 768px) { grid-template-columns: 1fr 1fr; }`
3. Card styling:
   - Border `1px solid var(--border)`, radius 4px, padding `var(--sp-6)`.
   - Hover: `border-color: var(--border-strong); transform: translateY(-2px); transition: 150ms ease;`.
4. Icons in Roboto Mono small, muted → accent on hover.
5. No commit.

## Verification

```bash
test -f src/components/ProjectCard/ProjectCard.tsx && echo OK
grep -c "grid-template-columns" src/app/work/work.module.scss
# expected: >=1
npm run build
# expected: succeeds
```

## Non-goals

- Do NOT write Project Write-ups content here (CONTENT-02, CONTENT-03).
- Do NOT commit.

## Open questions

- The frontmatter shape may need extending to include `stack`, `demoUrl`, `githubUrl`. If missing, extend `src/lib/content.ts` to parse them.
