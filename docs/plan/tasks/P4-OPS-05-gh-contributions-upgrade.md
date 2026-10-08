---
id: P4-OPS-05
title: GhContributions upgrade — pinned repos live from GH API
category: OPS
priority: P4
estimate_hours: 3
depends_on: []
blocks: []
status: pending
---

# P4-OPS-05 — GhContributions upgrade

## Context

`src/components/GhContributions/` currently shows a contribution heatmap. Upgrade it to also show the GH user's **pinned repos** fetched live. More signal than just a heatmap — recruiter sees named repos.

**References:**
- https://docs.github.com/en/graphql/reference/objects#pinnableitem
- `src/components/GhContributions/`

## Inputs

**External dependencies:**
- GitHub Personal Access Token with `public_repo` scope (env var `GITHUB_TOKEN`)

## Outputs

**Files to create:**
- `src/lib/githubClient.ts` — GraphQL client for pinned repos
- `src/components/GhPinned/GhPinned.tsx`
- `src/components/GhPinned/GhPinned.module.scss`

**Files to modify:**
- `src/components/GhContributions/` or Home — mount `<GhPinned />` alongside heatmap

## Implementation steps

1. GraphQL query:
   ```graphql
   {
     user(login: "OmarCamaHuara") {
       pinnedItems(first: 6, types: REPOSITORY) {
         nodes {
           ... on Repository {
             name
             description
             url
             stargazerCount
             primaryLanguage { name color }
           }
         }
       }
     }
   }
   ```
2. Server Component fetch at build/revalidate (revalidate 1 day).
3. Render as grid of 6 cards similar to ProjectCard.
4. Fallback: if GH API fails, render empty state "GitHub pinned repos unavailable right now".
5. No commit.

## Verification

```bash
test -f src/components/GhPinned/GhPinned.tsx && echo OK
grep -c "pinnedItems" src/lib/githubClient.ts
# expected: 1
# With GITHUB_TOKEN set:
npm run build
# expected: Home shows pinned repos
```

## Non-goals

- Do NOT make the token client-side (never).
- Do NOT include forks.
- Do NOT commit.

## Open questions

- Which 6 repos pinned on GH? Need user to pin: trading-mvp (if public), hiria_pro, lokai, PortfolioDev8, ActiveInverciones, and one more.
