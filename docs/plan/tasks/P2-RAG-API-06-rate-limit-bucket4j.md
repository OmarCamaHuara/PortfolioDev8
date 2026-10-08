---
id: P2-RAG-API-06
title: Rate limit middleware (Bucket4j, 10 req/min + 50/day per IP hash)
category: RAG-API
priority: P2
estimate_hours: 2
depends_on: [P2-RAG-API-01]
blocks: []
status: pending
---

# P2-RAG-API-06 — Bucket4j rate limit

## Context

Protect `/api/search` (and later `/api/chat`) from abuse and runaway cost. Per-IP (hashed) rate limit with two tiers: 10 req/min (burst) and 50 req/day (sustained).

**References:**
- `docs/plan/rag-architecture.md` § v1 Rate limit — spec

## Inputs

**External dependencies:**
- com.bucket4j:bucket4j-core (already in pom.xml from P2-RAG-API-01)

## Outputs

**Files to create:**
- `rag-api/src/main/java/dev/ohmar/rag/config/RateLimitConfig.java`
- `rag-api/src/main/java/dev/ohmar/rag/config/RateLimitFilter.java`
- `rag-api/src/main/java/dev/ohmar/rag/util/IpHasher.java`

## Implementation steps

1. `IpHasher.java` — SHA-256 hash of IP + salt (env var `IP_HASH_SALT`).
2. `RateLimitConfig.java` — in-memory `ConcurrentHashMap<String, Bucket>` keyed by IP hash. Two bandwidths per bucket: 10 req/min and 50 req/day.
3. `RateLimitFilter.java` extends `OncePerRequestFilter`:
   ```java
   @Override
   protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain) {
     String ipHash = ipHasher.hash(req.getRemoteAddr());
     Bucket bucket = rateLimitConfig.resolveBucket(ipHash);
     ConsumptionProbe probe = bucket.tryConsumeAndReturnRemaining(1);
     if (!probe.isConsumed()) {
       res.setStatus(429);
       res.setContentType("application/json");
       long retryAfterSeconds = TimeUnit.NANOSECONDS.toSeconds(probe.getNanosToWaitForRefill());
       res.getWriter().write("{\"error\":\"rate_limit_exceeded\",\"retryAfter\":" + retryAfterSeconds + "}");
       return;
     }
     chain.doFilter(req, res);
   }
   ```
4. Apply filter only to `/api/*` paths (configure in `addMappings`).
5. Allowlist via env var `ALLOWLIST_IP_HASHES` (comma-separated hashes) — if request IP hash is in list, skip rate limit. Useful for the own site making requests.
6. No commit.

## Verification

```bash
cd rag-api && mvn test
# expected: RateLimitFilterTest passes (uses MockMvc with 11 rapid requests, expects 429 on #11)
# Integration:
for i in {1..11}; do curl -s -o /dev/null -w "%{http_code}\n" -X POST http://localhost:8080/api/search -H 'Content-Type: application/json' -d '{"query":"x"}'; done
# expected: 200 200 200 200 200 200 200 200 200 200 429
```

## Non-goals

- Do NOT persist bucket state to Redis (in-memory is fine for single-instance deploy).
- Do NOT use IP without hashing (LGPD/GDPR).
- Do NOT commit.

## Open questions

None.
