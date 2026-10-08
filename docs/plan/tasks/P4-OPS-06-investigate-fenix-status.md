---
id: P4-OPS-06
title: Investigate Projeto Fênix status (absorbed? defunct? separate?)
category: OPS
priority: P4
estimate_hours: 0.5
depends_on: []
blocks: [P3-CONTENT-06]
status: pending
---

# P4-OPS-06 — Investigate Fênix status

## Context

`Projeto Fênix` is listed in Omar's profile as a Java Spring Boot project integrating Binance for crypto remittances. It is NOT visible in the public GitHub listing (checked 2026-10-08) nor obviously present in private repos. Resolve before writing P3-CONTENT-06 so we don't invent content.

**References:**
- `docs/perfil_llm.public.md` § Personal projects

## Inputs

**Needs from user:**
- Current status of Projeto Fênix.

## Outputs

**Files to modify:**
- `docs/perfil_llm.public.md` — update the Fênix mention based on findings
- Memory file (if applicable): add a note in `project_backend_scope.md` or similar documenting the resolution

## Implementation steps

1. Ask user directly:
   - Does the project still exist?
   - Is it part of `trading-mvp` now?
   - Was it ever deployed with real remittances?
   - If not deployed, how far did the MVP get?
2. Based on answer, categorize:
   - **Defunct**: remove from `perfil_llm.public.md`.
   - **Absorbed into trading-mvp**: update profile to say "crypto remittance experimentation that fed into TradingImpossível".
   - **Separate project, dormant**: keep in profile with "status: dormant" note.
   - **Separate project, active**: list repo (if public) or indicate private.
3. Document findings in a short note.
4. No commit.

## Verification

```bash
grep -c "Projeto Fênix\|Fênix" docs/perfil_llm.public.md
# expected: >=1 (updated status)
```

## Non-goals

- Do NOT fabricate a status.
- Do NOT commit.

## Open questions

- All of them.
