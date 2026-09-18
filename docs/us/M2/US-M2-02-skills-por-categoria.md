# US-M2-02 — Seção de skills por categoria

**Milestone:** M2 — Conteúdo e storytelling do CV
**Status:** ⬜ não iniciada
**Estimativa:** 2h
**Dependências:** US-M1-03

## Contexto / Motivação

Hoje as skills aparecem só como slider de ícones no hero. Um recrutador técnico precisa da visão organizada por categoria, como no CV (Linguagens, Frameworks, Arquitetura, Frontend, DevOps, Bancos, Testes, IA & Automação, Metodologias).

## Escopo

**Inclui:**
- Nova seção `components/skills/Skills.jsx` com as 9 categorias da fonte canônica, skills como stickers/tags agrupados.
- Destaques visuais para o core (Java, Spring Boot, Arquitetura Hexagonal, IA/MCP).
- Dados em `frontend/content/skills.js` (estrutura igual à entidade `Skill` do backend).
- Adicionar a seção em `pages/index.jsx` (entre projetos e chat) e no menu da sidebar.

**NÃO inclui:**
- Barras de "nível de skill" (anti-padrão); consumo de API (M5).

## Critérios de aceite

- [ ] 9 categorias com todas as skills do CV, nada inventado.
- [ ] Core skills visualmente destacadas; layout responsivo (grid → coluna no mobile).
- [ ] Seção acessível: categorias como headings, listas semânticas (`ul/li`).

## Passos de implementação assistida por IA

1. Criar `content/skills.js` fiel à tabela de [content-source.md](../../00-vision/content-source.md).
2. Criar a seção com `SectionHeading` + grupos de stickers; reaproveitar ícones existentes de `public/` quando houver.
3. Registrar a âncora no menu (`Links.jsx`).
4. Testar responsividade e leitura por leitor de tela (semântica de listas).

## Arquivos afetados

- `frontend/content/skills.js` — criar
- `frontend/components/skills/*` — criar
- `frontend/pages/index.jsx`, `components/sidebar/links/Links.jsx` — modificar

## Plano de verificação

- [ ] Conferência 1:1 com a tabela de skills da fonte canônica.
- [ ] `npm run dev` mobile+desktop; `npm run build` sem erros.

## Definition of Done

- [ ] Critérios de aceite ✔ · Verificação ✔ · DoD global ✔ · Status atualizado · Commit `US-M2-02: ...` + push

## Notas de execução

<preencher na sessão>
