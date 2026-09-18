# US-M1-02 — Efeitos base: halftone, glitch RGB, motion

**Milestone:** M1 — Design System Spider-Verse
**Status:** ⬜ não iniciada
**Estimativa:** 3h
**Dependências:** US-M1-01

## Contexto / Motivação

Os efeitos assinatura do Spider-Verse (halftone/Ben-Day, glitch de aberração cromática RGB, variantes de motion) precisam existir como utilitários reutilizáveis antes de re-tematizar qualquer seção — evita CSS duplicado e garante o comportamento com `prefers-reduced-motion`.

## Escopo

**Inclui:**
- Mixin/classe `halftone` (radial-gradient repetido ou SVG pattern, com variações de densidade/cor).
- Mixin/classe `glitch` para textos (camadas magenta/ciano deslocadas, keyframes ≤200ms, ativável em hover ou por classe `glitch-in`).
- Variantes Framer Motion nomeadas (`fadeSpray`, `panelIn`, `glitchIn`) em um módulo compartilhado `frontend/components/motion/variants.js`.
- Hook/util `usePrefersReducedMotion` que desliga glitch/animações (CSS: `@media (prefers-reduced-motion: reduce)`).
- Página/rota de demonstração temporária `pages/dev/effects.jsx` (removida no fim do M1) para validar visualmente.

**NÃO inclui:**
- Aplicar efeitos nas seções reais (US-M1-05/06 e M2).
- Onomatopeias e balões SVG (US-M1-03).

## Critérios de aceite

- [ ] Classes/mixins de halftone e glitch funcionam na página de demo.
- [ ] Com `prefers-reduced-motion: reduce` emulado, glitch e animações não rodam e o conteúdo permanece estático e legível.
- [ ] Variantes de motion importáveis de um único módulo.

## Passos de implementação assistida por IA

1. Criar `frontend/styles/effects.scss` (halftone + glitch) usando tokens de `tokens.scss`.
2. Criar `frontend/components/motion/variants.js` com as variantes nomeadas e o hook de reduced motion.
3. Criar `pages/dev/effects.jsx` exibindo: título com glitch em hover, bloco halftone, cards animando com cada variante.
4. Emular reduced motion no DevTools (Rendering tab) e validar o desligamento.

## Arquivos afetados

- `frontend/styles/effects.scss` — criar
- `frontend/components/motion/variants.js` — criar
- `frontend/pages/dev/effects.jsx` — criar (temporário)

## Plano de verificação

- [ ] `npm run dev` → `/dev/effects`: efeitos visíveis e suaves (60fps aproximado, sem jank ao rolar).
- [ ] DevTools → emular `prefers-reduced-motion` → efeitos desligados.
- [ ] `npm run build` sem erros.

## Definition of Done

- [ ] Critérios de aceite ✔ · Verificação ✔ · DoD global ✔ · Status atualizado · Commit `US-M1-02: ...` + push

## Notas de execução

<preencher na sessão>
