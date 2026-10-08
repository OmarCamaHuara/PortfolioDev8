---
id: P3-RAG-UI-02
title: Source citation cards integrated below assistant message
category: RAG-UI
priority: P3
estimate_hours: 1.5
depends_on: [P3-RAG-UI-01, P2-RAG-UI-02]
blocks: []
status: pending
---

# P3-RAG-UI-02 — Source citations in chat

## Context

Each assistant message in `/labs/chat` is followed by a compact source list — the chunks that fed the response. Clickable links back to the originating Post/Work/ADR. Trust signal: visitor sees exactly what grounded the answer.

**References:**
- `docs/plan/design-system.md` § Chat UI (ASCII mockup shows source block)

## Inputs

**Files to read:**
- `src/components/SourceCard/SourceCard.tsx` (post P2-RAG-UI-02)
- `src/app/labs/chat/ChatUI.tsx` (post P3-RAG-UI-01)

## Outputs

**Files to create:**
- `src/app/labs/chat/SourceList.tsx` — compact source list variant (not full SourceCard)

**Files to modify:**
- `src/app/labs/chat/ChatUI.tsx` — render `<SourceList />` below each assistant message

## Implementation steps

1. `SourceList.tsx`:
   ```tsx
   <aside className={styles.sources}>
     <span className={styles.label}>Sources</span>
     <ul>
       {sources.map(s => (
         <li key={s.url}>
           <Link href={s.url} className={styles.link}>↗ {s.title}</Link>
         </li>
       ))}
     </ul>
   </aside>
   ```
2. SCSS: Roboto Mono `--fs-xs`, muted color, `↗` icon, hover `--accent`.
3. In `ChatUI.tsx`, after rendering an assistant message that has sources, render `<SourceList sources={msg.sources} />`.
4. Collapse if no sources (canned response case).
5. No commit.

## Verification

```bash
test -f src/app/labs/chat/SourceList.tsx && echo OK
grep -c "SourceList" src/app/labs/chat/ChatUI.tsx
# expected: >=1
npm run build
# expected: succeeds
```

## Non-goals

- Do NOT reuse the full SourceCard — the chat UI needs compact source links.
- Do NOT commit.

## Open questions

None.
