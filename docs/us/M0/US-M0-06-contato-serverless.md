# US-M0-06 — Contato via Route Handler (fim do EmailJS)

**Milestone:** M0 — Higiene + infra dev
**Status:** ⬜ não iniciada
**Estimativa:** 2h
**Dependências:** US-M0-01

## Contexto / Motivação

O componente antigo `Contact` usava `@emailjs/browser` com **chaves da API expostas no bundle do cliente**. Isso viola `CONSTITUTION §9` (segredos nunca no repositório/cliente) e é uma dívida herdada da migração Vite→Next que precisa morrer antes do lançamento. Solução: enviar via Route Handler Node do próprio Next, usando um provedor de email transacional (Resend ou Postmark) com a chave em env do Vercel.

## Escopo

**Inclui:**
- Route Handler `src/app/api/contact/route.ts` (runtime Node) que recebe `{ name, email, message }`, valida com Zod, envia email via Resend (ou Postmark) usando `RESEND_API_KEY` da env.
- Rate-limit simples por IP (Upstash Redis: 3 envios / hora / IP).
- Honeypot field + rejeição de mensagens > 5000 chars.
- Componente `<ContactForm />` em `src/components/Contact/` consumindo o endpoint com estados Loading / Error / Empty / Success (ver skill `frontend-loading-states`).
- Remover `@emailjs/browser` do `package.json` e do bundle.

**NÃO inclui (explícito):**
- CAPTCHA visual — deixar como upgrade se o honeypot furar.
- Templates de email HTML sofisticados — texto simples serve.
- Rota `/contact` completa com hero e conteúdo — só o formulário. Rota completa é US-M2.

## Critérios de aceite

- [ ] Envio pelo form chega no email do Omar em ≤ 30s.
- [ ] `grep -r emailjs` no repo retorna vazio; `package.json` não tem `@emailjs/browser`.
- [ ] Chave da API do email NÃO aparece no bundle do cliente (`grep -r "re_" .next/static` deve dar vazio).
- [ ] 4º envio em uma hora do mesmo IP retorna 429 com mensagem clara.
- [ ] Form mostra loading, erro (network / 429 / 500) e sucesso distinguíveis.
- [ ] Mensagem > 5000 chars ou honeypot preenchido = 400 silencioso.

## Passos de implementação

1. `npm i resend @upstash/ratelimit @upstash/redis zod && npm rm @emailjs/browser`.
2. Configurar conta Resend + domínio verificado; criar `RESEND_API_KEY`, `RESEND_FROM`, `CONTACT_TO`, `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` em Vercel (ou `.env.local` em dev — nunca commitado).
3. Criar `src/lib/ratelimit.ts` (client Upstash + factory `getContactLimiter`).
4. Criar `src/app/api/contact/route.ts` (Node runtime): validação Zod → honeypot → rate-limit → Resend → resposta.
5. Criar `src/components/Contact/ContactForm.tsx` com os 4 estados.
6. Remover código EmailJS antigo (buscar por `emailjs` no repo).
7. Testar localmente com Resend em modo sandbox (endereço `onboarding@resend.dev`).

## Arquivos afetados

- `src/app/api/contact/route.ts` — criar
- `src/lib/ratelimit.ts` — criar
- `src/components/Contact/ContactForm.tsx` — criar
- `src/components/Contact/contact-form.module.css` (ou Tailwind) — criar
- `package.json`, `package-lock.json` — modificar
- Arquivos antigos com `@emailjs/browser` — remover

## Plano de verificação

- [ ] Envio real de mensagem → email chega.
- [ ] `grep -r emailjs` vazio.
- [ ] 4 envios em ≤ 1h do mesmo IP → 4º retorna 429.
- [ ] Preencher honeypot → 400 silencioso (não envia email).
- [ ] Message > 5000 chars → 400.
- [ ] Simular offline no DevTools → estado "Offline" aparece.

## Definition of Done

- [ ] Critérios ✔ · Verificação ✔ · DoD global (AGENTS.md) ✔ · Status atualizado · Commit `US-M0-06: ...` + push

## Notas de execução

<preencher na sessão>
