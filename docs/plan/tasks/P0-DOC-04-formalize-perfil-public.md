---
id: P0-DOC-04
title: Formalize perfil_llm.public.md (promote draft to docs/)
category: DOC
priority: P0
estimate_hours: 0.5
depends_on: []
blocks: [P2-RAG-API-03]
status: done
---

# P0-DOC-04 — Formalize perfil_llm.public.md

## Context

The public profile is the PII-free source consumed by the RAG ingestion pipeline and by agents reading `/llms.txt`. Draft at `docs/plan/draft/perfil_llm.public.md` is promoted to `docs/perfil_llm.public.md`. The private source (`docs/perfil_llm_omar_cama_huarahuara.md`) stays gitignored.

**References:**
- `docs/plan/draft/perfil_llm.public.md` (source)
- `.gitignore` (already protects the private profile)

## Inputs

**Files to read:**
- `docs/plan/draft/perfil_llm.public.md`

## Outputs

**Files to create:**
- `docs/perfil_llm.public.md` — identical content

**Files to delete:**
- `docs/plan/draft/perfil_llm.public.md`

## Implementation steps

1. Read the draft.
2. Create `docs/perfil_llm.public.md` with identical content.
3. Delete the draft.
4. No commit.

## Verification

```bash
test -f docs/perfil_llm.public.md && echo OK
test ! -f docs/plan/draft/perfil_llm.public.md && echo OK
grep -c "formalizing" docs/perfil_llm.public.md
# expected: >=1 (reinforces positioning framing)
grep -c "filhos\|cão\|Pinky\|Ford Fiesta" docs/perfil_llm.public.md
# expected: 0 (no PII must leak)
```

## Non-goals

- Do NOT include anything from `docs/perfil_llm_omar_cama_huarahuara.md` (private) directly.
- Do NOT commit.

## Open questions

None.
