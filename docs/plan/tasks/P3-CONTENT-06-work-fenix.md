---
id: P3-CONTENT-06
title: Project Write-up — Projeto Fênix (depends on P4-OPS-06 investigation)
category: CONTENT
priority: P3
estimate_hours: 2
depends_on: [P4-OPS-06]
blocks: []
status: pending
---

# P3-CONTENT-06 — Project Write-up: Projeto Fênix

## Context

`Projeto Fênix` is mentioned in `docs/perfil_llm.public.md` as "MVP for international remittances via cryptocurrency, integrated with Binance APIs over Java Spring Boot". It does NOT appear in Omar's visible GitHub repos (checked 2026-10-08). Depends on P4-OPS-06 to resolve: is it absorbed into `trading-mvp`, defunct, or in a private repo?

**References:**
- `docs/perfil_llm.public.md` § Personal projects
- `CONTEXT.md` § Project Write-up

## Inputs

**Needs from P4-OPS-06:**
- Resolved status of Projeto Fênix (defunct / absorbed into trading-mvp / separate private repo).

## Outputs

**Files to create (conditional):**
- `content/work/projeto-fenix.mdx` — only if the project exists in some form

## Implementation steps

1. Check output of P4-OPS-06. If "defunct", skip this task (close as "not applicable").
2. If "absorbed into trading-mvp", mention in the TradingImpossível Write-up (P2-CONTENT-02) as a prior stage and do not create a separate entry.
3. If "separate project":
   - Interview user on: problem (unmet remittance need), decision (why Binance API, why Java Spring), trade-off (regulatory/compliance surface), result (did any real remittance go through?).
   - Create `content/work/projeto-fenix.mdx` with problem → decision → trade-off → result structure.
   - Target 1000-1500 words.
4. No commit.

## Verification

```bash
# Conditional: only if project is extant
[ -f content/work/projeto-fenix.mdx ] && wc -w content/work/projeto-fenix.mdx
# expected: 1000-1500 if file exists, otherwise N/A
```

## Non-goals

- Do NOT invent architecture if the project is defunct.
- Do NOT include financial advice.
- Do NOT include compliance claims not verified.
- Do NOT commit.

## Open questions

- All of them resolved by P4-OPS-06.
