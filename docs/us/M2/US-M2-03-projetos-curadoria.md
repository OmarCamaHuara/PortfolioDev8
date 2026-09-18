# US-M2-03 — Projetos: curadoria + HiraiPro em destaque

**Milestone:** M2 — Conteúdo e storytelling do CV
**Status:** ⬜ não iniciada
**Estimativa:** 2h
**Dependências:** US-M1-03

## Contexto / Motivação

A seção atual (`components/portfolio/Porfolio.jsx` — typo no nome) mostra 4 projetos antigos e não mostra o **HiraiPro** (o projeto mais forte do CV: IA + agentes + MCPs + TDD + hexagonal) nem o próprio PortfolioDev8.

## Escopo

**Inclui:**
- Renomear arquivo/componente para `Portfolio.jsx` (corrigir typo).
- **Curadoria com o Omar**: quais projetos antigos ficam. Proposta inicial: HiraiPro (destaque) + PortfolioDev8 (meta-projeto) + 1–2 antigos mais fortes.
- Cards `ComicPanel` com: nome, descrição curta, stack (stickers), links (repo/demo quando houver), imagem.
- HiraiPro como painel destacado (maior, com onomatopeia "IA!").
- Dados em `frontend/content/projects.js` (estrutura da entidade `Project`).

**NÃO inclui:**
- Escrever estudos de caso longos (backlog); consumo de API (M5).

## Critérios de aceite

- [ ] HiraiPro em destaque com descrição/stack fiéis à fonte canônica.
- [ ] Curadoria aprovada pelo Omar registrada em content-source.md.
- [ ] Typo `Porfolio` corrigido em arquivo, componente e imports.
- [ ] Parallax/scroll da seção continua fluido.

## Passos de implementação assistida por IA

1. Perguntar ao Omar a curadoria (lista proposta acima) antes de codar.
2. `git mv` do arquivo + rename do componente + atualizar imports.
3. Criar `content/projects.js`; reescrever os cards com componentes do design system mantendo a mecânica de scroll existente.
4. Otimizar imagens novas (webp) em `public/`.

## Arquivos afetados

- `frontend/components/portfolio/Porfolio.jsx` → `Portfolio.jsx` — renomear/reescrever
- `frontend/content/projects.js` — criar
- `frontend/pages/index.jsx` — modificar import
- `docs/00-vision/content-source.md` — registrar curadoria

## Plano de verificação

- [ ] `npm run dev` → seção com nova curadoria, links abrindo em nova aba.
- [ ] `grep -r "Porfolio" frontend/` vazio; `npm run build` sem erros.

## Definition of Done

- [ ] Critérios de aceite ✔ · Verificação ✔ · DoD global ✔ · Status atualizado · Commit `US-M2-03: ...` + push

## Notas de execução

<preencher na sessão>
