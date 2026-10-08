---
id: P4-OPS-08
title: Lighthouse CI target budget — LCP <2.5s, INP <200ms, CLS <0.1
category: OPS
priority: P4
estimate_hours: 2
depends_on: []
blocks: []
status: pending
---

# P4-OPS-08 — Lighthouse CI budget

## Context

Core Web Vitals 2025 targets. Install Lighthouse CI in GitHub Actions to fail PR builds that regress LCP, INP, or CLS. Signal to AI search engines (Google AI Overviews, Perplexity) that cite CWV-passing pages more.

**References:**
- https://web.dev/articles/vitals
- https://github.com/GoogleChrome/lighthouse-ci

## Inputs

**External dependencies:**
- GitHub Actions

## Outputs

**Files to create:**
- `.github/workflows/lighthouse.yml`
- `lighthouserc.json`

## Implementation steps

1. `lighthouserc.json`:
   ```json
   {
     "ci": {
       "collect": {
         "staticDistDir": "./out",
         "url": ["http://localhost/", "http://localhost/writing", "http://localhost/work", "http://localhost/labs"]
       },
       "assert": {
         "assertions": {
           "largest-contentful-paint": ["error", { "maxNumericValue": 2500 }],
           "interaction-to-next-paint": ["error", { "maxNumericValue": 200 }],
           "cumulative-layout-shift": ["error", { "maxNumericValue": 0.1 }],
           "total-blocking-time": ["warn", { "maxNumericValue": 300 }],
           "categories:accessibility": ["error", { "minScore": 0.95 }]
         }
       }
     }
   }
   ```
2. `.github/workflows/lighthouse.yml`:
   ```yaml
   name: Lighthouse CI
   on:
     pull_request:
       paths: ['src/**', 'content/**', 'public/**']
   jobs:
     lhci:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - uses: actions/setup-node@v4
           with: { node-version: '20', cache: 'npm' }
         - run: npm ci
         - run: npm run build && npm run export # if using static export, else use next start
         - run: npx @lhci/cli autorun
   ```
3. If using Next.js SSR (not static export), replace `staticDistDir` with `startServerCommand`.
4. No commit.

## Verification

- Trigger a PR with a change that regresses LCP (e.g. huge image unoptimized).
- Expected: workflow fails with LCP assertion error.

## Non-goals

- Do NOT set unrealistic budgets.
- Do NOT run on every push — PR only.
- Do NOT commit.

## Open questions

None.
