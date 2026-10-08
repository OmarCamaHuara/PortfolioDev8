---
id: P4-OPS-09
title: Prometheus scraping config + Grafana dashboard for rag-api
category: OPS
priority: P4
estimate_hours: 2
depends_on: [P2-RAG-API-07]
blocks: []
status: pending
---

# P4-OPS-09 — Prometheus + Grafana

## Context

Scrape rag-api `/actuator/prometheus` endpoint. Grafana dashboard for latency, cache hit rate, rate limit rejections, error rate. Deploy stack separately (Fly managed Grafana, self-hosted on Fly, or Grafana Cloud free tier).

**References:**
- `docs/plan/rag-architecture.md` § v1 Observabilidade

## Inputs

**External dependencies:**
- Grafana Cloud free tier account (recommended) OR self-hosted Prometheus+Grafana

## Outputs

**Files to create:**
- `rag-api/ops/prometheus-scrape.yml` — Prometheus scrape config snippet
- `rag-api/ops/grafana-dashboard.json` — Grafana dashboard export

## Implementation steps

1. Create a Grafana Cloud free account.
2. Add a Prometheus data source pointing to a hosted Prometheus (Grafana Cloud offers one free).
3. Set up scrape config:
   ```yaml
   scrape_configs:
     - job_name: rag-api
       scrape_interval: 30s
       static_configs:
         - targets: ['rag-api-omar.fly.dev:443']
       scheme: https
       metrics_path: /actuator/prometheus
       basic_auth:
         username: admin
         password: ${METRICS_PASSWORD}
   ```
4. Build Grafana dashboard with panels:
   - `rate(http_server_requests_seconds_count[5m])` by endpoint
   - P50/P95/P99 of `search_latency_seconds`
   - `rate(rate_limit_rejections_total[5m])`
   - `increase(embedding_tokens_total[1d])` for cost projection
   - Error rate: `rate(http_server_requests_seconds_count{status=~"5.."}[5m]) / rate(http_server_requests_seconds_count[5m])`
5. Export dashboard JSON, commit to `rag-api/ops/grafana-dashboard.json` for reimport.
6. No commit of secrets.

## Verification

- Grafana shows live metrics within 1-2 minutes of enabling scrape.
- Dashboard panels render data.

## Non-goals

- Do NOT alert on noisy metrics in v1 (set up alerts after a week of baseline data).
- Do NOT commit.

## Open questions

- Grafana Cloud free tier limits: 10k series, 50GB logs, 14-day retention. Enough for a portfolio project.
