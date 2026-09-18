# US-M1-01 — Tokens de design (paleta, tipografia, espaçamento)

**Milestone:** M1 — Design System Spider-Verse
**Status:** ⬜ não iniciada
**Estimativa:** 2h
**Dependências:** M0 completo

## Contexto / Motivação

Base de toda a identidade visual: os tokens definidos em [design-system.md](../../01-architecture/design-system.md) precisam existir como variáveis consumíveis pelos SCSS modules, substituindo as cores soltas atuais.

## Escopo

**Inclui:**
- Criar `frontend/styles/tokens.scss` com CSS custom properties (`--sv-*` + tokens semânticos `--color-bg`, `--color-accent`…) e mapas SCSS auxiliares.
- Importar as fontes escolhidas (display comic/graffiti + corpo + mono) via `next/font` ou `@font-face` local — validar legibilidade da display e registrar a escolha em *Notas de execução* e no design-system.md.
- Escala de espaçamento e raios/bordas padrão (borda grossa de quadrinho).
- Aplicar os tokens no `app.scss` global (fundo, cor de texto base) SEM re-tematizar componentes ainda.

**NÃO inclui:**
- Efeitos (US-M1-02), componentes (US-M1-03), redesign de seções (US-M1-05+).

## Critérios de aceite

- [ ] `tokens.scss` existe com toda a paleta do design-system.md e é importado globalmente.
- [ ] Fundo global e texto base usam os tokens; site continua legível em todas as seções.
- [ ] Fontes carregam sem FOUT perceptível (usar `next/font` com `display: swap`).
- [ ] Contraste texto-base × fundo ≥ AA (checar com ferramenta).

## Passos de implementação assistida por IA

1. Ler `docs/01-architecture/design-system.md` (tabela de tokens) e `frontend/styles/app.scss` + `mixins.scss` atuais.
2. Criar `tokens.scss` (custom properties em `:root` + mapas SCSS para uso em mixins).
3. Configurar fontes com `next/font/google` em `pages/_app.jsx` (candidatas: Bangers/display, Inter/corpo, JetBrains Mono) e expor como CSS variables.
4. Atualizar `app.scss` para consumir os tokens no body/base.
5. Smoke test visual em todas as seções.

## Arquivos afetados

- `frontend/styles/tokens.scss` — criar
- `frontend/styles/app.scss` — modificar
- `frontend/pages/_app.jsx` — modificar (fontes)
- `docs/01-architecture/design-system.md` — atualizar com as fontes finais escolhidas

## Plano de verificação

- [ ] `npm run build` sem erros.
- [ ] Inspecionar `:root` no DevTools → todas as `--sv-*` presentes.
- [ ] Checar contraste (ex.: Lighthouse/axe) do texto base.

## Definition of Done

- [ ] Critérios de aceite ✔ · Verificação ✔ · DoD global ✔ · Status atualizado · Commit `US-M1-01: ...` + push

## Notas de execução

<preencher na sessão>
