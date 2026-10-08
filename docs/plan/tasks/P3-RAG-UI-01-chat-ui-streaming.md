---
id: P3-RAG-UI-01
title: Chat UI stream-aware (SSE client, cursor animation)
category: RAG-UI
priority: P3
estimate_hours: 4
depends_on: [P2-RAG-UI-01, P2-UI-SHELL-01, P3-RAG-API-13]
blocks: [P3-RAG-UI-02, P3-RAG-UI-03]
status: pending
---

# P3-RAG-UI-01 — Chat UI stream-aware

## Context

Add chat conversational interface backed by `/api/chat` (SSE stream). Mimics the ASCII mockup from `docs/plan/design-system.md` § Chat UI. User alinhado direita, assistant esquerda, cursor piscando durante stream.

**References:**
- `docs/plan/design-system.md` § Chat UI
- `rag-api/src/main/java/dev/ohmar/rag/generation/ChatController.java` (post P3-RAG-API-13)

## Inputs

**Files to read:**
- `src/lib/ragClient.ts` (post P2-RAG-UI-03) — extend for SSE
- `docs/plan/rag-architecture.md`

## Outputs

**Files to create:**
- `src/app/labs/chat/page.tsx`
- `src/app/labs/chat/ChatUI.tsx`
- `src/app/labs/chat/chat.module.scss`

**Files to modify:**
- `src/lib/ragClient.ts` — add `chatStream(message, onToken, onSources, onDone, onError)`
- `src/content/labs.ts` — add second lab entry

## Implementation steps

1. Extend `ragClient.ts` with SSE client:
   ```ts
   chatStream(message: string, history: ChatMessage[],
              onToken: (t: string) => void,
              onSources: (s: SourceCitation[]) => void,
              onDone: (meta: ChatMeta) => void,
              onError: (e: Error) => void)
   ```
   Use `fetch` with ReadableStream reader for SSE parsing.
2. `ChatUI.tsx` (Client):
   ```tsx
   const [messages, setMessages] = useState<ChatMessage[]>([]);
   const [streaming, setStreaming] = useState(false);
   const [draft, setDraft] = useState('');
   const [sources, setSources] = useState<SourceCitation[]>([]);
   // ...
   ```
3. Rendering: messages list with user-right/assistant-left; assistant message gets a `styles.cursor` span appended when `streaming && lastMessage.role === 'assistant'`.
4. Cursor: `styles.cursor { animation: blink 1s step-start infinite }` + reduced-motion guard.
5. Suggested prompts same as /labs/semantic-search but adapted: "What's Omar's main stack?", "Tell me about his AI projects", "Is he available for remote US roles?".
6. Footer discreet: "Powered by Gemini 2.0 Flash · retrieval over pgvector".
7. Add second lab in `src/content/labs.ts`:
   ```ts
   { slug: 'chat', title: 'Lab 02 — Chat with my CV', status: 'live', hint: 'Ask: "What is Omars stack?"', description: 'Gemini-powered chat over this portfolio with strict guard rails. Try it, then read how it works.', stack: ['Spring WebFlux','Gemini 2.0','SSE'] }
   ```
8. No commit.

## Verification

```bash
test -f src/app/labs/chat/page.tsx && echo OK
grep -c "ReadableStream\|EventSource" src/lib/ragClient.ts
# expected: >=1
npm run build
# expected: /labs/chat compiled
```

**Manual:**
- [ ] Visit /labs/chat; type question; see tokens stream in.
- [ ] Source cards appear after assistant message.
- [ ] Reduced motion: cursor still visible, no blink.

## Non-goals

- Do NOT persist chat history across sessions (ephemeral is fine).
- Do NOT commit.

## Open questions

None.
