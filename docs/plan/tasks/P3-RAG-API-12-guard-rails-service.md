---
id: P3-RAG-API-12
title: Add GuardRails service (threshold + prompt rigor)
category: RAG-API
priority: P3
estimate_hours: 2
depends_on: [P2-RAG-API-05]
blocks: [P3-RAG-API-13]
status: pending
---

# P3-RAG-API-12 — GuardRails service

## Context

Before adding Gemini generation (P3-RAG-API-13), encapsulate the guard rails layer: retrieval threshold check, canned response fallback, prompt composition with rigid rules. Isolating in a service makes it testable and swappable.

**References:**
- `docs/plan/rag-architecture.md` § v2 Guard rails em camadas

## Inputs

**Files to read:**
- `rag-api/src/main/java/dev/ohmar/rag/retrieval/SearchService.java` (post P2-RAG-API-05)

## Outputs

**Files to create:**
- `rag-api/src/main/java/dev/ohmar/rag/generation/GuardRails.java`
- `rag-api/src/main/java/dev/ohmar/rag/generation/PromptComposer.java`
- `rag-api/src/main/java/dev/ohmar/rag/generation/GuardRailsVerdict.java` — enum/record

## Implementation steps

1. `GuardRailsVerdict.java`:
   ```java
   public record GuardRailsVerdict(
       boolean proceed,
       String cannedResponse,     // null if proceed
       List<SearchResult> chunks,
       double minScore
   ) {}
   ```
2. `GuardRails.java`:
   ```java
   @Service
   public class GuardRails {
     private static final double MIN_SCORE = 0.6;
     private static final String CANNED =
       "I don't have that information in Omar's public profile. "
       + "Try asking about his backend engineering, AI practice, or availability — "
       + "or reach out via /hire-me.";

     public GuardRailsVerdict evaluate(List<SearchResult> chunks) {
       if (chunks.isEmpty()) return new GuardRailsVerdict(false, CANNED, chunks, 0);
       double top = chunks.get(0).score();
       if (top < MIN_SCORE) return new GuardRailsVerdict(false, CANNED, chunks, top);
       return new GuardRailsVerdict(true, null, chunks, top);
     }
   }
   ```
3. `PromptComposer.java` builds the Gemini prompt per `docs/plan/rag-architecture.md` § v2 Flow step 4. Hard-coded system prompt with rules numbered. Keep prompt in a `.txt` resource so it's reviewable without reading Java.
4. Unit tests: GuardRails with empty, low-score, high-score chunks.
5. No commit.

## Verification

```bash
cd rag-api && mvn test -Dtest=GuardRailsTest
# expected: 3 tests pass (empty, low-score, high-score)
```

## Non-goals

- Do NOT call Gemini here (P3-RAG-API-13).
- Do NOT include regex claim detector here (P3-RAG-API-15).
- Do NOT commit.

## Open questions

None.
