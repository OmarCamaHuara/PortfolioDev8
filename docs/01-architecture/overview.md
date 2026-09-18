# Arquitetura — Visão Geral

## Estrutura do projeto

```
PortfolioDev8/
├── docs/           # governança: visão, arquitetura, processo, milestones, US
├── content/        # MDX de conteúdo (about, work, projects, writing, skills)
├── public/         # assets estáticos (imagens .webp/.avif, favicon)
├── src/
│   ├── app/        # App Router (rotas + Route Handlers em app/api/)
│   ├── components/ # componentes React
│   └── lib/        # utilitários (ai/, content/, i18n/)
└── package.json    # Next 15, React 19, TS, Tailwind, MDX
```

**Sem monorepo, sem backend separado.** Tudo Next.

## Diagrama de alto nível

```
                    ┌─────────────────────────────────────┐
                    │           VISITANTE                 │
                    │  (creator viewer / recrutador)      │
                    └───────────────┬─────────────────────┘
                                    │ HTTPS
                    ┌───────────────▼─────────────────────┐
                    │       NEXT.JS 15 (Vercel)           │
                    │                                     │
                    │  RSC + páginas estáticas de MDX     │
                    │  ├─ /, /writing, /work, /cv, ...    │
                    │  └─ Route Handlers (Edge):          │
                    │     ├─ /api/chat  ──┐               │
                    │     ├─ /api/pitch ──┤               │
                    │     └─ /api/contact (Node)          │
                    └─────────┬───────┬───┴─┬─────────────┘
                              │       │     │
                    ┌─────────▼─┐   ┌─▼──┐  │
                    │ Upstash   │   │ AI │  │
                    │ Redis     │   │ SDK│  │
                    │ (rate-    │   │ →  │  │
                    │  limit +  │   │ Ant│  │
                    │  cache +  │   │ hro│  │
                    │  chat     │   │ pic│  │
                    │  sessão)  │   └────┘  │
                    └───────────┘           │
                                     ┌──────▼─────┐
                                     │  Resend    │
                                     │  (email do │
                                     │  contato)  │
                                     └────────────┘
```

## Fluxos principais

1. **Visitante lê o site** → Next serve páginas RSC estáticas de MDX. Sem chamada externa.
2. **Visitante conversa com o chatbot** → `POST /api/chat` (Edge) → carrega MDX contexto → rate-limit Redis → chama Anthropic via AI SDK → streaming de volta.
3. **Recrutador cola vaga** → `POST /api/pitch` → gera pitch → **email para Omar aprovar antes de qualquer uso público**.
4. **Visitante manda mensagem no /contact** → `POST /api/contact` (Node) → Resend → email para o Omar.

## Princípios arquiteturais

- **Content-as-code.** Fonte única = MDX versionado. Zero CMS/banco.
- **Serverless first.** Todo dinâmico vive em Route Handler. Zero servidor sempre-ligado.
- **Nenhuma chamada de IA a partir do browser.** Chaves vivem em envs Vercel.
- **Agent-friendly.** Rotas `.md` twin, llms.txt, sitemap, RSS já existem e são mantidos.
- **Fallback gracioso.** IA indisponível → UI clara + link direto pro Omar. Chat quebrado nunca quebra o site.

## Documentos detalhados

- [frontend.md](frontend.md) — App Router, rotas, i18n, convenções
- [ai-integration.md](ai-integration.md) — Edge Function, guardrails, custo
- [design-system.md](design-system.md) — neo-brutalist híbrido
