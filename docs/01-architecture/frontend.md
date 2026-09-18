# Arquitetura — Frontend

## Stack

- **Next.js 15 (App Router)** — herdada da v2 monkeytype já em `main`.
- **React 19**, **TypeScript**, **Tailwind CSS** (ou CSS Modules — decidir na US-M1-01), **Framer Motion** apenas onde há estado de animação.
- **Content pipeline:** MDX + `gray-matter` + `reading-time` (já instalados).
- **Sem monorepo.** Estrutura Next padrão na raiz. Não há `frontend/` separado.

## Rotas alvo (App Router)

| Rota | Conteúdo | Audiência |
|---|---|---|
| `/` | Home creator-first: hero com posicionamento, últimos vídeos/posts, CTA de seguir | Visitante do canal |
| `/writing` | Índice de posts MDX (já existe) | Ambas |
| `/writing/[slug]` | Post individual | Ambas |
| `/work` | Projetos + experiências profissionais | Dev-for-hire |
| `/work/[slug]` | Case detalhado (opcional por projeto) | Dev-for-hire |
| `/cv` | CV navegável — versão web do currículo | Recrutador |
| `/contact` | Formulário + links diretos | Ambas |
| `/api/chat` | Route Handler (Edge) — chatbot | — |
| `/api/pitch` | Route Handler (Edge) — pitch por vaga | — |
| `/api/contact` | Route Handler (Node) — envia email substituindo EmailJS | — |
| `/llms.txt`, `/sitemap.xml`, `/rss.xml`, `.md` twins | Agent-first surfaces (já existem) | LLMs / crawlers |

## Conteúdo (content-as-code)

```
content/
├── about.mdx                    # bio curta usada em vários lugares + contexto do chat
├── skills.mdx                   # skills por categoria
├── work/
│   ├── premiersoft-philips.mdx  # experiência atual
│   ├── philips-oncologia.mdx    # experiência anterior
│   └── ...
├── projects/
│   ├── portfoliodev8.mdx
│   ├── hiraipro.mdx
│   └── ...
└── writing/
    └── *.mdx                    # posts (já existente)
```

Toda mudança de conteúdo é PR ou commit. Sem CMS. Sem banco.

## i18n

- Estratégia: sub-rotas de locale App Router (`/`, `/en`, `/es`) usando `next-intl` OU sub-diretórios de MDX (`content/pt/`, `content/en/`, `content/es/`) — decidir na US dedicada.
- Textos de UI (labels de navegação, CTAs) em arquivos de tradução centralizados.
- Conteúdo MDX traduzido manualmente (ou via IA no admin com revisão do Omar).
- O chatbot **não** usa o seletor: detecta idioma da pergunta e responde no mesmo (regra do prompt de sistema).

## Convenções

- **App Router puro.** Nada de Pages Router.
- Componente = pasta com `Component.tsx` + `component.module.css` (ou `.tsx` inline com Tailwind, decidir uniformemente).
- Estilos consomem tokens do [design-system.md](design-system.md) — nunca hex solto.
- Framer Motion apenas em componentes com animação real. Sempre condicionado a `prefers-reduced-motion`.
- Imagens `.webp`/`.avif` via `next/image`, com `alt` descritivo.

## Contato (fim do EmailJS)

Formulário `/contact` envia para `POST /api/contact` (Route Handler Node runtime) que usa Resend/Postmark/similar. Chave da API vive em env `EMAIL_SEND_KEY`, nunca no cliente. Ver US-M2-EM (EmailJS→backend, bloqueante do lançamento).

## Performance

- Meta Core Web Vitals 2026: LCP < 2.5s, INP < 200ms, CLS < 0.1.
- `next/font` para as duas fontes principais (mono base + comic accent com `font-display: optional`).
- `next/image` sempre.
- Zero third-party script sem justificativa (nada de widgets pesados).
- Bundle: monitorar via `@next/bundle-analyzer` no CI.
