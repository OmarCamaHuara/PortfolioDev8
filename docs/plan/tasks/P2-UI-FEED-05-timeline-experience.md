---
id: P2-UI-FEED-05
title: Build Timeline component for Experience section
category: UI-FEED
priority: P2
estimate_hours: 2
depends_on: [P1-DESIGN-01, P1-DESIGN-02, P2-UI-FEED-04]
blocks: []
status: pending
---

# P2-UI-FEED-05 — Timeline component for Experience

## Context

Brittany-style experience timeline for the Home or `/about` page. List of jobs: date range (mono), role + company (sans), description, stack chips. Used to list work history visibly without a CV download requirement.

**References:**
- `docs/plan/design-system.md` § Timeline Item
- Brittany Chiang's "Where I've worked" section as structural reference

## Inputs

**Files to read:**
- `docs/plan/design-system.md`
- `docs/perfil_llm.public.md` (for experience data)

## Outputs

**Files to create:**
- `src/components/Timeline/Timeline.tsx`
- `src/components/Timeline/TimelineItem.tsx`
- `src/components/Timeline/Timeline.module.scss`
- `src/content/experience.ts` — static data source (array of experience objects)

## Implementation steps

1. Create `src/content/experience.ts`:
   ```ts
   export type ExperienceItem = {
     from: string;   // "2023"
     to: string;     // "Present" | "2022"
     role: string;
     company: string;
     location: string;
     description: string;
     stack: string[];
   };
   export const EXPERIENCE: ExperienceItem[] = [
     {
       from: '2023', to: 'Present',
       role: 'Backend Software Engineer',
       company: 'Premiersoft (allocated to Philips)',
       location: 'Blumenau, BR · Remote',
       description: 'Shipping production medical systems with multi-year uptime SLAs. Java 17, Spring Boot, Oracle PL/SQL, hexagonal architecture.',
       stack: ['Java 17', 'Spring Boot', 'Oracle', 'Hexagonal'],
     },
     // Earlier roles here — fill from perfil_llm.public.md or ask user
   ];
   ```
2. `TimelineItem.tsx`:
   ```tsx
   <article className={styles.item}>
     <div className={styles.date}>{item.from} – {item.to}</div>
     <div className={styles.body}>
       <h3 className={styles.role}>{item.role}</h3>
       <div className={styles.company}>{item.company}</div>
       <div className={styles.location}>{item.location}</div>
       <p className={styles.description}>{item.description}</p>
       <ul className={styles.chips}>{item.stack.map(t => <li key={t}><StackChip label={t} /></li>)}</ul>
     </div>
   </article>
   ```
3. Grid: `grid-template-columns: 120px 1fr; gap: var(--sp-6);` desktop, stack on mobile.
4. Date mono muted; role sans strong; chips below description.
5. `Timeline.tsx` renders `.map(EXPERIENCE)`.
6. No commit.

## Verification

```bash
test -f src/components/Timeline/Timeline.tsx && echo OK
test -f src/content/experience.ts && echo OK
grep -c "Premiersoft" src/content/experience.ts
# expected: >=1
npm run build
# expected: succeeds
```

## Non-goals

- Do NOT mount the Timeline on any page here (that's part of Home/About section updates).
- Do NOT include PII (specific client names if NDA-covered).
- Do NOT commit.

## Open questions

- How many past roles to include? Need user input for pre-Premiersoft history.
