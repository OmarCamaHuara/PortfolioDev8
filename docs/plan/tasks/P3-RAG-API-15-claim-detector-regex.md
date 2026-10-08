---
id: P3-RAG-API-15
title: Post-processing claim detector (regex scan for "worked at X" etc.)
category: RAG-API
priority: P3
estimate_hours: 2
depends_on: [P3-RAG-API-13]
blocks: []
status: pending
---

# P3-RAG-API-15 — Claim detector

## Context

Belt-and-suspenders safety: after Gemini generates a response, scan for claims that pattern-match "worked at X", "has N years", "certified in X". For each match, verify the claim's keyword appears in the retrieved chunks. If not, emit a WARN log tagged for weekly review. Does NOT block the response — it's a signal for Omar to tune the prompt if drift occurs.

**References:**
- `docs/plan/rag-architecture.md` § v2 Pós-processamento (opcional phase 2.5)

## Inputs

**Files to read:**
- `rag-api/src/main/java/dev/ohmar/rag/generation/ChatService.java` (post P3-RAG-API-13)

## Outputs

**Files to create:**
- `rag-api/src/main/java/dev/ohmar/rag/generation/ClaimDetector.java`

## Implementation steps

1. `ClaimDetector.java`:
   ```java
   @Service
   public class ClaimDetector {
     private static final List<Pattern> PATTERNS = List.of(
       Pattern.compile("works? at (?<term>[A-Z][\\w-]+)"),
       Pattern.compile("worked at (?<term>[A-Z][\\w-]+)"),
       Pattern.compile("has (?<term>\\d+) years?"),
       Pattern.compile("certified in (?<term>[A-Z][\\w-]+)"),
       Pattern.compile("led (?<term>[A-Z][\\w-]+)")
     );

     public List<String> flagUngrounded(String response, List<SearchResult> chunks) {
       String corpus = chunks.stream().map(SearchResult::snippet).collect(Collectors.joining(" ")).toLowerCase();
       List<String> flagged = new ArrayList<>();
       for (Pattern p : PATTERNS) {
         Matcher m = p.matcher(response);
         while (m.find()) {
           String term = m.group("term").toLowerCase();
           if (!corpus.contains(term)) flagged.add(m.group());
         }
       }
       return flagged;
     }
   }
   ```
2. In `ChatService`, after stream completes, call `claimDetector.flagUngrounded(response, chunks)`. If non-empty, log at WARN level with structured field `flagged_claims=[...]`.
3. Unit tests: known-grounded response (no flags), ungrounded response (flagged).
4. No commit.

## Verification

```bash
cd rag-api && mvn test -Dtest=ClaimDetectorTest
# expected: tests pass
# Integration: ask a question that pulls an ungrounded response; verify WARN log line
```

## Non-goals

- Do NOT block the response — this is a signal, not a filter.
- Do NOT auto-redact flagged claims.
- Do NOT commit.

## Open questions

- Pattern list is a starting point. Review after 2 weeks of production logs and expand.
