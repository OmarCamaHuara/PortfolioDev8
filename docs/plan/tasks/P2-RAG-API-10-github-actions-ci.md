---
id: P2-RAG-API-10
title: GitHub Actions CI (build, test, docker push, fly deploy)
category: RAG-API
priority: P2
estimate_hours: 2
depends_on: [P2-RAG-API-09]
blocks: []
status: pending
---

# P2-RAG-API-10 — GitHub Actions CI

## Context

CI pipeline for rag-api: on push to main that touches `rag-api/**`, run tests, build Docker image, deploy to Fly.io. Separate workflow from the Next.js portfolio (deployed via Vercel).

**References:**
- `docs/plan/rag-architecture.md` § Repositório .github/workflows/

## Inputs

**External dependencies:**
- GitHub Actions enabled on repo
- Secret `FLY_API_TOKEN` set in repo settings

## Outputs

**Files to create:**
- `.github/workflows/rag-api.yml`

## Implementation steps

1. `.github/workflows/rag-api.yml`:
   ```yaml
   name: rag-api CI/CD
   on:
     push:
       branches: [main]
       paths: ['rag-api/**', '.github/workflows/rag-api.yml']
     pull_request:
       paths: ['rag-api/**']

   jobs:
     test:
       runs-on: ubuntu-latest
       services:
         postgres:
           image: pgvector/pgvector:pg16
           env:
             POSTGRES_USER: rag
             POSTGRES_PASSWORD: rag
             POSTGRES_DB: rag
           ports: ['5432:5432']
           options: --health-cmd pg_isready --health-interval 5s --health-timeout 3s --health-retries 10
       steps:
         - uses: actions/checkout@v4
         - uses: actions/setup-java@v4
           with: { java-version: '17', distribution: 'temurin', cache: 'maven' }
         - name: Test
           working-directory: rag-api
           env:
             DB_URL: jdbc:postgresql://localhost:5432/rag
             DB_USER: rag
             DB_PASSWORD: rag
           run: mvn -B verify

     deploy:
       needs: test
       if: github.ref == 'refs/heads/main'
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - uses: superfly/flyctl-actions/setup-flyctl@master
         - name: Deploy
           working-directory: rag-api
           env:
             FLY_API_TOKEN: ${{ secrets.FLY_API_TOKEN }}
           run: flyctl deploy --remote-only
   ```
2. Document in rag-api README how to generate FLY_API_TOKEN (`flyctl auth token`).
3. No commit.

## Verification

- Trigger: push to a feature branch with changes to `rag-api/`.
- Expected: workflow runs test job, no deploy.
- After merge to main: both jobs run; deploy succeeds.

## Non-goals

- Do NOT run E2E tests here that call external APIs (Google embeddings) in CI — mock in tests.
- Do NOT deploy on PR, only on main.
- Do NOT commit.

## Open questions

- Should PR runs include a preview deploy? Not in v1 — adds complexity.
