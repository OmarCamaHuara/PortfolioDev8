---
id: P1-UI-04
title: Update metadata root (title, description, OG tags) in EN
category: UI
priority: P1
estimate_hours: 1
depends_on: [P0-DOC-01]
blocks: []
status: pending
---

# P1-UI-04 — Update root metadata in EN

## Context

`src/app/layout.tsx` exports a `metadata` object. It must reflect the new positioning in EN with OG and Twitter tags for sharing on technical social surfaces (LinkedIn, X, Bluesky). Also add Open Graph image, Twitter card.

**References:**
- `src/app/layout.tsx`
- `docs/adr/0004-reposition-ai-engineer-backend-first.md` (post P0-DOC-01)
- https://nextjs.org/docs/app/api-reference/functions/generate-metadata

## Inputs

**Files to read:**
- `src/app/layout.tsx`

## Outputs

**Files to modify:**
- `src/app/layout.tsx` — new `metadata` export

**Files to create (if missing):**
- `public/og-image.png` — 1200x630 OG image (can be placeholder for now, polished in later task)

## Implementation steps

1. Replace existing `metadata` with:
   ```ts
   export const metadata: Metadata = {
     title: {
       default: 'Omar Cama — AI engineer with senior backend background',
       template: '%s · Omar Cama',
     },
     description:
       'AI engineer who ships LLM-integrated systems with the discipline of production backend. Java 17, Spring Boot, Postgres, RAG, MCP. Open to remote US/EU.',
     metadataBase: new URL('https://ohmar.dev'),
     alternates: {
       canonical: '/',
       languages: {
         'en': '/',
         'pt-BR': '/trabalhe-comigo',
       },
     },
     openGraph: {
       type: 'website',
       locale: 'en_US',
       url: 'https://ohmar.dev',
       siteName: 'Omar Cama',
       title: 'Omar Cama — AI engineer with senior backend background',
       description:
         'AI engineer who ships LLM-integrated systems with the discipline of production backend.',
       images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Omar Cama' }],
     },
     twitter: {
       card: 'summary_large_image',
       title: 'Omar Cama — AI engineer with senior backend background',
       description:
         'AI engineer who ships LLM-integrated systems with the discipline of production backend.',
       images: ['/og-image.png'],
     },
     robots: { index: true, follow: true },
   };
   ```
2. If `public/og-image.png` does not exist, create a 1200x630 placeholder solid navy #0a192f with text "ohmar_tai · AI engineer".
3. No commit.

## Verification

```bash
grep -c "AI engineer with senior backend" src/app/layout.tsx
# expected: 1
test -f public/og-image.png && echo OK
npm run build
# expected: succeeds
curl -s http://localhost:3000 | grep -c 'property="og:title"'
# expected: 1
```

## Non-goals

- Do NOT finalize the OG image design — placeholder OK, polish in P4-OPS-08.
- Do NOT touch per-page metadata (Hero, writing, work — each handles its own).
- Do NOT commit.

## Open questions

- Final domain? Placeholder `ohmar.dev` used. Resolved in P4-OPS-03.
