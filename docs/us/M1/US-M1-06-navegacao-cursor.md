# US-M1-06 — Re-tematizar Navbar, Sidebar e Cursor

**Milestone:** M1 — Design System Spider-Verse
**Status:** ⬜ não iniciada
**Estimativa:** 2h
**Dependências:** US-M1-03

## Contexto / Motivação

Navegação e cursor acompanham o usuário na página inteira — precisam falar a mesma língua visual do novo hero para a identidade ser coesa.

## Escopo

**Inclui:**
- `Navbar`: tag do nome (slot `graffiti-tag-nome`), ícones sociais com hover glitch/sticker.
- `Sidebar` + `ToggleButton` + `Links`: menu com estética spray (links como tags), animação existente re-tematizada.
- `Cursor`: ponto/aro com cores da paleta (magenta/ciano), efeito sutil em interativos; **desativado em touch e sob reduced-motion**.

**NÃO inclui:**
- Novos itens de menu (Modo Recrutador entra na US-M2-04; seletor de idioma na US-M5-03).

## Critérios de aceite

- [ ] Navbar/Sidebar com novo visual, funcionais em mobile e desktop.
- [ ] Cursor customizado só em dispositivos com ponteiro fino (`@media (pointer: fine)`), e nativo permanece visível/utilizável.
- [ ] Links do menu navegam por âncora como antes; foco visível.

## Passos de implementação assistida por IA

1. Re-estilizar `navbar.module.scss`/`sidebar` com tokens; inserir GraffitiSlot da tag do nome.
2. Ajustar variantes de animação da sidebar para `variants.js`.
3. Atualizar `Cursor.jsx`: cores por token; render condicional (pointer fine + sem reduced-motion).
4. Testar navegação completa por teclado e touch (DevTools device mode).

## Arquivos afetados

- `frontend/components/navbar/*`, `components/sidebar/*`, `components/cursor/*` — modificar

## Plano de verificação

- [ ] `npm run dev` → menu abre/fecha, âncoras funcionam, hover sociais OK.
- [ ] Device mode (touch) → sem cursor custom; reduced-motion → sem animações.
- [ ] `npm run build` sem erros.

## Definition of Done

- [ ] Critérios de aceite ✔ · Verificação ✔ · DoD global ✔ · Status atualizado · Commit `US-M1-06: ...` + push

## Notas de execução

<preencher na sessão>
