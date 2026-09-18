# US-M2-06 — SEO + OG image estilo comic

**Milestone:** M2 — Conteúdo e storytelling do CV
**Status:** ⬜ não iniciada
**Estimativa:** 2h
**Dependências:** US-M2-01, US-M2-02, US-M2-03

## Contexto / Motivação

O link do portfólio será compartilhado no LinkedIn e em candidaturas: o preview (OG image + título + descrição) é a primeira impressão antes mesmo do clique. Hoje não há metadados trabalhados.

## Escopo

**Inclui:**
- `<Head>`/metadados: title ("Omar Cama Huarahuara — Backend Java | Spring Boot | IA"), description (do perfil canônico), canonical, theme-color (`--sv-black`).
- Open Graph + Twitter Card: og:image estática 1200×630 estilo comic (montada com os componentes visuais/paleta — pode ser um screenshot tratado do hero), og:title/description/locale.
- JSON-LD `Person` (nome, jobTitle, sameAs: LinkedIn/GitHub, address São Paulo).
- `favicon`/ícones coerentes com a identidade (tag "O" estilizada).
- `robots.txt` e `sitemap` simples.

**NÃO inclui:**
- OG dinâmica por rota (site é single-page); analytics (US-M7-04).

## Critérios de aceite

- [ ] Preview correto em validadores (opengraph.xyz / LinkedIn Post Inspector).
- [ ] JSON-LD validado (Rich Results Test sem erros).
- [ ] Lighthouse SEO ≥ 90 local.

## Passos de implementação assistida por IA

1. Criar `frontend/components/seo/Seo.jsx` centralizando metadados (usado em `_app`/`index`).
2. Produzir `public/og-image.png` (1200×630) com a identidade do M1.
3. Adicionar JSON-LD com dados de [content-source.md](../../00-vision/content-source.md).
4. Gerar favicons; criar `public/robots.txt` e sitemap (pode ser estático).
5. Validar nos validadores e no Lighthouse.

## Arquivos afetados

- `frontend/components/seo/Seo.jsx` — criar
- `frontend/pages/_document.jsx`, `pages/index.jsx` — modificar
- `frontend/public/{og-image.png,favicon*,robots.txt,sitemap.xml}` — criar

## Plano de verificação

- [ ] Validadores OG/JSON-LD sem erros; Lighthouse SEO ≥ 90.
- [ ] `npm run build` sem erros.

## Definition of Done

- [ ] Critérios de aceite ✔ · Verificação ✔ · DoD global ✔ · Status atualizado · Commit `US-M2-06: ...` + push

## Notas de execução

<preencher na sessão>
