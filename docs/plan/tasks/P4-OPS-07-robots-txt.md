---
id: P4-OPS-07
title: Add robots.txt rules excluding /api/* and /draft/*
category: OPS
priority: P4
estimate_hours: 0.5
depends_on: []
blocks: []
status: pending
---

# P4-OPS-07 — robots.txt

## Context

Signal to crawlers which paths to skip. The rag-api lives on a subdomain so it's auto-covered, but if the Next.js app proxies anything under `/api/*`, exclude. Also exclude `/draft/*` if any draft pages exist.

**References:**
- https://developers.google.com/search/docs/crawling-indexing/robots/intro

## Inputs

**Files to read:**
- `src/app/robots.ts` (if exists)

## Outputs

**Files to create:**
- `src/app/robots.ts` (if not exists)

## Implementation steps

1. `src/app/robots.ts`:
   ```ts
   import type { MetadataRoute } from 'next';

   export default function robots(): MetadataRoute.Robots {
     return {
       rules: [
         { userAgent: '*', allow: '/', disallow: ['/api/', '/draft/', '/_next/'] },
       ],
       sitemap: 'https://ohmar.dev/sitemap.xml',
     };
   }
   ```
2. No commit.

## Verification

```bash
curl -s http://localhost:3000/robots.txt | head
# expected: User-agent: *, Allow: /, Disallow: /api/, Disallow: /draft/
```

## Non-goals

- Do NOT disallow / globally.
- Do NOT commit.

## Open questions

None.
