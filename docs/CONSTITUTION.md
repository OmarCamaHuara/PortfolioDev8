# CONSTITUTION — Princípios Inegociáveis

> Regras que nunca são quebradas neste projeto.
> Toda sessão (humana ou assistida por IA) começa lendo este arquivo + `AGENTS.md`.
> Mudanças aqui exigem discussão explícita com o Omar e commit dedicado.

## 1. Dual-track: creator primeiro, dev-for-hire em paralelo

O portfolio serve **duas audiências ao mesmo tempo**, com pesos diferentes:

- **Creator/influencer YouTube** (peso principal) — visitante entende em segundos a personalidade, o tom de voz e o tipo de conteúdo que o Omar cria.
- **Dev-for-hire** (peso secundário) — recrutador/parceiro que quer contratar encontra evidência técnica em uma rota `/work` dedicada e um `/cv` acessível no footer.

Toda feature é avaliada por essa régua: *"isso ajuda uma das duas audiências e não atrapalha a outra?"*

## 2. Estética híbrida: monkeytype + acentos comic-book cirúrgicos

A base visual é a v2 monkeytype já em `main` (mono-color, tipografia mono, layout enxuto, alta legibilidade). Acentos comic-book/graffiti (glitch RGB, halftone como HUD, onomatopeias, hard shadows) entram **1–2 por tela no máximo**, em hero/CTAs/transições — nunca como paleta de fundo dominante. A linguagem tem nome: **neo-brutalism**.

## 3. Uma fonte de verdade para o conteúdo

O conteúdo do portfolio vive em MDX/YAML no repositório (`content/`). Não há CMS, não há banco. Quando o conteúdo muda, muda no MDX — versionado, revisável em PR.

## 4. Desenvolvimento incremental por US

Nenhuma sessão implementa mais de **uma User Story por vez**. Toda US segue [`02-process/us-template.md`](02-process/us-template.md) e só é DONE quando cumpre sua *Definition of Done*. US grandes são divididas (~1–3h cada).

## 5. Zero código fora de US

Mudanças de código só acontecem dentro de uma US ativa. Refatoração oportunista fora do escopo vai para o backlog, não para o commit.

## 6. Stack fixa: Next-only + serverless

Frontend Next.js 15 App Router. Conteúdo em MDX/YAML. Funcionalidades dinâmicas (chatbot, envio de formulário, geração de pitch) rodam como **Route Handlers/Edge Functions** no próprio Next — não há backend separado. Se aparecer necessidade de "vitrine backend técnica", vai como **repositório separado**, referenciado como case.

## 7. Acessibilidade não é polimento

Todo efeito visual respeita `prefers-reduced-motion`. Contraste AA em todo texto. Foco visível em todo interativo. `alt` descritivo em imagens informativas, `alt=""` + `aria-hidden` nos decorativos. Testes automáticos com axe rodam em CI.

## 8. IA com teto de custo e guardrails

Toda chamada a LLM passa por Route Handler serverless com: rate-limit por IP (Upstash Redis), teto diário de gasto, cache por hash de input, provider `mock` para dev, injection guardrails (allow-list de tópicos + system prompt versionado), disclaimer visível "gerado por IA sobre o perfil do Omar". Sem chaves no cliente, sem chamada direta do browser aos provedores.

## 9. Segredos nunca no repositório

API keys, tokens e webhooks vivem em variáveis de ambiente do host (Vercel). `.env*` no `.gitignore`. Chaves hardcoded existentes (EmailJS) são **dívida com prazo**, não padrão a manter — migração para Edge Function é uma US bloqueante do M2 (ver ROADMAP).

## 10. Documentação viva

Toda decisão relevante que gera trade-off registrada como ADR nova em `DECISIONS.md` (uma por vez, com data real, quando a decisão foi tomada — nunca em bloco). Docs desatualizados são bugs.
