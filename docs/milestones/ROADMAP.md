# ROADMAP — 5 milestones

> Visão geral do desenvolvimento. Atualizar o status ao fim de CADA US (ver [workflow](../02-process/workflow.md)).
> Milestones são majoritariamente sequenciais; dependências específicas estão em cada US.

## Status geral

| Milestone | Objetivo | US planejadas | Concluídas | Status |
|---|---|---|---|---|
| [M0 — Higiene + infra dev](M0.md) | Estrutura limpa, CI, a11y automatizada, contato serverless (fim EmailJS) | 6 | 0/6 | ⬜ |
| [M1 — Design system híbrido](M1.md) | Neo-brutalist: base mono + acentos comic-book cirúrgicos + componentes | 6 | 0/6 | ⬜ |
| [M2 — Conteúdo dual-track](M2.md) | Home creator + `/work` (dev-for-hire) + `/cv` navegável | 6 | 0/6 | ⬜ |
| [M6 — IA integrada](M6.md) | Chatbot Edge Function + pitch com aprovação humana + guardrails | 5 | 0/5 | ⬜ |
| [M7 — Deploy e lançamento](M7.md) | Vercel + domínio + analytics + checklist de lançamento | 4 | 0/4 | ⬜ |

**Total: 27 US** · Concluídas: **0**

> Nota: números de milestone descontínuos (M0→M1→M2→M6→M7) são intencionais — mantêm continuidade com a nomenclatura anterior do PR e sinalizam explicitamente que M3/M4/M5 (backend Java + admin + integração backend) foram **cortados do escopo**.

## Sequência e marcos de valor

```
M0 ──► M1 ──► M2 ──► M6 ──► M7
  │      │      │      │      │
  │      │      │      │      └── 🚀 no ar
  │      │      │      └────────── 🤖 chat serverless com guardrails
  │      │      └───────────────── 📄 conteúdo dual-track (creator + work + cv)
  │      └──────────────────────── 🎨 base mono + acentos híbridos
  └─────────────────────────────── 🛠️  CI, a11y, contato serverless
```

- **Após M2** o site já pode ir para produção como estático — M6 (IA) é upgrade, não pré-requisito.
- **M6 depende de M0** (CI + rate-limit infra) e **de M2** (MDX estruturado como contexto).

## Backlog (fora dos milestones)

- Rota `/cv` em versão PDF-print (imprimível ATS-friendly).
- Modo dimensão: temas alternativos (tokens já preparados no design system).
- Analytics de leitura de posts (tempo de leitura efetivo, scroll depth).
- Página `/status` transparente com custo de IA do mês.
- Repositório separado `portfolio-api` como vitrine técnica Spring Boot (opcional, quando/se justificar).
