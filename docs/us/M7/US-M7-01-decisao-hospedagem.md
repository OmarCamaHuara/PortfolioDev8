# US-M7-01 — Decisão de hospedagem (comparativo free-tier vs Azure)

**Milestone:** M7 — Deploy e lançamento
**Status:** ⬜ não iniciada
**Estimativa:** 2h
**Dependências:** M5 completo

## Contexto / Motivação

D-009 adiou a escolha do host. Esta é uma **US de decisão**: comparar as opções com custos reais atuais e fechar com o Omar onde rodam frontend, backend e banco.

## Escopo

**Inclui:**
- Pesquisar preços/limites ATUAIS (não usar memória — as condições de free-tier mudam) de:
  - Frontend: Vercel (hobby) vs alternativas (Netlify, Cloudflare Pages).
  - Backend Java: Render / Railway / Fly.io / Koyeb (free/hobby: RAM p/ JVM!, cold start) vs Azure App Service/Container Apps (o Omar domina Azure — valor de vitrine).
  - Postgres: Neon / Supabase / Railway vs Azure Database.
- Matriz de decisão: custo mensal total, cold start (impacto no chat), RAM para Spring Boot, região (latência BR), esforço de manutenção, valor de vitrine no CV.
- Recomendação + decisão do Omar registrada em DECISIONS.md (incluindo orçamento total: hosting + LLM).

**NÃO inclui:**
- Executar os deploys (US-M7-02/03).

## Critérios de aceite

- [ ] Matriz com ≥2 opções por componente, com preços verificados na data (fontes linkadas).
- [ ] Decisão registrada em DECISIONS.md com orçamento mensal aprovado.
- [ ] Impacto do cold start no chat avaliado e mitigação definida (ex.: ping de warm-up, mensagem de espera).

## Passos de implementação assistida por IA

1. Pesquisa web dos planos atuais; montar a matriz.
2. Validar requisito de RAM do backend real (`./mvnw spring-boot:run` local + medir).
3. Sessão de decisão com o Omar; registrar D-012 (ou próximo ID) em DECISIONS.md.
4. Atualizar `01-architecture/overview.md` com o diagrama de deploy escolhido.

## Arquivos afetados

- `docs/DECISIONS.md`, `docs/01-architecture/overview.md` — modificar

## Plano de verificação

- [ ] Revisão da matriz pelo Omar; decisão explícita registrada (é o critério de done de uma US de decisão).

## Definition of Done

- [ ] Critérios de aceite ✔ · DoD global (partes aplicáveis) ✔ · Status atualizado · Commit `US-M7-01: ...` + push

## Notas de execução

<preencher na sessão>
