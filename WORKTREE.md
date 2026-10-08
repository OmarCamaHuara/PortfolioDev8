# Worktree: content (MDX seed + expansão)

**Branch:** `feature/content`
**Scope:** 7 peças de conteúdo seed — 1 Note, 3 Project Write-ups, 2 Posts, 1 Deep Dive.
**Depende de:** `feature/p0-docs` mergeado (precisa de CONTEXT.md atualizado pra seguir vocabulário correto e framing "Formalizing").
**Isolamento:** 100%. Só adiciona arquivos em `content/writing/` e `content/work/`. Mergeia peça por peça.

## Tasks (todas paralelas entre si)

| # | Task card | Tipo | Horas | Precisa interview |
|---|---|---|---|---|
| 1 | `docs/plan/tasks/P2-CONTENT-01-note-why-aws.md` | Note (~300 words) | 1 | Não |
| 2 | `docs/plan/tasks/P2-CONTENT-03-work-hiria-pro.md` | Project Write-up (pull do GH público) | 2 | Pode precisar completar lacunas do README |
| 3 | `docs/plan/tasks/P2-CONTENT-02-work-trading-impossivel.md` | Project Write-up (interview) | 3 | **Sim — bloqueia** |
| 4 | `docs/plan/tasks/P2-CONTENT-04-post-building-rag-retrieval.md` | Post (~1500 words) | 4 | Depende de P2-RAG-API-05 funcional |
| 5 | `docs/plan/tasks/P3-CONTENT-05-post-generation-guard-rails.md` | Post (~1800 words) | 3 | Depende de P3-RAG-API-13 funcional |
| 6 | `docs/plan/tasks/P3-CONTENT-06-work-fenix.md` | Project Write-up (condicional) | 2 | Depende de P4-OPS-06 (status Fênix) |
| 7 | `docs/plan/tasks/P3-CONTENT-07-deep-dive-backend-to-ai.md` | Deep Dive (~3000 words) | 6 | Não |

**Total estimado:** ~17-21h (depende de interviews)

## Ordem recomendada

1. **Começar por CONTENT-01** (Note AWS, 1h, sem bloqueios) — tira `/writing` do EmptyState imediatamente.
2. **CONTENT-03** (hiria_pro) em paralelo — pode ser escrito direto do README público.
3. **CONTENT-02** (TradingImpossível) — pedir interview ao usuário antes.
4. **CONTENT-07** (Deep Dive) — a peça mais pesada, pode começar em paralelo com outras.
5. **CONTENT-04** só depois que RAG-API-05 estiver funcional em dev local.
6. **CONTENT-05** só após Lab v2 estar funcional.
7. **CONTENT-06** só após decisão do P4-OPS-06.

## Setup

```bash
cd ~/Documents/DEV/PortfolioDev8-content
npm install   # necessário se for testar o build renderizando o MDX
npm run build # verifica que a peça renderiza antes de commitar
```

## Interaction Protocol — Open Questions reais

Tipo A **que bloqueia** cada task:
- **CONTENT-02** (TradingImpossível): precisa de 4 bullets do usuário — problema, decisões, trade-offs, resultados.
- **CONTENT-03** (hiria_pro): confirmar que o README público cobre tudo ou precisa de interview.
- **CONTENT-06** (Fênix): precisa saber status real (defunct / absorbed / dormant / ativo).

Pergunte **em bloco quando iniciar cada task**, não antes.

## Finalização

Mergear **peça por peça** em PRs pequenas:

```bash
git add content/writing/formalizing-aws-now.mdx
git commit -m "content: Note 'Why I'm formalizing AWS now' (EN seed)"
gh pr create --base redesign/v2 --head feature/content \
  --title "content: first Note (formalizing AWS)" \
  --body "Tira /writing do EmptyState. ~310 words EN."
```

Após merge, rebasear a branch antes da próxima peça:
```bash
git fetch origin
git rebase origin/redesign/v2
```

## Non-goals

- Não tocar em `src/`.
- Não tocar em `rag-api/`.
- Não tocar em `docs/plan/`.
- Não fabricar métricas/features inexistentes nos Project Write-ups.
