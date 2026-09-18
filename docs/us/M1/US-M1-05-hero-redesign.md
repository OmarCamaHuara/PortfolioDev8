# US-M1-05 — Redesign do Hero

**Milestone:** M1 — Design System Spider-Verse
**Status:** ⬜ não iniciada
**Estimativa:** 3h
**Dependências:** US-M1-03

## Contexto / Motivação

O Hero é o primeiro impacto — deve gritar a identidade Spider-Verse e comunicar o posicionamento do CV em segundos ([vision.md](../../00-vision/vision.md): visitante entende quem é o Omar sem nenhum clique).

## Escopo

**Inclui:**
- Re-tematizar `components/hero/Hero.jsx` com tokens/efeitos/componentes do design system: nome com glitch RGB, título/posicionamento do CV real ("Desenvolvedor Backend Java | Spring Boot | Microsserviços | IA Aplicada" — texto de [content-source.md](../../00-vision/content-source.md)), fundo com halftone + slot `graffiti-hero`.
- Manter e re-tematizar o slider de skills e o `ImageSlider` (fotos) existentes.
- CTA primário (StickerButton): "Fala comigo" → contato; CTA discreto de CV mantido (refinado na US-M2-05).
- Responsividade mobile-first preservada.

**NÃO inclui:**
- Conteúdo das outras seções (M2); onomatopeias em outras seções.

## Critérios de aceite

- [ ] Hero com o novo visual em desktop e mobile, sem regressão do slider/fotos.
- [ ] Nome/título vêm do texto canônico; glitch só em hover/entrada e desligado com reduced-motion.
- [ ] LCP não piora significativamente (imagens otimizadas, fontes com swap).

## Passos de implementação assistida por IA

1. Ler o Hero atual e mapear o que fica (estrutura, sliders) vs o que muda (cores, textos, decoração).
2. Substituir estilos do `hero.module.scss` por tokens/efeitos; inserir `SectionHeading`/`StickerButton`/`GraffitiSlot`.
3. Atualizar textos com a fonte canônica (PT por ora).
4. Ajustar animações de entrada com as variantes de `variants.js`.
5. Testar mobile (viewport 360px), desktop e reduced-motion.

## Arquivos afetados

- `frontend/components/hero/Hero.jsx` + `hero.module.scss` — modificar
- `frontend/components/hero/sliderMe/ImageSlider.jsx` — modificar (tema)

## Plano de verificação

- [ ] `npm run dev` → hero novo, slider funcionando, CTA navegando para contato.
- [ ] Emular reduced-motion → sem glitch/animação.
- [ ] `npm run build` sem erros; Lighthouse local sem regressão grave de LCP.

## Definition of Done

- [ ] Critérios de aceite ✔ · Verificação ✔ · DoD global ✔ · Status atualizado · Commit `US-M1-05: ...` + push

## Notas de execução

<preencher na sessão>
