---
id: P1-HIRE-04
title: Add Schema.org JobApplicant JSON-LD to root layout
category: HIRE
priority: P1
estimate_hours: 1
depends_on: []
blocks: []
status: pending
---

# P1-HIRE-04 — Add Schema.org JSON-LD for sourcing tools

## Context

Recruiter sourcing tools (SeekOut, hireEZ, LinkedIn Recruiter) parse Schema.org structured data to enrich candidate profiles. Adding `Person` + `JobApplicant` + `knowsAbout` + `seeks` signals makes Omar discoverable in these tools' searches.

**References:**
- https://schema.org/Person
- https://schema.org/JobPosting (for `seeks`)
- `src/app/layout.tsx`

## Inputs

**Files to read:**
- `src/app/layout.tsx`

## Outputs

**Files to modify:**
- `src/app/layout.tsx` — add `<script type="application/ld+json">` with Person data

## Implementation steps

1. In `src/app/layout.tsx`, inside the `<body>` (preferably at top), add:
   ```tsx
   const jsonLd = {
     '@context': 'https://schema.org',
     '@type': 'Person',
     name: 'Omar Cama Huarahuara',
     url: 'https://ohmar.dev',
     jobTitle: 'AI engineer with senior backend background',
     worksFor: { '@type': 'Organization', name: 'Premiersoft' },
     sameAs: [
       'https://github.com/OmarCamaHuara',
       'https://linkedin.com/in/omar-cama-huarahuara', // confirm URL
       'https://youtube.com/@QuERSERSEnior',
     ],
     knowsAbout: [
       'Java', 'Spring Boot', 'Hexagonal Architecture', 'PostgreSQL', 'Oracle PL/SQL',
       'Large Language Models', 'Retrieval-Augmented Generation', 'Model Context Protocol',
       'Docker', 'Kubernetes', 'Backend Engineering', 'AI Engineering'
     ],
     seeks: {
       '@type': 'JobPosting',
       title: 'AI Engineer / LLM Engineer / AI-adjacent Backend',
       employmentType: ['FULL_TIME', 'CONTRACTOR'],
       jobLocationType: 'TELECOMMUTE',
       applicantLocationRequirements: [
         { '@type': 'Country', name: 'United States' },
         { '@type': 'Country', name: 'Brazil' },
         { '@type': 'Place', name: 'European Union' }
       ],
     },
   };
   // ...
   <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
   ```
2. Confirm the LinkedIn URL slug and YouTube handle with user if available; else leave as-is.
3. No commit.

## Verification

```bash
grep -c 'application/ld\+json' src/app/layout.tsx
# expected: 1
grep -c "'@type': 'Person'" src/app/layout.tsx
# expected: 1
npm run build
# expected: succeeds
curl -s http://localhost:3000 | grep -c 'application/ld+json'
# expected: 1
# Then paste the JSON into https://validator.schema.org/ and confirm no errors.
```

## Non-goals

- Do NOT include PII (phone, exact address, birthdate).
- Do NOT add email in JSON-LD (spam risk — email already in /hire-me).
- Do NOT commit.

## Open questions

- Confirm LinkedIn URL and YouTube handle slug with user.
