# Design System — Portfolio Omar Cama, 2026-H2

Direção visual oficial do redesign: **estrutura Brittany Chiang + accents monkeytype**. Fundo dark navy sóbrio, accent amarelo monkeytype, Roboto Mono em UI técnica, Instrument Serif em headlines editoriais. Zero graffiti, zero glitch RGB, zero Spider-Verse.

Referências vivas:
- https://brittanychiang.com/ — estrutura (sidebar fixa, timeline, cards, dark navy, chips de stack)
- https://arpitbhayani.me/ — essência (conteúdo-first, writing-forward, newsletter integrada, sóbrio técnico)
- https://monkeytype.com/ — accents (amarelo puro, mono em UI técnica, config toolbar como padrão de interação)

Supersede parcial do ADR 0003 (iteração monkeytype original mantinha accent amarelo e Roboto Mono — ok, mas direção serif-editorial do Hero muda pra Brittany-navy sóbrio, não editorial-serif puro).

## Paleta — dark-first navy

| Token | Valor | Uso |
|---|---|---|
| `--bg` | `#0a192f` | Background base. Brittany direto. |
| `--bg-elevated` | `#112240` | Cards, modals, sidebar background se visualmente separada. |
| `--bg-light` | `#1d2d50` | Hover de card, highlight de linha. |
| `--text` | `#ccd6f6` | Corpo principal (body text). |
| `--text-muted` | `#8892b0` | Secundário: meta, data, labels, nav inativa. |
| `--text-strong` | `#e6f1ff` | Headlines, CTA ativo, nav highlighted. |
| `--accent` | `#e2b714` | Yellow monkeytype. CTA primário, link ativo, chip ativo, cursor pisca. |
| `--accent-dim` | `rgba(226, 183, 20, 0.1)` | Background hover de accent, chip border translúcido. |
| `--border` | `#233554` | Divisores, chip border, card border default. |
| `--border-strong` | `#304a7a` | Hover de card border, focus ring. |
| `--error` | `#f85149` | Validação de form, badge de erro. |
| `--success` | `#3fb950` | Status "live" de Lab, badge publicado. |

**Modo claro:** não implementado no roadmap imediato. Dark cobre a maioria dos recrutadores técnicos US. Adicionar depois se houver demanda.

**Decisão explícita:** accent é **yellow `#e2b714`** (monkeytype), não **teal `#64ffda`** (Brittany). Mantém o toque criativo monkeytype decidido no ADR 0003. O resto da paleta é Brittany direto.

## Tipografia

| Papel | Família | Peso | Casos de uso |
|---|---|---|---|
| Display (H1) | **Instrument Serif** | 400 (Regular) | Hero headline, títulos de Post, título do nome na sidebar |
| Heading (H2, H3) | **Inter** | 600 (SemiBold) | Section headings, títulos de card |
| Body | **Inter** | 400 (Regular) | Parágrafos, listas, descrições |
| Meta / UI / Chips | **Roboto Mono** | 400 (Regular) | Datas, labels, nav items, chips de stack, meta de Post, código inline |
| Accent inline | Instrument Serif italic | 400 | Ênfase editorial seletiva em body — máximo 1 por parágrafo |

**Font loading:** via `next/font/google` (Inter, Roboto Mono, Instrument Serif). Preload display, lazy pros outros. Fallback `system-ui, sans-serif` até o font estabilizar.

### Escala tipográfica

Base 16px, ratio 1.333 (musical fourth).

| Token | px | rem | Uso |
|---|---|---|---|
| `--fs-xs` | 12 | 0.75 | Chips, meta de card, timestamps |
| `--fs-sm` | 14 | 0.875 | Nav items, labels, meta de Post |
| `--fs-base` | 16 | 1.0 | Body |
| `--fs-md` | 20 | 1.25 | Lead paragraphs, destaques |
| `--fs-lg` | 24 | 1.5 | H3 |
| `--fs-xl` | 32 | 2.0 | H2 |
| `--fs-2xl` | 42 | 2.625 | H1 em Post |
| `--fs-3xl` | 56 | 3.5 | Hero headline da Home |

**Line-height:** 1.6 pra body text (`<p>`, `<li>`), 1.3 pra H2/H3, 1.1 pra H1 e Hero.
**Letter-spacing:** 0 default, -0.02em pra Hero display, +0.05em pra Roboto Mono maiúsculo em chip.

## Spacing

Base 4px, escala: `4 8 12 16 24 32 48 64 96 128`.

| Token | px | Uso típico |
|---|---|---|
| `--sp-1` | 4 | Icon gap |
| `--sp-2` | 8 | Chip padding Y, inline gap |
| `--sp-3` | 12 | Chip padding X, small gap entre meta |
| `--sp-4` | 16 | Card padding mobile, gap entre inputs |
| `--sp-6` | 24 | Container padding mobile, gap entre cards |
| `--sp-8` | 32 | Card padding desktop, section gap mobile |
| `--sp-12` | 48 | Container padding desktop, section gap desktop |
| `--sp-16` | 64 | Hero vertical padding mobile |
| `--sp-24` | 96 | Hero vertical padding desktop |
| `--sp-32` | 128 | Grande space entre blocos de seção da Home |

## Layout

### Grid por breakpoint

| Breakpoint | Range | Layout |
|---|---|---|
| Mobile | < 640px | Topbar sticky (hamburger + wordmark + CTA icon). Content full-width, padding `--sp-6`. Stack vertical. |
| Tablet | 640-1023px | Topbar sticky expandida com nav horizontal. Content max-width 640px centrado, padding `--sp-8`. |
| Desktop | ≥ 1024px | **Sidebar fixa 280px à esquerda** (nome, headline curta, nav vertical com section highlight, redes no footer). Content max-width 720px, padding-left adequado pra fugir da sidebar. |
| Wide | ≥ 1280px | Sidebar 320px. Content 760px. Opcional right-rail 180px pra TOC em peças longas. |

### Sidebar fixa (desktop) — anatomia

```
┌─────────────────────────┐
│                         │  <- padding-top --sp-12
│  Omar Cama              │  <- Instrument Serif, --fs-xl, --text-strong
│  Cama Huarahuara_|      │  <- cursor piscando no final (único acento criativo)
│                         │
│  AI engineer with       │  <- Inter, --fs-sm, --text-muted
│  senior backend         │
│  background.            │
│                         │
│  ──────                 │  <- divider --border, --sp-6 margin
│                         │
│  ABOUT      ·           │  <- Roboto Mono, uppercase, --fs-xs
│  WRITING    ·           │     --text-muted inativo
│  WORK       ·           │     --text-strong + accent dot ativo
│  LABS       ·           │
│  HIRE ME    ·           │
│                         │
│                         │
│                         │
│  gh · in · x · ✉        │  <- footer, redes, Roboto Mono --fs-xs
│                         │  <- padding-bottom --sp-12
└─────────────────────────┘
```

**Scroll behavior:** item ativo na sidebar reflete seção visível na página (IntersectionObserver). Transição de 300ms ease pro highlight.

## Componentes-núcleo

### 1. Hero (Home only)
```
┌───────────────────────────────────────────┐
│                                           │
│  AI engineer with                         │  <- H1, Instrument Serif --fs-3xl
│  senior backend background.               │     --text-strong, --lh 1.1
│                                           │
│  I ship LLM-integrated systems with the   │  <- Lead, Inter --fs-md, --text-muted
│  discipline of production backend.        │
│  Formalizing AWS. Open to remote US/EU.   │
│                                           │
│  [ Open to Work → ]  Read my writing      │  <- CTA primário (bg --accent, color
│                                           │     --bg), secundário (ghost, --text)
└───────────────────────────────────────────┘
```

**Decisão explícita:** headline em serif, mas tom sóbrio (Arpit-vibe), não editorial lúdico. CTA primário em amarelo (destaque Von Restorff), CTA secundário ghost.

### 2. Timeline Item (Experience, Education)
```
2023 –      Backend Software Engineer
Present     Premiersoft, allocated to Philips (Blumenau, BR, remote)

            Shipping production medical systems with multi-year
            uptime SLAs. Driving Java 17 + Spring Boot + Oracle
            PL/SQL + hexagonal architecture across the stack.

            [Java 17] [Spring Boot] [Oracle] [Hexagonal]
```

Date em `Roboto Mono --fs-sm --text-muted`, role em `Inter --fs-md --text-strong`, descrição em `Inter --fs-base --text`, chips em `Roboto Mono --fs-xs` com border.

### 3. Project Card (Work)
```
┌─────────────────────────────────────────┐
│  TradingImpossível                   ↗  │  <- hover: border --accent, lift 2px
│                                      ⌘  │     ↗ external link icon, ⌘ github
│  AI-assisted paper-trading platform.    │
│  Java 21 + Spring Boot + Next.js.       │
│                                         │
│  [Java 21] [Spring Boot] [Next.js] [+2] │
└─────────────────────────────────────────┘
```

Grid 2 colunas desktop, 1 coluna mobile. Hover: `--border-strong`, `translateY(-2px)`, 150ms ease.

### 4. Writing List Item
```
Oct 08, 2026  en   Why I'm formalizing AWS now
              ─────────────────────────────────
              Short reasoning behind the move toward AWS SAA, framed
              as formalization — not learning.
```

Data em `Roboto Mono --fs-xs --text-muted`, lang chip em `Roboto Mono --fs-xs` com bg `--accent-dim`, título em `Inter --fs-md --text-strong`, descrição em `Inter --fs-sm --text-muted`.

### 5. Lab Card
```
┌─────────────────────────────────────────┐
│  [LIVE]  Lab 01 — Semantic Search    ↗  │
│                                         │
│  Try: "spring and oracle" — top-K RAG   │
│  retrieval over this portfolio.         │
│                                         │
│  [Spring Boot] [pgvector] [Gemini]      │
└─────────────────────────────────────────┘
```

Status badge: `LIVE` em `--success` background, `WIP` em `--accent` background. Monospace tudo.

### 6. Chip de Stack
```
[ Java 17 ]
```

`Roboto Mono --fs-xs`, padding `--sp-2 --sp-3`, border `1px solid --border`, border-radius 2px, letter-spacing +0.05em. Hover: border `--accent`, color `--accent`.

### 7. CTA "Open to Work" (Nav/Sidebar persistente)
```
[ ● Open to Work ]
```

Ponto `--success` piscando a cada 2s, texto `Roboto Mono --fs-xs` uppercase, border `--success`, hover bg `--success` + text `--bg`. Link pra `/hire-me`.

### 8. Chat UI (Lab RAG v2, futuro)
```
[User]
What's Omar's main backend stack?
                                                [12:34]
──────────────────────────────────────────────────────────
[Omar's assistant]
Omar's main backend stack is Java 17 with Spring Boot 3,
hexagonal architecture, and Oracle PL/SQL / PostgreSQL for
persistence. Build system is Maven 3.5.3.

Sources:
  ↗ /perfil#stack
  ↗ /work/trading-impossivel
  ↗ /writing/formalizing-aws

                                                [12:34 · 234ms · 180 tokens]
──────────────────────────────────────────────────────────
```

Streaming via SSE, cursor `|` piscando no final enquanto gera. Source cards abaixo, clicáveis.

## Interações / motion

- **Scroll-triggered:** section highlight na sidebar (300ms ease). Reveal fade-up subtle em cards quando entram no viewport (400ms, só na primeira vez — `prefers-reduced-motion` respeitado).
- **Hover:** 150ms ease. Border color shift + translateY(-2px) em cards. Color shift em links.
- **Click:** feedback instantâneo. Zero `transition: all` em botões.
- **Focus:** ring 2px `--accent`, outline-offset 2px.
- **Cursor pisca:** `|` no wordmark, 1.2s cycle. Único elemento com animação contínua. **Nunca** adicionar outro.
- **Reduced motion:** `@media (prefers-reduced-motion: reduce)` zera scroll reveal + cursor pisca + lift em hover.

## Acessibilidade

- Contrast ratio AAA pra text em bg: `#ccd6f6` em `#0a192f` = 10.4:1 ✓
- Contrast AA+ pra accent em bg: `#e2b714` em `#0a192f` = 7.9:1 ✓
- Todos os CTAs com `aria-label` descritivo.
- Nav sidebar com `aria-current="true"` na section ativa.
- Chat (v2) com `aria-live="polite"` pros tokens streaming.
- Skip link "Skip to main content" no topo (hidden visualmente, focável).

## O que fica fora (anti-escopo visual)

Isso aqui é **lista taboo**. Qualquer task que incluir um desses está fora de scope:
- Spider-Verse: halftone backgrounds, glitch RGB, mascote, onomatopeias, spray marks.
- Scroll parallax de qualquer tipo.
- Charts inventados sobre skills% ou proficiency bars.
- Dark pattern: "AI chatbot" se apresentando como o próprio Omar (sempre "Omar's assistant", nunca "Omar").
- Gradient mesh backgrounds.
- Glassmorphism (frosted glass cards).
- Loading spinners vazios em qualquer lugar — sempre skeleton + context.
