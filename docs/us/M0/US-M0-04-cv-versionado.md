# US-M0-04 — CV versionado + link de download local

**Milestone:** M0 — Fundação do monorepo e higiene
**Status:** ⬜ não iniciada
**Estimativa:** 1h
**Dependências:** US-M0-02

## Contexto / Motivação

O botão "Download CV" (`components/hero/Hero.jsx` e `components/chatBot/ChatBot.jsx`) aponta para um arquivo no Google Drive — dependência externa, sem controle de versão e com risco de link morto. O CV oficial já está em `docs/00-vision/assets/CV_Omar_BackendJava.pdf`.

## Escopo

**Inclui:**
- Copiar o PDF oficial para `frontend/public/cv/CV_Omar_BackendJava.pdf`.
- Atualizar os links de download nos componentes para o arquivo local (atributo `download`).
- Documentar no próprio arquivo `content-source.md` que o PDF do site deve ser atualizado junto com a fonte canônica.

**NÃO inclui:**
- Redesign do botão (M1) ou o posicionamento "discreto" (US-M2-05).
- Geração automática do PDF a partir do backend (backlog).

## Critérios de aceite

- [ ] Clicar em "Download CV" baixa o PDF servido pelo próprio site.
- [ ] Nenhuma referência restante ao link do Google Drive no código.
- [ ] PDF baixado abre corretamente e é a versão atual do CV.

## Passos de implementação assistida por IA

1. `cp docs/00-vision/assets/CV_Omar_BackendJava.pdf frontend/public/cv/`.
2. `grep -r "drive.google" frontend/` e substituir cada ocorrência por `/cv/CV_Omar_BackendJava.pdf` com atributo `download`.
3. Adicionar nota de sincronização em `docs/00-vision/content-source.md` (seção da fonte).

## Arquivos afetados

- `frontend/public/cv/CV_Omar_BackendJava.pdf` — criar
- `frontend/components/hero/Hero.jsx` — modificar
- `frontend/components/chatBot/ChatBot.jsx` — modificar
- `docs/00-vision/content-source.md` — modificar (nota)

## Plano de verificação

- [ ] `npm run dev` → clicar no botão em Hero e no link do ChatBot → download OK.
- [ ] `grep -r "drive.google" frontend/` vazio.

## Definition of Done

- [ ] Critérios de aceite ✔ · Verificação ✔ · DoD global ✔ · Status atualizado · Commit `US-M0-04: ...` + push

## Notas de execução

<preencher na sessão>
