# US-M6-02 — `POST /api/chat` com contexto do CV

**Milestone:** M6 — IA integrada
**Status:** ⬜ não iniciada
**Estimativa:** 3h
**Dependências:** US-M6-01

## Contexto / Motivação

O cérebro do chatbot: endpoint que monta o contexto com o CV estruturado do banco, chama o LLM e responde no idioma da pergunta — com fidelidade total à fonte ([ai-integration.md](../../01-architecture/ai-integration.md), frente 1).

## Escopo

**Inclui:**
- Migração Flyway: tabelas `chat_session` / `chat_message`.
- `ChatUseCase`: valida input (tamanho ≤1000 chars, strip HTML) → carrega/cria sessão → monta system prompt (template `prompts/chat-system.st` + CV serializado do banco) → últimas ~10 mensagens de histórico → `LlmPort` → persiste e responde.
- Regras do system prompt (versionado): responder no idioma da pergunta; só afirmar o que está no contexto; fora de escopo → redirecionar simpático ao contato; tom Spider-Verse leve; 2–5 frases.
- `POST /api/chat` `{sessionId?, message}` → `{sessionId, reply}`; erros Problem Details; Swagger grupo AI.
- Testes com mock: idioma, recusa fora de escopo, sessão persistida.

**NÃO inclui:**
- UI (US-M6-03); rate limit/teto (US-M6-04); streaming de resposta (backlog).

## Critérios de aceite

- [ ] Pergunta em EN → resposta em EN; em ES → ES (testado com provider real ao menos 1x, e regras no prompt).
- [ ] "Ele tem experiência com HL7?" → resposta cita a Philips corretamente (dados do banco).
- [ ] Pergunta fora de escopo ("receita de bolo") → recusa educada com redirecionamento.
- [ ] Input >1000 chars → 400.

## Passos de implementação assistida por IA

1. Migração + entidades/repos de chat (padrão das US-M3-02).
2. Serializador do CV → texto compacto para o prompt (uma função testável; cuidar do tamanho: ~2k tokens máx).
3. Template do system prompt em `resources/prompts/` com as regras acima.
4. Caso de uso + controller + testes com mock.
5. Teste manual com provider real (1 pergunta por idioma) — registrar respostas nas Notas.

## Arquivos afetados

- `backend/src/main/resources/db/migration/V3__chat.sql`, `resources/prompts/chat-system.st` — criar
- `backend/**` — caso de uso, controller, testes

## Plano de verificação

- [ ] `./mvnw verify` verde (mock).
- [ ] curl com provider real: 3 perguntas (PT/EN/ES) + 1 fora de escopo → comportamentos corretos.

## Definition of Done

- [ ] Critérios de aceite ✔ · Verificação ✔ · DoD global ✔ · Status atualizado · Commit `US-M6-02: ...` + push

## Notas de execução

<preencher na sessão>
