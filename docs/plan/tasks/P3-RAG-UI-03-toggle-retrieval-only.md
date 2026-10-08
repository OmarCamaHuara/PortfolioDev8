---
id: P3-RAG-UI-03
title: Toggle "retrieval-only mode" that calls /api/search instead of /api/chat
category: RAG-UI
priority: P3
estimate_hours: 1
depends_on: [P3-RAG-UI-01]
blocks: []
status: pending
---

# P3-RAG-UI-03 — Retrieval-only toggle

## Context

Honest UX: visitor can opt out of generation and see only the retrieved chunks. Reduces hallucination risk for the visitor who wants raw truth; also demonstrates both endpoints working.

**References:**
- `docs/plan/rag-architecture.md` § v2 Frontend (toggle)

## Inputs

**Files to read:**
- `src/app/labs/chat/ChatUI.tsx` (post P3-RAG-UI-01)

## Outputs

**Files to modify:**
- `src/app/labs/chat/ChatUI.tsx` — add toggle component

## Implementation steps

1. Add state `const [retrievalOnly, setRetrievalOnly] = useState(false)`.
2. Add toggle component above input:
   ```tsx
   <label className={styles.toggle}>
     <input type="checkbox" checked={retrievalOnly} onChange={e => setRetrievalOnly(e.target.checked)} />
     <span>Retrieval only (no AI generation — see raw matches)</span>
   </label>
   ```
3. On submit, branch:
   ```tsx
   if (retrievalOnly) {
     const res = await ragClient.search(query);
     // append assistant message with no text, only sources
     // appropriate message: "Showing top retrievals. Enable generation above to get a synthesized answer."
   } else {
     ragClient.chatStream(...);
   }
   ```
4. Style toggle: Roboto Mono `--fs-xs`, muted; checked state accent color.
5. No commit.

## Verification

```bash
grep -c "retrievalOnly" src/app/labs/chat/ChatUI.tsx
# expected: >=1
npm run build
# expected: succeeds
```

**Manual:**
- [ ] Toggle on → submit → see "Showing top retrievals" message + SourceList, no generated text.
- [ ] Toggle off → submit → stream generation.

## Non-goals

- Do NOT remove the toggle after first use.
- Do NOT commit.

## Open questions

None.
