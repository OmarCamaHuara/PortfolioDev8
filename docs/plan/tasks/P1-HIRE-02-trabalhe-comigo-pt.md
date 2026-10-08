---
id: P1-HIRE-02
title: Build /trabalhe-comigo (pt-BR variant of hire-me)
category: HIRE
priority: P1
estimate_hours: 1
depends_on: [P1-HIRE-01]
blocks: []
status: pending
---

# P1-HIRE-02 — Build /trabalhe-comigo (pt-BR variant)

## Context

Pt-BR variant of `/hire-me`. Not a word-for-word translation — same information adapted to the Brazilian market (CLT/PJ nuances, mercado brasileiro expectation, pt-BR audience). Per ADR 0005, this is a "variant", not a "translation".

**References:**
- `src/app/hire-me/page.tsx` (post P1-HIRE-01, source structure)
- `CONTEXT.md` § Language Policy (pt-BR variant)
- `docs/adr/0005-language-policy-en-primary.md`

## Inputs

**Files to read:**
- `src/app/hire-me/page.tsx` (if P1-HIRE-01 done)

## Outputs

**Files to create:**
- `src/app/trabalhe-comigo/page.tsx`
- `src/app/trabalhe-comigo/trabalhe-comigo.module.scss` (or reuse hire-me.module.scss)

## Implementation steps

1. Create `src/app/trabalhe-comigo/page.tsx` mirroring the structure of `/hire-me`:
   - H1: "Trabalhe comigo"
   - Lead: "Engenheiro backend sênior focado em IA. Procurando posições remotas no Brasil ou no exterior (US/EU)."
   - Section **O que estou procurando**:
     - Tipos de vaga: Engenheiro de IA, LLM Engineer, Backend sênior com IA
     - Modalidade: Remoto (BR/US/EU). Híbrido só se dentro do estado de SP.
     - Fuso: UTC-3 (São Paulo).
     - Contrato: CLT, PJ, ou employment direto.
   - Section **Stack que trago**: same chips, same labels (tech terms stay in English anyway).
   - Section **O que não procuro**:
     - Vagas full-stack com peso em frontend.
     - Contratos curtos (<6 meses).
     - Volta ao escritório full-time fora de São Paulo.
   - Section **Contato**: same email, LinkedIn, GitHub.
   - Section **Referências**: links para `/work`, `/labs`, `/writing`.
2. Add link em `/hire-me` apontando "Também disponível em português → /trabalhe-comigo" (reciprocal link).
3. Metadata title "Trabalhe comigo · Omar Cama".
4. No commit.

## Verification

```bash
test -f src/app/trabalhe-comigo/page.tsx && echo OK
grep -c "Trabalhe comigo" src/app/trabalhe-comigo/page.tsx
# expected: >=1
grep -c "Remoto" src/app/trabalhe-comigo/page.tsx
# expected: >=1
grep -c "/trabalhe-comigo" src/app/hire-me/page.tsx
# expected: >=1 (reciprocal link exists)
npm run build
# expected: /trabalhe-comigo compiled
```

## Non-goals

- Do NOT translate word-for-word. Adapt copy to pt-BR market and tone.
- Do NOT add Nav CTA here (P1-HIRE-03).
- Do NOT commit.

## Open questions

- Should the Nav have a toggle `EN | PT` on the hire pages? Nice-to-have, not in this task.
