# Worktree: docs (P0)

**Branch:** `feature/p0-docs`
**Scope:** Todas as 7 tasks P0 — promover drafts a canônicos, escrever ADRs 0006/0007, atualizar memórias.
**Depende de:** nada. Pode começar imediatamente.
**Bloqueia:** `feature/ui-stack` e `feature/content` (porque dependem de CONTEXT.md e ADRs novos no main).

## Tasks (ordem recomendada)

| # | Task card | Depende de | Pode paralelizar com |
|---|---|---|---|
| 1 | `docs/plan/tasks/P0-DOC-01-formalize-adr-0004.md` | — | DOC-02, DOC-04, DOC-05, DOC-06 |
| 2 | `docs/plan/tasks/P0-DOC-02-formalize-adr-0005.md` | — | DOC-01, DOC-04, DOC-05, DOC-06 |
| 3 | `docs/plan/tasks/P0-DOC-04-formalize-perfil-public.md` | — | DOC-01, DOC-02, DOC-05, DOC-06 |
| 4 | `docs/plan/tasks/P0-DOC-05-write-adr-0006-visual.md` | — | DOC-01, DOC-02, DOC-04, DOC-06 |
| 5 | `docs/plan/tasks/P0-DOC-06-write-adr-0007-backend-scope.md` | — | DOC-01, DOC-02, DOC-04, DOC-05 |
| 6 | `docs/plan/tasks/P0-DOC-03-update-context-md.md` | DOC-01, DOC-02 | DOC-07 |
| 7 | `docs/plan/tasks/P0-DOC-07-update-memory-visual-direction.md` | DOC-05 | DOC-03 |

**Total estimado:** ~4.5h

## Setup

Nenhum. Esta worktree só mexe em `docs/`, `CONTEXT.md` e memórias (fora do repo). Não precisa de `npm install`.

## Interaction Protocol

Antes de executar cada task, ler `docs/plan/README.md § Interaction protocol`. Open Questions **Tipo A** nos cards precisam de resposta do usuário antes de prosseguir.

Pros P0, ouso dizer que **nenhuma Open Question é Tipo A** — são promoções de drafts já aprovados. Mas confirmar com o usuário ao começar: *"Executando P0-DOC-01 a 07 sequencialmente, posso seguir sem perguntas intermediárias?"*

## Finalização

Quando as 7 tasks estiverem com `status: done` nos frontmatters:

```bash
# Verificação final
grep -c "status: done" docs/plan/tasks/P0-DOC-*.md
# expected: 7

# Commitar (se o executor não commitou por task)
git add -A
git commit -m "docs: formaliza P0 — ADRs 0004-0007, CONTEXT.md, perfil público"

# Abrir PR
gh pr create --base redesign/v2 --head feature/p0-docs \
  --title "P0: formalize decisions (ADRs 0004-0007 + CONTEXT.md + perfil)" \
  --body "Promove drafts a canônicos. Desbloqueia feature/ui-stack e feature/content."

# Após merge:
git worktree remove ../PortfolioDev8-docs
git branch -d feature/p0-docs
```

## Non-goals desta worktree

- Não tocar em `src/`.
- Não tocar em `content/`.
- Não tocar em `package.json`, `package-lock.json`.
- Não executar nenhuma task P1+ (fica para outras worktrees).
