# omar-cama-portfolio

Portfólio pessoal do Omar Cama como plataforma de conteúdo — "AI-fluent backend engineer".

## Stack

Next.js 15 (App Router), React 18, TypeScript, SCSS modules, MDX via `next-mdx-remote`, `lucide-react` para ícones, fonts via `next/font/google`.

## Rodando

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de produção
npm start        # rodar produção
npm run lint     # eslint next/core-web-vitals
```

## Estrutura

```
CONTEXT.md              # glossário do domínio (Post, Deep Dive, Writing, Work, ...)
MEMORY.md               # (só na máquina local: ~/.claude/…/memory/)
content/
  writing/*.mdx         # Posts, Notes, Deep Dives
  work/*.mdx            # Project Write-ups
docs/
  adr/                  # decisões arquiteturais registradas
  design/               # visual-direction.md + section-architecture.md
research/               # análises que embasaram o design
src/
  app/                  # App Router: /, /writing, /work, /llms.txt, /rss.xml, /sitemap.xml
  components/           # Nav, Footer, Hero, PostList, Prose, etc.
  lib/                  # content.ts (leitor MDX)
  middleware.ts         # reescreve /writing/<slug>.md pro handler raw
```

## Publicando um Post

1. Cria `content/writing/meu-slug.mdx` com frontmatter:
   ```yaml
   ---
   title: Título do post
   type: post           # post | note | deep-dive
   publishedAt: 2026-09-15
   lang: pt-BR
   description: Uma linha ou duas explicando o post.
   tags: [ai, backend]
   ---
   ```
2. Escreve o corpo em MDX abaixo do frontmatter.
3. `npm run build` — o post aparece no feed `/writing` e no RSS automaticamente.

## Superfícies para agents

Cada Post tem `.md` twin. `GET /writing/meu-slug.md` devolve o MDX cru com `Content-Type: text/markdown`. Também: `/llms.txt` (discovery), `/sitemap.xml`, `/rss.xml`.

## Direção de design

Ler `docs/design/visual-direction.md` antes de qualquer PR de UI. Ler `CONTEXT.md` antes de escrever copy.
