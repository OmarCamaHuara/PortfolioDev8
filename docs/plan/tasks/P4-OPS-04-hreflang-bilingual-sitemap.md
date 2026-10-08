---
id: P4-OPS-04
title: hreflang + bilingual sitemap in sitemap.ts
category: OPS
priority: P4
estimate_hours: 2
depends_on: [P1-UI-05]
blocks: []
status: pending
---

# P4-OPS-04 — hreflang + bilingual sitemap

## Context

With EN primary + pt-BR variant per piece, Google needs explicit hreflang signals and a sitemap listing both language versions. Without this, Google guesses — and often picks the wrong one.

**References:**
- https://developers.google.com/search/docs/specialty/international/localized-versions
- `src/app/sitemap.ts` (existing)

## Inputs

**Files to read:**
- `src/app/sitemap.ts`
- `content/writing/*.mdx` (identify pieces with `lang: en` vs `lang: pt-BR`)
- `content/work/*.mdx`

## Outputs

**Files to modify:**
- `src/app/sitemap.ts` — emit `alternates: { languages: {...} }` for each piece with both versions
- `src/app/layout.tsx` (or per-page) — emit `<link rel="alternate" hreflang="..." href="...">` tags

## Implementation steps

1. Group content by base slug (strip lang suffix if any convention like `-en` / `-pt`). For now assume 1 slug per lang via frontmatter.
2. Build sitemap entries with `alternates`:
   ```ts
   {
     url: 'https://ohmar.dev/writing/my-slug',
     lastModified: post.updatedAt,
     alternates: {
       languages: {
         'en': 'https://ohmar.dev/writing/my-slug',  // if lang=en
         'pt-BR': 'https://ohmar.dev/writing/my-slug-pt'  // if a sibling exists
       }
     }
   }
   ```
3. Also emit for `/hire-me` ↔ `/trabalhe-comigo` pairing.
4. In `layout.tsx`, add `<head><link rel="alternate" hreflang="en" href="https://ohmar.dev/..." /><link rel="alternate" hreflang="pt-BR" href="..." /></head>` dynamic per page.
5. Validate via https://technicalseo.com/tools/hreflang/.
6. No commit.

## Verification

```bash
curl -s https://ohmar.dev/sitemap.xml | grep -c "hreflang\|xhtml:link"
# expected: >=1
# Then paste sitemap into https://www.xml-sitemaps.com/validate-xml-sitemap.html
```

## Non-goals

- Do NOT add language switcher UI widget here (separate task if needed).
- Do NOT commit.

## Open questions

- Convention for sibling slug names: `-pt` suffix, separate route prefix, or embedded in frontmatter `alternates`? Decide and document.
