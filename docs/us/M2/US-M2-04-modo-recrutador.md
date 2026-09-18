# US-M2-04 — Modo Recrutador (perfil em 30s)

**Milestone:** M2 — Conteúdo e storytelling do CV
**Status:** ⬜ não iniciada
**Estimativa:** 3h
**Dependências:** US-M2-01, US-M2-02

## Contexto / Motivação

Persona "recrutador com pressa" ([vision.md](../../00-vision/vision.md)): 30–60s por candidato. O Modo Recrutador é um atalho discreto que abre uma visão-resumo — o CV inteiro em uma "página de quadrinho" — sem precisar rolar o site todo. É um dos 3 caminhos do CV discreto (D-006).

## Escopo

**Inclui:**
- Gatilho discreto mas descobrível: botão flutuante/sticker "⚡ Com pressa?" (canto da tela, aparece após o primeiro scroll) + item no menu.
- Overlay/modal em formato de página de HQ com: foto + nome + título · resumo do perfil (3 linhas) · linha do tempo mínima das 4 experiências · top skills · idiomas · CTA de contato (email/LinkedIn/WhatsApp) · download do CV.
- Fechamento por X, ESC e clique fora; focus trap; scroll interno no mobile.
- Conteúdo do módulo `content/` (mesma fonte das seções).

**NÃO inclui:**
- Versões EN/ES (M5); métricas de uso (US-M7-04).

## Critérios de aceite

- [ ] Um recrutador consegue: entender o perfil + copiar contato + baixar CV **sem fechar o overlay**, em ≤30s.
- [ ] Acessível: focus trap, ESC fecha, `aria-modal`, foco retorna ao gatilho.
- [ ] Gatilho não atrapalha a navegação normal (não cobre conteúdo, some quando overlay aberto).

## Passos de implementação assistida por IA

1. Criar `components/recruiterMode/RecruiterMode.jsx` (+ scss) usando `ComicPanel`/`StickerButton`/tokens.
2. Compor o conteúdo a partir de `content/experiences.js`, `content/skills.js` e dados de perfil (criar `content/profile.js` se ainda não existir).
3. Implementar gatilho flutuante com aparição pós-scroll (IntersectionObserver ou scroll listener leve).
4. Acessibilidade: focus trap (útil: `focus-trap-react` ou implementação simples), ESC, aria.
5. Testar fluxo completo cronometrado + teclado + mobile.

## Arquivos afetados

- `frontend/components/recruiterMode/*` — criar
- `frontend/content/profile.js` — criar (identidade + resumo + contatos, da fonte canônica)
- `frontend/pages/index.jsx`, `components/sidebar/links/Links.jsx` — modificar

## Plano de verificação

- [ ] Cronometrar o fluxo: abrir → ler → copiar email → baixar CV ≤ 30s.
- [ ] Teclado: Tab preso no modal, ESC fecha, foco retorna.
- [ ] Mobile 360px: overlay rolável, nada cortado. `npm run build` OK.

## Definition of Done

- [ ] Critérios de aceite ✔ · Verificação ✔ · DoD global ✔ · Status atualizado · Commit `US-M2-04: ...` + push

## Notas de execução

<preencher na sessão>
