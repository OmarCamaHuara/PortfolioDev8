---
id: P2-UI-SHELL-02
title: Refresh Footer with social links in mono + ADR link
category: UI-SHELL
priority: P2
estimate_hours: 1
depends_on: [P1-DESIGN-01]
blocks: []
status: pending
---

# P2-UI-SHELL-02 — Footer refresh

## Context

Footer currently has basic content. Update to match the design system aesthetic (Roboto Mono, muted color, understated). Include GitHub repo link to signal that the site is open source + a "last updated" dynamic timestamp.

**References:**
- `docs/plan/design-system.md` § Interactions (hover color shifts)
- `src/components/Footer/Footer.tsx`

## Inputs

**Files to read:**
- `src/components/Footer/Footer.tsx`
- `src/components/Footer/Footer.module.scss`

## Outputs

**Files to modify:**
- `src/components/Footer/Footer.tsx` — EN copy, mono styling
- `src/components/Footer/Footer.module.scss`

## Implementation steps

1. Footer content:
   ```
   ohmar_tai · AI engineer backend-first
   Built with Next.js, deployed on Vercel. Source on GitHub.
   © 2026 Omar Cama Huarahuara · [github][linkedin][email][rss]
   ```
2. Styling: Roboto Mono, `--fs-xs`, `--text-muted`, hover color `--accent`.
3. Border top `1px solid var(--border)`.
4. Padding `--sp-8 --sp-6`.
5. Add rss link to `/rss.xml`.
6. No commit.

## Verification

```bash
grep -c "ohmar_tai" src/components/Footer/Footer.tsx
# expected: 1
grep -c "rss" src/components/Footer/Footer.tsx
# expected: 1
grep -c "font-family: var(--ff-mono)" src/components/Footer/Footer.module.scss
# expected: >=1
npm run build
# expected: succeeds
```

## Non-goals

- Do NOT add newsletter signup here (that's SubscribeInline, kept as-is for now).
- Do NOT commit.

## Open questions

None.
