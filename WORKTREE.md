# Worktree: ui-stack (frontend completo)

**Branch:** `feature/ui-stack`
**Scope:** 22 tasks — fundação de design + Home refresh + hire-me layer + sidebar Brittany + componentes + labs frontend.
**Depende de:** `feature/p0-docs` mergeado em `redesign/v2` (precisa de CONTEXT.md atualizado + ADRs 0004-0007 canônicos).
**Isolamento:** mexe forte em `src/` — essa é a worktree "pesada" do frontend. Content e rag-api rodam em paralelo sem conflito.

## Tasks (4 fases sequenciais)

### Fase 1 — Fundação (bloqueia todas as fases seguintes)

| # | Task card | Depende de |
|---|---|---|
| 1 | `docs/plan/tasks/P1-DESIGN-02-font-loading.md` | — |
| 2 | `docs/plan/tasks/P1-DESIGN-01-scss-tokens.md` | P0-DOC-05 mergeado |

### Fase 2 — Home refresh + Hire-me (paralelas entre si após Fase 1)

| # | Task card | Depende de |
|---|---|---|
| 3 | `docs/plan/tasks/P1-UI-01-rewrite-hero-en.md` | Fase 1 |
| 4 | `docs/plan/tasks/P1-UI-02-update-home-now-en.md` | Fase 1 |
| 5 | `docs/plan/tasks/P1-UI-03-rewrite-llms-txt-en.md` | — |
| 6 | `docs/plan/tasks/P1-UI-04-metadata-root-en.md` | — |
| 7 | `docs/plan/tasks/P1-UI-05-nav-labels-en.md` | — |
| 8 | `docs/plan/tasks/P1-HIRE-01-hire-me-page-en.md` | Fase 1 |
| 9 | `docs/plan/tasks/P1-HIRE-02-trabalhe-comigo-pt.md` | HIRE-01 |
| 10 | `docs/plan/tasks/P1-HIRE-03-nav-cta-open-to-work.md` | Fase 1, UI-05, HIRE-01 |
| 11 | `docs/plan/tasks/P1-HIRE-04-schema-org-jsonld.md` | — |

### Fase 3 — Sidebar Brittany + Componentes (paralelas entre si)

| # | Task card | Depende de |
|---|---|---|
| 12 | `docs/plan/tasks/P2-UI-FEED-04-stack-chip.md` | Fase 1 |
| 13 | `docs/plan/tasks/P2-UI-FEED-03-lab-card.md` | FEED-04 |
| 14 | `docs/plan/tasks/P2-UI-FEED-02-work-grid-projectcard.md` | FEED-04 |
| 15 | `docs/plan/tasks/P2-UI-FEED-01-writing-list-item.md` | Fase 1 |
| 16 | `docs/plan/tasks/P2-UI-FEED-05-timeline-experience.md` | FEED-04 |
| 17 | `docs/plan/tasks/P2-UI-SHELL-01-sidebar-component.md` | Fase 1 |
| 18 | `docs/plan/tasks/P2-UI-SHELL-02-footer-refresh.md` | Fase 1 |
| 19 | `docs/plan/tasks/P2-UI-SHELL-03-section-highlight-scroll.md` | SHELL-01 |

### Fase 4 — Labs frontend

| # | Task card | Depende de |
|---|---|---|
| 20 | `docs/plan/tasks/P2-RAG-UI-03-api-client.md` | — |
| 21 | `docs/plan/tasks/P2-RAG-UI-02-source-card.md` | FEED-04 |
| 22 | `docs/plan/tasks/P2-RAG-UI-04-loading-skeleton.md` | RAG-UI-02 |
| 23 | `docs/plan/tasks/P2-RAG-UI-05-error-state.md` | — |
| 24 | `docs/plan/tasks/P2-RAG-UI-06-empty-state.md` | — |
| 25 | `docs/plan/tasks/P2-RAG-UI-01-semantic-search-page.md` | RAG-UI-02, 03, 04, 05, 06, FEED-03 |
| 26 | `docs/plan/tasks/P2-RAG-UI-07-labs-index.md` | FEED-03 |

### Fase 5 — Chat (depende da rag-api Fase 5 estar deployada)

| # | Task card | Depende de |
|---|---|---|
| 27 | `docs/plan/tasks/P3-RAG-UI-01-chat-ui-streaming.md` | RAG-UI-01, SHELL-01, P3-RAG-API-13 em produção |
| 28 | `docs/plan/tasks/P3-RAG-UI-02-source-citation-integration.md` | P3-RAG-UI-01 |
| 29 | `docs/plan/tasks/P3-RAG-UI-03-toggle-retrieval-only.md` | P3-RAG-UI-01 |

**Total estimado:** ~40h

## Setup

```bash
cd ~/Documents/DEV/PortfolioDev8-ui-stack
npm install   # ~1-2min, baixa node_modules local
npm run dev   # dev server em http://localhost:3000
```

**IMPORTANTE:** cada worktree tem `node_modules/` próprio. ~500MB extras no disco.

## Interaction Protocol — Open Questions reais

Tipo A pra perguntar antes:
- HIRE-01: email definitivo (`oscarcama888@gmail.com` ou outro?), slug exato do LinkedIn, incluir faixa salarial?
- UI-SHELL-01: `/about` existe ou nav aponta pra `#now`?
- UI-FEED-05: perfil pré-Premiersoft — quais roles listar?
- RAG-UI-03: valor final de `NEXT_PUBLIC_RAG_API_URL`?

## Finalização

PRs recomendadas por fase pra evitar PR gigante:
- **PR 1**: Fase 1 + 2 (fundação + Home + hire-me) → ~15h → feedback rápido
- **PR 2**: Fase 3 (Sidebar + componentes) → ~12h
- **PR 3**: Fase 4 (Lab search frontend) → ~10h
- **PR 4**: Fase 5 (Chat) → ~5h, só após rag-api v2 estar em produção

```bash
git add -A
git commit -m "feat(ui): fundação (tokens + fonts) + Home refresh + hire-me layer"
gh pr create --base redesign/v2 --head feature/ui-stack --title "..."
```

Após cada merge, rebasear a branch pra pegar mudanças (especialmente da `feature/content` quando mergear).

## Non-goals

- Não tocar em `rag-api/`.
- Não escrever conteúdo MDX (fica em `feature/content`).
- Não tocar em `docs/plan/`.
