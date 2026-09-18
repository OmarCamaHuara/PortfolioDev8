# US-M6-05 — Pitch sob medida por vaga

**Milestone:** M6 — IA integrada
**Status:** ⬜ não iniciada
**Estimativa:** 3h
**Dependências:** US-M6-01, US-M6-04

## Contexto / Motivação

Feature-uau para recrutadores (D-003, frente 2): colar a descrição da vaga e receber um pitch honesto de match com o perfil do Omar — matches fortes, diferenciais e gaps declarados.

## Escopo

**Inclui:**
- Migração `recruiter_pitch` (hash da vaga, locale, pitch, createdAt) — cache: mesma vaga não paga duas vezes.
- `GeneratePitchUseCase`: valida (≤8k chars, strip HTML) → hash/cache → prompt `prompts/pitch-system.st` (perfil canônico + vaga; saída: 3–5 bullets de match, 1–2 diferenciais, gaps honestos; idioma da vaga) → cache + resposta.
- `POST /api/pitch` com o rate limit 3/h por IP (infra da US-M6-04).
- Frontend: subseção no chat ou no Modo Recrutador (decidir na sessão com o Omar): textarea "cole a vaga aqui" → pitch renderizado em `ComicPanel` com botão copiar.
- Honestidade no prompt: proibido inventar experiência; gaps declarados com plano de aprendizado quando aplicável (ex.: "Kubernetes: em aprendizado").

**NÃO inclui:**
- Análise de PDF de vaga (só texto colado); envio do pitch por e-mail.

## Critérios de aceite

- [ ] Vaga real de backend Java colada → pitch coerente, fiel ao CV, no idioma da vaga.
- [ ] Mesma vaga 2x → segunda resposta instantânea (cache, sem chamada LLM — conferir no log de uso).
- [ ] Vaga sem relação (ex.: designer) → pitch honesto sobre o não-match.
- [ ] 4º pitch na mesma hora → 429.

## Passos de implementação assistida por IA

1. Migração + entidade/repo do cache.
2. Prompt de pitch versionado; caso de uso com hash SHA-256 normalizado (trim/lowercase).
3. Controller + rate limit; Swagger.
4. UI da feature (decidir posicionamento com o Omar) com loader/erro padrão.
5. Testes com mock + 2 vagas reais com provider (registrar nas Notas).

## Arquivos afetados

- `backend/**` — migração `V5__pitch.sql`, prompt, caso de uso, controller, testes
- `frontend/**` — UI do pitch, locales

## Plano de verificação

- [ ] Fluxo real com 2 vagas distintas + repetição (cache) + vaga não relacionada.
- [ ] `./mvnw verify` + `npm run build` verdes.

## Definition of Done

- [ ] Critérios de aceite ✔ · Verificação ✔ · DoD global ✔ · Status atualizado · Commit `US-M6-05: ...` + push

## Notas de execução

<preencher na sessão>
