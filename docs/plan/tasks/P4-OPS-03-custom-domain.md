---
id: P4-OPS-03
title: Custom domain setup (e.g. ohmar.dev + api.ohmar.dev)
category: OPS
priority: P4
estimate_hours: 2
depends_on: [P2-RAG-API-09]
blocks: []
status: pending
---

# P4-OPS-03 — Custom domain setup

## Context

Buy and configure a custom domain for the site (Vercel) and for the rag-api (Fly.io). Both HTTPS, both with proper DNS.

**References:**
- `docs/plan/rag-architecture.md` § Decisões abertas (nome do subdomínio)

## Inputs

**External dependencies:**
- Domain registrar account (Cloudflare, Porkbun, Namecheap)
- Vercel + Fly accounts

## Outputs

**Changes externas:**
- Domain purchased
- DNS: A/CNAME for root → Vercel, A/CNAME for `api.*` → Fly

**Files to modify:**
- `src/app/layout.tsx` — replace `ohmar.dev` placeholder with final domain
- `src/app/llms.txt/route.ts` — same
- `rag-api/.github/workflows/rag-api.yml` — ensure deploy uses the final app name

## Implementation steps

1. Choose domain. Candidates:
   - `ohmar.dev` (short, modern — .dev requires HTTPS by default)
   - `omarcama.dev`
   - `ohmarcama.com`
   - `omarcamacosta.com`
2. Buy via Cloudflare Registrar or Porkbun.
3. Vercel: add domain in project settings → set A/CNAME per Vercel's instructions.
4. Fly.io: `flyctl certs add api.ohmar.dev --app rag-api-omar` → add CNAME per Fly's output.
5. Verify both HTTPS valid.
6. Update env vars:
   - Vercel: `NEXT_PUBLIC_RAG_API_URL=https://api.ohmar.dev`
7. Update `src/app/layout.tsx` metadata base URL and llms.txt URLs.
8. No commit for infra changes; local file edits as usual.

## Verification

```bash
curl -I https://ohmar.dev
# expected: 200 + valid cert
curl -I https://api.ohmar.dev/actuator/health
# expected: 200
```

## Non-goals

- Do NOT configure complex DNS (MX, SPF) — not needed yet.
- Do NOT commit until domain confirmed.

## Open questions

- Final domain choice (user must decide).
