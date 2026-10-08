---
id: P1-HIRE-01
title: Build /hire-me page (EN) with modality, stack, email, timezone
category: HIRE
priority: P1
estimate_hours: 2
depends_on: [P0-DOC-03]
blocks: [P1-HIRE-02, P1-HIRE-03]
status: pending
---

# P1-HIRE-01 — Build /hire-me page (EN)

## Context

Primary conversion surface for the hire-me layer. Explicit, scannable in 30 seconds. Content: positioning summary, modality (remote US/EU/BR), target role types, stack, timezone, salary band (optional, see Open Questions), contact email direct, social links.

**References:**
- `docs/plan/design-system.md` § Hire Me (component)
- `CONTEXT.md` § Hire Me Layer (post P0-DOC-03)
- `docs/plan/draft/perfil_llm.public.md` or `docs/perfil_llm.public.md` (if P0-DOC-04 done)

## Inputs

**Files to read:**
- `docs/plan/design-system.md`
- `CONTEXT.md`
- `docs/perfil_llm.public.md` (or draft)

## Outputs

**Files to create:**
- `src/app/hire-me/page.tsx`
- `src/app/hire-me/hire-me.module.scss`

## Implementation steps

1. Create `src/app/hire-me/page.tsx` with structure:
   - H1 (Instrument Serif): "Hire me"
   - Lead (Inter, text-muted): "AI engineer with senior backend background. Available for remote US/EU roles."
   - Section: **What I'm looking for**
     - Role types: AI engineer, LLM engineer, AI-adjacent backend sr. (listed as chips)
     - Modality: Remote (US/EU/BR). Hybrid considered within São Paulo state only.
     - Timezone: UTC-3 (São Paulo). Overlap with US ET/CT and most of EU workdays.
     - Contract: CLT, PJ, or employment (direct hire preferred for international).
   - Section: **Stack I bring**
     - Backend: Java 17, Spring Boot, hexagonal architecture, Oracle/Postgres (as chips)
     - AI: LLM integration (Gemini, OpenAI, Anthropic), RAG, MCP, prompt engineering
     - Cloud: AWS (formalizing SAA), Docker, Kubernetes basics
     - Tooling: Maven, Git, GitHub Actions, N8N, DBeaver
   - Section: **What I'm not looking for**
     - Full-stack frontend-heavy roles.
     - Short contracts <6 months.
     - Positions requiring return to office full-time outside São Paulo.
   - Section: **Contact**
     - Email (direct `mailto:` link, Roboto Mono): `oscarcama888@gmail.com` (confirm with user, see Open Questions)
     - LinkedIn: linkedin.com/in/omar-cama-huarahuara (confirm URL)
     - GitHub: github.com/OmarCamaHuara
   - Section: **References & evidence**
     - Link to `/work` (Project Write-ups)
     - Link to `/labs` (demonstrable artifacts)
     - Link to `/writing` (thinking in public)
2. Add page metadata (title "Hire Me · Omar Cama", description with modality).
3. Add `/hire-me.module.scss` using tokens from globals.
4. No commit.

## Verification

```bash
test -f src/app/hire-me/page.tsx && echo OK
grep -c "Remote (US/EU" src/app/hire-me/page.tsx
# expected: >=1
grep -c "mailto:" src/app/hire-me/page.tsx
# expected: >=1
npm run build
# expected: /hire-me compiled
```

**Manual check:**
- [ ] Visit http://localhost:3000/hire-me, page renders with all 5 sections.
- [ ] Click email → opens mail client.

## Non-goals

- Do NOT translate to pt-BR here (P1-HIRE-02 handles the variant).
- Do NOT add Nav CTA (P1-HIRE-03).
- Do NOT add Schema.org (P1-HIRE-04).
- Do NOT commit.

## Open questions

- Confirm email address: `oscarcama888@gmail.com` or dedicated `hire@ohmar.dev`?
- Confirm LinkedIn URL slug.
- Include salary band? If yes, which? (not required for US/EU, often filters noise)
