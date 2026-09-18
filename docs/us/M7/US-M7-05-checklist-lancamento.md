# US-M7-05 — Checklist de lançamento (Lighthouse, mobile, a11y)

**Milestone:** M7 — Deploy e lançamento
**Status:** ⬜ não iniciada
**Estimativa:** 2h
**Dependências:** US-M7-04

## Contexto / Motivação

Passada final de qualidade antes de divulgar o link: performance, acessibilidade, dispositivos reais e revisão de conteúdo. O "corte da fita" do projeto.

## Escopo

**Inclui:**
- Lighthouse (produção, mobile + desktop): meta ≥90 nas 4 categorias — corrigir o que impedir.
- Teste em dispositivos reais: Android + iPhone (do Omar/amigos), Chrome/Firefox/Safari.
- Auditoria a11y: navegação completa por teclado, leitor de tela no fluxo principal, contraste final, reduced-motion.
- Revisão de conteúdo pelos 3 locales (typos, traduções, datas do CV).
- Roteiro completo de recrutador simulado: chegar → entender perfil → Modo Recrutador → chat (2 perguntas) → pitch com vaga real → baixar CV → contato.
- Atualizar README com a URL final + screenshot real; **fechar o milestone e escrever `learnings/M7.md` + retrospectiva geral do projeto**.

**NÃO inclui:**
- Divulgação (LinkedIn post etc. — é do Omar 🎉).

## Critérios de aceite

- [ ] Lighthouse ≥90×4 em produção (screenshots nas Notas).
- [ ] Roteiro de recrutador completo sem nenhuma fricção não-intencional, nos 3 idiomas.
- [ ] Zero erros de console em produção; 404/500 com página temática mínima.
- [ ] README final com URL e screenshot.

## Passos de implementação assistida por IA

1. Rodar Lighthouse e listar/corrigir issues (imagens, fontes, JS não usado).
2. Executar o roteiro de recrutador em cada locale, anotando fricções; corrigir as pequenas, US novas para as grandes.
3. Auditoria a11y (axe + manual); página 404 temática simples se não existir.
4. README final; learnings M7 + retrospectiva.

## Arquivos afetados

- Correções pontuais em `frontend/**`
- `README.md`, `docs/learnings/M7.md`, `docs/milestones/ROADMAP.md` — atualizar

## Plano de verificação

- [ ] Re-rodar Lighthouse após correções; roteiro final limpo nos 3 locales.
- [ ] Todos os milestones ✅ no ROADMAP.

## Definition of Done

- [ ] Critérios de aceite ✔ · Verificação ✔ · DoD global ✔ · Status atualizado · Commit `US-M7-05: ...` + push 🚀

## Notas de execução

<preencher na sessão>
