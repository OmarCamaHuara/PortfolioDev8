---
id: P4-OPS-02
title: Close PR #5 with comment referencing ADRs 0001/0003/0004/0005/0006/0007
category: OPS
priority: P4
estimate_hours: 0.5
depends_on: [P0-DOC-01, P0-DOC-02, P0-DOC-05, P0-DOC-06]
blocks: []
status: pending
---

# P4-OPS-02 — Close PR #5

## Context

PR #5 ("docs: fundação para o CV virtual Spider-Verse com IA") is from the previous era of this project. Its content (Spring Boot monorepo, Spider-Verse design, "modo recrutador") was superseded by ADRs 0001/0003/0004/0005/0006/0007. Close with a comment referencing them so the trail is auditable.

**References:**
- https://github.com/OmarCamaHuara/PortfolioDev8/pull/5
- ADRs 0001, 0003, 0004, 0005, 0006, 0007

## Inputs

**External dependencies:**
- `gh` CLI authenticated

## Outputs

**Changes on GitHub:**
- PR #5 state: closed with explanatory comment

## Implementation steps

1. Compose a comment with the format:
   ```markdown
   Closing — content superseded during the 2026-10-08 planning cycle.

   The new direction is captured in:
   - [ADR 0004 — Reposition as AI engineer backend-first](docs/adr/0004-reposition-ai-engineer-backend-first.md)
   - [ADR 0005 — Language policy EN primary](docs/adr/0005-language-policy-en-primary.md)
   - [ADR 0006 — Visual direction Brittany + monkeytype hybrid](docs/adr/0006-visual-direction-brittany-monkeytype-hybrid.md)
   - [ADR 0007 — Backend scope: Spring Boot for Lab RAG](docs/adr/0007-backend-scope-spring-rag.md)

   Specifically rejected from this PR:
   - Spider-Verse design (full graffiti/halftone/glitch RGB) — see ADR 0006.
   - Spring Boot monorepo as site backend — only `rag-api/` subdirectory is Spring Boot now (ADR 0007).
   - "Modo recrutador" + chatbot sobre CV — superseded by Lab 01 (retrieval) and Lab 02 (chat with guard rails) at `/labs/*`.
   - Content extracted from the old Java Backend CV — superseded by `docs/perfil_llm.public.md`.

   Preserving the learning document `docs/learnings/2026-09-17-rescope-pr5.md` if useful as institutional memory; otherwise discardable.
   ```
2. Execute:
   ```bash
   gh pr close 5 --repo OmarCamaHuara/PortfolioDev8 --comment "..."
   ```
3. No local commit needed.

## Verification

```bash
gh pr view 5 --repo OmarCamaHuara/PortfolioDev8 --json state --jq .state
# expected: "CLOSED"
```

## Non-goals

- Do NOT delete the PR branch (preservation).
- Do NOT merge PR #5.

## Open questions

None.
