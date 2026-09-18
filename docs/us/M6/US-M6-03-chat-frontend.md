# US-M6-03 — Chat real no frontend (substitui o mockup)

**Milestone:** M6 — IA integrada
**Status:** ⬜ não iniciada
**Estimativa:** 3h
**Dependências:** US-M6-02

## Contexto / Motivação

O `components/chatBot/ChatBot.jsx` atual é um mockup com mensagens hardcoded e input desligado. Vira um chat de verdade — a porta de entrada conversacional do CV (D-006) — com balões de HQ e sugestões de pergunta.

## Escopo

**Inclui:**
- Reescrever o ChatBot: estado de conversa (sessionId em `sessionStorage`), envio para `POST /api/chat`, render com `SpeechBubble`, `DimensionLoader` enquanto responde, `ComicError` com retry em falha.
- Chips de sugestão (traduzidos): "Qual a experiência dele?", "Stack principal?", "Já trabalhou com IA?", "Como contato?".
- Mensagem de boas-vindas local (sem custo de API) apresentando o bot.
- Auto-scroll do histórico, input acessível (label, Enter envia, foco gerenciado).
- Backend indisponível → estado "modo sem IA" (integração fina na US-M6-04).

**NÃO inclui:**
- Streaming token a token (backlog); persistir histórico entre visitas.

## Critérios de aceite

- [ ] Conversa completa funciona (pergunta → loader → resposta) nos 3 idiomas de pergunta.
- [ ] Chips disparam a pergunta correspondente.
- [ ] Falha de rede → ComicError com retry funcional; nada de console error não tratado.
- [ ] Acessível: leitor de tela anuncia novas mensagens (`aria-live=polite`).

## Passos de implementação assistida por IA

1. Mapear o mockup atual (estrutura/estilos aproveitáveis) e reescrever com estado real.
2. Client `frontend/lib/chatApi.js` (timeout maior: 15s — LLM demora).
3. UI: balões, chips, loader, erro; `aria-live` no histórico.
4. Testar matriz: sucesso, timeout (throttle), backend off, reduced-motion.

## Arquivos afetados

- `frontend/components/chatBot/**` — reescrever
- `frontend/lib/chatApi.js` — criar
- `frontend/public/locales/**/common.json` — chips/textos

## Plano de verificação

- [ ] Conversa real end-to-end com backend local + provider (ou mock) — screenshot nas Notas.
- [ ] Matriz de falhas testada; `npm run build` OK.

## Definition of Done

- [ ] Critérios de aceite ✔ · Verificação ✔ · DoD global ✔ · Status atualizado · Commit `US-M6-03: ...` + push

## Notas de execução

<preencher na sessão>
