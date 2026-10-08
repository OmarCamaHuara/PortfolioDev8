---
id: P3-RAG-API-16
title: Weekly log review script (SQL + CSV export)
category: RAG-API
priority: P3
estimate_hours: 1
depends_on: [P3-RAG-API-14]
blocks: []
status: pending
---

# P3-RAG-API-16 — Weekly log review tooling

## Context

Omar reviews chat_logs weekly to detect drift, hallucinations, or weird patterns. Script bundles the queries into a readable CSV with a one-liner.

**References:**
- `docs/plan/rag-architecture.md` § v2 Weekly log review (phase 2.5)

## Inputs

**External dependencies:**
- `flyctl` installed and authenticated

## Outputs

**Files to create:**
- `rag-api/scripts/review-logs.sh`
- `rag-api/scripts/review-logs.sql`

## Implementation steps

1. `review-logs.sql`:
   ```sql
   SELECT
     created_at,
     left(query, 80) AS query,
     left(response, 160) AS response,
     tokens_output,
     latency_ms
   FROM chat_logs
   WHERE created_at > NOW() - INTERVAL '7 days'
   ORDER BY created_at DESC;
   ```
2. `review-logs.sh`:
   ```bash
   #!/bin/bash
   set -euo pipefail
   APP="rag-api-omar"
   flyctl postgres connect --app rag-pg-omar -c "$(cat $(dirname "$0")/review-logs.sql)" > review-$(date +%Y%m%d).csv
   echo "Wrote review-$(date +%Y%m%d).csv — rows: $(wc -l < review-*.csv)"
   ```
3. Document in rag-api README.
4. No commit.

## Verification

```bash
chmod +x rag-api/scripts/review-logs.sh
./rag-api/scripts/review-logs.sh
# expected: review-YYYYMMDD.csv written; rows count printed
```

## Non-goals

- Do NOT automate the review itself.
- Do NOT send logs to a third party.
- Do NOT commit.

## Open questions

None.
