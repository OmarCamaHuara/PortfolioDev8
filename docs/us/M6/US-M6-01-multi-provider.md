# US-M6-01 — Camada multi-provider (Spring AI) + decisão do provider default

**Milestone:** M6 — IA integrada
**Status:** ⬜ não iniciada
**Estimativa:** 3h
**Dependências:** US-M3-04

## Contexto / Motivação

D-005: o provedor de LLM é trocável via config. Esta US cria o port `LlmPort`, o adapter Spring AI e o provider `mock` — e fecha com o Omar a decisão do provider default + orçamento mensal ([ai-integration.md](../../01-architecture/ai-integration.md)).

## Escopo

**Inclui:**
- `application/port/out/LlmPort` (chat com system prompt + histórico + options: maxTokens, temperature).
- `adapters/out/llm/SpringAiLlmAdapter` usando `ChatClient` do Spring AI; seleção por `LLM_PROVIDER` (anthropic | openai | gemini | mock) e envs de chave/modelo.
- Provider `mock` determinístico (respostas canned por padrão de pergunta) para testes/dev sem chave.
- Log estruturado por chamada: provider, modelo, tokens in/out, latência.
- **Decisão com o Omar**: provider/modelo default e teto de gasto mensal → registrar em DECISIONS.md.
- Endpoint interno de sanity (`/api/admin/ai/ping`, JWT) que faz uma chamada mínima.

**NÃO inclui:**
- Chat público (US-M6-02); rate limiting (US-M6-04).

## Critérios de aceite

- [ ] Trocar `LLM_PROVIDER=mock → anthropic/openai/gemini` muda o comportamento sem recompilar código de domínio.
- [ ] `mock` cobre os testes; `./mvnw verify` verde sem nenhuma chave configurada.
- [ ] Decisão de provider default + orçamento registrada em DECISIONS.md.

## Passos de implementação assistida por IA

1. Consultar a doc atual do Spring AI para as versões dos starters (usar a doc oficial, não memória).
2. Implementar port, adapter e mock; config por perfil/env.
3. Logging estruturado (MDC ou logger dedicado `ai-usage`).
4. `ai/ping` admin + teste de integração com mock.
5. Sessão de decisão com o Omar (tabela de custos dos candidatos) → DECISIONS.md.

## Arquivos afetados

- `backend/**/application/port/out/LlmPort.java`, `**/adapters/out/llm/**` — criar
- `backend/src/main/resources/application*.yml`, `backend/README.md` — modificar
- `docs/DECISIONS.md` — nova decisão

## Plano de verificação

- [ ] `./mvnw verify` verde (sem chaves).
- [ ] Com uma chave real em env: `ai/ping` responde; log de uso registrado.

## Definition of Done

- [ ] Critérios de aceite ✔ · Verificação ✔ · DoD global ✔ · Status atualizado · Commit `US-M6-01: ...` + push

## Notas de execução

<preencher na sessão>
