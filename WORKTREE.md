# Worktree: rag-api (Spring Boot backend)

**Branch:** `feature/rag-api`
**Scope:** Todas as 16 tasks do Lab RAG backend — P2-RAG-API-01 a 11 (v1 retrieval-only) + P3-RAG-API-12 a 16 (v2 geração Gemini).
**Depende de:** idealmente P0-DOC-06 (ADR 0007) mergeado, mas pode iniciar lendo `docs/plan/draft/` + `docs/plan/rag-architecture.md`.
**Isolamento:** 100%. Cria pasta nova `rag-api/`. Não toca em nada do Next.js existente.

## Tasks (ordem de execução)

### Fase 1 — Scaffold (sequencial)

| # | Task card | Depende de |
|---|---|---|
| 1 | `docs/plan/tasks/P2-RAG-API-01-scaffold-spring-boot.md` | — |

### Fase 2 — Fundações (paralelas após scaffold)

| # | Task card | Depende de |
|---|---|---|
| 2 | `docs/plan/tasks/P2-RAG-API-02-flyway-migration-pgvector.md` | API-01 |
| 3 | `docs/plan/tasks/P2-RAG-API-04-embedding-adapter.md` | API-01 |
| 4 | `docs/plan/tasks/P2-RAG-API-06-rate-limit-bucket4j.md` | API-01 |
| 5 | `docs/plan/tasks/P2-RAG-API-07-observability.md` | API-01 |
| 6 | `docs/plan/tasks/P2-RAG-API-08-docker-compose-dev.md` | API-01 |

### Fase 3 — Features core (depois de 2 e 3)

| # | Task card | Depende de |
|---|---|---|
| 7 | `docs/plan/tasks/P0-DOC-04-formalize-perfil-public.md` ⚠️ | **(fora deste worktree — depende do merge do docs)** |
| 8 | `docs/plan/tasks/P2-RAG-API-03-ingestion-cli.md` | API-02, API-04, P0-DOC-04 |
| 9 | `docs/plan/tasks/P2-RAG-API-05-retrieval-endpoint.md` | API-02, API-04 |

### Fase 4 — Deploy

| # | Task card | Depende de |
|---|---|---|
| 10 | `docs/plan/tasks/P2-RAG-API-09-fly-deploy-config.md` | API-07 |
| 11 | `docs/plan/tasks/P2-RAG-API-10-github-actions-ci.md` | API-09 |
| 12 | `docs/plan/tasks/P2-RAG-API-11-testcontainers-integration.md` | API-05 |

### Fase 5 — v2 geração (P3)

| # | Task card | Depende de |
|---|---|---|
| 13 | `docs/plan/tasks/P3-RAG-API-12-guard-rails-service.md` | API-05 |
| 14 | `docs/plan/tasks/P3-RAG-API-14-flyway-v2-chat-logs.md` | API-02 |
| 15 | `docs/plan/tasks/P3-RAG-API-13-chat-endpoint-gemini-sse.md` | API-12, API-04 |
| 16 | `docs/plan/tasks/P3-RAG-API-15-claim-detector-regex.md` | API-13 |
| 17 | `docs/plan/tasks/P3-RAG-API-16-weekly-log-review.md` | API-14 |

**Total estimado:** ~45h (toda a Fase 1-4 ~25h + Fase 5 ~20h)

## Setup

```bash
cd ~/Documents/DEV/PortfolioDev8-rag-api

# NÃO rodar npm install aqui. Esta worktree é só Spring Boot.
# Verificar Java 17+ e Maven 3.9+:
java -version
mvn --version

# Após P2-RAG-API-01:
cd rag-api && mvn package -DskipTests
```

## Interaction Protocol — Open Questions reais

Tipo A (perguntar antes):
- API-04: Vertex AI vs Generative Language API key? Qual env var name?
- API-05, API-09: nome final do subdomínio? (`api.ohmar.dev` placeholder)
- API-09: nome do app Fly (`rag-api-omar` placeholder)
- API-10: secret `FLY_API_TOKEN` já configurado no repo?
- P3-API-13: modelo Gemini final (`gemini-2.0-flash`)

Perguntar em bloco antes de iniciar cada fase.

## Finalização

PR separada por fase recomendado (3 PRs: v1 completo → deploy → v2):

```bash
git add rag-api/
git commit -m "feat(rag-api): Lab RAG v1 completo — Spring Boot + pgvector + /api/search"
gh pr create --base redesign/v2 --head feature/rag-api \
  --title "feat(rag-api): Lab 01 Semantic Search backend" \
  --body "Spring Boot 3 + pgvector + Google text-embedding-004. Retrieval-only (v1)."
```

Após o PR mergear, continuar com Fase 5 (v2) na MESMA branch (ou rebasear).

## Non-goals

- Não tocar em `src/` do Next.
- Não tocar em `content/`.
- Não criar frontend aqui (fica em `feature/ui-stack`).
