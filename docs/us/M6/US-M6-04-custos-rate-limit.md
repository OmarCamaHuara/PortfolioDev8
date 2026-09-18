# US-M6-04 — Rate limit, teto de custo e modo sem IA

**Milestone:** M6 — IA integrada
**Status:** ⬜ não iniciada
**Estimativa:** 2h
**Dependências:** US-M6-02

## Contexto / Motivação

CONSTITUTION §8: IA com teto de custo, sem exceções. O chat é público — sem proteção, um bot pode drenar a cota em minutos. Ver limites em [ai-integration.md](../../01-architecture/ai-integration.md).

## Escopo

**Inclui:**
- Rate limit por IP (Bucket4j): chat 10 msg/5min; (pitch usará 3/h na US-M6-05) → 429 Problem Details com `Retry-After`.
- Teto global diário: contador de chamadas/tokens (tabela ou cache) vs `LLM_DAILY_CAP`; excedido → 503 `AI_UNAVAILABLE`.
- Registro de uso persistido (chamada, tokens in/out, provider) — base para o Omar acompanhar custo.
- Frontend: tratar 429 ("calma, aranha! espera um pouco") e 503 → **modo sem IA**: banner simpático no chat apontando Modo Recrutador + contato.
- Endpoint admin `GET /api/admin/ai/usage` (resumo diário simples).

**NÃO inclui:**
- Dashboard visual de custo (backlog); alertas por e-mail.

## Critérios de aceite

- [ ] 11ª mensagem em 5min → 429; UI mostra a mensagem certa e reabilita depois.
- [ ] `LLM_DAILY_CAP=2` em dev: 3ª chamada → 503; chat entra em modo sem IA; site permanece 100% navegável.
- [ ] Uso consultável via endpoint admin.

## Passos de implementação assistida por IA

1. Filtro Bucket4j nos endpoints de IA (chave IP, atenção a `X-Forwarded-For` atrás de proxy).
2. Contador diário persistente + verificação no caso de uso.
3. Tabela/entidade `ai_usage` + endpoint admin de resumo.
4. Frontend: estados 429/503 no chat com textos traduzidos.
5. Testes: estourar os dois limites com mock.

## Arquivos afetados

- `backend/**` — filtro, contador, migração `V4__ai_usage.sql`, endpoint admin, testes
- `frontend/components/chatBot/**`, `locales/**` — estados de limite

## Plano de verificação

- [ ] Scripts curl estourando rate limit e cap → 429/503 corretos.
- [ ] UI nos dois estados (screenshots nas Notas). `./mvnw verify` + `npm run build` verdes.

## Definition of Done

- [ ] Critérios de aceite ✔ · Verificação ✔ · DoD global ✔ · Status atualizado · Commit `US-M6-04: ...` + push

## Notas de execução

<preencher na sessão>
