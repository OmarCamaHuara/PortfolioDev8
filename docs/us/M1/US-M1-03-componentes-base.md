# US-M1-03 — Componentes base: botão sticker, painel de quadrinho, headings

**Milestone:** M1 — Design System Spider-Verse
**Status:** ⬜ não iniciada
**Estimativa:** 3h
**Dependências:** US-M1-02

## Contexto / Motivação

Seções (M1/M2) e novas features (Modo Recrutador, chat) precisam de blocos de construção consistentes: botões estilo sticker, cards com moldura de quadrinho, títulos de seção com spray/glitch, onomatopeias e balões de fala.

## Escopo

**Inclui:**
- `components/ui/StickerButton` — botão/link com contorno branco grosso, sombra dura, hover com glitch leve.
- `components/ui/ComicPanel` — card com borda irregular de quadrinho (clip-path/SVG frame) e fundo `--sv-night` ou "papel".
- `components/ui/SectionHeading` — título display com glitch opcional e sublinhado spray.
- `components/ui/Onomatopoeia` — SVG de texto expressivo com rotação/cores configuráveis.
- `components/ui/SpeechBubble` — balão de HQ (base para chat e Spider-Bot).
- Demonstração dos 5 na página `/dev/effects` existente.

**NÃO inclui:**
- Uso nas seções reais (US-M1-05+ e M2).

## Critérios de aceite

- [ ] Os 5 componentes renderizam na página de demo com props documentadas (JSDoc simples).
- [ ] Todos usam apenas tokens/efeitos do design system (zero hex hardcoded).
- [ ] Interativos com foco visível (outline ciano) e navegáveis por teclado.
- [ ] Com reduced-motion: sem animação, visual estático íntegro.

## Passos de implementação assistida por IA

1. Criar cada componente em `frontend/components/ui/<Nome>/` seguindo o padrão pasta+module.scss do projeto.
2. Reutilizar `effects.scss` e `variants.js` (US-M1-02) — não duplicar keyframes.
3. Adicionar os exemplos em `/dev/effects` com variações de props.
4. Testar teclado (Tab/Enter) e reduced-motion.

## Arquivos afetados

- `frontend/components/ui/*` — criar (5 componentes + estilos)
- `frontend/pages/dev/effects.jsx` — modificar

## Plano de verificação

- [ ] `npm run dev` → `/dev/effects`: 5 componentes OK em desktop e mobile viewport.
- [ ] Navegação por teclado com foco visível.
- [ ] `npm run build` sem erros.

## Definition of Done

- [ ] Critérios de aceite ✔ · Verificação ✔ · DoD global ✔ · Status atualizado · Commit `US-M1-03: ...` + push

## Notas de execução

<preencher na sessão>
