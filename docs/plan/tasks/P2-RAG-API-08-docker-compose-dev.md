---
id: P2-RAG-API-08
title: Docker Compose dev stack (api + postgres+pgvector)
category: RAG-API
priority: P2
estimate_hours: 1
depends_on: [P2-RAG-API-01]
blocks: []
status: pending
---

# P2-RAG-API-08 — docker-compose dev

## Context

Local dev stack: Spring Boot app + Postgres with pgvector preinstalled. Single `docker compose up` to start, no manual DB setup.

**References:**
- `docs/plan/rag-architecture.md` § Topologia

## Inputs

**Files to read:**
- `rag-api/Dockerfile` (post P2-RAG-API-01)

## Outputs

**Files to create:**
- `rag-api/docker-compose.yml`
- `rag-api/.env.example`

## Implementation steps

1. `docker-compose.yml`:
   ```yaml
   services:
     postgres:
       image: pgvector/pgvector:pg16
       environment:
         POSTGRES_USER: rag
         POSTGRES_PASSWORD: rag
         POSTGRES_DB: rag
       ports:
         - "5432:5432"
       volumes:
         - pgdata:/var/lib/postgresql/data
       healthcheck:
         test: ["CMD-SHELL", "pg_isready -U rag"]
         interval: 5s
         timeout: 3s
         retries: 10
     api:
       build: .
       environment:
         DB_URL: jdbc:postgresql://postgres:5432/rag
         DB_USER: rag
         DB_PASSWORD: rag
         GOOGLE_API_KEY: ${GOOGLE_API_KEY}
         IP_HASH_SALT: dev-salt-change-in-prod
       ports:
         - "8080:8080"
       depends_on:
         postgres:
           condition: service_healthy
   volumes:
     pgdata:
   ```
2. `.env.example`:
   ```
   GOOGLE_API_KEY=
   GOOGLE_PROJECT_ID=
   METRICS_PASSWORD=admin
   ```
3. Document in README of rag-api how to use: copy .env.example to .env, fill, `docker compose up`.
4. No commit.

## Verification

```bash
cd rag-api
cp .env.example .env
# user adds GOOGLE_API_KEY to .env
docker compose up -d
sleep 15
curl -s http://localhost:8080/actuator/health
# expected: {"status":"UP"}
docker compose down -v
```

## Non-goals

- Do NOT include Grafana/Prometheus in this compose (local dev doesn't need).
- Do NOT commit secrets or .env (gitignored).
- Do NOT commit.

## Open questions

None.
