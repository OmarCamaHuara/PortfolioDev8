# Design System — Neo-brutalist híbrido

> **Base:** monkeytype minimalista (a v2 já em `main`).
> **Acentos:** comic-book/graffiti cirúrgicos, 1–2 por tela.
> **Regra de ouro:** o site funciona *sem nenhum acento*. Os acentos são temperados por cima.

## Camadas do sistema

O design opera em duas camadas explícitas:

- **Camada base (obrigatória, sempre visível):** paleta mono, tipografia mono, layout enxuto, foco na legibilidade. É o esqueleto do site — se todos os acentos desligarem (`prefers-reduced-motion`, browser antigo, imagem quebrada), o site continua íntegro e usável.
- **Camada de acento (opcional, cirúrgica):** elementos comic-book — glitch RGB em hover de título, halftone como fundo de HUD widget, hard shadow em CTA, onomatopeia SVG em conquista. Cada tela usa **1–2 acentos no máximo**. Nunca ao mesmo tempo.

## Paleta (tokens)

Herdada da v2 monkeytype com adição de 2 acentos comic pontuais.

| Token | Hex | Uso |
|---|---|---|
| `--bg` | `#0F0E0C` | fundo principal (warm black da v2) |
| `--bg-elev` | `#1A1815` | cards, superfícies elevadas |
| `--fg` | `#E8E4DA` | texto principal |
| `--fg-mute` | `#8A857A` | texto secundário, metadata |
| `--accent` | `#E7A94B` | âmbar da v2 — links, CTA primário, cursor |
| `--accent-hot` | `#FF2E88` | **acento comic 1** — só em glitch layer, hover destrutivo, badge "SHIPPED" |
| `--accent-cool` | `#00E5FF` | **acento comic 2** — glitch layer complementar, HUD widget |
| `--border` | `#2A2825` | bordas sutis (camada base) |
| `--border-hard` | `#E8E4DA` | bordas neo-brutalist (só em acentos) |

**Regras:**
- 90%+ dos pixels na tela são `--bg`, `--fg` e `--accent`. Os acentos hot/cool aparecem em **≤ 5% da tela por vez**.
- Nunca usar `--accent-hot` ou `--accent-cool` em texto corrido (falha contraste em tamanhos pequenos).
- Gradientes: proibidos como fundo de seção. Permitidos apenas em elementos < 200px (glitch layer, badge).

## Tipografia

| Papel | Fonte | Peso | Onde |
|---|---|---|---|
| Base UI | JetBrains Mono (ou Berkeley Mono se licenciada) | 400/500/700 | Toda navegação, corpo, headings pequenos |
| Display | JetBrains Mono 700 tight-tracking | 700 | Headings grandes (h1, h2 do hero) |
| Comic accent | Rubik Glitch OU Bangers (validar legibilidade + peso do bundle) | 400 | Onomatopeias SVG, badges "SHIPPED", 404 |
| Serif opcional | Instrument Serif | 400 | Citações longas, easter eggs |

Nunca importar mais de 3 famílias em runtime. Comic accent entra como SVG ou `font-display: optional` (não bloqueia LCP).

## Efeitos assinatura (camada de acento)

| Efeito | Onde usar | Onde NÃO usar | Custo |
|---|---|---|---|
| **Glitch RGB** | hover de título do hero, transição de rota | corpo, botão comum, seção inteira | CSS `text-shadow` duplo, keyframe ≤ 200ms |
| **Halftone HUD** | badge de status ("BUILDING", "SHIPPED"), fundo de widget < 300px | wallpaper de seção, container de card | SVG pattern único inline, cacheável |
| **Hard shadow** | CTA primário do hero (1 por tela), badge de destaque | todo botão, todo card | `box-shadow: 4px 4px 0 var(--fg)` |
| **Onomatopeia SVG** | envio de form ("SENT!"), CTA de conversão ("SHIP IT") | navegação, listas | SVG único por interação |

**Todos os efeitos:**
- Desligam sob `prefers-reduced-motion: reduce`.
- Testados com axe antes do merge.
- O conteúdo semântico não depende do efeito.

## Layout

- Grid base: 8px.
- Container principal: max-width 72rem, padding lateral 24px (mobile) / 48px (desktop).
- Espaçamento vertical entre seções: 96px (desktop) / 64px (mobile).
- **Sem bento grid.** Sem cards flutuando com sombras difusas. Sem glassmorphism. (Ver skill `ux-psychology-and-antipatterns`.)

## Motion

- Framer Motion apenas em componentes que já precisam de estado. Não colocar `motion.div` em wrapper puro.
- Durações: 120–240ms para micro-interações, 300–500ms para transições de rota.
- Nenhum loop infinito visível fora do hero.
- `will-change` só em elementos com animação ativa; remover no `onAnimationComplete`.

## Acessibilidade (checklist por US visual)

- [ ] Contraste AA (WebAIM ≥ 4.5:1 em texto corrido, ≥ 3:1 em UI ≥ 24px).
- [ ] `prefers-reduced-motion` desliga glitch, halftone animado, parallax.
- [ ] Foco visível em todo interativo (outline âmbar 2px offset 2px).
- [ ] `alt` descritivo em imagens informativas; `alt=""` + `aria-hidden` nos decorativos.
- [ ] Teste automático axe passa em CI (ver US-M0-05).
