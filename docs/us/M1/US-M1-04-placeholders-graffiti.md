# US-M1-04 — Slots de graffiti com placeholders

**Milestone:** M1 — Design System Spider-Verse
**Status:** ⬜ não iniciada
**Estimativa:** 2h
**Dependências:** US-M1-02

## Contexto / Motivação

Os graffitis originais do Omar ainda serão criados (D-007). O layout precisa nascer com os **slots** nas posições certas, preenchidos por placeholders, para que a troca posterior (US-M1-07) seja plug-and-play.

## Escopo

**Inclui:**
- Componente `components/ui/GraffitiSlot` que recebe `name` (ex.: `hero`, `jornada`) e renderiza: a arte final se existir em `public/graffiti/<name>.(svg|png|webp)`, senão um placeholder (pattern halftone + tag SVG genérica gerada).
- Posicionar os slots definidos no [design-system.md](../../01-architecture/design-system.md): `graffiti-hero`, `graffiti-jornada`, `graffiti-projetos`, `graffiti-tag-nome` (navbar/footer).
- Graffitis decorativos com `aria-hidden` e `alt=""`.
- Documentar no design-system.md o contrato do slot (como o Omar adiciona a arte).

**NÃO inclui:**
- As artes finais (US-M1-07).
- Slots de páginas de erro/extra (backlog).

## Critérios de aceite

- [ ] Slots visíveis nas 4 posições com placeholder coerente com a estética.
- [ ] Colocar um arquivo `public/graffiti/hero.svg` de teste → aparece no lugar do placeholder sem mudança de código.
- [ ] Placeholders não quebram responsividade nem causam layout shift (dimensões reservadas).

## Passos de implementação assistida por IA

1. Criar `GraffitiSlot` com verificação de asset (mapa estático de assets disponíveis — import estático — para evitar 404 em runtime).
2. Gerar placeholder: fundo halftone + tag SVG simples ("OMAR" estilizado) com cores da paleta.
3. Inserir os slots em Hero, Parallax de jornada/projetos e Navbar/footer — apenas posição, sem redesign das seções.
4. Testar com e sem arquivo de arte presente.

## Arquivos afetados

- `frontend/components/ui/GraffitiSlot/` — criar
- `frontend/components/hero/Hero.jsx`, `parallax/Parallax.jsx`, `navbar/Navbar.jsx` — modificar (inserir slot)
- `docs/01-architecture/design-system.md` — atualizar contrato do slot

## Plano de verificação

- [ ] `npm run dev` → 4 slots com placeholder; adicionar SVG de teste → substitui; remover → placeholder volta.
- [ ] Lighthouse: sem CLS relevante novo.
- [ ] `npm run build` sem erros.

## Definition of Done

- [ ] Critérios de aceite ✔ · Verificação ✔ · DoD global ✔ · Status atualizado · Commit `US-M1-04: ...` + push

## Notas de execução

<preencher na sessão>
