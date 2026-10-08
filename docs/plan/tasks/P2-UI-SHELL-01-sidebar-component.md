---
id: P2-UI-SHELL-01
title: Build Sidebar component (desktop fixed, mobile hamburger)
category: UI-SHELL
priority: P2
estimate_hours: 3
depends_on: [P1-DESIGN-01, P1-DESIGN-02]
blocks: [P2-UI-SHELL-03]
status: pending
---

# P2-UI-SHELL-01 — Sidebar component

## Context

Primary structural element of the new layout per `docs/plan/design-system.md`. On desktop (≥1024px) it's a 280px fixed sidebar containing wordmark `ohmar_tai`, headline, vertical nav with section-highlight on scroll, and social links at the footer. On mobile it collapses to a sticky topbar with hamburger menu.

**References:**
- `docs/plan/design-system.md` § Layout + § Sidebar fixa anatomia
- `src/components/Nav/Nav.tsx` (current nav — this task supersedes it on desktop)

## Inputs

**Files to read:**
- `docs/plan/design-system.md`
- `src/components/Nav/Nav.tsx` (reference for existing routes)

## Outputs

**Files to create:**
- `src/components/Sidebar/Sidebar.tsx`
- `src/components/Sidebar/Sidebar.module.scss`
- `src/components/Sidebar/WordmarkCursor.tsx` (sub-component for blinking cursor)

**Files to modify:**
- `src/app/layout.tsx` — mount `<Sidebar />` instead of (or alongside) `<Nav />` based on viewport

## Implementation steps

1. Build `Sidebar.tsx` with structure:
   ```tsx
   <aside className={styles.sidebar} aria-label="Primary">
     <div className={styles.wordmark}>
       ohmar<WordmarkCursor />
     </div>
     <p className={styles.headline}>
       AI engineer with senior backend background.
     </p>
     <nav className={styles.nav} aria-label="Site sections">
       {items.map(it => (
         <Link key={it.href} href={it.href} className={cx(styles.navItem, isActive(it) && styles.active)}>
           <span className={styles.dash} aria-hidden="true" />
           {it.label}
         </Link>
       ))}
     </nav>
     <footer className={styles.footer}>
       <a href="https://github.com/OmarCamaHuara" aria-label="GitHub">gh</a>
       <a href="https://linkedin.com/in/..." aria-label="LinkedIn">in</a>
       <a href="mailto:...">✉</a>
     </footer>
   </aside>
   ```
2. `WordmarkCursor.tsx`:
   ```tsx
   export default function WordmarkCursor() {
     return <span className={styles.cursor} aria-hidden="true">_tai|</span>;
   }
   ```
   SCSS: `.cursor { color: var(--accent); animation: blink 1.2s step-start infinite; } @keyframes blink { 50% { opacity: 0 } } @media (prefers-reduced-motion: reduce) { .cursor { animation: none; } }`
3. `Sidebar.module.scss` using tokens:
   - Desktop: `position: fixed; left: 0; top: 0; bottom: 0; width: 280px; padding: var(--sp-12) var(--sp-6); background: var(--bg); border-right: 1px solid var(--border);`
   - Mobile: `display: none;` on desktop sidebar; a separate `TopbarMobile` component (or inline media query) handles mobile.
4. For mobile, create a `TopbarMobile` sibling or export a hamburger-based collapsible — simplest is CSS media query hiding sidebar below 1024px and showing an inline topbar component (reuse existing Nav for mobile).
5. In `src/app/layout.tsx`, conditionally render:
   ```tsx
   <Sidebar />  {/* desktop only via CSS */}
   <NavMobile /> {/* mobile only via CSS */}
   <main>{children}</main>
   ```
   Content needs `padding-left: 280px` on desktop (via globals or main wrapper).
6. Nav items: About (/about if exists, else #now), Writing (/writing), Work (/work), Labs (/labs), Hire me (/hire-me).
7. No commit.

## Acceptance Criteria (optional — multiple states)

**Scenario: Desktop view**
```gherkin
Given viewport is 1280px wide
When I visit "/"
Then the Sidebar is visible on the left, 280px wide, fixed
  And the main content starts after a 280px left offset
  And the wordmark displays "ohmar_tai|" with the cursor blinking
```

**Scenario: Mobile view**
```gherkin
Given viewport is 375px wide
When I visit "/"
Then the Sidebar is hidden
  And a topbar is visible at the top of the page
  And the main content starts at viewport width 0
```

**Scenario: Reduced motion**
```gherkin
Given the user has prefers-reduced-motion: reduce
When the Sidebar renders
Then the cursor "|" is visible but does not blink
```

## Verification

```bash
test -f src/components/Sidebar/Sidebar.tsx && echo OK
grep -c "position: fixed" src/components/Sidebar/Sidebar.module.scss
# expected: >=1
grep -c "@media (prefers-reduced-motion" src/components/Sidebar/Sidebar.module.scss
# expected: >=1
npm run build
# expected: succeeds
```

## Non-goals

- Do NOT implement scroll-triggered section highlight here (P2-UI-SHELL-03).
- Do NOT add Open to Work badge here — that's already in P1-HIRE-03 Nav; migrate it to the Sidebar as a separate follow-up.
- Do NOT commit.

## Open questions

- Does `/about` route exist? If not, "About" nav item points to `#now` section on Home.
