---
id: P1-UI-02
title: Update Home page "Now" section in EN
category: UI
priority: P1
estimate_hours: 1
depends_on: [P0-DOC-01, P0-DOC-03, P1-DESIGN-01]
blocks: []
status: pending
---

# P1-UI-02 — Update Home "Now" section in EN

## Context

`src/app/page.tsx` has a section "Agora" (pt-BR) with Philips-focused copy. Replace with EN "Now" section reflecting the new positioning (AI engineering focus, formalizing AWS, open to remote US/EU).

**References:**
- `src/app/page.tsx`
- `CONTEXT.md` § Positioning (post P0-DOC-03)
- `docs/plan/design-system.md` § Interactions

## Inputs

**Files to read:**
- `src/app/page.tsx`

## Outputs

**Files to modify:**
- `src/app/page.tsx` — replace "Agora" section with "Now" in EN

## Implementation steps

1. Find the section currently titled "Agora" with eyebrow "Agora" and title "Onde eu tô".
2. Replace eyebrow with `Now`, title with `What I'm working on`.
3. Replace the two `<p>` with:
   ```
   Backend engineer at a Philips-adjacent product, keeping production
   medical systems up with Java 17 and Spring Boot. On the side,
   shipping Lab RAG — a semantic search over this portfolio in
   Java + pgvector + Gemini. Formalizing AWS Solutions Architect
   next.

   Open to remote US/EU — see /hire-me.
   ```
4. Keep structure (nav labels in EN handled by P1-UI-05).
5. Also update other section eyebrows/titles to EN:
   - `Latest / Writing` stays (already EN) — just confirm.
   - `Selected / Work` stays.
   - `Ativo / GitHub` → `Active / GitHub`.
6. No commit.

## Verification

```bash
grep -c "Now" src/app/page.tsx
# expected: >=1
grep -c "Onde eu tô\|Agora" src/app/page.tsx
# expected: 0
grep -c "/hire-me" src/app/page.tsx
# expected: >=1
npm run build
# expected: succeeds
```

## Non-goals

- Do NOT touch Hero.tsx (P1-UI-01).
- Do NOT touch Nav labels (P1-UI-05).
- Do NOT commit.

## Open questions

None.
