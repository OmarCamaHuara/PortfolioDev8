# Visual Direction

Design system para o Portfolio de Omar Cama reposicionado como Authority Platform "AI-fluent backend". Este documento é o **MASTER** que qualquer implementação deve respeitar; overrides por página podem existir em `docs/design/pages/`, mas devem ser explícitos.

Referências obrigatórias antes de decidir qualquer coisa nova:
- `CONTEXT.md` — vocabulário do domínio
- `docs/adr/0001-reposition-as-authority-platform.md` — a decisão estratégica
- `research/aihero-analysis.md` — princípios de referência do aihero.dev

---

## 1. Estilo escolhido: **Editorial Dark, Warm Accent**

Uma combinação de:
- **Editorial** — tipografia como estrutura visual principal (não decoração), serif de personalidade nos títulos, longform legível para Deep Dives de 2000+ palavras.
- **Dark-native** — dark mode é o driver diário do público (developers). Light variant existe mas é opcional e não pode piorar a experiência.
- **Warm accent** — um único acento âmbar/dourado quente para links, foco e CTAs. Nada de dois acentos, nada de gradiente.

### Alternativas consideradas e rejeitadas

**Terminal aesthetic** (fundo preto, monoespaçada em tudo, verde/âmbar terminal): rejeitada. Todo backend dev tentou isso entre 2022-2024, e virou um dialeto saturado. Sinaliza "dev que gosta de terminal", não "engenheiro que pensa em produto". Falha o critério do Authority Platform: parece cosplay.

**Neo-brutalism / retro-brutalist** (bordas grossas, sombras chapadas offset, palette saturada): rejeitada. Estética alta-voltagem incompatível com voz Real Engineering (calma, direta, com autoridade). Envelhece rápido e se choca com Deep Dives longos — o olho cansa em qualquer texto acima de 500 palavras.

**Notion-esque clean** (branco, cinzas neutros, azul link padrão, muito espaço em branco): rejeitada. Neutro demais — não afirma posicionamento. O site parece um doc, não um lugar. Nenhum aspecto visual carrega marca.

### Por que Editorial Dark ganha

- **Diferencia sem gritar.** Serif em título é raro em portfolio de dev; sinaliza *isto é editorial, não CV*. Casa com a decisão estratégica da ADR 0001.
- **Longform-friendly.** Serif nos títulos + sans no corpo + line-height alto sustenta leitura de 15-20 minutos sem fadiga. É requisito não-negociável para Deep Dive.
- **Warm accent evita fintech-purple e fintech-cyan.** Nenhum dev-portfolio-genérico usa âmbar. Diferenciação de baixo custo.
- **Sobrevive a light mode.** Se um dia Omar quiser light variant, o esquema warm-neutral converte com trocas de tokens — não com redesign.

---

## 2. Paleta

### Dark (default)

| Token | Hex | Uso |
|---|---|---|
| `--bg` | `#0e0d0b` | Fundo principal. Warm-black, sem azul (rejeita o `#0c0c1d` atual que puxa roxo). |
| `--bg-elevated` | `#151310` | Cartões, code blocks, superfícies elevadas. Diferença sutil de 2%. |
| `--fg` | `#efe9dc` | Texto principal. Warm off-white, nunca `#ffffff`. |
| `--fg-muted` | `#a8a196` | Meta text, timestamps, autor, secundário. |
| `--fg-subtle` | `#6a6459` | Placeholder, disabled, dividers. |
| `--border` | `rgba(239, 233, 220, 0.08)` | Hairline em cards, code blocks, dividers. |
| `--border-strong` | `rgba(239, 233, 220, 0.18)` | Focus visible, borda ativa. |
| `--accent` | `#e6a24a` | Único acento. Links, hover, foco, CTAs primários. Âmbar quente. |
| `--accent-muted` | `#c4863a` | Hover state do accent. |
| `--accent-wash` | `rgba(230, 162, 74, 0.12)` | Seleção de texto, backgrounds de highlight. |
| `--success` | `#8bb26f` | Verde silenciado. Confirmações, "shipped". |
| `--error` | `#c86e5a` | Terracota. Erros de form, alertas. Nunca vermelho puro. |
| `--code-bg` | `#161410` | Code blocks. |
| `--code-fg` | `#efe9dc` | Código default. |

**Regra:** apenas `--accent` colore. Todo o resto é grayscale warm-tinted. Um acento, uma paleta.

**Regra de contraste:** `--fg-subtle` **nunca** aparece em texto legível. Apenas placeholder, disabled, divider. Antes de shippar qualquer PR, rodar contrast-checker em `--fg-muted` sobre `--bg-elevated` (a combinação não foi verificada neste doc).

### Light (opcional, deferido)

Não implementar na v1 do redesign. Quando implementar:
- `--bg`: `#f7f3ea` (paper)
- `--fg`: `#1a1613`
- `--accent`: `#a8631d` (mesmo âmbar, ajustado para contraste em fundo claro — 4.5:1 mínimo)
- Preservar warmth em todo o esquema.

### Rejeitados

- `#6366f1` / `#8b5cf6` (indigo→violet do portfolio atual) — AI safe-harbor palette. Todo portfolio AI-adjacente em 2024-26 usa isso.
- Cyan/teal (`#06b6d4`, `#14b8a6`) — palette fintech saturada.
- Verde neon (`#00ff88` etc.) — terminal aesthetic saturada.
- Rosa/magenta accent — não casa com Real Engineering (leituras: playful, não sério).

---

## 3. Tipografia

### Fontes

| Papel | Família | Peso disponíveis | Fonte | Fallback |
|---|---|---|---|---|
| Heading | **Instrument Serif** | 400, 400 italic | Google Fonts | `'Iowan Old Style', 'Palatino Linotype', Palatino, Georgia, serif` |
| Body | **Inter** | 400, 500, 600 | Google Fonts | `system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif` |
| Mono | **JetBrains Mono** | 400, 500 | Google Fonts | `'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace` |

### Por que estas escolhas

- **Instrument Serif** — serif contemporânea com muito caráter, gratuita, gancho editorial imediato. Alternativas viáveis: Fraunces (mais versátil, mas familiar demais) e GT Super (paga). Instrument Serif ganha por ser distinta e free.
- **Inter** — padrão de leitura em pt-BR e EN, hinting agressivo, corpo confortável em screen. Substitui a **DM Sans** atual que é OK mas não tão neutra para longform.
- **JetBrains Mono** — melhor caractere zero-slashed que **Fira Code** (o atual), ligatures opcionais, superior em code blocks longos.

### Escala tipográfica (base 17px)

| Uso | Fonte | Tamanho | Peso | Line-height | Letter-spacing |
|---|---|---|---|---|---|
| Hero headline (H1) | Instrument Serif | 4rem (64px) desktop / 2.5rem mobile | 400 | 1.1 | -0.02em |
| Section title (H2) | Instrument Serif | 2.25rem (36px) | 400 | 1.15 | -0.01em |
| Subsection (H3) | Inter | 1.375rem (22px) | 600 | 1.3 | -0.005em |
| Body | Inter | 1.0625rem (17px) | 400 | 1.65 | 0 |
| Small / meta | Inter | 0.875rem (14px) | 500 | 1.5 | 0.015em |
| Micro / label | Inter | 0.75rem (12px) | 600 | 1.4 | 0.06em (UPPERCASE) |
| Code inline | JetBrains Mono | 0.9375rem (15px) | 400 | 1.5 | 0 |
| Code block | JetBrains Mono | 0.875rem (14px) | 400 | 1.7 | 0 |

### Regras de uso

- **H1 sempre em serif.** É a assinatura visual do site.
- **Longform-body é Inter 17px / line-height 1.65 / max-width 68ch.** Não abaixar. Não widening. Esta combinação é o núcleo do "editorial" — quebrar ela quebra o estilo.
- **Nunca usar Instrument Serif em H3 ou menor.** Só H1 e H2. Abaixo disso, serif fica ilegível em screen.
- **Códigos inline recebem background `--code-bg` + border `--border`.** Nunca inline-code sem background — some no meio do parágrafo.

---

## 4. Motion policy

### Regra-mãe

> Movimento comunica mudança de estado. Nunca decora.

Se um pixel se move na tela e você não pode nomear qual estado mudou, o movimento sai.

### O que anima

| Interação | Efeito | Duração | Easing |
|---|---|---|---|
| Link hover (cor) | `color` transition | 150ms | `ease-out` |
| Botão primary hover | `background-color` + `border-color` | 150ms | `ease-out` |
| Menu abrir/fechar | `opacity` + `translateY(-4px)` | 220ms | `cubic-bezier(0.22, 1, 0.36, 1)` |
| ChatBot open (se mantido) | `opacity` + `scale(0.97 → 1)` | 220ms | `cubic-bezier(0.22, 1, 0.36, 1)` |
| Focus ring | `outline` aparece instant | 0ms | — |
| Página carrega | **nada.** Conteúdo já está lá. | — | — |

### O que **não** anima

- Entrada de conteúdo em scroll (nenhum `whileInView` do framer-motion).
- Nenhum letreiro que se digita sozinho.
- Nenhum stagger de cards ao carregar (Projects.tsx atualmente faz isso — sai).
- Nenhum "3D tilt" em card hover.
- Nenhuma parallax.
- Scroll indicator animado no hero (Hero.tsx atualmente tem — sai).

### `prefers-reduced-motion`

Global reset via CSS:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

Isto vem antes de qualquer outra regra de motion.

**Nota consciente:** o reset nuclear (0.01ms) também neutraliza menu open/close (220ms). Usuários com `reduced-motion` verão o menu aparecer instantaneamente — não perdem funcionalidade, só o easing. Decisão aceita.

---

## 5. Efeitos e superfícies

- **Sem sombra.** Superfícies distinguidas por borda hairline + delta sutil de background (`--bg` → `--bg-elevated`).
- **Bordas hairline** — 1px `--border`. Nunca 2px+ (leitura brutalist).
- **Sem gradientes.** Em nada. Nem no scrollbar (o atual tem gradiente indigo→violet — sai).
- **Sem glass / backdrop-blur.** Zero glassmorphism.
- **Focus ring:** `outline: 2px solid var(--accent); outline-offset: 2px;` — visível, sempre.
- **Selection:** `::selection { background: var(--accent-wash); color: var(--fg); }`
- **Scrollbar:** thin, `--fg-subtle`. Sem gradiente.
- **Cursor:** `pointer` em tudo clicável. `text` em áreas de leitura. Padrão em navegação.

---

## 6. Iconografia

- **SVG apenas.** Zero emoji como ícone de UI.
- **Um único set em todo o site.** Recomendação: **Lucide** (irmão do Feather, ativo, ~1000 ícones, MIT).
- **Stroke width consistente:** 1.5px. Nunca misturar 1.5 e 2px.
- **Size grid:** 16px (inline), 20px (padrão), 24px (destaque). Nunca fora dessa escala.
- **Cor:** herda `currentColor` sempre. Nenhum ícone com cor fixa.

### Ícones a remover do portfolio atual

- ChatBot toggle `🤖` (ChatBot.tsx:151) — se ChatBot for mantido, trocar por SVG Lucide `Sparkles` ou `MessageCircle`.
- Avatar do chat `🤖` (ChatBot.tsx:186, 197) — mesmo, SVG.
- Star / fork icons inline no Projects.tsx — trocar por Lucide `Star` e `GitFork`.

---

## 7. Componentes-base (contrato visual)

### Link

- Cor: `--accent`
- Underline: `text-underline-offset: 0.2em; text-decoration-thickness: 1px; text-decoration-color: var(--accent-muted);`
- Hover: cor vira `--accent-muted`, underline vira `--accent`.
- **Nunca** link sem underline em corpo de texto. Em navegação, sem underline OK.

### Botão primário

- Background: `--accent`
- Foreground: `--bg` (contraste 8:1+)
- Padding: `0.75rem 1.25rem`
- Border-radius: `4px` (nunca pill, nunca 12px+)
- Hover: background `--accent-muted`

### Botão secundário

- Background: transparent
- Foreground: `--fg`
- Border: 1px `--border-strong`
- Hover: border vira `--accent`

### Card (Post, Project Write-up preview)

- Background: `--bg` (não elevated — o card não flutua)
- Border-top: 1px `--border` (só top — dá ritmo de lista editorial)
- Padding: 1.5rem 0
- Hover: título vira `--accent`

### Code block

- Background: `--code-bg`
- Border: 1px `--border`
- Border-radius: `4px`
- Padding: `1rem`
- Overflow-x: auto
- Font: JetBrains Mono 14px / 1.7
- Syntax highlighting: preferir tema com fundo transparente + cores no espectro warm (evitar VS Code Dark+ com azuis frios saturados). Recomendação: **Rosé Pine Moon** ou **Kanagawa Wave** — ambos warm-toned.

---

## 8. Layout tokens

- Max content width: `68ch` (~640px) para longform (Post, Deep Dive, Project Write-up).
- Max page width: `72rem` (1152px) para páginas de índice (Home, Writing, Work).
- Grid gutter: `2rem` desktop / `1rem` mobile.
- Vertical rhythm base: `1.5rem`.
- Breakpoints: 640, 768, 1024, 1280. Mobile-first.

---

## 9. Anti-patterns específicos a este brief

Se você (agente ou humano) pensou em uma destas coisas, pare. Agrupadas em 4 blocos pra caber em working memory.

### 9a. Hero-shape anti-patterns

1. **Hero com "code block decorativo".** O portfolio atual tem um (Hero.tsx:96-121, com traffic-light dots). Sai. H1 + parágrafo bastam.
2. **"Digitação animada"** (typewriter effect). Sai.
3. **Scroll indicator animado** (seta pulando pra baixo). Sai — o scroll da página comunica scroll.
4. **Cursor.dev-style "agent conversando com si mesmo em código animado"** no hero. Padrão saturado 2025. Sai.
5. **Video hero / motion background loop.** O novo default pós-glass. Sai.

### 9b. AI-safe-harbor decoração

6. **AI-imagery decorativa** (blobs, neurons, particles, mesh). A palavra "AI" no positioning basta; ilustrar empobrece.
7. **Gradient text** em H1. Serif em `--fg` é a assinatura.
8. **Emoji em UI** (📧 contact, 🚀 botão, 🤖 chatbot). Sempre SVG Lucide.
9. **Sticky navbar com backdrop-blur.** Coberto por §7 mas vale reforço explícito.
10. **"Made with Next.js" / stack badge no footer.** Sai. O stack aparece em Deep Dives, não em selo.

### 9c. CV-shape leaks

11. **Tech stack ribbon** de ícones flutuando (Node/Java/Spring). Stack se comunica pela evidência do conteúdo, não por sticker collection.
12. **"Trusted by" com logos de ex-empregadores.** Vira CV instantâneo.
13. **Testemunho sem nome/foto/contexto** ("Omar é dedicado!"). Só testimonials com nome real, avatar e contexto específico — modelo aihero.dev.
14. **Skill % bars** ("Java 90%"). Métricas fabricadas.

### 9d. Motion decor

15. **Grid de projetos com hover 3D-tilt.** Lista editorial, sem card-lift.
16. **CTA que anima ao carregar** (bounce, pulse, glow). Sai.

### 9e. Copy anti-patterns

17. **AI-boilerplate:** "orchestrate", "empower", "unleash", "supercharge", "revolutionize", "seamless", "cutting-edge". Se pareceu com landing page de SaaS 2024, cortar. Ler em voz alta — se soa a jargão, é.

## 10. Hero shape (decisão pendente)

As seções anteriores rejeitam o que o hero **não** é. O hero precisa afirmar o que **é** antes da implementação. Três opções:

- **(a) H1 massivo full-bleed + parágrafo curto + 1 CTA.** Máxima Von Restorff. Mais próximo do aihero.dev conceitualmente. Recomendado como default.
- **(b) H1 + parágrafo em coluna narrow (max-width: 68ch) + link inline pra Writing.** Mais editorial, menos "landing". Bom se o positioning statement for narrativo, não punchy.
- **(c) H1 em contexto de latest Post** ("Latest: [Post title]" acima do H1). Sinaliza Authority Platform desde o primeiro pixel. Depende de ter Post publicado — se dia 1 tem 0 Posts, cai pra (a).

Decisão a fechar na task #3.2 (ver §Roadmap). Recomendação inicial: **(a)** com fallback pra **(c)** quando o primeiro Post estiver publicado.

## 11. Mobile

- **Tap targets mínimo 44×44px** (WCAG AA). Aplicar a todo botão, link de nav, ícone tocável.
- **Botão primário mobile:** aumentar padding vertical para `1rem` (vs `0.75rem` desktop).
- **Nav collapse ≤ 768px.** Sheet full-height sem backdrop-blur, background `--bg` sólido.
- **H1 mobile:** 2.5rem já definido em §3 — validado por Fitts (título grande, próximo do polegar).
- **Container padding:** `1.5rem` lateral mobile, `2rem` desktop.
- **Sem hover-only interactions** — todo estado precisa ser alcançável via tap/click, incluindo tooltips e disclosure.

## 12. Estados obrigatórios

Nenhuma seção pode ser "esquecida" — cada uma tem estados que precisam ser desenhados.

- **Empty state Writing (dia 1, 0 Posts):** bloco de texto explicando "primeiro Post em breve" + link pro RSS ou form de subscribe. **Nunca** "Coming Soon" plaquinha. Usar o próprio tom Problem-first: nomear o que virá e por quê.
- **Empty state Work (0 Project Write-ups):** mesmo padrão — 1 parágrafo dizendo "estou escrevendo o primeiro write-up sobre X".
- **Loading state:** skeleton em `--bg-elevated`, sem shimmer, sem spinner animado. Skeleton preserva altura do conteúdo pra evitar layout shift.
- **Error state (form contato):** mensagem em `--error`, inline sob o campo, ícone Lucide `AlertCircle`. Nunca modal.
- **404:** mesma tipografia do site (H1 Instrument Serif "Página não encontrada"), sem ilustração, link direto pra `/writing` e `/work`.
- **500:** mesmo padrão, mais um `mailto:` pro Omar caso o usuário queira reportar.

## 13. Accessibility floor

Mínimos não-negociáveis. Rodar antes de todo merge.

- **Skip-to-content link** — visível no primeiro `Tab` do keyboard nav.
- **Todos os inputs com `<label>`** — nunca placeholder-as-label.
- **Focus ring visível** em toda navegação de teclado (§7 já define, aqui só reforço).
- **Contraste mínimo 4.5:1** para body / **3:1** para large text (24px+).
- **`prefers-reduced-motion`** respeitado (§4).
- **Alt text** em todas as imagens de conteúdo. Imagens puramente decorativas ganham `alt=""`.
- **Rodar axe-core** em CI antes de merge (setup na task de implementação).

## 14. Longform patterns

Padrões que só Deep Dive e Project Write-up precisam.

- **Table of Contents:**
  - `≥ 1024px`: sticky no lado direito, largura ~14rem, offset do topo, contorna o footer.
  - `< 1024px`: colapsa em `<details>` accordion no topo do post, aberto por default se ≥ 4 headings.
- **Footnotes:** superscript numérico no texto, ancoradas em seção `## Notes` no rodapé. Sem popover.
- **Blockquote:** border-left `2px solid var(--accent)`, padding-left `1rem`, cor `--fg`, **sem itálico** (itálico + serif fica ilegível em fundo escuro).
- **Image caption:** `<figcaption>` em Inter 14px `--fg-muted`, italic, `text-align: left` alinhado à imagem, `margin-top: 0.5rem`.
- **Inline code:** já definido em §3. Reforço: nunca inline sem background.
- **Print stylesheet** (opcional v2): remove nav/footer/sidebar, muda fundo para `#ffffff` + texto `#000000`, oculta ícones puramente decorativos.

---

## 15. Rejeição concreta dos defaults atuais

Diff explícito contra `src/app/globals.scss` e componentes:

| Atual | Substituir por | Motivo |
|---|---|---|
| `background-color: #0c0c1d` | `background-color: #0e0d0b` | Remove tint roxa; warmth casa com estilo Editorial. |
| `color: #e2e8f0` | `color: #efe9dc` | Warm off-white; par com `--bg`. |
| `font-family: 'DM Sans'` (H1) | `font-family: 'Instrument Serif'` | Assinatura visual do estilo. |
| Fira Code | JetBrains Mono | Contemporânea, zero-slashed, melhor em code blocks longos. |
| Scrollbar `linear-gradient(#6366f1, #8b5cf6)` | `background: var(--fg-subtle)` sólido | Remove gradiente; scrollbar é infra, não decoração. |
| `scroll-snap-type: y mandatory` no html | Remove | Snap na página inteira quebra leitura de Post/Deep Dive. |
| Hero: 8 `motion.div` com stagger de entrada | Static H1 + parágrafo | Motion policy rejeita entrance decorativa. |
| Hero: `.codeBlock` decorativo com traffic-light dots | Removido | Anti-pattern #1. |
| Hero: `scrollIndicator` animado | Removido | Anti-pattern #3. |
| Projects: cards com `whileHover={{ y: -8 }}` | Lista editorial hover: só cor do título vira accent | Motion policy: hover-lift sai. |
| ChatBot toggle emoji `🤖` | SVG Lucide (se ChatBot for mantido; ver ADR 0002 pendente) | Iconografia. |

---

## 16. Checklist pré-entrega (aplicado por seção)

Antes de fechar qualquer PR de UI, verificar:

**Visual**
- [ ] Zero emoji como ícone
- [ ] Ícones todos do mesmo set (Lucide, stroke 1.5)
- [ ] Sem gradiente em lugar nenhum
- [ ] Sem sombra

**Interação**
- [ ] `cursor: pointer` em tudo clicável
- [ ] Hover só muda cor/borda (nunca layout)
- [ ] Transitions 150-250ms
- [ ] Focus ring visível

**Tipografia**
- [ ] H1 em Instrument Serif
- [ ] Body em Inter 17px / line-height 1.65
- [ ] Code em JetBrains Mono
- [ ] Longform respeita `max-width: 68ch`

**Motion**
- [ ] Nenhum `whileInView`
- [ ] Nenhuma entrada animada em page load
- [ ] `prefers-reduced-motion` respeitado

**Contexto**
- [ ] Nenhum item da lista de Anti-patterns (seção 9, blocos 9a-9e)
- [ ] Hero shape decidido (§10) — não deixar implementação escolher no ato
- [ ] Estados obrigatórios cobertos (§12): empty, loading, error, 404, 500
- [ ] Accessibility floor validado (§13): axe-core zero-issues, contraste checado
- [ ] Longform patterns (§14) aplicados em Post/Deep Dive/Project Write-up
- [ ] Copy segue **Problem-first** (ver `CONTEXT.md`)
- [ ] Termos casam com vocabulário de `CONTEXT.md`

---

_Este documento é MASTER. Overrides por página moram em `docs/design/pages/<page>.md` e devem citar qual regra deste MASTER estão sobrescrevendo e por quê._
