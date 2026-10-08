---
id: P2-UI-SHELL-03
title: IntersectionObserver — section highlight in Sidebar on scroll
category: UI-SHELL
priority: P2
estimate_hours: 2
depends_on: [P2-UI-SHELL-01]
blocks: []
status: pending
---

# P2-UI-SHELL-03 — Scroll-triggered section highlight

## Context

Brittany-style behavior: as the user scrolls through the Home sections (Writing, Work, GitHub, Now), the corresponding nav item in the Sidebar highlights (bold color + yellow dash). Only applies on Home (and other pages with multiple `<section id>` landmarks). IntersectionObserver-based.

**References:**
- `docs/plan/design-system.md` § Interactions (scroll-triggered)
- `src/components/Sidebar/Sidebar.tsx` (post P2-UI-SHELL-01)

## Inputs

**Files to read:**
- `src/components/Sidebar/Sidebar.tsx`
- `src/app/page.tsx` (section landmarks)

## Outputs

**Files to create:**
- `src/components/Sidebar/useSectionHighlight.ts` — custom hook

**Files to modify:**
- `src/components/Sidebar/Sidebar.tsx` — use the hook

## Implementation steps

1. Create `useSectionHighlight.ts`:
   ```tsx
   'use client';
   import { useEffect, useState } from 'react';

   export function useSectionHighlight(sectionIds: string[], rootMarginBottom = '-50%') {
     const [active, setActive] = useState<string | null>(null);
     useEffect(() => {
       const observer = new IntersectionObserver(
         (entries) => {
           const visible = entries.find(e => e.isIntersecting);
           if (visible) setActive(visible.target.id);
         },
         { rootMargin: `0px 0px ${rootMarginBottom} 0px`, threshold: 0 }
       );
       sectionIds.forEach(id => {
         const el = document.getElementById(id);
         if (el) observer.observe(el);
       });
       return () => observer.disconnect();
     }, [sectionIds.join(',')]);
     return active;
   }
   ```
2. In `Sidebar.tsx` (make it a Client Component if not already):
   - Call hook with ids `['writing','work','github','now']`.
   - Pass `active` as class modifier to the matching nav item.
3. Ensure Home sections have matching `<section id="writing">` etc. — modify `src/app/page.tsx` if missing.
4. Transition `opacity + color` 300ms ease on `.navItem.active`.
5. No commit.

## Verification

```bash
test -f src/components/Sidebar/useSectionHighlight.ts && echo OK
grep -c "IntersectionObserver" src/components/Sidebar/useSectionHighlight.ts
# expected: 1
grep -c 'id="writing"' src/app/page.tsx
# expected: 1
npm run build
# expected: succeeds
```

**Manual check:**
- [ ] Scroll through Home sections; corresponding Sidebar nav item highlights.

## Non-goals

- Do NOT animate the dash with keyframes — simple opacity/transform is enough.
- Do NOT commit.

## Open questions

None.
