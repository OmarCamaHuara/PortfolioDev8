# US-M0-03 — README real do monorepo

**Milestone:** M0 — Fundação do monorepo e higiene
**Status:** ⬜ não iniciada
**Estimativa:** 1h
**Dependências:** US-M0-02

## Contexto / Motivação

O README atual é o template default do Vite (4 linhas) — péssimo cartão de visita para um recrutador técnico. O README é a porta de entrada do repositório e deve apresentar o produto, a arquitetura e a metodologia de docs.

## Escopo

**Inclui:**
- README.md da raiz em PT com: o que é o projeto (CV virtual Spider-Verse), screenshot/banner (placeholder até M1), arquitetura resumida (frontend/backend/docs com links), como rodar localmente, link para `docs/INDEX.md` e para o roadmap.
- Badge simples de status/stack (sem exagerar).

**NÃO inclui:**
- README separado do backend (nasce na US-M3-01).
- Tradução EN do README (backlog).

## Critérios de aceite

- [ ] README responde em <1 min de leitura: o que é, como é feito, como rodar, onde estão os docs.
- [ ] Todos os links internos funcionam.
- [ ] Zero restos do template Vite.

## Passos de implementação assistida por IA

1. Ler `docs/00-vision/vision.md` e `docs/01-architecture/overview.md` para extrair o resumo.
2. Escrever o README com as seções: título + tagline · sobre o projeto · arquitetura (diagrama curto em texto) · stack · como rodar (`cd frontend && npm install && npm run dev`) · documentação e metodologia (link `docs/INDEX.md`) · contato.
3. Revisar links relativos.

## Arquivos afetados

- `README.md` — reescrever

## Plano de verificação

- [ ] Render do markdown conferido (preview) — títulos, links e code blocks corretos.
- [ ] Clicar todos os links relativos no GitHub após push.

## Definition of Done

- [ ] Critérios de aceite ✔ · Verificação ✔ · DoD global ✔ · Status atualizado · Commit `US-M0-03: ...` + push

## Notas de execução

<preencher na sessão>
