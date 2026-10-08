---
id: P2-RAG-UI-03
title: API client (fetch wrapper, 10s timeout, 1 retry on 5xx)
category: RAG-UI
priority: P2
estimate_hours: 1
depends_on: []
blocks: [P2-RAG-UI-01]
status: pending
---

# P2-RAG-UI-03 — RAG API client

## Context

Thin fetch wrapper for calling the rag-api endpoints. Centralizes error handling, timeout, 1 retry on 5xx, reads base URL from env var.

**References:**
- `docs/plan/rag-architecture.md` § v1 Frontend (API client spec)

## Inputs

**External dependencies:**
- Env var `NEXT_PUBLIC_RAG_API_URL` (e.g. `https://rag-api-omar.fly.dev`)

## Outputs

**Files to create:**
- `src/lib/ragClient.ts`
- `src/lib/ragClient.types.ts`

## Implementation steps

1. `ragClient.types.ts`:
   ```ts
   export type SearchResult = {
     chunkId: number;
     title: string;
     url: string;
     sourceType: 'post' | 'work' | 'adr' | 'design' | 'profile';
     lang: string | null;
     snippet: string;
     score: number;
   };
   export type SearchResponse = {
     results: SearchResult[];
     query: string;
     latencyMs: number;
     tokensUsed: number;
   };
   ```
2. `ragClient.ts`:
   ```ts
   const BASE = process.env.NEXT_PUBLIC_RAG_API_URL ?? 'http://localhost:8080';

   async function fetchWithTimeout(url: string, init: RequestInit, timeoutMs = 10000) {
     const ctrl = new AbortController();
     const t = setTimeout(() => ctrl.abort(), timeoutMs);
     try { return await fetch(url, { ...init, signal: ctrl.signal }); }
     finally { clearTimeout(t); }
   }

   export const ragClient = {
     async search(query: string, topK = 5): Promise<SearchResponse> {
       let lastError: unknown;
       for (let attempt = 0; attempt < 2; attempt++) {
         try {
           const res = await fetchWithTimeout(`${BASE}/api/search`, {
             method: 'POST',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify({ query, topK }),
           });
           if (res.status >= 500 && attempt === 0) continue;
           if (!res.ok) throw new Error(`search_failed_${res.status}`);
           return res.json();
         } catch (e) { lastError = e; }
       }
       throw lastError;
     },
   };
   ```
3. No commit.

## Verification

```bash
test -f src/lib/ragClient.ts && echo OK
grep -c "AbortController" src/lib/ragClient.ts
# expected: >=1
npm run build
# expected: succeeds
```

## Non-goals

- Do NOT add SSE support here (P3-RAG-UI-01 handles that).
- Do NOT cache responses.
- Do NOT commit.

## Open questions

- Final value of `NEXT_PUBLIC_RAG_API_URL` depends on P4-OPS-03 (domain). Placeholder OK.
