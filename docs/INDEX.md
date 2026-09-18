# INDEX — Documentação do PortfolioDev8

> Portfolio dual-track de `ohmar_tai` — creator/YouTube + dev-for-hire.
> **Nova sessão de IA?** Comece por [`AGENTS.md`](../AGENTS.md) na raiz.

## Fundação

| Doc | O quê |
|---|---|
| [CONSTITUTION.md](CONSTITUTION.md) | Princípios inegociáveis (10) |
| [DECISIONS.md](DECISIONS.md) | Registro de decisões (ADRs — só quando decidido de verdade) |
| [glossary.md](glossary.md) | Glossário |

## 00 — Visão

| Doc | O quê |
|---|---|
| [00-vision/vision.md](00-vision/vision.md) | Produto, personas dual-track, diferenciais, objetivos |

## 01 — Arquitetura

| Doc | O quê |
|---|---|
| [01-architecture/overview.md](01-architecture/overview.md) | Estrutura, diagrama, fluxos (Next-only + Edge) |
| [01-architecture/frontend.md](01-architecture/frontend.md) | App Router, rotas, i18n, MDX, convenções |
| [01-architecture/ai-integration.md](01-architecture/ai-integration.md) | Edge Function, guardrails, custo, LGPD |
| [01-architecture/design-system.md](01-architecture/design-system.md) | Neo-brutalist híbrido |

## 02 — Processo

| Doc | O quê |
|---|---|
| [02-process/workflow.md](02-process/workflow.md) | Como executar uma US do início ao commit |
| [02-process/us-template.md](02-process/us-template.md) | Template obrigatório de US |

## Milestones

[**ROADMAP.md**](milestones/ROADMAP.md) — visão geral e status ·
[M0](milestones/M0.md) · [M1](milestones/M1.md) · [M2](milestones/M2.md) · [M6](milestones/M6.md) · [M7](milestones/M7.md)

> M3, M4, M5 foram cortados no rescope (backend Java + admin + integração backend). Ver commit `docs: cortar backend Java, Spider-Verse puro e PII do plano`.

## User Stories

| Milestone | US |
|---|---|
| **M0 — Higiene + infra** | [01 limpeza Vite](us/M0/US-M0-01-limpeza-vite.md) · [03 README](us/M0/US-M0-03-readme-monorepo.md) · [04 CV como MDX](us/M0/US-M0-04-cv-versionado.md) · [05 CI GitHub Actions](us/M0/US-M0-05-ci-github-actions.md) · [06 contato serverless](us/M0/US-M0-06-contato-serverless.md) |
| **M1 — Design system** | [01 tokens](us/M1/US-M1-01-design-tokens.md) · [02 efeitos](us/M1/US-M1-02-efeitos-base.md) · [03 componentes](us/M1/US-M1-03-componentes-base.md) · [04 placeholders](us/M1/US-M1-04-placeholders-graffiti.md) · [05 hero](us/M1/US-M1-05-hero-redesign.md) · [06 navegação/cursor](us/M1/US-M1-06-navegacao-cursor.md) |
| **M2 — Conteúdo** | [01 work MDX](us/M2/US-M2-01-jornada-cv-real.md) · [02 skills](us/M2/US-M2-02-skills-por-categoria.md) · [03 /work](us/M2/US-M2-03-projetos-curadoria.md) · [04 /cv navegável](us/M2/US-M2-04-modo-recrutador.md) · [05 /cv PDF sem PII](us/M2/US-M2-05-cv-download-discreto.md) · [06 SEO/OG](us/M2/US-M2-06-seo-og.md) |
| **M6 — IA** | [01 provider factory](us/M6/US-M6-01-multi-provider.md) · [02 chat endpoint](us/M6/US-M6-02-chat-endpoint.md) · [03 chat UI](us/M6/US-M6-03-chat-frontend.md) · [04 rate-limit/cache](us/M6/US-M6-04-custos-rate-limit.md) · [05 pitch + aprovação](us/M6/US-M6-05-pitch-vaga.md) |
| **M7 — Deploy** | [01 ADR hospedagem](us/M7/US-M7-01-decisao-hospedagem.md) · [02 deploy Vercel](us/M7/US-M7-02-deploy-frontend.md) · [04 domínio + analytics](us/M7/US-M7-04-dominio-analytics.md) · [05 checklist](us/M7/US-M7-05-checklist-lancamento.md) |

## Learnings

[learnings/README.md](learnings/README.md) — template e índice das lições por milestone.
