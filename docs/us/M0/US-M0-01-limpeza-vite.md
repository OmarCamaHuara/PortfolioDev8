# US-M0-01 — Limpar sobras do Vite

**Milestone:** M0 — Fundação do monorepo e higiene
**Status:** ⬜ não iniciada
**Estimativa:** 1h
**Dependências:** nenhuma

## Contexto / Motivação

O projeto migrou de Vite/React para Next.js 15 (commit "Migracao de React para Next"), mas ficaram sobras: `vite.config.js`, devDependencies do Vite, script `preview` e configuração de ESLint do template antigo. Isso confunde ferramentas, sessões de IA e recrutadores que lerem o repositório.

## Escopo

**Inclui:**
- Remover `vite.config.js` e o script `preview` do `package.json`.
- Remover devDependencies exclusivas do Vite (`vite`, `@vitejs/plugin-react` e plugins associados) — conferindo antes que nada do Next as usa.
- Revisar `.eslintrc.cjs`: manter/ajustar para Next (ou adotar `eslint-config-next`).
- Atualizar `.gitignore` se houver entradas específicas do Vite faltando/sobrando.

**NÃO inclui:**
- Mover arquivos para `frontend/` (US-M0-02).
- Atualizar versões de dependências que já funcionam.

## Critérios de aceite

- [ ] `vite.config.js` não existe mais; nenhuma referência a "vite" em `package.json`.
- [ ] `npm install && npm run dev` e `npm run build` funcionam como antes.
- [ ] `npx eslint .` roda sem erro de configuração.

## Passos de implementação assistida por IA

1. `grep -ri vite package.json vite.config.js .eslintrc.cjs` para mapear todas as referências.
2. Remover `vite.config.js`; editar `package.json` removendo o script `preview` e as deps do Vite.
3. Ajustar ESLint para o padrão Next (`eslint-config-next`) mantendo regras úteis existentes.
4. `rm -rf node_modules package-lock.json && npm install` para regenerar o lockfile limpo.
5. Rodar dev e build; navegar o site localmente confirmando que nada quebrou.

## Arquivos afetados

- `vite.config.js` — remover
- `package.json` / `package-lock.json` — modificar
- `.eslintrc.cjs` — modificar

## Plano de verificação

- [ ] `npm run build` sem erros.
- [ ] `npm run dev` → abrir `localhost:3000`, scroll completo por todas as seções.
- [ ] `grep -ri vite package.json` retorna vazio.

## Definition of Done

- [ ] Critérios de aceite ✔ · Verificação ✔ · DoD global ✔ · Status atualizado · Commit `US-M0-01: ...` + push

## Notas de execução

<preencher na sessão>
