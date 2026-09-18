# US-M7-04 — Domínio + analytics

**Milestone:** M7 — Deploy e lançamento
**Status:** ⬜ não iniciada
**Estimativa:** 2h
**Dependências:** US-M7-02, US-M7-03

## Contexto / Motivação

Um domínio próprio profissionaliza o link no LinkedIn/candidaturas, e analytics leve mostra ao Omar o que os recrutadores realmente fazem no site (quantos abrem o Modo Recrutador? quantos baixam o CV?).

## Escopo

**Inclui:**
- Escolher/registrar domínio com o Omar (ex.: `omarcama.dev` — decidir juntos) e apontar para o frontend; subdomínio `api.` para o backend; HTTPS em ambos.
- Atualizar `ALLOWED_ORIGINS`, `NEXT_PUBLIC_API_URL`, canonical/OG/sitemap para o domínio final.
- Analytics **privacy-friendly e gratuito** (proposta: Vercel Analytics ou Umami/Plausible self-host-lite — decidir na sessão) — sem banner de cookies se a ferramenta dispensar.
- Eventos custom: abertura do Modo Recrutador, download do CV, primeira mensagem no chat, pitch gerado, troca de idioma.

**NÃO inclui:**
- Dashboards elaborados; e-mail no domínio (backlog).

## Critérios de aceite

- [ ] Site e API servidos pelo domínio final com HTTPS; URLs antigas redirecionam.
- [ ] Eventos custom aparecendo na ferramenta de analytics.
- [ ] SEO atualizado (canonical/OG com o domínio; validadores re-checados).

## Passos de implementação assistida por IA

1. Decisão de domínio + ferramenta de analytics com o Omar (registrar em DECISIONS.md).
2. DNS + certificados nos hosts; atualizar envs e redeployar.
3. Instrumentar os 5 eventos custom.
4. Re-validar OG/JSON-LD com o domínio final.

## Arquivos afetados

- `frontend/**` — instrumentação de eventos, SEO
- `docs/DECISIONS.md` — decisões de domínio/analytics
- Config DNS/host (fora do repo)

## Plano de verificação

- [ ] Navegação completa no domínio final; eventos registrados; validadores OG OK.
- [ ] `npm run build` OK.

## Definition of Done

- [ ] Critérios de aceite ✔ · Verificação ✔ · DoD global ✔ · Status atualizado · Commit `US-M7-04: ...` + push

## Notas de execução

<preencher na sessão>
