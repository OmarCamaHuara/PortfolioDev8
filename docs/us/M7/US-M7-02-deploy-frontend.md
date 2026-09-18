# US-M7-02 — Deploy do frontend

**Milestone:** M7 — Deploy e lançamento
**Status:** ⬜ não iniciada
**Estimativa:** 2h
**Dependências:** US-M7-01

## Contexto / Motivação

Colocar o Next.js em produção no host escolhido na US-M7-01, com deploy contínuo a partir da branch principal e envs corretas.

## Escopo

**Inclui:**
- Projeto no host apontando para o repo, **root directory `frontend/`** (monorepo).
- Envs de produção: `NEXT_PUBLIC_API_URL` (backend — pode entrar depois da US-M7-03; fallback cobre o intervalo), demais chaves públicas necessárias.
- Deploy automático por push na branch principal + preview deployments (se o host oferecer).
- Verificação de ISR/revalidate funcionando no host.
- Documentar o processo em `docs/02-process/deploy.md` (criar).

**NÃO inclui:**
- Domínio custom (US-M7-04); backend (US-M7-03).

## Critérios de aceite

- [ ] Site no ar na URL do host, com todas as seções, nos 3 locales.
- [ ] Push na branch principal → deploy automático.
- [ ] Backend ainda ausente → site 100% via fallback (prova real do CONSTITUTION §7).

## Passos de implementação assistida por IA

1. Configurar o projeto no host (root dir, build command, node version).
2. Envs; primeiro deploy; smoke test completo (scroll, Modo Recrutador, locales, CV download).
3. Testar o fluxo de preview em PR (se disponível).
4. Escrever `docs/02-process/deploy.md` (frontend; a US-M7-03 completa com backend).

## Arquivos afetados

- `docs/02-process/deploy.md` — criar
- Possíveis ajustes: `frontend/next.config.js`

## Plano de verificação

- [ ] Smoke test na URL de produção (desktop + celular real).
- [ ] Lighthouse na URL de produção — registrar baseline nas Notas.

## Definition of Done

- [ ] Critérios de aceite ✔ · Verificação ✔ · DoD global ✔ · Status atualizado · Commit `US-M7-02: ...` + push

## Notas de execução

<preencher na sessão>
