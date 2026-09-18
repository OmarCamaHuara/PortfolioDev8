# US-M2-05 — Download discreto do CV

**Milestone:** M2 — Conteúdo e storytelling do CV
**Status:** ⬜ não iniciada
**Estimativa:** 1h
**Dependências:** US-M0-04

## Contexto / Motivação

Requisito central do produto: o CV embutido de forma **discreta** (D-006). O botão de download não deve gritar "CURRÍCULO AQUI", mas quem procura tem que achar em segundos.

## Escopo

**Inclui:**
- Definir os pontos de download (proposta): (1) link sutil no hero (ícone + "CV" pequeno), (2) dentro do Modo Recrutador (já na US-M2-04), (3) no rodapé/contato.
- Estilo "sticker discreto": presente, coerente com a estética, sem competir com os CTAs principais.
- Nome de arquivo amigável no download (`CV-Omar-Cama-Backend-Java.pdf` via atributo `download`).
- Remover qualquer botão de CV grande/antigo remanescente.

**NÃO inclui:**
- Geração dinâmica do PDF (backlog); tracking de downloads (US-M7-04).

## Critérios de aceite

- [ ] Teste de descoberta: alguém procurando o CV encontra um ponto de download em ≤10s; quem não procura não é interrompido por ele.
- [ ] 3 pontos de download funcionais com o mesmo arquivo.
- [ ] Links com `aria-label` claro ("Baixar CV em PDF").

## Passos de implementação assistida por IA

1. Auditar onde há links de CV hoje (`grep -ri "cv" frontend/components`).
2. Implementar os 3 pontos com um componente pequeno `ui/CvDownload` (variação `subtle`).
3. Ajustar hero: rebaixar o CTA de CV para a versão sutil (o CTA principal é contato).
4. Teste de descoberta com uma pessoa (ou heurística: visível no primeiro viewport? no fim? no modo recrutador?).

## Arquivos afetados

- `frontend/components/ui/CvDownload/` — criar
- `frontend/components/hero/Hero.jsx`, `contact/Contact.jsx`, `recruiterMode/RecruiterMode.jsx` — modificar

## Plano de verificação

- [ ] Download OK nos 3 pontos com nome de arquivo amigável.
- [ ] Revisão visual: o link não compete com CTAs primários. `npm run build` OK.

## Definition of Done

- [ ] Critérios de aceite ✔ · Verificação ✔ · DoD global ✔ · Status atualizado · Commit `US-M2-05: ...` + push

## Notas de execução

<preencher na sessão>
