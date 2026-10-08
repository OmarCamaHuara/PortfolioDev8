---
id: P2-RAG-UI-01
title: /labs/semantic-search page with search input + suggested prompts
category: RAG-UI
priority: P2
estimate_hours: 2
depends_on: [P2-RAG-UI-02, P2-RAG-UI-03, P2-UI-FEED-03, P1-DESIGN-01]
blocks: []
status: pending
---

# P2-RAG-UI-01 — /labs/semantic-search page

## Context

Primary consumer surface for Lab 01. User sees a short explanation of the Lab, large search input, three suggested prompt buttons, and a results area that fills with SourceCards.

**References:**
- `docs/plan/rag-architecture.md` § v1 Frontend
- `docs/plan/design-system.md` § Lab Card
- `src/components/SourceCard/*` (post P2-RAG-UI-02)
- `src/lib/ragClient.ts` (post P2-RAG-UI-03)

## Inputs

**Files to read:**
- `src/components/SourceCard/SourceCard.tsx` (post P2-RAG-UI-02)
- `src/lib/ragClient.ts` (post P2-RAG-UI-03)

## Outputs

**Files to create:**
- `src/app/labs/semantic-search/page.tsx`
- `src/app/labs/semantic-search/SemanticSearch.tsx` (Client Component)
- `src/app/labs/semantic-search/semantic-search.module.scss`

## Implementation steps

1. Server component `page.tsx`:
   - Metadata (title, OG).
   - H1 "Lab 01 — Semantic Search" (serif).
   - Intro: 2 paragraphs explaining RAG retrieval, link to GitHub source.
   - Mount `<SemanticSearch />` (Client Component).
2. Client `SemanticSearch.tsx`:
   ```tsx
   'use client';
   export default function SemanticSearch() {
     const [query, setQuery] = useState('');
     const [state, setState] = useState<'idle'|'loading'|'error'|'empty'|'success'>('idle');
     const [results, setResults] = useState<SearchResult[]>([]);
     // ...
     const onSubmit = async () => {
       setState('loading');
       try {
         const data = await ragClient.search(query);
         setResults(data.results);
         setState(data.results.length === 0 ? 'empty' : 'success');
       } catch {
         setState('error');
       }
     };
     return (
       <div>
         <SuggestedPrompts onSelect={setQuery} />
         <SearchInput value={query} onChange={setQuery} onSubmit={onSubmit} />
         <ResultsArea state={state} results={results} onRetry={onSubmit} />
       </div>
     );
   }
   ```
3. Suggested prompts (3 buttons):
   - "Spring Boot in production"
   - "AI engineering practice"
   - "Available for remote roles?"
4. ResultsArea routes: loading → skeleton, error → <ErrorState>, empty → <EmptyState>, success → list of SourceCards.
5. Link to GitHub source at bottom: `https://github.com/OmarCamaHuara/PortfolioDev8/tree/main/rag-api/src/main/java/dev/ohmar/rag/retrieval`.
6. No commit.

## Verification

```bash
test -f src/app/labs/semantic-search/page.tsx && echo OK
grep -c "SuggestedPrompts" src/app/labs/semantic-search/SemanticSearch.tsx
# expected: >=1
npm run build
# expected: /labs/semantic-search compiled
```

**Manual:**
- [ ] Visit /labs/semantic-search; see intro, 3 suggested buttons, input.
- [ ] Click suggested → input fills, submit works.
- [ ] On empty response (no API running), see error retry.

## Non-goals

- Do NOT implement chat/generation here (P3-RAG-UI-01).
- Do NOT commit.

## Open questions

None.
