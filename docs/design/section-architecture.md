# Section Architecture

Mapa estrutural do portfolio pós-redesign. Define **quais páginas existem**, **quais seções cada página tem**, **em que ordem**, e **por quê**. Complementa `visual-direction.md` (sistema visual) e `CONTEXT.md` (vocabulário do domínio).

Referência estrutural: `research/aihero-analysis.md`. Estratégia: ADR 0001 e ADR 0002.

---

## 1. Site map

```
/                       → Home
/writing                → Writing feed (Posts + Notes + Deep Dives)
/writing/[slug]         → Individual Post / Note / Deep Dive
/work                   → Work feed (Project Write-ups curados)
/work/[slug]            → Individual Project Write-up
/contact                → (deferido — provavelmente vira só bloco no footer, ver §6)
/subscribe              → (opcional v2 — landing pro form de newsletter)
/rss.xml                → Feed RSS de Writing (+ Work)
/llms.txt               → Discovery para agents (ver §7)
/writing/[slug].md      → .md twin de cada Post (ver §7)
/work/[slug].md         → .md twin de cada Project Write-up (ver §7)
```

**Explicitamente ausente:**

- `/about` — o Omar se revela pelo conteúdo, não por uma página. Modelo aihero.dev.
- `/projects` — substituído por `/work` (vocabulário do CONTEXT.md).
- `/blog` — substituído por `/writing`.
- `/experience`, `/cv`, `/resume` — o portfolio não é currículo (ADR 0001).
- `/skills-page` — a tech stack aparece dentro dos Deep Dives/Work, não como página standalone.

---

## 2. Home

Página mais crítica. Deve, em ~2 scrolls, deixar claro: (a) quem é o Omar e o que ele faz; (b) que ele publica; (c) como pegar o próximo Post.

### Seções, na ordem

1. **Navigation** (sticky top, fina)
2. **Hero** — H1 positioning + parágrafo curto + 1 CTA (ver §Hero shape em `visual-direction.md#10`, decisão pendente)
3. **Latest Writing** — 3-5 items mais recentes do Writing feed. Empty state se 0 Posts.
4. **Selected Work** — 2-3 Project Write-ups selecionados manualmente. Empty state se 0.
5. **Now** — bloco curto com o que o Omar está pensando/estudando/construindo agora (atualizável). Substituto do "About" e da "Bio" que aihero.dev também evita.
6. **Subscribe** — 1 linha + email input. Baixo compromisso. Opt-in soft.
7. **Footer**

### Anti-composição

Cada seção da home é **um bloco de valor autocontido seguido de link para o feed cheio**, não uma "chamada" pra rolar mais. Segue o padrão aihero.dev de valor-por-rolagem. O leitor não deve sentir que precisa "chegar em algum lugar" — a home *é* o lugar.

### Trade-off consciente

Existe o risco de a home parecer "muito parecida com uma home de blog." Aceito. O gap entre "blog" e "authority platform" está no *conteúdo*, não na estrutura da home. Melhor uma home que se parece com blog do que uma que continua parecendo currículo.

---

## 3. `/writing`

Feed cronológico de tudo que o Omar publicou. Um Post é a menor unidade; o Deep Dive é um Post com um tag `deep-dive`; a Note é um Post com um tag `note`.

### Layout

- Header simples: título "Writing" (H1) + 1 parágrafo curto explicando o que mora aqui.
- Filtro por tipo: All / Posts / Deep Dives / Notes (chips inline, não dropdown). Se ≤ 5 items no feed inteiro, esconder o filtro.
- Lista editorial: cada item tem `[data]` `[tipo]` `[título]` `[dek de 1-2 linhas]` — hover: título vira `--accent`. Sem thumbnail.
- Paginação: 20 por página, "Older →" no rodapé.

### Empty state

Um parágrafo do Omar em primeira pessoa dizendo "o primeiro Post está no forno, tema: [X]. Se quiser saber quando sair, [subscribe]." Nunca "Coming Soon" plaquinha.

### Data model

Cada Post é MDX em `content/writing/*.mdx` com frontmatter:

```yaml
---
title: string
slug: string          # auto from filename se omitido
type: "post" | "note" | "deep-dive"
publishedAt: ISO8601
updatedAt?: ISO8601
lang: "pt-BR" | "en"
tags?: string[]
description?: string  # dek de 1-2 linhas
---
```

Se `type: "deep-dive"`, o layout do individual page inclui Table of Contents (§4).

---

## 4. `/writing/[slug]`

Página individual do Post. Layout único, adaptativo ao tipo via frontmatter.

### Estrutura

1. **Metabar** (top): data, tempo de leitura, tipo, lang toggle (se variant existir)
2. **Título** (H1, Instrument Serif)
3. **Dek** (parágrafo grande, `--fg-muted`)
4. **Autor line** (opcional): "Omar Cama · [link Twitter/GitHub/LinkedIn]"
5. **Table of Contents** (se `type: deep-dive` E ≥ 4 headings) — ver `visual-direction.md#14`
6. **Corpo** — MDX renderizado, max-width `68ch`
7. **Footnotes** (se houver) — seção `## Notes`
8. **Post navigation** — Prev / Next Post no rodapé
9. **Subscribe CTA** — o mesmo bloco da home, reutilizado
10. **Footer**

### Bilíngue

Se um Post existe em `pt-BR` e `en`, o toggle no metabar troca entre eles. URL: `/writing/[slug]?lang=en` ou `/en/writing/[slug]` (decisão de routing na task #4).

### Note vs Post vs Deep Dive — diferenças na página

- **Note**: sem TOC, sem dek grande (metabar → título → corpo direto), sem post navigation (Notes são datadas mas não sequenciais).
- **Post**: layout default.
- **Deep Dive**: TOC obrigatório se ≥ 4 H2, header estende pra `--fg` bold com "Deep Dive" prefix.

---

## 5. `/work` + `/work/[slug]`

Curadoria manual — não é dump de repos GitHub.

### `/work`

- Header: título "Work" (H1) + parágrafo do tipo "cada write-up abaixo cobre um projeto real: qual era o problema, o que decidi, o que trocaria hoje."
- Lista editorial: para cada Project Write-up, mostra `[ano]` `[cliente/contexto]` `[título]` `[dek]`. Sem thumbnail de screenshot — modelo aihero.dev, texto primeiro.
- Empty state: mesmo padrão do Writing empty state.

### `/work/[slug]`

Mesma estrutura de `/writing/[slug]` (é formalmente um Post categorizado), mas o corpo segue a espinha obrigatória:

1. **Problema** — o que estava quebrado ou faltando
2. **Decisão** — o que o Omar escolheu fazer
3. **Trade-off** — o que ele sacrificou nessa escolha
4. **Resultado** — o que aconteceu depois (números se possível)
5. **O que eu faria diferente hoje** — hindsight honesto

Isso não é template rígido de UI — é rubric de conteúdo. A UI só renderiza o MDX. Ver `CONTEXT.md` (Project Write-up).

---

## 6. Contact

**Não é uma página standalone.** É um bloco no footer:

- Email direto (`mailto:` — sem form intermediário)
- Link GitHub
- Link LinkedIn
- Link para RSS + `/subscribe`

Rationale: forms de contato viram noise (spam, bots). Email direto sinaliza acessibilidade. Se o volume de spam virar problema, adicionar `mailto:` com token ofuscado ou migrar pra form protegido — trata na task #4 se necessário.

---

## 7. Agent-first surfaces (baseado em `research/aihero-analysis.md#6`)

Custa quase nada e sinaliza fluência exata pro público-alvo (developers que usam agents).

- **`/llms.txt`** — arquivo estático explicando o site para agents. Template curto, gerado no build.
- **`/writing/[slug].md`** — `.md` twin de cada Post, servido raw. Route handler simples que lê o MDX source e devolve como text/markdown.
- **`/work/[slug].md`** — mesmo pra Project Write-ups.
- **`/sitemap.xml`** — obrigatório para SEO, já esperado.
- **`/rss.xml`** — feed RSS de Writing + Work.

Opcional v2 (não bloqueia lançamento): `/api/search?q=`, JSON discovery em `/api`.

---

## 8. Navigation

### Header

- Left: logo/wordmark (texto "Omar Cama" em Instrument Serif, tamanho pequeno)
- Right: `Writing` · `Work` · `Subscribe`
- Sticky top, background `--bg`, border-bottom hairline `--border`
- Height ~64px desktop, ~56px mobile
- Sem backdrop-blur (§9.9 rejeita)

### Footer

Duas colunas em desktop, uma em mobile:

- **Left column:** contact block (§6)
- **Right column:** `Writing` · `Work` · `RSS` · `llms.txt` (o `llms.txt` sinaliza pro leitor humano curioso)
- Bottom line: "© 2026 Omar Cama Huarahuara. Built with Next.js." — **rejeitado** por §9.10 (stack badge). Substituído por: nada, ou uma frase curta autoral (ex: "Escrevendo daqui.") sem selo de tech.

---

## 9. Componentes reutilizáveis

Base para task #4 (implementação). Deep modules — cada um esconde muita coisa por trás de interface pequena (`mattpocock-skills:codebase-design`).

- **`<PostList items={...} variant="compact" | "full" />`** — usada na home ("Latest Writing"), no `/writing`, e no `/work`.
- **`<PostMeta post={...} />`** — a metabar (data, tempo de leitura, tipo, lang toggle).
- **`<Prose>`** — wrapper que aplica os tokens tipográficos ao MDX renderizado. `max-width: 68ch`, todos os estilos de longform.
- **`<CodeBlock>`** — override do `<pre>` do MDX, aplica syntax highlighting warm (§7 do visual doc).
- **`<TableOfContents headings={...} />`** — sticky em ≥ 1024px, accordion no mobile.
- **`<SubscribeInline />`** — o CTA reutilizado na home e no fim de todo Post.
- **`<EmptyState kind="writing" | "work" />`** — deferred content states (§12 do visual doc).
- **`<Nav />`**, **`<Footer />`** — óbvio.

Design de componentes segue **deep modules**: interfaces pequenas, implementação escondida. Não expor tokens de estilo via props — usar tokens CSS globais (`var(--accent)` etc.). Isso mantém componentes intercambiáveis e o visual system centralizado.

---

## 10. Fluxo de conteúdo (day-1 → day-90)

**Dia 1** (lançamento, 0 Posts):
- Home tem Hero + empty state Latest Writing + empty state Selected Work + Now + Subscribe + Footer.
- `/writing` e `/work` mostram empty state elegante.
- `/llms.txt` + estrutura de `.md` twins prontos mas sem conteúdo.

**Dia 7-30** (primeiro conteúdo):
- Primeiro Post ou Note publicado → Home passa a mostrar Latest Writing populado.
- Site começa a fazer sentido como Authority Platform.

**Dia 30-90** (compõe):
- 3-5 Posts + 1-2 Project Write-ups.
- Home passa a valer múltiplas visitas por semana (por parte de subscribers).
- Métrica-alvo do trimestre: 3+ Posts e 1+ Project Write-up publicados (ADR 0001 estabelece que "output travado > 60 dias" dispara revisita da estratégia).

---

## 11. O que fica adiado para task #4

Design decisions cobertas neste doc. Decisões técnicas adiadas para implementação:

- Escolha de MDX runtime (`next-mdx-remote` vs `contentlayer` vs custom).
- Estratégia de i18n (App Router `[lang]` segments vs query param).
- Hosting de imagens (Cloudinary como aihero.dev, ou local em `/public`).
- Analytics (Plausible / Umami / nenhum).
- Deploy target (Vercel padrão, ou alternativa).

Estas viram ADR se envolverem lock-in significativo, ou ficam como decisões de execução no PR de implementação.

---

_Este doc + `visual-direction.md` fecham a task #3. O output é o contrato que a task #4 executa._
