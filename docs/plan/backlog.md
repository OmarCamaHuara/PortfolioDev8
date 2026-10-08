# Portfolio Backlog — Omar Cama, 2026-H2

Lista completa de tasks priorizadas. Cada entrada tem ID, título, categoria, estimativa e dependências explícitas. Tasks dentro da mesma prioridade são independentes entre si e podem rodar em paralelo. Tasks em prioridade N dependem apenas de P0..P(N-1) estarem concluídas, não entre si.

Formato pra expansão em task card: ver `docs/plan/task-template.md`. Exemplo materializado: `docs/plan/tasks/P0-DOC-01-formalize-adr-0004.md`.

**Status geral:** backlog real tem **68 tasks** (não 45 — subcontei na primeira versão). Materialização por waves: wave 1 (P0 + P1 = 18 cards) → wave 2 (P2 primeira metade) → wave 3 (P2 segunda metade + P3) → wave 4 (P4).

---

## P0 — Formalize decisions (promover rascunhos pra verdade do site)

Objetivo: as decisões aprovadas em planejamento viram artefatos canônicos no repo. Nada de código ainda.

| ID | Título | Est. | Depends on | Blocks |
|---|---|---|---|---|
| P0-DOC-01 | Formalize ADR 0004 (reposition) | 0.5h | — | P0-DOC-03, P1-UI-01 |
| P0-DOC-02 | Formalize ADR 0005 (language policy EN primary) | 0.5h | — | P0-DOC-03, P1-UI-03 |
| P0-DOC-03 | Update CONTEXT.md (promote draft) | 1h | — | P1-UI-01, P1-UI-02, P1-HIRE-01 |
| P0-DOC-04 | Formalize perfil_llm.public.md (promote draft to docs/) | 0.5h | — | P2-RAG-API-03 (ingestion) |
| P0-DOC-05 | Write ADR 0006 (visual: Brittany + monkeytype hybrid) | 1h | — | P1-DESIGN-01 |
| P0-DOC-06 | Write ADR 0007 (backend scope revision — Spring Boot approved for Lab RAG) | 0.5h | — | P2-RAG-API-01 |
| P0-DOC-07 | Update memory `project-visual-direction.md` to Brittany+monkeytype hybrid | 0.5h | P0-DOC-05 | — |

**Total P0:** ~4h.

---

## P1 — Hire-me layer + design foundation + Home refresh

Objetivo: o site passa a sinalizar busca de emprego. Positioning novo visível na Home, Nav e `/hire-me`. Design tokens prontos pra Fase 2.

| ID | Título | Est. | Depends on | Blocks |
|---|---|---|---|---|
| P1-DESIGN-01 | SCSS tokens (colors, type scale, spacing) in `src/app/globals.scss` | 2h | P0-DOC-05 | P1-UI-01, P1-UI-02, P2-UI-* |
| P1-DESIGN-02 | Font loading via `next/font` (Inter, Roboto Mono, Instrument Serif) | 1h | — | P1-UI-* |
| P1-UI-01 | Rewrite Hero.tsx in EN with new positioning | 2h | P0-DOC-01, P0-DOC-03, P1-DESIGN-01 | — |
| P1-UI-02 | Update page.tsx "Now" section in EN | 1h | P0-DOC-01, P1-DESIGN-01 | — |
| P1-UI-03 | Rewrite `src/app/llms.txt` in EN | 0.5h | P0-DOC-02 | — |
| P1-UI-04 | Update metadata root (title, description, OG tags) in EN | 1h | P0-DOC-01 | — |
| P1-HIRE-01 | Build `/hire-me` page (EN) with modality, stack, email, timezone | 2h | P0-DOC-03 | — |
| P1-HIRE-02 | Build `/trabalhe-comigo` variant (pt-BR, same info adapted) | 1h | P1-HIRE-01 | — |
| P1-HIRE-03 | Add CTA "Open to Work" (ponto piscando) permanente in Nav | 2h | P1-DESIGN-01, P1-HIRE-01 | — |
| P1-HIRE-04 | Add Schema.org JobApplicant JSON-LD to root layout | 1h | — | — |
| P1-UI-05 | Update rota naming: `/writing` canonical EN, keep `/textos` 301 redirect | 1h | P0-DOC-02 | — |

**Total P1:** ~14.5h.

**Nota de dependência interna:** dentro de P1, `P1-HIRE-02` depende de `P1-HIRE-01` (variant depende do source). `P1-HIRE-03` depende de P1-DESIGN-01 + P1-HIRE-01. O resto são independentes dentro de P1.

---

## P2 — Lab RAG v1 + Sidebar + Content seed

Objetivo: a vitrine técnica central (Lab RAG retrieval-only em Spring Boot) está rodando em produção. Sidebar Brittany-style no desktop. 3 peças de conteúdo seed publicadas.

### P2 — Design & UI shell
| ID | Título | Est. | Depends on | Blocks |
|---|---|---|---|---|
| P2-UI-SHELL-01 | Build Sidebar component (desktop fixa, mobile hamburger) | 3h | P1-DESIGN-01 | — |
| P2-UI-SHELL-02 | Build Footer refresh with social links in mono | 1h | P1-DESIGN-01 | — |
| P2-UI-SHELL-03 | IntersectionObserver — section highlight in Sidebar on scroll | 2h | P2-UI-SHELL-01 | — |
| P2-UI-FEED-01 | Rebuild Writing list item (date + lang chip + title + description) | 2h | P1-DESIGN-01 | — |
| P2-UI-FEED-02 | Rebuild Work grid with ProjectCard component | 2h | P1-DESIGN-01 | — |
| P2-UI-FEED-03 | Build LabCard component (status badge + CTA) | 1.5h | P1-DESIGN-01 | — |
| P2-UI-FEED-04 | Build StackChip component (reusable) | 1h | P1-DESIGN-01 | — |
| P2-UI-FEED-05 | Build Timeline component for Experience | 2h | P1-DESIGN-01 | — |

### P2 — Content seed
| ID | Título | Est. | Depends on | Blocks |
|---|---|---|---|---|
| P2-CONTENT-01 | Note EN "Why I'm formalizing AWS now" (~300 words) | 1h | P0-DOC-01 | — |
| P2-CONTENT-02 | Project Write-up: TradingImpossível (text-only, no repo link if still private) | 3h | P0-DOC-01 | — |
| P2-CONTENT-03 | Project Write-up: hiria_pro (pulls from public GH README) | 2h | P0-DOC-01 | — |

### P2 — Lab RAG v1 Backend (Spring Boot)
| ID | Título | Est. | Depends on | Blocks |
|---|---|---|---|---|
| P2-RAG-API-01 | Scaffold Spring Boot project at `rag-api/` with Maven, Dockerfile | 2h | P0-DOC-06 | all P2-RAG-API-* |
| P2-RAG-API-02 | Flyway migration V1 — pgvector schema (chunks, search_logs) | 1h | P2-RAG-API-01 | P2-RAG-API-03, P2-RAG-API-05 |
| P2-RAG-API-03 | Document ingestion CLI (reads MDX, chunks, calls embedding, upserts chunks) | 4h | P2-RAG-API-02, P0-DOC-04 | — |
| P2-RAG-API-04 | Embedding adapter (Spring AI + Google text-embedding-004) | 2h | P2-RAG-API-01 | P2-RAG-API-03, P2-RAG-API-05 |
| P2-RAG-API-05 | Retrieval endpoint `POST /api/search` with pgvector cosine search | 3h | P2-RAG-API-02, P2-RAG-API-04 | P2-RAG-UI-01 |
| P2-RAG-API-06 | Rate limit middleware (Bucket4j, 10 req/min + 50/day per IP hash) | 2h | P2-RAG-API-01 | — |
| P2-RAG-API-07 | Observability — actuator health, Prometheus endpoint, JSON logs | 2h | P2-RAG-API-01 | — |
| P2-RAG-API-08 | Docker Compose dev stack (api + postgres+pgvector) | 1h | P2-RAG-API-01 | — |
| P2-RAG-API-09 | Fly.io deploy config (fly.toml, secrets, autoscale min 0) | 2h | P2-RAG-API-07 | P4-OPS-03 |
| P2-RAG-API-10 | GitHub Actions CI (build, test, docker push, fly deploy) | 2h | P2-RAG-API-09 | — |
| P2-RAG-API-11 | Testcontainers integration test for retrieval end-to-end | 2h | P2-RAG-API-05 | — |

### P2 — Lab RAG v1 Frontend
| ID | Título | Est. | Depends on | Blocks |
|---|---|---|---|---|
| P2-RAG-UI-01 | `/labs/semantic-search` page with search input + suggested prompts | 2h | P2-UI-FEED-03, P1-DESIGN-01 | — |
| P2-RAG-UI-02 | SourceCard component (title, snippet, URL, source_type chip) | 1.5h | P1-DESIGN-01 | P2-RAG-UI-01 |
| P2-RAG-UI-03 | API client (fetch wrapper, 10s timeout, 1 retry on 5xx) | 1h | — | P2-RAG-UI-01 |
| P2-RAG-UI-04 | Loading skeleton (3 SourceCard placeholders) | 0.5h | P2-RAG-UI-02 | — |
| P2-RAG-UI-05 | Error state (retry button, problem-first message) | 0.5h | — | P2-RAG-UI-01 |
| P2-RAG-UI-06 | Empty state ("No matches above threshold. Try something broader.") | 0.5h | — | P2-RAG-UI-01 |
| P2-RAG-UI-07 | `/labs` index page listing all Labs with LabCard | 1h | P2-UI-FEED-03 | — |

### P2 — Content around Lab
| ID | Título | Est. | Depends on | Blocks |
|---|---|---|---|---|
| P2-CONTENT-04 | Post EN "Building a RAG retrieval endpoint over my own portfolio" (~1500 words) | 4h | P2-RAG-API-05, P2-RAG-UI-01 | — |

**Total P2:** ~55h (um sprint de ~3-4 semanas em part-time).

---

## P3 — Lab RAG v2 (geração) + content expansion

Objetivo: adicionar geração Gemini com guard rails rigorosos. Chat UI com streaming. 2 Posts a mais.

| ID | Título | Est. | Depends on | Blocks |
|---|---|---|---|---|
| P3-RAG-API-12 | Add `generation/` package with GuardRails service | 2h | P2-RAG-API-05 | P3-RAG-API-13 |
| P3-RAG-API-13 | Chat endpoint `POST /api/chat` with Gemini + SSE streaming | 4h | P3-RAG-API-12, P2-RAG-API-04 | P3-RAG-UI-01 |
| P3-RAG-API-14 | Chat logs table (Flyway V2) + logging in ChatController | 1h | P2-RAG-API-02 | — |
| P3-RAG-API-15 | Post-processing claim detector (regex scan for "worked at X" etc.) | 2h | P3-RAG-API-13 | — |
| P3-RAG-API-16 | Weekly log review script (SQL + CSV export) | 1h | P3-RAG-API-14 | — |
| P3-RAG-UI-01 | Chat UI stream-aware (SSE client, cursor animation) | 4h | P2-RAG-UI-01, P2-UI-SHELL-01 | — |
| P3-RAG-UI-02 | Source citation cards integrated below assistant message | 1.5h | P3-RAG-UI-01, P2-RAG-UI-02 | — |
| P3-RAG-UI-03 | Toggle "retrieval-only mode" that calls `/api/search` instead of `/api/chat` | 1h | P3-RAG-UI-01 | — |
| P3-CONTENT-05 | Post EN "Adding generation to the Lab — guard rails against hallucination" | 3h | P3-RAG-API-13 | — |
| P3-CONTENT-06 | Project Write-up: Projeto Fênix (or investigate status first) | 2h | — | — |
| P3-CONTENT-07 | Deep Dive EN "Backend engineer's path to AI engineering" (~3000 words) | 6h | P2-CONTENT-04 | — |

**Total P3:** ~27.5h.

---

## P4 — Operations & polish

Objetivo: domínio, hreflang, decisões sobre repos privados, PR #5 fechado. Contínuo durante toda a execução.

| ID | Título | Est. | Depends on | Blocks |
|---|---|---|---|---|
| P4-OPS-01 | Decide: trading-mvp public, forked-curated public, or stay private | 1h | P2-CONTENT-02 | — |
| P4-OPS-02 | Close PR #5 with comment referencing ADR 0001/0003/0004/0005/0006/0007 | 0.5h | P0-DOC-05, P0-DOC-06 | — |
| P4-OPS-03 | Custom domain setup (e.g. `ohmar.dev` + `api.ohmar.dev`) | 2h | P2-RAG-API-09 | — |
| P4-OPS-04 | hreflang + bilingual sitemap in `src/app/sitemap.ts` | 2h | P1-UI-05 | — |
| P4-OPS-05 | GhContributions upgrade — pinned repos live from GH API | 3h | — | — |
| P4-OPS-06 | Investigate Projeto Fênix status (is it part of trading-mvp? separate? defunct?) | 0.5h | — | P3-CONTENT-06 |
| P4-OPS-07 | Add robots.txt rules excluding `/api/*` and `/draft/*` | 0.5h | — | — |
| P4-OPS-08 | Lighthouse CI target budget: LCP <2.5s, INP <200ms, CLS <0.1 | 2h | all P1-UI-* | — |
| P4-OPS-09 | Prometheus scraping config + Grafana dashboard for rag-api | 2h | P2-RAG-API-07 | — |

**Total P4:** ~13.5h.

---

## Grand total

**68 tasks, ~116h** of structured work. Em part-time de 10h/semana, isso é ~12 semanas. Alinha com o horizonte de 6+ meses do Omar (sobra tempo pra iterar, publicar Posts semanais, aplicar pra vagas).

Breakdown:
- P0: 7 tasks, ~4.5h
- P1: 11 tasks, ~14.5h
- P2: 30 tasks, ~56.5h (fase mais pesada — Lab RAG + UI shell + content seed)
- P3: 11 tasks, ~27.5h
- P4: 9 tasks, ~13.5h

## Caminho crítico (ordem obrigatória)

P0-DOC-01 → P0-DOC-03 → P1-UI-01 (Hero reflete positioning novo)
P0-DOC-05 → P1-DESIGN-01 → todas P1-UI-* e P2-UI-*
P0-DOC-06 → P2-RAG-API-01 → P2-RAG-API-02 → P2-RAG-API-05 → P2-RAG-UI-01
P0-DOC-04 → P2-RAG-API-03 (ingestion precisa do perfil_llm.public.md canônico)

Fora do caminho crítico, muita coisa pode rodar paralelo. Especialmente conteúdo (P2-CONTENT-*) e UI shell (P2-UI-SHELL-*) não bloqueiam entre si.
