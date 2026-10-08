---
id: P2-RAG-API-09
title: Fly.io deploy config (fly.toml, secrets, autoscale min 0)
category: RAG-API
priority: P2
estimate_hours: 2
depends_on: [P2-RAG-API-07]
blocks: [P2-RAG-API-10, P4-OPS-03]
status: pending
---

# P2-RAG-API-09 — Fly.io deploy config

## Context

Deploy rag-api on Fly.io. Shared-cpu-1x, 256MB RAM, min 0 (cold start acceptable). Postgres managed by Fly Postgres (3GB free tier). Secrets via `fly secrets set`.

**References:**
- `docs/plan/rag-architecture.md` § v1 Deploy — Fly.io

## Inputs

**External dependencies:**
- Fly CLI installed (`flyctl`)
- Fly account

## Outputs

**Files to create:**
- `rag-api/fly.toml`

## Implementation steps

1. `fly.toml`:
   ```toml
   app = "rag-api-omar"
   primary_region = "iad"

   [build]
     dockerfile = "Dockerfile"

   [env]
     SPRING_PROFILES_ACTIVE = "prod"

   [http_service]
     internal_port = 8080
     force_https = true
     auto_stop_machines = true
     auto_start_machines = true
     min_machines_running = 0

   [[http_service.checks]]
     interval = "30s"
     timeout = "5s"
     grace_period = "20s"
     method = "get"
     path = "/actuator/health"

   [[vm]]
     cpu_kind = "shared"
     cpus = 1
     memory_mb = 256
   ```
2. Document commands in `rag-api/README.md`:
   ```bash
   flyctl auth login
   flyctl apps create rag-api-omar
   flyctl postgres create --name rag-pg-omar --region iad --initial-cluster-size 1
   flyctl postgres attach rag-pg-omar --app rag-api-omar
   flyctl secrets set GOOGLE_API_KEY=... IP_HASH_SALT=... METRICS_PASSWORD=... --app rag-api-omar
   flyctl deploy --app rag-api-omar
   ```
3. No commit.

## Verification

```bash
cd rag-api
flyctl deploy
# expected: deploy succeeds; machine starts
curl -s https://rag-api-omar.fly.dev/actuator/health
# expected: {"status":"UP"}
```

## Non-goals

- Do NOT deploy without first running GOOGLE_API_KEY and other secrets.
- Do NOT set min_machines_running > 0 initially (cost control).
- Do NOT commit secrets.
- Do NOT commit.

## Open questions

- App name availability on Fly: if `rag-api-omar` is taken, use `rag-api-ohmar` or similar.
- Primary region: `iad` (N. Virginia) covers US east. For EU users, consider `fra`. For low latency to BR, consider `gru` (São Paulo).
