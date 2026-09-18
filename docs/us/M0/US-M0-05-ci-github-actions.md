# US-M0-05 — CI GitHub Actions (build + lint + typecheck + axe)

**Milestone:** M0 — Higiene + infra dev
**Status:** ⬜ não iniciada
**Estimativa:** 2h
**Dependências:** US-M0-01

## Contexto / Motivação

O repositório hoje não tem CI. Regressões (build quebrado, lint pendente, contraste abaixo de AA, tipo quebrado) passam despercebidas até a próxima sessão manual. Toda US futura deve poder assumir que `main` está sempre verde, e a a11y é uma regra da CONSTITUTION que precisa de verificação automática, não só de intenção.

## Escopo

**Inclui:**
- Workflow `.github/workflows/ci.yml` disparando em `push` + `pull_request` para `main`, `redesign/**` e `claude/**`.
- Jobs: `install` (cache), `lint`, `typecheck`, `build`, `axe` (roda contra páginas estáticas geradas pelo build).
- Cache de `~/.npm` e `.next/cache` por hash do lockfile.
- Badge no README.

**NÃO inclui (explícito):**
- Testes unitários com Jest/Vitest — fora do escopo, virá com a primeira feature que justificar.
- Playwright E2E — virá com US futura após M2.
- Deploy pipeline — US-M7-02.

## Critérios de aceite

- [ ] PR novo em `main` dispara CI que roda os 4 jobs em ≤ 3 min.
- [ ] Falha em qualquer job bloqueia o merge (branch protection ativada manualmente pelo Omar após primeira execução verde).
- [ ] Axe rejeita PR com contraste abaixo de AA em uma página construída.
- [ ] Badge do CI aparece no README com status atual.

## Passos de implementação

1. Criar `.github/workflows/ci.yml` com jobs paralelos após um `install`.
2. Adicionar `pa11y-ci` ou `@axe-core/cli` como devDependency; configurar `.pa11yci.json` (ou `axe.config.js`) apontando pra páginas estáticas do build.
3. Ajustar `package.json`: `"lint"`, `"typecheck"` (`tsc --noEmit`), `"a11y"` (roda axe contra `out/` ou similar).
4. Testar o workflow abrindo um PR de teste (mudança trivial).
5. Fixar version dos runners (`ubuntu-24.04`) e node (`.nvmrc` ou `20`).
6. Adicionar badge `![CI](https://github.com/.../workflows/ci/badge.svg)` no `README.md`.

## Arquivos afetados

- `.github/workflows/ci.yml` — criar
- `package.json` — modificar (scripts + devDeps `pa11y-ci` ou `@axe-core/cli`, `typescript` se ainda não tem)
- `.pa11yci.json` (ou `axe.config.js`) — criar
- `README.md` — modificar (badge)

## Plano de verificação

- [ ] PR de teste dispara todos os 4 jobs; todos verdes.
- [ ] Introduzir contraste ruim em um componente → job axe falha, mensagem clara.
- [ ] Introduzir tipo quebrado → job typecheck falha.
- [ ] Tempo total ≤ 3 min (com cache quente).

## Definition of Done

- [ ] Critérios ✔ · Verificação ✔ · DoD global (AGENTS.md) ✔ · Status atualizado · Commit `US-M0-05: ...` + push

## Notas de execução

<preencher na sessão>
