# AGENTS.md — Ponto único de entrada para sessões de IA

> Leia este arquivo no início de TODA sessão (humana ou assistida por IA).
> É a fusão de `CONSTITUTION` (princípios) + contexto do projeto + convenções + DoD global.

## O que é este projeto

**PortfolioDev8** é o portfolio pessoal de **Omar Cama Huarahuara** (`ohmar_tai`), servindo **duas audiências ao mesmo tempo**:

1. **Creator/influencer YouTube** (audiência principal) — visitante que chega pelo canal encontra personalidade, tom de voz, posts recentes e formas de seguir.
2. **Dev-for-hire** (audiência secundária) — recrutador/parceiro encontra evidência técnica em `/work` e um `/cv` navegável.

**Stack fixa:** Next.js 15 App Router + MDX + Tailwind + Framer Motion + Route Handlers Edge (chat, pitch) + Route Handler Node (contato). Nenhum backend separado, nenhum banco.

**Estética:** neo-brutalist híbrido. Base monkeytype minimalista (mono, warm-black, alta legibilidade) + acentos comic-book cirúrgicos (glitch, halftone, hard-shadow) — 1–2 por tela no máximo.

## Estado atual do repositório

- Next.js 15 App Router na raiz. Content-as-code em `content/` (MDX).
- Rotas já em prod: `/`, `/writing`, `/writing/[slug]`, agent-first surfaces (`llms.txt`, `sitemap.xml`, `rss.xml`, `.md` twins).
- Rotas planejadas (M2): `/work`, `/work/[slug]`, `/cv`, `/contact`.
- Dívidas conhecidas: EmailJS com chave no cliente (US-M0-06 mata), CI ausente (US-M0-05 cria), a11y sem teste automático (US-M0-05).
- Sem PII pessoal (telefone, email pessoal, endereço) em nenhum arquivo do repo. Contato via linkedin + formulário.

## Como retomar o trabalho

1. Consulte [`docs/milestones/ROADMAP.md`](docs/milestones/ROADMAP.md) — qual milestone está ativo?
2. Abra o arquivo do milestone (`docs/milestones/M?.md`) — próxima US sem dependências pendentes.
3. Abra a US em `docs/us/M?/US-M?-??.md` e siga o roteiro.
4. Cumpra o *Plano de verificação* antes de commitar.
5. Atualize o status no milestone e no ROADMAP.

## Princípios inegociáveis (síntese)

Ver [`docs/CONSTITUTION.md`](docs/CONSTITUTION.md) para a versão completa.

1. **Dual-track: creator primeiro, dev-for-hire em paralelo.**
2. **Estética híbrida:** base monkeytype + acentos comic cirúrgicos.
3. **Uma fonte de verdade:** MDX/YAML em `content/`. Sem CMS, sem banco.
4. **Uma US por sessão.** Zero código fora de US ativa.
5. **Stack fixa:** Next-only + serverless. Zero backend separado.
6. **Acessibilidade não é polimento** — `prefers-reduced-motion`, AA, foco visível, axe em CI.
7. **IA com teto de custo e guardrails** — sem chaves no cliente, sem chamada direta do browser, sem output sem disclaimer.
8. **Segredos nunca no repo.** EmailJS é dívida com prazo.
9. **Documentação viva** — ADR só quando decidido de verdade, com data real.

## Convenções de código

- **Frontend:** Next 15 **App Router**. `src/app/` para rotas. `src/components/<Nome>/<Nome>.tsx`. Estilos via Tailwind ou CSS Modules (decidir uniformemente na US-M1-01).
- **TypeScript estrito.** Nenhum `any` sem justificativa em comment.
- **Estilos:** tokens do design system (variáveis CSS) — nunca hex solto.
- **Framer Motion** apenas em componentes com estado de animação. Não wrappar `motion.div` em elementos puros.
- **Route Handlers:** `src/app/api/*/route.ts`. Edge runtime para IA, Node runtime para email.
- **Content:** `content/**/*.mdx` — frontmatter validado com `gray-matter`.
- **Idioma do código:** inglês para identificadores; português para conteúdo/textos-fonte.

## Convenções de git

- Branch de trabalho por sessão.
- Commit em português, prefixado com o ID da US: `US-M2-01: MDX de experiências profissionais`.
- Um commit lógico por US. Nunca misturar US no mesmo commit.
- **Nunca commitar:** `.env*`, chaves de API, PDFs com PII, dumps de banco.

## Definition of Done global

Uma US só está DONE quando:

1. Todos os **critérios de aceite** da US passam.
2. **Plano de verificação** executado com sucesso (build, testes, checagem manual).
3. `npm run build`, `npm run lint`, `npm run typecheck` passam sem erros novos.
4. Se a US toca UI: **aberto no browser**, verificado no golden path + 1 edge case (sem JS, reduced-motion, mobile).
5. Nenhum efeito visual novo ignora `prefers-reduced-motion`. Contraste AA preservado.
6. Se a US toca IA: guardrails testados com input adversarial mínimo (injection tentativa, tópico fora do escopo).
7. Status atualizado em `docs/milestones/M?.md` e `docs/milestones/ROADMAP.md`.
8. Commit + push feitos com a convenção acima.

## Regras de IA (runtime)

- Toda chamada a LLM passa por Route Handler Edge. **Nunca do cliente.**
- Prompts de sistema versionados em `src/lib/ai/prompt.ts` (constante exportada, testável).
- Toda resposta de IA exibida ao público tem disclaimer visível.
- Pitch por vaga NÃO é exibido publicamente sem aprovação humana por email.
- Rate-limit + cache + teto diário obrigatórios.
- Guardrails de injection não-negociáveis: allow-list + sanitização + delimitadores + prompt sandwich.
- Provider `mock` é o default em dev e CI.

## Regras de acessibilidade + performance

- `prefers-reduced-motion` desliga glitch, halftone animado, parallax.
- Imagens `.webp`/`.avif` via `next/image`. `alt` descritivo em imagens informativas; `alt=""` + `aria-hidden` nos decorativos.
- Fontes: mono base + 1 acento comic com `font-display: optional`. Máximo 3 famílias em runtime.
- Meta: Core Web Vitals 2026 — LCP < 2.5s, INP < 200ms, CLS < 0.1.
- CI roda axe em cada PR (US-M0-05).

## Regras de conteúdo

- **Nunca inventar** cargos, datas, métricas ou skills. Se falta info: pergunta ao Omar antes.
- Textos novos nascem em PT e ganham EN/ES em US dedicada (ou via IA com revisão do Omar).
- Tom de voz: direto, com leve personalidade neo-brutalist. Sem gírias forçadas em EN/ES.
- **Sem PII pessoal em nenhum arquivo do repo.** Contato = linkedin público + formulário serverless.
